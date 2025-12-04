import { Icons } from "./icons";

export const LoginLogo: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-16 h-16 bg-linear-to-br from-cyan-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
        <Icons.logo className="w-10 h-10 text-white" />
      </div>
    </div>
  );
};