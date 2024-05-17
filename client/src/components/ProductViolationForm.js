import React, {useState} from 'react'

export const ProductViolationForm = () => {

    const [formData, setFormData] = useState({
        productName: "Tshirt Ni Gaspar",
        sellerName: "Juan Dela Cruz",
        violationType: "",
        description: "",
        suggestion: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className='flex flex-col p-4'>
            <h1 className='text-2xl font-bold mb-4'>Product Violation Form</h1>
            <div className='flex flex-col'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <div className='w-full mx-2 flex-1'> {/*  PRODUCT NAME */}
                            <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                                Product Name
                            </div>
                            <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
                                <input
                                    value={formData.productName}
                                    name="productName"
                                    onChange={handleChange}
                                    className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
                                />
                            </div>
                        </div>
                        <div className='w-full mx-2 flex-1'> {/*  SELLER NAME */}
                            <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                                Seller Name
                            </div>
                            <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
                                <input
                                    value="Juan Dela Cruz"
                                    name="sellerName"
                                    className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
                                />
                            </div>
                        </div>

                        <div className='w-full mx-2 flex-1'> {/*  Violation Type*/}
                            <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                                Violation Type
                            </div>
                            <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
                                <input
                                    value=""
                                    name="violationType"
                                    placeholder='Input Violation Type'
                                    className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
                                />
                            </div>
                        </div>


                        <div className='w-full mx-2 flex-1'> {/*  VIOLATION REASON */}
                            <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                                Violation Reason
                            </div>
                            <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
                                <textarea
                                    value=""
                                    name="description"
                                    placeholder='Enter here...'
                                    className='p-1 px-2 appearance-none outline-none w-full h-[100px] text-gray-800'
                                />
                            </div>
                        </div>

                        <div className='w-full mx-2 flex-1'> {/*  SUGGESTION */}
                            <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                                Suggestion
                            </div>
                            <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
                                <textarea
                                    value=""
                                    name="description"
                                    placeholder='Enter here...'
                                    className='p-1 px-2 appearance-none outline-none w-full h-[100px] text-gray-800'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex  justify-center mt-8'>
                        <button
                            type="submit"
                            className='bg-[#211C6A] text-white uppercase py-2 px-4 w-[200px] mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out'>
                            Submit
                        </button>
                    </div>
                </form>

            </div>

        </div>
    )
}
