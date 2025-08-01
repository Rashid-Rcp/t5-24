"use client";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MainContainer from "@/components/Container/MainContainer";
import MainContentHolder from "@/components/Sesction/MainContentHolder";

type LoginData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginData>({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => axiosInstance.post("/account/login", data),
    onSuccess: (data: any) => {
      if (data.data.success) {
        router.replace("/");
      } else {
        toast.error(data.data.message, { theme: "colored" });
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed", {
        theme: "colored",
      });
    },
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: keyof LoginData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      loginMutation.mutate(formData);
    }
  };

  return (
    <div className="hide-scroll max-h-screen overflow-y-auto">
      <div className="flex flex-col gap-4 items-center justify-center py-8 bg-gray-100">
        <div className="bg-t5-white-lite p-8 rounded-lg border border-t5-gray w-full max-w-[500px]">
          <div className="flex justify-center items-center mb-8">
            <img src="/img/T5-logo.png" alt="Logo" className="h-16 w-auto" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`px-4 py-2 rounded-full mt-1 block w-full p-2 border ${
                    errors.email ? "border-red-500" : "border-t5-black"
                  } placeholder:text-gray-500`}
                  placeholder="Email"
                />
                <div className="min-h-[20px] px-4 mt-0">
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`px-4 py-2 rounded-full mt-1 block w-full p-2 border ${
                    errors.password ? "border-red-500" : "border-t5-black"
                  } placeholder:text-gray-500`}
                  placeholder="Password"
                />
                <div className="min-h-[20px] px-4 mt-0">
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="rounded-full border w-full bg-t5-black text-white p-2 hover:bg-white hover:text-t5-black hover:border hover:border-t5-black transition duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {loginMutation.isPending ? (
                <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
        <div className="bg-t5-white-lite p-8 rounded-lg border border-t5-gray w-1/3">
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-t5-black">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
