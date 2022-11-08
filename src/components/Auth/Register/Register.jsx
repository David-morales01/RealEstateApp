import React, {useEffect} from 'react'
import {
  Box,
  Checkbox,
  Flex,
  Text,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import {FastField, Form, Formik} from 'formik'
import {useNavigate, Link, Navigate} from 'react-router-dom'
import {ColorModeSwitcher} from '../../UI/ColorModeSwitcher/ColorModeSwitcher'
import ErrorMessage from '../../UI/Message/ErrorMessage'
import * as Yup from 'yup'
import {useMutation} from '@apollo/client'
import {AUTH_REGISTER} from '../../../graphql/Mutations'

export default function Register() {
  // theme colors
  const bgContainer = useColorModeValue('bg.containerLight', 'bg.containerDark')
  const bgBody = useColorModeValue('#fef9c3,#fff 50%', '#854d0e,#1f2937,#111827 100%')
  const errorText = useColorModeValue('color.errorLight', 'color.errorDark')
  const colorLink = useColorModeValue('color.linkLight', 'color.linkDark')
  const buttonColor = useColorModeValue('bg.buttonLight', 'bg.buttonDark')
  const borderColor = useColorModeValue('color.borderLight', 'color.borderDark')
  const shadowButton = useColorModeValue('#A0A0A0', '#0066cc')
  const bgborder = useColorModeValue(
    '#f9cc1c,#eddc98,transparent 100%',
    '#facc14,#bb9f29,transparent 100%'
  )

  // navigate :)
  const navigate = useNavigate()

  // Yup
  const validate = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().email('Invalid email address.').required('Password is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(10, 'The password must contain at least 10 characters.'),
  })

  // session token
  const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)

  const [authRegister, result] = useMutation(AUTH_REGISTER)
  useEffect(() => {
    if (result.data) {
      localStorage.setItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`, result.data.register)
      navigate('/')
    }
  }, [result])

  if (accessToken) {
    return (
      <>
        <Navigate to='/' />
      </>
    )
  }

  return (
    <Flex
      position='relative'
      minH='630px'
      minW='360'
      w='100vw'
      h='100vh'
      justifyContent='center'
      alignItems='center'
      backgroundImage={`radial-gradient(circle at top , ${bgBody})`}
      backgroundRepeat='no-repeat'
      fontSize='xl'>
      {result.error && <ErrorMessage error={`${result.error}`} />}
      <ColorModeSwitcher position='absolute' insetInlineEnd='0px' insetBlockStart='0px' />
      <Box w='90%' maxW='400px'>
        <Box
          position='relative'
          borderColor={borderColor}
          borderWidth='1px'
          backgroundColor={bgContainer}
          px='30px'
          pt='4'
          pb='8'
          w='100%'
          borderRadius='20px'
          _before={{
            position: 'absolute',
            content: '""',
            width: '80%',
            height: '1px',
            backgroundImage: `radial-gradient(circle at top , ${bgborder})`,
            insetBlock: '-1px',
            insetInline: '10%',
          }}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              authRegister({variables: {...values}})
            }}>
            {({errors, touched}) => (
              <Form>
                <Text align='center' fontSize='24px' mt='4'>
                  Register
                </Text>
                <FormControl h='20' mb='8' isInvalid={errors.name && touched.name}>
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
                      {errors.name}{' '}
                    </Text>
                  ) : (
                    ''
                  )}
                </FormControl>

                <FormControl h='20' my='8' isInvalid={errors.email && touched.email}>
                  <FormLabel>Email address</FormLabel>
                  <FastField name='email'>
                    {({field, meta}) => (
                      <Input
                        errorBorderColor='crimson'
                        variant='filled'
                        type='email'
                        {...field}
                        autoComplete='off'
                      />
                    )}
                  </FastField>
                  {touched.email && errors.email ? (
                    <Text my='2' fontSize='14px' color={errorText}>
                      {errors.email}{' '}
                    </Text>
                  ) : (
                    <FormHelperText> We'll never share your email</FormHelperText>
                  )}
                </FormControl>
                <FormControl h='20' my='8' isInvalid={errors.password && touched.password}>
                  <FormLabel>Password</FormLabel>
                  <FastField name='password'>
                    {({field, meta}) => (
                      <Input
                        errorBorderColor='crimson'
                        variant='filled'
                        type='password'
                        {...field}
                        autoComplete='off'
                      />
                    )}
                  </FastField>
                  {touched.password && errors.password ? (
                    <Text my='2' fontSize='14px' color={errorText}>
                      {errors.password}{' '}
                    </Text>
                  ) : (
                    ''
                  )}
                </FormControl>

                <FormControl>
                  <Checkbox name='remember'>Remember me</Checkbox>
                </FormControl>
                {result.loading ? (
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
                    _hover={{boxShadow: `0px 0px  10px ${shadowButton} `}}
                    _active={{}}
                    w='100%'
                    type='submit'
                    mt='2px'>
                    Register
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Box>
        <Flex mt='4px' mb='10px' justifyContent='center' gap='4px'>
          <Text>Already have an account? </Text>
          <Text color={colorLink}> 
            <Link to='/login'> Log In</Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}
