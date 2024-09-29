import MetamaskButton from "./MetamaskButton";
import { Button } from "antd";
export default function Navbar(){

    return(
        <div className="flex justify-between p-2">
            <div>LOGO</div>
            <MetamaskButton/>


        </div>
    )

}