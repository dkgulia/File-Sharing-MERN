import { useRef, useState, useEffect } from 'react'; 
import './App.css';
import { uploadFile } from './services/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          let response = await uploadFile(data);
          setResult(response.path);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>Simple File Sharing App!</h1>
        <p>Upload and share the download link.</p>

        <button onClick={onUploadClick}>Upload</button>
        <input 
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {result && (
          <a href={result} target="_blank" rel="noopener noreferrer">
            {result}
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
