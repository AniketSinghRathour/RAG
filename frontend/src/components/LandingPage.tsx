import { Button } from './ui/button';
import { Brain, Database, FileSearch, Shield, Zap, ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

export default function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse delay-500"></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-white/10 to-pink-600 rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <Brain className="w-7 h-7" />
                </div>
              </div>
              <div>
                <div className="text-2xl tracking-tight">SARAL.ai</div>
                <div className="text-xs text-blue-400 -mt-1">Smart AI Retrieval</div>
              </div>
            </div>
            <Button 
              onClick={onLoginClick} 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white shadow-2xl cursor-pointer"
            >
              Login
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Ministry of Education • Department of Higher Education</span>
              </div>
            </div>
            
            {/* Main Heading - Asymmetric */}
            <div className="mb-12 text-center">
              <h1 className="text-7xl md:text-8xl mb-6 leading-[0.95] tracking-tight">
                <span className="block bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                  Smart AI
                </span>
                <span className="block bg-gradient-to-r from-white/10 to-pink-600 bg-clip-text text-transparent">
                  Retrieval & Analysis
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Revolutionize decision-making with AI-powered search and insights across regulations, 
                policies, and schemes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
              <Button 
                onClick={onLoginClick}
                size="lg"
                className="relative group bg-gradient-to-br from-white/10 to-pink-600 hover:from-white/10 hover:to-pink-500 text-lg px-8 py-6 shadow-2xl shadow-pink-600/25 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-pink-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </Button>
              <a href="https://youtu.be/bN9i3VQWVm4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 text-white text-lg px-8 py-6 cursor-pointer"
                >
                  View Demo
                </Button>
              </a>
              
            </div>

            {/* Stats - Glassmorphism Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard value="1000+" label="Documents" />
              <StatCard value="50+" label="Policies" />
              <StatCard value="99.9%" label="Accuracy" />
              <StatCard value="<2s" label="Response Time" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-slate-400">Everything you need for intelligent data retrieval</p>
            </div>

            {/* Feature Grid - Asymmetric Layout */}
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<FileSearch className="w-7 h-7" />}
                title="Intelligent Search"
                description="Natural language queries across all your documents and databases with contextual understanding"
                gradient="from-white/10 to-pink-600/20"
              />
              <FeatureCard
                icon={<Database className="w-7 h-7" />}
                title="Unified Data Access"
                description="Connect multiple sources - documents, web, and databases - in one seamless platform"
                gradient="from-purple-500/20 to-pink-500/20"
              />
              <FeatureCard
                icon={<Zap className="w-7 h-7" />}
                title="Lightning Fast"
                description="Sub-2 second response times with accurate, sourced answers to complex queries"
                gradient="from-amber-500/20 to-orange-500/20"
              />
              <FeatureCard
                icon={<Shield className="w-7 h-7" />}
                title="Secure Access"
                description="Role-based permissions ensure sensitive data stays protected with audit trails"
                gradient="from-green-500/20 to-emerald-500/20"
              />
              <FeatureCard
                icon={<Brain className="w-7 h-7" />}
                title="AI-Powered Insights"
                description="Advanced machine learning extracts key insights and patterns from your data"
                gradient="from-white/10 to-pink-600/20"
              />
              <FeatureCard
                icon={<TrendingUp className="w-7 h-7" />}
                title="Smart Analytics"
                description="Track usage, monitor performance, and optimize your knowledge base over time"
                gradient="from-rose-500/20 to-red-500/20"
              />
            </div>
          </div>
        </div>

        {/* Testimonial / Trust Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="text-sm text-blue-400 uppercase tracking-wider">Trusted by Education Leaders</span>
                </div>
                <p className="text-2xl md:text-3xl text-slate-200 leading-relaxed mb-6">
                  "SARAL.ai has transformed how we access and analyze policy documents. What used to take hours now takes seconds."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-pink-600 rounded-full"></div>
                  <div>
                    <div className="text-white">Dr. Rajesh Kumar</div>
                    <div className="text-sm text-slate-400">Director, Higher Education Policy Division</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/5">
          <div className="text-center text-slate-500">
            <p className="mb-2">© 2025 SARAL.ai - Ministry of Education, Department of Higher Education</p>
            <p className="text-sm">Smart Education Initiative • Government of India</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all">
        <div className="text-3xl md:text-4xl bg-gradient-to-r from-white/10 to-pink-600 bg-clip-text text-transparent mb-1">
          {value}
        </div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
}) {
  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full">
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-5 text-white backdrop-blur-xl`}>
          {icon}
        </div>
        <h3 className="text-xl mb-3 text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
