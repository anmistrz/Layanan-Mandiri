import React, {useState, useRef} from "react";
import Navbar from "../Components/Navbar";
import Scan from "../Components/Scan";
import { 
    Box, 
    Text, 
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const index = () => {
    const state = useSelector(state => state.login)

    return (
        <>
            <div className="container mx-auto h-screen">
                <Navbar />
                <Scan />
                {/* <Text fontSize='sm' textAlign='center'>{state.users.userid}</Text> */}
                <Box w='100%'  p='5px' mt="200px" >
                    <Text fontSize='sm' textAlign='center'>© All rights reserved by UMS Library - 2022™</Text>
                </Box>
            </div>
        </>
    )
}

export default index