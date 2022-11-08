import React, { useEffect, useState } from 'react'
import {
  Text,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { FastField, ErrorMessage, Form, Formik } from 'formik'
import AuthStore from '../../../store/AuthStore'
import UIStore from '../../../store/UIStore'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { EDIT_USER } from '../../../graphql/Mutations'

export default function Perfil() {
  // Store
  const user = AuthStore((state) => state.user)
  const [disable, setDisable] = useState(false)
  const editPerfil = AuthStore((state) => state.editPerfil)
  const changeImageStore = UIStore((state) => state.changeImage)
  const [formPerfil, result] = useMutation(EDIT_USER
    , {
      update(cache, { data: { editUser } }) {
        editPerfil(editUser)
      }
    }
  )
  function saveValues(values, formPerfil) {
    values['id'] = parseInt(values['id'])
    console.log(values)
    formPerfil({ variables: { ...values } })

  }
  useEffect(() => {
    if (result.loading) {
      setDisable(result.loading)
    }

    if (result.data) {
      setDisable(false)
    }
    if (result.error) {
      setDisable(false)
    }
  }, [result])


  // Theme
  const errorText = useColorModeValue('color.errorLight', 'color.errorDark')
  const buttonColor = useColorModeValue('bg.buttonLight', 'bg.buttonDark')
  const shadowButton = useColorModeValue('#A0A0A0', '#0066cc')

  // Yup
  const validate = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().email('Invalid email address.').required('Password is required.'),
    password: Yup.string().min(10, 'The password must contain at least 10 characters.'),
  })

  function changeImage(e, changeImageStore) {
    // const reader = new  FileReader()
    // reader.readAsDataURL(file)
    // reader.onload=()=>{
    //     changeImageStore(reader.result)
    // }
    const image = e.target
    if (!image.files.length) return
    const file = image.files[0]
    const url = URL.createObjectURL(file)
    changeImageStore(url)

  }

  return (
    <Formik
      initialValues={{
        id: user.id,
        name: user.name,
        email: user.email,
        password: '',
        img_user: [],
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        saveValues(values, formPerfil)
      }}>
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <Text align='center' fontSize='24px'>
            My perfil
          </Text>

          <FormControl h='80px' mb='8' isInvalid={errors.name && touched.name}>
            <FormLabel>Name</FormLabel>
            <FastField name='name'>
              {({ field, meta }) => (
                <Input
                  errorBorderColor='crimson'
                  variant='filled'
                  type='text'
                  {...field}
                  autoComplete='off'
                />
              )}
            </FastField>
            <ErrorMessage
              name='name'
              component={() => (
                <Text my='2' fontSize='14px' color={errorText}>
                  {errors.name}{' '}
                </Text>
              )}
            />
          </FormControl>

          <FormControl h='80px' my='8' isInvalid={errors.email && touched.email}>
            <FormLabel>Email address</FormLabel>
            <FastField name='email'>
              {({ field, meta }) => (
                <Input
                  errorBorderColor='crimson'
                  variant='filled'
                  type='email'
                  {...field}
                  autoComplete='off'
                />
              )}
            </FastField>
            <ErrorMessage
              name='email'
              component={() => (
                <Text my='2' fontSize='14px' color={errorText}>
                  {errors.email}{' '}
                </Text>
              )}
            />
          </FormControl>

          <FormControl h='80px' my='8' isInvalid={errors.password && touched.password}>
            <FormLabel>Password</FormLabel>
            <FastField name='password'>
              {({ field, meta }) => (
                <Input
                  errorBorderColor='crimson'
                  variant='filled'
                  type='password'
                  {...field}
                  autoComplete='off'
                />
              )}
            </FastField>
            <ErrorMessage
              name='password'
              component={() => (
                <Text my='2' fontSize='14px' color={errorText}>
                  {errors.password}{' '}
                </Text>
              )}
            />
          </FormControl>

          <FormControl h='120px' isInvalid={errors.img_user && touched.img_user}>
            <FormLabel>Image</FormLabel>
            <input
              type='file'
              name='img_user'
              onChange={(e) => {
                setFieldValue('img_user', e.currentTarget.files[0])
                changeImage(e, changeImageStore)
              }}
            />

            <FormHelperText>Select your favorite image</FormHelperText>
          </FormControl>

          {disable ? (
            <Button
              color='white'
              bg={buttonColor}
              isLoading
              _hover={{}}
              _active={{}}
              w='100%'
              type='button'
              mt='2px'></Button>
          ) : (
            <Button
              color='white'
              bg={buttonColor}
              _hover={{ boxShadow: `0px 0px  10px ${shadowButton} ` }}
              _active={{}}
              w='100%'
              type='submit'
              mt='2px'>
              Save
            </Button>
          )}
        </Form>
      )}
    </Formik>
  )
}
