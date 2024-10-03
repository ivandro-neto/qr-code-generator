import QRCode from 'qrcode';
import styles from './App.module.css';
import { useState } from 'react';

function App() {
  const [url, setUrl] = useState<string>('');
  const [imageURL, setImageURL] = useState('');
  const [hasData, setHasData] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const generateQR = async () => {
    try {
      const qrFile = await QRCode.toDataURL(url);
      setImageURL(qrFile);
      setHasData(true);
    } catch (err) {
      setError('Error generating QR code: ' + err);
    }
  };

  return (
    <main className={styles.container}>
      <p>{error}</p>
      <div className={styles.card}>
        <h1>QR.Me</h1>
        {hasData === false ? (
          <div className={styles.qrcontainer}>
            <h1>QR.Me</h1>
          </div>
        ) : (
          <a
            href={imageURL}
            className={styles.qrcontainer}
            download={url.replace('www.', 'QR-').replace('https://', 'QR-') + '.png'}
          >
            <img src={imageURL} alt="QR image" />
          </a>
        )}
        <p>Link:</p>
        <input
          className={styles.input}
          name="url"
          type="text"
          placeholder="https://ivandroneto.com"
          onChange={handleInputData}
        />
        <button className={styles.btn} onClick={generateQR}>
          Generate
        </button>
      </div>
      <footer>
        <p>
          @Developed by <a href="https://www.ivandroneto.com">Ivandro Neto</a>
        </p>
      </footer>
    </main>
  );
}

export default App;
