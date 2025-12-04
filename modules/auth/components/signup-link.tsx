import { Icons } from "./icons";
import Link from "next/link";

interface RedirectLinkProps {
  context: string;
  label: string;
  link: string;
}


export const RedirectLink: React.FC<RedirectLinkProps> = ({ link, context, label }) => {
  return (
    <div className="text-center text-sm text-gray-600">
      {label}{' '}
      <Link
        href={link}
        type="button"
        className="text-cyan-400 hover:text-cyan-500 font-semibold p-0 h-auto inline-flex items-center gap-1"
      >
        {context}
        <Icons.userPlus className="w-4 h-4" />
      </Link>
    </div>
  );
};