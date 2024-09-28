import { React, useState } from 'react'
import WalletWidget from '../widgets/WalletWidget';
import { generateClient } from 'aws-amplify/api';
import { getWallet } from '../../graphql/queries';
import { createWallet } from '../../graphql/mutations'
import Navbar from '../Navbar';
const client = generateClient();

function HomeScreen(props) {
    const [walletAddress, setWalletAddress] = useState('');

    async function searchWalletInDatabase(walletAddress) {
        if (walletAddress) {
            console.log("Searching for wallet: " + walletAddress);


            try {
                const result = await client.graphql({
                    query: getWallet,
                    variables: { id: walletAddress },
                    authMode: 'apiKey'
                })

                console.log(result.data);
            }
            catch (e) {
                console.log(e);
            }

        }
    }



    // 79837291835815236912 // tmp wallet in dynamodb

    return (
        <div className='w-screen h-screen p-0'>
            <Navbar />
            <input
                style={{ textAlign: 'center' }}
                value={walletAddress}
                onChange={e => setWalletAddress(e.target.value)}
            />
            <button onClick={() => searchWalletInDatabase(walletAddress)}>Search</button>
        </div>
    )
}

export default HomeScreen;