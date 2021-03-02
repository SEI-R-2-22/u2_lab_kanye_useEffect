import React, { useState } from 'react';
import './styles/App.css';

function App() {
  const [displayQuote, setDisplayQuote] = useState(false);

  const toggleQuotes = () => {
   
  }

  return (
    <div className="App">
      <header className="kanye-header"></header>
      <main>
        <div className="quote-container">
          <h1>Kanye Quotes</h1>
          <h2>Need some inspiration? See what Kanye thinks.</h2>
        </div>
        <button >New Quote</button>
      </main>
    </div>
  );
}

export default App;
