import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = ({ mountains }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current) {
      // Clear existing markers before adding new ones
      mapInstance.current.getCanvas().style.filter = ''; // Reset filters if any
  
      mountains.forEach((mountain) => {
        let iconUrl = '/icons/mountain_no_snow.png';
        if (mountain.hasSnow) {
          iconUrl = '/icons/mountain_snow.png';
        } else if (mountain.forecastSnow) {
          iconUrl = '/icons/mountain_forecast.png';
        }
  
        const el = document.createElement('div');
        el.style.backgroundImage = `url(${iconUrl})`;
        el.style.width = '40px';
        el.style.height = '40px';
        el.style.backgroundSize = 'cover';
        el.style.cursor = 'pointer';
        el.title = mountain.name;
  
        new mapboxgl.Marker(el)
          .setLngLat([mountain.longitude, mountain.latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`${mountain.name}: ${mountain.weather}`))
          .addTo(mapInstance.current);
      });
    }
  }, [mountains]); // <-- Closing properly
  
  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
  };
  