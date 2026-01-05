'use client'

import { CodePlayground } from '../code-playground'

export function XSSDemoSandpack() {
  const vulnerableCode = {
    '/App.js': `import { useState } from 'react'

export default function App() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const addComment = () => {
    setComments([...comments, comment])
    setComment('')
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Vulnerable Code - XSS Attack</h2>
      <p style={{ color: '#ff6b6b' }}>
        Tente inserir: <code>&lt;img src=x onerror="alert('XSS')" /&gt;</code>
      </p>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Digite um comentário (tente um XSS!)"
          style={{ 
            padding: '10px', 
            width: '100%', 
            marginBottom: '10px',
            border: '2px solid #ff6b6b'
          }}
        />
        <button 
          onClick={addComment}
          style={{ 
            padding: '10px 20px', 
            background: '#ff6b6b', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Adicionar Comentário
        </button>
      </div>

      <div>
        <h3>Comentários:</h3>
        {comments.map((c, i) => (
          <div 
            key={i}
            style={{ 
              padding: '10px', 
              margin: '10px 0', 
              background: '#fff3e0',
              border: '1px solid #ffb74d'
            }}
            // ❌ VULNERÁVEL - Nunca faça isso!
            dangerouslySetInnerHTML={{ __html: c }}
          />
        ))}
      </div>
    </div>
  )
}`,
  }

  const safeCode = {
    '/App.js': `import { useState } from 'react'
import DOMPurify from 'dompurify'

export default function App() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const addComment = () => {
    setComments([...comments, comment])
    setComment('')
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>✅ Código Seguro - XSS Protegido</h2>
      <p style={{ color: '#4caf50' }}>
        Tente o mesmo ataque: <code>&lt;img src=x onerror="alert('XSS')" /&gt;</code>
      </p>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Digite um comentário"
          style={{ 
            padding: '10px', 
            width: '100%', 
            marginBottom: '10px',
            border: '2px solid #4caf50'
          }}
        />
        <button 
          onClick={addComment}
          style={{ 
            padding: '10px 20px', 
            background: '#4caf50', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Adicionar Comentário
        </button>
      </div>

      <div>
        <h3>Comentários (Sanitizados):</h3>
        {comments.map((c, i) => (
          <div 
            key={i}
            style={{ 
              padding: '10px', 
              margin: '10px 0', 
              background: '#e8f5e9',
              border: '1px solid #81c784'
            }}
            // ✅ SEGURO - DOMPurify remove scripts maliciosos
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(c, {
                ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
                ALLOWED_ATTR: ['href']
              })
            }}
          />
        ))}
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: '#e3f2fd',
        borderRadius: '8px'
      }}>
        <p><strong>💡 Como funciona:</strong></p>
        <ul style={{ marginLeft: '20px' }}>
          <li>DOMPurify remove tags perigosas como &lt;script&gt; e &lt;img onerror&gt;</li>
          <li>Mantém apenas tags seguras de formatação</li>
          <li>Scripts maliciosos são neutralizados</li>
        </ul>
      </div>
    </div>
  )
}`,
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-3 text-red-400">Vulnerable Code</h4>
        <CodePlayground files={vulnerableCode} editorHeight="500px" />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-3 text-emerald-400">✅ Código Seguro com DOMPurify</h4>
        <CodePlayground files={safeCode} editorHeight="600px" />
      </div>
    </div>
  )
}
