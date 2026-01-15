'use client'

import { useState } from 'react'
import { CodeBox } from './code-box'

export function AuthDemo() {
  const [activeTab, setActiveTab] = useState<'problem' | 'attack' | 'solution'>('problem')

  return (
    <div className="my-8">
      {/* Tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        <button
          onClick={() => setActiveTab('problem')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'problem'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ⚠️ Problem
        </button>
        <button
          onClick={() => setActiveTab('attack')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'attack'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ❌ Attack
        </button>
        <button
          onClick={() => setActiveTab('solution')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'solution'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ✅ Solution
        </button>
      </div>

      {/* Content - min-height prevents layout shift */}
      <div className="min-h-[340px]">
        {activeTab === 'problem' && (
          <div className="space-y-4">
            <CodeBox title="Frontend-only Access Control" language="jsx">
{`// Frontend hides premium resources
function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {user.isPremium && (
        <PremiumFeatures />
      )}
    </div>
  )
}

// Result: Access denied (UI hides it)`}
            </CodeBox>
            <p className="text-sm text-gray-1100 dark:text-gray-1100">
              The UI hides premium features, but there's no backend validation...
            </p>
          </div>
        )}

        {activeTab === 'attack' && (
          <div className="space-y-4">
            <CodeBox title="Browser Console" language="javascript">
{`// Change variable in console:
user.isPremium = true

// Or make direct request:
fetch('/api/premium-data', {
  headers: { 'Authorization': 'Bearer token' }
})`}
            </CodeBox>
            <ul className="text-sm text-gray-1100 dark:text-gray-1100 space-y-1 list-disc list-inside ml-2">
              <li>Change variables in the console</li>
              <li>Make direct requests with curl/Postman</li>
              <li>Access resources without paying</li>
              <li>Bypass any frontend validation</li>
            </ul>
          </div>
        )}

        {activeTab === 'solution' && (
          <div className="space-y-4">
            <CodeBox title="Backend Validation" language="javascript">
{`// Backend ALWAYS verifies
app.get('/api/premium-data', async (req, res) => {
  const user = await getUserFromToken(req)
  
  if (!user.isPremium) {
    return res.status(403).json({ 
      error: 'Premium required' 
    })
  }
  
  return res.json(premiumData)
})`}
            </CodeBox>
            <p className="text-sm text-gray-1100 dark:text-gray-1100 italic">
              💡 Mantra: Frontend hides (UX), Backend blocks (security)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
