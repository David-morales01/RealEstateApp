import React,{useEffect,useState} from 'react'
import {Alert, AlertIcon, AlertTitle,AlertDescription,Box,Flex} from '@chakra-ui/react'
 
export default function ErrorMarker() {
     
    const [visible,setVisible]= useState(true) 
    useEffect(()=>{ 
        setTimeout (()=>{ 
            setVisible(false)
        },5000);
    },[])

    return visible && (
        <Box position='absolute' inset='0'>
            <Alert status='warning' bg= 'red' opacity='0.6' >
                <Flex justifyContent='center' w='90%'>
                    <AlertIcon position='relative' />
                    <AlertTitle color='white'> No properties available</AlertTitle>
                    <AlertDescription>
                    </AlertDescription>
                </Flex> 
            </Alert>
             
      </Box>
    );
  }