'use client'

import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

const CTASection = () => {
    return (
        <section className="section">
            <div className="container">
                <div style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #00D4FF08, #7C3AED12)',
                    border: '1px solid #1B3358',
                    borderRadius: '24px',
                    padding: '64px 48px',
                    textAlign: 'center',
                    overflow: 'hidden',
                }}>
                    {/* Glow blobs */}
                    <div style={{
                        position: 'absolute', top: '-60px', left: '-60px',
                        width: '240px', height: '240px',
                        background: 'radial-gradient(circle, #00D4FF15, transparent 70%)',
                        borderRadius: '50%', pointerEvents: 'none',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-60px', right: '-60px',
                        width: '240px', height: '240px',
                        background: 'radial-gradient(circle, #7C3AED15, transparent 70%)',
                        borderRadius: '50%', pointerEvents: 'none',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <span style={{
                            fontSize: '12px', fontWeight: 600,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: '#00D4FF', display: 'block', marginBottom: '16px',
                        }}>
                            — Join Today
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(28px, 5vw, 48px)',
                            fontWeight: 700,
                            color: '#E8EAF0',
                            lineHeight: 1.2,
                            marginBottom: '16px',
                            fontFamily: 'Space Grotesk, sans-serif',
                        }}>
                            Ready to Start{' '}
                            <span className="text-gradient">Earning?</span>
                        </h2>
                        <p style={{
                            fontSize: '16px', color: '#8892A4',
                            maxWidth: '480px', margin: '0 auto 36px',
                            lineHeight: 1.7,
                        }}>
                            Join over 10,000 workers and buyers on TaskNova.
                            Sign up today and get free coins on registration.
                        </p>

                        <div style={{
                            display: 'flex', gap: '12px',
                            justifyContent: 'center', flexWrap: 'wrap',
                        }}>
                            <Link href="/register?role=worker" className="btn-primary" style={{
                                fontSize: '15px', padding: '12px 28px',
                            }}>
                                Join as Worker <FiArrowRight size={16} />
                            </Link>
                            <Link href="/register?role=buyer" className="btn-secondary" style={{
                                fontSize: '15px', padding: '12px 28px',
                            }}>
                                Post Tasks as Buyer <FiArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Small trust note */}
                        <p style={{ fontSize: '12px', color: '#4A5568', marginTop: '20px' }}>
                            Free to join · No credit card required · Instant access
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection