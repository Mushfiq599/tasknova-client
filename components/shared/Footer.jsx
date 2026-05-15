'use client'

import Link from 'next/link'
import { FiGithub, FiLinkedin, FiFacebook, FiTwitter } from 'react-icons/fi'
import Logo from './Logo'

const footerLinks = {
    Platform: [
        { label: 'Browse Tasks', href: '/#tasks' },
        { label: 'How It Works', href: '/#how-it-works' },
        { label: 'Top Workers', href: '/#workers' },
        { label: 'Testimonials', href: '/#testimonials' },
    ],
    Account: [
        { label: 'Login', href: '/login' },
        { label: 'Register', href: '/register' },
        { label: 'Dashboard', href: '/dashboard' },
    ],
    Roles: [
        { label: 'Become a Worker', href: '/register' },
        { label: 'Post Tasks', href: '/register' },
    ],
}

const socialLinks = [
    { icon: <FiGithub size={18} />, href: 'https://github.com', label: 'GitHub' },
    { icon: <FiLinkedin size={18} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FiFacebook size={18} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FiTwitter size={18} />, href: 'https://twitter.com', label: 'Twitter' },
]

const Footer = () => {
    return (
        <footer style={{
            background: '#080C18',
            borderTop: '1px solid #1B3358',
            paddingTop: '60px',
        }}>
            <div className="container">
                {/* Top row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '40px',
                    paddingBottom: '48px',
                    borderBottom: '1px solid #1B3358',
                }}
                    className="footer-grid"
                >
                    {/* Brand */}
                    <div>
                        <Logo />
                        <p style={{
                            fontSize: '14px', color: '#8892A4',
                            lineHeight: 1.7, marginTop: '16px',
                            maxWidth: '280px',
                        }}>
                            Complete micro tasks, earn coins, and withdraw real money.
                            TaskNova connects workers with buyers on a trusted platform.
                        </p>
                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.label}
                                    style={{
                                        width: '36px', height: '36px',
                                        background: '#111827',
                                        border: '1px solid #1B3358',
                                        borderRadius: '8px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#8892A4',
                                        transition: 'all 0.2s',
                                        textDecoration: 'none',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = '#00D4FF'
                                        e.currentTarget.style.color = '#00D4FF'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = '#1B3358'
                                        e.currentTarget.style.color = '#8892A4'
                                    }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <p style={{
                                fontSize: '12px', fontWeight: 600,
                                color: '#E8EAF0', textTransform: 'uppercase',
                                letterSpacing: '0.08em', marginBottom: '16px',
                            }}>
                                {title}
                            </p>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} style={{
                                            fontSize: '14px', color: '#8892A4',
                                            textDecoration: 'none', transition: 'color 0.2s',
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#00D4FF'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#8892A4'}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom row */}
                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 0',
                    fontSize: '13px', color: '#4A5568',
                    flexWrap: 'wrap', gap: '8px',
                }}>
                    <p>© {new Date().getFullYear()} TaskNova. All rights reserved.</p>
                    <p>Built with Next.js · Firebase · MongoDB</p>
                </div>
            </div>

            {/* Responsive */}
            <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </footer>
    )
}

export default Footer