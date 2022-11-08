import React from 'react'
import { Drawer, DrawerBody, useDisclosure, DrawerOverlay, DrawerContent, Button, useColorModeValue } from '@chakra-ui/react'
import MenuOptions from '../MenuOptions/MenuOptions'
import { IconSetting } from '../Icons/Icons'
import { motion,useTime,useTransform } from 'framer-motion'

export default function MenuDrawer() {

  // cosas de chakra
  const { isOpen, onOpen, onClose } = useDisclosure()
  // Theme
  const bgMenu = useColorModeValue('bg.sidebarLight', 'bg.sidebarDark')
  const time = useTime()
  const rotate = useTransform(time,[0,4000],[0,360],{clamp:false})
  return (
    <>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} w='340px'  >
        <DrawerOverlay />
        <DrawerContent w='340px'>
          <DrawerBody overflow='hidden' bg={bgMenu} position='relative' w='340px'>
            <MenuOptions />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <motion.div
        style=
        {{

          position: 'absolute',
          insetBlockEnd: '50px',
          insetInlineEnd: '50px',
          width: '60px',
          height: '60px', 
          rotate
        }} 
      >
        <Button _hover={{}} onClick={onOpen} _active={{}} bg='#001aff' align='center' justify='center' borderRadius='60px' w='60px' h='60px'>
          <IconSetting fill='white' fontSize='30px' />
        </Button>
      </motion.div>
    </>
  )
} 