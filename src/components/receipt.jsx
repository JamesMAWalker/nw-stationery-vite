import React, { useEffect, useState } from 'react'
import { LogoFL } from '../assets/LogoFL'
import { InvoiceRow } from './invoice-row'

import './receipt.scss'

// placeholder text
const invDetail = {
  name: 'Michelle Smith',
  addressLOne: '1234 Placeholder wy.',
  addressLTwo: 'Pleasanton, CA 12345',
  number: '555 321 1234',
}
const paymentContent = `Cash, or check made payable to 
“Radiance Photography Studio”.`

export const Receipt = ({
  printRef,
  rowCount,
  rowCollapsed,
  isDeposit,
}) => {
  // row count and spacing
  const [numRows, setNumRows] = useState([' '])
  useEffect(() => {
    setNumRows(Array.from({ length: rowCount }, () => ' '))
  }, [rowCount])

  const collapseState = rowCollapsed
    ? 'var(--row-height-collapsed)'
    : 'var(--row-height)'

  // row value calculations
  const [changingTotal, setChangingTotal] = useState(false)
  const rowTotalCalc = (qty, price, discount = '1') => {
    const parsedPrice = `${price}`.replace('$', '')
    const parsedDiscount = discount.replace('%', '')
    const unroundedDiscount =
      -1 * (parsedDiscount * 0.01 - 1)
    const discountFactor = unroundedDiscount.toFixed(4)
    setChangingTotal(!changingTotal)
    return +qty * +parsedPrice * discountFactor
  }

  // final calculations
  const [subTotal, setSubTotal] = useState(1000)
  const [deposit, setDeposit] = useState(200)
  const [grandTotal, setGrandTotal] = useState(1000)

  const sumRowTotals = (totals) => {
    const sumTotals = (curSum, curVal) => curSum + curVal
    return totals.reduce(sumTotals)
  }

  useEffect(() => {
    // get row totals from DOM and calculate sub/grand totals
    const rowTotalsFromDOM = Array.from(
      document.querySelectorAll('.row-total')
    )
    const currentTotalsArray = rowTotalsFromDOM.map((t) =>
      parseInt(t.innerHTML.replace('$', ''), 10)
    )
    const summedRowTotals = sumRowTotals(currentTotalsArray)
    setSubTotal(summedRowTotals)
    if (isDeposit) {
      setGrandTotal(summedRowTotals - deposit)
    } else {
      setGrandTotal(summedRowTotals)
    }
  }, [numRows, rowCount, changingTotal, deposit, isDeposit])

  return (
    <main ref={printRef}>
      <div className='receipt-container'>
        <div className='receipt-top'>
          <div className='receipt-top__header-area'>
            <div className='receipt-top__logo-wrap'>
              <LogoFL />
            </div>
            <h1 className='receipt-top__header'>Receipt</h1>
          </div>
          <div className='receipt-top__info-area'>
            <div className='details'>
              <div className='details__payment'>
                <h4>Payment For</h4>
                <input placeholder='Invoice 00023455' />
              </div>
            </div>
            <div className='receipt-date'>
              <div className='receipt-date__invoice-number'>
                <h4>Date of Payment</h4>
                <input
                  className='number'
                  type='text'
                  placeholder='11.1.2020'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='receipt-body'>
          <div className='receipt-body__grid'>
            <div className='row header-row'>
              <span
                className='qty'
                style={{ textAlign: 'left' }}
              >
                Qty
              </span>
              <span className='prodServ'>
                Products & Services
              </span>
              <span className='price'>Price</span>
              <span className='discount'>Discount</span>
              <span
                className='total'
                style={{ textAlign: 'right' }}
              >
                Total
              </span>
            </div>
            {numRows.map((row, idx) => {
              // const rowQty = document.querySelector(`.qty${idx}`).getAttribute('placeholder')

              return (
                <InvoiceRow
                  idx={idx}
                  rowTotal={rowTotalCalc}
                  collapseState={collapseState}
                />
              )
            })}
            {isDeposit && (
              <div className='row deposit-row'>
                <span className='empty'> </span>
                <span className='empty'> </span>
                <span className='subtotal'>DEPOSIT</span>
                <span className='empty'> </span>
                <input
                  style={{ textAlign: 'right' }}
                  className='subtotal-num'
                  value={`- $${deposit}`}
                  onChange={(e) => {
                    const parsedDeposit =
                      e.currentTarget.value
                        .replace('$', '')
                        .replace('-', '')
                        .replace(' ', '')

                    setDeposit(parsedDeposit)
                  }}
                />
              </div>
            )}
            <div className='row grandtotal-row'>
              <span className='empty'> </span>
              <span className='empty'> </span>
              <span className='grandtotal'>
                AMOUNT PAID
              </span>
              <span className='empty'> </span>
              <span
                style={{ textAlign: 'right' }}
                className='subtotal-num'
              >
                ${grandTotal}
              </span>
            </div>
          </div>
        </div>
        <div className='receipt-close'>
          <h4 className='receipt-close__header'><span className="left"/> Thank You <span className="right"/></h4>
        </div>
        <footer className='footer'>
          <div className='footer__content'>
            <div className='number'>310 | 268 | 8222</div>
            {/* <Divider /> */}
            <div className='email'>
              info@radiancephotographystudio.com
            </div>
            {/* <Divider /> */}
            <div className='address'>
              1643 Westwood Blvd <br /> Los Angleles, CA
              90025
            </div>
          </div>
          <div className='footer__bottom-bar' />
        </footer>
      </div>
    </main>
  )
}
