'use client'

const LoadingSpinner = ({ size = 'md', text = '' }) => {
    const sizes = {
        sm: '20px',
        md: '36px',
        lg: '52px',
    }
    const s = sizes[size] || sizes.md

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
        }}>
            <div style={{
                width: s,
                height: s,
                border: '2px solid #1B3358',
                borderTop: '2px solid #00D4FF',
                borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
            }} />
            {text && (
                <p style={{ color: '#8892A4', fontSize: '13px' }}>{text}</p>
            )}
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}

export const FullPageLoader = () => (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0F1E',
    }}>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>⬡</div>
            <LoadingSpinner size="md" text="Loading TaskNova..." />
        </div>
    </div>
)

export default LoadingSpinner