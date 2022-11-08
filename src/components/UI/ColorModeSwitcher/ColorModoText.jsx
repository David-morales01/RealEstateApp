import React from 'react'  
import { useColorMode,MenuItem } from '@chakra-ui/react'

export default function ColorModoText() {

  const { colorMode, toggleColorMode } = useColorMode()
  
  return ( 
    <MenuItem onClick={toggleColorMode}>
        {colorMode === 'light' ? 'Dark' : 'Light'} 
    </MenuItem>   
  )
}