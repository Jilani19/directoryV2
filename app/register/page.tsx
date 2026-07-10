import React from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export const metadata = {
  title: "Register | Verified Global Life Sciences Directory",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <UserPlus className="text-white" size={24} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-primary hover:text-primary-600 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-3xl sm:px-10">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700">
                Work Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label className="ml-2 block text-sm text-slate-600 font-medium">
                I agree to the{" "}
                <Link href="/terms" className="font-bold text-primary hover:text-primary-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-bold text-primary hover:text-primary-600">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-sm font-bold text-white bg-primary hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
