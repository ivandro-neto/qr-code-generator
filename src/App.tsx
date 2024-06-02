import QRCode from 'qrcode'
import styles from  './App.module.css'
import {useState } from 'react'
function App() {
  const [url, setUrl] = useState<string>('');
  const [imageURL, setImageURL] = useState('');
  const [HasData, setHasData] = useState<boolean>(false);

  const handleInputData = (event) => {
    setUrl(event.target.value)
  }

  const GenerateQR = async (event) =>{
    event.preventDefault();
    try{
      const qrFile = await QRCode.toDataURL(url)
      setImageURL(qrFile);
      setHasData(true)
    }catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1>QR.Me</h1>
        {
          HasData === false?
          <div className={styles.qrcontainer}>
            <h1>QR.Me</h1>
          </div>  
          :
          <a href={imageURL} className={styles.qrcontainer} download={url.replace('www.', 'QR-').replace('https://', "QR-") +".png"}>
            <img src={imageURL} alt="QR image"/>
          </a>
        }
        <p>Link:</p>
        <input className={styles.input} name="url" type="text" placeholder='https://ivandroneto.com' onChange={handleInputData}/>
        <button className={styles.btn} onClick={GenerateQR}>
          Generate
        </button>
      </div>
      <footer>
        <p>@Developed by <a href="https://www.ivandroneto.com">Ivandro Neto</a></p>
      </footer>
    </main>
  )
}

export default App
