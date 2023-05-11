import React, {useEffect, useState} from "react";
import { 
    Box, 
    Card, 
    Container, 
    Heading,
    FormControl,
    FormErrorMessage,
    Text,
    FormHelperText,
    FormLabel,
    Input,
    Button,
    useToast  
} from '@chakra-ui/react'

import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loginIndex } from "../features/loginSlices";
import { useNavigate } from "react-router-dom";
import API from "../services/index"


const login = () => {
    
    const [indexLogin, setIndexLogin] = useState({})
    const dispatch = useDispatch()
    const stateRenew = useSelector(state => state.renew)
    const navigate = useNavigate()
    const toast = useToast({
        position: 'top-right',
        duration: 2000,
        variant: 'left-accent',
    })

    const handleInput = (e) => {
        setIndexLogin({...indexLogin, [e.target.name]: e.target.value})
        console.log("setIndexLogin", indexLogin)
    }

    const handleSubmitLogin = async(e) => {
        e.preventDefault()
        // console.log(indexLogin)
        try {
            e.preventDefault()
            const res = await API.login(indexLogin)
            console.log("res", res.data)
            if(res.status) {
                dispatch(loginIndex({type: "LOGIN" ,payload: indexLogin}))
                navigate('/index')
                toast({
                    title: 'Login Success',
                    status: 'success',
                    isClosable: true,
                })
            } 
        } catch (error) {
            toast({
                title: 'Login Failed',
                status: 'error',
                isClosable: true,
            })
            console.log("error", error)
        }
    }

    useEffect(() => {
        console.log("indexLogin", indexLogin)
    }, [indexLogin])

    return (
        <div className="h-screen">
            <Container maxW='container.xl' >
                <Navbar />
                <Box w='100%' h='80vh' p='50px' >
                    <Card alignItems='center' w='50%' h='100%' margin='0 auto'>
                        <Heading as='h3' size='lg' textAlign='center' pt='20px' mb={1} >
                            Welcome Back
                        </Heading>
                        <Heading as='h6' size='md' textAlign='center' p='5px'mb={5} color="blue.500" >
                            UMS Digital Library
                        </Heading>
                        <Box p={2} display='grid' w='90%' gap={5}>
                            <FormControl variant="floating" id="first-name" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input placeholder=" " type="text" name="userid" onChange={handleInput} bgColor='white' />
                            </FormControl>
                            <FormControl variant="floating" id="first-name" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input placeholder=" "  type="password" name="password" onChange={handleInput} bgColor='white'/>
                            </FormControl>
                            <Button colorScheme='blue' type="submit" mt={2} onClick={handleSubmitLogin}> Login </Button>
                        </Box>
                    </Card>
                </Box>
            </Container>
            <Box w='100%' bg='white' p='5px' mt="30px" >
                <Text fontSize='sm' textAlign='center'>© All rights reserved by UMS Library - 2022™</Text>
            </Box>
        </div>
    )
}

export default login
