import React, {useState, useEffect} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Button, useColorModeValue, Box} from '@chakra-ui/react'
import {toast, Toaster} from 'react-hot-toast'
import {IconCopy} from '../Icons/Icons'
import MapStore from '../../../store/MapStore'
import {decodeFilter} from '../../../Utils/Utils'

export default function CopyButton() {
  const [filters, setFilter] = useState('fters')
  const filterValues = MapStore((state) => state.filterValues)
  const listMarkers = MapStore((state) => state.listMarkers)

  useEffect(() => {
    setFilter(decodeFilter(filterValues))
  }, [listMarkers])

  const iconColor = useColorModeValue('color.iconLight', 'color.iconDark')
  return (
    <Box>
      <CopyToClipboard text={filters}>
        <Button  
          bg='none'
          my='8px'
          _hover={{bg: 'none'}}
          onClick={() => {
            toast.success('Copied filters', {position: 'top-center'})
          }}>
          <IconCopy fill={iconColor} />
        </Button>
      </CopyToClipboard>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #e3e3e3',
            padding: '16px',
            color: '#08d41d',
          },
        }}
      />
    </Box>
  )
}
