import React, { useEffect, useState } from 'react'
import { Img, Box, Button } from '@chakra-ui/react'
import { DELETE_IMG } from '../../../graphql/Mutations'
import { useMutation } from '@apollo/client'

export default function Images({ imagesMarker, setCounterImage, counterImage }) {

    const [deleteImage, { data, loading, error }] = useMutation(DELETE_IMG)
    const [images, setImages] = useState([...imagesMarker])

    useEffect(() => {
        if (data) {
            setImages(images.filter((i) => i.id != data.deleteImage.id))
            setCounterImage(counterImage - 1)
        }
    }, [data]) 

    return (

        <>
            {images.map((item) => {
                return (
                    <Box position='relative' h='345px' minW='345px' key={item.id}>
                        <Button position='absolute' insetInlineStart='40%' insetBlockStart='40%' bg='red' opacity='0.6' _active={{ opacity: '0.8' }} _hover={{ opacity: '0.4' }} onClick={() => deleteImage({ variables: { id: item.id } })}>Delete</Button>
                        <Img
                            objectFit='cover'
                            h='345px' minW='345px'
                            src={`${import.meta.env.VITE_REACT_APP_ROUTE_STORAGE}/${item.src_img}`}
                        />
                    </Box>
                )
            })}
        </>

    )
}