"use client";
import { useEffect, useRef } from "react";

// Allow TSX to accept the <model-viewer> element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export default function ModelViewer({ src = "/models/teeth.glb" }: { src?: string }) {
  const ref = useRef<any>(null);

  useEffect(() => {
    // Load model-viewer script once
    if (!document.querySelector('script[data-model-viewer]')) {
      const s = document.createElement("script");
      s.setAttribute("type", "module");
      s.setAttribute("data-model-viewer", "");
      s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
      document.head.appendChild(s);
    }

    let running = true;
    let raf = 0;
    let last = performance.now();
    let currentOrbit = "0deg 75deg 2.5m";
    // degrees per second (higher = faster rotation)
    const speedDegPerSec = 60;

    const el: any = ref.current;
    if (!el) return;

    // set cursor styles for hover and drag
    el.style.cursor = "grab";
    const onPointerDown = () => (el.style.cursor = "grabbing");
    const onPointerUp = () => (el.style.cursor = "grab");

    const readCurrentOrbit = () => {
      try {
        const attr = el.cameraOrbit || el.getAttribute("camera-orbit") || currentOrbit;
        if (typeof attr === "string" && attr.length > 0) {
          currentOrbit = attr;
        }
      } catch {
        // ignore
      }
    };

    const animate = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      if (running && el) {
        readCurrentOrbit();
        try {
          const parts = String(currentOrbit).split(" ");
          let az = parts[0];
          const rest = parts.slice(1).join(" ");

          let azDeg = 0;
          if (az.endsWith("deg")) azDeg = parseFloat(az.replace("deg", ""));
          else if (az.endsWith("rad")) azDeg = (parseFloat(az.replace("rad", "")) * 180) / Math.PI;
          else azDeg = parseFloat(az) || 0;

          azDeg = (azDeg + speedDegPerSec * delta) % 360;
          currentOrbit = `${azDeg}deg ${rest}`;

          if (typeof el.cameraOrbit !== "undefined") {
            el.cameraOrbit = currentOrbit;
          } else {
            el.setAttribute("camera-orbit", currentOrbit);
          }

          if (typeof el.jumpCameraToGoal === "function") el.jumpCameraToGoal();
        } catch {
          // ignore
        }
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const onUserDown = () => {
      running = false;
      readCurrentOrbit();
    };
    const onUserUp = () => {
      readCurrentOrbit();
      running = true;
      last = performance.now();
    };

    el.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointerdown", onUserDown);
    document.addEventListener("pointerup", onUserUp);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointerdown", onUserDown);
      document.removeEventListener("pointerup", onUserUp);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <model-viewer
        ref={ref}
        src={src}
        alt="3D teeth model"
        camera-controls
        auto-rotate
        exposure="1"
        shadow-intensity="1"
        style={{ width: '100%', height: '100%', maxWidth: '360px', maxHeight: '360px', touchAction: 'none', backgroundColor: 'transparent' }}
        ar
      />
    </div>
  );
}
