import { useState } from 'react'
import generateCaption from './models/api.js'
import './App.css'

function App() {
  const [imgSrc, setImgSrc] = useState('https://m.media-amazon.com/images/I/81XrqZFs7sL.png');
  const [caption, setCaption] = useState("<Caption>");

  async function addCaption() {
    setCaption("Generating...");
    const caption = await generateCaption(imgSrc);
    setCaption(caption);
  }

  return (
    <>
      <h1>Caption Generator</h1>
      <div className='url-form'>
        <input onChange={(e) => setImgSrc(e.target.value)} defaultValue='https://m.media-amazon.com/images/I/81XrqZFs7sL.png'></input>
        <button onClick={addCaption}>Generate</button>
      </div>
      <div className='captioned-image'>
        <img src={imgSrc} height={200} style={{marginBottom: "10px"}}></img>
        <span>{caption}</span>
      </div>
    </>
  )
}

export default App
