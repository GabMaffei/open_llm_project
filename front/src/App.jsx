import { useState } from 'react'
import { generateCaption, translate } from './models/api.js'
import './App.css'

function App() {
  const [imgSrc, setImgSrc] = useState('https://m.media-amazon.com/images/I/81XrqZFs7sL.png');
  const [caption, setCaption] = useState("<Caption>");
  const [captionPTBR, setCaptionPTBR] = useState("<Legenda>");

  async function addCaption() {
    setCaption("Generating...");
    const caption = await generateCaption(imgSrc);
    setCaption(caption);

    setCaptionPTBR("Traduzindo legenda..");
    const captionPTBR = await translate(caption);

    console.log(captionPTBR);

    setCaptionPTBR(captionPTBR[0]["translation_text"]);
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
        <span>{captionPTBR}</span>
      </div>
    </>
  )
}

export default App
