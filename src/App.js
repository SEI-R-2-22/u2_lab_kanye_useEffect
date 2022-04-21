import { useState } from 'react'
import './styles/App.css'

const App = () => {
  const [displayQuote, setDisplayQuote] = useState(false)

  const toggleQuotes = () => {

  }

  return (
    <div className="App">
      <header className="kanye-header"></header>
      <main>
        <div className="quote-container">
          <h2>Need some inspiration? See what Kanye thinks.</h2>
        </div>
        <button>New Quote</button>
      </main>
    </div>
  )
}

export default App
