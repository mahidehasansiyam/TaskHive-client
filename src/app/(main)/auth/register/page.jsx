'use client';

import React, { useState } from 'react';
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  // Setup local role selection state ('client' | 'freelancer') matching your mockup views
  const [role, setRole] = useState('client');
  const [loading, setLoading] = useState(false);

  // Google OAuth rule: Any signups through Google default automatically to Client role
  const handleGoogleLogin = async () => {
     const data = await authClient.signIn.social({
    provider: "google",
  });
    
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (loading) return;

    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );

    // Conditionally map freelancer-specific form fields to match database schemas
    let customSkills = [];
    let customBio = '';
    let customHourlyRate = 0;

    if (role === 'freelancer') {
      customSkills = formData.skills
        ? formData.skills
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        : [];
      customBio = formData.bio || '';
      customHourlyRate = formData.hourlyRate ? Number(formData.hourlyRate) : 0;
    }

    setLoading(true);

    // Call BetterAuth client handler passing standard profile fields along with optional custom metadata keys
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.imageUrl || '', 
      role: role || "client",
      skills: customSkills,
      bio: customBio,
      hourlyRate: customHourlyRate,
      isBlocked : "no",
      callbackURL: '/',
    });

    setLoading(false);

    if (error) {
      console.error('Registration Error:', error);
      alert(error.message || 'An error occurred during registration.');
    } else {
      console.log('Registration Successful Data:', data);
      router.push('/');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] flex flex-col items-center justify-start pt-12 pb-24 px-4 sm:px-6">
      {/* Platform Logo Brand Header */}
      <div className="flex items-center gap-2 mb-4 select-none">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ea580c] flex items-center justify-center shadow-md shadow-orange-500/20">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <span className="text-[#f59e0b] font-extrabold text-[22px] tracking-tight">
          TaskHive
        </span>
      </div>

      {/* Main Titles */}
      <h1 className="text-gray-900 font-extrabold text-3xl sm:text-[34px] tracking-tight text-center mb-1">
        Create your account
      </h1>
      <p className="text-gray-400 text-[14px] font-medium text-center mb-8">
        Join thousands of professionals on TaskHive
      </p>

      {/* Main Box Wrapper */}
      <div className="w-full max-w-[460px] flex flex-col">
        {/* Interactive Dual Card Layout for Account Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Client Selection Card */}
          <div
            onClick={() => setRole('client')}
            className={`cursor-pointer relative p-5 rounded-[18px] border-2 flex flex-col items-center text-center transition-all select-none ${
              role === 'client'
                ? 'bg-[#fffbf4] border-[#f59e0b] shadow-sm'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            {role === 'client' && (
              <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            )}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${role === 'client' ? 'bg-amber-100/70 text-[#f59e0b]' : 'bg-gray-50 text-gray-400'}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span
              className={`font-bold text-[15px] ${role === 'client' ? 'text-[#f59e0b]' : 'text-gray-800'}`}
            >
              Client
            </span>
            <span className="text-gray-400 text-xs mt-0.5 font-medium">
              Hire talent
            </span>
          </div>

          {/* Freelancer Selection Card */}
          <div
            onClick={() => setRole('freelancer')}
            className={`cursor-pointer relative p-5 rounded-[18px] border-2 flex flex-col items-center text-center transition-all select-none ${
              role === 'freelancer'
                ? 'bg-[#e6f7f0] border-[#10b981] shadow-sm'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            {role === 'freelancer' && (
              <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            )}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${role === 'freelancer' ? 'bg-emerald-100/70 text-[#10b981]' : 'bg-gray-50 text-gray-400'}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <span
              className={`font-bold text-[15px] ${role === 'freelancer' ? 'text-[#10b981]' : 'text-gray-800'}`}
            >
              Freelancer
            </span>
            <span className="text-gray-400 text-xs mt-0.5 font-medium">
              Find work
            </span>
          </div>
        </div>

        {/* Third-Party Authentication Action */}
        <Button
          onPress={handleGoogleLogin}
          className="w-full h-12 bg-gray-50/50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold text-[14px] rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-sm mb-6"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.62 0 3.08.56 4.22 1.66l3.15-3.15C17.45 1.71 14.91 1 12 1 7.35 1 3.39 3.67 1.41 7.56l3.77 2.92c.89-2.66 3.38-4.44 6.82-4.44z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.74-2.38 3.58l3.7 2.87c2.16-1.99 3.41-4.92 3.41-8.6z"
            />
            <path
              fill="#FBBC05"
              d="M5.18 14.52c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.41 7.56C.51 9.35 0 11.35 0 13.47c0 2.12.51 4.12 1.41 5.91l3.77-2.86z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.7-2.87c-1.03.69-2.35 1.1-4.26 1.1-3.44 0-5.93-1.78-6.82-4.44L1.41 16.7C3.39 20.61 7.35 23 12 23z"
            />
          </svg>
          <span>Continue with Google</span>
        </Button>

        {/* Separator Break */}
        <div className="w-full flex items-center justify-center mb-6 relative">
          <div className="w-full h-[1px] bg-gray-100" />
          <span className="absolute bg-white px-3 text-gray-400 font-medium text-xs tracking-wide">
            or sign up with email
          </span>
        </div>

        {/* Form Inputs */}
        <Form className="w-full flex flex-col gap-5" onSubmit={onSubmit}>
          {/* REQUIRED: Full Name Field Input */}
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="text-gray-500 font-bold text-[13px] mb-1.5 block">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="John Doe"
              className="w-full h-12 bg-gray-50/70 border border-gray-100/80 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-orange-500 transition-all outline-none"
            />
            <FieldError className="text-red-500 text-xs mt-1 font-medium" />
          </TextField>

          {/* REQUIRED: Email Address Field Input */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={value => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return 'Please enter a valid email address';
              }
              return null;
            }}
          >
            <Label className="text-gray-500 font-bold text-[13px] mb-1.5 block">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="you@example.com"
              className="w-full h-12 bg-gray-50/70 border border-gray-100/80 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-orange-500 transition-all outline-none"
            />
            <FieldError className="text-red-500 text-xs mt-1 font-medium" />
          </TextField>

          {/* NOT REQUIRED: Image URL Field Input */}
          <TextField name="imageUrl" type="url" className="w-full">
            <Label className="text-gray-500 font-bold text-[13px] mb-1.5 block">
              Image URL{' '}
              <span className="text-gray-400 font-normal text-xs">
                (Optional)
              </span>
            </Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              className="w-full h-12 bg-gray-50/70 border border-gray-100/80 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-orange-500 transition-all outline-none"
            />
            <FieldError className="text-red-500 text-xs mt-1 font-medium" />
          </TextField>

          {/* REQUIRED: Password Input with Constraints */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
            validate={value => {
              if (value.length < 6) {
                return 'Password must be at least 6 characters long';
              }
              if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
              }
              if (!/[a-z]/.test(value)) {
                return 'Password must contain at least one lowercase letter';
              }
              return null;
            }}
          >
            <Label className="text-gray-500 font-bold text-[13px] mb-1.5 block">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Min. 6 characters"
              className="w-full h-12 bg-gray-50/70 border border-gray-100/80 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-orange-500 transition-all outline-none"
            />
            <FieldError className="text-red-500 text-xs mt-1 font-medium" />
          </TextField>

          {/* Conditional Profile Container Box (Freelancer view only) */}
          {role === 'freelancer' && (
            <div className="w-full p-5 rounded-[18px] border border-emerald-100 bg-[#e6f7f0]/30 flex flex-col gap-4">
              <div className="flex items-center gap-1.5 text-[#10b981] font-bold text-[13px]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Freelancer Profile</span>
              </div>

              {/* REQUIRED: Skills inside Freelancer Panel */}
              <div className="w-full">
                <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-1 block">
                  Skills <span className="text-red-500">*</span>{' '}
                  <span className="lowercase font-normal text-gray-400">
                    (comma-separated)
                  </span>
                </label>
                <input
                  required
                  type="text"
                  name="skills"
                  placeholder="React, Node.js, Design"
                  className="w-full h-11 bg-white/90 border border-gray-200/60 rounded-xl px-4 text-sm text-gray-800 outline-none focus:border-emerald-400 transition-all"
                />
              </div>

              {/* REQUIRED: Bio inside Freelancer Panel */}
              <div className="w-full">
                <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-1 block">
                  Bio <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  name="bio"
                  rows={2}
                  placeholder="Tell clients about yourself..."
                  className="w-full p-3 bg-white/90 border border-gray-200/60 rounded-xl text-sm text-gray-800 outline-none focus:border-emerald-400 transition-all resize-none font-sans"
                />
              </div>

              {/* NOT REQUIRED: Hourly rate */}
              <div className="w-full">
                <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-1 block">
                  Hourly Rate (USD){' '}
                  <span className="lowercase font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  placeholder="50"
                  className="w-full h-11 bg-white/90 border border-gray-200/60 rounded-xl px-4 text-sm text-gray-800 outline-none focus:border-emerald-400 transition-all"
                />
              </div>
            </div>
          )}

          {/* Submission Main Call-To-Action Primary Trigger */}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full h-12 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d97706] text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 border-none outline-none mt-2 transition-all group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            {!loading && (
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </Button>
        </Form>

        {/* Bottom Navigation Link */}
        <p className="text-gray-400 font-medium text-sm text-center mt-6">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-[#f59e0b] font-bold cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
