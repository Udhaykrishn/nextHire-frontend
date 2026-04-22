import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  imageProps?: {
    src: string;
    title: string;
    description: string;
  };
}

export function AuthLayout({ children, imageProps }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-hidden">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative z-10">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
          {children}
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 bg-cyan-500 relative flex-col justify-center p-24 items-start">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-600 opacity-90" />
        {imageProps && (
          <div className="relative z-10 text-white space-y-6 max-w-lg">
            {/* Optional image render can go here if needed: <img src={imageProps.src} alt="" className="..." /> */}
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-tight drop-shadow-sm">
              {imageProps.title}
            </h1>
            <p className="text-xl text-cyan-50 font-medium">
              {imageProps.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
