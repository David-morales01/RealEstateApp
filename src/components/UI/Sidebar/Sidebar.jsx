import React from 'react'
import {
  Accordion,
  Flex,
  Box,
  Button,
  useColorModeValue,
  useDisclosure,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  useMediaQuery,
} from '@chakra-ui/react'
import UIStore from '../../../store/UIStore'
import {motion} from 'framer-motion'
import {FijarIcon} from '../Icons/Icons'
import InputSearch from '../MenuOptions/InputSearch'
import FilterButtonSet from '../MenuOptions/FilterButtonSet'
import FilterButtonBusiness from '../MenuOptions/FilterButtonBusiness'
import FilterPrice from '../MenuOptions/FilterPrice'
import CopyButton from '../Buttons/CopyButton'

export default function Sidebar() {
  // media query
  const [desktopView] = useMediaQuery('(min-width: 800px)')
  // Store
  const sidebar = UIStore((state) => state.sidebar)
  const changeSidebar = UIStore((state) => state.changeSidebar)
  // Theme
  const bgSidebar = useColorModeValue('bg.sidebarLight', 'bg.sidebarDark')
  const iconColor = useColorModeValue('color.iconLight', 'color.iconDark')

  // cosas de chakra
  const {getDisclosureProps} = useDisclosure()

  return (
    <>
      <motion.div
        {...getDisclosureProps()}
        hidden={false}
        initial={false}
        animate={{width: sidebar ? 480 : 70, opacity: sidebar ? 1 : 0.4}}
        whileHover={{width: '480px', opacity: 1}}
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          height: '100%',
          flexDirection: 'column',
          position: 'relative',
        }}
        className='sidebarContent'
        bg={bgSidebar}>
        <Accordion
          w='100%'
          h='100%'
          position='absolute'
          inset='0'
          py='10px'
          defaultIndex={[0]}
          overflow='hidden'
          allowToggle
          sx={{
            '.itemButtons>button:hover': {
              bg: '#3347D2',
              color: '#ffffff',
            },
            '.active': {
              bg: '#3347D2',
              color: '#ffffff',
            },
            '.active svg': {
              fill: '#ffffff',
            },
            '.ButtonGroup button:hover': {
              bg: '#3347D2',
              color: '#ffffff',
            },
          }}>
          <Flex w='100%' px='10px' gap='10px' zIndex={2} justify='end'>
            <CopyButton/>
            <Button bg='none' my='8px' onClick={changeSidebar} _hover={{bg: 'none'}}>
              <FijarIcon fill={iconColor} />
            </Button>
          </Flex>

          <InputSearch />

          <AccordionItem border={0}>
            <AccordionButton>
              <Box
                flex='1'
                textAlign='left'
                opacity={desktopView ? (sidebar ? '1' : '0') : '1'}
                transition='0.5s'
                mb='10px'
                sx={{'.sidebarContent:hover &': {transition: '4s', opacity: '1'}}}>
                Property Type
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={2}>
              <FilterButtonBusiness />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border={0}>
            {' '}
            <AccordionButton>
              <Box
                flex='1'
                textAlign='left'
                opacity={desktopView ? (sidebar ? '1' : '0') : '1'}
                transition='0.5s'
                my='10px'
                sx={{'.sidebarContent:hover &': {transition: '4s', opacity: '1'}}}>
                Your Budget
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={2}>
              <FilterPrice />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border={0}>
            <AccordionButton>
              <Box
                flex='1'
                opacity={desktopView ? (sidebar ? '1' : '0') : '1'}
                transition='0.5s'
                my='10px'
                textAlign='left'
                sx={{'.sidebarContent:hover &': {transition: '4s', opacity: '1'}}}>
                Property Bedroom
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={2}>
              <FilterButtonSet />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </>
  )
}
