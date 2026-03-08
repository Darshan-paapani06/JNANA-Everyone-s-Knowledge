import { useState, useEffect, useCallback } from 'react'
import { auth, profiles } from '../lib/supabase'

export const useAuth = () => {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (u) => {
    if (!u) { setProfile(null); return }
    const { data } = await profiles.get(u.id)
    if (data) setProfile(data)
    else {
      // Auto-create profile on first login
      const newProfile = { id: u.id, full_name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Citizen', preferred_language: 'en' }
      await profiles.upsert(newProfile)
      setProfile(newProfile)
    }
  }, [])

  useEffect(() => {
    auth.getUser().then(({ data }) => {
      const u = data?.user || null
      setUser(u)
      fetchProfile(u)
      setLoading(false)
    })
    const { data: sub } = auth.onAuthChange((_, session) => {
      const u = session?.user || null
      setUser(u)
      fetchProfile(u)
    })
    return () => sub?.subscription?.unsubscribe()
  }, [fetchProfile])

  const signIn  = useCallback(async (email, pw) => {
    const res = await auth.signIn(email, pw)
    if (!res.error) { setUser(res.data?.user); fetchProfile(res.data?.user) }
    return res
  }, [fetchProfile])

  const signUp  = useCallback(async (email, pw, name) => {
    const res = await auth.signUp(email, pw, name)
    return res
  }, [])

  const signOut = useCallback(async () => {
    await auth.signOut(); setUser(null); setProfile(null)
  }, [])

  const isAdmin = user?.email?.endsWith('@jnana.gov.in') || false

  return { user, profile, loading, isAdmin, signIn, signUp, signOut }
}
