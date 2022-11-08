import react from 'react'
import {Box,Img, Button } from '@chakra-ui/react' 

export default function ({image, deleteImage }) {

    const  url = URL.createObjectURL(image)
    
    return (
        <Box position='relative' h='345px' minW='345px' key={image.index}>
            <Button position='absolute' insetInlineStart='40%' insetBlockStart='40%' bg='red' opacity='0.6' _active={{ opacity: '0.8' }} _hover={{ opacity: '0.4' }} onClick={() => deleteImage(image.index)}>Delete</Button>
            <Img
                objectFit='cover'
                h='345px' minW='345px'
                src={url}
            />
        </Box>
    )
} 