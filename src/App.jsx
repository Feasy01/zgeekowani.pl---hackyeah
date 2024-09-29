import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MetamaskButton from './components/MetamaskButton'
import HomeScreen from './components/screens/HomeScreen'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
// import 'react-native-gesture-handler';

// import 'react-native-url-polyfill/auto';
// import 'react-native-get-random-values';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
import WalletVerification from './components/screens/WalletVerification'

Amplify.configure(amplifyconfig);

function App() {
  const [address,setAddress] = useState(null)


  return (
      <BrowserRouter>
    <div className='w-screen'>
    <Navbar />

      <Routes>

        <Route path="/" element={<HomeScreen/>} />
        <Route path="/wallet/:walletId" element={<WalletVerification/>}/>
      </Routes>
    </div>

    </BrowserRouter>
  )
}

export default App
