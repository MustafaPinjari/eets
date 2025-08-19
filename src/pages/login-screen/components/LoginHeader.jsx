import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Company Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevated">
          <Icon name="Users" size={32} color="white" />
        </div>
      </div>

      {/* Company Name & Tagline */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Enterprise EMS
        </h1>
        <p className="text-lg text-muted-foreground">
          Employee Management System
        </p>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Secure access to your workplace dashboard, attendance tracking, and employee services
        </p>
      </div>

      {/* Welcome Message */}
      <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/10">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-muted-foreground">
          Sign in to access your personalized employee portal and manage your work activities
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;