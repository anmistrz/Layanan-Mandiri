import { Center, Box, Text, VStack, Input, Button, useToast, Divider  } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../services";

const FineUser = () => {
    const [ListMyFines, setListMyFines] = useState([])
    const [totalFines , setTotalFines] = useState([])
    const states = useSelector(state => state.login)
    
    const getListMyFines = async() => {
        try {
            const res = await API.listMyFines()
            if(res){
                setListMyFines(res.data)
                console.log("listMyFines", ListMyFines)
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    const getTotalFines = async() => {
        try {
            const res = await API.totalMyFines()
            if(res){
                setTotalFines(res.data[0])
                console.log("totalFines", totalFines)
            }
            
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect (() => {
        getListMyFines(),
        getTotalFines()
    },[states.trigger])

    return ( 
        <div className="bg-white shadow-md rounded w-full h-full p-4">
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-3">
                <h2 className="text-xl font-semibold leading-tight">Denda Saya</h2>
                    <Box overflowY="auto" overflowX="hidden" height='280px' mt='20px'>
                        {ListMyFines.map((item, index) => {
                            return (
                                <div key={index} className="flex sm:flex-row flex-col justify-content-between py-2">
                                    <Box flexDirection='column' w='85%' h='100%'>
                                        <Text fontSize='lg' fontWeight='bold' color="blue">{item.title}</Text>
                                        <Text fontSize='md' fontWeight='light' color="gray">{item.publishercode}</Text>
                                    </Box>
                                    <Box flexDirection='column' alignItems='center' pt='15px'>
                                        <Text fontSize='lg' fontWeight='semibold' textAlign='center' color='red.300'>
                                            Rp. {item.amountoutstanding}
                                        </Text>
                                    </Box>
                                </div>
                            )
                        })}
                    </Box>
                </div>
            </div>
            <Divider height='2px' bg='gray.300' />
            <Box w='100%' h='100px' mt='5px' bg='white' borderRadius='md' boxShadow='xl' px='10px'>
                        <Box  display='flex' justifyContent='space-between' alignItems='center' px='10px'>
                            <Text fontSize='xl' fontWeight='semibold'>Total Denda</Text>
                            <Text fontSize='2xl' fontWeight='semibold' color='red.500'>Rp.{totalFines.Outstanding}</Text>
                        </Box>
                        <Box display='flex' justifyContent='space-between' alignItems='center' px='20px'>
                            <Button colorScheme='blue' w='50%' mx='auto' my='10px'>Bayar Denda</Button> 
                        </Box>   
            </Box>

        </div>
     )
}


export default FineUser;