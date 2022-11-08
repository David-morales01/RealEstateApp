import React, {useEffect} from 'react'
import {Box, Flex, useColorModeValue, Img, useMediaQuery} from '@chakra-ui/react'
import Header from '../UI/Header/Header'
import AuthStore from '../../store/AuthStore'
import UIStore from '../../store/UIStore'
import FormPerfil from '../UI/Form/FormPerfil'
import {useNavigate} from 'react-router-dom'

export default function Perfil() {
  // Store
  const user = AuthStore((state) => state.user) 
  const ChangeRoute = UIStore((state) => state.ChangeRoute)
  const changeImage = UIStore((state) => state.changeImage) 

  // Theme
  const borderColor = useColorModeValue('color.borderLight', 'color.borderDark')
  const bgContainer = useColorModeValue('bg.containerLight', 'bg.containerDark')

  const navigate = useNavigate()
  // media query
  const [desktopView] = useMediaQuery('(min-width: 800px)')

  useEffect(() => { 
    if (!user.id) {
      navigate('/')
    } else {
      ChangeRoute('perfil')
      changeImage(`${import.meta.env.VITE_REACT_APP_ROUTE_STORAGE}/${user.img_user}`)
    }
  }, [user])

  return (
    <Flex w='100vw' minH='100vh' minW='360px' flexDirection='column'>
      <Header />
      <Flex h='100%' flexWrap='wrap' my={desktopView ? '10px' : '30px'} justify='center'> 
        <Box
          h='fit-content'
          overflow='hidden'
          borderColor={borderColor}
          borderWidth='1px'
          bg={bgContainer}
          mx='40px'
          mt='60px'
          px='40px'
          py='60px'
          maxW='700px'
          w='100%'
          borderRadius='20px'>
          <FormPerfil />
        </Box>
      </Flex>
    </Flex>
  )
}
