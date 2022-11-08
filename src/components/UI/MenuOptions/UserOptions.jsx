import React from 'react'
import {MenuItem} from '@chakra-ui/react'  
import {Link} from 'react-router-dom'  

export default function MapBoxOptions(){  
 
    return(

        <> 
            <Link to="/"><MenuItem>Back to map </MenuItem></Link>
        </>
    )
}