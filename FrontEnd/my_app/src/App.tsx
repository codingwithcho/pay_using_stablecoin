import './App.css'
import { Home } from './home/home'
import { LoginProvider } from './web3'

function App() {
  return (
    <LoginProvider>
      <Home />
    </LoginProvider>
  )
}

export default App
