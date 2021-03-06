import React, { useState } from 'react'
import { Input, FormControl, InputGroup, InputLeftElement, InputRightElement, Button, Image, chakra, Box, Alert, AlertIcon, Container } from '@chakra-ui/react'
import { FaUserAlt, FaLock } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { AiFillTags } from "react-icons/ai"
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { setError, removeError } from '../../actions/uiAction'
import { startRegisterUser } from '../../actions/authAction'

const ContainerRegistro = styled(Container)`
    align-items: center;
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
`

const ImageMediaRegistro = styled(Image)`
    width: 100%; 
    @media (min-width: 481px) {
        width: 65%;
    }
`

const Register = () => {

    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);
    const CMdEmail = chakra(MdEmail);
    const CAiFillTags = chakra(AiFillTags);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const dispatch = useDispatch()

    const { msjError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: '',
        lastName: '',
        email: '',
        password: '',
    })

    const { name, lastName, email, password } = formValues

    const formValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Nombre requerido'))
            return false
        } else if (lastName.trim().length === 0) {
            dispatch(setError('Apellido requerido'))
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email requerido'))
            return false
        } else if (!validator.isStrongPassword(password)) {
            dispatch(setError('Password no strong'))
            return false
        }

        dispatch(removeError())
        return true
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (formValid()) {
            dispatch(startRegisterUser(name, lastName, email, password))
        }
    }

    return (
        <div id='registro'>
            <ContainerRegistro>
                <ImageMediaRegistro src="https://i.ibb.co/VtFcZgM/LOGASO-NO-JODA-2.png" alt="LOGASO-NO-JODA-2" border="0" />
                <form onSubmit={handleRegister}>
                    {
                        msjError &&
                        (
                            <Alert status="error" marginTop='5'>
                                <AlertIcon />
                                {msjError}
                            </Alert>
                        )
                    }
                    <FormControl mt={7}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color="gray.300" />}
                            />
                            <Input type="text" placeholder="Name" name='name' value={name} onChange={handleInputChange} />
                        </InputGroup>
                    </FormControl>
                    <FormControl mt={7}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CAiFillTags color="gray.300" />}
                            />
                            <Input type="text" placeholder="Last name" name='lastName' value={lastName} onChange={handleInputChange} />
                        </InputGroup>
                    </FormControl>
                    <FormControl mt={7}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CMdEmail color="gray.300" />}
                            />
                            <Input type="email" placeholder="Email address" name='email' value={email} onChange={handleInputChange} />
                        </InputGroup>
                    </FormControl>
                    <FormControl mt={7}>
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
                    <Button type='submit' width='100%' mt={7} background='#49519a' color='white' _hover={{ color: 'white' }}>Register</Button>
                </form>
                <Box mt={3} mb={3} >
                    Already registered?{" "}
                    <Link to='/auth/login' onClick={() => {
                        dispatch(removeError())
                    }}>
                        Sign in
                    </Link>
                </Box>
            </ContainerRegistro>
        </div>
    )
}

export default Register
