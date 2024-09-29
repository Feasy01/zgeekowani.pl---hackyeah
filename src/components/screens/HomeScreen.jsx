import { React, useState } from 'react'
import WalletWidget from '../widgets/WalletWidget';
import { generateClient } from 'aws-amplify/api';
import { getWallet } from '../../graphql/queries';
import { createWallet } from '../../graphql/mutations'
import { BarLoader } from 'react-spinners'
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
const client = generateClient();

function HomeScreen(props) {
    const [walletAddress, setWalletAddress] = useState();
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

        <div className='w-screen h-screen p-0 justify-center'  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='w-screen h-full gap-20' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '70vh' }}>
                {(searchedWallet !== null && update === false) && <WalletWidget walletInfo={searchedWallet} />}
                {update && <BarLoader />}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', fontWeight: 'bold', fontSize: 48, fontFamily: 'Roboto' }}>
                    <p>Make your <span className='text-secondary_3'>crypto</span> transactions more </p>&nbsp;
                    <p className=' text-secondary_3'>
                        secure
                    </p>
                    <p>.</p>
                </div>

                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    
                    height: 250, width: "50vw", borderRadius: 30, fontSize: 28, color: '#F3F1F1', alignSelf: 'center', justifySelf: 'center'
                }} className='bg-gradient-to-br font-[500] from-gradient_1 via-gradient_2 to-gradient_4 transition duration-500 hover:scale-105 hover:cursor-pointer items-center p-16 text-center'>
                   <span>With Authoreum you can verify <span className='font-[900]'>credibility</span> and declared ownership
                   of cryptocurrency wallets and ensure the <span className='font-[900]'>safety</span> of your transactions.</span>
                </div>

                <div style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '4px solid #5B7FFF', borderRadius: 10, width: '35vw', height: '5vh', padding: 5 }}>
                  
                  <input
                        className='outline-none'
                        placeholder='Enter the wallet or Authoreum transaction number'
                        style={{ textAlign: 'center', color: '#565E79', fontSize: 18, width: "30vw", borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderStyle: 'none' }}
                        value={walletAddress}
                        onChange={e => setWalletAddress(e.target.value)}
                    />
                   <Link to={`/wallet/${walletAddress}`} className=' no-underline text-black font-[600]'>Verify</Link>  
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;