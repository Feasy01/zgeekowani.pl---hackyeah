import MetamaskButton from "./MetamaskButton";
import { Button } from "antd";
import logo from '../assets/logo.png';
import { TiHome } from "react-icons/ti";

export default function Navbar() {

    return (
        <div className="flex justify-between w-full p-2">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logo} alt="logo" style={{ width: 80, height: 100, padding: '1vw' }} />
                <p style={{ fontSize: 36 }}>authoreum</p>
            </div>

            <div className="gap-10" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <MetamaskButton />
                <button style={{ border: '4px solid #5B7FFF', borderRadius: 30, backroundColor: '#F3F1F1', padding: 22, fontSize: 16 }}>Get Started</button>
                <TiHome size={50} color="#5B7FFF" style={{ marginRight: 40 }} />
            </div>
        </div>
    )

}