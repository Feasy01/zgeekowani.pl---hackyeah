import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MetamaskButton from './components/MetamaskButton'
import HomeScreen from './components/screens/HomeScreen'

import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

// import 'react-native-gesture-handler';

// import 'react-native-url-polyfill/auto';
// import 'react-native-get-random-values';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';

import WalletVerification from './components/screens/WalletVerification'
import { AiFillWechat } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import AiChat from './components/AiChat'
import BaseTransaction from './components/BaseTransaction'


Amplify.configure(amplifyconfig);

function App() {
  const [address, setAddress] = useState(null)
  const [useChat, setUseChat] = useState(false)

  const [chatPosition, setChatPosition] = useState(-800)

  const toggleChatPosition = () => {
    if (chatPosition === 18) {
      setChatPosition(-800)
      setUseChat(false)
    } else {
      setChatPosition(18)
      setUseChat(true)
    }
  }

  return (
    <BrowserRouter>
      <div className='w-screen'>
        <Navbar />

        <Routes>

          <Route path="/" element={<HomeScreen />} />
          <Route path="/wallet/:walletId" element={<WalletVerification />} />
          <Route path="/baseTransaction/:transactionId" element={<BaseTransaction />} />

        </Routes>

        <div className='fixed' style={{ bottom: chatPosition, right: 80, transition: 'all 0.5s' }}>
          <AiChat />
        </div>
        <button onClick={() => toggleChatPosition()} className='fixed bottom-4 right-3 rounded-full' style={{ padding: 10, border: '3px solid #5B7FFF' }}>
          {useChat ? <IoMdClose size={25} color='#5B7FFF' /> : <AiFillWechat size={25} color='#5B7FFF' />}
        </button>
      </div>
    </BrowserRouter>
  )
}

export default App
