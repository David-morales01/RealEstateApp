import React, { useEffect, useState } from 'react'
import MapStore from '../../../store/MapStore'
import Marker from './Marker'
import './Marker.scss'
import { useLazyQuery } from '@apollo/client'
import { FILTER_MARKERS } from '../../../graphql/Query'
import ErrorMessage from '../../UI/Message/ErrorMessage'
import ErrorMarker from '../../UI/Message/ErrorMarker'
import Spinner from '../Spinner/Spinner' 

export default function ListMarker() {
  // Store
  const filterValues = MapStore((state) => state.filterValues)
  const listMarkers = MapStore(state => state.listMarkers)
  const changeListMarkers = MapStore((state) => state.changeListMarkers)
  const [filterMarkers, { data, loading, error }] = useLazyQuery(FILTER_MARKERS,{
    fetchPolicy:'cache-and-network'
  }) 
  
  useEffect(() => {
      changeListMarkers(true) 
    
  }, [])  
  
  useEffect(() => {
    if (listMarkers) { 
      filterMarkers({ variables: { ...filterValues } })
      changeListMarkers(false) 
    } 
  }, [listMarkers])  

  if (error) { 
    return <ErrorMessage error={`${error}`} />
  }

  if (loading) {
    return (
      <Spinner />
    )
  }
  
  if (data) {
    if (data.filterMarkers.length >= 1) {
      return (
        <>
          {data.filterMarkers.map((marker) => { 
            return <Marker key={marker.id} marker={marker} />
          })}
        </>
      )
    } else {
      return (
        <ErrorMarker />
      )
    }
  }
}
