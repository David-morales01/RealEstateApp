import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import FormMarker from '../Form/FormMarker'
import MapStore from '../../../store/MapStore'
export default function ModalForm() {
  // Store
  const ModalCoordinateClose = MapStore((state) => state.modalCoordinateClose)
  const marker = MapStore((state) => state.marker)
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      isOpen={true}
      scrollBehavior='inside'
      onClose={ModalCoordinateClose}>
      <ModalOverlay bg='blackAlpha.800' />
      <ModalContent>
        <ModalHeader fontSize='26px' align='center'>
          {marker.id ? 'Edit ' : 'Create new '} marker
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody px={10}>
          <FormMarker />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
