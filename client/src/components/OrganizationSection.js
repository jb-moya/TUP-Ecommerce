import React from 'react'
import ListItem from '../components/ItemsList'
import SampleLogo from '../OrganizationAssets/SampleLogo.png'
import BGTUP from '../OrganizationAssets/TUPBG.jpg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const OrganizationSection = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the desired route
        navigate('/');
    };

    const [clickedButton, setClickedButton] = useState(0);

    const buttonClicked = (index) => {
        setClickedButton(index);
    };

    return (
        <div>
            <div className='text-white bg-black h-screen select-none'>
                {/* content */}
                <div className="flex w-full h-screen max-w-[1300px] mx-auto select-none items-center z-10 relative pt-[50px]">

                    <img
                        className='w-[350px] h-[350px]'
                        src={SampleLogo}
                        alt=''
                        loading='lazy'
                    />

                    <div className='flex flex-col justify-center items-center w-[560px] h-[350px] pl-4'>
                        <div className='flex flex-col items-center justify-center w-full text-center p-2'>
                            <h2 className='font-bold text-4xl w-full'>TUP GRAYHAWKS ROBOTICS</h2>
                            <h1 className=' text-[95px] leading-[80px] font-bold w-full '>GRAYBOTS</h1>
                            <p className='text-justify px-4 pt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam sit amet nisl hendrerit blandit et et quam. Curabitur volutpat ultricies odio non tincidunt. <br />  <br />
                                Nunc et eros a sapien eleifend porttitor et ut enim. Aliquam sapien lacus, suscipit vel odio non, ullamcorper venenatis elit.</p>
                        </div>

                        <div className='flex items-center justify-center w-[350px] mt-2'>
                            <button
                                onClick={handleClick}
                                className='rounded-xl text-white mt-4 hover:bg-[#5DBAFF] font-semibold bg-[#9180E5]  w-[130px] h-[40px] text-center mx-auto'>
                                Message
                            </button>
                            <button
                                onClick={handleClick}
                                className='rounded-xl text-white mt-4 hover:bg-[#5DBAFF] font-semibold bg-[#9180E5]  w-[130px] h-[40px] text-center mx-auto'>
                                Follow
                            </button>

                        </div>
                    </div>
                </div>

                <div class=" absolute pt-[96px] top-0 left-0 w-[1350px] h-screen bg-[#211C6A] rounded-r-full z-[1] "></div>
                <img
                    className='absolute top-0 right-0 z-0 opacity-50 h-screen'
                    src={BGTUP}
                    alt=''
                    loading='lazy'
                />

            </div>

            <div className='flex flex-col text-[#211C6A] bg-[#EFEFEF] h-screen mx-auto max-w-[1300px]'>
          
            <ul className='flex text-[30px] font-bold w-full justify-center h-[70px] mt-[40px]'>
                    <li className='p-4 mx-[60px]'>
                        <button
                            className={`text-${clickedButton === 0 ? 'blue' : 'gray'}-500 transform ${clickedButton === 0 ? 'scale-110' : ''} duration-300 ease-in-out`}
                            onClick={() => buttonClicked(0)}
                        >
                            TOP SALES!
                        </button>
                        
                    </li>
                    <li className='p-4 mx-[60px]'>
                        <button
                            className={`text-${clickedButton === 1 ? 'blue' : 'gray'}-500 transform ${clickedButton === 1 ? 'scale-110' : ''}  duration-300 ease-in-out`}
                            onClick={() => buttonClicked(1)}
                        >
                            NEW MERCH!
                        </button>
                    </li>
                    <li className='p-4 mx-[60px]'>
                        <button
                            className={`text-${clickedButton === 2 ? 'blue' : 'gray'}-500 transform ${clickedButton === 2 ? 'scale-110' : ''}  duration-300 ease-in-out`}
                            onClick={() => buttonClicked(2)}
                        >
                            ALL MERCH!
                        </button>
                    </li>
                </ul>

            {clickedButton === 0 && (
            <ListItem />
            )}
            {clickedButton === 1 && (
                <div>Wala pa</div>
            )}
            {clickedButton === 2 && (
                 <div>Wala pa</div>
            )}


            </div>

        </div>


    )
}

export default OrganizationSection