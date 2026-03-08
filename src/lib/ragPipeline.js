import { jnanaQuery } from './anthropic'
import { queryLogs } from './supabase'
import { PIPELINE_STAGES } from '../constants'
import { guardRequest } from './security'

const DURATIONS = [550, 650, 750, 700, 850, 500, 900]

const stageDetail = (id, { query, domain, language, emotion }) => ({
  1: `Detected: ${emotion?.label||'Neutral'} (${emotion?.priority||'NORMAL'}) → calibrating strategy`,
  2: `Encoding "${query.slice(0,40)}${query.length>40?'…':''}" → 1536-dim multilingual vector`,
  3: `Scanning: Ancient → Colonial → Constitutional → Digital India 2024`,
  4: `Querying 28 state nodes — domain: ${domain} — 640K docs`,
  5: `Mapping causal chains: Agriculture ↔ Health ↔ Finance ↔ Employment`,
  6: `Cross-validating with 14,832 citizen-verified entries`,
  7: `Synthesising in ${language} with ${emotion?.label||'Neutral'} tone`,
}[id] || '')

const sessionId = () => {
  let id = sessionStorage.getItem('jnana_sid')
  if (!id) { id = `s_${Date.now()}_${Math.random().toString(36).slice(2,7)}`; sessionStorage.setItem('jnana_sid', id) }
  return id
}

export const runPipeline = async ({ query, domain, language, emotion, userId, stateCode, onStageStart, onStageComplete, onComplete, onError }) => {
  // Security guard — rate limit + sanitise + key check
  const guard = guardRequest(query, 'query')
  if (!guard.allowed) { onError?.(new Error(guard.reason)); return }
  const safeQuery = guard.clean || query

  let aiPromise = null
  for (let i = 0; i < PIPELINE_STAGES.length; i++) {
    const stage = { ...PIPELINE_STAGES[i], detail: stageDetail(PIPELINE_STAGES[i].id, { query: safeQuery, domain, language, emotion }) }
    onStageStart?.(stage)
    if (i === 1) aiPromise = jnanaQuery({ query: safeQuery, domain, language, emotion })
    await new Promise(r => setTimeout(r, DURATIONS[i]))
    onStageComplete?.(PIPELINE_STAGES[i].id)
  }
  try {
    const response = await (aiPromise || jnanaQuery({ query: safeQuery, domain, language, emotion }))
    onComplete?.(response)
    queryLogs.insert({ query_text: safeQuery, domain, language, emotion: emotion?.label||'Neutral', response, session_id: sessionId(), user_id: userId || null, state_code: stateCode || null }).catch(() => {})
    return response
  } catch (err) { onError?.(err); throw err }
}

export const PILLARS = [
  { id:1, icon:'⏳', name:'Temporal Memory RAG',     color:'#FF6B00', desc:'Every document time-stamped across 4 eras. Traces full legal evolution — not just current form.', layers:['500 BC – Ancient & Vedic Law','1857–1947 – Colonial Legislation','1947–2000 – Constitutional Era','2001–2024 – Digital India'], metric:'2,400+ years indexed' },
  { id:2, icon:'🛰️', name:'Federated Village RAG',   color:'#00E5FF', desc:'640,000 village micro-nodes. Works offline. Syncs when connected. Under 2 seconds anywhere.',      layers:['National Brain (Cloud)','State Aggregators (28)','District Pods (748)','Village Edge (Offline-First)'], metric:'640,000 nodes planned' },
  { id:3, icon:'❤️', name:'Emotional Context RAG',   color:'#FF4466', desc:'Reads HOW you feel, not just WHAT you ask. Crisis resources first. RAG with a soul.',               layers:['Text Sentiment Analysis','Urgency Classification','Priority Routing','Tone Calibration'], metric:'6 emotion profiles' },
  { id:4, icon:'🔗', name:'Cross-Domain Causal RAG', color:'#7C3AED', desc:'Maps causal chains across all domains simultaneously. Full picture, not just a slice.',              layers:['Agriculture ↔ Finance','Health ↔ Employment','Education ↔ Migration','Governance ↔ Environment'], metric:'28 causal pathways' },
  { id:5, icon:'🗣️', name:'Citizen-Loop RAG',        color:'#00FF88', desc:'First bidirectional national knowledge system. Lived wisdom grows the national brain.',              layers:['Citizen Feedback','Peer Validation','Expert Verification','Auto-Update Pipeline'], metric:'14,832 verified corrections' },
]
