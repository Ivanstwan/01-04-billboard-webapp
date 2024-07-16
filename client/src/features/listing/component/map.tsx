import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import _ from 'lodash';
import L, { Map } from 'leaflet';

import circleIcon from '@/assets/icon/circle-dark-red.png';

type MapProps = {
  lat?: number;
  long?: number;
  zoom?: number;
  onMoveHandler?: (map: Map) => void;
  listing?: any[];
};

type DisplayProps = {
  map: Map;
  onMoveHandler?: (map: Map) => void;
};

// custom icon for marker
const iconCircle: L.Icon = new L.Icon({
  iconUrl: circleIcon,
  iconSize: [16, 16],
});

function DisplayPosition({ map, onMoveHandler }: DisplayProps) {
  useEffect(() => {
    // Handling map empty, when init render
    if (!map) {
      return;
    } else {
      const onMoveDebounced = _.debounce(() => {
        map.closePopup();
        if (onMoveHandler) onMoveHandler(map);
      }, 400); // Adjust the debounce delay as needed

      map.on('move', onMoveDebounced);

      return () => {
        map.off('move', onMoveDebounced);
      };
    }
  }, [map]);

  // Return null since this component doesn't render anything
  return null;
}

function ExternalStateMap({
  lat = -6.903732,
  long = 107.618933,
  zoom = 17,
  onMoveHandler,
  listing = [],
}: MapProps) {
  const [map, setMap] = useState<Map | null>(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[lat, long]}
        zoom={zoom}
        scrollWheelZoom={true}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listing.length > 0 &&
          listing.map((item) => {
            console.log(item, '[item]');
            return (
              <Marker
                position={[item.latitude, item.longitude]}
                icon={iconCircle}
              >
                <Popup>
                  <div className="grid min-w-[300px] max-w-[450px] grid-rows-[177px,1fr,auto] shadow-lg">
                    <div className="h-full">
                      <img
                        src="https://photos.zillowstatic.com/fp/ee03a8da9b3fdf3c0090469d9d6e154f-cc_ft_384.webp"
                        alt=""
                        className="h-0 min-h-full w-full rounded-t-md object-cover"
                      />
                    </div>
                    <div className="overflow-hidden rounded-b-md bg-white p-2 font-sans">
                      <div className="max-h-16 overflow-hidden">
                        <h3 className="break-normal text-2xl font-bold text-neutral-700">
                          {item.ads_name}
                        </h3>
                      </div>
                      <div className="text-neutral-600">
                        height {item.height ?? '--'} | length{' '}
                        {item.length ?? '--'}
                      </div>
                      <div className="pt-2 uppercase tracking-wider text-neutral-600">
                        {item.location}
                      </div>
                      <div className="uppercase text-neutral-600">user</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    ),
    [lat, long, zoom, listing],
  );

  return (
    <>
      {map ? <DisplayPosition map={map} onMoveHandler={onMoveHandler} /> : null}
      {displayMap}
    </>
  );
}

export default ExternalStateMap;
