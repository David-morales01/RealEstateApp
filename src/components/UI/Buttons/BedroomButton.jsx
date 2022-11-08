import React from 'react'
import {Button} from '@chakra-ui/react'
import MapStore from '../../../store/MapStore'   
import {useSearchParams} from 'react-router-dom'

export default function BedroomButton({number}){ 

    // Store 
    const filterMap = MapStore((state) => state.filterMap)   
    const bedroom = MapStore(state => state.filterValues.bedroom) 
    
    const [params,setParams]=useSearchParams()

    function clickButton(value,params,setParams,bedroom){
        if(value == bedroom){
            params.set('bedroom', '')
        }else{

            params.set('bedroom', value)
        }
        filterMap('bedroom',value) 
        setParams(params)
    }

    return(      
        <Button w={12} className={bedroom==number && 'active'} 
        onClick={
            ()=>clickButton(number,params,setParams,bedroom)
        }>
            {number} {number == 5 && '+'}
        </Button>
                
    )
}