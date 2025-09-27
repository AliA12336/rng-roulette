import SpinWheel from './SpinWheel'
import './App.css'
import { CoffeeMug } from './components/Coffeemug'
import { Plate } from './components/Plate'
import Layout from './Layout'

function App() {
    return (
      
      <Layout> 
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <h1>Spin the Wheel!</h1>
            <Plate>
              <CoffeeMug />
            </Plate>       
       </div>
      </Layout>
  )
}

export default App
