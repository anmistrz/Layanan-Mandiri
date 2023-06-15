import { 
    Center, 
    Flex, 
    Button, 
    Image, 
    Spacer,
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    ModalCloseButton ,
    Input, 
    useDisclosure,
    FormControl, 
    useToast,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Text,
    Box,
    FormLabel,
    Toast,
    Spinner,
    Textarea,
    FormErrorMessage
} from '@chakra-ui/react'

import { useDispatch } from 'react-redux'


const ModalPrint = (props) => {
    
        const dispatch = useDispatch()
        const toast = useToast ({
            position: 'top-right',
            duration: 2000,
            variant: 'left-accent',
        })


        return (
            <>
                <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl" >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Cetak Bukti Peminjaman</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Peminjaman Berhasil</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
}

export default ModalPrint;
