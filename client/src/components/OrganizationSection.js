import React from 'react'
import SampleLogo from '../OrganizationAssets/SampleLogo.png'
import BGTUP from '../OrganizationAssets/TUPBG.jpg'
import { useNavigate } from 'react-router-dom';

const OrganizationSection = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the desired route
        navigate('/');
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

            <div className='text-white bg-[#EFEFEF] h-screen select-none'>

            </div>

        </div>


    )
}

export default OrganizationSection