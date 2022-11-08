import React, {useEffect, useState} from 'react'
import {
  Flex,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react'
import {FastField, Form, Formik} from 'formik'
import {CREATE_BusinessType, EDIT_BusinessType} from '../../../graphql/Mutations'
import {useMutation} from '@apollo/client'
import * as Yup from 'yup'

export default function FormBusinessType() {
  // Store
  const ModalCoordinateClose = MapStore((state) => state.modalCoordinateClose)
  const [disable, setDisable] = useState(false)
  const [formBusinessType, result] = useMutation(
    businessType.id ? EDIT_BusinessType : CREATE_BusinessType
  )

  // Yup
  const validate = Yup.object({
    name: Yup.string().required('Name is required.'),
  })

  // Theme
  const errorText = useColorModeValue('color.errorLight', 'color.errorDark')

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
        name: businessType.name ? businessType.id : '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        setDisable(true)
        formBusinessType({variables: {...values}})
      }}>
      {({errors, touched}) => (
        <Form>
          <FormControl h='132px' isInvalid={errors.name && touched.name}>
            <FormLabel>Name</FormLabel>
            <FastField name='name'>
              {({field, meta}) => (
                <Input
                  errorBorderColor='crimson'
                  variant='filled'
                  type='text'
                  {...field}
                  autoComplete='off'
                />
              )}
            </FastField>
            {touched.name && errors.name ? (
              <Text my='2' fontSize='14px' color={errorText}>
                {errors.name}
              </Text>
            ) : (
              <FormHelperText> Enter a Name</FormHelperText>
            )}
          </FormControl>
          <Flex mt='20px'>
            {disable ? (
              <Button
                colorScheme='blue'
                isLoading
                _hover={{}}
                _active={{}}
                type='button'
                mt='2px'
                w='80px'
                mr={3}></Button>
            ) : (
              <Button colorScheme='blue' _active={{}} type='submit' mt='2px' w='80px' mr={3}>
                Save
              </Button>
            )}
            <Button w='80px' onClick={ModalCoordinateClose}>
              Cancel
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
