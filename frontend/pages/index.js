import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { Box, Typography, TextField, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Home = () => {
  const [map, setMap] = useState(null);
  const [mountains, setMountains] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMountain, setSelectedMountain] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [-118.2437, 34.0522], // Los Angeles default
        zoom: 7,
      });
      setMap(mapInstance);
    };

    initializeMap();
  }, []);

  useEffect(() => {
    if (map) {
      axios.get('/api/mountains')
        .then(response => {
          setMountains(response.data);
          response.data.forEach(mountain => {
            const marker = new mapboxgl.Marker({
              color: mountain.hasSnow ? 'blue' : 'gray',
            })
              .setLngLat([mountain.longitude, mountain.latitude])
              .setPopup(new mapboxgl.Popup().setText(mountain.name))
              .addTo(map);
          });
        })
        .catch(error => console.error('Error fetching mountain data:', error));
    }
  }, [map]);

  const handleSearch = () => {
    axios.get(`/api/search?query=${searchQuery}`)
      .then(response => setMountains(response.data))
      .catch(error => console.error('Search error:', error));
  };

  return (
    <Box>
      <Head>
        <title>Snow Tracker</title>
      </Head>
      <Box display="flex">
        <Drawer variant="permanent" anchor="left">
          <List>
            {mountains.map((mountain, index) => (
              <ListItem button key={index} onClick={() => setSelectedMountain(mountain)}>
                <ListItemText primary={mountain.name} secondary={`Weather: ${mountain.weather}`} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box flexGrow={1} p={2}>
          <TextField 
            placeholder="Search mountains"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
          <Box id="map" style={{ width: '100%', height: '500px' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
