import SpinWheel from './SpinWheel'
import './App.css'
import { CoffeeMug } from './components/Coffeemug'
import { Plate } from './components/Plate'

function App() {
    return (
      <div className="App">
        <h1>Spin the Wheel!</h1>
        <Plate>
         <CoffeeMug />
        </Plate>       
      </div>
  )
}

export default App
