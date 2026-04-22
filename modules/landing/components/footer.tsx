import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12 mb-8">
          <div className="space-y-4 col-span-2">
            <h3 className="text-2xl font-black text-white tracking-tighter italic">
              Next<span className="text-cyan-500">Hire</span>
            </h3>
            <p className="text-slate-400 font-medium max-w-sm">
              The world's most advanced ecosystem for professional growth and
              talent acquisition. Connect with the future.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">
              Platform
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Browse Companies
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">
              Company
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} NextHire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
