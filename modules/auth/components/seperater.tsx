const AuthSeperater = () => {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
      </div>
      <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em] italic">
        <span className="px-6 bg-card dark:bg-[#18181b] text-muted-foreground opacity-40">
          Standard Authentication
        </span>
      </div>
    </div>
  );
};

export default AuthSeperater;
