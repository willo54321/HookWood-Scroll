"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

export default function MapStory() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token || !mapContainerRef.current) {
      return;
    }

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-0.195, 51.162],
      zoom: 13,
      pitch: 45,
      bearing: 0,
      interactive: true,
    });

    map.on("load", () => {
      setMapLoaded(true);

      // Add marker for the site
      new mapboxgl.Marker({
        color: "#14b8a6",
      })
        .setLngLat([-0.195, 51.162])
        .addTo(map);
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.remove();
    };
  }, []);

  return (
    <section className="h-screen bg-[var(--navy)] overflow-hidden relative">
      {/* Map container */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: mapLoaded ? 1 : 0, transition: "opacity 0.5s" }}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/80 via-transparent to-transparent pointer-events-none" />

      {/* Text overlay */}
      <div className="absolute left-4 md:left-6 lg:left-20 top-1/2 -translate-y-1/2 max-w-md z-10">
        <p className="text-teal-400 text-sm md:text-base uppercase tracking-wider mb-2">
          The Location
        </p>
        <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Land West of Reigate Road, Hookwood
        </h2>
        <p className="text-white/70 text-base md:text-lg lg:text-xl">
          Near Horley, Surrey—with excellent transport links to Gatwick and London.
        </p>
      </div>

      {/* Fallback if no Mapbox token */}
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--navy)]">
          <div className="text-center">
            <p className="text-teal-400 text-sm uppercase tracking-wider mb-2">
              The Location
            </p>
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
              Land West of Reigate Road, Hookwood
            </h2>
            <p className="text-white/50 px-4">
              Near Horley, Surrey
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
