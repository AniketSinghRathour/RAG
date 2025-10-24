import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FileText, Database, Search, TrendingUp, Clock, CheckCircle, Sparkles, Activity } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const queryData = [
  { month: 'Jan', queries: 145, response: 1.9 },
  { month: 'Feb', queries: 189, response: 1.7 },
  { month: 'Mar', queries: 234, response: 1.8 },
  { month: 'Apr', queries: 298, response: 1.6 },
  { month: 'May', queries: 356, response: 1.5 },
  { month: 'Jun', queries: 423, response: 1.4 },
];

const documentTypeData = [
  { name: 'Policies', value: 234, color: '#3b82f6' },
  { name: 'Regulations', value: 187, color: '#8b5cf6' },
  { name: 'Schemes', value: 156, color: '#ec4899' },
  { name: 'Projects', value: 143, color: '#10b981' },
];

const recentActivity = [
  { action: 'Document uploaded', item: 'NEP_2020_Guidelines.pdf', time: '2 hours ago', type: 'upload' },
  { action: 'Query processed', item: 'Scholarship scheme eligibility', time: '3 hours ago', type: 'query' },
  { action: 'Database connected', item: 'UGC Regulations DB', time: '5 hours ago', type: 'database' },
  { action: 'Document uploaded', item: 'AICTE_Approval_Process.pdf', time: '1 day ago', type: 'upload' },
  { action: 'Query processed', item: 'NAAC accreditation process', time: '1 day ago', type: 'query' },
];

const performanceData = [
  { time: '00:00', load: 45 },
  { time: '04:00', load: 32 },
  { time: '08:00', load: 78 },
  { time: '12:00', load: 95 },
  { time: '16:00', load: 86 },
  { time: '20:00', load: 62 },
];

export default function DashboardHome() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-slate-400">Real-time analytics and system performance metrics</p>
        </div>
        <div className="px-4 py-2 bg-green-500/20 border border-green-500/20 rounded-xl flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400">System Operational</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Total Documents"
          value="12"
          change="+2"
          positive
          gradient="from-blue-500/20 to-cyan-500/20"
          color="blue"
        />
        <StatCard
          icon={<Search className="w-6 h-6" />}
          title="Queries Processed"
          value="37"
          change="+8"
          positive
          gradient="from-white/10 to-pink-600/20"
          color="purple"
        />
        <StatCard
          icon={<Database className="w-6 h-6" />}
          title="Data Sources"
          value="24"
          change="+3 new"
          positive
          gradient="from-green-500/20 to-emerald-500/20"
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Avg Response"
          value="1.4s"
          change="-0.4s faster"
          positive
          gradient="from-amber-500/20 to-orange-500/20"
          color="amber"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Query Trends - Larger */}
        <Card className="md:col-span-2 bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Query Trends & Performance
              </CardTitle>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-400">Queries</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-400">Response Time</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={queryData}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                  labelStyle={{ color: '#e2e8f0', marginBottom: '8px' }}
                />
                <Area type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorQueries)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Document Distribution */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Content Mix
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {documentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {documentTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            System Load (Last 24 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155', 
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Line type="monotone" dataKey="load" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all group">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'upload' 
                    ? 'bg-blue-500/20 group-hover:bg-blue-500/30' 
                    : activity.type === 'query'
                    ? 'bg-purple-500/20 group-hover:bg-purple-500/30'
                    : 'bg-green-500/20 group-hover:bg-green-500/30'
                } transition-all`}>
                  <CheckCircle className={`w-5 h-5 ${
                    activity.type === 'upload' 
                      ? 'text-blue-400' 
                      : activity.type === 'query'
                      ? 'text-purple-400'
                      : 'text-green-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="text-white mb-1">{activity.action}</div>
                  <div className="text-sm text-slate-400">{activity.item}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, title, value, change, positive, gradient, color }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  change: string;
  positive: boolean;
  gradient: string;
  color: string;
}) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all overflow-hidden group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between mb-6">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-${color}-400 backdrop-blur-xl`}>
            {icon}
          </div>
          <div className={`text-sm px-2.5 py-1 rounded-lg ${positive ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
            {change}
          </div>
        </div>
        <div className="text-3xl text-white mb-2">{value}</div>
        <div className="text-sm text-slate-400">{title}</div>
      </CardContent>
    </Card>
  );
}
