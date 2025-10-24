from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Annotated

from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.retrievers.contextual_compression import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser, PydanticOutputParser

import tempfile
import requests

import json
import re
from dotenv import load_dotenv
load_dotenv()

import cloudinary
import cloudinary.api
import os
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)


app = FastAPI()

class Folder(BaseModel):
    folder_name: Annotated[str, "Name of the folder containing PDFs in Cloudinary"]

class Context(BaseModel):
    query: Annotated[str, "Question that user want to search for"]

class Output(BaseModel):
    response: str = Field(..., description="The Final Response for the user's query")
    sources: list[str] = Field(description="Sources from which the response is retrieved")


embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
# Creating a vectorDB
vector_store = Chroma(
    embedding_function=embedding_model,
    persist_directory="chroma_db",
    collection_name="trial_collection"
)

def generate_embeddings(document):
    # Loading the Files from Cloudinary
    # loader = OnlinePDFLoader(document)
    # docs = loader.load()
    # Download the PDF temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        response = requests.get(document)
        tmp_file.write(response.content)
        tmp_path = tmp_file.name

    # Loading pages individually
    loader = PyMuPDFLoader(tmp_path)
    docs = loader.load()

    # print("####------")
    # print(docs[0].metadata)

    for i, doc in enumerate(docs):
        doc.metadata['source'] = document
        doc.metadata['page'] = i + 1

    # Creating the Chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1024,
        chunk_overlap=128,
    )
    chunks = splitter.split_documents(docs)
    
    # for c in chunks[:3]:
    #     print("MMMMMMMMMMMMMMMMM")
    #     print(c.metadata)

    # Creating the embeddings & Storing in vectorDB 
    vector_store.add_documents(chunks)


def get_files_from_cloud(folder_name):
    response = cloudinary.api.resources(type="upload", resource_type="image", max_result=500)
    docs = [
        res['secure_url']
        for res in response['resources']
        if res.get('asset_folder') == f'SIH_RAG/{folder_name}'
    ]

    # print("##### DDDDDOOOOCCCCCCCCCSSS")
    # print(docs)

    for i in range(len(docs)):
        generate_embeddings(docs[i])


def generate_response(query):
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite")
    
    retriever = vector_store.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 5, "lambda_mult": 0.7}
    )

    multiquery_retriever = MultiQueryRetriever.from_llm(
        llm = llm,
        retriever = retriever
    )

    compressor = LLMChainExtractor.from_llm(llm)
    compression_retriever = ContextualCompressionRetriever(
        base_retriever = multiquery_retriever,
        base_compressor = compressor
    )

    def format_docs(retrived_results):
        context_text = "\n\n".join(
            f"Source: {doc.metadata.get('source', 'Unknown')}, Page: {doc.metadata.get('page', 'N/A')}\n{doc.page_content}"
            for doc in retrived_results
        )
        return context_text
    
    parallel_chain = RunnableParallel({
        'context': compression_retriever | RunnableLambda(format_docs),
        'query': RunnablePassthrough()
    })

    structure_parser = PydanticOutputParser(pydantic_object=Output)
    prompt = PromptTemplate(
        template="""
            You are a helpful assistant.
            Answer ONLY from the provided documents context.
            If the context is insufficient, just say you don't know.
            Also, give References/citations from which document you get that from the metadata

            {context}
            Question: {query} \n
            {format_instructions}
        """,
        input_variables = ['context', 'query'],
        partial_variables={'format_instructions': structure_parser.get_format_instructions()}
    )

    parser = StrOutputParser()

    main_chain = parallel_chain | prompt | llm | parser

    response = main_chain.invoke({"query": query})

    # print(response)

    cleaned = re.sub(r"^```json|```$", "", response.strip(), flags=re.MULTILINE).strip()

    try:
        parsed = json.loads(cleaned)  # convert to dict
    except json.JSONDecodeError:
        print("Could not parse model output as JSON, returning raw text")
        parsed = {"response": cleaned, "sources": []}

    return parsed



@app.post("/create_embeddings")
async def create_embeddings(folder: Folder):
    folder_name = folder.folder_name
    get_files_from_cloud(folder_name)

    return JSONResponse(status_code=201, content={"message": f"Embeddings created successfully for folder: {folder_name}"})

@app.post("/get_response")
async def get_response(context: Context):
    query = context.query

    response = generate_response(query)

    return JSONResponse(status_code=201, content={"output": response})

    