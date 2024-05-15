import { Link } from "react-router-dom";
import { TbMoodSadSquint } from "react-icons/tb";

const Error = () => {
    return (
        <div className="flex w-full max-h-vh bg-slate-400">
            <div className="m-auto text-center">
                <TbMoodSadSquint className="text-9xl text-[#211c6a]"/>
                <h3>Ohh! YOU ARE NOT ALLOWED TO ACCESS THIS PAGE</h3>
                <p>BASTA LANG... BAWAL EH SORRY</p>
                <Link to="/">back home</Link>
            </div>
        </div>
    );
};
export default Error;
