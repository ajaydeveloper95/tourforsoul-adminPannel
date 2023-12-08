import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsC } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilGraph, cilGrain, cilUser, cilMoodVeryBad } from '@coreui/icons'
import axios from 'axios'
import { AdminRoute, AuthHeader } from '../../ServerRoute/ServerRouteExport'

const Dashboard = () => {
  const [ActivePackage, setActivePackage] = useState(0)
  const [InActivePackage, setInActivePackage] = useState(0)
  const [ActivePackageProcess, setActivePackageProcess] = useState(0)
  const [InActivePackageProcess, setInActivePackageProcess] = useState(0)
  const [allUser, setAllUser] = useState(0)
  useEffect(() => {
    axios
      .get(`${AdminRoute}/allUser`, AuthHeader)
      .then((result) => {
        let AllUser = result.data.data.length
        setAllUser(AllUser)
      })
      .catch((err) => {
        console.log('some issue fix ', err)
      })

    axios
      .get(`${AdminRoute}/`, AuthHeader)
      .then((result) => {
        let AllUser = result.data.data
        let active = 0
        let inactive = 0
        for (let item of AllUser) {
          if (item.isActive) {
            active += 1
          } else {
            inactive += 1
          }
        }
        setActivePackage(active)
        setInActivePackage(inactive)
        let activeProgressBar = (active / AllUser.length) * 100
        let InactiveProgressBar = (inactive / AllUser.length) * 100
        setActivePackageProcess(activeProgressBar)
        setInActivePackageProcess(InactiveProgressBar)
      })
      .catch((err) => {
        console.log('some issue fix ', err)
      })
  }, [])
  return (
    <>
      <div>
        <div className="bg-white p-3 mb-3 rounded">
          <CRow>
            <CCol xs={12}>
              <div className="my-5 text-center">
                <h2>Wel Come To TourForSoul Admin Section</h2>
              </div>
            </CCol>
          </CRow>
        </div>
        <div className="bg-white p-3 mb-3 rounded">
          <div className="my-2">
            <h3>Package And User Information</h3>
          </div>
          <hr />
          <CRow>
            <CCol xs={6}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilGraph} height={36} />}
                progress={{ color: 'primary', value: ActivePackageProcess }}
                color="success"
                text="Widget helper text"
                title="Active Package"
                value={ActivePackage}
              />
            </CCol>
            <CCol xs={6}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilGrain} height={36} />}
                color="danger"
                inverse
                progress={{ value: InActivePackageProcess }}
                text="Widget helper text"
                title="De-Active Package"
                value={InActivePackage}
              />
            </CCol>
            <CCol xs={6}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilUser} height={36} />}
                color="info"
                inverse
                progress={{ value: 98 }}
                text="Widget helper text"
                title="Active User"
                value={allUser}
              />
            </CCol>
            <CCol xs={6}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilMoodVeryBad} height={36} />}
                color="warning"
                inverse
                progress={{ value: 2,color:"info" }}
                text="Widget helper text"
                title="De-Active User"
                value="0"
              />
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  )
}

export default Dashboard
