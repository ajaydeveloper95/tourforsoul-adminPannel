import React, { useState, useEffect } from 'react'
import { CFormInput, CForm, CFormLabel, CFormText, CButton, CFormSwitch } from '@coreui/react'

function CreateUser() {
  const [getFormData, setFormData] = useState({})

  useEffect(() => {}, [getFormData])

  const onChangeFn = (event) => {
    setFormData((value) => ({ ...value, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = ()=>{
    let v = "t"
  }
  return (
    <div className="bg-white p-3 mb-3 rounded">
      <div>
        <h3>Create User</h3>
      </div>
      <hr />
      <div>
        <CForm onSubmit={handleOnSubmit}>
          <div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput1">Email Address :</CFormLabel>
              <CFormInput
                type="email"
                name="email"
                id="exampleFormControlInput1"
                onChange={onChangeFn}
                placeholder="name@example.com"
                disabled
                aria-describedby="exampleFormControlInputHelpInline"
              />
              <CFormText component="span" id="exampleFormControlInputHelpInline">
                Must be 8-20 characters long.
              </CFormText>
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput2">Full Name :</CFormLabel>
              <CFormInput
                type="text"
                disabled
                id="exampleFormControlInput2"
                name='fullname'
                onChange={onChangeFn}
                placeholder="Enter your name"
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput3">Password :</CFormLabel>
              <CFormInput
                type="password"
                disabled
                name='password'
                onChange={onChangeFn}
                id="exampleFormControlInput3"
                placeholder="Enter your password"
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput4">Conform Password :</CFormLabel>
              <CFormInput
                type="password"
                name='conformPassword'
                disabled
                onChange={onChangeFn}
                id="exampleFormControlInput4"
                placeholder="Enter password again"
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput5">Secure Key :</CFormLabel>
              <CFormInput
                type="password"
                name='secureKey'
                disabled
                onChange={onChangeFn}
                id="exampleFormControlInput5"
                placeholder="Enter your secure key"
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput6">User Status :</CFormLabel>
              <CFormSwitch
                label="Deafult User is Active"
                id="exampleFormControlInput6"
                disabled
                defaultChecked
              />
            </div>
            <div>
              <CButton type="submit" disabled color="primary">
                Create
              </CButton>
            </div>
          </div>
        </CForm>
      </div>
    </div>
  )
}

export default CreateUser
