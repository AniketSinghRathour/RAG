import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Database, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function DatabaseConnect() {
  const [connectionString, setConnectionString] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connectionString.trim()) {
      toast.error('Please enter a valid connection string');
      return;
    }

    setIsConnecting(true);

    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      setConnected(true);
      toast.success('Database connected successfully!');
      
      // Reset after 2 seconds
      setTimeout(() => {
        setConnected(false);
        setConnectionString('');
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Database className="w-12 h-12" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Connect Database
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Link external databases to enhance SARAL's data sources
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleConnect} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="connection" className="text-slate-300">Database Connection String</Label>
              <Input
                id="connection"
                type="text"
                placeholder="postgresql://user:password@host:port/database"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-14 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                disabled={isConnecting || connected}
              />
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Provide a secure connection string for your database
              </p>
            </div>

            <Button
              type="submit"
              disabled={isConnecting || connected}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 h-12 shadow-lg shadow-purple-500/25"
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
                'Connect Database'
              )}
            </Button>
          </form>

          {/* Info Sections */}
          <div className="space-y-4 mt-10">
            <div className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-xl border border-purple-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Database className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-white text-sm">Supported Databases</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  PostgreSQL
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  MySQL
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  MongoDB
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  SQL Server
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  Oracle DB
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  MariaDB
                </div>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-amber-500/10 to-amber-500/5 backdrop-blur-xl border border-amber-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-amber-400 text-sm">Security Best Practices</h3>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li>• Use encrypted connection protocols (SSL/TLS)</li>
                <li>• Implement read-only database users</li>
                <li>• Never share credentials publicly</li>
                <li>• Regularly rotate access credentials</li>
                <li>• Monitor database access logs</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
