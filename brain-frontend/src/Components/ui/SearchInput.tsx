import * as React from "react";
import { Search } from "lucide-react";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: boolean;
  trailingIcon?: React.ReactNode;
  trailingText?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className = "", leadingIcon = true, trailingIcon, trailingText, onClick, ...props  },ref) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const inputRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        inputRef.current?.focus();
        if (onClick) {
          onClick(e as unknown as React.MouseEvent<HTMLInputElement>);
        }
      };
    return (
      <div className="relative flex items-center" onClick={handleContainerClick}>
        {leadingIcon && (
          <Search className="absolute left-3 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
        )}
        <input
          type="text"
          className={`flex h-10 w-full rounded-lg border border-neutral-200 bg-gray-100 px-3 py-2 text-sm transition-all 
          placeholder:text-neutral-500
          focus-visible:border-neutral-400 focus-visible:outline-none 
          disabled:cursor-not-allowed disabled:opacity-70
          dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-400 dark:placeholder:text-[#5991ff]
          dark:focus-visible:border-neutral-700
          ${leadingIcon ? "pl-9" : ""}
          ${trailingIcon ? "pr-9" : ""}
          ${className}`}
          ref={inputRef}
          {...props}
        />
        {trailingIcon && (
          <div className="absolute right-3 flex justify-center items-center text-gray-400">{trailingIcon}{trailingText}</div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };