import React from "react";

const AboutPage = () => {
    return (
        <div className="w-[1100px] mx-auto ">
            <div className="flex items-center justify-center flex-col h-[55 0px]">
                <h1 className="text-[#211C6A] font-extrabold mt-[30px] mb-12 text-[30px] md:text-[50px] sm:text-[40px]">
                    ABOUT
                </h1>

                <div className="paragraph-container text-center">
                    <p style={{ margin: "0px 100px" }}>
                        TUP Merch Co. is an Ecommerce site that aims to
                        digitalize the process of selling merchandises of the
                        accredited organizations of Technological University of
                        the Philippines - Manila. TUP Merch Co. also aims to
                        promote the school and the school organizations itself
                        by selling goods not just for bonafied students but also
                        provide quality goods nationwide.
                    </p>

                    <p style={{ margin: "30px 100px" }}>
                        TUP Merch Co. is founded by T1, a group of Computer
                        Science Students at Technological University of the
                        Philippines. The primary goal of T1 is to bring
                        traditional methods into digitalized method to ensure
                        less hassle transaction for consumers and accessible to
                        everyone and bypass long transaction methods.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
