// ── JNANA Rate Limiter + API Security ────────────────────────────────────────
// Protects the Anthropic API from abuse — runs entirely in the browser.
// Uses a sliding window counter stored in sessionStorage.

const LIMITS = {
  query:   { max: 20,  windowMs: 60 * 60 * 1000, label: 'queries per hour'   }, // 20/hr
  insight: { max: 10,  windowMs: 60 * 60 * 1000, label: 'insights per hour'  }, // 10/hr
  voice:   { max: 50,  windowMs: 60 * 60 * 1000, label: 'voice queries/hour' }, // 50/hr
}

// ── Sliding window rate checker ───────────────────────────────────────────────
const getWindow = (key) => {
  try {
    const raw = sessionStorage.getItem(`rl_${key}`)
    return raw ? JSON.parse(raw) : { calls: [], blocked: false }
  } catch { return { calls: [], blocked: false } }
}

const saveWindow = (key, data) => {
  try { sessionStorage.setItem(`rl_${key}`, JSON.stringify(data)) } catch {}
}

export const checkRateLimit = (type = 'query') => {
  const limit  = LIMITS[type] || LIMITS.query
  const now    = Date.now()
  const window = getWindow(type)

  // Remove calls outside the window
  window.calls = window.calls.filter(ts => now - ts < limit.windowMs)

  if (window.calls.length >= limit.max) {
    const oldest    = window.calls[0]
    const resetInMs = limit.windowMs - (now - oldest)
    const resetInM  = Math.ceil(resetInMs / 60000)
    return {
      allowed:  false,
      reason:   `Rate limit reached: ${limit.max} ${limit.label}. Resets in ${resetInM} minute${resetInM !== 1 ? 's' : ''}.`,
      resetIn:  resetInMs,
      used:     window.calls.length,
      max:      limit.max,
    }
  }

  window.calls.push(now)
  saveWindow(type, window)

  return {
    allowed:    true,
    used:       window.calls.length,
    remaining:  limit.max - window.calls.length,
    max:        limit.max,
  }
}

export const getRateLimitStatus = (type = 'query') => {
  const limit  = LIMITS[type] || LIMITS.query
  const now    = Date.now()
  const window = getWindow(type)
  const active = window.calls.filter(ts => now - ts < limit.windowMs)
  return {
    used:      active.length,
    remaining: Math.max(0, limit.max - active.length),
    max:       limit.max,
    pct:       Math.round((active.length / limit.max) * 100),
  }
}

// ── API Key Validator ─────────────────────────────────────────────────────────
export const validateApiKey = () => {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY || ''
  if (!key)                          return { valid: false, reason: 'NO_KEY' }
  if (key.includes('xxxxxxxx'))      return { valid: false, reason: 'PLACEHOLDER' }
  if (!key.startsWith('sk-ant-'))    return { valid: false, reason: 'INVALID_FORMAT' }
  if (key.length < 40)               return { valid: false, reason: 'TOO_SHORT' }
  return { valid: true }
}

// ── Input Sanitiser ───────────────────────────────────────────────────────────
export const sanitiseQuery = (text = '') => {
  // Strip prompt injection attempts
  const injectionPatterns = [
    /ignore previous instructions/gi,
    /forget everything/gi,
    /you are now/gi,
    /system:/gi,
    /\[INST\]/gi,
    /<\|.*?\|>/g,
    /###\s*(System|Instruction)/gi,
  ]
  let clean = text.trim().slice(0, 1000) // hard cap at 1000 chars
  injectionPatterns.forEach(p => { clean = clean.replace(p, '') })
  return clean.trim()
}

// ── Abuse Detector ────────────────────────────────────────────────────────────
export const detectAbuse = (text = '') => {
  const spamPatterns = [
    /(.)\1{15,}/,           // 15+ repeated chars
    /https?:\/\//gi,        // URLs in query
  ]
  if (text.length < 3)  return { abuse: true, reason: 'Query too short' }
  if (text.length > 900) return { abuse: true, reason: 'Query too long' }
  for (const p of spamPatterns) {
    if (p.test(text)) return { abuse: true, reason: 'Invalid query format' }
  }
  return { abuse: false }
}

// ── Combined Guard (call before every API request) ────────────────────────────
export const guardRequest = (text, type = 'query') => {
  const keyCheck = validateApiKey()
  if (!keyCheck.valid) {
    const msgs = {
      NO_KEY:          '⚠️ Add your Anthropic API key to the .env file to activate JNANA.',
      PLACEHOLDER:     '⚠️ Replace the placeholder API key in .env with your real key from console.anthropic.com',
      INVALID_FORMAT:  '⚠️ Your API key format looks incorrect. It should start with sk-ant-',
      TOO_SHORT:       '⚠️ API key looks incomplete. Check console.anthropic.com',
    }
    return { allowed: false, reason: msgs[keyCheck.reason] || 'Invalid API key' }
  }

  const abuse = detectAbuse(text)
  if (abuse.abuse) return { allowed: false, reason: abuse.reason }

  const rate = checkRateLimit(type)
  if (!rate.allowed) return { allowed: false, reason: rate.reason }

  return { allowed: true, clean: sanitiseQuery(text) }
}
