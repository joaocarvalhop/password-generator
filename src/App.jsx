import './App.css'
import { useState } from "react"


function App() {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(12)
  const [copyText, setCopyText] = useState("Copiar! 📓")
  const [showError, setShowError] = useState(false);

  const passwordLengthInt = Number(passwordLength);

	function generate() {
    if (passwordLength < 1 || passwordLength > 128 || !Number.isInteger(passwordLengthInt)) {
      setShowError(true);
    } else {
      setShowError(false);
      const characters = "1234567890!@#$%&*_+qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
      let newPassword = ""
      for (let i = 0; i < passwordLength; i++) {
        const position = Math.floor(Math.random() * characters.length)
        newPassword += characters[position]
      }
      setPassword(newPassword)
      setCopyText("Copiar! 📓")
    }
  }

	function copyToClipboard() {
    window.navigator.clipboard.writeText(password)
    setCopyText("Copiado!")
  }

  return (
    <>
      <h1>Gerador de Senhas</h1>
      <div>
        <label htmlFor="password-input">Digite o tamanho da senha:</label>
        <input 
          type="number" 
          id='password-input'
          min={1}
          max={128}
          value={passwordLength}
          onChange={ev => setPasswordLength(ev.target.value)}
        />
      </div>
      <p
        className={`error ${showError ? 'visible' : ''}` }
      >
        Valor inválido! Tente novamente.
      </p>
      <div className="card">
        <button 
          onClick={generate}
        >
          Gerar! 🔐
        </button>
        <button
          onClick={copyToClipboard}
        >
          {copyText}
        </button>
        <div>
          <span id='password'>
            {password}
          </span>
        </div>
      </div>
    </>
  )
}

export default App
