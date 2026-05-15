'use client'

const SectionHeading = ({ label, title, highlight, subtitle, center = false }) => {
    return (
        <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '48px' }}>
            {label && (
                <span style={{
                    fontSize: '12px', fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#00D4FF',
                    display: 'inline-block', marginBottom: '12px',
                }}>
                    — {label}
                </span>
            )}
            <h2 style={{
                fontSize: '32px', fontWeight: 700,
                color: '#E8EAF0', lineHeight: 1.2,
                marginBottom: '12px',
            }}>
                {title}{' '}
                {highlight && (
                    <span className="text-gradient">{highlight}</span>
                )}
            </h2>
            {subtitle && (
                <p style={{
                    fontSize: '15px', color: '#8892A4',
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