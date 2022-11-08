import React from 'react'
import {Button} from '@chakra-ui/react'
import MapStore from '../../../store/MapStore'   
import {useSearchParams} from 'react-router-dom'

export default function BathroomButton({number}){ 

    // Store 
    const filterMap = MapStore((state) => state.filterMap)   
    const bathroom = MapStore(state => state.filterValues.bathdroom) 
    
    const [params,setParams]=useSearchParams()

    function clickButton(value,params,setParams,bathroom){
        if(value == bathroom){

            params.set('bathdroom', '')
        }else{

            params.set('bathdroom', value)
        }
        filterMap('bathdroom',value)
        setParams(params)
    }

    return(      
        <Button w={12} className={bathroom==number && 'active'} 
        onClick={
            ()=>clickButton(number,params,setParams,bathroom)
        }>
            {number} {number == 5 && '+'}
        </Button>
                
    )
}