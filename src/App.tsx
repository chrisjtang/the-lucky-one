import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    (function() {
      const d = document, s = d.createElement('script');
      s.src = 'https://ctang.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      (d.head || d.body).appendChild(s);
    })();
  }, []);


  return (
    <>
      <h1>The Lucky One</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          How high did you get?
        </p>
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
