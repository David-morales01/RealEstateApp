import React, {useEffect} from 'react'
import {Button, Flex} from '@chakra-ui/react'
import AuthStore from '../../../store/AuthStore'
import MapStore from '../../../store/MapStore'
import {useMutation} from '@apollo/client'
import {BUY_MARKER} from '../../../graphql/Mutations' 
import { useNavigate } from 'react-router-dom'

export default function ButtonPopup({marker}) {
  // Store
  const [changeStatusMarker, result] = useMutation(BUY_MARKER)
  const modalEdit = MapStore((state) => state.modalEdit) 
  const user = AuthStore((state) => state.user) 
  const navigate = useNavigate()
  const login = () => {
    navigate('/login')
  }
  // useEffect(() => {
  //   if (result.data) {
  //     console.log(result.data)
  //   }
  // }, [result])

  return (
    <Flex
      align='end'
      mt='4px'
      sx={{
        button: {
          color: 'white',
          h: '30px',
          w: '100px',
        },
      }}>
      {
      
      user.id ? (
      marker.user_id && marker.user_id.id == user.id ? (
        <Button
          bg='#001AFF'
          _hover={{}}
          _active={{}}
          onClick={() => {
            modalEdit([marker.long, marker.lat],marker)
          }}>
          Edit
        </Button>
      ) : marker.status ? (
        <Button
          bg='green'
          _hover={{}}
          _active={{}}
          onClick={() => {
           user.id && buyMarker(marker, changeStatusMarker,user.id)
          }}>
          Buy
        </Button>
      ) :  marker.owner_id &&  (marker.owner_id.id == user.id ? (
        <Button
          bg='#001AFF'
          _hover={{}}
          _active={{}}
          onClick={() => {
            buyMarker(marker, changeStatusMarker,user.id)
          }}>
          Cancel
        </Button>
      ) : (
        <Button bg='#FF3333' _hover={{}} _active={{}}>
          Occupied
        </Button>
      ))) : <Button
      bg='#001affb0'
      _hover={{}}
      _active={{}}
      onClick={() => {
        login()
      }}>
      Login
    </Button> }
    </Flex>
  ) 

  function buyMarker(marker, changeStatusMarker,user) {
    changeStatusMarker({variables: {id: marker.id, status: !marker.status,owner_id:user}})
  }
}
