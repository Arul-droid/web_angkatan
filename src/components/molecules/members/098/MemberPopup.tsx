'use client'

import React, { useEffect } from 'react'

import Image from 'next/image'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.jpg'

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    // POLISH 1: Mengoptimalkan backdrop-blur dan menambahkan animasi fade halus untuk overlay agar transisi terasa organik
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 pt-28 pb-8 transition-all duration-300 sm:pt-32">
      <button
        type="button"
        aria-label="Close member detail"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-[6px] transition-opacity duration-300"
      />

      {/* POLISH 2: TRANSFORMATION OF THE MAIN CARD CONTAINER
        - Menggunakan border subtle semi-transparan & background blend untuk efek premium depth (Vercel/Linear style).
        - Menambahkan `backdrop-blur-xl` di dalam kartu untuk menyatukan warna latar belakang.
        - Peningkatan bayangan dengan `shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]` demi memisahkan layer popup dari konten utama.
      */}
      <div className="border-neutral-cs-10/40 bg-blue-cs-40/90 backdrop-blur-xl relative z-10 max-h-[calc(100vh-9rem)] w-full max-w-[640px] animate-[member-popup-show_280ms_cubic-bezier(0.16,1,0.3,1)] overflow-y-auto rounded-2xl border p-6 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-all sm:max-h-[calc(100vh-10rem)] sm:p-8">
        
        {/* POLISH 3: CLOSE BUTTON MICRO-INTERACTION
          - Mengganti teks 'x' dengan icon minimalis murni lewat CSS / standard layout.
          - Menambahkan interaksi hover scale, transisi warna yang smooth, dan efek ring fokus yang elegan.
        */}
        <button
          type="button"
          aria-label="Close member detail"
          onClick={onClose}
          className="border-neutral-cs-10/30 hover:border-white/50 hover:bg-white/10 absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium tracking-normal text-neutral-400 hover:text-white transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          ✕
        </button>

        {/* POLISH 4: PREMIUM IMAGE WRAPPER
          - Menambahkan inner shadow subtle dan border ring adaptif.
          - Mengaktifkan scale transition agar foto profil terasa hidup saat di-hover/dilihat.
        */}
        <div className="border-neutral-cs-10/30 group mb-6 overflow-hidden rounded-xl border bg-black/20">
          <Image 
            src={ProfileImage} 
            alt="Profile Image" 
            className="h-96 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
          />
        </div>

        {/* POLISH 5: TYPOGRAPHY HIERARCHY (Apple & Stripe Inspired) */}
        <div className="pr-10">
          {/* Mengatur tracking (letter-spacing) agar nama yang panjang tampak rapi dan berwibawa */}
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Jude Athala Yazid Sari
          </h2>
          {/* Merapikan font weight dan opacity pembatas info regional */}
          <p className="text-neutral-cs-10/80 mt-1.5 text-xs font-medium tracking-widest uppercase">
            5027251098 &bull; Tangerang
          </p>
        </div>

        {/* POLISH 6: SOCIAL BUTTONS ACCENTUATION
          - Memberikan container flex dengan properti rendering halus untuk tombol Instagram & LinkedIn bawaan.
          - Modifikasi styling langsung dari parent class untuk menjamin interaksi hover bernuansa glow.
        */}
        <div className="mt-5 flex gap-2.5 transition-all duration-200">
          <div className="hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(225,48,108,0.3)] transition-all duration-300 rounded-lg">
            <Instagram username="Judeatha" />
          </div>
          <div className="hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,119,181,0.2)] transition-all duration-300 rounded-lg">
            <LinkedInButtonLink username="jude-athala" />
          </div>
        </div>

        {/* POLISH 7: INFORMATION GRID CARDS (Linear & Notion Inspired)
          - Menambahkan soft ambient background gradient pada card hobi dan fun fact.
          - Border tipis semi-transparan untuk kesan premium, berpadu dengan layout yang kokoh.
        */}
        <div className="mt-6 grid gap-4 text-sm font-normal sm:grid-cols-2">
          <div className="border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent rounded-xl border p-5 transition-all duration-300 hover:border-white/[0.15]">
            <p className="text-white/40 text-[11px] font-bold tracking-wider uppercase">Hobi</p>
            <p className="mt-2 text-white/90 font-medium tracking-wide">Bermain Sepak Bola</p>
          </div>
          <div className="border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent rounded-xl border p-5 transition-all duration-300 hover:border-white/[0.15]">
            <p className="text-white/40 text-[11px] font-bold tracking-wider uppercase">Fun Fact</p>
            <p className="mt-2 text-white/90 font-medium leading-relaxed">
              Gw orangnya susah tidur cepet dan susah untuk bangun
            </p>
          </div>
        </div>

        {/* POLISH 8: SPOTIFY COMPONENT EMBED ZONE
          - Melapisi container Spotify dengan background solid/transparan terintegrasi agar tidak kontras sendirian.
          - Mempertahankan element asli SpotifyEmbed 100% utuh tanpa merusak API url-nya.
        */}
        <div className="border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent mt-4 rounded-xl border p-5 transition-all duration-300 hover:border-white/[0.15]">
          <p className="text-white/40 text-[11px] font-bold tracking-wider uppercase">Lagu Favorit</p>
          <p className="mt-1.5 mb-3 text-base font-semibold text-white tracking-wide">Soulmate</p>

          <div className="rounded-lg overflow-hidden shadow-inner bg-black/10">
            <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/1rwGbGLDE0AkaH1UgUbufL?si=02a2150c40ed49e3" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default MemberPopup