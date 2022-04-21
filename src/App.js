import { useState } from 'react'
import './styles/App.css'
import KanyeQuote from './components/KanyeQuote'

const App = () => {
  const [displayQuote, setDisplayQuote] = useState(false)

  const toggleQuotes = () => {
    displayQuote ? setDisplayQuote(false) : setDisplayQuote(true)
  }

  return (
    <div className="App">
      <header className="kanye-header"></header>
      <main>
        <div className="quote-container">
          <h1>Kanye Quotes</h1>
          {displayQuote ? (
            <KanyeQuote displayQuote={displayQuote} />
          ) : (
            <h2>Need some inspiration? See what Kanye thinks.</h2>
          )}
        </div>
        <button onClick={toggleQuotes}>
          {displayQuote ? 'Clear Quote' : 'New Quote'}
        </button>
      </main>
    </div>
  )
}

export default App
