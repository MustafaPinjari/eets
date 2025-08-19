import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Mock credentials for different user roles
  const mockCredentials = {
    'admin@company.com': { password: 'Admin@123', role: 'admin', name: 'System Administrator' },
    'hr@company.com': { password: 'HR@123', role: 'hr', name: 'HR Manager' },
    'manager@company.com': { password: 'Manager@123', role: 'manager', name: 'Team Manager' },
    'employee@company.com': { password: 'Employee@123', role: 'employee', name: 'John Employee' },
    'auditor@company.com': { password: 'Auditor@123', role: 'auditor', name: 'Compliance Auditor' }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 12) {
      newErrors.password = 'Password must be at least 12 characters with uppercase, lowercase, number, and symbol';
    }

    if (showMFA && !mfaCode) {
      newErrors.mfaCode = 'MFA code is required';
    } else if (showMFA && mfaCode?.length !== 6) {
      newErrors.mfaCode = 'MFA code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = mockCredentials?.[formData?.email?.toLowerCase()];
      
      if (!user || user?.password !== formData?.password) {
        setLoginAttempts(prev => prev + 1);
        
        if (loginAttempts >= 2) {
          setErrors({ 
            general: 'Account temporarily locked due to multiple failed attempts. Please try again in 15 minutes or contact support.' 
          });
        } else {
          setErrors({ 
            general: `Invalid email or password. ${2 - loginAttempts} attempts remaining. Use: admin@company.com / Admin@123` 
          });
        }
        return;
      }

      // Check if MFA is required (simulate for admin and hr roles)
      if ((user?.role === 'admin' || user?.role === 'hr' || user?.role === 'auditor') && !showMFA) {
        setShowMFA(true);
        setErrors({ mfaCode: 'Please enter the 6-digit code sent to your registered device' });
        return;
      }

      // Validate MFA code if required
      if (showMFA && mfaCode !== '123456') {
        setErrors({ mfaCode: 'Invalid MFA code. Use: 123456' });
        return;
      }

      // Store user session
      localStorage.setItem('user', JSON.stringify({
        email: formData?.email,
        role: user?.role,
        name: user?.name,
        loginTime: new Date()?.toISOString(),
        rememberMe: formData?.rememberMe
      }));

      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Simulate forgot password flow
    alert('Password reset link would be sent to your email address.');
  };

  const handleNeedHelp = () => {
    // Simulate help/support flow
    alert('For technical support, please contact IT helpdesk at support@company.com or call +1-800-HELP-EMS');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your work email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {/* MFA Code Field (Conditional) */}
        {showMFA && (
          <div className="space-y-2">
            <Input
              label="Multi-Factor Authentication Code"
              type="text"
              name="mfaCode"
              placeholder="Enter 6-digit code"
              value={mfaCode}
              onChange={(e) => {
                setMfaCode(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6));
                if (errors?.mfaCode) {
                  setErrors(prev => ({ ...prev, mfaCode: '' }));
                }
              }}
              error={errors?.mfaCode}
              required
              disabled={isLoading}
              maxLength={6}
            />
            <p className="text-xs text-muted-foreground">
              Code sent to your registered mobile device. Use: <span className="font-mono font-medium">123456</span>
            </p>
          </div>
        )}

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-accent hover:text-accent/80 transition-micro"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {showMFA ? 'Verify & Sign In' : 'Sign In'}
        </Button>

        {/* Help Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleNeedHelp}
            className="text-sm text-muted-foreground hover:text-foreground transition-micro"
            disabled={isLoading}
          >
            Need help signing in?
          </button>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Info" size={16} />
            Demo Credentials
          </h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">Admin:</span>
              <span className="font-mono">admin@company.com / Admin@123</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">HR:</span>
              <span className="font-mono">hr@company.com / HR@123</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">Manager:</span>
              <span className="font-mono">manager@company.com / Manager@123</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">Employee:</span>
              <span className="font-mono">employee@company.com / Employee@123</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">Auditor:</span>
              <span className="font-mono">auditor@company.com / Auditor@123</span>
            </div>
            <p className="text-xs text-muted-foreground/80 mt-2">
              * Admin, HR & Auditor roles require MFA code: <span className="font-mono font-medium">123456</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;