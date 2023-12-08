import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ErrorValidatorLogIn } from '../../../ServerRoute/FormValidator'
import axios from 'axios'
import { AdminRoute, AuthHeader } from 'src/ServerRoute/ServerRouteExport'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [error, setError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const onChangeUserLog = (event) => {
    setFormData((value) => ({ ...value, [event.target.name]: event.target.value }))
  }

  useEffect(() => {
    if (Object.keys(error).length === 0) {
      setIsSubmit(true)
    } else {
      setIsSubmit(false)
    }
  }, [error])

  const onSubmitHandleLogin = () => {
    setError(ErrorValidatorLogIn(formData))
    if (Object.keys(error).length === 0 && isSubmit && Object.keys(formData).length !== 0) {
      axios
        .post(`${AdminRoute}login`, formData, AuthHeader)
        .then((result) => {
          toast.success('Wait ! Just Login')
          window.localStorage.setItem('authToken', result.data.authToken)
          setTimeout(() => {
            navigate('/dashboard')
          }, 3000)
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error('Something Went wrong !')
          } else if (err.response.status === 401) {
            toast.error('Check input info!')
          } else {
            toast.error('Some Issue Just Wait a Sec!')
          }
        })
    } else {
      toast.error('Enter required Field')
    }
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="email"
                        name="email"
                        onChange={onChangeUserLog}
                        autoComplete="email"
                      />
                    </CInputGroup>
                    {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChangeUserLog}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={onSubmitHandleLogin}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Are You A new user for the TheBagPacker Website then first Create your account
                      then go Head !
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
