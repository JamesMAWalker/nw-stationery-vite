import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { NavLink } from 'react-router-dom'

import './editor.scss'
import '../App.scss';

export const DocumentEditor = ({
  children,
  isMobile,
  pageCount,
  setPageCount,
  docType,
  rowCount,
  setRowCount,
  rowCollapsed,
  setRowCollapsed,
  isDeposit,
  setIsDeposit,
  packageItems,
  setPackageItems,
}) => {
  // set content to print
  const toPrintRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => toPrintRef.current,
  })

  // Letterhead functionality
  const [minPagesReached, setMinPagesReached] =
    useState(false)
  const addRemovePages = (operator) => {
    if (operator === -1 && pageCount <= 0) return

    const newPageCount = pageCount + operator
    setPageCount(newPageCount)
  }

  useEffect(() => {
    setMinPagesReached(pageCount < 1)
  }, [pageCount])

  // Invoice functionality
  const [maxRows, setMaxRows] = useState(rowCount)
  useEffect(() => {
    if (rowCollapsed) {
      setMaxRows(6)
    } else {
      setMaxRows(5)
    }
  }, [rowCollapsed, rowCount])

  const toggleRowCollapse = () => {
    if (maxRows <= rowCount && !rowCollapsed) {
      return
    } else {
      setRowCollapsed(!rowCollapsed)
    }
  }

  const maxIndication = () => {
    if (maxRows - rowCount > 1) {
      return 'var(--normal)'
    } else if (
      maxRows - rowCount === 1 ||
      (maxRows === rowCount && !rowCollapsed)
    ) {
      return 'var(--warning)'
    } else if (maxRows <= rowCount) {
      return 'var(--alert)'
    }
  }

  const addRemoveRows = (crement) => {
    let curNumRows = rowCount
    if (curNumRows <= 1 && crement === -1) {
      return
    }
    if (curNumRows >= maxRows && crement === 1) {
      setRowCollapsed(true)
      return
    }
    setRowCount(curNumRows + crement)
  }

  useEffect(() => {
    if (isDeposit) {
      setRowCollapsed(true)
    }
  }, [isDeposit])

  const addRemovePackageItem = (crement) => {
    if (crement === 1) {
      setPackageItems([
        ...packageItems,
        'New package inclusion...',
      ])
    } else {
      setPackageItems(
        packageItems.slice(0, [packageItems.length - 1])
      )
    }
  }

  // Target child for printing
  const childrenWithProps = React.cloneElement(children, {
    printRef: toPrintRef,
  })

  return (
    <div className='editor-container'>
      <div className='editor-bg'></div>
      <div className='document-scrollwrap'>
        <br />
        {childrenWithProps}
        <br />
      </div>
      <div className='editor-controls'>
        <h2 className='controls-header'>
          {docType} Controls
        </h2>
        {(docType === 'Invoice' ||
          docType === 'Receipt' || docType === 'Estimate') && (
          <>
            <button
              className='editor-btn deposit-btn'
              onClick={() => setIsDeposit(!isDeposit)}
            >
              {isDeposit ? 'Remove Deposit' : 'Add Deposit'}
            </button>
            <button
              onClick={toggleRowCollapse}
              disabled={rowCount > maxRows || rowCount > 4}
              className='editor-btn'
            >
              {!rowCollapsed ? 'collapse' : 'expand'} rows
            </button>
            <div className='add-remove-wrap'>
              <button
                onClick={() => addRemoveRows(1)}
                className='editor-btn half'
                disabled={rowCount >= 6}
              >
                + row
              </button>
              <button
                onClick={() => addRemoveRows(-1)}
                className='editor-btn half'
                disabled={rowCount <= 1}
              >
                - row
              </button>
            </div>
            <div
              className='rows-info'
              style={{ color: maxIndication() }}
            >
              rows &nbsp; ▪ &nbsp; {rowCount} | {maxRows}
            </div>
          </>
        )}
        <button
          onClick={handlePrint}
          id='generate-pdf'
          className={`
            editor-btn 
            generate-btn 
            main-btn
            ${docType === 'Letter' ? 'two-space' : ''} 
          `}
        >
          Generate {docType}
        </button>
        <NavLink to='/' className='back-link'>
          back to stationery home ▸
        </NavLink>
      </div>
    </div>
  )
}
