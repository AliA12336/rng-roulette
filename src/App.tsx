import './App.css'
import { CoffeeMug } from './components/Coffeemug'
import { Plate } from './components/Plate'
import { ChoicesProvider } from './hooks/ChoicesContext'
import Layout from './Layout'

function App() {
    return (
      <ChoicesProvider>
        <Layout> 
          <div className="flex-1 flex items-center justify-center">
              <Plate>
                <CoffeeMug />
              </Plate>       
        </div>
        </Layout>
      </ChoicesProvider>
  )
}

export default App
