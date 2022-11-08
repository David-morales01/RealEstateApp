import React, { useState } from 'react'
import { Flex, useColorModeValue, Input, useMediaQuery } from '@chakra-ui/react'
import { SearchIcon } from '../Icons/Icons'
import MapStore from '../../../store/MapStore'
import { useSearchParams } from 'react-router-dom'

export default function InputSearch() {

    // media query
    const [desktopView] = useMediaQuery('(min-width: 800px)')
    // theme colors
    const colorIcon = useColorModeValue('color.iconSearchLight', 'color.iconSearchDark')
    // store  
    const filterMap = MapStore((state) => state.filterMap)
    const defaultTitle = MapStore(state => state.filterValues.title)
    const [params, setParams] = useSearchParams()
    const [title, setTile] = useState(defaultTitle)

    function filterTitle(value, params, setTile,setParams) {
        setTile(value)
        filterMap('title', value)
        params.set('title', value)
        setParams(params)
    }

    return (
        <Flex position='relative'  mx='10px' alignItems='center' borderRadius='20px' h='30px' mt='10px' mb='20px' bg='#eff0f2'>
            <SearchIcon mx='16px' fill={colorIcon} />
            <Input type='text' color='black' border='0px' variant='unstyled'
                value={title}
                position='relative' autoComplete='off' onChange={ev => filterTitle(ev.target.value, params, setTile,setParams)} opacity={desktopView ? '0' : '1'} transition='0.2s' my='20px' w='90%' sx={{ '.sidebarContent:hover &': { transition: '2s', opacity: '1' } }} />
        </Flex>
    );
}
