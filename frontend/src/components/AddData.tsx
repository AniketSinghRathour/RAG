import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Globe, Database, Sparkles } from 'lucide-react';
import DocumentUpload from './DocumentUpload';
import WebConnect from './WebConnect';
import DatabaseConnect from './DatabaseConnect';

export default function AddData() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-pink-600 rounded-xl blur-md opacity-50"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-white/10 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl">Add Data Sources</h1>
            <p className="text-sm text-slate-400">Import data to enhance SARAL's knowledge base</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="bg-white/5 backdrop-blur-xl border border-white/10 mb-8 p-1.5 gap-2">
          <TabsTrigger 
            value="documents" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25 transition-all"
          >
            <FileText className="w-4 h-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="web"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25 transition-all"
          >
            <Globe className="w-4 h-4 mr-2" />
            Web
          </TabsTrigger>
          <TabsTrigger 
            value="databases"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/25 transition-all"
          >
            <Database className="w-4 h-4 mr-2" />
            Databases
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="mt-0">
          <DocumentUpload />
        </TabsContent>

        <TabsContent value="web" className="mt-0">
          <WebConnect />
        </TabsContent>

        <TabsContent value="databases" className="mt-0">
          <DatabaseConnect />
        </TabsContent>
      </Tabs>
    </div>
  );
}
