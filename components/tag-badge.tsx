"use client";

import Link from "next/link";

interface TagBadgeProps {
    tag: {
        name: string;
        slug: string;
        color?: string;
    };
    size?: "sm" | "md" | "lg";
    clickable?: boolean;
}

export default function TagBadge({
    tag,
    size = "sm",
    clickable = true
}: TagBadgeProps) {
    const sizeClasses = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
    };

    const color = tag.color || '#6B7280';

    const badge = (
        <span
            className={`inline-flex items-center rounded-md font-medium transition-all ${sizeClasses[size]} ${clickable ? 'hover:scale-105 cursor-pointer' : ''
                }`}
            style={{
                backgroundColor: color + '15',
                color: color,
                border: `1px solid ${color}30`,
            }}
        >
            #{tag.name}
        </span>
    );

    if (clickable) {
        return (
            <Link href={`/tag/${tag.slug}`} className="inline-block">
                {badge}
            </Link>
        );
    }

    return badge;
}
