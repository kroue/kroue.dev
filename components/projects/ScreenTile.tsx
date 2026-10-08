"use client";

import Image from "next/image";
import { useId } from "react";
import type { Screen } from "@/lib/projects";

export const pad = (n: number) => String(n).padStart(2, "0");

/** A desktop capture much taller than a viewport is a full-page scroll. */
export const isTall = (screen: Screen) =>
  screen.device === "desktop" && screen.height / screen.width > 0.8;

interface ScreenTileProps {
  screen: Screen;
  /** 1-based position across the whole project, used for the caption number. */
  number: number;
  wide?: boolean;
  sizes: string;
  onOpen: () => void;
}

export default function ScreenTile({ screen, number, wide, sizes, onOpen }: ScreenTileProps) {
  const descId = useId();
  const tall = isTall(screen);
  const ratio =
    screen.device === "mobile" ? `${screen.width} / ${screen.height}` : "16 / 10";

  return (
    <figure className={`shot${wide ? " is-wide" : ""}`}>
      {/* The button is named for its action and described by the alt text,
          so a screen reader hears both what the screen shows and that it
          opens full size. */}
      <button
        type="button"
        className="shot-btn"
        onClick={onOpen}
        aria-label={`View "${screen.caption}" full size`}
        aria-describedby={descId}
      >
        {screen.url && (
          <span className="shot-url" aria-hidden="true">
            {screen.url}
          </span>
        )}
        <span className="shot-frame" style={{ aspectRatio: ratio }}>
          <Image
            src={screen.src}
            alt=""
            fill
            sizes={sizes}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
          {tall && (
            <span className="shot-badge mono" aria-hidden="true">
              Full page, {Math.round(screen.height / 900)} screens tall
            </span>
          )}
        </span>
      </button>
      <span id={descId} className="sr-only">
        {screen.alt}
      </span>
      <figcaption className="shot-cap">
        <span className="rail-num">{pad(number)}</span>
        {screen.caption}
      </figcaption>
    </figure>
  );
}
