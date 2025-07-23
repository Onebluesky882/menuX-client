import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
};

const CodeBlock = ({
  code,
  language = "bash",
  filename,
  className,
}: CodeBlockProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={cn("relative my-6 rounded-md overflow-hidden", className)}>
      {filename && (
        <div className="bg-slate-800 text-slate-200 px-4 py-2 text-xs font-mono">
          {filename}
        </div>
      )}
      <div className="bg-code-bg p-4 text-code-text overflow-x-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="absolute right-2 top-2 h-8 w-8 p-0 bg-slate-700/50 hover:bg-slate-700 text-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </Button>
        <pre className="font-mono text-sm whitespace-pre-wrap">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
