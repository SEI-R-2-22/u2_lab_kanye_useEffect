import { useState, useEffect } from 'react'
import axios from 'axios'

const KanyeQuote = ({ displayQuote }) => {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    try {
      const getKanyeQuote = async () => {
        const response = await axios.get("https://api.kanye.rest")
        setQuote(response.data.quote)
      }
      getKanyeQuote()
    } catch (error) {
      return console.error
    }
  }, [displayQuote])

  return (
    <h2 style={{fontStyle: 'italic'}}>{quote !== '' && quote}</h2>
  )
}

export default KanyeQuote
