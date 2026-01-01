"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    label?: string;
    folder?: string;
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
    label = "Upload Image",
    folder = "fikr-blog",
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = (result: any) => {
        setUploading(false);
        onChange(result.info.secure_url);
    };

    return (
        <div className="space-y-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            {value ? (
                <div className="relative group">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image
                            src={value}
                            alt="Uploaded image"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {onRemove && (
                        <button
                            onClick={onRemove}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                            type="button"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            ) : (
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    options={{
                        folder,
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
                            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-all flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Upload className="w-12 h-12 text-gray-400" />
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-700">
                                    {uploading ? "Uploading..." : "Click to upload image"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PNG, JPG, GIF, WEBP up to 10MB
                                </p>
                            </div>
                        </button>
                    )}
                </CldUploadWidget>
            )}

            {value && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="truncate flex-1">{value}</span>
                    <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(value)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                    >
                        Copy URL
                    </button>
                </div>
            )}
        </div>
    );
}
