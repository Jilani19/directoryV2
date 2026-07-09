import React from 'react';

interface InfoCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({ title, icon, children, className = "" }: InfoCardProps) {
  return (
    <div 
      className={`bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex flex-col h-full ${className}`}
      tabIndex={0}
      aria-label={title}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-primary">{icon}</div>}
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>
      <div className="flex-1 text-slate-600 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
