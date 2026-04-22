export function Features() {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50 to-white -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[0.3em] italic">
            Capabilities
          </h2>
          <p className="text-4xl lg:text-5xl font-black text-slate-800 uppercase tracking-tighter italic">
            Why we are different
          </p>
          <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl font-black text-cyan-500 italic">
                01
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
              Smart Matching
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Advanced AI algorithms ensure you only see roles that align
              perfectly with your expertise and career goals.
            </p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl font-black text-cyan-500 italic">
                02
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
              Verified Companies
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Every employer on our platform is strictly authenticated for a
              complete, safe, and reliable hiring process.
            </p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl font-black text-cyan-500 italic">
                03
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
              Direct Messaging
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Skip the intermediaries. Reach out directly and communicate with
              verified hiring decision makers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
