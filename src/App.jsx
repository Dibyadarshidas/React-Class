
import './index.css'
import { Navigation } from './component/Navigation.jsx';
import { MyRouter } from './routes.jsx';




function App() {

  //const [isSubmitted, setIsSubmitted] = useState(false);






  return (
    <div className="page">
      <Navigation />
      <main>
        <MyRouter />
      </main>
    </div>
  )
}

export default App
