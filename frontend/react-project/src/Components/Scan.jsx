import { useEffect, useState } from "react";
import { Center, Box, Text, VStack, Input, Button, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/loginSlices";
import { useNavigate } from "react-router-dom";
import API from "../services";

const Scan = () => {
    const [idcard, setIdcard] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast({
        position: 'top-right',
        duration: 2000,
        variant: 'left-accent',
    })

    const handleInput = (e) => {
        setIdcard({...idcard, [e.target.name]: e.target.value})
        console.log("setIdCard", idcard)
    }

    const handleSubmit = async() => {
        try {
            const res = await API.loginUser(idcard)
            console.log("res", res.data)
            if(res.status) {
                dispatch(loginUser({type: "LOGIN" ,payload: idcard}))
                setTimeout(() => {
                    navigate('/dashboard/user')
               }, 500)
                toast({
                    title: 'Login Success',
                    status: 'success',
                    isClosable: true,
                })
            }
        } catch(error) {
            toast({
                title: 'Login Failed',
                status: 'error',
                isClosable: true,
            })
            console.log("error", error)
        }
      };
    
    useEffect (() => {
        console.log("idcard", idcard)
    },[idcard])

    return (
        <>
            <VStack spacing={6} align="center" my="20">
                <h1 className="text-4xl font-bold">Welcome to</h1>
                <h1 className="text-4xl font-bold text-blue-500">UMS Digital Library Self Service Center</h1>
                <Text fontSize='md' text='center'>Scan Your ID Card To Login</Text>

                <Input placeholder="ID Card Number" name="cardnumber" w="2xl" h='50px' bgColor='white' onChange={handleInput} />
                <Button onClick={handleSubmit} colorScheme="blue" w="sm"> Login </Button>
            </VStack>
        </>
    )
}

export default Scan