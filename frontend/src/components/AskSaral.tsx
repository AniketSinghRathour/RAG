import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Send, Bot, User, ExternalLink, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  sources?: string[];
  timestamp: Date;
}

// Mock intelligent responses with proper references
const MOCK_RESPONSES: Record<string, { response: string; sources: string[] }> = {
  'ugc scholarship': {
    response: `The UGC (University Grants Commission) offers several scholarship schemes with specific eligibility criteria:

**General Eligibility:**
• Students must be Indian nationals
• Minimum 60% marks in qualifying examination (55% for SC/ST/PWD candidates)
• Annual family income should not exceed ₹8 lakh per annum
• Regular, full-time students in recognized universities/colleges

**Major UGC Scholarship Schemes:**

1. **NET-JRF Scholarship:** For research scholars who qualify UGC-NET exam in Junior Research Fellowship category. Provides ₹31,000/month for initial 2 years and ₹35,000/month for remaining period.

2. **Rajiv Gandhi National Fellowship:** For SC/ST candidates pursuing M.Phil and Ph.D. Provides ₹31,000/month (JRF) and ₹35,000/month (SRF) along with contingency grant.

3. **Maulana Azad National Fellowship:** For minority community students pursuing M.Phil/Ph.D. Similar benefits as RGNF.

**Application Process:**
• Apply through National Scholarship Portal (NSP)
• Submit required documents: Mark sheets, income certificate, caste certificate (if applicable), Aadhaar card
• Applications typically open in August-September each year`,
    sources: [
      'https://www.ugc.ac.in/page/Scholarships-and-Fellowships.aspx',
      'https://scholarships.gov.in/',
      'UGC (Grant of Fellowship and Other Facilities) Regulations, 2022',
      'https://www.ugc.ac.in/oldpdf/xiplanpdf/scholarshipfellowship.pdf'
    ]
  },
  'aicte approval': {
    response: `The AICTE approval process for new technical institutions involves multiple stages and strict compliance requirements:

**Types of Approvals:**
1. **Extension of Approval (EOA):** For existing institutions to continue operations
2. **Increase in Intake:** To enhance student capacity in approved programs
3. **New Courses:** To introduce additional programs
4. **New Institutions:** Fresh approval for establishing new technical institutions

**Process for New Institution Approval:**

**Stage 1 - Application Submission (June-July):**
• Submit online application through AICTE portal
• Pay requisite processing fee (₹2-5 lakhs based on program type)
• Upload all mandatory documents

**Stage 2 - Scrutiny Committee Review:**
• Verification of land ownership/lease documents (minimum 5 acres for standalone institutions)
• Check infrastructure requirements: Classrooms, labs, library, faculty rooms
• Financial capability assessment (minimum ₹1 crore fixed deposit)
• Faculty qualification verification (as per AICTE norms)

**Stage 3 - Expert Visit Committee (EVC):**
• Physical inspection of proposed/existing infrastructure
• Interaction with promoters and proposed faculty
• Assessment of laboratories and equipment
• Verification of compliance with AICTE norms

**Stage 4 - Decision:**
• Recommendations sent to State Level Committee and Central Government
• Final approval/rejection communicated by September-October
• Valid for one academic year, renewable annually

**Key Requirements:**
• NBA accreditation for quality assurance
• Sufficient built-up area (as per AICTE norms)
• Qualified faculty with Ph.D./M.Tech degrees
• Industry partnerships and placement cell
• Adequate learning resources and digital infrastructure`,
    sources: [
      'https://www.aicte-india.org/education/approval-process',
      'AICTE Approval Process Handbook 2024-25',
      'https://facilities.aicte-india.org/',
      'AICTE (Grant of Approvals for Technical Institutions) Regulations, 2021'
    ]
  },
  'nep 2020': {
    response: `The National Education Policy (NEP) 2020 is India's comprehensive education framework replacing the previous 1986 policy. Here are the key highlights:

**Higher Education Reforms:**

1. **Multidisciplinary Education:**
   • Holistic undergraduate education with flexible curricula
   • Multiple entry-exit options with certification:
     - 1 year: Certificate
     - 2 years: Diploma
     - 3 years: Bachelor's Degree
     - 4 years: Bachelor's with Research

2. **Academic Bank of Credits (ABC):**
   • Digital repository of credits earned from different HEIs
   • Enables credit transfer and recognition
   • Supports mobility across institutions

3. **Institutional Restructuring:**
   • Transform all HEIs into multidisciplinary institutions by 2040
   • Phase out affiliated colleges system
   • Establish single regulator HECI (Higher Education Commission of India)
   • Separate regulatory, accreditation, funding, and standard-setting functions

4. **Research & Innovation:**
   • Establish National Research Foundation (NRF) with ₹20,000 crore funding
   • Strengthen research culture in universities
   • Increase Gross Enrolment Ratio (GER) to 50% by 2035

5. **Quality & Accreditation:**
   • Mandatory accreditation for all HEIs
   • Binary accreditation system (accredited/not accredited)
   • Graded accreditation for performance-based support

6. **Technology Integration:**
   • National Educational Technology Forum (NETF)
   • Digital infrastructure for education (DIKSHA, SWAYAM)
   • Virtual labs and online learning platforms

7. **Faculty Development:**
   • Transparent recruitment and career progression
   • Performance-based incentives
   • Continuous professional development requirements

8. **Internationalization:**
   • Enable top 100 global universities to establish campuses in India
   • Credit transfer frameworks for international mobility
   • Scholarship programs for international students

**Implementation Timeline:**
• 2021-2023: Policy formulation and pilot programs
• 2024-2030: Phased rollout of major reforms
• 2030-2040: Complete transformation of education system`,
    sources: [
      'https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf',
      'National Education Policy 2020 - Official Document, Ministry of Education',
      'https://www.ugc.ac.in/pdfnews/4033663_NEP-Implementation.pdf',
      'NEP Implementation Roadmap, UGC 2021'
    ]
  },
  'aicte approval hindi': {
    response: `नए तकनीकी संस्थानों के लिए एआईसीटीई अनुमोदन प्रक्रिया में कई चरण और कड़े अनुपालन आवश्यकताएं शामिल हैं:

**अनुमोदन के प्रकार:**
1. **विस्तार अनुमोदन (EOA):** मौजूदा संस्थानों के संचालन जारी रखने के लिए
2. **प्रवेश में वृद्धि:** अनुमोदित कार्यक्रमों में छात्र क्षमता बढ़ाने के लिए
3. **नए पाठ्यक्रम:** अतिरिक्त कार्यक्रम शुरू करने के लिए
4. **नए संस्थान:** नए तकनीकी संस्थान स्थापित करने के लिए नया अनुमोदन

**नए संस्थान अनुमोदन की प्रक्रिया:**

**चरण 1 - आवेदन प्रस्तुत करना (जून-जुलाई):**
• एआईसीटीई पोर्टल के माध्यम से ऑनलाइन आवेदन जमा करें
• आवश्यक प्रसंस्करण शुल्क का भुगतान करें (कार्यक्रम प्रकार के आधार पर ₹2-5 लाख)
• सभी अनिवार्य दस्तावेज अपलोड करें

**चरण 2 - जांच समिति की समीक्षा:**
• भूमि स्वामित्व/पट्टा दस्तावेजों का सत्यापन (स्टैंडअलोन संस्थानों के लिए न्यूनतम 5 एकड़)
• बुनियादी ढांचे की आवश्यकताओं की जांच: कक्षाएं, प्रयोगशालाएं, पुस्तकालय, संकाय कक्ष
• वित्तीय क्षमता का आकलन (न्यूनतम ₹1 करोड़ सावधि जमा)
• संकाय योग्यता सत्यापन (एआईसीटीई मानदंडों के अनुसार)

**चरण 3 - विशेषज्ञ दौरा समिति (EVC):**
• प्रस्तावित/मौजूदा बुनियादी ढांचे का भौतिक निरीक्षण
• प्रमोटरों और प्रस्तावित संकाय के साथ बातचीत
• प्रयोगशालाओं और उपकरणों का मूल्यांकन
• एआईसीटीई मानदंडों के अनुपालन का सत्यापन

**चरण 4 - निर्णय:**
• राज्य स्तरीय समिति और केंद्र सरकार को सिफारिशें भेजी जाती हैं
• सितंबर-अक्टूबर तक अंतिम स्वीकृति/अस्वीकृति की सूचना दी जाती है
• एक शैक्षणिक वर्ष के लिए वैध, वार्षिक रूप से नवीकरणीय

**मुख्य आवश्यकताएं:**
• गुणवत्ता आश्वासन के लिए NBA मान्यता
• पर्याप्त निर्मित क्षेत्र (एआईसीटीई मानदंडों के अनुसार)
• पीएचडी/एम.टेक डिग्री वाले योग्य संकाय
• उद्योग साझेदारी और प्लेसमेंट सेल
• पर्याप्त शिक्षण संसाधन और डिजिटल बुनियादी ढांचा`,
    sources: [
      'https://www.aicte-india.org/education/approval-process',
      'AICTE Approval Process Handbook 2024-25',
      'https://facilities.aicte-india.org/',
      'AICTE (Grant of Approvals for Technical Institutions) Regulations, 2021'
    ]
  },
  'naac accreditation': {
    response: `NAAC (National Assessment and Accreditation Council) accreditation is a quality assurance mechanism for Higher Education Institutions in India.

**Accreditation Process:**

**Step 1 - Institutional Eligibility:**
• Institution must complete 6 years of existence
• At least 2 batches of students must have graduated
• Apply through NAAC portal with eligibility documents

**Step 2 - Institutional Information for Quality Assessment (IIQA):**
• Submit comprehensive institutional data online
• Details about programs, students, faculty, infrastructure, research
• Financial information and governance structure
• Student support services and outcomes

**Step 3 - Self-Study Report (SSR):**
• Detailed report based on 7 criteria (350 pages approximately)
• Quantitative and qualitative data on institutional performance
• SWOC analysis (Strengths, Weaknesses, Opportunities, Challenges)

**The 7 Criteria for Assessment:**

1. **Curricular Aspects (100 points)**
   • Curriculum design and development
   • Academic flexibility and student-centric approach
   • Feedback mechanisms

2. **Teaching-Learning and Evaluation (350 points)**
   • Student enrollment and profile
   • Faculty profile and quality
   • Teaching-learning process
   • Evaluation system and reforms

3. **Research, Innovations and Extension (130 points)**
   • Research promotion and infrastructure
   • Publications and awards
   • Extension activities and community engagement
   • Collaboration and linkages

4. **Infrastructure and Learning Resources (100 points)**
   • Physical and academic facilities
   • Library and ICT infrastructure
   • Student amenities
   • Maintenance of infrastructure

5. **Student Support and Progression (130 points)**
   • Student support programs
   • Student progression and placement
   • Alumni engagement
   • Scholarship and financial support

6. **Governance, Leadership and Management (100 points)**
   • Institutional vision and leadership
   • Strategy development and deployment
   • Faculty empowerment strategies
   • Financial management and resource mobilization

7. **Institutional Values and Best Practices (90 points)**
   • Gender equity and environmental consciousness
   • Professional ethics and human values
   • Institutional distinctiveness and best practices

**Step 4 - Peer Team Visit:**
• Expert committee visits institution (2-3 days)
• Interaction with stakeholders: students, faculty, management, alumni
• Physical verification of infrastructure and facilities
• Review of documents and records

**Step 5 - Grading:**
• Based on Cumulative Grade Point Average (CGPA) on 4-point scale:
  - A++ (CGPA 3.51-4.00): Excellent
  - A+ (CGPA 3.26-3.50): Very Good
  - A (CGPA 3.01-3.25): Good
  - B++ (CGPA 2.76-3.00): Satisfactory
  - B+ (CGPA 2.51-2.75): Fair
  - B (CGPA 2.01-2.50): Below Average
  - C (CGPA 1.51-2.00): Marginal
  - D (CGPA ≤1.50): Unsatisfactory

**Validity and Re-accreditation:**
• Accreditation valid for 5 years
• Institutions can apply for re-accreditation after 3.5 years
• Mandatory for autonomous institutions and universities

**Benefits of NAAC Accreditation:**
• Enhanced credibility and visibility
• Access to government funding and grants
• Eligible for university status and autonomy
• Student confidence and better placements
• International recognition and collaborations`,
    sources: [
      'http://www.naac.gov.in/index.php/en/',
      'NAAC Self Study Report (SSR) Manual for Universities',
      'NAAC Revised Accreditation Framework (RAF) 2020',
      'http://www.naac.gov.in/images/docs/Manuals/Manual-for-HEI.pdf'
    ]
  }
};

export default function AskSaral() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMockResponse = (query: string): { response: string; sources: string[] } => {
    const lowerQuery = query.toLowerCase();
    
    // Check for Hindi queries
    if (lowerQuery.includes('एआईसीटीई') || lowerQuery.includes('अनुमोदन')) {
      return MOCK_RESPONSES['aicte approval hindi'];
    }
    
    // Check for keyword matches
    if (lowerQuery.includes('ugc') || lowerQuery.includes('scholarship')) {
      return MOCK_RESPONSES['ugc scholarship'];
    }
    if (lowerQuery.includes('aicte') || lowerQuery.includes('approval')) {
      return MOCK_RESPONSES['aicte approval'];
    }
    if (lowerQuery.includes('nep') || lowerQuery.includes('2020') || lowerQuery.includes('education policy')) {
      return MOCK_RESPONSES['nep 2020'];
    }
    if (lowerQuery.includes('naac') || lowerQuery.includes('accreditation')) {
      return MOCK_RESPONSES['naac accreditation'];
    }
    
    // Default response
    return {
      response: `Thank you for your query about "${query}". 

I can provide detailed information about:
• UGC Scholarships and eligibility criteria
• AICTE approval process for institutions
• National Education Policy (NEP) 2020 highlights
• NAAC accreditation process and criteria

Please ask a specific question about any of these topics, and I'll provide comprehensive information with relevant sources.`,
      sources: [
        'https://www.education.gov.in/',
        'https://www.ugc.ac.in/',
        'https://www.aicte-india.org/',
        'http://www.naac.gov.in/'
      ]
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Simulate API delay for realism
    setTimeout(() => {
      const mockData = getMockResponse(currentInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: mockData.response,
        sources: mockData.sources,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      {/* Header */}
      <div className="px-8 py-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-pink-600 rounded-xl blur-md opacity-50"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-white/10 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl">Ask SARAL</h1>
            <p className="text-sm text-slate-400">Your AI-powered education policy assistant</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-pink-600/30 rounded-full blur-3xl"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-white/10 to-pink-600 rounded-full flex items-center justify-center">
                <Bot className="w-12 h-12" />
              </div>
            </div>
            <h2 className="text-3xl mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              How can I help you today?
            </h2>
            <p className="text-slate-400 mb-10 max-w-2xl leading-relaxed">
              Ask me anything about higher education policies, regulations, schemes, or guidelines. 
              I'll provide accurate, detailed answers with relevant sources and references.
            </p>
            <div className="grid md:grid-cols-2 gap-4 w-full max-w-3xl">
              <ExampleQuery 
                query="What are the eligibility criteria for UGC scholarships?"
                onClick={(q) => setInput(q)}
              />
              <ExampleQuery 
                query="Explain the AICTE approval process"
                onClick={(q) => setInput(q)}
              />
              <ExampleQuery 
                query="What are the key points of NEP 2020?"
                onClick={(q) => setInput(q)}
              />
              <ExampleQuery 
                query="How to apply for NAAC accreditation?"
                onClick={(q) => setInput(q)}
              />
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-4 max-w-4xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-slate-400 text-sm">SARAL is analyzing your query...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about policies, regulations, schemes..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none min-h-[60px] focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 pr-12"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                {input.length}/500
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-white/10 to-pink-600 hover:from-white/10 hover:to-pink-500 px-6 shadow-lg shadow-pink-500/25 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <div className="text-xs text-slate-500 mt-2 text-center">
            Press <kbd className="px-2 py-0.5 bg-white/10 rounded">Enter</kbd> to send • <kbd className="px-2 py-0.5 bg-white/10 rounded">Shift + Enter</kbd> for new line
          </div>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex gap-4 max-w-4xl ${isUser ? 'ml-auto' : ''}`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-pink-600 flex items-center justify-center flex-shrink-0">
          <Bot className="w-6 h-6" />
        </div>
      )}
      
      <div className={`flex-1 ${isUser ? 'flex justify-end' : ''}`}>
        <div className={`rounded-2xl p-5 ${
          isUser 
            ? 'bg-gradient-to-r from-white/10 to-pink-600 text-white max-w-2xl shadow-lg shadow-pink-500/25' 
            : 'bg-white/5 backdrop-blur-xl text-white border border-white/10 w-full'
        }`}>
          <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
          
          {message.sources && message.sources.length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-sm text-slate-300 mb-3 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Sources & References
              </div>
              <div className="space-y-2.5">
                {message.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-blue-400 hover:text-blue-300 transition-colors p-2.5 rounded-lg hover:bg-white/5 group"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center text-xs group-hover:bg-blue-500/30 transition-colors">
                      {index + 1}
                    </span>
                    <span className="flex-1 break-all">{source}</span>
                    <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="text-xs text-slate-500 mt-2 px-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {isUser && (
        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 border border-white/20">
          <User className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}

function ExampleQuery({ query, onClick }: { query: string; onClick: (query: string) => void }) {
  return (
    <button
      onClick={() => onClick(query)}
      className="group relative p-5 text-left bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative text-sm text-slate-300 group-hover:text-white transition-colors">{query}</div>
    </button>
  );
}
