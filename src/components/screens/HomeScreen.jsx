import { React, useState } from 'react'
import WalletWidget from '../widgets/WalletWidget';
import { generateClient } from 'aws-amplify/api';
import { getWallet } from '../../graphql/queries';
import { createWallet } from '../../graphql/mutations'
import { BarLoader } from 'react-spinners'
import Navbar from '../Navbar';
const client = generateClient();

function HomeScreen(props) {
    const [walletAddress, setWalletAddress] = useState('');
    const [searchedWallet, setSearchedWallet] = useState(null);

    const [update, setUpdate] = useState(false);

    async function searchWalletInDatabase(walletAddress) {
        if (walletAddress) {
            setUpdate(true);

            try {
                const result = await client.graphql({
                    query: getWallet,
                    variables: { id: walletAddress },
                    authMode: 'apiKey'
                })

                console.log(result.data.getWallet);
                setSearchedWallet(result.data.getWallet);
            }
            catch (e) {
                console.log(e);
            }
            setUpdate(false);
        }
    }

    // 79837291835815236912 // tmp wallet in dynamodb

    return (
        <div className='w-screen h-screen p-0' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <input
                    style={{ textAlign: 'center', background: 'black', color: 'white', width: "40vw", borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                    value={walletAddress}
                    onChange={e => setWalletAddress(e.target.value)}
                />
                <button style={{ background: 'violet', color: 'white', padding: 10, borderEndEndRadius: 5, borderTopRightRadius: 5 }} onClick={() => searchWalletInDatabase(walletAddress)}>Search</button>
            </div>
            <div className=' h-screen w-screen' style={{ padding: "20%" }}>
                {(searchedWallet !== null && update === false) && <WalletWidget walletInfo={searchedWallet} />}
                {update && <BarLoader />}
            </div>
        </div>
    )
}

export default HomeScreen;