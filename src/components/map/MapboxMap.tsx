'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Town } from '@/types/town';
import { useUIStore } from '@/lib/state/uiStore';
import { MAP_CONFIG, getMarkerColor, getTierInfo } from '@/lib/map/mapbox';
import { MapControls } from './MapControls';

interface MapboxMapProps {
  towns: Town[];
}

export function MapboxMap({ towns }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  const { openTownModal, selectedTownSlug, hoveredTownSlug, setHoveredTownSlug } = useUIStore();

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Get token inside useEffect - runs only on client
    const token = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '') : '';
    
    if (!token) {
      console.error('Mapbox token is missing. Please configure NEXT_PUBLIC_MAPBOX_TOKEN in .env.local');
      setMapError('Mapbox token is not configured');
      return;
    }
    
    mapboxgl.accessToken = token;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: MAP_CONFIG.style,
        center: [MAP_CONFIG.center.lng, MAP_CONFIG.center.lat],
        zoom: MAP_CONFIG.defaultZoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setIsMapLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Failed to load map');
      });
    } catch (err) {
      console.error('Map initialization error:', err);
      setMapError('Failed to initialize map');
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Add markers when map is loaded
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    towns.forEach(town => {
      const isSelected = selectedTownSlug === town.slug;
      const isHovered = hoveredTownSlug === town.slug;
      const color = getMarkerColor(town.pricing.marketPosition);
      const tierInfo = getTierInfo(town.pricing.marketPosition);

      // Create custom marker element
      const el = document.createElement('div');
      const markerLabel = town.name.charAt(0).toUpperCase();
      el.className = `town-marker ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`;
      el.style.cssText = `
        width: 24px;
        height: 24px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: transform 0.2s ease;
        transform: ${isSelected ? 'scale(1.3)' : isHovered ? 'scale(1.2)' : 'scale(1)'};
        z-index: ${isSelected ? 100 : isHovered ? 50 : 1};
      `;
      
      el.innerHTML = `
        <span style="color: white; font-size: 10px; font-weight: bold;">${markerLabel}</span>
      `;

      // Add hover events
      el.addEventListener('mouseenter', () => {
        setHoveredTownSlug(town.slug);
      });
      
      el.addEventListener('mouseleave', () => {
        setHoveredTownSlug(null);
      });

      el.addEventListener('click', () => {
        openTownModal(town.slug);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([town.coordinates.lng, town.coordinates.lat])
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [towns, isMapLoaded, selectedTownSlug, hoveredTownSlug, openTownModal, setHoveredTownSlug]);

  const handleZoomIn = () => {
    map.current?.zoomIn();
  };

  const handleZoomOut = () => {
    map.current?.zoomOut();
  };

  const handleResetView = () => {
    map.current?.flyTo({
      center: [MAP_CONFIG.center.lng, MAP_CONFIG.center.lat],
      zoom: MAP_CONFIG.defaultZoom,
      duration: 1000,
    });
  };

  if (mapError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-6">
          <p className="text-gray-600">{mapError}</p>
          <p className="text-sm text-gray-500 mt-2">Please check your Mapbox token configuration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      <MapControls 
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleResetView}
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="text-xs font-medium text-gray-700 mb-2">Price Range</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-gray-600">Value</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500"></span>
            <span className="text-xs text-gray-600">Mid-range</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="text-xs text-gray-600">Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
}
