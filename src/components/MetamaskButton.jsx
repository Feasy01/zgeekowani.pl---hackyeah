import { useState } from "react"


export default function MetamaskButton(){
  const [account,setAccount] = useState(null)
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
  }

 
 return (
   <div>
     
 
 
     
       {account ? account : <button
         onClick={() => getAccount()}
       >
         Connect
       </button> }
   </div>
 );
};