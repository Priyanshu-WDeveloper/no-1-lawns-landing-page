'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  NewLawnGalleryItem,
  NewLawnReview,
} from '@/types/new-lawns.types';

interface GalleryLightboxProps {
  items: NewLawnGalleryItem[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviews?: NewLawnReview[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function GalleryLightbox({
  items,
  initialIndex,
  open,
  onOpenChange,
  reviews = [],
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const prevInitialRef = useRef(initialIndex);

  useEffect(() => {
    if (prevInitialRef.current !== initialIndex) {
      setCurrentIndex(initialIndex);
      prevInitialRef.current = initialIndex;
    }
  }, [initialIndex]);

  const current = items[currentIndex];

  const linkedReviews = reviews.slice(0, 3);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + items.length) % items.length,
    );
  }, [items.length]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, goNext, goPrev]);

  if (!current) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-screen h-screen sm:max-w-[1100px] sm:max-h-[90vh] sm:rounded-xl sm:overflow-hidden p-0 border-none bg-black/85"
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-6 z-30 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Close lightbox"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
          <div className="relative flex items-center justify-center overflow-hidden flex-1">
            <img
              key={current._id}
              src={current.image}
              alt={current.category}
              className="select-none w-full object-cover h-[80vh]"
              draggable={false}
            />
            {items.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-white text-sm bg-black/60 px-3 py-1.5 rounded-full pointer-events-none z-20">
              <span>
                {currentIndex + 1} / {items.length}
              </span>
              {current.category && (
                <>
                  <span className="text-white/40">•</span>
                  <span>{current.category}</span>
                </>
              )}
            </div>
          </div>

          {linkedReviews.length > 0 && (
            <div className="flex flex-col gap-5 self-start mb-auto shrink-0 rounded-xl px-2 py-2">
              {linkedReviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-xl bg-white shadow-md lg:w-72 min-h-[200px] flex flex-col"
                >
                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center font-bold text-white text-sm ring-2 ring-white shadow-md shrink-0">
                        {review.reviewerName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-black leading-none">
                          {review.reviewerName}
                        </h4>
                        {review.location && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {review.location}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: review.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ),
                      )}
                    </div>

                    <p className="text-sm leading-5 text-muted-foreground">
                      {review.comment}
                    </p>

                    <p className="text-xs text-muted-foreground/60 mt-auto pt-3">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 1 && (
          <div className="hidden lg:flex shrink-0 gap-2 px-4 py-3 overflow-x-auto">
            {items.map((item, i) => (
              <button
                key={item._id}
                onClick={() => setCurrentIndex(i)}
                className="shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.category}
                  className={cn(
                    'h-10 w-20 rounded-lg object-cover transition-all',
                    i === currentIndex
                      ? 'ring-2 ring-white opacity-100'
                      : 'opacity-50 hover:opacity-80',
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
