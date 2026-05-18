'use client'

import { useTheme } from '../../context/ThemeContext'

const SectionHeading = ({ label, title, highlight, subtitle, center = false }) => {
    const { theme } = useTheme()
    const isLight = theme === 'light'

    return (
        <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '48px' }}>
            {label && (
                <span style={{
                    fontSize: '12px', fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: isLight ? '#0284C7' : '#00D4FF',
                    display: 'inline-block', marginBottom: '12px',
                }}>
                    — {label}
                </span>
            )}
            <h2 style={{
                fontSize: '32px', fontWeight: 700,
                color: isLight ? '#0C1A2E' : '#E8EAF0',
                lineHeight: 1.2, marginBottom: '12px',
            }}>
                {title}{' '}
                {highlight && (
                    <span style={{ color: isLight ? '#0284C7' : '#00D4FF' }}>
                        {highlight}
                    </span>
                )}
            </h2>
            {subtitle && (
                <p style={{
                    fontSize: '15px',
                    color: isLight ? '#0C4A6E' : '#8892A4',
                    maxWidth: '540px',
                    margin: center ? '0 auto' : '0',
                    lineHeight: 1.7,
                }}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default SectionHeading