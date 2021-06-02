import React, { useState } from 'react'
import { Input, FormControl, InputGroup, InputLeftElement, chakra, InputRightElement, Button, Center, Image, Box, Grid } from '@chakra-ui/react'
import { FaUserAlt, FaLock } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { SiFacebook } from "react-icons/si"
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginEmailPassword, startGoogle } from '../../actions/authAction'

const DivLogin = styled.div`
    padding: 40px;
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    @media (min-width: 481px) {
        margin: 50px;
    }
`

const ImageMediaLogin = styled(Image)`
    @media (min-width: 481px) {
        width: 50%;
    }
`

const Login = () => {

    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);
    const CFcGoogle = chakra(FcGoogle);
    const CSiFacebook = chakra(SiFacebook);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const dispatch = useDispatch()
    const loading = useSelector(state => state.error)

    const [formValues, handleInputChange] = useForm({
        user: '',
        password: ''
    })

    const { user, password } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startLoginEmailPassword(user, password))
        console.log('Se han enviados los datos');
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogle())
    }

    return (
        <Center>
            <DivLogin>
                <ImageMediaLogin src="https://i.ibb.co/VtFcZgM/LOGASO-NO-JODA-2.png" alt="LOGASO-NO-JODA-2" border="0" />
                <form onSubmit={handleSubmit}>
                    <FormControl mt={10}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color="gray.300" />}
                            />
                            <Input type="email" placeholder="Email address" name='user' value={user} onChange={handleInputChange} />
                        </InputGroup>
                    </FormControl>
                    <FormControl mt={10}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                children={<CFaLock color="gray.300" />}
                            />
                            <Input type={showPassword ? "text" : "password"} placeholder="Password" name='password' value={password} onChange={handleInputChange} />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button type='submit' width='100%' mt={10} background='#49519a' color='white' _hover={{ color: 'white' }} disable={loading}>Login</Button>
                </form>
                <Box mt={3} mb={3}>
                    New to us?{" "}
                    <Link to='/auth/registro'>
                        Sign Up
                    </Link>
                </Box>
                <Grid templateColumns="repeat(3, 1fr)" gap={2} width='100%' mt='10px'>
                    <Box w="100%" h="10" mt='13px'><hr color='black' /></Box>
                    <Box w="100%" h="10" textAlign='center'>or</Box>
                    <Box w="100%" h="10" mt='13px'><hr color='black' /></Box>
                </Grid>
                <div>
                    <Button width='100%' mt={5} background='red.500' color='white' _hover={{ bg: "#f95f62" }} onClick={handleGoogleLogin}><CFcGoogle mr={2} />Sign in with google</Button>
                    <Button width='100%' mt={3} background='#3b5a9a' color='white' _hover={{ bg: "#4b6bad" }}><CSiFacebook mr={2} />Sign in with google</Button>
                </div>
                <div>
                </div>
            </DivLogin>
        </Center>
    )
}

export default Login
