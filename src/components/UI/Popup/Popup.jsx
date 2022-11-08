import React, {useEffect, useState,useRef} from 'react'
import {Flex, Box, Img} from '@chakra-ui/react'
import {BathdroomIcon,BedroomIcon} from '../Icons/Icons'
import {Skeleton, SkeletonText} from '@chakra-ui/react'  
import {GET_MARKER} from '../../../graphql/Query' 
import {useLazyQuery} from '@apollo/client'
import ButtonPopup from './ButtonPopup'
import { motion } from 'framer-motion'

export default function Popup({id}) {
  // Store 
  const [status, setStatus] = useState(true)
  const [left, setLeft] = useState(0)
  const [marker, setMarker] = useState({})  
  const length = useRef()
  const imagePosition = useRef(0)
  const valor = useRef(-1)
  const [findMarker, {data}] = useLazyQuery(GET_MARKER) 
  useEffect(() => {
    findMarker({variables: {id}})
  }, [])

  useEffect(() => {
    
    if (data) { 
      setStatus(true)
      setMarker(data.marker)
      length.current = data.marker.images.length -1
      if(length.current >=1){

        setLeft(0)
      }
    }else{
      setStatus(false)
      
    }
  }, [data]) 
  
  useEffect(() => {
    if (status) {  
      if(imagePosition.current == 0){
        valor.current = -1
      }else if(imagePosition.current == (length.current * -1)){
        valor.current = 1
      }
      imagePosition.current = imagePosition.current + valor.current  
       setTimeout(()=>{
        setLeft(imagePosition.current * 226)
       },5000)
    }
  }, [left]) 
 
  return (
    <Box color='black' textAlign='center'>
      <SkeletonText h={4} fadeDuration={2} noOfLines={1} marginBlock='10px' isLoaded={status}>
        {marker.title}
      </SkeletonText>
      <Skeleton
        fadeDuration={4}
        position='relative'
        w='226px'
        h='220px'
        overflow='hidden'
        borderRadius='10px'
        isLoaded={status}>
        <Box
          position='absolute'
          color='white'
          py='5px'
          px='8px'
          borderRadius='6px'
          zIndex={10}
          bg={marker.status ? '#001AFF' : '#FF3333'}
          insetInlineStart='10px'
          insetBlockStart='10px'>
          {marker.status ? `$  ${marker.price} ` : 'Not available'}
        </Box>
        {marker.images && 
          <motion.div
          style=
        {{ 
            position:'relative',
            width:'226px',
            height:'220px',
            display:'flex'
        }} 
         animate={{ 
           x: left
          }}
          transition={{  
            x:{duration:2},
            default:{ease:"easeInOut"}
           }}>
            {marker.images.length > 0 ? (
              marker.images.map((item) => {
                return (
                  <Img 
                    w='230px'
                    h='230px'
                    key={item.id}
                    objectFit='cover'
                    src={`${import.meta.env.VITE_REACT_APP_ROUTE_STORAGE}/${item.src_img}`}
                  />
                )
              })
            ) : (
              <Box className='defaultImage'>Not images available</Box>
            )}
          </motion.div>
        }
      </Skeleton>

      <SkeletonText noOfLines={3} my='10px' isLoaded={status}>
        {marker.description}
      </SkeletonText>

      <Skeleton
        display='flex'
        justifyContent='space-between'
        fontSize='20px'
        align='end'
        mt='10px' 
        isLoaded={status}>
        <Flex gap='6px' h='30px' align='end'>
          <BedroomIcon />
          {marker.bedroom}
        </Flex>
        <Flex gap='6px' h='30px' align='end'>
          <BathdroomIcon />
          {marker.bathdroom}
        </Flex>

         <ButtonPopup marker={marker}/> 
      </Skeleton>
    </Box>
  ) 
                              
}
