import React,{useEffect,useState} from 'react'
import {Alert, AlertIcon, AlertTitle,AlertDescription,Box,Flex,useColorModeValue} from '@chakra-ui/react'

export default function ErrorMessage({error}) {
     
    const [visible,setVisible]= useState(true)
    let errorText = error.replace('Error:',' ') 
    const alert  = useColorModeValue('bg.alertLight', 'bg.alertDark') 
    useEffect(()=>{ 
        setTimeout (()=>{ 
            setVisible(false)
        },5000);
    },[])

    return visible && (
        <Box position='absolute' inset='0'>
            <Alert status='error' bg={alert} >
                <Flex justifyContent='center' w='90%'>
                    <AlertIcon position='relative' />
                    
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>
                        {errorText}
                    </AlertDescription>
                </Flex> 
            </Alert>
             
      </Box>
    );
  }