import React, { useEffect } from 'react'
import { Flex, Box, useMediaQuery } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import Header from '../UI/Header/Header'
import Sidebar from '../UI/Sidebar/Sidebar'
import Map from '../UI/Map/Map'
import AuthStore from '../../store/AuthStore'
import UIStore from '../../store/UIStore'
import Spinner from '../UI/Spinner/Spinner' 

export default function Home() {
  // Store
  const validateUser = AuthStore((state) => state.validateUser)
  const status = AuthStore((state) => state.status) 
  const invitadoUSer = AuthStore((state) => state.invitadoUSer)
  const ChangeRoute = UIStore((state) => state.ChangeRoute)
  
  const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`) 

  useEffect(() => {
    ChangeRoute('home')
    if(accessToken)
    {validateUser()}else{
      invitadoUSer()
    }
  }, [])

  // media query
  const [desktopView] = useMediaQuery('(min-width: 800px)')

  if (status == false) {
    return (
      <>
        <Navigate to='/login' />
      </>
    )
  }

  if (status) {
    return (
      <Flex
        w='100vw'
        h='100vh'
        minW='360px'
        flexDirection='column'>
        <Header />
        <Flex h='100%'>
          {desktopView && <Sidebar />}
          <Box position='relative' h='100%' w='100%'>
            <Map />
          </Box>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex w='100vw' h='100vh' minW='360' poaition='relative'>
      <Spinner />
    </Flex>
  )
}
