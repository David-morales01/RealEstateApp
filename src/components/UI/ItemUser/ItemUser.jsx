import React,{useState}  from 'react'   
import {Tr,Td,Button,Avatar,Flex} from '@chakra-ui/react' 
import {useLazyQuery} from '@apollo/client'
import {CHANGE_ROL} from '../../../graphql/Query'

export default function ItemUser({item}){ 
    // // State
     const [rol,setRol]= useState(item.rol)
      //Store 
     const [editPermit,result]= useLazyQuery(CHANGE_ROL) 
    return (
        <Tr>
             <Td> 
                <Flex align='center' gap='16px' h='100%'>
                <Avatar  name={item.name} src={`${import.meta.env.VITE_REACT_APP_ROUTE_STORAGE}/${item.img_user}`} /> 
                {item.name}
                </Flex>
            </Td>
            <Td>{item.email}</Td>
            <Td> 
                <Button w='80px' bg='none'_hover={{bg:'none'}} onClick={()=>{changeRol(item,rol,editPermit)}}>{rol == 'admin'? 'Admin':' User '}</Button> 
            </Td> 
        </Tr> 
    )

    function changeRol(item,rol,editPermit){
         const id = item.id
         if(rol == 'admin'){
             setRol('user') 
             editPermit({variables:{id,rol:'user'}})
         }else{
             let rol = 'admin'
             setRol('admin')
             editPermit({variables:{id,rol:'admin'}})
         }
    }
}