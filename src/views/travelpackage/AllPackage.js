import React, { useState, useEffect } from 'react'
import {
  CSmartTable,
  CBadge,
  CCollapse,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react-pro'
import { ToastContainer, toast } from 'react-toastify'
import {
  CButton,
  CFormInput,
  CForm,
  CFormLabel,
  CFormText,
  CFormTextarea,
  CFormSwitch,
} from '@coreui/react'
import axios from 'axios'
import { AdminRoute, AuthHeader } from 'src/ServerRoute/ServerRouteExport'

function AllPackage() {
  const [details, setDetails] = useState([])
  const [getUpdateVisible, setUpdateVisible] = useState(false)
  const [getDeleteVisible, setDeleteVisible] = useState(false)
  const [getMainData, setMainData] = useState({})
  const [getData, setData] = useState([])
  const [deleteElementId, setDeleteElementId] = useState('')
  const [getUpdateElement, setUpdateElement] = useState({})
  useEffect(() => {
    // call the api and save the data
    axios
      .get(`${AdminRoute}/`)
      .then((result) => {
        let content = result.data.data
        setMainData(content)
        let StoreData = []
        for (let item in content) {
          StoreData[item] = {
            Sno: item,
            _id: content[item]._id,
            Title: content[item].title,
            Slug: content[item].slug,
            Price: content[item].price,
            Status: content[item].isActive ? 'Active' : 'Inactive',
            Description: content[item].description,
            Duration: content[item].duration,
            Pickup: content[item].pickup,
            PackageInfo: content[item].packageInfo,
            HomePage: content[item].isHomePage ? 'Active' : 'Inactive',
          }
        }
        setData(StoreData)
      })
      .catch((err) => {
        toast.error('Some on Data fetch refresh !')
      })
  }, [getDeleteVisible, getUpdateVisible])

  const onUpdateShow = (event) => {
    let updateSelectElementId = event.target.getAttribute('updateelementid')
    for (let item of getMainData) {
      if (item['_id'] === updateSelectElementId) {
        setUpdateElement(item)
        break
      }
    }
    setUpdateVisible(true)
  }

  const onDeleteShow = (event) => {
    let deleteSelectElementId = event.target.getAttribute('deleteelementid')
    setDeleteElementId(deleteSelectElementId)
    setDeleteVisible(true)
  }

  const onChangePackage = (event) => {
    if (event.target.name === 'isActive') {
      if (event.target.value === 'true') {
        setUpdateElement((value) => ({ ...value, [event.target.name]: 'false' }))
      } else {
        setUpdateElement((value) => ({ ...value, [event.target.name]: 'true' }))
      }
    } else if (event.target.name === 'isHomePage') {
      if (event.target.value === 'true') {
        setUpdateElement((value) => ({ ...value, [event.target.name]: 'false' }))
      } else {
        setUpdateElement((value) => ({ ...value, [event.target.name]: 'true' }))
      }
    } else {
      setUpdateElement((value) => ({ ...value, [event.target.name]: event.target.value }))
    }
  }

  const onUpdateHandlePackage = (event) => {
    event.preventDefault()
    // call the axios api
    let data = getUpdateElement
    delete data.createdAt
    delete data.__v
    delete data.updatedAt
    axios
      .post(`${AdminRoute}updatePackage`, data, AuthHeader)
      .then((result) => {
        toast.success('Update Package Successfully')
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
    setUpdateVisible(false)
  }

  const DeleteConformationFn = () => {
    // call the api and save the data
    axios
      .post(`${AdminRoute}/deletePackage`, { _id: deleteElementId }, AuthHeader)
      .then((result) => {
        toast.success('Package Delete Successfully')
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
    setDeleteVisible(false)
  }

  const columns = [
    {
      key: 'Sno',
      filter: false,
      sorter: false,
      _style: { width: '1%' },
    },
    {
      key: 'Title',
      _style: { width: '30%' },
    },
    {
      key: 'Slug',
      _style: { width: '30%' },
    },
    {
      key: 'Price',
      _style: { width: '20%' },
    },
    {
      key: 'Status',
      _style: { width: '10%' },
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  const getBadge = (Status) => {
    switch (Status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'danger'
      default:
        return 'primary'
    }
  }
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  return (
    <div>
      <ToastContainer />
      <div className="bg-white p-3 mb-3 rounded">
        <div>
          <h3>All Package</h3>
          <hr />
        </div>
        <div className="my-3">
          <CSmartTable
            activePage={2}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            footer
            items={getData}
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedColumns={{
              Status: (item) => (
                <td>
                  <CBadge color={getBadge(item.Status)}>{item.Status}</CBadge>
                </td>
              ),
              show_details: (item) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.Sno)
                      }}
                    >
                      {details.includes(item.Sno) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.Sno)}>
                    <CCardBody className="p-3">
                      <h4>{item.Title}</h4>
                      <p className="text-muted">Description : {item.Description}</p>
                      <p className="text-muted">Pickup : {item.Pickup}</p>
                      <p className="text-muted">Duration : {item.Duration}</p>
                      <p className="text-muted">Package Info : {item.PackageInfo}</p>
                      <p className="text-muted">Status : {item.Status}</p>
                      <p className="text-muted">Home Page : {item.HomePage}</p>
                      <div>
                        <CButton
                          className="mx-3"
                          updateelementid={item._id}
                          onClick={onUpdateShow}
                          size="sm"
                          color="info"
                        >
                          Update
                        </CButton>
                        <CButton
                          size="sm"
                          deleteelementid={item._id}
                          onClick={onDeleteShow}
                          color="danger"
                          className="ml-1"
                        >
                          Delete
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'status', state: 'asc' }}
            tableFilter
            tableProps={{
              className: 'add-this-class',
              responsive: true,
              striped: true,
              hover: true,
            }}
            tableBodyProps={{
              className: 'align-middle',
            }}
          />
        </div>
      </div>
      <div>
        {/* update model */}
        <CModal
          visible={getUpdateVisible}
          onClose={() => setUpdateVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setUpdateVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">Update Package</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div>
              <CForm onSubmit={onUpdateHandlePackage}>
                <div>
                  <div className="w-100 my-4">
                    <CFormLabel htmlFor="exampleFormControlInput1">Package Name :</CFormLabel>
                    <CBadge color="transprent" textColor="danger">
                      Require *
                    </CBadge>
                    <CFormInput
                      type="text"
                      name="title"
                      value={getUpdateElement.title}
                      onChange={onChangePackage}
                      id="exampleFormControlInput1"
                      placeholder="Enter package name"
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline"></CFormText>
                  </div>
                  <div className="w-100 my-4">
                    <CFormLabel htmlFor="exampleFormControlInput2">
                      Package Description :
                    </CFormLabel>
                    <CBadge color="transprent" textColor="danger">
                      Require *
                    </CBadge>
                    <CFormInput
                      type="text"
                      name="description"
                      value={getUpdateElement.description}
                      onChange={onChangePackage}
                      id="exampleFormControlInput2"
                      placeholder="Enter package description"
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                  </div>
                  <div className="w-100 my-4">
                    <CFormLabel htmlFor="exampleFormControlInput3">
                      Package Slug (i-am-slug) :
                    </CFormLabel>
                    <CBadge color="transprent" textColor="danger">
                      Require *
                    </CBadge>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput3"
                      name="slug"
                      value={getUpdateElement.slug}
                      onChange={onChangePackage}
                      placeholder="enter-package-slug"
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                  </div>
                  <div className="w-100 my-4">
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
                      value={getUpdateElement.image}
                      onChange={onChangePackage}
                      placeholder="http://yourphotolink-or-photo-url-live"
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                  </div>
                  <div className="w-100 my-4">
                    <CFormLabel htmlFor="exampleFormControlInput5">Package Price :</CFormLabel>
                    <CBadge color="transprent" textColor="danger">
                      Require *
                    </CBadge>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput5"
                      name="price"
                      value={getUpdateElement.price}
                      onChange={onChangePackage}
                      placeholder="Enter package price"
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                  </div>
                  <div className="w-100 my-4">
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
                      value={getUpdateElement.duration}
                      onChange={onChangePackage}
                      placeholder="Ex - 4Day/5Night"
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                  </div>
                  <div className="w-100 my-4">
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
                      value={getUpdateElement.redirectLink}
                      onChange={onChangePackage}
                      placeholder="your package drive link"
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                  </div>
                  <div className="w-100 my-4">
                    <CFormLabel htmlFor="exampleFormControlInput7">Pickup Location :</CFormLabel>
                    <CBadge color="transprent" textColor="danger">
                      Require *
                    </CBadge>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput7"
                      name="pickup"
                      value={getUpdateElement.pickup}
                      onChange={onChangePackage}
                      placeholder="enter your pickup location"
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                  </div>
                  <div className="w-100 my-4">
                    <CFormLabel htmlFor="exampleFormControlInput8">More Package Info :</CFormLabel>
                    <CBadge color="transprent" textColor="danger">
                      Require *
                    </CBadge>
                    <CFormTextarea
                      id="exampleFormControlInput8"
                      rows={7}
                      name="packageInfo"
                      value={getUpdateElement.packageInfo}
                      onChange={onChangePackage}
                      placeholder="more info for the package"
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                  </div>
                  <div className="w-100 my-4">
                    <CFormLabel htmlFor="exampleFormControlInput9">Package Status :</CFormLabel>
                    {getUpdateElement.isActive ? (
                      <CFormSwitch
                        label="Click At least once"
                        name="isActive"
                        value={getUpdateElement.isActive}
                        onChange={onChangePackage}
                        id="formSwitchCheckChecked"
                        defaultChecked
                      />
                    ) : (
                      <CFormSwitch
                        label="Click At least once"
                        name="isActive"
                        value={getUpdateElement.isActive}
                        onChange={onChangePackage}
                        id="formSwitchCheckChecked"
                      />
                    )}
                  </div>
                  <div className="w-100 my-4">
                    <CFormLabel htmlFor="exampleFormControlInput9">Home Page Show :</CFormLabel>
                    {getUpdateElement.isHomePage ? (
                      <CFormSwitch
                        label="Click At least once"
                        name="isHomePage"
                        value={getUpdateElement.isHomePage}
                        onChange={onChangePackage}
                        id="formSwitchCheckChecked"
                        defaultChecked
                      />
                    ) : (
                      <CFormSwitch
                        label="Click At least once"
                        name="isHomePage"
                        value={getUpdateElement.isHomePage}
                        onChange={onChangePackage}
                        id="formSwitchCheckChecked"
                      />
                    )}
                  </div>
                  <div>
                    <CButton type="submit" color="primary">
                      Update Package
                    </CButton>
                  </div>
                </div>
              </CForm>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setUpdateVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
      {/* delete model */}
      <div>
        {/* delete model */}
        <CModal
          visible={getDeleteVisible}
          onClose={() => setDeleteVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setDeleteVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">Delete Package</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Are Your Sure ! Delete The Package</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={DeleteConformationFn}>
              Delete Package
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </div>
  )
}
export default AllPackage
