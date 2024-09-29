import { React, useState } from 'react'
import WalletWidget from '../widgets/WalletWidget';
import { generateClient } from 'aws-amplify/api';
import { getWallet } from '../../graphql/queries';
import { createWallet } from '../../graphql/mutations'
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
const client = generateClient();

function HomeScreen() {
    const [walletAddress, setWalletAddress] = useState('');

    



    // 79837291835815236912 // tmp wallet in dynamodb

    return (
        <div className='w-screen p-0'>
            <input
                style={{ textAlign: 'center' }}
                value={walletAddress}
                onChange={e => setWalletAddress(e.target.value)}
            />
            <Link to={`/wallet/${walletAddress}`} className=' no-underline text-black font-[600]'>View Product</Link>
        </div>
    )
}

export default HomeScreen;