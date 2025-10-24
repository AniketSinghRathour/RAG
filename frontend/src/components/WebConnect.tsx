import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Globe, Link2, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function WebConnect() {
  const [url, setUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsConnecting(true);

    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      setConnected(true);
      toast.success('Web source connected successfully!');
      
      // Reset after 2 seconds
      setTimeout(() => {
        setConnected(false);
        setUrl('');
      }, 2000);
    }, 1500);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
      <CardContent className="p-8">
        <div className="max-w-2xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Globe className="w-12 h-12" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Connect Web Source
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Integrate external web resources and expand SARAL's knowledge base
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleConnect} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="url" className="text-slate-300">Web URL</Label>
              <div className="relative group">
                <Link2 className="absolute left-4 top-4 h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.gov.in"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-14 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  disabled={isConnecting || connected}
                />
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Enter the URL of a website or web page to connect
              </p>
            </div>

            <Button
              type="submit"
              disabled={isConnecting || connected}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 h-12 shadow-lg shadow-blue-500/25"
            >
              {isConnecting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Connecting...
                </div>
              ) : connected ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Connected Successfully!
                </>
              ) : (
                'Connect Web Source'
              )}
            </Button>
          </form>

          {/* Info Sections */}
          <div className="grid md:grid-cols-2 gap-4 mt-10">
            <div className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-xl border border-blue-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-white text-sm">Supported Sources</h3>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li>• Government portals & websites</li>
                <li>• Educational institutions</li>
                <li>• Policy documentation sites</li>
                <li>• Regulatory body portals</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-xl border border-purple-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-white text-sm">Features</h3>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li>• Automatic content extraction</li>
                <li>• Real-time synchronization</li>
                <li>• Intelligent indexing</li>
                <li>• Secure authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
