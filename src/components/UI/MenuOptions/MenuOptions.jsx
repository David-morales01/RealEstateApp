import React from 'react'
import {Box} from '@chakra-ui/react'
import InputSearch from './InputSearch'
import FilterButtonSet from './FilterButtonSet'
import FilterButtonBusiness from './FilterButtonBusiness'
import FilterPrice from './FilterPrice'  

export default function MenuOptions(){ 

    
    return(

        <Box  position='absolute' insetInline='0' insetBlockStart='20px' w='100%' h='100%'  px='10px' py='10px' overflow='hidden' sx={{
           '.itemButtons>button:hover':{
                bg:'#3347D2',
                color:'#ffffff',
            }, 
            '.active':{
                bg:'#3347D2',
                color:'#ffffff',
            },
            '.active svg':{
                fill:'#ffffff',
            },
            '.ButtonGroup button:hover':{
                bg:'#3347D2',
                color:'#ffffff',
            },     
        }}> 
            <InputSearch/>

            <FilterButtonBusiness/>
            
            <FilterPrice/>

            <FilterButtonSet/>
        </Box>
    )
}