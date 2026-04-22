export const revalidate = 3600;

import Link from "next/link";
import { Navbar } from "../components/navbar";
import { Companies } from "../modules/landing/components/companies";
import { Features } from "../modules/landing/components/features";
import { Footer } from "../modules/landing/components/footer";
import { Hero } from "../modules/landing/components/hero";

export const metadata = {
  title: "NextHire | Intelligence-Driven Recruitment for Top Talent",
  description:
    "Join the most advanced ecosystem for professional growth. Connect with top employers and find your next milestone.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />

        <Companies />

        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[0.3em] italic">
                Process
              </h2>
              <p className="text-4xl font-black text-slate-800 uppercase tracking-tighter italic">
                How It Works
              </p>
              <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-2xl font-black italic text-cyan-500">
                  01
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase italic">
                  Create Profile
                </h3>
                <p className="text-slate-500 font-medium">
                  Build your professional identity with our AI-guided builder
                  that highlights your strengths.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-2xl font-black italic text-cyan-500">
                  02
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase italic">
                  Match Jobs
                </h3>
                <p className="text-slate-500 font-medium">
                  Our intelligence matches you with roles that truly fit your
                  skills and career aspirations.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-2xl font-black italic text-cyan-500">
                  03
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase italic">
                  Get Hired
                </h3>
                <p className="text-slate-500 font-medium">
                  Connect directly with decision-makers and secure your dream
                  offer faster than ever.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="text-3xl font-black text-cyan-500 mb-2">
                    98%
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Success Rate
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 mt-8">
                  <div className="text-3xl font-black text-cyan-500 mb-2">
                    24h
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Avg. Response
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 -mt-8">
                  <div className="text-3xl font-black text-cyan-500 mb-2">
                    10k+
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Companies
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="text-3xl font-black text-cyan-500 mb-2">
                    50k+
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Monthly Jobs
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[0.3em] italic">
                Why Choose Us
              </h2>
              <p className="text-4xl lg:text-5xl font-black text-slate-800 uppercase tracking-tighter italic leading-tight">
                Built for the <br />
                <span className="text-cyan-400">Modern workforce</span>
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 shrink-0" />
                  <p className="text-slate-600 font-medium">
                    Verified employers only. We manually vet every company that
                    joins our platform to ensure your safety.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 shrink-0" />
                  <p className="text-slate-600 font-medium">
                    AI-driven resume optimization. Get feedback on how to
                    improve your profile for specific job roles.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 shrink-0" />
                  <p className="text-slate-600 font-medium">
                    Direct communication. Skip the black hole of applications
                    and talk directly to hiring managers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Features />

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto rounded-[3rem] bg-cyan-400 p-8 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[40%] h-full bg-white/5" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl lg:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight">
                Ready to find <br /> your{" "}
                <span className="text-slate-900 drop-shadow-sm">
                  dream job?
                </span>
              </h2>
              <p className="text-cyan-50 font-black uppercase tracking-[0.2em] italic max-w-xl mx-auto opacity-80">
                Join 500k+ professionals and start your journey today.
              </p>
              <div className="flex justify-center gap-4">
                <ButtonWrapper />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Professional Dark Footer */}
      <Footer />
    </div>
  );
}

// Small client wrapper for interactive buttons if needed in the server component
// Or just use basic Link components
function ButtonWrapper() {
  return (
    <Link
      href="/users/auth/signup"
      className="h-16 px-12 bg-white text-cyan-500 hover:bg-slate-50 font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest text-sm flex items-center justify-center italic"
    >
      Get Started Now
    </Link>
  );
}
