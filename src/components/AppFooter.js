import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://teckiajay.com" target="_blank" rel="noopener noreferrer">
          Teckiajay
        </a>
        <span className="ms-1">&copy; 2023 Ajay budaniya</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://teckiajay.com" target="_blank" rel="noopener noreferrer">
          Ajay Budaniya
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
