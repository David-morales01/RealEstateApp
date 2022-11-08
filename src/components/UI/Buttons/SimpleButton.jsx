import React from 'react'
import { Button } from '@chakra-ui/react'

export default function SimpleButton({ text }) {

    return (
        <Button _hover={{}} _active={{}} color='white'>
            {text}
        </Button>
    )
}