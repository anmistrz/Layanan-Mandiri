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
    Textarea,
    FormErrorMessage
} from '@chakra-ui/react'

import { useFormik, ErrorMessage } from 'formik';
import { USER_VALIDATION } from "../../validation/validation";


const ModalProfile = (props) => {

    const [dataEdit, setDataEdit] = useState({})

    // const handleChangeInputProfile = (e) => {
    //     setDataEdit({...dataEdit, [e.target.id]: e.target.value})
    // }

    const formik = useFormik({
        initialValues: {
            address: props.data.address,
            phone: props.data.phone
        },

        enableReinitialize: true, // To set value from props into initialValues

        onSubmit: (values, actions) => {
            console.log("values", values)
            setTimeout(() => {
                // Schema.validationSchema.validate(values);
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
            }, 1000);
        },
        validationSchema: USER_VALIDATION,
        validateOnChange: true,
        // validateOnMount: true,
    });


    useEffect(()=> {
        console.log("data edit", dataEdit)
    }, [dataEdit])

    return (
        <>
        {props.type === "PROFILE" && (
            <Modal isCentered isOpen={props.isOpen} onClose={props.onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />

                    <form onSubmit={formik.handleSubmit}>
                        <ModalBody>
    
                                <FormLabel htmlFor="address">Address</FormLabel>
                                <Textarea 
                                    id="address" 
                                    name="address" 
                                    defaultValue={props.data.address} 
                                    onChange={formik.handleChange} 
                                />
                                <FormErrorMessage color="red">{formik.errors.address}</FormErrorMessage>

                                <FormLabel mt={2} htmlFor="phone">Phone</FormLabel>
                                {formik.errors.phone && formik.touched.phone && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertTitle mr={2}>{formik.errors.phone}</AlertTitle>
                                    </Alert>
                                )} 
                                <Input
                                    mt={2} 
                                    id="phone" 
                                    name="phone" 
                                    defaultValue={props.data.phone} 
                                    onChange={formik.handleChange} />

                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={props.onClose}>
                                Close
                            </Button>
                            <Button mr={3} colorScheme="blue" type="submit" isLoading={formik.isSubmitting}>
                                    Submit
                            </Button>
                        </ModalFooter>
                    </form>

                </ModalContent>
            </Modal> 
        )}

        </>
    )
}


export default ModalProfile;