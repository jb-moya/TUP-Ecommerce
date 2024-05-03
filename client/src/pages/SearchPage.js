import React from 'react'
import { NavBar } from '../components/NavBar.js'
import Footer from '../components/Footer.js'
import { SearchPageFrame } from '../components/SearchPageFrame.js'


export const SearchPage = () => {
  return (
    <div>
        <NavBar />
        <SearchPageFrame />
        <Footer />
    </div>
  )
}
