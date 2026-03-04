import { Icons } from "./icons";

export const LoginLogo: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/20 rotate-3 hover:rotate-0 transition-all duration-500 border border-white/20 group">
        <Icons.logo className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
      </div>
    </div>
  );
};
