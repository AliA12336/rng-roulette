import './App.css'
import { CoffeeMug } from './components/Coffeemug'
import { Plate } from './components/Plate'
import Layout from './Layout'

function App() {
    return (
        <Layout> 
          <div style={{ width: '80vw', maxWidth: '580px', maxHeight: '80vw', margin: '0 auto', overflow: 'auto' }}>
          <div className="flex items-center justify-center w-full">
              <Plate>
                <CoffeeMug />
              </Plate>       
        </div>
        </div>
        </Layout>
  )
}

export default App
