import React, {useState, useRef, useEffect, useMemo} from "react";
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
    Textarea
} from '@chakra-ui/react'

import { useDispatch, useSelector } from "react-redux";
import { addSuggest, updateSuggest, setTriggerSuggest } from "../../features/suggestSlices";
import { MdOutlineWarningAmber } from 'react-icons/md';


const ModalSuggest = (props) => {

    const [DataInputSuggest, setDataInputSuggest] = useState({})
    const dispatch = useDispatch()
    const stateSuggest = useSelector(state => state.suggest)
    const toast = useToast({
        position: 'top-right',
        variant: 'left-accent',
        isClosable: true,
        duration: 2000
    })

    const handleInputSuggest = (e) => {
        setDataInputSuggest({
            ...DataInputSuggest,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmitSuggest = (data) => {
        try {
            dispatch(addSuggest(data))
            dispatch(setTriggerSuggest(true))
            toast({
                title: 'Suggest a Book',
                description: 'Tambah Ulasan Berhasil',
                status: 'success'
            })
            props.onClose()

        } catch (error) {
            toast({
                title: 'Suggest a Book',
                description: 'Tambah Ulasan Gagal',
                status: 'error'
            })
        }
    }

    const handleEditSuggest = (data) => {
        try {
            dispatch(updateSuggest(data))
            dispatch(setTriggerSuggest(true))
            toast({
                title: 'Edit Suggest a Book',
                description: 'Edit Ulasan Berhasil',
                status: 'success'
            })
            props.onClose()
        
        } catch (error) {
            toast({
                title: 'Edit Suggest a Book',
                description: 'Edit Ulasan Gagal',
                status: 'error'
            })
        }
    }


    const handleDeleteSuggest = (id) => {
        try {
            dispatch(deleteSuggest(id))
            dispatch(setTriggerSuggest(true))
            toast({
                title: 'Delete Suggest a Book',
                description: 'Delete Ulasan Berhasil',
                status: 'success'
            })
            props.onClose()

        } catch (error) {
            toast({
                title: 'Delete Suggest a Book',
                description: 'Delete Ulasan Gagal',
                status: 'error'
            })
        }
    }


    useEffect(() => {
        console.log("DataInputSuggest", DataInputSuggest)
    }, [DataInputSuggest])

    useEffect(() => {
        setDataInputSuggest({
            ...DataInputSuggest,
            suggestionid: props.data
        })
    }, [props.data])

    return (
        <>
            {props.type === 'SUGGEST' ? (
                <Modal isOpen={props.isOpen} onClose={props.onClose} size='xl'>'
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Usulan Buku</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id="title" mt={4} isRequired>
                                <FormLabel>Title</FormLabel>
                                <Input type="text" onChange={handleInputSuggest} />
                            </FormControl>
                            <FormControl id="author" mt={4}>
                                <FormLabel>Author</FormLabel>
                                <Input type="text" onChange={handleInputSuggest} />
                            </FormControl>
                            <FormControl id="publishercode" mt={4}>
                                <FormLabel>Publisher</FormLabel>
                                <Input type="text" onChange={handleInputSuggest} />
                            </FormControl>
                            <FormControl id="note" mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea type="text" onChange={handleInputSuggest} />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={props.onClose}>
                                Close
                            </Button>
                            <Button colorScheme="blue"
                                onClick={() => {
                                    handleSubmitSuggest(DataInputSuggest)
                                }}

                            >
                                Tambah Usulan
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                        </Modal>
            ) : 
            props.type === 'EDIT_SUGGEST' ? (
                <Modal isOpen={props.isOpen} onClose={props.onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Usulan Buku</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            { stateSuggest.loading ? (
                                <Center>
                                    <Spinner 
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="blue.500"
                                        size="xl"
                                    />
                                </Center>
                            ) : (
                                <>
                                    <FormControl id="title" mt={4} isRequired>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" id='title' 
                                        onChange={handleInputSuggest}
                                        defaultValue={stateSuggest.suggest.title} 
                                        />
                                    </FormControl>
                                    <FormControl id="author" mt={4}>
                                        <FormLabel>Author</FormLabel>
                                        <Input type="text" onChange={handleInputSuggest}  defaultValue={stateSuggest.suggest.author} />
                                    </FormControl>
                                    <FormControl id="publishercode" mt={4}>
                                        <FormLabel>Publisher</FormLabel>
                                        <Input type="text" onChange={handleInputSuggest} defaultValue = {stateSuggest.suggest.publishercode} />
                                    </FormControl>
                                    <FormControl id="note" mt={4}>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea type="text" onChange={handleInputSuggest} defaultValue = {stateSuggest.suggest.note} />
                                    </FormControl>
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={props.onClose}>
                                Close
                            </Button>
                            <Button colorScheme="blue"
                                onClick={() => {
                                    handleEditSuggest(DataInputSuggest)

                                    console.log("DataInput ke Edit Suggest", DataInputSuggest)
                                }}
                            >
                                Edit Usulan Buku
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                        </Modal>
            ) : (
            // props.type === 'DELETE_SUGGEST' && (
            //     <Modal isCentered isOpen={props.isOpen} onClose={props.onClose} size='xl'>
            //     <ModalOverlay />
            //     <ModalContent>
            //         <ModalHeader>Delete Usulan Buku</ModalHeader>
            //         <ModalCloseButton />
            //         <ModalBody>
            //             <Center flexDirection='column' gap={4}>

            //                 <MdOutlineWarningAmber size={50} color='red' />
            //                 <Text fontSize='md' fontWeight='bold'>Apakah anda yakin ingin menghapus usulan buku ini ?</Text>

            //             </Center>
            //         </ModalBody>
            //         <ModalFooter>
            //             <Button colorScheme="red" mr={3} onClick={props.onClose}>
            //                 Close
            //             </Button>
            //             <Button colorScheme="blue"
            //                 onClick={handleDeleteSuggest(DataInputSuggest.suggestionid)}
            //             >
            //                 Hapus Usulan
            //             </Button>
            //         </ModalFooter>
            //         </ModalContent>
            //         </Modal>
            null
            )}
        </>

    )
}

export default ModalSuggest;