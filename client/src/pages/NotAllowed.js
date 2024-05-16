import { Link } from "react-router-dom";
import { TbMoodSadSquint } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="flex bg-[#211C6A] h-full w-full ">

             <div className="flex flex-col mx-auto items-center h-screen text-white max-w-[1000px]">
                <div className="flex flex-col justify-center items-center text-center">
                    <div className="font-bold border-b-2 px-4 py-2 w-[200px]">
                        403 . RESTRICTED
                    </div>
                </div>

                <div className="mt-16 w-[800px] items-center flex flex-col justify-center">
                    <TbMoodSadSquint size={300}/>
                    <h1 className="text-5xl mt-6">You are not supposed to be <strong>HERE</strong></h1>
                    <p className="text-sm font-light mt-6">Make sure you typed the correct url. You are being redirected to home page in 20 seconds</p>
                </div>

                <button onClick={handleGoBack} className="border border-white flex justify-center items-center mt-16 hover:bg-white hover:bg-opacity-75 transition ease-in-out duration-300 p-4 w-[300px]">
                    Go to Home Page
                </button>

            </div> 
        </div>
      
    );
};
export default Error;
