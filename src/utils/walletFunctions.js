import { generateClient } from 'aws-amplify/api';
import { createWallet } from '../graphql/mutations'

const client = generateClient();

async function addWalletToDatabase(address) {
    if (address)
        console.log("Searching for wallet: " + address)

    try {
        const result = await client.graphql({
            query: createWallet,
            variables: {
                input: {
                    id: address
                }
            }

        })

        console.log(result)
    }
    catch (err){
        console.log(err)
    }
}

async function  switchToTestnetNetwork(){
    await window.ethereum.request({
        "method": "wallet_switchEthereumChain",
        "params": [
         {
           chainId: "0xaa36a7"
         }
       ],
       });
}

export {addWalletToDatabase, switchToTestnetNetwork}