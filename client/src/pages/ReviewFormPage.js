import React from 'react'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'
import { SellerReviewForm } from '../components/SellerReviewForm'
import { ProductReviewForm } from '../components/ProductReviewForm'

export const SellerReviewFormPage = () => {
  return (
    <div>
        <NavBar />
        <SellerReviewForm />
        <Footer /> 
    </div>
  )
}

export const ProductReviewFormPage = () => {
  return (
    <div>
        <NavBar />
        <ProductReviewForm />
        <Footer /> 
    </div>
  )
}


