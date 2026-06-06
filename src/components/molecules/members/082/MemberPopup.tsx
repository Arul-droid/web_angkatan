'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import Image from 'next/image'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.png'

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

const FLOWERS = ['🌸', '🌼', '🌺', '🌷']

const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !overlayRef.current) return
    const overlay = overlayRef.current
    const petals: HTMLDivElement[] = []

    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div')
      const size = 12 + Math.random() * 16
      const left = Math.random() * 100
      const delay = Math.random() * 5
      const dur = 4 + Math.random() * 4
      el.textContent = FLOWERS[Math.floor(Math.random() * FLOWERS.length)]
      el.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: -30px;
        font-size: ${size}px;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        animation: coqFall ${dur}s linear ${delay}s infinite;
      `
      overlay.appendChild(el)
      petals.push(el)
    }

    return () => {
      petals.forEach(p => p.remove())
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <>
      <style>{`
        @keyframes coqFall {
          0%   { transform: translateY(-30px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 bg-black/60 backdrop-blur-sm"
      >
        <button
          type="button"
          aria-label="Close member detail"
          onClick={onClose}
          className="absolute inset-0 z-[1]"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        />

        <div className="border-neutral-cs-10 bg-blue-cs-40 relative z-10 max-h-[100dvh] w-full max-w-[720px] animate-[member-popup-show_200ms_ease-out] overflow-y-auto rounded-2xl border-2 p-6 text-white shadow-xl sm:p-8">
          <button
            type="button"
            aria-label="Close member detail"
            onClick={onClose}
            className="border-neutral-cs-10 hover:bg-neutral-cs-10/10 absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border text-xl leading-none"
          >
            x
          </button>

          <div className="border-neutral-cs-10/40 mb-5 overflow-hidden rounded-2xl border">
            <Image src={ProfileImage} alt="Profile Image" className="h-120 w-full object-cover object-center" />
          </div>

          <div className="pr-10">
            {/* UBAH NAMA ANDA */}
            <h2 className="text-2xl font-black">Fiorellin Ilona</h2>
            {/* UBAH NRP DAN ASAL */}
            <p className="text-neutral-cs-10/70 mt-1 text-sm font-semibold">5027251082 - Surabaya</p>
          </div>

          <div className="mt-5 flex gap-2">
            {/* UBAH USERNAME INSTAGRAM */}
            <Instagram username="llonaalin" />
            {/* UBAH USERNAME LINKEDIN */}
            <LinkedInButtonLink username="fiorellin-ilona-27aa62343" />
          </div>

          <div className="mt-6 grid gap-4 text-sm font-semibold sm:grid-cols-2">
            <div className="border-neutral-cs-10/40 rounded-xl border p-4">
              {/* UBAH HOBI KAMU */}
              <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase">Hobi</p>
              <p className="mt-2">Ngoding</p>
            </div>
            <div className="border-neutral-cs-10/40 rounded-xl border p-4">
              {/* UBAH FUNFACT KAMU */}
              <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase">Fun Fact</p>
              <p className="mt-2">Gasuka Matcha, maaf ya kayak rumput</p>
            </div>
          </div>

          <div className="border-neutral-cs-10/40 mt-4 rounded-xl border p-4">
            {/* UBAH LAGU FAVORIT KAMU */}
            <p className="text-neutral-cs-10/60 text-xs font-bold tracking-wide uppercase">Lagu Favorit</p>
            <p className="my-2 text-sm font-semibold">Begini Begitu</p>
            {/* UBAH URL SPOTIFY KAMU DENGAN LAGU FAVORIT MU */}
            <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/4yTEKXWBDWoazJWrjii0Hk?si=_4_Cf81fTayf1AtP62Z1Mg" />
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

export default MemberPopup