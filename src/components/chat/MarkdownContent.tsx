import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-lg font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent mt-5 mb-2 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-base font-bold text-gray-900 dark:text-zinc-100 mt-4 mb-2 first:mt-0 pl-3 border-l-[3px] border-violet-500">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-semibold text-violet-600 dark:text-violet-300 mt-3 mb-1.5 first:mt-0">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-gray-700 dark:text-zinc-300 leading-7 mb-3 last:mb-0 text-sm">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900 dark:text-zinc-50">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-600 dark:text-zinc-400">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="mb-3 space-y-1.5 pl-5 list-disc marker:text-violet-500">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-3 space-y-1.5 pl-5 list-decimal marker:text-violet-500">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-gray-700 dark:text-zinc-300 text-sm leading-relaxed pl-0.5">
            {children}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-3 pl-4 border-l-[3px] border-violet-500 bg-violet-50 dark:bg-violet-500/[0.07] py-2.5 pr-3 rounded-r-xl italic text-gray-600 dark:text-zinc-400 text-sm">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => (
          <code
            className={
              className
                ? 'text-xs font-mono text-gray-700 dark:text-zinc-200'
                : 'bg-gray-100 dark:bg-zinc-800/90 text-violet-600 dark:text-violet-300 px-1.5 py-0.5 rounded text-[11px] font-mono'
            }
          >
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="my-3 bg-gray-50 dark:bg-[#0c0c15] border border-gray-200 dark:border-white/[0.08] rounded-xl p-4 overflow-x-auto text-xs font-mono text-gray-700 dark:text-zinc-300 leading-relaxed">
            {children}
          </pre>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 dark:text-violet-400 underline underline-offset-2 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          >
            {children}
          </a>
        ),
        hr: () => (
          <hr className="my-4 border-gray-200 dark:border-white/[0.08]" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
