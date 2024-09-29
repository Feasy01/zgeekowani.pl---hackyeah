import { React, useEffect, useState } from 'react'
import WalletWidget from '../widgets/WalletWidget';
import { generateClient } from 'aws-amplify/api';
import { getWallet } from '../../graphql/queries';
import { createWallet } from '../../graphql/mutations'
import { etherscanLambda } from '../../graphql/queries';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import RatingsChart from '../RatingsChart';
import { Doughnut } from 'react-chartjs-2';
import { Button, Popover, Badge } from 'antd';
import PaymentSelection from '../PaymentSelection';
const client = generateClient();



function WalletVerification() {
    const { walletId } = useParams();
    const [info, setInfo] = useState();
    const [walletAddress, setWalletAddress] = useState(walletId)


    async function searchWalletInDatabase(walletAddress) {
        if (walletAddress) {
            console.log("Searching for wallet: " + walletAddress);


            try {
                const result = await client.graphql({
                    query: etherscanLambda,
                    variables: { address: walletAddress },
                    authMode: 'apiKey'
                })
                let responseString = result.data.etherscanLambda

                const response = JSON.parse(responseString)


                return response
            }
            catch (e) {
                console.log(e);
            }

        }
    }

    useEffect(() => {
        searchWalletInDatabase(walletId).then(response => setInfo(response))


    }, [])


    const handleVerify = () => {
        searchWalletInDatabase(walletAddress).then((r) => setInfo(r))
    }

    // 79837291835815236912 // tmp wallet in dynamodb

    const data = {
        labels: [
            'Good opinions',
            'Bad opinions',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [10, 2],
            backgroundColor: [
                'rgb(54, 162, 0)',
                'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
        }]
    };
    return (
        <div className='flex flex-col w-full items-center p-8 gap-4'>
            <div className='w-1/2 flex items-center justify-between bg-white p-2 px-4 border-2 border-secondary_2 rounded-2xl font-alexandria text-gray-500 text-[18px]'><input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} type='text' className='flex focus:outline-none focus:max-w-full flex-grow truncate max-w-[300px]' /> <button className='flex p-4 px-12 text-white rounded-3xl bg-secondary_2 font-alexandria text-[20px] transition ease-in-out duration-500 hover:scale-105 hover:opacity-85' onClick={handleVerify}>verify</button></div>
            <div className='w-5/6 flex border-2 p-4 px-20 items-center rounded-3xl border-secondary_2 justify-between font-alexandria text-[24px] bg-gray-100'>{info?.address}<div className='bg-secondary_2 p-4 text-white rounded-3xl'> KNF VERIFIED</div> </div>
            <div className='w-5/6 flex gap-4 border-2 p-4 px-20 rounded-3xl border-secondary_2 justify-between font-alexandria text-[24px] flex-grow bg-gray-100'>

                <div className='flex flex-col gap-4'>
                    <div className='flex font-[800]'> Details</div>
                    <div className='flex flex-col text-[22px] w-full gap-2'>
                        <div className='flex gap-4 items-center'>First transaction: <span className='font-[700] text-[26px]'>{info?.first_tx_time}</span></div>
                        <div className='flex gap-4 items-center'>Most recent transaction:<span className='font-[700] text-[26px]'>{info?.last_tx_time}</span></div>
                        <div className='flex gap-4 items-center'>last 30 days' transaction count:<span className='font-[700] text-[26px]'>{info?.num_last_30_days}</span></div>
                        <div className='flex gap-4 items-center'>Total transaction count:<Popover content={info?.num_transactions < 10 ? <div className='flex p-4 text-[20px] flex-col'>Small amount of transactions, potentially a freshly created wallet</div> : null}><span className={`font-[700] text-[26px] ${info?.num_transactions < 10 ? ' text-red-600' : ' '}`}>{info?.num_transactions}</span></Popover></div>
                        <div className='flex gap-4 items-center'>Unique reciepents:<Popover content={info?.num_transactions / info?.num_unique_recipients > 3 ? <div className='flex p-4 text-[20px] flex-col'>Proportion of reciepents to transactions suggests suspicous behaviour</div> : null}><span className={`font-[700] text-[26px] ${info?.num_transactions / info?.num_unique_recipients > 3 ? ' text-red-600' : ' '}`}>{info?.num_unique_recipients}</span></Popover></div>
                        <div className='flex gap-4 items-center'>Unique senders:<span className='font-[700] text-[26px]'>{info?.num_unique_senders}</span></div>
                        <div className='flex gap-4 items-center'>Total value received:<Popover content={info?.total_received < 1 ? <div className='flex p-4 text-[20px] flex-col'>Low total ammount received, suggests a freshly created wallet</div> : null}><span className={`font-[700] text-[26px] ${info?.total_received < 1 ? ' text-red-600' : ' '}`}>{info?.total_received}</span></Popover></div>
                        <div className='flex gap-4 items-center'>Total value sent:<span className='font-[700] text-[26px]'>{info?.total_sent} ETH</span></div>
                    </div>
                </div>

                <div className='flex flex-grow items-center justify-center max-h-[400px]'><Doughnut data={data} /></div>
            </div>

            <PaymentSelection walletId={walletId} />

        </div>
    )
}

export default WalletVerification;