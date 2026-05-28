'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

export function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(95, Math.max(5, x)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setDragging(true);
      e.preventDefault();
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      updatePosition(e.clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg select-none cursor-col-resize group bg-white"
      onPointerDown={onPointerDown}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(position)}
    >
      <Image src={after} fill className="object-cover pointer-events-none" alt={alt} />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          fill
          className="object-cover pointer-events-none"
          alt={`${alt} (before)`}
        />
      </div>
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-md pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center border border-gray-200">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L3 8L6 12" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 12L13 8L10 4" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div
        className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded pointer-events-none transition-opacity"
        style={{ opacity: position > 12 ? 1 : 0 }}
      >
        Before
      </div>
      <div
        className="absolute top-3 right-3 bg-primary text-white text-xs px-2.5 py-1 rounded pointer-events-none transition-opacity"
        style={{ opacity: position < 88 ? 1 : 0 }}
      >
        After
      </div>
    </div>
  );
}
