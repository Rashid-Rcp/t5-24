"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import { UserFormData } from '@/Type/user';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const registerMutation = useMutation({
    mutationFn: (data: UserFormData) => axiosInstance.post('/account', data),
    onSuccess: (data: any) => {
      if(data.data.success){
        toast.success(data.data.message);
        //set token to local storage
        localStorage.setItem('t5_token', data.data.token);
        // Redirect to login page after successful registration
        router.push('/');
      }
      else{
        if(data.data.field === 'username'){
          setErrors({...errors, username: data.data.error});
        }
        else if(data.data.field === 'email'){
          setErrors({...errors, email: data.data.error});
        }
      }

      //set token to local storage
     // localStorage.setItem('token', data.data.token);
      // Redirect to login page after successful registration
      //window.location.href = '/login';
    },
    onError: (error: any) => {
      // Handle API errors here
      toast.error(error.response.data.message,{ theme:"colored"});
      console.error('Registration failed:', error);
    }
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    else if(formData.fullName.length < 3){
      newErrors.fullName = 'Full name must be at least 3 characters';
      isValid = false;
    }
    else if(formData.fullName.length > 50){
      newErrors.fullName = 'Full name must be less than 50 characters';
      isValid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
    else if(formData.username.length < 3){
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }
    else if(formData.username.length > 50){
      newErrors.username = 'Username must be less than 50 characters';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      registerMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [id]: ''
    }));
  };

  return (
    <div className="hide-scroll max-h-screen overflow-y-auto">

    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-t5-white-lite p-8 rounded-lg border border-t5-gray w-1/3">
        <div className="flex justify-center items-center mb-8">
          <img src="/img/T5-logo.png" alt="Logo" className="h-16 w-auto" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 min-h-[60px] relative">
            <input
              type="text"
              id="fullName"
              autoComplete="off"
              value={formData.fullName}
              onChange={handleChange}
              className={`px-4 py-2 rounded-full mt-1 block w-full p-2 border ${
                errors.fullName ? 'border-red-500' : 'border-t5-black'
              } placeholder:text-gray-500`}
              placeholder="Full Name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1 absolute bottom-0">{errors.fullName}</p>}
          </div>
          <div className="mb-2 min-h-[60px] relative">
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange}
              className={`px-4 py-2 rounded-full mt-1 block w-full p-2 border ${
                errors.username ? 'border-red-500' : 'border-t5-black'
              } placeholder:text-gray-500`}
              placeholder="Username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1 absolute bottom-0">{errors.username}</p>}
          </div>
          <div className="mb-2 min-h-[60px] relative">
            <input
              type="text"
              id="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              className={`px-4 py-2 rounded-full mt-1 block w-full p-2 border ${
                errors.email ? 'border-red-500' : 'border-t5-black'
              } placeholder:text-gray-500`}
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 absolute bottom-0">{errors.email}</p>}
          </div>
          
          <div className="mb-2 min-h-[60px] relative">
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className={`px-4 py-2 rounded-full mt-1 block w-full p-2 border ${
                errors.password ? 'border-red-500' : 'border-t5-black'
              } placeholder:text-gray-500`}
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 absolute bottom-0">{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="rounded-full border w-full bg-t5-black text-white p-2 hover:bg-white hover:text-t5-black hover:border hover:border-t5-black transition duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            {registerMutation.isPending ? (
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
            ) : (
              'Register'
            )}
          </button>
          
          {registerMutation.isError && (
            <p className="text-red-500 text-sm mt-2 text-center">
              Registration failed. Please try again.
            </p>
          )}
        </form>
      </div>
        <div className="bg-t5-white-lite p-8 rounded-lg border border-t5-gray w-1/3">
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-t5-black">
            Log in
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
