import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, MessageSquare, Upload, Clock, ExternalLink, Sparkles } from 'lucide-react';
import { uploadedFilesHistory } from './DocumentUpload';

const initialUploadHistory = [
  {
    id: 1,
    name: 'NEP_2020_Guidelines.pdf',
    type: 'Document',
    date: '2025-10-14',
    time: '14:30',
    status: 'Success',
    size: '2.4 MB',
  },
  {
    id: 2,
    name: 'AICTE_Approval_Process.pdf',
    type: 'Document',
    date: '2025-10-13',
    time: '11:20',
    status: 'Success',
    size: '1.8 MB',
  },
  {
    id: 3,
    name: 'UGC Regulations Database',
    type: 'Database',
    date: '2025-10-12',
    time: '09:15',
    status: 'Success',
    size: '-',
  },
  {
    id: 4,
    name: 'Scholarship_Schemes_2024.pdf',
    type: 'Document',
    date: '2025-10-11',
    time: '16:45',
    status: 'Success',
    size: '3.1 MB',
  },
];

const queryHistory = [
  {
    id: 1,
    query: 'What are the eligibility criteria for UGC scholarships?',
    date: '2025-10-15',
    time: '10:25',
    sourcesCount: 4,
  },
  {
    id: 2,
    query: 'Explain the AICTE approval process for new institutions',
    date: '2025-10-15',
    time: '09:15',
    sourcesCount: 4,
  },
  {
    id: 3,
    query: 'What are the key highlights of NEP 2020?',
    date: '2025-10-14',
    time: '15:40',
    sourcesCount: 4,
  },
  {
    id: 4,
    query: 'NAAC accreditation process and requirements',
    date: '2025-10-14',
    time: '11:30',
    sourcesCount: 4,
  },
];

export default function HistoryPage() {
  // Combine initial history with uploaded files
  const allUploadHistory = [...uploadedFilesHistory, ...initialUploadHistory];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl blur-md opacity-50"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl">History</h1>
            <p className="text-sm text-slate-400">Track your activities and past interactions</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="uploads" className="w-full">
        <TabsList className="bg-white/5 backdrop-blur-xl border border-white/10 mb-8 p-1">
          <TabsTrigger 
            value="uploads" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload History
          </TabsTrigger>
          <TabsTrigger 
            value="queries"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Query History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="uploads">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              {allUploadHistory.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-slate-500" />
                  </div>
                  <p className="text-slate-400">No upload history yet</p>
                  <p className="text-sm text-slate-500 mt-1">Upload documents to see them here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allUploadHistory.map((item, index) => (
                    <div
                      key={item.id + '-' + index}
                      className="group flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center flex-shrink-0 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all">
                        {item.type === 'Document' ? (
                          <FileText className="w-6 h-6 text-blue-400" />
                        ) : (
                          <ExternalLink className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white mb-2">{item.name}</div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {item.date} at {item.time}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                            {item.type}
                          </span>
                          {item.size !== '-' && (
                            <span className="text-slate-500">{item.size}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="px-3 py-1.5 rounded-lg text-xs bg-green-500/20 text-green-400 border border-green-500/20">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <div className="space-y-3">
                {queryHistory.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center flex-shrink-0 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all">
                      <MessageSquare className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {item.query}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {item.date} at {item.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" />
                          {item.sourcesCount} sources referenced
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Stats Summary */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-xl border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl text-white mb-1">{allUploadHistory.length}</div>
                <div className="text-sm text-slate-400">Total Uploads</div>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-xl border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl text-white mb-1">{queryHistory.length}</div>
                <div className="text-sm text-slate-400">Queries Made</div>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-xl border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl text-white mb-1">100%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
