import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  //コンポーネント内で扱う状態（変数、関数）を定義

  //写真の状態を管理（今なんの写真？）
  const [images, setImages] = useState([])
  //検索バーに入れる文字列を管理
  const [text, setText] = useState("")
  //今なんの文字列で検索した？
  const [query, setQuery] = useState('apple')

  //useEffectを使って、マウント時に外部apiからdataを取得しimagesを変更したい
  useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`)
      .then((response) => {
        //urlにアクセスして、撮ってきたデータはresponseで受け取れる
        return response.json()
        //response.json()でデータをjson形式にして、扱える形にした。それを次のthenへメソッドへdataとして渡した
      })
      .then((data) => {
        setImages(data.results)
        //resultsはコンソールでどのプロパティの中にデータが（この場合配列が）格納されているかを調べた
      })
  }, [query])
  // [query]とすることで、初回のマウント時とquery(検索文字)が変更されたときのみuseEffectが走る

  const onSubmit = (e) => {

    e.preventDefault() //検索による画面遷移を防ぐ(デフォルトで画面遷移するようになっているのを停止する)
    setQuery(text)
    //formのinputで入力時、その入力値をtextに渡しているから、 setQuery(text)で検索文字列を渡すことができる
    setText('')
  }

  return (
    <div className="App">
      <div className="main">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={(e) => { setText(e.target.value) }}
            value={text}
          />
          <button type="submit">
            Search
          </button>
        </form>
      </div>
      <div className='container'>
        {
          images.map((image) => (
            <div key={image.id} className="card">
              <img src={image.urls.regular} className="card-img" alt="" />
              <div className="card-content">
                {image.alt_description}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
