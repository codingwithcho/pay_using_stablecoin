import userPic from '/user.svg'
import handWave from '/hand.svg'
import { useAuthentication } from '../web3'
import { useEffect } from 'react'

export const Home = () => {
    const {currentUserWallet, ensureLogin, disConnectWallet} = useAuthentication()

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
                    <button className='mb-5 px-3 border-2 border-solid rounded-full font-semibold bg-green-400 text-white hover:border-green-400 hover:text-green-400 hover:bg-transparent'>Pay with stable coin</button>
                </div>
            </div>
        </div>
    )
}