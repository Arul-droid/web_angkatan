'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.png'

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
type Step = 1 | 2 | 3

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

// ─────────────────────────────────────────
// STEP 1 — ENVELOPE PAGE
// ─────────────────────────────────────────
function EnvelopePage({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState(false)

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBF2C0, #FFC8DD, #BDE0FE)',
        padding: '2rem',
      }}
    >
      <style>{`
        @keyframes envelopeLetter {
          from { transform: translateY(0px); }
          to   { transform: translateY(-60px); }
        }
        @keyframes envelopeFlap {
          from { transform: rotateX(0deg); }
          to   { transform: rotateX(160deg); }
        }
        .env-letter-anim {
          animation: envelopeLetter 0.4s ease 0.2s forwards;
        }
        .env-flap-anim {
          animation: envelopeFlap 0.4s ease forwards;
        }
        .ready-btn {
          margin-top: 28px;
          padding: 12px 36px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #ffd6e7, #bde0fe);
          color: #5a3045;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .ready-btn:hover { transform: translateY(-2px) scale(1.04); }
      `}</style>

      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#d77fa6', marginBottom: 8 }}>
        💌 You&apos;ve Got Mail!
      </h1>
      <p style={{ color: '#8b6d7b', fontSize: 14, marginBottom: 32, textAlign: 'center' }}>
        Klik amplop dulu ya...
      </p>

      {/* Amplop */}
      <div
        onClick={() => setOpened(true)}
        style={{
          position: 'relative',
          width: 220,
          height: 160,
          cursor: opened ? 'default' : 'pointer',
          marginBottom: 8,
        }}
      >
        {/* Flap */}
        <div
          className={opened ? 'env-flap-anim' : ''}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderLeft: '110px solid transparent',
            borderRight: '110px solid transparent',
            borderTop: '80px solid #ffcde1',
            transformOrigin: 'top center',
            zIndex: 2,
          }}
        />
        {/* Body */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: 220,
            height: 140,
            background: '#fff5f9',
            border: '2px solid #f8b4c8',
            borderRadius: '4px 4px 12px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Letter */}
          <div
            className={opened ? 'env-letter-anim' : ''}
            style={{
              width: 160,
              height: 100,
              background: 'white',
              borderRadius: 8,
              border: '1.5px solid #ffd6e7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            💌
          </div>
        </div>
      </div>

      {opened && (
        <button className="ready-btn" onClick={onNext}>
          Ready ✨
        </button>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// STEP 2 — COOKIE GAME
// ─────────────────────────────────────────
function CookieGame({ onFinish }: { onFinish: () => void }) {
  const [bite, setBite] = useState(0)
  const stages = ['🍪', '🍪', '🍪', '🍪', '🍪', '✨']

  const handleClick = () => {
    if (bite < 5) setBite(prev => prev + 1)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBF2C0, #FFC8DD, #BDE0FE)',
        padding: '2rem',
      }}
    >
      <h1 style={{ color: '#d77fa6', fontSize: 32, fontWeight: 700 }}>
        One More Thing...
      </h1>
      <p style={{ marginTop: 12, color: '#8b6d7b', textAlign: 'center', lineHeight: 1.6 }}>
        Before you meet me,
        <br />
        help me finish this cookie 🍪
      </p>

      <button
        onClick={handleClick}
        style={{ border: 'none', background: 'transparent', cursor: bite < 5 ? 'pointer' : 'default', fontSize: 110, marginTop: 24, lineHeight: 1 }}
      >
        {stages[bite]}
      </button>

      <p style={{ marginTop: 16, color: '#8b6d7b' }}>
        {Math.min(bite, 5)} / 5 bites
      </p>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: bite > i ? '#f8b4c8' : '#ffd6e7',
              border: '2px solid #f8b4c8',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      {bite === 5 && (
        <button
          onClick={onFinish}
          style={{
            marginTop: 28,
            padding: '12px 28px',
            borderRadius: 999,
            border: 'none',
            background: '#A2D2FF',
            color: '#1a3a5c',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Meet Fiorellin →
        </button>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// STEP 3 — MEMBER POPUP
// ─────────────────────────────────────────
const FLOWERS = ['🌸', '🌼', '🌺', '🌷']

function MemberPopupContent({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    if (!overlayRef.current) return
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
        position:absolute;left:${left}%;top:-30px;
        font-size:${size}px;opacity:0;pointer-events:none;z-index:1;
        animation:coqFall ${dur}s linear ${delay}s infinite;
      `
      overlay.appendChild(el)
      petals.push(el)
    }
    return () => petals.forEach(p => p.remove())
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 bg-black/60 backdrop-blur-sm"
    >
      <style>{`
        @keyframes coqFall {
          0%   { transform:translateY(-30px) rotate(0deg); opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:0.8; }
          100% { transform:translateY(110vh) rotate(360deg); opacity:0; }
        }
        @keyframes coqTwinkle {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:0.3; transform:scale(0.7); }
        }
        .profile-frame {
          position:relative; padding:4px;
          border-radius:24px; overflow:hidden; margin-bottom:1.25rem;
        }
        .profile-frame::before {
          content:""; position:absolute; inset:-50%;
          background:conic-gradient(#ffe58f,#ffd6e7,#bde0fe,#ffb3cc,#ffe58f);
          animation:spinBorder 4s linear infinite;
        }
        @keyframes spinBorder {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        .profile-inner {
          position:relative; z-index:2; overflow:hidden;
          border-radius:20px; background:white;
        }
        .social-wrapper {
          padding:4px; border-radius:999px;
          background:linear-gradient(135deg,#ffe58f,#ffd6e7,#bde0fe);
          box-shadow:0 0 12px rgba(255,214,231,.4); transition:.3s;
        }
        .social-wrapper:hover { transform:translateY(-2px) scale(1.05); }
        .coq-card {
          position:relative;
          background:rgba(255,255,255,.35);
          border:3px solid #ffe58f; border-radius:18px; overflow:hidden;
        }
        .coq-card::before {
          content:""; position:absolute; inset:4px;
          border:2px dashed #ffd54f; border-radius:14px; pointer-events:none;
        }
      `}</style>

      {/* backdrop close */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 z-[1]"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      />

      <div
        className="relative z-10 my-8 w-full max-w-[720px] overflow-y-auto rounded-2xl p-6 shadow-xl sm:p-8"
        style={{
          background: 'linear-gradient(160deg,#bde0fe 0%,#ffd6e7 60%,#ffb3cc 100%)',
          border: '2px solid #90c8f5',
          color: '#5a3045',
        }}
      >
        {/* close btn */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-xl"
          style={{ border: '1.5px solid #90c8f5', background: 'rgba(189,224,254,0.5)', color: '#3a7bbf' }}
        >
          ✕
        </button>

        {/* Foto spinning border */}
        <div className="profile-frame">
          <div className="profile-inner">
            <Image src={ProfileImage} alt="Profile Image" className="h-120 w-full object-cover object-center" />
          </div>
        </div>

        <div className="pr-10">
          <h2 className="text-2xl font-black" style={{ color: '#1a5fa8' }}>Fiorellin Ilona</h2>
          <p className="mt-1 text-sm font-semibold" style={{ color: '#5a8fc4' }}>5027251082 - Surabaya</p>
        </div>

        {/* Social links */}
        <div className="mt-5 flex gap-3">
          <div className="social-wrapper"><Instagram username="llonaalin" /></div>
          <div className="social-wrapper"><LinkedInButtonLink username="fiorellin-ilona-27aa62343" /></div>
        </div>

        <div className="flex items-center gap-2 my-4">
          <div style={{ flex: 1, height: 1, background: '#90c8f5' }} />
          <span style={{ fontSize: 17 }}>🌸</span>
          <div style={{ flex: 1, height: 1, background: '#90c8f5' }} />
        </div>

        {/* Cards */}
        <div className="grid gap-4 text-sm font-semibold sm:grid-cols-2">
          <div className="coq-card p-4">
            <p className="text-xs tracking-wide uppercase" style={{ color: '#3a7bbf' }}>🌼 Hobi</p>
            <p className="mt-2" style={{ color: '#1a3a5c' }}>Ngoding</p>
          </div>
          <div className="coq-card p-4">
            <p className="text-xs tracking-wide uppercase" style={{ color: '#3a7bbf' }}>🌼 Fun Fact</p>
            <p className="mt-2" style={{ color: '#1a3a5c' }}>Gasuka Matcha, maaf ya kayak rumput</p>
          </div>
        </div>

        <div className="flex items-center gap-2 my-4">
          <div style={{ flex: 1, height: 1, background: '#90c8f5' }} />
          <span style={{ fontSize: 17 }}>🌸</span>
          <div style={{ flex: 1, height: 1, background: '#90c8f5' }} />
        </div>

        {/* Lagu */}
        <div className="coq-card p-4">
          <p className="text-xs font-bold tracking-wide uppercase" style={{ color: '#3a7bbf' }}>🌼 Lagu Favorit</p>
          <p className="my-2 text-sm font-semibold" style={{ color: '#1a3a5c' }}>Begini Begitu</p>
          <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/4yTEKXWBDWoazJWrjii0Hk?si=_4_Cf81fTayf1AtP62Z1Mg" />
        </div>

        {/* Twinkle stars */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 18, flexWrap: 'wrap' }}>
          {[
            { icon: '✦', size: 18, delay: '0s',   color: '#90c8f5' },
            { icon: '✧', size: 13, delay: '0.2s', color: '#ffb3cc' },
            { icon: '★', size: 20, delay: '0.4s', color: '#bde0fe' },
            { icon: '✦', size: 13, delay: '0.6s', color: '#90c8f5' },
            { icon: '🌸', size: 16, delay: '0.1s', color: '#ffb3cc' },
            { icon: '✧', size: 13, delay: '0.5s', color: '#90c8f5' },
            { icon: '★', size: 20, delay: '0.3s', color: '#bde0fe' },
            { icon: '✦', size: 13, delay: '0.7s', color: '#ffb3cc' },
            { icon: '✧', size: 18, delay: '0.9s', color: '#90c8f5' },
          ].map((sp, i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{
                display: 'inline-block',
                fontSize: sp.size,
                color: sp.color,
                animation: `coqTwinkle 1.6s ease-in-out ${sp.delay} infinite`,
              }}
            >
              {sp.icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// MAIN EXPORT — mengatur step 1 → 2 → 3
// ─────────────────────────────────────────
const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>(1)

  useEffect(() => { setMounted(true) }, [])

  // Reset step ke 1 setiap kali popup dibuka ulang
  useEffect(() => {
    if (isOpen) setStep(1)
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <>
      {step === 1 && <EnvelopePage onNext={() => setStep(2)} />}
      {step === 2 && <CookieGame onFinish={() => setStep(3)} />}
      {step === 3 && <MemberPopupContent onClose={onClose} />}
    </>,
    document.body
  )
}

export default MemberPopup
