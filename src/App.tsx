import SpinWheel from './components/SpinWheel'
import './App.css'
import { CoffeeMug } from './components/Coffeemug'
import { Plate } from './components/Plate'
import Layout from './Layout'

function App() {
    return (
      
      <Layout> 
        <div className="flex-1 flex items-center justify-center">
            <Plate>
              <CoffeeMug />
            </Plate>       
       </div>
      </Layout>
  )
}

export default App
