import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MetamaskButton from './components/MetamaskButton'
import HomeScreen from './components/screens/HomeScreen'

// import 'react-native-gesture-handler';

// import 'react-native-url-polyfill/auto';
// import 'react-native-get-random-values';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen overflow-hidden'>
      <HomeScreen />
    </div>
  )
}

export default App
