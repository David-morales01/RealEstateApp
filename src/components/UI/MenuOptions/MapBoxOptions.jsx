import React from 'react'
import {useMediaQuery,MenuItem,Button} from '@chakra-ui/react'
import AuthStore from '../../../store/AuthStore'  
import MapStore from '../../../store/MapStore'   
import UIStore from '../../../store/UIStore'  
import {Link} from 'react-router-dom'  

export default function MapBoxOptions(){ 

    // Store
    const clickMap = MapStore(state => state.clickMap)
    const clickEventMap = MapStore((state) => state.clickEventMap) 
    const user = AuthStore(state => state.user) 
 
    return(

        <>
            {user.id && <Link to="/perfil"><MenuItem >My perfil</MenuItem></Link>  }           
            {user.rol =='superAdmin' ? <Link to='/userPermits'><MenuItem>User permits</MenuItem></Link> : ''}  
            {user.rol == 'admin' || user.rol =='superAdmin' ? <MenuItem onClick={clickEventMap}>{clickMap? 'Cancel add Marker' : 'New Marker'}</MenuItem> : ''} 
        </>
    )
}