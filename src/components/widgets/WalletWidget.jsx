import { React, useState } from 'react'

function WalletWidget(props) {
    const [walletAddress, setWalletAddress] = useState('');

    function searchWalletInDatabase(walletAddress) {
        if (walletAddress) {
            console.log("Searching for wallet: " + walletAddress);
        }
    }

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

export default WalletWidget;