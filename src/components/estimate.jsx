import React, { useEffect, useState } from 'react'
import { NWIcon } from '../assets/NW-logo--icon'
import { InvoiceRow as EstimateRow } from './invoice-row'
import {
  PayPalIcon,
  VenmoIcon,
  ZelleIcon,
  BTCIcon,
  ETHIcon,
} from '../assets/payment-icons'

import './estimate.scss'
import '../App.scss'

// placeholder text
const invDetail = {
  name: 'Michelle Smith',
  addressLOne: '1234 Placeholder wy.',
  addressLTwo: 'Pleasanton, CA 12345',
  number: '555 321 1234',
}
const paymentContent = `Cash, check (made payable to 
“Nishelle Walker”), or one of the below methods.`

export const EstimateTable = ({
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
      <div className='estimate-container'>
        <div className='estimate-top'>
          <div className='estimate-top__meta-container'>
            <div className='estimate-top__header-area'>
              <div className='estimate-top__logo-wrap'>
                {/* <div className='logo'>
                  <NWIcon />
                </div> */}
                <div className='company-name'>
                  <h1 className='head'>Nishelle Walker</h1>
                  <p className='subhead'>Photographer</p>
                </div>
              </div>
              <h1 className='estimate-top__header'>
                Estimate
              </h1>
            </div>
            <div className='estimate-top__info-area'>
              <div className='dates'>
                <div className='dates__estimate'>
                  <h4>INVOICE DATE</h4>
                  <input placeholder='10.21.2020' />
                </div>
                <div className='dates__due'>
                  <h4>DUE DATE</h4>
                  <input placeholder='11.1.2020' />
                </div>
              </div>
              <div className='estimate-detail'>
                <div className='estimate-detail__estimate'>
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
                <div className='estimate-detail__estimate-number'>
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
        <div className='estimate-body'>
          <div className='estimate-body__grid'>
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
                <EstimateRow
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
        <div
          className='estimate-close'
          style={{
            marginTop: rowCollapsed
              ? 'var(--space-xl)'
              : 'var(--vert-margin)',
          }}
        >
          <div className='estimate-close__left'>
            <h3 className='estimate-close__header'>
              Payment Methods
            </h3>
            <textarea
              className='estimate-close__content'
              placeholder={paymentContent}
            />
            <div className='estimate-close__icons'>
              <PayPalIcon />
              <VenmoIcon />
              <ZelleIcon />
              <ETHIcon />
              <BTCIcon />
            </div>
          </div>
          <div className='estimate-close__right'>
            <h3 className='estimate-close__header'>
              Estimate Comments
            </h3>
            <textarea
              rows='5'
              className='estimate-close__content comments'
              placeholder={`The above items are only an esitmate and subject any necessary changes.`}
            />
          </div>
        </div>
        <footer className='footer'>
          <div className='footer__content'>
            <div className='number'>805 | 906 | 1221</div>
            <div className='email'>
              nishelle@nishellewalker.com
            </div>
            <div className='site'>nishellewalker.com</div>
          </div>
          <div className='footer__bottom-bar' />
        </footer>
      </div>
    </main>
  )
}
