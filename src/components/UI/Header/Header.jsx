import React from 'react'
import {Flex,Box,useColorModeValue,Text,useMediaQuery,Avatar,AvatarBadge,Menu,MenuButton,MenuList,MenuItem} from '@chakra-ui/react'
import AuthStore from '../../../store/AuthStore'  
import UIStore from '../../../store/UIStore'  
import ColorModoText from '../ColorModeSwitcher/ColorModoText'
import {ChevronDownIcon } from '@chakra-ui/icons'
import MapBoxOptions from '../MenuOptions/MapBoxOptions'
import UserOptions from '../MenuOptions/UserOptions'

export default function Header(){
    
    // Store
    const logOut = AuthStore((state) => state.logOut) 
    const user = AuthStore(state => state.user)
    const route = UIStore(state => state.route)
    
    // Media Query
    const [desktopView] = useMediaQuery('(min-width: 800px)') 
    const [desktopViewName] = useMediaQuery('(min-width: 450px)') 

    // theme colors
    const colorText = useColorModeValue('color.colorTextLight', 'bg.colorTextDark')
    const bgHeader = useColorModeValue('bg.headerLight', 'bg.headerDark')
    return (
        <Flex color='white'  bg={bgHeader} w='100%' h='70px' justify='space-between' align='center' px='20px'>
            <Flex h='40px' align='center' >
                <Text position='relative'   fontSize={desktopView?'40px':'24px'} fontWeight='bold'>
                    Real Estate 3.2
                </Text>
            </Flex>  
            <Flex columnGap='10px' align='center'>
                 
                <Avatar  name={user.name} src={ user.id ? ( user.picture ? `${user.picture}` :`${import.meta.env.VITE_REACT_APP_ROUTE_STORAGE}/${user.img_user}`) : null} />
                 
                <Flex align='center'  columnGap='4px'>
                    <Box display={desktopViewName? '' : 'none'}>{user.name}</Box>
                    <Menu >
                        <MenuButton px={0} py={0}> 
                            <ChevronDownIcon />
                        </MenuButton>
                        <MenuList color={colorText} > 
                            { route == 'perfil' ?<UserOptions/>:<MapBoxOptions/>} 
                            <ColorModoText/>
                            <MenuItem onClick={logOut}>{user.id ? 'Log Out' :' Log in'}</MenuItem>  
                        </MenuList>
                    </Menu> 
                </Flex>
            </Flex>
        </Flex>
    )
}
