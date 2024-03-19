import { useEffect, useState } from 'react'
import './App.css'

interface QuoteType {
    text: string;
    from: string;
}

function App() {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quote, setQuote] = useState<QuoteType>();

  useEffect(() => {
    (function():void {
      const d = document, s = d.createElement('script');
      s.src = 'https://ctang.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      (d.head || d.body).appendChild(s);
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../data/quotes.json');
        const data = await response.json();
        setAllQuotes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

// grab random quote + remove quote from allQuotes
  const handleGenerateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const randomQuote = allQuotes[randomIndex];
    
    // swap the random quote with the last quote in the list.  
    // pop the random quote off.
    const lastQuote = allQuotes[allQuotes.length - 1];
    allQuotes[randomIndex] = lastQuote;
    allQuotes[allQuotes.length - 1] = randomQuote;
    setQuote(allQuotes.pop());
  }

  return (
    <>
      <h1>The Lucky One</h1>
      <div className="card">
        <button onClick={handleGenerateRandomQuote}>
          {allQuotes.length ? quote ? 'AND ANOTHA ONE!' : `I'm feeling lucky` : `That's it!`}
        </button>
        <div className='quote'>
            <h3>{quote ? `"${quote.text}"` : ''}</h3>
            <p>{quote ? `${quote.from}` : '' }</p>
        </div>
      </div>
      <div id="disqus_thread"></div>
    <noscript>
        Please enable JavaScript to view the 
        <a href="https://disqus.com/?ref_noscript" rel="nofollow">
            comments powered by Disqus.
        </a>
    </noscript>
    </>
  )
}

export default App
