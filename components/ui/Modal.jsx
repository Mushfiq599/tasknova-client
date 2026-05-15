'use client'

import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        if (isOpen) document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [isOpen, onClose])

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    if (!isOpen) return null

    const widths = { sm: '400px', md: '560px', lg: '720px' }

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: '#00000088',
                backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000, padding: '16px',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: '#111827',
                    border: '1px solid #1B3358',
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: widths[size] || widths.md,
                    maxHeight: '90vh',
                    overflow: 'auto',
                    animation: 'fadeUp 0.2s ease',
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px 24px',
                    borderBottom: '1px solid #1B3358',
                }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#E8EAF0' }}>
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent', border: 'none', cursor: 'pointer',
                            color: '#8892A4', padding: '4px', borderRadius: '6px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'color 0.2s',
                        }}
                    >
                        <IoClose size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal