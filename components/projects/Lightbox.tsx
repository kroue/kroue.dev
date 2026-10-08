"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaXmark } from "react-icons/fa6";
import type { Screen } from "@/lib/projects";
import { isTall, pad } from "@/components/projects/ScreenTile";

interface LightboxProps {
  screens: Screen[];
  index: number;
  projectTitle: string;
  onIndex: (index: number) => void;
  onClose: () => void;
}

/** Full-size viewer for one capture, stacked over the case file. */
export default function Lightbox({
  screens,
  index,
  projectTitle,
  onIndex,
  onClose,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const captionId = useId();

  const screen = screens[index];
  const total = screens.length;
  const kind = isTall(screen)
    ? screen.device === "mobile"
      ? "is-tall-phone"
      : "is-tall"
    : `is-${screen.device}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Remember the tile that opened us; the case file underneath stays
    // mounted, so it is still there to return to.
    const trigger = document.activeElement as HTMLElement | null;
    dialog.showModal();
    closeRef.current?.focus();
    return () => {
      if (dialog.open) dialog.close();
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  // A full-page capture is read from the top, so reset when the image changes.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [index]);

  const step = (dir: 1 | -1) => onIndex((index + dir + total) % total);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-labelledby={captionId}
      // React propagates dialog events up the component tree, and this
      // dialog renders inside the case file's. Without stopPropagation one
      // Escape would close both.
      onCancel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
      onClose={(e) => {
        e.stopPropagation();
        // A queued close event can arrive after a remount reopened us.
        if (!dialogRef.current?.open) onClose();
      }}
      onKeyDown={(e) => {
        if (total < 2) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          step(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          step(-1);
        }
      }}
    >
      <div className="lightbox-bar">
        <p
          id={captionId}
          className="min-w-0 flex items-baseline gap-3"
          style={{ fontSize: "0.9rem" }}
          aria-live="polite"
        >
          <span
            className="mono whitespace-nowrap"
            style={{ fontSize: "0.72rem", color: "var(--accent-1)" }}
          >
            {pad(index + 1)} / {pad(total)}
          </span>
          <span className="truncate">
            {screen.caption}
            <span className="hidden sm:inline" style={{ color: "var(--text-subtle)" }}>
              {" "}· {projectTitle}
            </span>
          </span>
        </p>

        <div className="flex gap-2">
          {total > 1 && (
            <>
              <button
                type="button"
                className="icon-btn"
                onClick={() => step(-1)}
                aria-label="Previous screen"
              >
                <FaArrowLeft size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => step(1)}
                aria-label="Next screen"
              >
                <FaArrowRight size={14} aria-hidden="true" />
              </button>
            </>
          )}
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close full-size view"
          >
            <FaXmark size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={bodyRef} className="lightbox-body" data-lenis-prevent>
        {/* Served as captured: the WebP files are already compressed, and
            re-encoding them would soften the UI text people zoom in to read. */}
        <Image
          key={screen.src}
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          unoptimized
          className={`lightbox-img ${kind}`}
        />
      </div>
    </dialog>
  );
}
