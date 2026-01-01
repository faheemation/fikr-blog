"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LikeButtonProps {
    postId: string;
    initialLikes: number;
    initialLiked: boolean;
}

export default function LikeButton({
    postId,
    initialLikes,
    initialLiked,
}: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [isAnimating, setIsAnimating] = useState(false);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
    };

    const handleLike = async () => {
        // Check if user is logged in
        if (!user) {
            toast.error("Please login to like posts");
            router.push("/login");
            return;
        }

        // Optimistic update
        const newLikedState = !isLiked;
        const newLikesCount = newLikedState ? likes + 1 : likes - 1;

        setIsLiked(newLikedState);
        setLikes(newLikesCount);
        setIsAnimating(true);

        setTimeout(() => setIsAnimating(false), 600);

        // TODO: Call API to toggle like
        // For now, just optimistic update
        // In future, implement:
        // try {
        //   const response = await fetch('/api/likes/toggle', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ postId }),
        //   });
        //   if (!response.ok) throw new Error('Failed to toggle like');
        // } catch (error) {
        //   // Revert on error
        //   setIsLiked(!newLikedState);
        //   setLikes(newLikedState ? likes - 1 : likes + 1);
        //   toast.error('Failed to update like');
        // }
    };

    return (
        <motion.button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${isLiked
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
            >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </motion.div>
            <span>{likes}</span>
        </motion.button>
    );
}
