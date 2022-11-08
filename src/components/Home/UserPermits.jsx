import React, {useEffect} from 'react'
import AuthStore from '../../store/AuthStore'
import {useNavigate, Navigate} from 'react-router-dom'
import UIStore from '../../store/UIStore'
import Header from '../UI/Header/Header'
import ItemUser from '../UI/ItemUser/ItemUser'
import {Flex} from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {useLazyQuery} from '@apollo/client'
import {GET_USERS} from '../../graphql/Query'
import Spinner from '../UI/Spinner/Spinner'

export default function UserPermits() {
  // Store
  const user = AuthStore((state) => state.user)
  const ChangeRoute = UIStore((state) => state.ChangeRoute)
  const navigate = useNavigate()
  const [getUsers, {loading, data}] = useLazyQuery(GET_USERS)

  useEffect(() => {
    ChangeRoute('perfil')
    if (user.rol == 'superAdmin') {
      getUsers()
    } else {
      navigate('/')
    }
  }, [user])

  if (loading) {
    return (
      <Flex align='center' justify='center' w='100vw' h='100vh'>
        <Spinner />
      </Flex>
    )
  }

  return (
    <Flex w='100vw' minH='100vh' minW='360px' flexDirection='column'>
      <Header />
      <Flex mt='60px' w='100%'>
        {data && (
          <TableContainer mx='30px' w='100%'>
            <Table variant='striped' colorScheme='teal'>
              <TableCaption>All registered users</TableCaption>
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Email</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.users.map((item) => {
                  return <ItemUser key={item.id} item={item} />
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Flex>
    </Flex>
  )
}
