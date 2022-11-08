import React from 'react'
import {Flex} from '@chakra-ui/react'
import {HomeIcon, CommercialIcon, ApartmentIcon, VacantIcon} from '../Icons/Icons' 
import ButtonBusiness from '../Buttons/ButtonBusiness'
export default function FilterButtonBusiness() { 

  const buttons = [
    {type: 1, text: 'Home', icon: HomeIcon},
    {type: 2, text: 'Commercial ', icon: CommercialIcon},
    {type: 3, text: 'Apartment', icon: ApartmentIcon},
    {type: 4, text: 'Vacant', icon: VacantIcon},
  ]

  return (
    <Flex
      w='100%'
      className='itemButtons'
      rowGap='10px'
      columnGap='2%'
      justify='space-between'
      flexWrap='wrap'>
      {buttons.map((buttonFilter) => {
        return <ButtonBusiness key={buttonFilter.type} buttonFilter={buttonFilter} />
      })}
    </Flex>
  )
}
