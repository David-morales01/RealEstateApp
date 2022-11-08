import React, { useEffect } from 'react'
import { Routes, Route, useRoutes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './components/Home/Home'
import Perfil from './components/Home/Perfil'
import UserPermits from './components/Home/UserPermits'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Theme from './Theme/Theme.js'
import { useSearchParams } from 'react-router-dom'
import  MapStore from './store/MapStore'
import {validateParameter} from './Utils/Utils'

export default function App() {

  /* pasar al home */ 
  
  const [params, setParams] = useSearchParams()

  const title = params.get('title') ?? ''
  const bedroom = parseInt(params.get('bedroom'))
  const bathdroom = parseInt(params.get('bathdroom'))
  const priceRange = validateParameter(params.get('priceRange'))
  const businessTypesId = validateParameter(params.get('businessTypesId'))

  // Store
  const initialFilters = MapStore((state) => state.initialFilters) 

  useEffect(() => { 
    initialFilters({ title, priceRange, bedroom, bathdroom, businessTypesId })
  }, [])

  return (
    <ChakraProvider theme={Theme}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Perfil />} path="perfil" />
        <Route element={<UserPermits />} path="userPermits" />
        <Route element={<Login />} path="login" />
        <Route element={<Register />} path="register" />
      </Routes>
    </ChakraProvider>
  );
}

