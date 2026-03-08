const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL   = 'claude-sonnet-4-20250514'

const headers = () => ({
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true',
})

export const sendMessage = async ({ system, userMessage, maxTokens = 1024 }) => {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!key || key.includes('xxx')) throw new Error('NO_API_KEY')
  const res = await fetch(API_URL, {
    method: 'POST', headers: headers(),
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: [{ role: 'user', content: userMessage }] }),
  })
  if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e?.error?.message || `API error ${res.status}`) }
  const data = await res.json()
  return data.content?.map(c => c.text || '').join('\n') || ''
}

export const jnanaQuery = ({ query, domain, language, emotion }) => sendMessage({
  system: `You are JNANA (ज्ञान), India's national AI intelligence system.

RESPONSE FORMAT:
━━ UNDERSTANDING YOUR SITUATION ━━
[Empathy + restate the problem clearly]

━━ WHAT THE LAW / SYSTEM SAYS ━━
[Cite specific Indian acts, articles, schemes by exact name]

━━ HISTORICAL CONTEXT ━━
[1 line: how this evolved from colonial era to present]

━━ YOUR ACTION PLAN ━━
→ Step 1: [specific, actionable]
→ Step 2: [specific, actionable]  
→ Step 3: [portal URL or helpline number]

━━ GOVERNMENT SCHEMES FOR YOU ━━
[2-3 specific schemes with eligibility]

━━ JNANA INSIGHT ━━
[Cross-domain observation]

━━ EMPOWERMENT ━━
[1 bold, inspiring closing line]

Emotion: ${emotion?.label || 'Neutral'} (${emotion?.priority || 'NORMAL'})
Domain: ${domain}
${emotion?.priority === 'CRISIS' ? 'LEAD WITH CRISIS HELPLINES: iCall 9152987821, Vandrevala 1860-2662-345' : ''}`,
  userMessage: `Query: "${query}"\nDomain: ${domain}\nLanguage: ${language}\nEmotional State: ${emotion?.label || 'Neutral'}`,
  maxTokens: 1200,
})

export const generateInsight = (topic) => sendMessage({
  system: `You are JNANA's National Insight Engine.
Format:
━━ SCALE & SCOPE ━━
[Statistics + affected population]

━━ ROOT CAUSE CHAIN ━━
[Cause → Effect → Crisis using → arrows]

━━ EXISTING INTERVENTIONS & GAPS ━━
[What exists, what's missing]

━━ CROSS-DOMAIN CONNECTIONS ━━
[3 hidden links to other domains]

━━ 3 BREAKTHROUGH SOLUTIONS ━━
→ Solution 1:
→ Solution 2:
→ Solution 3:

━━ CALL TO ACTION ━━
[Bold demand for policymakers]

━━ JNANA VERDICT ━━
[One devastating sentence of truth]`,
  userMessage: `National insight report: ${topic}`,
  maxTokens: 1200,
})
