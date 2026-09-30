'use client'
import { useEffect } from 'react'
import { rememberAttribution } from '@/lib/leads'

export function Attribution() {
  useEffect(() => { rememberAttribution() }, [])
  return null
}
