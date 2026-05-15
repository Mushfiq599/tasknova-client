'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiPlay } from 'react-icons/fi'

const slides = [
    {
        tag: 'Earn Real Money',
        title: 'Complete Tasks,',
        highlight: 'Get Paid Fast',
        subtitle: 'Join thousands of workers completing micro-tasks daily and earning coins you can withdraw as real cash.',
        cta: { label: 'Start Earning', href: '/register' },
        ctaSecondary: { label: 'Browse Tasks', href: '/register' },
        accent: '#00D4FF',
    },
    {
        tag: 'For Task Buyers',
        title: 'Grow Your Project',
        highlight: 'With Real Workers',
        subtitle: 'Post tasks, set your budget, and get results from a global pool of skilled micro-task workers.',
        cta: { label: 'Post a Task', href: '/register' },
        ctaSecondary: { label: 'Learn More', href: '/#how-it-works' },
        accent: '#7C3AED',
    },
    {
        tag: 'Trusted Platform',
        title: 'Safe, Transparent',
        highlight: '& Rewarding',
        subtitle: 'Every transaction is tracked, every submission reviewed. TaskNova ensures fair pay for every completed task.',
        cta: { label: 'Join TaskNova', href: '/register' },
        ctaSecondary: { label: 'How It Works', href: '/#how-it-works' },
        accent: '#10B981',
    },
]

const HeroSection = () => {
    const [current, setCurrent] = useState(0)
    const [animating, setAnimating] = useState(false)

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => goTo((current + 1) % slides.length), 5000)
        return () => clearInterval(timer)
    }, [current])

    const goTo = (idx) => {
        if (animating) return
        setAnimating(true)
        setTimeout(() => {
            setCurrent(idx)
            setAnimating(false)
        }, 300)
    }

    const slide = slides[current]

    return (
        <section style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
        }}>
            {/* Background grid */}
            <div className="bg-grid" style={{
                position: 'absolute', inset: 0, opacity: 0.6,
            }} />

            {/* Glow blobs */}
            <div style={{
                position: 'absolute',
                top: '20%', left: '10%',
                width: '400px', height: '400px',
                background: `radial-gradient(circle, ${slide.accent}18 0%, transparent 70%)`,
                borderRadius: '50%',
                transition: 'background 0.8s ease',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%', right: '5%',
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, #7C3AED18 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
                <div style={{
                    maxWidth: '700px',
                    opacity: animating ? 0 : 1,
                    transform: animating ? 'translateY(16px)' : 'translateY(0)',
                    transition: 'all 0.4s ease',
                }}>
                    {/* Tag */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: `${slide.accent}15`,
                        border: `1px solid ${slide.accent}44`,
                        borderRadius: '20px',
                        padding: '6px 14px',
                        marginBottom: '24px',
                    }}>
                        <div style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: slide.accent,
                            animation: 'glowPulse 2s ease-in-out infinite',
                        }} />
                        <span style={{ fontSize: '13px', color: slide.accent, fontWeight: 500 }}>
                            {slide.tag}
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 style={{
                        fontSize: 'clamp(36px, 6vw, 64px)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        color: '#E8EAF0',
                        marginBottom: '8px',
                        fontFamily: 'Space Grotesk, sans-serif',
                    }}>
                        {slide.title}
                    </h1>
                    <h1 style={{
                        fontSize: 'clamp(36px, 6vw, 64px)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        fontFamily: 'Space Grotesk, sans-serif',
                        background: `linear-gradient(135deg, ${slide.accent}, #A78BFA)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        {slide.highlight}
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontSize: '17px', color: '#8892A4',
                        lineHeight: 1.7, maxWidth: '520px',
                        marginBottom: '36px',
                    }}>
                        {slide.subtitle}
                    </p>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link href={slide.cta.href} className="btn-primary" style={{
                            borderColor: slide.accent, color: slide.accent,
                            fontSize: '15px', padding: '12px 28px',
                        }}>
                            {slide.cta.label} <FiArrowRight size={16} />
                        </Link>
                        <Link href={slide.ctaSecondary.href} className="btn-ghost" style={{
                            fontSize: '15px', padding: '12px 28px',
                        }}>
                            {slide.ctaSecondary.label}
                        </Link>
                    </div>

                    {/* Trust badges */}
                    <div style={{
                        display: 'flex', gap: '24px', marginTop: '48px',
                        flexWrap: 'wrap',
                    }}>
                        {[
                            { val: '10K+', label: 'Active Workers' },
                            { val: '50K+', label: 'Tasks Completed' },
                            { val: '$120K', label: 'Total Paid Out' },
                        ].map(({ val, label }) => (
                            <div key={label}>
                                <p style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0' }}>{val}</p>
                                <p style={{ fontSize: '12px', color: '#4A5568', marginTop: '2px' }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slide indicators */}
                <div style={{
                    display: 'flex', gap: '8px',
                    marginTop: '48px',
                }}>
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            style={{
                                width: i === current ? '28px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: i === current ? slide.accent : '#1B3358',
                                border: 'none', cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection