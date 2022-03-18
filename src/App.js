import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import './App.scss';
import alertify from 'alertifyjs';

const modül = require('sozluk-api')

async function check(word) {
  let kelime = await modül.tdk(word)
  return kelime
}

function App() {
  const [ getRow, setRow ] = useState(0);
  const [ letterList, setLetter ] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: ""
  });

  /* Kelimeler için json fetch edebilirsiniz */
  const wordList = ["Çanta", "Tahta", "Çekiç", "Radyo", "Sehpa", "Dolap", "Kalem", "Kaşık", "Bıçak", "Tabak", "Tablo", "Lamba", "Tepsi", "Kilit", "Rende", "Ayraç", "Makas"]
  const [ currentWord, setWord ] = useState("");
  const [ getFinish, setFinish ] = useState(false);
  const [ getSub, setSub ] = useState("");

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleAnswerChange = (event) => {
    const yasakli = ["Alt", ".", ",", "Shift", "CapsLock", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "*", "-", '"', "Tab", "Control", "AltGraph", "ContextMenu", "Escape", "Insert", "Home", "PageUp", "PageDown", "Delete", "End", "ScrollLock", "Pause", "+", "/", "NumLock"]

    if(yasakli.includes(event.key)){
      //
    }
    else if(event.key === "Enter")
    {
      if(letterList[getRow].length % 5 === 0 && letterList[getRow].length !== 0){
        check(letterList[getRow].toLocaleLowerCase('tr-TR')).then(() => { 
          setRow(getRow + 1)
          if(letterList[getRow].toLocaleLowerCase('tr-TR') === currentWord){
            alertify.alert().setContent(
            "<h3>Doğru Cevabı Buldunuz</h3>" +
            "<br />" +
            `<p>Kelimemiz ${currentWord.charAt(0).toUpperCase() + currentWord.slice(1)} idi</p>` +
            `<p>Anlamı: ${getSub}</p>` +
            "<br /><br />" +
            "<h4>Skorunuz: <p style='color: #6aaa64'>" + (100 - (getRow * 20)) + "</p></h4>"
            )
            .setHeader("Tebrikler!")
            .show()

            setFinish(true)
          }else if(getRow >= 5){
            alertify.alert().setContent(
            "<h3>Maalesef Doğru Cevabı Bulamadınız.</h3>" +
            "<br />" +
            `<p>Kelimemiz "${currentWord.charAt(0).toUpperCase() + currentWord.slice(1)}" idi</p>` +
            `<p>Anlamı: ${getSub}</p>` +
            "<br /><br />" +
            "<h4>Skorunuz: <p style='color: #e84118'>" + (100 - (getRow * 20)) + "</p></h4>" +
            "<br />" +
            "<p>Sayfayı yenileyerek oyuna devam edebilirsiniz.</p>"
            )
            .setHeader("Oyun Bitti")
            .show()

            setFinish(true)
          }
        }).catch(() => alertify.error("Kelime Geçersiz"))
      }else{
        console.error("Please fill all blanks")
      }
    } else if (event.key === "Backspace") {
      const lastword = letterList[getRow].slice(0, -1)
      setLetter(prevState => ({...prevState, [getRow]: lastword}))
    } else {
      letterList[getRow].length<5?setLetter(prevState => ({...prevState, [getRow]: letterList[getRow] + event.key.toLocaleUpperCase('tr-TR')})):<></>
    }
  }

  useEffect(() => {
    let kelime = wordList[getRandomInt(18)].toLocaleLowerCase('tr-TR')

    setWord(kelime)
    check(kelime).then(function(result) {
      setSub(result["anlam"])
    })

    alertify.alert().setContent(
    "<h3>Oynanış:</h3>" +
    "<br />" +
    `<p class='rect green'>:)</p>` +
    `<p>Bu durumda harf doğru ve doğru yerde.</p>` +
    "<br /><br />" +
    `<p class='rect orange'>:|</p>` +
    `<p>Bu durumda harf doğru fakat doğru yerde değil.</p>` +
    "<br /><br />" +
    `<p class='rect white'>:(</p>` +
    `<p>Bu durumda harf kelime içerisinde yer almıyor.</p>` +
    "<br /><br />" +
    `<p>Oyunu klavyenizle oynayabilirsiniz.</p>` +
    "<h4>İyi şanslar!</h4>"
    )
    .setHeader("Hoşgeldiniz")
    .show()
  }, [])

  const changeLetter = (e) => {
    
    if(getFinish === false) {
      if(e.innerHTML === "ENTER"){
        if(letterList[getRow].length % 5 === 0 && letterList[getRow].length !== 0){
          check(letterList[getRow].toLocaleLowerCase('tr-TR')).then((kelime) => { 
            setRow(getRow + 1)
            if(letterList[getRow].toLocaleLowerCase('tr-TR') === currentWord){
              alertify.alert().setContent(
              "<h3>Doğru Cevabı Buldunuz</h3>" +
              "<br />" +
              `<p>Kelimemiz ${currentWord.charAt(0).toUpperCase() + currentWord.slice(1)} idi</p>` +
              `<p>Anlamı: ${getSub}</p>` +
              "<br /><br />" +
              "<h4>Skorunuz: <p style='color: #6aaa64'>" + (100 - (getRow * 20)) + "</p></h4>"
              )
              .setHeader("Tebrikler!")
              .show()

              setFinish(true)
            }else if(getRow >= 5){
              alertify.alert().setContent(
              "<h3>Maalesef Doğru Cevabı Bulamadınız.</h3>" +
              "<br />" +
              `<p>Kelimemiz ${currentWord.charAt(0).toUpperCase() + currentWord.slice(1)} idi</p>` +
              `<p>Anlamı: ${getSub}</p>` +
              "<br /><br />" +
              "<h4>Skorunuz: <p style='color: #e84118'>" + (100 - (getRow * 20)) + "</p></h4>" +
              "<br />" +
              "<p>Sayfayı yenileyerek oyuna devam edebilirsiniz.</p>"
              )
              .setHeader("Oyun Bitti")
              .show()

              setFinish(true)
            }else {
              alertify.notify("Doğru değil.");
            }
          }).catch(() => alertify.error("Kelime Geçersiz"))
        }else{
          console.error("Please fill all blanks")
        }
      }else if(e.innerHTML === "BACK"){
        const lastword = letterList[getRow].slice(0, -1)
        setLetter(prevState => ({...prevState, [getRow]: lastword}))
      }else{
        letterList[getRow].length<5?setLetter(prevState => ({...prevState, [getRow]: letterList[getRow] + e.innerHTML})):<></>
      }
    }
  }

  return (
    <>
      <Header />
      <div className="content" tabIndex="0" onKeyDown={handleAnswerChange}>
        <div className='word-list'>
          <div className='t-row' id="1">
          {Array.apply(0, Array(5)).map(function (x, i) {
            return <p style={{
              backgroundColor: getRow >= 1 && letterList[0][i].toLocaleLowerCase('tr-TR') === currentWord[i]?"#6aaa64": getRow >= 1 && currentWord.includes(letterList[0][i].toLocaleLowerCase('tr-TR'))?"#c9b458":"white"
            }} key={i} id={i}>{letterList[0][i]}</p>
          })}
          </div>
          <div className='t-row' id="2">
          {Array.apply(0, Array(5)).map(function (x, i) {
            return <p style={{
              backgroundColor: getRow >= 2 && letterList[1][i].toLocaleLowerCase('tr-TR') === currentWord[i]?"#6aaa64": getRow >= 2 && currentWord.includes(letterList[1][i].toLocaleLowerCase('tr-TR'))?"#c9b458":"white"
            }} key={i} id={i}>{letterList[1][i]}</p>
          })}
          </div>
          <div className='t-row' id="3">
          {Array.apply(0, Array(5)).map(function (x, i) {
            return <p style={{
              backgroundColor: getRow >= 3 && letterList[2][i].toLocaleLowerCase('tr-TR') === currentWord[i]?"#6aaa64": getRow >= 3 && currentWord.includes(letterList[2][i].toLocaleLowerCase('tr-TR'))?"#c9b458":"white"
            }} key={i} id={i}>{letterList[2][i]}</p>
          })}
          </div>
          <div className='t-row' id="4">
          {Array.apply(0, Array(5)).map(function (x, i) {
            return <p style={{
              backgroundColor: getRow >= 4 && letterList[3][i].toLocaleLowerCase('tr-TR') === currentWord[i]?"#6aaa64": getRow >= 4 && currentWord.includes(letterList[3][i].toLocaleLowerCase('tr-TR'))?"#c9b458":"white"
            }} key={i} id={i}>{letterList[3][i]}</p>
          })}
          </div>
          <div className='t-row' id="5">
          {Array.apply(0, Array(5)).map(function (x, i) {
            return <p style={{
              backgroundColor: getRow >= 5 && letterList[4][i].toLocaleLowerCase('tr-TR') === currentWord[i]?"#6aaa64": getRow >= 5 && currentWord.includes(letterList[4][i].toLocaleLowerCase('tr-TR'))?"#c9b458":"white"
            }} key={i} id={i}>{letterList[4][i]}</p>
          })}
          </div>
          <div className='t-row' id="6">
          {Array.apply(0, Array(5)).map(function (x, i) {
            return <p style={{
              backgroundColor: getRow >= 6 && letterList[5][i].toLocaleLowerCase('tr-TR') === currentWord[i]?"#6aaa64": getRow >= 6 && currentWord.includes(letterList[5][i].toLocaleLowerCase('tr-TR'))?"#c9b458":"white"
            }} key={i} id={i}>{letterList[5][i]}</p>
          })}
          </div>
        </div>
        <div className='keyboard'>
          <div className='row' id="1">
            <button id="E" onClick={(e) => changeLetter(e.target)}>E</button>
            <button onClick={(e) => changeLetter(e.target)}>R</button>
            <button onClick={(e) => changeLetter(e.target)}>T</button>
            <button onClick={(e) => changeLetter(e.target)}>Y</button>
            <button onClick={(e) => changeLetter(e.target)}>U</button>
            <button onClick={(e) => changeLetter(e.target)}>I</button>
            <button onClick={(e) => changeLetter(e.target)}>O</button>
            <button onClick={(e) => changeLetter(e.target)}>P</button>
            <button onClick={(e) => changeLetter(e.target)}>Ğ</button>
            <button onClick={(e) => changeLetter(e.target)}>Ü</button>
          </div>

          <div className='row kisa' id="2">
            <button onClick={(e) => changeLetter(e.target)}>A</button>
            <button onClick={(e) => changeLetter(e.target)}>S</button>
            <button onClick={(e) => changeLetter(e.target)}>D</button>
            <button onClick={(e) => changeLetter(e.target)}>F</button>
            <button onClick={(e) => changeLetter(e.target)}>G</button>
            <button onClick={(e) => changeLetter(e.target)}>H</button>
            <button onClick={(e) => changeLetter(e.target)}>J</button>
            <button onClick={(e) => changeLetter(e.target)}>K</button>
            <button onClick={(e) => changeLetter(e.target)}>L</button>
            <button onClick={(e) => changeLetter(e.target)}>Ş</button>
            <button onClick={(e) => changeLetter(e.target)}>İ</button>
          </div>

          <div className='row' id="3">
            <button onClick={(e) => changeLetter(e.target)} className='large'>ENTER</button>
            <button onClick={(e) => changeLetter(e.target)}>Z</button>
            <button onClick={(e) => changeLetter(e.target)}>C</button>
            <button onClick={(e) => changeLetter(e.target)}>V</button>
            <button onClick={(e) => changeLetter(e.target)}>B</button>
            <button onClick={(e) => changeLetter(e.target)}>N</button>
            <button onClick={(e) => changeLetter(e.target)}>M</button>
            <button onClick={(e) => changeLetter(e.target)}>Ö</button>
            <button onClick={(e) => changeLetter(e.target)}>Ç</button>
            <button onClick={(e) => changeLetter(e.target)} className='large'>BACK</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
