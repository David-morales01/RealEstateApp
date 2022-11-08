import React from 'react'
import {Flex,Spinner} from '@chakra-ui/react'

export default function LoadingSpinner({bg}){
    return (
        <Flex position='absolute' w='100%' h='100%' bg={ bg? bg:'rgba(0, 0, 0, 0.35)'}  justifyContent='center' inset='0' alignItems='center' >
           <Spinner 
                thickness='4px'
                speed='0.65s'
                emptyColor='transparent'
                color='#3347d3'
                size='xl'
            />
        </Flex>
    )
}