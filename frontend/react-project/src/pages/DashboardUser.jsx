import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { 
    Box, 
    Card, 
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Heading,
    Image,
    Text,
    Input,
    Button,
    HStack, 
    Stack, 
    useToast,
    Center,
    Spinner,
    useDisclosure
} from '@chakra-ui/react'

import TablePinjaman from "../Components/Table/TablePinjaman";
import TableSuggest from "../Components/Table/TableSuggest";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "../utils/cookies"
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";
import { setAutomaticLogout, setTriggerUpdateProfile } from "../features/loginSlices";
import API from "../services";
import ModalProfile from "../Components/Modal/ModalProfile";
import TableChekin from "../Components/Table/TableCheckin";


const dashboardUser = () => {
    // const stateIssue = useSelector(state => state.issue)
    const stateLogin = useSelector(state => state.login)
    const [selectedProfile, setSelectedProfile] = useState({})
    const [type, setType] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [urlImage, setUrlImage] = useState('')
    const [dataUser, setDataUser] = useState({})
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const dispatch = useDispatch()
    const toast = useToast()
    
    
    const timeoutCookies = () => {
        setTimeout(() => {
            dispatch(setAutomaticLogout())
            navigate('/index')
        }, stateLogin.users.duration)
    }


    const getDataUser = async() => {
        try {
            const res = await API.getDataUser()
            console.log("res user", res.data)
            setDataUser(res.data)
        } catch(error){
            return error
        }
    }

    const getPhotoProfile = async() => {
        try {
            const res = await API.getPhotoProfile()
            console.log("res photo", res.data)
            setUrlImage(res.data)
        } catch(error) {
            console.log("error photo", error)
        }
    }


    useEffect(() => {
            const dataCookies = Cookies.certCookies()
            setData(dataCookies)
        console.log("data cookies", dataCookies)
        // timeoutCookies()
        getDataUser()
        getPhotoProfile()
    }, [])

    // useEffect(() => {

    //     if (new Date() > new Date(data.dateexpiry)) {
    //         toast ({
    //             position: "top-right",
    //             title: "Session Expired",
    //             description: "Masa berlaku kartu telah habis",
    //             status: "error",
    //             duration: 2000,
    //             isClosable: true,
    //         })
    //         navigate('/index')
    //     }

    // }, [data])

    useEffect ( () => {
        console.log("image", urlImage)

    }, [urlImage])


    useEffect(() => {
        getDataUser()
        console.log("ini jalan nggak ???")
        setTimeout(() => {
            dispatch(setTriggerUpdateProfile(false))
        }, 1000);
    },[stateLogin.triggerLogin])

    return (
        <>
            <div className="container mx-auto h-full">
                <Navbar />
                <HStack spacing={4} w='100%' align="center"  my="5">
                    <Box w='20%' h="580px" p='5px' >
                        <Card alignItems='center' w='100%' bgColor='transparent' boxShadow='transparent' h='100%'>
                            <Heading fontSize='2xl' my={3} textAlign='center'>{data.surname}</Heading>

                            {(urlImage.image) ? (
                                <Image boxSize='250px' mx="auto" src={'data:image/jpeg;base64,' + urlImage.image} alt="No Image Found" />
                            ) : (
                                <img boxSize='250px' src="https://www.kindpng.com/picc/m/80-807524_no-profile-hd-png-download.png" alt="No Profile, HD Png Download@kindpng.com"></img>
                            )}

                            <Heading fontSize='md' my={3} textAlign='center'>Masa Aktif Kartu</Heading>
                            {(new Date() > new Date(data.dateexpiry)) ? (
                                <Heading fontSize='md' my={3} color='red.500' textAlign='center'>
                                    {new Date(data.dateexpiry).toLocaleDateString("id-ID", {
                                        weekday: 'long', 
                                        year:'numeric', 
                                        month:'long', 
                                        day: 'numeric'
                                    })}
                                </Heading>
                            ) : (
                                <Heading fontSize='md' my={3} color='green.500' textAlign='center'>
                                    {new Date(data.dateexpiry).toLocaleDateString("id-ID", {
                                        weekday: 'long', 
                                        year:'numeric', 
                                        month:'long', 
                                        day: 'numeric'
                                    })}
                                </Heading>
                            )}
                            
                            <Text fontSize='sm' my={1} textAlign='center'>{dataUser.address}</Text>
                            <Text fontSize='sm' my={1} textAlign='center'>{dataUser.phone}</Text>

                            {/* <Heading fontSize='lg' my={3} textAlign='center'>Status : 
                                    {(new Date() > new Date(data.dateexpiry)) ? (
                                        <Text as={'span'} color='red.500'> Expired </Text>
                                    ) : (
                                        <Text as={'span'} color='green.500'> Active </Text>
                                    )}
                            </Heading> */}
                            <Button 
                                colorScheme='blue' 
                                mx="auto" 
                                alignItems="center" 
                                w='75%' 
                                my={2}
                                onClick= {() => {
                                    setType('PROFILE')
                                    onOpen()
                                    setSelectedProfile({address: dataUser.address, phone: dataUser.phone})
                                }}>
                                    Update Profile
                                </Button>
                        </Card>
                    </Box>
                    <Box w='100%'  h="550px"  p='5px' >
                        <Card  w='100%' alignItems='center' bgColor='transparent' boxShadow='transparent' h='100%'>
                            {/* <Heading fontSize='2xl' my={3} textAlign='center'>Self Services</Heading> */}
                            <Tabs variant='solid-rounded' colorScheme='orange'>
                                <TabList display='flex' gap={3}>
                                    <Tab>Peminjaman Buku</Tab>
                                    <Tab>Pengembalian Buku</Tab>
                                    <Tab>Ulasan Buku</Tab>
                                    <Tab>Denda Buku</Tab>
                                    <Tab>Denda Buku</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel overflowY='scroll' position='relative' height='500px' mt={4}>
                                        <TablePinjaman />
                                    </TabPanel>
                                    <TabPanel overflowY='scroll' position='relative' height='500px' mt={4}>
                                        <TableChekin />
                                    </TabPanel>
                                    <TabPanel overflowY='scroll' position='relative' height='500px' mt={4}>
                                        <TableSuggest />
                                    </TabPanel>
                                    <TabPanel>
                                    <p>four!</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Card>
                    </Box>
                </HStack>

                <ModalProfile isOpen={isOpen} onClose={onClose} type={type} data={selectedProfile}/>
            </div>
    
        </>
    )
}

export default dashboardUser;