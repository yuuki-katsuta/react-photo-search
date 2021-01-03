import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  //写真の状態を管理（写真を格納）
  const [images, setImages] = useState([]);
  //form
  const [text, setText] = useState('');
  //検索文字列の値
  const [query, setQuery] = useState('apple');

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImages(data.results);
      });
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(text);
    setText('');
  };

  return (
    <div className='App'>
      <div className='main'>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className='container'>
        {images.map((image) => (
          <div key={image.id} className='card'>
            <img src={image.urls.regular} className='card-img' alt='' />
            <div className='card-content'>{image.alt_description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
