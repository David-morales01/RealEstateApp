import React, { useRef, useEffect } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapStore from '../../../store/MapStore'
import {Box} from '@chakra-ui/react'

export default function FormMarker() {

  // Store  
  const coordinate = MapStore(state => state.coordinate)
  const setEditCoordinate = MapStore((state) => state.setEditCoordinate)    
  // Miniatura 
  const mapMin = useRef(null);
  const map = useRef(null);

  useEffect(() => { 
      map.current = new Map({
        container: mapMin.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [coordinate.lng, coordinate.lat],
        zoom: 16,
        attributionControl: false,
      });

      const nav = new mapboxgl.NavigationControl({
        visualizePitch: false,
      });

      map.current.addControl(nav, "top-right");

      const markerE = new mapboxgl.Marker({
        color: "red",
        fontSize: "90px",
        draggable: true,
      })
        .setLngLat([coordinate.lng, coordinate.lat])
        .addTo(map.current);
      markerE.on("dragend", (e) => { 
        setEditCoordinate(e.target._lngLat)
      });

    
  }, [])

  useEffect(() => {
    return () => {
      map.current.remove();
    };
  }, [])

  return (
    <Box ref={mapMin} h='170px'></Box>
  )
}