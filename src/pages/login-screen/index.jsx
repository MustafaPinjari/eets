import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityBadge from './components/SecurityBadge';
import SystemStatus from './components/SystemStatus';

const LoginScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        // Check if session is still valid (optional: implement session timeout)
        if (userData?.loginTime) {
          navigate('/dashboard');
        }
      } catch (error) {
        // Clear invalid session data
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(61,64,91,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(224,122,95,0.1)_0%,transparent_50%)]"></div>
      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Login Header */}
            <LoginHeader />
            
            {/* Login Form */}
            <div className="bg-card/80 backdrop-blur-sm border border-border shadow-elevated rounded-2xl p-8">
              <LoginForm />
            </div>
          </div>
        </div>

        {/* Right Panel - Security & Status (Desktop Only) */}
        <div className="hidden lg:flex lg:w-96 bg-card/50 backdrop-blur-sm border-l border-border">
          <div className="flex flex-col justify-between p-8 w-full">
            {/* Security Badge */}
            <div>
              <SecurityBadge />
            </div>

            {/* System Status */}
            <div className="mt-8">
              <SystemStatus />
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} Enterprise EMS. All rights reserved.
              </p>
              <div className="flex justify-center gap-4 mt-2">
                <button className="text-xs text-muted-foreground hover:text-foreground transition-micro">
                  Privacy Policy
                </button>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-micro">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-t border-border p-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} Enterprise EMS. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-1">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-micro">
              Privacy
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-micro">
              Terms
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-micro">
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;