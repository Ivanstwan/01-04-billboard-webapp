import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { useFilters } from '@/hooks/use-filters';
import Navbar from '@/components/custom-ui/navbar';
import ExternalStateMap from '@/features/listing/component/map';
import { useState } from 'react';
import { Map } from 'leaflet';

// Define the schema
const MapBoundsSchema = z.object({
  north: z.number(),
  east: z.number(),
  south: z.number(),
  west: z.number(),
});

const listingSearchSchema = z.object({
  lat: z.number().optional(),
  long: z.number().optional(),
  mapBounds: MapBoundsSchema.optional(),
  zoom: z.number().optional(),
});

export type ListingSearch = z.infer<typeof listingSearchSchema>;

export const Route = createFileRoute('/listing')({
  validateSearch: (search) => listingSearchSchema.parse(search),
  component: PublicListing,
});

function PublicListing() {
  const navigate = useNavigate();
  const { filters, resetFilters, setFilters } = useFilters(Route.fullPath);

  const getMapData = (map: Map) => {
    // center
    const getCenter = map.getCenter();
    const lat = parseFloat(getCenter.lat.toFixed(6));
    const long = parseFloat(getCenter.lng.toFixed(6));

    // zoom
    const mapZoom = map.getZoom();

    // bounds
    const mapBounds = map.getBounds();
    const north = mapBounds.getNorth();
    const east = mapBounds.getEast();
    const south = mapBounds.getSouth();
    const west = mapBounds.getWest();

    navigate({
      search: (prev) => {
        return {
          ...prev,
          lat,
          long,
          mapBounds: { north, east, south, west },
          zoom: mapZoom,
        };
      },
    });
  };

  return (
    <div className="grid min-h-screen w-full grid-rows-[auto_1fr]">
      <Navbar />
      <div className="grid md:grid-cols-[1fr_auto]">
        <div className="z-0">
          <ExternalStateMap
            onMoveHandler={getMapData}
            lat={filters.lat}
            long={filters.long}
          />
        </div>
        <div className="z-10 min-w-96 shadow-[-2px_2px_5px_0px_rgba(0,0,0,0.4)] xl:min-w-[700px]"></div>
      </div>
    </div>
  );
}
