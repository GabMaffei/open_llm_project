import { useEffect, useRef, useState } from 'react'
import { convertToAudio, generateCaption, translate } from './models/api.js'
import './App.css'

function App() {
  const [imgSrc, setImgSrc] = useState('https://m.media-amazon.com/images/I/81XrqZFs7sL.png');
  const [caption, setCaption] = useState("<Caption>");
  const [captionPTBR, setCaptionPTBR] = useState("<Legenda>");
  const [audioSrc, setAudioSrc] = useState(null);

  const captionAudio = useRef();

  async function addCaption() {
    setCaption("Generating...");
    const caption = await generateCaption(imgSrc);
    setCaption(caption);

    setCaptionPTBR("Traduzindo legenda..");
    const captionPTBR = await translate(caption);

    console.log(captionPTBR);

    setCaptionPTBR(captionPTBR[0]["translation_text"]);

    const audioEndpoint = await convertToAudio(captionPTBR);
    const base = "http://localhost:5000/";
    const endpointPath = audioEndpoint?.[0]?.url ?? "/audio/invalid.wav";
    const newAudioSrc = new URL(endpointPath, base).toString();
    setAudioSrc(newAudioSrc);

  }

  useEffect(() => {
    if (captionAudio.current && audioSrc) {
      captionAudio.current.pause();
      captionAudio.current.load();
      captionAudio.current.play();
    }

  }, [audioSrc])

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
        <audio controls ref={captionAudio} src={audioSrc} />
      </div>
    </>
  )
}

export default App
