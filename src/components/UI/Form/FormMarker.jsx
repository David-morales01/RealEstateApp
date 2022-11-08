import React, { useRef, useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapStore from '../../../store/MapStore'
import { Flex, Select, useColorModeValue, FormControl, FormLabel, Input, Button, Text, FormHelperText, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { FastField, Form, Formik } from 'formik'
import { CREATE_MARKER, EDIT_MARKER } from '../../../graphql/Mutations'
import { useMutation } from '@apollo/client'
import MiniMap from '../Map/MiniMap'
import PicturesViewer from '../PicturesViewer/PicturesViewer'
import * as Yup from 'yup'

export default function FormMarker() {

  // Store 
  const ModalCoordinateClose = MapStore((state) => state.modalCoordinateClose)
  const [imagesForm, setImagesForm] = useState([])
  const imageIndex = useRef(1)
  const editCoordinate = MapStore(state => state.editCoordinate)
  const mapBox = MapStore(state => state.map)
  const marker = MapStore(state => state.marker)
  const [disable, setDisable] = useState(false)
  const [counterImage, setCounterImage] = useState(marker.id ? marker.images.length : 0) 
  const changeListMarkers = MapStore((state) => state.changeListMarkers)
  const [formMarker, result] = useMutation(marker.id ? EDIT_MARKER : CREATE_MARKER
    , {
      update() {
        changeListMarkers(true)
      }
    }
  )
 
  // Yup
  const validate = Yup.object({
    title: Yup.string().required('Title is required.'),
    description: Yup.string().required('Description is required.'),
    bedroom: Yup.number().required('The number ofbedrooms must be greater than 0').min(0, 'The number ofbedrooms must be greater than 0'),
    bathdroom: Yup.number().required('The number of bathdroom must be greater than 0').min(0, 'The number ofbedrooms must be greater than 0'),
    price: Yup.number().required('Price must be greater than 0').min(1, 'Price must be greater than 0'),
    business_types_id: Yup.number().min(1, 'Business Type is required.').required('Business Type is required.')
  })


  const preLoad = (e) => {
    const image = e.target 
    const tempImages = []

    const files = image.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      file.index = imageIndex.current 
      imageIndex.current = imageIndex.current + 1
      tempImages.push(file) 
    }

    setCounterImage(counterImage +  files.length)
    setImagesForm([...imagesForm, ...tempImages])

  }
   
  // Theme
  const errorText = useColorModeValue('color.errorLight', 'color.errorDark')

  const  saveData = (values) => { 
    values.long = editCoordinate.lng.toString()
    values.lat = editCoordinate.lat.toString()
    values.id = parseInt(values.id) 
    values.images = imagesForm
    values.business_types_id = parseInt(values.business_types_id) 
    formMarker({ variables: { ...values } }) 
    mapBox.flyTo({
      center: editCoordinate,
      essential: true
    });

  }

  useEffect(() => {
    if (result.loading) {
      setDisable(result.loading)
    }
    if (result.error) {
      setDisable(false)
    }
    if (result.data) {
      ModalCoordinateClose()
    }
  }, [result])

  return (

    <Formik
      initialValues={{
        id: marker.id ? marker.id : '',
        title: marker.id ? marker.title : '',
        description: marker.id ? marker.description : '',
        bedroom: marker.id ? marker.bedroom : 0,
        bathdroom: marker.id ? marker.bathdroom : 0,
        price: marker.id ? marker.price : 0,
        business_types_id: marker.id ? marker.business_types_id.id : 0,
        images: []
      }}

      validationSchema={validate}
      onSubmit={values => {
        setDisable(true)
        saveData(values)
      }
      } >
      {({ errors, touched, setFieldValue, values }) => (
        <Form>
          <FormControl h='132px' isInvalid={errors.title && touched.title}>
            <FormLabel>Title</FormLabel>
            <FastField name="title">
              {({ field, meta }) => (<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off' />)}
            </FastField>
            {touched.title && errors.title ?
              <Text my='2' fontSize="14px" color={errorText}>{errors.title} </Text> :
              <FormHelperText > Enter a title</FormHelperText>
            }
          </FormControl>
          <FormControl h='132px' isInvalid={errors.description && touched.description}>
            <FormLabel>Description</FormLabel>
            <FastField name="description">
              {({ field, meta }) => (<Input errorBorderColor='crimson' variant='filled' type='text'  {...field} autoComplete='off' />)}
            </FastField>
            {touched.description && errors.description ?
              <Text my='2' fontSize="14px" color={errorText}>{errors.description} </Text> :
              <FormHelperText > Enter a description</FormHelperText>
            }
          </FormControl>
          <FormControl h='132px' isInvalid={errors.price && touched.price}>
            <FormLabel>Price</FormLabel>
            <NumberInput min={1} precision={2} errorBorderColor='crimson' variant='filled' defaultValue={values.price}
              onChange={(valueString) => {
                setFieldValue("price", parseFloat(valueString))
              }} >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {touched.price && errors.price ?
              <Text my='2' fontSize="14px" color={errorText}>{errors.price} </Text> :
              <FormHelperText > Enter a price</FormHelperText>
            }
          </FormControl>
          <FormControl h='132px' isInvalid={errors.business_types_id && touched.business_types_id}>
            <FormLabel>Type Business</FormLabel>
            <FastField name='business_types_id'>
              {({ field, meta }) => (
                <Select placeholder='Select option'  {...field} variant='filled'>
                  <option value={1}>Home</option>
                  <option value={2}>Commercial</option>
                  <option value={3}>Apartment</option>
                  <option value={3}>Vacant</option>
                </Select>
              )}
            </FastField>
            {touched.business_types_id && errors.business_types_id ?
              <Text my='2' fontSize="14px" color={errorText}>{errors.business_types_id} </Text> :
              <FormHelperText > Selec the type of business</FormHelperText>
            }
          </FormControl>
          <MiniMap />
          <Flex h='140px' justify='space-between'>
            <FormControl w='45%' isInvalid={errors.bedroom && touched.bedroom}>
              <FormLabel>Bedroom</FormLabel>
              <NumberInput variant='filled' min={0} defaultValue={values.bedroom}
                onChange={(valueString) => {
                  setFieldValue("bedroom", parseInt(valueString))
                }} >
                <NumberInputField errorBorderColor='crimson' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {touched.bedroom && errors.bedroom ?
                <Text my='2' fontSize="14px" color={errorText}>{errors.bedroom} </Text> :
                <FormHelperText > Enter the number of bedrooms</FormHelperText>
              }
            </FormControl>

            <FormControl w='45%' isInvalid={errors.bathdroom && touched.bathdroom}>
              <FormLabel>Bathdroom</FormLabel>
              <NumberInput variant='filled' min={0} defaultValue={values.bathdroom}
                onChange={(valueString) => {
                  setFieldValue("bathdroom", parseInt(valueString))
                }} >
                <NumberInputField errorBorderColor='crimson' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {touched.bathdroom && errors.bathdroom ?
                <Text my='2' fontSize="14px" color={errorText}>{errors.bathdroom} </Text> :
                <FormHelperText > Enter the number of bathrooms</FormHelperText>
              }
            </FormControl>
          </Flex>
          <PicturesViewer imagesForm={imagesForm} marker={marker} setImagesForm={setImagesForm} counterImage = {counterImage} setCounterImage= {setCounterImage}/>

          <FormControl h='120px' >
            <FormLabel>Images</FormLabel>
            <input type='file' multiple name="images"

              onChange={(e) => {
                preLoad(e)
              }} />
            <FormHelperText >Select your favorite images</FormHelperText>
          </FormControl>
          <Flex mt='20px'>
            {disable ?
              <Button
                colorScheme='blue'
                isLoading
                _hover={{}}
                _active={{}}
                type='button' mt='2px' w='80px' mr={3}>
              </Button> :

              <Button
                colorScheme='blue'
                _active={{}}
                type='submit' mt='2px' w='80px' mr={3}>
                Save
              </Button>
            }
            <Button w='80px' onClick={ModalCoordinateClose}>Cancel</Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}