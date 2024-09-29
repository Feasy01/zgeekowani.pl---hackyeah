import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MetamaskButton from './components/MetamaskButton'
import HomeScreen from './components/screens/HomeScreen'
import { FloatButton } from 'antd'

// import 'react-native-gesture-handler';

// import 'react-native-url-polyfill/auto';
// import 'react-native-get-random-values';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
import { AiFillWechat } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import AiChat from './components/AiChat'

Amplify.configure(amplifyconfig);

function App() {
  const [useChat, setUseChat] = useState(false)

  return (
    <div className='w-screen overflow-hidden'>
      <HomeScreen />

      {useChat &&
        <div className='fixed bottom-40 right-20'>
          <AiChat />
        </div>
      }
      <button onClick={() => setUseChat(!useChat)} className='fixed bottom-20 right-20 rounded-full' style={{ padding: 15, border: '4px solid #5B7FFF' }}>
        {useChat ? <IoMdClose size={50} color='#5B7FFF' /> : <AiFillWechat size={50} color='#5B7FFF' />}
      </button>
    </div>
  )
}

export default App
