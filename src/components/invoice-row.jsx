import React, { useEffect, useRef, useState } from 'react'

import './invoice.scss';

export const InvoiceRow = ({idx, rowTotal, collapseState}) => {
  const discRef = useRef(null)
  
  const [rowQty, setRowQty] = useState(1)
  const [rowPrice, setRowPrice] = useState(1000)
  const [rowDiscount, setRowDiscount] = useState(" ")
  const [thisRowTotal, setThisRowTotal] = useState(1000)
  
  useEffect(() => {
    setThisRowTotal(rowTotal(rowQty, rowPrice, rowDiscount))
  }, [rowQty, rowPrice, rowDiscount])

  return (
    <div className='row' style={{ height: collapseState }}>
      <input
        type='text'
        value={rowQty}
        onChange={(e) => setRowQty(e.currentTarget.value)}
        placeholder={rowQty}
        className={`qty qty${idx}`}
        style={{ textAlign: 'left' }}
      />
      <input
        type='text'
        placeholder='Wedding Day Shoot'
        className={`prod-serv prod-serv${idx}`}
      />
      <input
        type='text'
        value={`$${rowPrice}`}
        onChange={(e) => {
          // remove non-number characters
          const parsedVal = e.currentTarget.value.replace('$', '')
          setRowPrice(parsedVal)}
        }
        placeholder={`$${rowPrice}`}
        className={`row-price price${idx}`}
      />
      <input
        type='text'
        value={rowDiscount === ' ' ? ' ' : `${rowDiscount}%`}
        onChange={(e) => {
          // remove non-number characters
          const parsedDiscount = e.currentTarget.value.replace("%", "").replace(" ", '')
          setRowDiscount(parsedDiscount)}
        }
        className={`discount discount${idx}`}
        className='discount'
      />
      <p
        type='text'
        className='total row-total'
        style={{ textAlign: 'right' }}
      >${thisRowTotal}</p>
    </div>
  )
}
