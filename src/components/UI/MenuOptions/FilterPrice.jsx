import React,{useState,useRef} from 'react'
import {Flex,Box,Text,RangeSlider,RangeSliderTrack,RangeSliderFilledTrack,RangeSliderThumb,useMediaQuery,useColorModeValue} from '@chakra-ui/react'
import MapStore from '../../../store/MapStore'  
import UIStore from '../../../store/UIStore' 
import {useSearchParams} from 'react-router-dom'

export default function FilterPrice(){ 

    // Store
    const sidebar = UIStore(state => state.sidebar)  
    const filterValues = MapStore((state) => state.filterValues)

    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)')
    const [params,setParams]=useSearchParams()
    // Ref
    const minPrice = useRef(filterValues.priceRange[0] ? filterValues.priceRange[0] : 0)
    const maxPrice = useRef(filterValues.priceRange[1] ? filterValues.priceRange[1] : 0)
    const [values,SetValues]= useState([minPrice.current,maxPrice.current])
    const bgSlider = useColorModeValue('bg.SliderLight','bg.SliderDark')
    const bgRangeSlider= useColorModeValue('bg.RangeSliderLight','bg.RangeSliderDark')
    const bgRangeSliderThumb= useColorModeValue('bg.RangeSliderThumbLight','bg.RangeSliderThumbDark')
 
    // store  
    const filterMap = MapStore((state) => state.filterMap)   
    
    return( 
            <Box h='70px' opacity={desktopView?(sidebar ?'1':'0') :'1'} transition='0.5s' my='20px' w='100%' pl='10px' pr='20px' sx={{'.sidebarContent:hover &':{transition : '2s', opacity:'1'}}}>
                <RangeSlider aria-label={['min', 'max']} max='10000' defaultValue={values} onChange={ (val) => changeSlider(val)} onChangeEnd={(val) => sendValue(val) } >
                    <RangeSliderTrack bg={bgSlider}>
                        <RangeSliderFilledTrack bg={bgRangeSlider} />
                    </RangeSliderTrack> 
                    <RangeSliderThumb boxSize={6} bg={bgRangeSliderThumb} index={0}>
                        <Box></Box>
                    </RangeSliderThumb>
                    <RangeSliderThumb boxSize={6} bg={bgRangeSliderThumb} index={1}>
                        <Box></Box>
                    </RangeSliderThumb> 
                </RangeSlider>
                 {values[1] != null && values[1] !=0 && <Flex justify='center' my='10px'><Box mr='10px'>MIN : ${values[0]}</Box>-<Box ml='10px'>MAX : ${values[1]}</Box></Flex>}
            
            </Box>  
    )
    function changeSlider(val){

        if(val[1] == 0){
                SetValues([]) 
                params.set('priceRange','')
 
            }else{ 
                SetValues(val) 
                const temp = val.join()
                params.set('priceRange', temp)
            }
            setParams(params)
    }
    function sendValue(val){
        if(val[0] != minPrice.current || val[1] != maxPrice.current){
            if(val[1] == 0){
                filterMap('priceRange',[])  
            }else{
                filterMap('priceRange',val)
                
            }
            minPrice.current=val[0]
            maxPrice.current=val[1] 
        }
        
    }
}