import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorMode = "default" | "move" | "view" | "pointer";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    // Hide on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
      if (!visible) setVisible(true);
    };

    const onEnterInteractive = () => {
      setMode("pointer");
      setLabel("");
    };

    const onLeaveInteractive = () => {
      setMode("default");
      setLabel("");
    };

    const onEnterCanvas = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='center']")) {
        setMode("view");
        setLabel("Ver");
      } else {
        setMode("move");
        setLabel("Mover");
      }
    };

    const onLeaveCanvas = () => {
      setMode("default");
      setLabel("");
    };

    window.addEventListener("mousemove", onMove);

    // Track interactive elements
    const interactiveEls = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    // Track canvas
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("mouseenter", onEnterCanvas);
      canvas.addEventListener("mouseleave", onLeaveCanvas);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      if (canvas) {
        canvas.removeEventListener("mouseenter", onEnterCanvas);
        canvas.removeEventListener("mouseleave", onLeaveCanvas);
      }
    };
  }, [visible]);

  // Hide default cursor on desktop
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = `* { cursor: none !important; }`;
    document.head.appendChild(style);
    return () => {
      document.body.style.cursor = "";
      style.remove();
    };
  }, []);

  const size = mode === "default" ? 20 : mode === "pointer" ? 12 : 64;
  const bgColor =
    mode === "move"
      ? "rgba(199, 184, 154, 0.15)"
      : mode === "view"
      ? "rgba(212, 163, 115, 0.2)"
      : mode === "pointer"
      ? "rgba(199, 184, 154, 0.4)"
      : "rgba(199, 184, 154, 0.2)";

  const borderColor =
    mode === "move" || mode === "view"
      ? "rgba(199, 184, 154, 0.5)"
      : "transparent";

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bgColor,
        border: `1px solid ${borderColor}`,
        backdropFilter: mode === "move" || mode === "view" ? "blur(2px)" : "none",
        transform: "translate(-50%, -50%)",
        transition: "width 0.25s ease, height 0.25s ease, background 0.25s ease, border 0.25s ease",
        opacity: visible ? 1 : 0,
        mixBlendMode: mode === "pointer" ? "difference" : "normal",
      }}
    >
      {label && (
        <span
          ref={labelRef}
          className="font-body text-[10px] uppercase tracking-wider"
          style={{ color: "#6B6B6B", fontWeight: 500 }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
