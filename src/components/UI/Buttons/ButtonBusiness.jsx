import React, { useState } from 'react'
import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react'
import MapStore from '../../../store/MapStore'
import { useSearchParams } from 'react-router-dom'

export default function FilterButtonBusiness({ buttonFilter }) {

    //Theme
    const iconColor = useColorModeValue('color.iconLight', 'color.iconDark')
    const filterMap = MapStore((state) => state.filterMap)
    const filterValues = MapStore(state => state.filterValues)
    const [business, setBusiness] = useState(filterValues.businessTypesId)
    const [params, setParams] = useSearchParams()

    function filter(value, businessTypesId, filterMap, setBusiness) {
        let temp = businessTypesId
        if (temp.includes(value)) {
            temp = temp.filter((t) => t !== value)
        } else { temp = [...temp, value] }

        filterMap('businessTypesId', temp)

        const temp2 = temp.join()
        params.set('businessTypesId', temp2)
        setParams(params)
        setBusiness(temp)
    }

    return (
        <Button className={business.includes(buttonFilter.type) ? 'active button' : 'button'} w='48%' h='70px' aria-label='Search database' color={iconColor} onClick={() => filter(buttonFilter.type, filterValues.businessTypesId, filterMap, setBusiness)}>
            <Box as={buttonFilter.icon} fill={iconColor} fontSize={20} sx={{ '.button:hover &': { display: 'none' } }}></Box>
            <Text display='none' sx={{ '.button:hover &': { display: 'flex' } }}>{buttonFilter.text}</Text>
        </Button>

    )

}

