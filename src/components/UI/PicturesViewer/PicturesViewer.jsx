import react, { useEffect, useState, useRef } from 'react'
import { Flex, Box,Img, Button } from '@chakra-ui/react'
import ListImagesBd from './ListImagesBd'
import ImagePreload from './ImagePreload'
import { motion } from 'framer-motion'
import { IconPreview,IconNext } from '../Icons/Icons'

export default function PicturesViewer ({ imagesForm, marker, setImagesForm, setCounterImage, counterImage }) {
    
    const [left, setLeft] = useState(0)

    useEffect(() => {
        if (counterImage != 0 && left + counterImage == 0) {
            setLeft(left + 1)
        }
    }, [counterImage])

    const deleteImage = (index) =>{
        setImagesForm(imagesForm.filter((img)=> img.index != index))
        setCounterImage(counterImage -1)
    }
   
    
    return (
        <Flex position='relative' w='345px' overflow='hidden'>
            <motion.div
                style=
                {{ 
                    display: 'flex'
                }}
                animate={{
                    x: left * 345
                }}
                transition={{
                    x: { duration: 2 },
                    default: { ease: "easeInOut" }
                }}>
                {
                    marker.id && <ListImagesBd imagesMarker={marker.images} counterImage={counterImage} setCounterImage={setCounterImage} />
                }
                {
                    imagesForm.map((image) => { 
                        return (
                            <ImagePreload key={image.index} image={image} deleteImage={deleteImage} />
                        )
                    })
                }
            </motion.div>

           
            {
                left != 0 && <Button colorScheme='gray' position='absolute' w='60px' insetInlineStart='10px' insetBlockStart='50%' onClick={() => { setLeft(left + 1) }}> <IconPreview fill='black' /></Button>
            }
            {
                left + counterImage != 1 && <Button colorScheme='gray' position='absolute' w='60px' insetInlineEnd='10px' insetBlockStart='50%' onClick={() => { setLeft(left - 1) }}><IconNext fill='black'  /></Button>
            }
        </Flex>
    )
} 