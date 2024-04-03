import React from "react";
import enzo from "../Assets/dev1.jpg";
import david from "../Assets/dev2.jpg";
import jb from "../Assets/dev3.jpg";
import yul from "../Assets/dev4.jpg";

const DevPage = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <div className='flex items-center justify-center flex-col h-[100px] bg-[#EFEFEF]'>
                <h1 className='text-[#211C6A] font-extrabold mt-[30px] mb-12 text-[30px] md:text-[50px] sm:text-[40px]'>MEET THE TEAM OF T1</h1>
            </div>
            <table style={{ margin: "auto", borderCollapse: "collapse" }}>
                <tr>
                    <td style={{ padding: "10px", paddingTop: "20px" }}>
                        <img 
                            src={enzo}
                            alt="Enzo Image"
                            style={{ width: "200px", height: "200px" }} // Adjust the width and height as needed
                        />
                    </td>
                    <td style={{ padding: "10px", paddingTop: "20px" }}>
                        <img 
                            src={david}
                            alt="David Image"
                            style={{ width: "200px", height: "200px" }} // Adjust the width and height as needed
                        />
                    </td>
                    <td style={{ padding: "10px", paddingTop: "20px" }}>
                        <img 
                            src={jb}
                            alt="JB Image"
                            style={{ width: "200px", height: "200px" }} // Adjust the width and height as needed
                        />
                    </td>
                    <td style={{ padding: "10px", paddingTop: "20px" }}>
                        <img 
                            src={yul}
                            alt="Yul Image"
                            style={{ width: "200px", height: "200px" }} // Adjust the width and height as needed
                        />
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "10px" }}>Lorenzo M. Sypio</td>
                    <td style={{ padding: "10px" }}>David C. Linao</td>
                    <td style={{ padding: "10px" }}>JB Vhert Moya</td>
                    <td style={{ padding: "10px" }}>Yul Guiller Q. Canlas</td>
                </tr>
            </table>
        </div>
    );
}

export default DevPage;
