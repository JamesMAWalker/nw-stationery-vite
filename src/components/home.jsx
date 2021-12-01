import React from 'react'
import { NavLink } from 'react-router-dom'

import { NWLogo } from '../assets/NW-logo';

import './home.scss'


const templateInfo = [
  {
    name: 'Estimate',
    path: '/estimate',
    imgUrlFrag: 'estimate__thumb_xk0jbj',
  },
  {
    name: 'Invoice',
    path: '/invoice',
    imgUrlFrag: 'invoice__thumb_gsrljv',
  },
  {
    name: 'Receipt',
    path: '/receipt',
    imgUrlFrag: 'receipt__thumb_la7qgb',
  },
]

export const Home = () => {
  return (
    <div className='home-page'>
      <div className='logo'>
        <NWLogo />
      </div>
      <h1 className='header'>
        <span className='company-name'>
          Nishelle Walker Photography
        </span>{' '}
        <br /> Stationery <br /> Suite
      </h1>
      <h4 className='options-header'>Choose a Template</h4>
      <ul className='options-list'>
        {templateInfo.map((tmpl) => {
          // const dataDisabled = tmpl.name === "Contract" ? `` : null
          return (
            <NavLink to={tmpl.path} className='option'>
              <div className='image-wrapper'>
                <img
                  className='option-photo'
                  src={`https://res.cloudinary.com/jameswalker-work/image/upload/f_auto,q_auto/v1638338005/NW_Photography/Stationery/Mockups/${tmpl.imgUrlFrag}.png`}
                  alt={`${tmpl.name} document photo`}
                />
              </div>
              <h4>{tmpl.name}</h4>
            </NavLink>
          )
        })}
      </ul>
    </div>
  )
}
