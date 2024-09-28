import MetamaskButton from "./MetamaskButton";

export default function Navbar(){

    return(
        <div className="flex w-full h-24 justify-between">
            <div>LOGO</div>
            <div><MetamaskButton/></div>
        </div>
    )

}