import { React, useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api';
import { etherscanLambda } from '../../graphql/queries';

const client = generateClient();

function WalletWidget(props) {
    const [walletAddress, setWalletAddress] = useState('');

    async function scanWalletWithEtherscan(address) {
        try {
            const response = await client.graphql({
                query: etherscanLambda,
                variables: { address: address },
                authMode: 'apiKey'
            })

            console.log(response)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        scanWalletWithEtherscan(props.walletInfo.id);
    })

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <p style={{ border: '1px solid black', padding: 10, }}>
                    {props.walletInfo.name}
                </p>
                <hr style={{
                    width: '30vw',
                    marginLeft: '1vw',
                    marginRight: '1vw',
                }} />
                <p style={{ border: '1px solid black', padding: 10, }}>
                    {"ocena rzet"}
                </p>

            </div>


        </div >
    )
}

export default WalletWidget;
