import { useState } from 'react';
import { ethers } from 'ethers';

const useMetaMaskWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletError, setWalletError] = useState(null);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts',  
 []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);  


            } else {
                setWalletError('Please install MetaMask');
            }
        } catch (error) {
            setWalletError(error.message);
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(null);
    };

    return { connectWallet, disconnectWallet, walletAddress, walletError };
};

export default useMetaMaskWallet;

