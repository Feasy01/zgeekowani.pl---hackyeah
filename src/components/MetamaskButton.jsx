import { useState, useEffect } from "react"
import { switchToTestnetNetwork, addWalletToDatabase } from "../utils/walletFunctions"
import { MetaMaskFox } from "../assets/MetaMask_Fox"
export default function MetamaskButton() {
  const [account, setAccount] = useState(null)
  useEffect(() => {
    getAccount()
  }, [])
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
    catch (err) {
      console.log(err)
    }

  }


  return (
    <div className="flex" style={{ border: '4px solid #5B7FFF', borderRadius: 30, backroundColor: '#F3F1F1', fontSize: 16 }}>
      {account ? <div className="flex items-center rounded-xl bg-gradient-to-br max-w-[200px] border-2 p-2 gap-2">
        <div className="truncate">
          {account}
        </div>
        <div>
          <MetaMaskFox width={40} height={40} />
        </div>
      </div> :
        <button
          onClick={() => getAccount()}
        >
          Connect
        </button>}
    </div>
  );
};