import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { User } from '../App';
import { User as UserIcon, Mail, Shield, Bell, Database, Sparkles, Save } from 'lucide-react';
import { Switch } from './ui/switch';
import { toast } from 'sonner';

interface SettingsPageProps {
  user: User;
}

export default function SettingsPage({ user }: SettingsPageProps) {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-pink-600 rounded-xl blur-md opacity-60"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-white/10 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl">Settings</h1>
            <p className="text-sm text-slate-400">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Profile Settings */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-400" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-pink-600 rounded-2xl flex items-center justify-center text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-white mb-1">{user.name}</div>
                <div className="text-sm text-slate-400 mb-2">{user.email}</div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400 capitalize">{user.role}</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-5 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={user.name}
                  className="bg-white/5 border-white/10 text-white h-11 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user.email}
                    className="pl-10 bg-white/5 border-white/10 text-white h-11 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <div className="text-white mb-1">Email Notifications</div>
                <div className="text-sm text-slate-400">Receive email updates for important events</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <div className="text-white mb-1">Upload Notifications</div>
                <div className="text-sm text-slate-400">Get notified when uploads are complete</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <div className="text-white mb-1">Query Alerts</div>
                <div className="text-sm text-slate-400">Alerts for query processing status</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <div className="text-white mb-1">System Updates</div>
                <div className="text-sm text-slate-400">Notifications about system maintenance and updates</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>


        {/* Save Button */}
          <div className="flex gap-4">
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-white/10 to-pink-600 hover:from-white/10 hover:to-pink-500 shadow-lg shadow-pink-500/25"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button
            className="border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
