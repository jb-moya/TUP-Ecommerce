import React from 'react'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'
import { CheckOutFrame } from '../components/CheckOutFrame'

export const CheckOutPage = () => {
  return (
    <div>
        <NavBar />
        <CheckOutFrame />
        <Footer />
    </div>
  )
}
