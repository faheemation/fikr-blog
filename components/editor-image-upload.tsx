"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface EditorImageUploadProps {
    onImageInsert: (url: string) => void;
}

export default function EditorImageUpload({ onImageInsert }: EditorImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = (result: any) => {
        setUploading(false);
        const imageUrl = result.info.secure_url;

        // Insert markdown image syntax
        const markdownImage = `![Image](${imageUrl})`;
        onImageInsert(markdownImage);

        toast.success("Image uploaded and inserted!");
    };

    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{
                folder: "fikr-blog/content",
                maxFiles: 1,
                resourceType: "image",
                clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
                maxFileSize: 10000000, // 10MB
            }}
            onUpload={handleUpload}
            onOpen={() => setUploading(true)}
            onClose={() => setUploading(false)}
        >
            {({ open }) => (
                <button
                    type="button"
                    onClick={() => open()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Upload image to insert in content"
                >
                    <ImageIcon className="w-4 h-4" />
                    {uploading ? "Uploading..." : "Insert Image"}
                </button>
            )}
        </CldUploadWidget>
    );
}
