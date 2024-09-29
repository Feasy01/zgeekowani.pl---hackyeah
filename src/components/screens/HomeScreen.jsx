import { React, useState } from 'react'
import WalletWidget from '../widgets/WalletWidget';
import { generateClient } from 'aws-amplify/api';
import { getWallet } from '../../graphql/queries';
import { createWallet } from '../../graphql/mutations'
import { BarLoader } from 'react-spinners'
import Navbar from '../Navbar';
const client = generateClient();

function HomeScreen(props) {
    const [walletAddress, setWalletAddress] = useState('Enter the wallet or Authoreum transaction number');
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
            <div className='w-screen' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: '50vh' }}>
                {(searchedWallet !== null && update === false) && <WalletWidget walletInfo={searchedWallet} />}
                {update && <BarLoader />}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', fontWeight: 'bold', fontSize: 48, fontFamily: 'Roboto' }}>
                    <p>Make your crypto transactions more </p>&nbsp;
                    <p>
                        secure
                    </p>
                    <p>.</p>
                </div>

                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', fontWeight: 'bold', alignItems: 'center',
                    background: 'linear-gradient(150deg, rgba(151,170,242,1) 0%, rgba(91,127,255,1) 26%, rgba(126,65,175,1) 65%, rgba(111,44,165,1) 100%)',
                    height: 200, width: "40vw", borderRadius: 30, fontSize: 28, color: '#F3F1F1', alignSelf: 'center', justifySelf: 'center'
                }}>
                    <p style={{ padding: 0, margin: 0 }}>With Authoreum you can verify <b>credibility</b> and</p>
                    <p style={{ padding: 0, margin: 0 }}>declared ownership</p>
                    <p style={{ padding: 0, margin: 0 }}>of cryptocurrency wallets and ensure the <b>safety</b> of your</p>
                    <p style={{ padding: 0, margin: 0 }}> transactions.</p>
                </div>

                <div style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '4px solid #5B7FFF', borderRadius: 10, width: '35vw', height: '5vh', padding: 5 }}>
                    <input
                        className='outline-none'
                        style={{ textAlign: 'center', color: '#565E79', fontSize: 18, width: "30vw", borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderStyle: 'none' }}
                        value={walletAddress}
                        onChange={e => setWalletAddress(e.target.value)}
                    />
                    <button style={{ background: '#5B7FFF', color: 'white', fontSize: 20, borderRadius: 25, borderStyle: 'none', width: '10vw', height: '5vh' }} onClick={() => searchWalletInDatabase(walletAddress)}>Verify</button>
                </div>
            </div>
        </div >
    )
}

export default HomeScreen;