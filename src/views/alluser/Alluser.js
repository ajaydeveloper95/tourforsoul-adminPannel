import React, { useState, useEffect } from 'react'
import {
  CSmartTable,
  CModal,
  CBadge,
  CCollapse,
  CCardBody,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react-pro'

import { CButton } from '@coreui/react'
import axios from 'axios'
import { AdminRoute, AuthHeader } from 'src/ServerRoute/ServerRouteExport'

function Alluser() {
  const [details, setDetails] = useState([])
  const [getUpdateVisible, setUpdateVisible] = useState(false)
  const [getDeleteVisible, setDeleteVisible] = useState(false)
  const [getMainData, setMainData] = useState({})
  const [getData, setData] = useState([])
  const [deleteItemId, setDeleteItemId] = useState('')
  useEffect(() => {
    // call the api and save the data
    axios
      .get(`${AdminRoute}/allUser`, AuthHeader)
      .then((result) => {
        let content = result.data.data
        setMainData(content)
        let StoreData = []
        for (let item in content) {
          StoreData[item] = {
            Sno: item,
            _id: content[item]._id,
            Name: content[item].name,
            Email: content[item].email,
            Status: content[item].isActive ? 'Active' : 'Inactive',
          }
        }
        setData(StoreData)
      })
      .catch((err) => {
        console.log('some issue fix ', err)
      })
  }, [getDeleteVisible, getUpdateVisible])
  const columns = [
    {
      key: 'Sno',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'Name',
      _style: { width: '35%' },
    },
    {
      key: 'Email',
      _style: { width: '35%' },
    },
    {
      key: 'Status',
      _style: { width: '20%' },
      filter: false,
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
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

  const onDeleteShow = (event) => {
    let delId = event.target.getAttribute('deleteelementid')
    setDeleteItemId(delId)
    setDeleteVisible(true)
  }

  const DeleteConformationFn = () => {
    // call the api and save the data
    setDeleteVisible(false)
  }
  return (
    <div className="bg-white p-3 mb-3 rounded">
      <div>
        <h3>All User</h3>
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
                    <h4>{item.username}</h4>
                    <p className="text-muted">Wait This function is not working at the time</p>
                    <CButton size="sm" disabled color="info">
                      User Settings
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      deleteelementid={item._id}
                      onClick={onDeleteShow}
                      className="ml-1"
                    >
                      Delete
                    </CButton>
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
      <div>
        {/* update and delete model in this div  */}
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
              <p>This function Not Added at the time Please Click on Close</p>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" disabled onClick={DeleteConformationFn}>
                Delete Package
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </div>
    </div>
  )
}

export default Alluser
