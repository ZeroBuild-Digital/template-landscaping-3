"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

/**
 * Drop-in replacement for next/image that renders a graceful styled placeholder
 * if the upstream image fails to load (404, network blip, Unsplash deletion).
 */
export default function ImageWithFallback({
  fallbackLabel,
  fallbackClassName,
  onError,
  ...imageProps
}: ImageProps & {
  fallbackLabel?: string;
  fallbackClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={typeof imageProps.alt === "string" ? imageProps.alt : "Image"}
        className={[
          "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[color:var(--color-brand)]/85 via-[color:var(--color-brand-dark)]/85 to-[color:var(--color-charcoal)]/85 text-white/90",
          fallbackClassName ?? "",
        ].join(" ")}
      >
        <ImageOff
          className="h-10 w-10 text-white/60"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        {fallbackLabel && (
          <p className="font-display font-bold text-lg md:text-xl text-center px-6 max-w-md leading-snug">
            {fallbackLabel}
          </p>
        )}
      </div>
    );
  }

  return (
    <Image
      {...imageProps}
      onError={(e) => {
        setFailed(true);
        if (onError) onError(e);
      }}
    />
  );
}
