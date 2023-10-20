import userPic from '/user.svg'
import handWave from '/hand.svg'
import { useAuthentication } from '../web3'
import { useEffect } from 'react'
import { ethers } from 'ethers'
import { Payment_Contract_ABI, Payment_Contract_Address, Token_Contract_ABI, Token_Contract_Address } from '../constants'

export const Home = () => {
    const {currentUserWallet, ensureLogin, disConnectWallet, getWeb3Signer} = useAuthentication()

    useEffect(() => {
        const checkForSignIn = async () => {
            await ensureLogin();
        }

        checkForSignIn()

    }, [ensureLogin])

    const onSignIn = async () => {
        await ensureLogin()
    }

    const onSignOut = async () => {
        await disConnectWallet()
    }

    const onPayWithStableCoin = async () => {
        const signer = await getWeb3Signer()
        const paymentSigner = new ethers.Contract(Payment_Contract_Address, Payment_Contract_ABI, signer)
        const stableCoinSigner  = new ethers.Contract(Token_Contract_Address, Token_Contract_ABI, signer)

        // we have to call the approve function so as to provide our users a means of approving our smart contract to spend x amoun from their wallet
        // lets hard code a price of 5 token

        // approve takes the contract address that will be the spender, the maximum amount to be spent
        const approveTxn = await stableCoinSigner.approve(Payment_Contract_Address, ethers.utils.parseEther("5"))
        await approveTxn.wait()

        // write the contract to pay x amount of token
        // don't forget to sent the token as allowed
        const paymentTxn = await paymentSigner.depositPayment(Token_Contract_Address, import.meta.env.VITE_OWNER_WALLET, ethers.utils.parseEther("5"))
        await paymentTxn.wait()

        alert("Paid successfully")
    }

    return(
        <div className="w-full h-screen flex flex-col items-center">
            <div className="mt-5 border-solid border-2 border-gray-300 h-96 px-20">
            <div className="font-semibold text-xl my-4 text-gray-700">
                <p>Using stable coins as a means of payment in your dapp</p>
            </div>
                {!currentUserWallet ? (<>
                    <div className="pt-3 flex">
                        <p>You are currently not signed it. Please connect your wallet</p>
                        <button onClick={() => onSignIn()} className="ml-3 px-3 border-2 border-solid rounded-full font-semibold bg-blue-400 text-white hover:border-blue-400 hover:text-blue-400 hover:bg-transparent">Connect wallet</button>
                    </div>
                </>) : (<>
                    <div className='flex justify-between'>
                        <div className='flex gap-2 items-center w-fit'>
                            <picture className="w-14 h-14 relative rounded-full inline-block">
                                <img src={userPic} alt="user picture" className= " absolute top-1/3 left-1/4  rounded-full" />
                            </picture>
                            <p className="flex gap-1">
                                <span>Hello</span>
                                <img src={handWave} alt="hand wave" />
                            </p>
                        </div>
                        <div>
                            <button onClick={() => onSignOut()} className="mt-4 px-3 border-2 border-solid rounded-full font-semibold bg-blue-400 text-white hover:border-blue-400 hover:text-blue-400 hover:bg-transparent">
                                {currentUserWallet.slice(0,8) + "..." + currentUserWallet.slice(36, 42)}
                            </button>
                        </div>
                    </div>
                </>)}
                
                <div>
                    <button onClick={onPayWithStableCoin} className='mb-5 px-3 border-2 border-solid rounded-full font-semibold bg-green-400 text-white hover:border-green-400 hover:text-green-400 hover:bg-transparent'>Pay with stable coin</button>
                </div>
            </div>
        </div>
    )
}