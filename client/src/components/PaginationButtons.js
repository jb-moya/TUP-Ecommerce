import React from 'react'
import ReactPaginate from "react-paginate";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import {motion} from "framer-motion";

const PaginationButtons = () => {

    const handlePageChange = ({selected}) => {
      console.log(selected)
    }
    const paginationVariants = {
        hidden: {
          opacity: 0,
          y: 200,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 260,
            dampoing: 20,
            duration: 2,
          }
        }
    }
  return (
    <motion.div variants={paginationVariants} initial="hidden" animate="visible">
      <ReactPaginate 
      breakLabel ={
        <span className='mr-4'>
           ...
        </span>
      }
      nextLabel = {
        <span className='w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md'>
          <BsChevronRight />
        </span>
      }
      onPageChange={handlePageChange}
      pageRangeDisplayed={5}
      pageCount={50}
      previousLabel ={
        <span className='w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md mr-4'>
          <BsChevronLeft />
        </span>
      }
      renderOnZeroPageCount={null}
      containerClassName='flex items-center justify-center mt-8 mb-4'
      pageClassName='block border- border-solid border-gray-300 hover:bg-gray-300 w-10 h-10 flex items-center justify-center rounded-md mr-4'
      activeClassName='bg-[#211C6A] text-white'
      />
    </motion.div>
  )
}

export default PaginationButtons