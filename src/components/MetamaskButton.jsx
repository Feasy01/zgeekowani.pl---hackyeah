import { useState,useEffect } from "react"
import { switchToTestnetNetwork, addWalletToDatabase } from "../utils/walletFunctions"
import {MetaMaskFox} from "../assets/MetaMask_Fox"
export default function MetamaskButton(){
  const [account,setAccount] = useState(null)
  useEffect(()=>{
    getAccount()
  },[])
  async function getAccount() {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.")
        } else {
          console.error(err)
        }
      })
    const account = accounts[0]
    setAccount(account)
    await switchToTestnetNetwork()
    try {
      await addWalletToDatabase(account)
    }
    catch(err)
    {
      console.log(err)
    }

  }

 
 return (
   <div className="flex">
     
 
 
     
       {account ? <div className="flex items-center rounded-xl bg-gradient-to-br max-w-[200px] from-green-400 to-green-600 border-2 border-secondary_2 p-2 gap-2"><div><MetaMaskFox width={40} height={40}/></div><div className="truncate">{account}</div></div> : <button
         onClick={() => getAccount()}
       >
         Connect
       </button> }
   </div>
 );
};