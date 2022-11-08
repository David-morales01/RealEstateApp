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
import {AUTH_LOGIN, AUTH_LOGIN_GOOGLE} from '../../../graphql/Mutations'
import {GoogleLogin} from 'react-google-login'
// import {gapi} from 'gapi-script'

export default function Login() {
  
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

  const onSuccess = (res) => {
    authLoginGoogle({variables: {...res.profileObj, img_user_email: res.profileObj.imageUrl}})
  }

  const onFailure = (err) => {
    console.log('failed:', err)
  }
  const navigate = useNavigate()
  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: '',
  //     })
  //   }
  //   gapi.load('client:auth2', initClient)
  // })

  // Yup
  const validate = Yup.object({
    email: Yup.string().email('Invalid email address.').required('Password is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(10, 'The password must contain at least 10 characters.'),
  })

  // session token
  const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)

  const [authLogin, result] = useMutation(AUTH_LOGIN)
  const [authLoginGoogle, {data, loading, error}] = useMutation(AUTH_LOGIN_GOOGLE)

  useEffect(() => {
    if (result.data) {
      localStorage.setItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`, result.data.login)
      navigate('/')
    }
  }, [result])

  useEffect(() => {
    if (data) {
      localStorage.setItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`, data.loginGoogle)
      navigate('/')
    }
  }, [data])

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
              email: 'root@gmail.com',
              password: '1234567891',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              authLogin({variables: {...values}})
            }}>
            {({errors, touched}) => (
              <Form>
                <Text align='center' fontSize='24px' mt='4'>
                  Login
                </Text>

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
                    borderRadius='20px'
                    type='button'
                    mt='20px'></Button>
                ) : (
                  <Button
                    color='white'
                    bg={buttonColor}
                    _hover={{boxShadow: `0px 0px  10px ${shadowButton} `}}
                    _active={{}}
                    w='100%'
                    type='submit'
                    borderRadius='20px'
                    mt='20px'>
                    Sign in
                  </Button>
                )}
              </Form>
            )}
          </Formik>
          <Flex align='center' justify='center'>
            <GoogleLogin
              clientId='502945942422-skfg1csab8m4ve7nj7pq3bgl8f5ssd37.apps.googleusercontent.com'
              buttonText='Sign in with Google'
              onSuccess={onSuccess}
              onFailure={onFailure}
               cookiePolicy={'single_host_origin'}
               isSignedIn={false}
              render={(renderProps) => (
                <Button
                  _hover={{
                    boxShadow: `0px 0px  10px ${shadowButton} `,
                    background: `${buttonColor} `,
                  }}
                  _active={{}}
                  w='100%'
                  borderRadius='20px'
                  type='button'
                  onClick={renderProps.onClick}
                  mt={6}>
                  Google
                </Button>
              )}
            />
          </Flex>
        </Box>
        <Flex mt='4px' justifyContent='center' gap='4px'>
          <Text>Don't have an account? </Text>
          <Text color={colorLink}>
            <Link to='/register'> Sign Up</Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}
