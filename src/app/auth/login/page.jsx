'use client';

import React from 'react';
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from '@heroui/react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  // Handlers for social authentication providers
  const handleGoogleLogin = () => {
    alert('Initiating secure Google OAuth single-sign-on workflow...');
  };

  const onSubmit =async e => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );
    
    

    const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: true,
    });
    console.log("data",data, "error",error);
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] flex flex-col items-center justify-start pt-16 pb-24 px-4 sm:px-6">
      {/* Brand Identity Header Matching Registration Block */}
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

      {/* Main Structural Typography Headlines */}
      <h1 className="text-gray-900 font-extrabold text-3xl sm:text-[34px] tracking-tight text-center mb-1">
        Welcome back
      </h1>
      <p className="text-gray-400 text-[14px] font-medium text-center mb-10">
        Sign in to your account to continue
      </p>

      {/* Box Grid Form Wrapper Constraint */}
      <div className="w-full max-w-[420px] flex flex-col">
        {/* Third-Party Federated Google OAuth Integration Hook */}
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

        {/* Section Layout Break Line Spacer */}
        <div className="w-full flex items-center justify-center mb-6 relative">
          <div className="w-full h-[1px] bg-gray-100" />
          <span className="absolute bg-white px-3 text-gray-400 font-medium text-xs tracking-wide">
            or sign in with email
          </span>
        </div>

        {/* Functional HeroUI Layout Form Wrapper */}
        <Form className="w-full flex flex-col gap-5" onSubmit={onSubmit}>
          {/* REQUIRED FIELD: User Identity Email Input */}
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

          {/* REQUIRED FIELD: Password Authentication Token Input */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
          >
            <Label className="text-gray-500 font-bold text-[13px] mb-1.5 block">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Enter your password"
              className="w-full h-12 bg-gray-50/70 border border-gray-100/80 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-orange-500 transition-all outline-none"
            />
            <FieldError className="text-red-500 text-xs mt-1 font-medium" />
          </TextField>

          {/* Core Submit Call-To-Action Trigger */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d97706] text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 border-none outline-none mt-2 transition-all group"
          >
            <span>Sign In</span>
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"
              />
            </svg>
          </Button>
        </Form>

        {/* Alternative Page Redirect Navigation Trigger Link */}
        <Link href="/auth/register" className="text-gray-400 font-medium text-sm text-center mt-6">
          Don&apos;t have an account?{' '}
          <span className="text-[#f59e0b] font-bold cursor-pointer hover:underline">
            Sign up
          </span>
        </Link>
      </div>
    </div>
  );
}
