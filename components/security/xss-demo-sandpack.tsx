'use client'

import { CodePlayground } from '../code-playground'

export function XSSDemoSandpack() {
  const vulnerableCode = {
    '/App.js': `import { useState } from 'react'
import './styles.css'

export default function App() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const addComment = () => {
    setComments([...comments, comment])
    setComment('')
  }

  return (
    <div className="container">
      <h2>Vulnerable Code - XSS Attack</h2>
      <p className="hint">
        Try inserting: <code>&lt;img src=x onerror="alert('XSS')" /&gt;</code>
      </p>
      
      <div className="form">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter a comment (try XSS!)"
          className="input"
        />
        <button onClick={addComment} className="button">
          Add Comment
        </button>
      </div>

      <div>
        <h3>Comments:</h3>
        {comments.map((c, i) => (
          <div 
            key={i}
            className="comment"
            // VULNERABLE - Never do this!
            dangerouslySetInnerHTML={{ __html: c }}
          />
        ))}
      </div>
    </div>
  )
}`,
    '/styles.css': `.container {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.hint {
  color: #6e7781;
  margin-bottom: 16px;
}

.hint code {
  background: #f6f8fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
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

.comment {
  padding: 12px;
  margin: 10px 0;
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
}

h2 {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
}

h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
}`,
  }

  const safeCode = {
    '/App.js': `import { useState } from 'react'
import DOMPurify from 'dompurify'
import './styles.css'

export default function App() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const addComment = () => {
    setComments([...comments, comment])
    setComment('')
  }

  return (
    <div className="container">
      <h2>Secure Code - XSS Protected</h2>
      <p className="hint">
        Try the same attack: <code>&lt;img src=x onerror="alert('XSS')" /&gt;</code>
      </p>
      
      <div className="form">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter a comment"
          className="input"
        />
        <button onClick={addComment} className="button">
          Add Comment
        </button>
      </div>

      <div>
        <h3>Comments (Sanitized):</h3>
        {comments.map((c, i) => (
          <div 
            key={i}
            className="comment"
            // SECURE - DOMPurify removes malicious scripts
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(c, {
                ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
                ALLOWED_ATTR: ['href']
              })
            }}
          />
        ))}
      </div>
      
      <div className="info-box">
        <p><strong>How it works:</strong></p>
        <ul>
          <li>DOMPurify removes dangerous tags like &lt;script&gt; and &lt;img onerror&gt;</li>
          <li>Only safe formatting tags are kept</li>
          <li>Malicious scripts are neutralized</li>
        </ul>
      </div>
    </div>
  )
}`,
    '/styles.css': `.container {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.hint {
  color: #6e7781;
  margin-bottom: 16px;
}

.hint code {
  background: #f6f8fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
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

.comment {
  padding: 12px;
  margin: 10px 0;
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
}

.info-box {
  margin-top: 20px;
  padding: 15px;
  background: #f6f8fa;
  border-radius: 8px;
  border-left: 3px solid #24292f;
}

.info-box ul {
  margin: 8px 0 0 20px;
  color: #57606a;
}

.info-box li {
  margin: 4px 0;
}

h2 {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
}

h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
}`,
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-3 text-gray-1100">Vulnerable Code</h4>
        <CodePlayground files={vulnerableCode} editorHeight="400px" title="XSS Attack Demo" />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-3 text-gray-1100">Secure Code with DOMPurify</h4>
        <CodePlayground files={safeCode} editorHeight="420px" title="Protected with DOMPurify" />
      </div>
    </div>
  )
}
