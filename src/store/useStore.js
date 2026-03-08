import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(persist(
  (set) => ({
    queryHistory:      [],
    preferredLanguage: 'en',
    preferredDomain:   'agriculture',
    selectedState:     null,
    uiLanguage:        'en',           // ← UI language (i18n)
    addToHistory:     (e)  => set(s => ({ queryHistory: [e, ...s.queryHistory].slice(0, 50) })),
    clearHistory:     ()   => set({ queryHistory: [] }),
    setLanguage:      (l)  => set({ preferredLanguage: l }),
    setDomain:        (d)  => set({ preferredDomain: d }),
    setSelectedState: (st) => set({ selectedState: st }),
    setUiLanguage:    (l)  => set({ uiLanguage: l }),
  }),
  { name:'jnana-store', partialize: s => ({ queryHistory: s.queryHistory, preferredLanguage: s.preferredLanguage, preferredDomain: s.preferredDomain, uiLanguage: s.uiLanguage }) }
))
