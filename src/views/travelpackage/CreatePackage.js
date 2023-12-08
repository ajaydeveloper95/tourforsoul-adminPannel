import React, { useEffect, useState } from 'react'
import { AdminRoute, AuthHeader } from '../../ServerRoute/ServerRouteExport'
import { ErrorValidator } from '../../ServerRoute/FormValidator'
import { ToastContainer, toast } from 'react-toastify'
import {
  CFormInput,
  CForm,
  CFormLabel,
  CFormText,
  CButton,
  CFormTextarea,
  CFormSwitch,
  CBadge,
} from '@coreui/react'
import axios from 'axios'

function CreatePackage() {
  const [getDataPackage, setDataPackage] = useState({})
  const [error, setError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const onChangePackage = (event) => {
    if (event.target.name === 'isActive') {
      setDataPackage((value) => ({ ...value, [event.target.name]: 'true' }))
      setDataPackage((value) => ({ ...value, isHomePage: 'false' }))
    } else {
      setDataPackage((value) => ({ ...value, [event.target.name]: event.target.value }))
    }
  }

  useEffect(() => {
    if (Object.keys(error).length === 0) {
      setIsSubmit(true)
    }
  }, [error])

  const onSubmitHandlePackage = (event) => {
    event.preventDefault()
    setError(ErrorValidator(getDataPackage))
    // call the axios api if condition true
    if (Object.keys(error).length === 0 && isSubmit && Object.keys(getDataPackage).length !== 0) {
      axios
        .post(`${AdminRoute}addPackage`, getDataPackage, AuthHeader)
        .then((result) => {
          toast.success('Package Add Successfully')
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error('Something Went wrong !')
          } else if (err.response.status === 401) {
            toast.error('Check your Secure Key !')
          } else {
            toast.error('Some Issue Just Wait a Sec!')
          }
        })
    } else {
      toast.error('Enter required Field')
    }
  }

  return (
    <div className="bg-white p-3 mb-3 rounded">
      <ToastContainer />
      <div>
        <h3>Create Package</h3>
      </div>
      <hr />
      <div>
        <CForm onSubmit={onSubmitHandlePackage}>
          <div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput1">Package Name :</CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormInput
                type="text"
                name="title"
                onChange={onChangePackage}
                id="exampleFormControlInput1"
                placeholder="Enter package name"
                aria-describedby="exampleFormControlInputHelpInline"
              />
              {error.title && <p className="text-danger">{error.title}</p>}
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput2">Package Description :</CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormInput
                type="text"
                name="description"
                onChange={onChangePackage}
                id="exampleFormControlInput2"
                placeholder="Enter package description"
                aria-describedby="exampleFormControlInputHelpInline"
              />
              {error.description && <p className="text-danger">{error.description}</p>}
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput3">Package Slug (i-am-slug) :</CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormInput
                type="text"
                id="exampleFormControlInput3"
                name="slug"
                onChange={onChangePackage}
                placeholder="enter-package-slug"
                aria-describedby="exampleFormControlInputHelpInline"
              />
              {error.slug && <p className="text-danger">{error.slug}</p>}
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput4">
                Package Image URL (Photo URL) :
              </CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormInput
                type="text"
                id="exampleFormControlInput4"
                name="image"
                onChange={onChangePackage}
                placeholder="http://yourphotolink-or-photo-url-live"
                aria-describedby="exampleFormControlInputHelpInline"
              />
              {error.image && <p className="text-danger">{error.image}</p>}
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput5">Package Price :</CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormInput
                type="text"
                id="exampleFormControlInput5"
                name="price"
                onChange={onChangePackage}
                placeholder="Enter package price"
                aria-describedby="exampleFormControlInputHelpInline"
              />
              {error.price && <p className="text-danger">{error.price}</p>}
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput6">
                Package Duration (- Day /- Night):
              </CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormInput
                type="text"
                id="exampleFormControlInput6"
                name="duration"
                onChange={onChangePackage}
                placeholder="Ex - 4Day/5Night"
                aria-describedby="exampleFormControlInputHelpInline"
              />
              {error.duration && <p className="text-danger">{error.duration}</p>}
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput6">
                Package pdf Link (googledrive link):
              </CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormInput
                type="text"
                id="exampleFormControlInput6"
                name="redirectLink"
                onChange={onChangePackage}
                placeholder="your package drive link"
                aria-describedby="exampleFormControlInputHelpInline"
              />
              {error.redirectLink && <p className="text-danger">{error.redirectLink}</p>}
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput7">Pickup Location :</CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormInput
                type="text"
                id="exampleFormControlInput7"
                name="pickup"
                onChange={onChangePackage}
                placeholder="enter your pickup location"
                aria-describedby="exampleFormControlInputHelpInline"
              />
              {error.pickup && <p className="text-danger">{error.pickup}</p>}
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput8">More Package Info :</CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormTextarea
                id="exampleFormControlInput8"
                rows={7}
                name="packageInfo"
                onChange={onChangePackage}
                placeholder="more info for the package"
                aria-describedby="exampleFormControlInputHelpInline"
              />
              {error.packageInfo && <p className="text-danger">{error.packageInfo}</p>}
            </div>
            <div className="w-75 my-4">
              <CFormLabel htmlFor="exampleFormControlInput9">Package Status :</CFormLabel>
              <CBadge color="transprent" textColor="danger">
                Require *
              </CBadge>
              <CFormSwitch
                label="Click At least once"
                name="isActive"
                onChange={onChangePackage}
                id="formSwitchCheckChecked"
              />
              {error.isActive && <p className="text-danger">{error.isActive}</p>}
            </div>
            <div>
              <CButton type="submit" color="primary">
                Create Package
              </CButton>
            </div>
          </div>
        </CForm>
      </div>
    </div>
  )
}

export default CreatePackage
