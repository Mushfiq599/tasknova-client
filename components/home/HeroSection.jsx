'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const slides = [
    {
        tag: 'Earn Real Money',
        title: 'Complete Tasks,',
        highlight: 'Get Paid Fast',
        subtitle: 'Join thousands of workers completing micro-tasks daily and earning coins you can withdraw as real cash.',
        cta: { label: 'Start Earning', href: '/register' },
        ctaSecondary: { label: 'Browse Tasks', href: '/register' },
        accent: '#00D4FF',
        illustration: (
            <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                {/* Laptop */}
                <rect x="80" y="180" width="240" height="140" rx="10" fill="#111827" stroke="#00D4FF" strokeWidth="1.5" />
                <rect x="95" y="195" width="210" height="110" rx="6" fill="#0D1526" />
                <rect x="50" y="320" width="300" height="12" rx="6" fill="#1B3358" />
                {/* Screen content */}
                <rect x="110" y="210" width="80" height="8" rx="4" fill="#00D4FF" opacity="0.7" />
                <rect x="110" y="225" width="120" height="6" rx="3" fill="#1B3358" />
                <rect x="110" y="238" width="100" height="6" rx="3" fill="#1B3358" />
                <rect x="110" y="258" width="60" height="24" rx="6" fill="#00D4FF22" stroke="#00D4FF" strokeWidth="1" />
                <text x="125" y="274" fontSize="10" fill="#00D4FF" fontFamily="Inter">Approve</text>
                {/* Coins floating */}
                <circle cx="290" cy="230" r="22" fill="#00D4FF18" stroke="#00D4FF" strokeWidth="1.5" />
                <text x="282" y="236" fontSize="14" fill="#00D4FF">⬡</text>
                <circle cx="310" cy="190" r="14" fill="#7C3AED22" stroke="#7C3AED" strokeWidth="1" />
                <text x="303" y="196" fontSize="10" fill="#A78BFA">⬡</text>
                <circle cx="260" cy="175" r="10" fill="#00D4FF15" stroke="#00D4FF66" strokeWidth="1" />
                <text x="254" y="181" fontSize="8" fill="#00D4FF">⬡</text>
                {/* Task card floating */}
                <rect x="240" y="100" width="130" height="70" rx="8" fill="#111827" stroke="#1B3358" strokeWidth="1" />
                <rect x="255" y="115" width="70" height="6" rx="3" fill="#00D4FF" opacity="0.8" />
                <rect x="255" y="128" width="90" height="5" rx="2.5" fill="#1B3358" />
                <rect x="255" y="140" width="75" height="5" rx="2.5" fill="#1B3358" />
                <rect x="255" y="154" width="40" height="14" rx="4" fill="#00D4FF18" stroke="#00D4FF55" strokeWidth="0.5" />
                <text x="262" y="164" fontSize="7" fill="#00D4FF">10 coins</text>
                {/* Arrow from card to laptop */}
                <path d="M305 170 Q305 185 295 195" stroke="#00D4FF44" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                {/* Person avatar */}
                <circle cx="140" cy="130" r="36" fill="#111827" stroke="#1B3358" strokeWidth="1.5" />
                <circle cx="140" cy="118" r="14" fill="#1B3358" />
                <path d="M108 162 Q140 145 172 162" fill="#1B3358" />
                <circle cx="140" cy="118" r="10" fill="#00D4FF22" stroke="#00D4FF44" strokeWidth="1" />
                {/* Check badge */}
                <circle cx="168" cy="108" r="12" fill="#10B981" stroke="#0A0F1E" strokeWidth="2" />
                <path d="M162 108 L166 113 L175 104" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        tag: 'For Task Buyers',
        title: 'Grow Your Project',
        highlight: 'With Real Workers',
        subtitle: 'Post tasks, set your budget, and get results from a global pool of skilled micro-task workers.',
        cta: { label: 'Post a Task', href: '/register' },
        ctaSecondary: { label: 'Learn More', href: '/#how-it-works' },
        accent: '#7C3AED',
        illustration: (
            <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                {/* Dashboard mockup */}
                <rect x="60" y="80" width="280" height="200" rx="12" fill="#111827" stroke="#7C3AED" strokeWidth="1.5" />
                {/* Header bar */}
                <rect x="60" y="80" width="280" height="32" rx="12" fill="#0D1526" />
                <rect x="60" y="100" width="280" height="12" fill="#0D1526" />
                <circle cx="80" cy="96" r="5" fill="#EF444444" />
                <circle cx="95" cy="96" r="5" fill="#F59E0B44" />
                <circle cx="110" cy="96" r="5" fill="#10B98144" />
                <text x="200" y="100" fontSize="9" fill="#8892A4" textAnchor="middle" fontFamily="Inter">TaskNova Dashboard</text>
                {/* Stats row */}
                <rect x="75" y="124" width="70" height="44" rx="6" fill="#0D1526" stroke="#7C3AED33" />
                <text x="110" y="142" fontSize="14" fill="#A78BFA" textAnchor="middle" fontWeight="bold" fontFamily="Inter">24</text>
                <text x="110" y="158" fontSize="7" fill="#4A5568" textAnchor="middle" fontFamily="Inter">Tasks</text>
                <rect x="155" y="124" width="70" height="44" rx="6" fill="#0D1526" stroke="#00D4FF33" />
                <text x="190" y="142" fontSize="14" fill="#00D4FF" textAnchor="middle" fontWeight="bold" fontFamily="Inter">138</text>
                <text x="190" y="158" fontSize="7" fill="#4A5568" textAnchor="middle" fontFamily="Inter">Workers</text>
                <rect x="235" y="124" width="70" height="44" rx="6" fill="#0D1526" stroke="#10B98133" />
                <text x="270" y="142" fontSize="14" fill="#34D399" textAnchor="middle" fontWeight="bold" fontFamily="Inter">$420</text>
                <text x="270" y="158" fontSize="7" fill="#4A5568" textAnchor="middle" fontFamily="Inter">Paid</text>
                {/* Task list */}
                {[0, 1, 2].map(i => (
                    <g key={i}>
                        <rect x="75" y={182 + i * 28} width="250" height="22" rx="4" fill="#0D1526" stroke="#1B3358" strokeWidth="0.5" />
                        <rect x="83" y={188 + i * 28} width="60" height="5" rx="2" fill="#7C3AED" opacity="0.7" />
                        <rect x="83" y={197 + i * 28} width="90" height="4" rx="2" fill="#1B3358" />
                        <rect x="280" y={187 + i * 28} width="38" height="10" rx="3" fill="#10B98122" stroke="#10B98144" />
                        <text x="299" y={195 + i * 28} fontSize="6" fill="#34D399" textAnchor="middle" fontFamily="Inter">Active</text>
                    </g>
                ))}
                {/* Floating coin */}
                <circle cx="320" cy="70" r="24" fill="#7C3AED18" stroke="#7C3AED" strokeWidth="1.5" />
                <text x="311" y="77" fontSize="16" fill="#A78BFA">⬡</text>
                <circle cx="355" cy="110" r="14" fill="#00D4FF15" stroke="#00D4FF55" strokeWidth="1" />
                <text x="348" y="116" fontSize="10" fill="#00D4FF">⬡</text>
            </svg>
        ),
    },
    {
        tag: 'Trusted Platform',
        title: 'Safe, Transparent',
        highlight: '& Rewarding',
        subtitle: 'Every transaction is tracked, every submission reviewed. TaskNova ensures fair pay for every completed task.',
        cta: { label: 'Join TaskNova', href: '/register' },
        ctaSecondary: { label: 'How It Works', href: '/#how-it-works' },
        accent: '#10B981',
        illustration: (
            <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                {/* Shield */}
                <path d="M200 80 L280 115 L280 200 Q280 260 200 290 Q120 260 120 200 L120 115 Z" fill="#10B98112" stroke="#10B981" strokeWidth="2" />
                <path d="M200 100 L265 130 L265 200 Q265 250 200 272 Q135 250 135 200 L135 130 Z" fill="#10B98118" />
                {/* Checkmark */}
                <path d="M165 190 L188 215 L238 165" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {/* Floating transaction cards */}
                <rect x="30" y="140" width="100" height="54" rx="8" fill="#111827" stroke="#10B98144" strokeWidth="1" />
                <text x="42" y="158" fontSize="8" fill="#10B981" fontFamily="Inter">Payment</text>
                <text x="42" y="172" fontSize="11" fill="#34D399" fontFamily="Inter" fontWeight="bold">+$12.50</text>
                <rect x="42" y="178" width="40" height="8" rx="3" fill="#10B98118" />
                <text x="51" y="185" fontSize="6" fill="#10B981" fontFamily="Inter">Approved</text>
                <rect x="270" y="100" width="105" height="54" rx="8" fill="#111827" stroke="#7C3AED44" strokeWidth="1" />
                <text x="282" y="118" fontSize="8" fill="#A78BFA" fontFamily="Inter">Submission</text>
                <text x="282" y="132" fontSize="9" fill="#E8EAF0" fontFamily="Inter">Task #2841</text>
                <rect x="282" y="138" width="50" height="8" rx="3" fill="#7C3AED18" />
                <text x="291" y="145" fontSize="6" fill="#A78BFA" fontFamily="Inter">Reviewed</text>
                {/* People icons */}
                {[0, 1, 2, 3, 4].map(i => (
                    <g key={i}>
                        <circle cx={130 + i * 30} cy={330} r={16} fill="#111827" stroke={i % 2 === 0 ? '#10B98155' : '#00D4FF44'} strokeWidth="1" />
                        <circle cx={130 + i * 30} cy={324} r={6} fill="#1B3358" />
                        <path d={`M${114 + i * 30} 342 Q${130 + i * 30} 334 ${146 + i * 30} 342`} fill="#1B3358" />
                    </g>
                ))}
                <text x="200" y="360" fontSize="9" fill="#4A5568" textAnchor="middle" fontFamily="Inter">10,000+ trusted users</text>
                {/* Lock icon */}
                <rect x="183" y="220" width="34" height="28" rx="4" fill="#10B98122" stroke="#10B981" strokeWidth="1" />
                <path d="M190 220 L190 212 Q190 205 200 205 Q210 205 210 212 L210 220" stroke="#10B981" strokeWidth="1.5" fill="none" />
                <circle cx="200" cy="232" r="4" fill="#10B981" />
            </svg>
        ),
    },
]

const HeroSection = () => {
    const { theme } = useTheme()
    const isLight = theme === 'light'
    const [current, setCurrent] = useState(0)
    const [animating, setAnimating] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => goTo((current + 1) % slides.length), 5000)
        return () => clearInterval(timer)
    }, [current])

    const goTo = (idx) => {
        if (animating) return
        setAnimating(true)
        setTimeout(() => { setCurrent(idx); setAnimating(false) }, 300)
    }

    const slide = slides[current]
    const accent = isLight ? '#0284C7' : slide.accent

    return (
        <section style={{
            position: 'relative', minHeight: '100vh',
            display: 'flex', alignItems: 'center',
            overflow: 'hidden',
            background: isLight ? '#E0F2FE' : 'transparent',
        }}>
            {/* Grid — dark only */}
            {!isLight && (
                <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
            )}

            {/* Glow blobs */}
            <div style={{
                position: 'absolute', top: '20%', left: '10%',
                width: '400px', height: '400px',
                background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
                borderRadius: '50%', pointerEvents: 'none', transition: 'background 0.8s ease',
            }} />
            <div style={{
                position: 'absolute', bottom: '10%', right: '5%',
                width: '300px', height: '300px',
                background: `radial-gradient(circle, ${isLight ? '#0284C718' : '#7C3AED18'} 0%, transparent 70%)`,
                borderRadius: '50%', pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gap: '48px', alignItems: 'center',
                }} className="hero-grid">

                    {/* Left — text */}
                    <div style={{
                        opacity: animating ? 0 : 1,
                        transform: animating ? 'translateY(16px)' : 'translateY(0)',
                        transition: 'all 0.4s ease',
                    }}>
                        {/* Tag */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: `${accent}15`, border: `1px solid ${accent}44`,
                            borderRadius: '20px', padding: '6px 14px', marginBottom: '24px',
                        }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent }} />
                            <span style={{ fontSize: '13px', color: accent, fontWeight: 500 }}>{slide.tag}</span>
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 700, lineHeight: 1.1,
                            color: isLight ? '#0C1A2E' : '#E8EAF0',
                            marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif',
                        }}>
                            {slide.title}
                        </h1>

                        {/* Highlight */}
                        <h1 style={{
                            fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 700, lineHeight: 1.1,
                            color: accent, marginBottom: '24px',
                            fontFamily: 'Space Grotesk, sans-serif',
                        }}>
                            {slide.highlight}
                        </h1>

                        {/* Subtitle */}
                        <p style={{
                            fontSize: '16px', color: isLight ? '#0C4A6E' : '#8892A4',
                            lineHeight: 1.7, maxWidth: '480px', marginBottom: '36px',
                        }}>
                            {slide.subtitle}
                        </p>

                        {/* CTAs */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <Link href={slide.cta.href} className="btn-primary"
                                style={{ borderColor: accent, color: accent, fontSize: '15px', padding: '12px 28px' }}>
                                {slide.cta.label} <FiArrowRight size={16} />
                            </Link>
                            <Link href={slide.ctaSecondary.href} className="btn-ghost"
                                style={{ fontSize: '15px', padding: '12px 28px' }}>
                                {slide.ctaSecondary.label}
                            </Link>
                        </div>

                        {/* Trust badges */}
                        <div style={{ display: 'flex', gap: '28px', marginTop: '48px', flexWrap: 'wrap' }}>
                            {[
                                { val: '10K+', label: 'Active Workers' },
                                { val: '50K+', label: 'Tasks Completed' },
                                { val: '$120K', label: 'Total Paid Out' },
                            ].map(({ val, label }) => (
                                <div key={label}>
                                    <p style={{ fontSize: '22px', fontWeight: 700, color: isLight ? '#0C1A2E' : '#E8EAF0' }}>{val}</p>
                                    <p style={{ fontSize: '12px', color: isLight ? '#0C4A6E' : '#4A5568', marginTop: '2px' }}>{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — illustration */}
                    <div style={{
                        opacity: animating ? 0 : 1,
                        transform: animating ? 'translateY(16px)' : 'translateY(0)',
                        transition: 'all 0.4s ease',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        height: '380px',
                    }}>
                        {slide.illustration}
                    </div>
                </div>

                {/* Slide indicators */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '32px' }}>
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} style={{
                            width: i === current ? '28px' : '8px', height: '8px', borderRadius: '4px',
                            background: i === current ? accent : (isLight ? '#BAE6FD' : '#1B3358'),
                            border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
                        }} />
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
        }
      `}</style>
        </section>
    )
}

export default HeroSection