import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  trailingIcon?: React.ReactNode;
  trailingText?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, trailingIcon, trailingText, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background px-9 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {(trailingIcon || trailingText) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground">
            {trailingIcon}
            {trailingText && (
              <span className="text-xs font-medium">{trailingText}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput }; 