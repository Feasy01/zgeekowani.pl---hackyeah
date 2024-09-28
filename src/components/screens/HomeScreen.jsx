import { React, useState } from 'react'
import WalletWidget from '../widgets/WalletWidget';
import { generateClient } from 'aws-amplify/api';
import { getWallet } from '../../graphql/queries';
import { createWallet } from '../../graphql/mutations'

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

    async function addWalletToDatabase(address) {
        if (walletAddress)
            console.log("Searching for wallet: " + walletAddress)

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
        catch {

        }
    }

    // 42639485740295748593850385759374 // tmp wallet in dynamodb

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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