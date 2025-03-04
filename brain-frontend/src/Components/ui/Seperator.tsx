
interface SeparatorProps {
  text?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  decorative?: boolean;
}

const Separator = ({
  text,
  orientation = "horizontal",
  className = "",
  decorative = true,
}: SeparatorProps) => {
  const ariaProps = decorative
    ? { "aria-hidden": true }
    : { "role": "separator" };

  if (orientation === "horizontal") {
    return (
      <div className={`flex items-center w-full gap-4 py-2 ${className}`} {...ariaProps}>
        <div className="h-px flex-grow bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        {text && <span className="text-sm text-gray-400 ">{text}</span>}
        <div className="h-px flex-grow bg-gradient-to-r from-purple-500 to-pink-500"></div>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex h-full w-px bg-gradient-to-b from-indigo-500 to-pink-500 mx-2 ${className}`}
      {...ariaProps}
    />
  );
};

export default Separator;