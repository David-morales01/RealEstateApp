import React, {useEffect, useRef} from 'react'
import {Box, useMediaQuery} from '@chakra-ui/react'
import mapboxgl, {Map} from 'mapbox-gl'
import MapStore from '../../../store/MapStore'
import UIStore from '../../../store/UIStore'
import AuthStore from '../../../store/AuthStore'
import 'mapbox-gl/dist/mapbox-gl.css'
import Modal from '../Modal/Modal'
import ListMarker from '../Marker/ListMarker'
import MenuDrawer from '../MenuDrawer/MenuDrawer'

export default function MapBox() {
  // Store
  const mapStore = MapStore()
  const user = AuthStore((state) => state.user)
  //const statusMap = MapStore(state => state.statusMap)
  const changeMap = MapStore((state) => state.changeMap)
  const coordinate = MapStore((state) => state.coordinate)
  const map = MapStore((state) => state.map)
  const initialCoordinate = UIStore((state) => state.initialCoordinate)
  //const error = MapStore(state => state.error)
  // media query
  const [desktopView] = useMediaQuery('(min-width: 800px)')

  // MapBox
  const mapDiv = useRef(null)

  // Token
  mapboxgl.accessToken = `${import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}`

  useEffect(() => {
    // mapStore.getMarkers()

    const mapb = new Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCoordinate,
      zoom: 7,
      attributionControl: false,
    })

    const nav = new mapboxgl.NavigationControl({
      visualizePitch: false,
    })

    mapb.addControl(nav, 'top-right')

    if (user.rol == 'admin' || user.rol == 'superAdmin') {
      mapb.on('click', function (e) {
        mapStore.getCoordinate(e.lngLat)
      })
    }
    changeMap(mapb)

    return () => {
      mapb.remove()
    }
  }, [])

  return (
    <>
      <Box w='100%' h='100%' ref={mapDiv} position='relative' isolation="isolate"></Box>
      {/* {!statusMap && <Spinner bg='rgba(0, 0, 0, 0.9)' />} */}
      {coordinate && <Modal />}
      <ListMarker />
      {!desktopView && <MenuDrawer />}
    </>
  )
}
