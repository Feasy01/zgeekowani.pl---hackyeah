import detectEthereumProvider from "@metamask/detect-provider"

async function setup() {
  const provider = await detectEthereumProvider()

  if (provider && provider === window.ethereum) {
    console.log("MetaMask is available!")
    startApp(provider)
  } else {
    console.log("Please install MetaMask!")
  }
}

function startApp(provider) {
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?")
  }
}

window.addEventListener("load", setup)
const chainId = await window.ethereum.request({ method: "eth_chainId" })
window.ethereum.on("chainChanged", handleChainChanged)
function handleChainChanged(chainId) {
  window.location.reload()
}