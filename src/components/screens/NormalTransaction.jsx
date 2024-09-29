import { useState } from "react";
import { useParams } from "react-router-dom"


async function handlePrzelew(gdzie,ile) {
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
    
     
    



          console.log("gdzie:",gdzie)
          console.log("from:",account)

          console.log("ile:",ile)

          const weiAmount = BigInt(ile * 10 ** 18); 
          console.log("ile (Wei):", weiAmount.toString(16));


    const przelew = await window.ethereum
      .request({
        "method": "eth_sendTransaction",
        "params": [
         {
           to: gdzie,
           from: account,
           gas: "0x76c0",
           value: weiAmount.toString(16),
           data: "0x",
           gasPrice: "0x4a817c800"
         }
       ],
       })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.")
        } else {
          console.error(err)
        }
      })

  }

export default function NormalTransaction(){
    const { walletId } = useParams();
    const [ammount,setAmmount] = useState()


    return(

        <div className="flex flex-col w-full items-center justify-center">
            <div className="w-5/6 p-8 flex flex-col gap-8">
            <div className="p-6 pb-20 border-4 border-secondary_2 rounded-3xl flex flex-col gap-4"><span className="text-[18px] ">Wallet address:</span> <span className="text-[24px]">{walletId}</span></div>
            <div className="p-6 pb-20 border-4 border-secondary_2 rounded-3xl flex flex-col gap-4"><span className="text-[18px] ">Ammount to send:</span> <input value={ammount} onChange={(t)=>setAmmount(t.target.value)} className="border-2 border-gray-200 max-w-[200px] text-[24px] bg-inherit"></input></div>
            
            <div className="text-[32px] text-alexandria"> Is the provided information correct? </div>
            <div className="w-full flex justify-end"> <div className="p-8 px-16 flex rounded-3xl text-[32px] font-[900] text-alexandria text-white bg-gradient-to-br from-gradient_1 via-gradient_2 to-gradient_4 transition duration-300 hover:cursor-pointer hover:scale-105 " onClick={()=>handlePrzelew(walletId,ammount)}>Yes, proceed</div></div>
</div>
        </div>
    )
}