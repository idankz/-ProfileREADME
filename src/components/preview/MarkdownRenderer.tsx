"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

// Convert common GitHub README HTML tags into markdown or clean JSX-friendly structures
function preprocessGitHubHtml(rawMarkdown: string): string {
  let text = rawMarkdown;

  // Replace <a href="LINK"><img src="IMG" alt="ALT" /></a> with [![ALT](IMG)](LINK)
  text = text.replace(
    /<a\s+href="([^"]+)"[^>]*>\s*<img\s+src="([^"]+)"(?:\s+alt="([^"]*)")?[^>]*\/?>\s*<\/a>/gi,
    (_match, href, src, alt) => `[![${alt || ""}](${src})](${href})`
  );

  // Replace standalone <img src="SRC" alt="ALT" ... /> with ![ALT](SRC)
  text = text.replace(
    /<img\s+(?:[^>]*?\s+)?src="([^"]+)"(?:\s+alt="([^"]*)")?[^>]*\/?>/gi,
    (_match, src, alt) => `![${alt || ""}](${src})`
  );

  // Convert <h1 align="center">Text</h1> to # Text
  text = text.replace(
    /<h1(?:\s+align="center")?[^>]*>(.*?)<\/h1>/gi,
    (_match, title) => `\n\n# ${title.trim()}\n\n`
  );

  // Convert <h2 align="center">Text</h2> to ## Text
  text = text.replace(
    /<h2(?:\s+align="center")?[^>]*>(.*?)<\/h2>/gi,
    (_match, title) => `\n\n## ${title.trim()}\n\n`
  );

  // Convert <h3 align="center">Text</h3> to ### Text
  text = text.replace(
    /<h3(?:\s+align="center")?[^>]*>(.*?)<\/h3>/gi,
    (_match, title) => `\n\n### ${title.trim()}\n\n`
  );

  // Unwrap <p align="..."> and <div align="...">
  text = text.replace(/<\/?(?:p|div)(?:\s+align="[^"]*")?[^>]*>/gi, "\n\n");

  return text;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const processed = useMemo(() => preprocessGitHubHtml(content), [content]);

  return (
    <div className="github-markdown text-slate-300 text-sm leading-relaxed space-y-4 font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-slate-100 pb-2 border-b border-slate-700/80 mb-4 mt-6 first:mt-0 flex items-center gap-2 flex-wrap">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-slate-100 pb-1.5 border-b border-slate-700/60 mb-3 mt-6 flex items-center gap-2 flex-wrap">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-slate-200 mb-2 mt-4">
              {children}
            </h3>
          ),
          p: ({ children }) => {
            return (
              <div className="mb-3 text-slate-300 text-sm leading-relaxed flex flex-wrap items-center gap-1.5 [&>a]:inline-flex [&>img]:inline-block">
                {children}
              </div>
            );
          },
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1.5 my-3 pl-2 text-slate-300 text-sm">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1.5 my-3 pl-2 text-slate-300 text-sm">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-slate-300 leading-normal">{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 hover:underline-offset-4 transition-all inline-flex items-center gap-1"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt || "badge or card"}
                loading="lazy"
                className="inline-block max-w-full rounded shadow-sm hover:opacity-95 transition-opacity"
              />
            );
          },
          hr: () => <hr className="border-t border-slate-800 my-6" />,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan-500/60 pl-4 py-1 my-3 bg-slate-900/60 rounded-r text-slate-400 italic">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-cyan-300">
                  {children}
                </code>
              );
            }
            return (
              <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto my-3 custom-scrollbar">
                <code>{children}</code>
              </pre>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 border border-slate-800 rounded-lg">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 bg-slate-900 font-semibold border-b border-slate-800 text-slate-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border-b border-slate-800/80">{children}</td>
          ),
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
};
