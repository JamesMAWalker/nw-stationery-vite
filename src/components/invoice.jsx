import React, { useEffect, useState } from 'react'
import { NWIcon } from '../assets/NW-logo--icon'
import { PayPalIcon, VenmoIcon, ZelleIcon, BTCIcon, ETHIcon } from '../assets/payment-icons';
import { InvoiceRow } from './invoice-row';

import './invoice.scss'
import '../App.scss'

// placeholder text
const invDetail = {
  name: 'Michelle Smith',
  addressLOne: '1234 Placeholder wy.',
  addressLTwo: 'Pleasanton, CA 12345',
  number: '555 321 1234',
}
const paymentContent = `Cash, or check made payable to 
“Nishelle Walker”.`



export const InvoiceTable = ({ printRef, rowCount, rowCollapsed, isDeposit }) => {
  // row count and spacing 
  const [numRows, setNumRows] = useState([' '])
  useEffect(() => {
    setNumRows(Array.from({ length: rowCount }, () => ' '))
  }, [rowCount])

  const collapseState = rowCollapsed ? 'var(--row-height-collapsed)' : 'var(--row-height)'


  // row value calculations
  const [changingTotal, setChangingTotal] = useState(false)
  const rowTotalCalc = (qty, price, discount="1") => {
    const parsedPrice = `${price}`.replace('$', '')
    const parsedDiscount = discount.replace('%', '')
    const unroundedDiscount = (-1 * ((parsedDiscount * .01) - 1))
    const discountFactor = unroundedDiscount.toFixed(4)
    setChangingTotal(!changingTotal)
    return (+qty * +parsedPrice) * discountFactor
  }

  // final calculations
  const [subTotal, setSubTotal] = useState(1000)
  const [deposit, setDeposit] = useState(200)
  const [grandTotal, setGrandTotal] = useState(800)

  const sumRowTotals = (totals) => {
    const sumTotals = (curSum, curVal) => curSum + curVal
    return totals.reduce(sumTotals)
  }

  useEffect(() => {
    // get row totals from DOM and calculate sub/grand totals
    const rowTotalsFromDOM = Array.from(
      document.querySelectorAll('.row-total')
    )
    const currentTotalsArray = rowTotalsFromDOM.map((t) => parseInt(t.innerHTML.replace('$', ''), 10))
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
      <div className='invoice-container'>
        <div className='invoice-top'>
          <div className='invoice-top__meta-container'>
            <div className='invoice-top__header-area'>
              <div className='invoice-top__logo-wrap'>
                {/* <div className="logo"><NWIcon/></div> */}
                <div className="company-name">
                  <h1 className="head">Nishelle Walker</h1>
                  <p className="subhead">Photographer</p>
                </div>
              </div>
              <h1 className='invoice-top__header'>
                Invoice
              </h1>
            </div>
            <div className='invoice-top__info-area'>
              <div className='dates'>
                <div className='dates__invoice'>
                  <h4>INVOICE DATE</h4>
                  <input placeholder='10.21.2020' />
                </div>
                <div className='dates__due'>
                  <h4>DUE DATE</h4>
                  <input placeholder='11.1.2020' />
                </div>
              </div>
              <div className='invoice-detail'>
                <div className='invoice-detail__invoicee'>
                  <h4>INVOICE TO</h4>
                  <input
                    className='name'
                    type='text'
                    placeholder={invDetail.name}
                  />
                  <input
                    className='address'
                    type='text'
                    placeholder={invDetail.addressLOne}
                  />
                  <input
                    className='address'
                    type='text'
                    placeholder={invDetail.addressLTwo}
                  />
                  <input
                    className='number'
                    type='text'
                    placeholder={invDetail.number}
                  />
                </div>
                <div className='invoice-detail__invoice-number'>
                  <h4>INVOICE No.</h4>
                  <input
                    className='number'
                    type='text'
                    placeholder='00023456'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='invoice-body'>
          <div className='invoice-body__grid'>
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
            <div className='row subtotal-row'>
              <span className='empty'> </span>
              <span className='empty'> </span>
              <span className='subtotal'>SUBTOTAL</span>
              <span className='empty'> </span>
              <span
                style={{ textAlign: 'right' }}
                className='subtotal-num'
              >
                ${subTotal}
              </span>
            </div>
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
                GRAND TOTAL
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
        <div className='invoice-close'>
          <h3 className='invoice-close__header'>
            Payment Methods
          </h3>
          <div className="invoice-close__icons">
            <PayPalIcon />
            <VenmoIcon />
            <ZelleIcon />
            <ETHIcon />
            <BTCIcon />
          </div>
          <textarea
            className='invoice-close__content'
            placeholder={paymentContent}
          />
        </div>
        <footer className='footer'>
          <div className='footer__content'>
            <div className='number'>805 | 906 | 1221</div>
            <div className='email'>
              nishelle@nishellewalker.com
            </div>
            <div className='site'>
              nishellewalker.com
            </div>
          </div>
          <div className='footer__bottom-bar' />
        </footer>
      </div>
    </main>
  )
}
