"use client";

interface CategoryBadgeProps {
    category: {
        name: string;
        slug: string;
        color: string;
        icon?: string;
    };
    size?: "sm" | "md" | "lg";
    showIcon?: boolean;
}

export default function CategoryBadge({
    category,
    size = "md",
    showIcon = true
}: CategoryBadgeProps) {
    const sizeClasses = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all ${sizeClasses[size]}`}
            style={{
                backgroundColor: category.color + '20',
                color: category.color,
                border: `1px solid ${category.color}40`,
            }}
        >
            {showIcon && category.icon && (
                <span className="text-current">{category.icon}</span>
            )}
            <span>{category.name}</span>
        </span>
    );
}
