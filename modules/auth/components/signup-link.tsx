import Link from "next/link";

interface RedirectLinkProps {
  context: string;
  label: string;
  link: string;
}

export const RedirectLink: React.FC<RedirectLinkProps> = ({
  link,
  context,
  label,
}) => {
  return (
    <div className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-4">
      {label}{" "}
      <Link
        href={link}
        className="text-cyan-500 hover:text-cyan-600 font-black italic ml-1 transition-all"
      >
        {context} Access
      </Link>
    </div>
  );
};
