export default function Loading() {
  return (
    <div className="animate-pulse space-y-6 max-w-[1400px] mx-auto p-8 w-full mt-10">
      <div className="h-64 bg-slate-100 rounded-[24px] w-full"></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="h-64 bg-slate-100 rounded-3xl lg:col-span-8"></div>
        <div className="h-64 bg-slate-100 rounded-3xl lg:col-span-4"></div>
      </div>
    </div>
  );
}
