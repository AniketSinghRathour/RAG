import { useState, lazy, Suspense } from 'react';
import { Toaster } from './components/ui/sonner';

const LandingPage = lazy(() => import('./components/LandingPage'));
const LoginDialog = lazy(() => import('./components/LoginDialog'));
const Dashboard = lazy(() => import('./components/Dashboard'));

export interface User {
  name: string;
  email: string;
  role: 'officer' | 'user';
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <>
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
          <Dashboard user={user} onLogout={handleLogout} />
        </Suspense>
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
        <LandingPage onLoginClick={() => setShowLogin(true)} />
        <LoginDialog 
          open={showLogin} 
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      </Suspense>
      <Toaster />
    </>
  );
}
