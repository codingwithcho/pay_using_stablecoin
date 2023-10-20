import Web3Modal from 'web3modal'
import constate from 'constate'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { providers } from 'ethers'

//Lastly we use constate to manage our state
export const [LoginProvider, useAuthentication] = constate(
    useLogin,
    value => value.authMethods
)

//Lets create our custom hook 
function useLogin() {
    //Lets use useRef hook to declare or web3modal
    const web3ModalRef = useRef<Web3Modal>()

    //We need to keep track of the following
    const [currentUserWallet, setCurrentUserWallet] = useState("")


    //Lets use a useEffect hook to connect to the blockchain
    useEffect(() => {
        web3ModalRef.current = new Web3Modal({
            network: "mumbai",
            providerOptions: {},
            disableInjectedProvider: false
        })
    }, [])

    // Lets create a function that we can easily use to ensure that our users are signed in.
    const ensureLogin = useCallback(async () => {
        // This function allows us to connect with metamask
        const _accounts: string[] = await window?.ethereum.request({
            method: "eth_requestAccounts"
        })

        if(_accounts !== undefined) {
            setCurrentUserWallet(_accounts[0])
        }
    }, [])

    // Lets create a function to get our web3 signer so we can access our smart contract functions
    const getWeb3Signer = async () => {
        //web3 provider
        const provider = await web3ModalRef.current?.connect()
        const web3Provider = new providers.Web3Provider(provider)

        // we can now use the web3provider to get access to our blockchain
        // Let's get the chain so that we provent users from using a different chain
        const { chainId } = await web3Provider.getNetwork()
        if(chainId !== 80001) { //This is the chain id for polgon mumbai
            window.alert("Please change to polygon mumbai")
            return;
        }

        // Get the signer. signer is use to call the functions in our smart contract
        const signer = web3Provider.getSigner()
        return signer;
    }

    // lets create a local disconnect wallet function
    const disConnectWallet = async () => {
        setCurrentUserWallet("")
    }

    // Lets create a method that we can return and it will contain all our methods we want to export
    const authMethods = useMemo(() => ({
        currentUserWallet,
        getWeb3Signer,
        ensureLogin,
        disConnectWallet
    }),[currentUserWallet, getWeb3Signer, ensureLogin, disConnectWallet])

    return {authMethods};
}