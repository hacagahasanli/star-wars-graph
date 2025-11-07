import cn from "~/shared/lib/helpers/classnames";

interface TagProps {
  className?: string;
  children: React.ReactNode;
}

const Tag = ({ children, className }: TagProps) => {
  return (
    <span
      className={cn(
        "inline-flex h-max items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-yellow-500 bg-yellow-900/20 group-hover:bg-yellow-900/30 shadow-lg shadow-yellow-500/20 text-yellow-300 transition-colors duration-200",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Tag;
