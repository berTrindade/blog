'use client'

import { TabbedCodeBlock } from '@/components/tabbed-code-block'

export function AuthDemo() {
  return (
    <div className="my-8 space-y-4">
      <TabbedCodeBlock
        filename="Dashboard.jsx"
        tabs={[
          {
            label: "Problem",
            icon: "warning",
            language: "jsx",
            highlightLines: "6-8",
            code: `// Frontend hides premium resources
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

// Result: Access denied (UI hides it)
// But there's no backend validation...`
          },
          {
            label: "Attack",
            icon: "attack",
            language: "javascript",
            highlightLines: "2,5-7",
            code: `// Change variable in console:
user.isPremium = true

// Or make direct request:
fetch('/api/premium-data', {
  headers: { 'Authorization': 'Bearer token' }
})

// Attackers can:
// • Change variables in the console
// • Make direct requests with curl/Postman
// • Access resources without paying
// • Bypass any frontend validation`
          },
          {
            label: "Solution",
            icon: "solution",
            language: "javascript",
            highlightLines: "4-7",
            code: `// Backend ALWAYS verifies
app.get('/api/premium-data', async (req, res) => {
  const user = await getUserFromToken(req)
  
  if (!user.isPremium) {
    return res.status(403).json({ 
      error: 'Premium required' 
    })
  }
  
  return res.json(premiumData)
})

// 💡 Mantra: Frontend hides (UX), Backend blocks (security)`
          }
        ]}
      />
    </div>
  )
}
