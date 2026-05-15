'use client'

import { useEffect, useRef, useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import axiosInstance from '../../api/axiosInstance'
import useAuth from '../../hooks/useAuth'
import { formatDate } from '../../utils/helpers'

const NotificationPanel = ({ isOpen, onClose }) => {
    const { user } = useAuth()
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(false)
    const panelRef = useRef(null)

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) onClose()
        }
        if (isOpen) document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [isOpen, onClose])

    // Fetch notifications when opened
    useEffect(() => {
        if (!isOpen || !user?.email) return
        setLoading(true)
        axiosInstance.get(`/notifications/${user.email}`)
            .then(res => setNotifications(res.data || []))
            .catch(() => setNotifications([]))
            .finally(() => setLoading(false))
    }, [isOpen, user?.email])

    if (!isOpen) return null

    return (
        <div
            ref={panelRef}
            style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '320px',
                background: '#111827',
                border: '1px solid #1B3358',
                borderRadius: '12px',
                boxShadow: '0 8px 32px #00000066',
                zIndex: 100,
                animation: 'fadeUp 0.15s ease',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid #1B3358',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#E8EAF0' }}>
                    Notifications
                </p>
                {notifications.length > 0 && (
                    <span style={{
                        background: '#00D4FF18', border: '1px solid #00D4FF44',
                        color: '#00D4FF', fontSize: '11px', fontWeight: 600,
                        padding: '2px 8px', borderRadius: '20px',
                    }}>
                        {notifications.length}
                    </span>
                )}
            </div>

            {/* List */}
            <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
                {loading ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: '#4A5568', fontSize: '13px' }}>
                        Loading...
                    </div>
                ) : notifications.length === 0 ? (
                    <div style={{ padding: '32px 16px', textAlign: 'center' }}>
                        <IoNotificationsOutline size={32} style={{ color: '#1B3358', margin: '0 auto 8px', display: 'block' }} />
                        <p style={{ fontSize: '13px', color: '#4A5568' }}>No notifications yet</p>
                    </div>
                ) : (
                    notifications.map((n, i) => (
                        <div key={i} style={{
                            padding: '12px 16px',
                            borderBottom: '1px solid #1B335855',
                            display: 'flex', gap: '10px',
                            alignItems: 'flex-start',
                            transition: 'background 0.15s',
                            cursor: 'default',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = '#0D152688'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <div style={{
                                width: '8px', height: '8px', flexShrink: 0,
                                borderRadius: '50%', background: '#00D4FF',
                                marginTop: '5px',
                            }} />
                            <div>
                                <p style={{ fontSize: '13px', color: '#E8EAF0', lineHeight: 1.5 }}>
                                    {n.message}
                                </p>
                                <p style={{ fontSize: '11px', color: '#4A5568', marginTop: '4px' }}>
                                    {formatDate(n.time)}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default NotificationPanel