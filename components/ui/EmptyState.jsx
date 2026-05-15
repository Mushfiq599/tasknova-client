'use client'

const EmptyState = ({ icon = '📭', title = 'Nothing here yet', subtitle = '', action }) => {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '60px 24px', textAlign: 'center',
        }}>
            <div style={{
                fontSize: '48px', marginBottom: '16px',
                filter: 'grayscale(0.3)',
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#E8EAF0', marginBottom: '8px' }}>
                {title}
            </h3>
            {subtitle && (
                <p style={{ fontSize: '13px', color: '#8892A4', maxWidth: '320px', lineHeight: 1.6 }}>
                    {subtitle}
                </p>
            )}
            {action && (
                <div style={{ marginTop: '20px' }}>
                    {action}
                </div>
            )}
        </div>
    )
}

export default EmptyState