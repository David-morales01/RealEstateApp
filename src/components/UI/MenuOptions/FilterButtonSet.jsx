import React from 'react'
import {Box,ButtonGroup,Text,useMediaQuery} from '@chakra-ui/react' 
import UIStore from '../../../store/UIStore' 
import BedroomButton from '../Buttons/BedroomButton'
import BathroomButton from '../Buttons/BathroomButton'

export default function FilterButtonSet(){

    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 

    // Buttons
    const buttons = [1,2,3,4,5]

    // Store
    const sidebar = UIStore(state => state.sidebar)    
    return( 
        <Box className='ButtonGroup' opacity={desktopView?(sidebar ?'1':'0') :'1'} transition='0.5s' my='20px' w='100%' pr='10px' sx={{'.sidebarContent:hover &':{transition : '2s', opacity:'1'}}}>
             
            <Text my='14px' fontSize='14px'>Bedroom</Text>
            <ButtonGroup variant='outline' spacing='3'>
                {
                    buttons.map((number)=>{
                        return(
                            <BedroomButton  key={number} number={number}/>
                
                        )
                    })
                }
                  </ButtonGroup>
            <Text my='14px' fontSize='14px'>Bathroom</Text>
            <ButtonGroup variant='outline' spacing='3'>
                {
                    buttons.map((number)=>{
                        return(
                            <BathroomButton  key={number} number={number}/>
                
                        )
                    })
                }     
            </ButtonGroup>
        </Box>  
    )
}