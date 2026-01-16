'use client'

import { CodePlayground } from '../code-playground'

export function TokenStorageDemoSandpack() {
  const localStorageCode = {
    '/App.js': `import { useState, useEffect } from 'react'
import './styles.css'

export default function App() {
  const [token, setToken] = useState('')
  const [storedToken, setStoredToken] = useState('')

  useEffect(() => {
    const existing = localStorage.getItem('access_token')
    if (existing) setStoredToken(existing)
  }, [])

  const saveToken = () => {
    // VULNERABLE - Token accessible via JavaScript
    localStorage.setItem('access_token', token)
    setStoredToken(token)
    alert('Token saved to localStorage!')
  }

  const stealToken = () => {
    // Simulates an XSS attack stealing the token
    const stolen = localStorage.getItem('access_token')
    alert(\`Stolen token: \${stolen}\`)
  }

  const clearStorage = () => {
    localStorage.removeItem('access_token')
    setStoredToken('')
    setToken('')
  }

  return (
    <div className="container">
      <h2>localStorage - Insecure</h2>
      
      <div className="warning-box">
        <strong>Problem:</strong>
        <p>Any script can access localStorage, including malicious scripts (XSS)</p>
      </div>

      <div className="form">
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Simulate a JWT token"
          className="input"
        />
        <div className="button-group">
          <button onClick={saveToken} className="button">
            Save to localStorage
          </button>
          <button onClick={clearStorage} className="button secondary">
            Clear
          </button>
        </div>
      </div>

      {storedToken && (
        <div className="token-display">
          <strong>Stored token:</strong>
          <pre>{storedToken}</pre>
        </div>
      )}

      <div className="attack-box">
        <strong>Simulate an XSS Attack:</strong>
        <p>See how easy it is to steal the token:</p>
        <button onClick={stealToken} className="button">
          Steal Token
        </button>
      </div>

      <div className="info-box">
        <strong>Solution:</strong>
        <p>Use HttpOnly Cookies configured by the backend. JavaScript cannot access them!</p>
      </div>
    </div>
  )
}`,
    '/styles.css': `.container {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h2 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
}

.warning-box {
  background: #f6f8fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 3px solid #57606a;
}

.warning-box p {
  color: #57606a;
  margin: 8px 0 0 0;
}

.form {
  margin-bottom: 20px;
}

.input {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #0969da;
  box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.1);
}

.button-group {
  display: flex;
  gap: 10px;
}

.button {
  padding: 10px 20px;
  background: #24292f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background: #32383f;
}

.button.secondary {
  background: #57606a;
}

.button.secondary:hover {
  background: #6e7781;
}

.token-display {
  background: #f6f8fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.token-display pre {
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  overflow: auto;
  border: 1px solid #d0d7de;
  margin-top: 8px;
}

.attack-box {
  background: #f6f8fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #24292f;
  margin-bottom: 20px;
}

.attack-box p {
  color: #57606a;
  margin: 8px 0;
}

.info-box {
  padding: 15px;
  background: #f6f8fa;
  border-radius: 8px;
  border-left: 3px solid #57606a;
}

.info-box p {
  color: #57606a;
  margin: 8px 0 0 0;
}`,
  }

  const cookiesCode = {
    '/App.js': `import { useState } from 'react'
import './styles.css'

export default function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = async () => {
    // Backend returns HttpOnly Cookie automatically
    // fetch('/api/login', {
    //   method: 'POST',
    //   credentials: 'include',
    //   body: JSON.stringify({ username, password })
    // })
    setIsLoggedIn(true)
    alert('Login successful! HttpOnly Cookie was set by the server.')
  }

  const tryStealCookie = () => {
    const cookies = document.cookie
    if (!cookies || cookies.indexOf('auth_token') === -1) {
      alert(\`PROTECTED!\\n\\nAccessible cookies: \${cookies || '(none)'}\\n\\nThe auth_token cookie is HttpOnly and cannot be read via JavaScript!\`)
    }
  }

  const makeAuthenticatedRequest = () => {
    alert('Request to /api/user-data\\n\\nThe HttpOnly cookie is sent automatically!\\nBackend validates and returns the data.')
  }

  return (
    <div className="container">
      <h2>HttpOnly Cookies - Secure</h2>
      
      <div className="info-box">
        <strong>Secure:</strong>
        <p>HttpOnly cookies are inaccessible to JavaScript, protecting against XSS</p>
      </div>

      {!isLoggedIn ? (
        <div className="form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input"
          />
          <button onClick={login} className="button">
            Login (Backend sets HttpOnly Cookie)
          </button>
        </div>
      ) : (
        <div className="logged-in">
          <div className="success-box">
            <strong>Authenticated!</strong>
            <p>HttpOnly Cookie was set by the backend</p>
          </div>

          <div className="button-group">
            <button onClick={tryStealCookie} className="button secondary">
              Try to Steal Cookie
            </button>
            <button onClick={makeAuthenticatedRequest} className="button">
              Make Authenticated Request
            </button>
          </div>
        </div>
      )}

      <div className="code-box">
        <strong>Backend Code (Node.js/Express):</strong>
        <pre>{\`app.post('/api/login', (req, res) => {
  const token = generateJWT(user)
  
  res.cookie('auth_token', token, {
    httpOnly: true,    // Inaccessible to JS
    secure: true,      // HTTPS only
    sameSite: 'strict' // Anti-CSRF
  })
  
  res.json({ success: true })
})\`}</pre>
      </div>
    </div>
  )
}`,
    '/styles.css': `.container {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h2 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
}

.info-box {
  background: #f6f8fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 3px solid #57606a;
}

.info-box p {
  color: #57606a;
  margin: 8px 0 0 0;
}

.form {
  margin-bottom: 20px;
}

.input {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #0969da;
  box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.1);
}

.button {
  padding: 10px 20px;
  background: #24292f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background: #32383f;
}

.button.secondary {
  background: #57606a;
}

.button.secondary:hover {
  background: #6e7781;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.logged-in {
  margin-bottom: 20px;
}

.success-box {
  background: #f6f8fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border-left: 3px solid #24292f;
}

.success-box p {
  color: #57606a;
  margin: 8px 0 0 0;
}

.code-box {
  background: #f6f8fa;
  padding: 15px;
  border-radius: 8px;
}

.code-box pre {
  background: #24292f;
  color: #c9d1d9;
  padding: 15px;
  border-radius: 6px;
  overflow: auto;
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.5;
}`,
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-3 text-gray-1100">localStorage (Vulnerable to XSS)</h4>
        <CodePlayground files={localStorageCode} editorHeight="420px" title="Insecure - localStorage" />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-3 text-gray-1100">HttpOnly Cookies (Secure)</h4>
        <CodePlayground files={cookiesCode} editorHeight="420px" title="Secure - HttpOnly Cookies" />
      </div>
    </div>
  )
}
