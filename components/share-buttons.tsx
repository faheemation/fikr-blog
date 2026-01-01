"use client";

import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
    title: string;
    url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Share:</span>

            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Share on Twitter"
            >
                <Twitter className="w-5 h-5" />
            </a>

            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Share on Facebook"
            >
                <Facebook className="w-5 h-5" />
            </a>

            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="w-5 h-5" />
            </a>

            <button
                onClick={copyLink}
                className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Copy link"
            >
                {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                ) : (
                    <Link2 className="w-5 h-5" />
                )}
            </button>
        </div>
    );
}
