export function Companies() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-black text-cyan-500 uppercase tracking-[0.3em] italic mb-8">
          Trusted by industry leaders
        </p>
        <div className="flex justify-center flex-wrap gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-2xl font-black text-slate-800 tracking-tighter">
            GOOGLE
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tighter">
            META
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tighter">
            AMAZON
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tighter">
            NETFLIX
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tighter">
            APPLE
          </div>
        </div>
      </div>
    </section>
  );
}
