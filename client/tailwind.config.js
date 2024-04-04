// /** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Poppins"],
            mono: ["Inconsolata", "monospace"],
        },
        extend: {
            boxShadow: {
                down: "0px -3.9px 2.2px rgba(0, 0, 0, 0.05),0px -9.3px 5.3px rgba(0, 0, 0, 0.036),0px -17.5px 10px rgba(0, 0, 0, 0.03),0px -31.3px 17.9px rgba(0, 0, 0, 0.025),0px -58.5px 33.4px rgba(0, 0, 0, 0.02),0px -140px 80px rgba(0, 0, 0, 0.014)",
            },
        },
    },
    plugins: [],
};
