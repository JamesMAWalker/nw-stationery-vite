import './App.scss'
import React, { useEffect, useState } from 'react'
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom'

import { DocumentEditor } from './components/editor'
import { Home } from './components/home'
import { InvoiceTable } from './components/invoice'
import { Receipt } from './components/receipt'
import { EstimateTable } from './components/estimate'

function App() {
  const [pageCount, setPageCount] = useState(0)
  const [rowCount, setRowCount] = useState(1)
  const [rowCollapsed, setRowCollapsed] = useState(false)
  const [isDeposit, setIsDeposit] = useState(false)
  const [packageItems, setPackageItems] = useState([])
  const templateRoutes = [
    {
      path: '/estimate',
      name: 'Estimate',
      Component: EstimateTable,
      props: {
        docType: 'Estimate',
        rowCount,
        setRowCount,
        rowCollapsed,
        setRowCollapsed,
        isDeposit,
        setIsDeposit,
      },
    },
    {
      path: '/receipt',
      name: 'Receipt',
      Component: Receipt,
      props: {
        docType: 'Receipt',
        rowCount,
        setRowCount,
        rowCollapsed,
        setRowCollapsed,
        isDeposit,
        setIsDeposit,
      },
    },
    {
      path: '/invoice',
      name: 'Invoice',
      Component: InvoiceTable,
      props: {
        docType: 'Invoice',
        rowCount,
        setRowCount,
        rowCollapsed,
        setRowCollapsed,
        isDeposit,
        setIsDeposit,
      },
    },
  ]

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // set breakpoint for JS
    setIsMobile(window.innerWidth <= 1148)
  }, [])

  /*
   
  */

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          {templateRoutes.map(
            ({ name, path, Component, props }) => {
              return (
                <Route
                  key={name}
                  path={path}
                  exact
                  element={
                    <DocumentEditor
                      isMobile={isMobile}
                      {...props}
                    >
                      <Component {...props} />
                    </DocumentEditor>
                  }
                />
              )
            }
          )}
        </Routes>
      </Router>
    </div>
  )
}

export default App
