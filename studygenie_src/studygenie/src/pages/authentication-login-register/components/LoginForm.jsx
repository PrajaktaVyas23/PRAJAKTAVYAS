import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const LoginForm = ({ isLoading, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const mockCredentials = {
    email: "student@studygenie.com",
    password: "StudyGenie123"
  };

  const handleChange = (e) => {
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    // Check mock credentials
    if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
      onSubmit(formData);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setErrors({
        email: 'Invalid credentials. Use: student@studygenie.com',
        password: 'Invalid credentials. Use: StudyGenie123'
      });
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleChange}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleChange}
        error={errors?.password}
        required
        disabled={isLoading}
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleChange}
          disabled={isLoading}
        />
        
        <Button
          variant="link"
          onClick={handleForgotPassword}
          disabled={isLoading}
          className="text-sm p-0 h-auto"
        >
          Forgot Password?
        </Button>
      </div>
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        iconName="LogIn"
        iconPosition="left"
        className="mt-6"
      >
        Sign In
      </Button>
      {/* Mock Credentials Helper */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
        <p className="text-xs font-mono">Email: {mockCredentials?.email}</p>
        <p className="text-xs font-mono">Password: {mockCredentials?.password}</p>
      </div>
    </form>
  );
};

export default LoginForm;