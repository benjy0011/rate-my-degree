'use client'

import { fetchLikeCountAndStatus, likeReview } from "@/app/actions/review";
import { cn } from "@/lib/utils";
import { ThumbsUp } from "lucide-react"
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import './style.css';

interface ReviewLikeButton {
  review_id: string;
  showHelpfulText?: boolean;
  showLikeCount?: boolean;
}

const ReviewLikeButton = ({
  review_id,
  showHelpfulText = true,
  showLikeCount = true,
} : ReviewLikeButton ) => {
  const [ likeCount, setLikeCount ] = useState<number>(0);
  const [ likeStatus, setLikeStatus ] = useState<boolean>(false);
  const [ initLikeCount, setInitLikeCount ] = useState<number>(0);
  const [ initLikeStatus, setInitLikeStatus ] = useState<boolean>(false);

  const getLikeCount = useCallback(async (r_id: string) => {
    try {
      const { count, likeStatus } = await fetchLikeCountAndStatus(r_id);
      setLikeCount(count);
      setLikeStatus(likeStatus);
      setInitLikeCount(count);
      setInitLikeStatus(likeStatus);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      
    }

  }, [ ]);

  const likeReviewAction = useCallback(async (r_id: string) => {
    try {
      const { likeCount, selfLikeStatus } = await likeReview(r_id);
      setLikeCount(likeCount);
      setLikeStatus(selfLikeStatus);
      setInitLikeCount(likeCount);
      setInitLikeStatus(selfLikeStatus);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
      setLikeCount(initLikeCount);
      setLikeStatus(initLikeStatus);
    } finally {

    }

  }, [ initLikeCount, initLikeStatus ]);


  const handleLike = () => {
    setLikeStatus(prev => !prev);
    setLikeCount(prev => likeStatus ? Math.max( prev - 1, 0 ) : prev + 1)
    likeReviewAction(review_id);
  }


  useEffect(() => {
    if (review_id) {
      getLikeCount(review_id);
    }
  }, [review_id, getLikeCount])

  return (
    <div
      className="inline-flex gap-1.5 items-center text-sm hover:cursor-pointer select-none"
      onClick={handleLike}
    >
      <ThumbsUp size={16} className={cn( "transition-all", likeStatus ? "fill-stone-300 text-gray animation-like" : "fill-transparent text-gray" )} />
      <span className={cn("min-w-2.5 text-right", !showLikeCount && "hidden")}>{likeCount}</span>
      <span className={cn(!showHelpfulText && "hidden")}>Helpful</span>
    </div>
  )
}
export default ReviewLikeButton