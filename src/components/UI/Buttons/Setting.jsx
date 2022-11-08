import React from 'react'
import {Button} from '@chakra-ui/react'
import {IconSetting} from '../Icons/Icons'

export default function Setting() {
    return(
        <Button _hover={{}} _active={{}} bg='#001aff' align='center' justify='center' position='absolute' insetInlineEnd='50px' borderRadius='40px' insetBlockEnd='50px' w='60px' h='60px'>
            <IconSetting fill='white' fontSize='30px'/>
        </Button>
    ) 

}
