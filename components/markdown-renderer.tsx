"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose prose-lg prose-neutral max-w-none
      prose-headings:font-serif prose-headings:font-bold prose-headings:text-black
      prose-h1:text-5xl prose-h1:mb-6 prose-h1:mt-8
      prose-h2:text-4xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
      prose-h3:text-3xl prose-h3:mb-3 prose-h3:mt-6
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
      prose-a:text-black prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-gray-700
      prose-strong:text-black prose-strong:font-semibold
      prose-code:text-black prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-700
      prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
      prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
      prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
      prose-li:text-gray-700 prose-li:mb-2
      prose-img:rounded-lg prose-img:shadow-lg
      prose-hr:border-gray-300 prose-hr:my-8
    ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
