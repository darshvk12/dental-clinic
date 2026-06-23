"use client";
import { useEffect, useRef } from "react";

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
    let currentOrbit = "0deg 75deg 3.5m";
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

          el.setAttribute("camera-orbit", currentOrbit);
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
    <>
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes glow {
          0%, 100% { 
            filter: drop-shadow(0 0 0px rgba(59, 130, 246, 0));
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.3));
          }
        }
        
        .model-viewer-wrapper {
          animation: glow 2s ease-in-out infinite;
        }
        
        .sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(147, 197, 253, 0.4));
          border-radius: 50%;
          pointer-events: none;
        }
        
        .sparkle-1 { top: 10%; left: 15%; animation: sparkle 1.5s ease-in-out infinite; }
        .sparkle-2 { top: 20%; right: 10%; animation: sparkle 1.5s ease-in-out infinite 0.3s; }
        .sparkle-3 { bottom: 15%; left: 20%; animation: sparkle 1.5s ease-in-out infinite 0.6s; }
        .sparkle-4 { bottom: 10%; right: 15%; animation: sparkle 1.5s ease-in-out infinite 0.9s; }
        .sparkle-5 { top: 50%; right: 5%; animation: sparkle 1.5s ease-in-out infinite 1.2s; }
      `}</style>
      <div className="model-viewer-wrapper relative w-full h-[180px] lg:h-[220px] flex items-center justify-center">
        {/* Sparkles */}
        <div className="sparkle sparkle-1" />
        <div className="sparkle sparkle-2" />
        <div className="sparkle sparkle-3" />
        <div className="sparkle sparkle-4" />
        <div className="sparkle sparkle-5" />
        
        <model-viewer
          ref={ref}
          src={src}
          alt="3D teeth model"
          camera-controls
          reveal="auto"
          shadow-intensity="1"
          shadow-softness="1"
          exposure="2"
          environment-image="neutral"
          camera-orbit="0deg 80deg 4.5m"
          field-of-view="50deg"
          style={{ 
            width: '100%', 
            height: '100%', 
            touchAction: 'none', 
            backgroundColor: 'transparent',
            margin: '0',
            padding: '0',
            display: 'block',
            transition: 'all 0.3s ease',
          }}
        />
      </div>
    </>
  );
}
