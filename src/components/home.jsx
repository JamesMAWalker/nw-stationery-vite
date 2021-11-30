import React from 'react'
import { NavLink } from 'react-router-dom'

import { NWLogo } from '../assets/NW-logo';

import './home.scss'

const imgLinks = {
  invoice: `https://res.cloudinary.com/jameswalker-work/image/upload/f_auto/q_40/v1624186546/Radiance/INV__f_hhho7u.png`,
  receipt: `https://res.cloudinary.com/jameswalker-work/image/upload/f_auto/q_40/v1624532478/Radiance/Rec__1_h4jhtr.png`,
}

const templateInfo = [
  {
    name: 'Estimate',
    path: '/estimate',
    imgSrc:
      'https://res.cloudinary.com/jameswalker-work/image/upload/f_auto/q_40/v1624186546/Radiance/INV__f_hhho7u.png',
  },
  {
    name: 'Invoice',
    path: '/invoice',
    imgSrc:
      'https://res.cloudinary.com/jameswalker-work/image/upload/f_auto/q_40/v1624186546/Radiance/INV__f_hhho7u.png',
  },
  {
    name: 'Receipt',
    path: '/receipt',
    imgSrc:
      'https://res.cloudinary.com/jameswalker-work/image/upload/f_auto/q_40/v1624532478/Radiance/Rec__1_h4jhtr.png',
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
            <NavLink to={tmpl.path} className='option' >
              <div className='image-wrapper'>
                <img
                  className='option-photo'
                  src={tmpl.imgSrc}
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
