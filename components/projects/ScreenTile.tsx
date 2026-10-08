"use client";

import Image from "next/image";
import { useId } from "react";
import type { Screen } from "@/lib/projects";

export const pad = (n: number) => String(n).padStart(2, "0");

/** The shape of one screen on each device, used to crop tiles and covers. */
export const SCREEN_RATIO = { desktop: 900 / 1440, mobile: 844 / 390 };

/** How many screens tall a capture is: 1 for a single viewport. */
export const screensTall = (screen: Screen) =>
  Math.round(screen.height / screen.width / SCREEN_RATIO[screen.device]);

/** A capture taller than one screen is a full-length scroll. */
export const isTall = (screen: Screen) => screensTall(screen) > 1;

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
  // Tiles crop to one screen; a longer capture shows its top and opens in full.
  const ratio = screen.device === "mobile" ? "390 / 844" : "16 / 10";

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
              {screen.device === "mobile" ? "Full length" : "Full page"},{" "}
              {screensTall(screen)} screens tall
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
