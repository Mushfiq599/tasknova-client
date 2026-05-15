'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    FiHome, FiList, FiFileText, FiDollarSign,
    FiPlusCircle, FiCheckSquare, FiCreditCard,
    FiClock, FiUsers, FiSettings, FiX,
} from 'react-icons/fi'
import Logo from '../shared/Logo'
import useAuth from '../../hooks/useAuth'

const navItems = {
    worker: [
        { label: 'Home', href: '/dashboard/worker-home', icon: <FiHome size={16} /> },
        { label: 'Task List', href: '/dashboard/task-list', icon: <FiList size={16} /> },
        { label: 'My Submissions', href: '/dashboard/my-submissions', icon: <FiFileText size={16} /> },
        { label: 'Withdrawals', href: '/dashboard/withdrawals', icon: <FiDollarSign size={16} /> },
    ],
    buyer: [
        { label: 'Home', href: '/dashboard/buyer-home', icon: <FiHome size={16} /> },
        { label: 'Add New Task', href: '/dashboard/add-task', icon: <FiPlusCircle size={16} /> },
        { label: 'My Tasks', href: '/dashboard/my-tasks', icon: <FiCheckSquare size={16} /> },
        { label: 'Purchase Coin', href: '/dashboard/purchase-coin', icon: <FiCreditCard size={16} /> },
        { label: 'Payment History', href: '/dashboard/payment-history', icon: <FiClock size={16} /> },
    ],
    admin: [
        { label: 'Home', href: '/dashboard/admin-home', icon: <FiHome size={16} /> },
        { label: 'Manage Users', href: '/dashboard/manage-users', icon: <FiUsers size={16} /> },
        { label: 'Manage Tasks', href: '/dashboard/manage-tasks', icon: <FiSettings size={16} /> },
    ],
}

const DashboardSidebar = ({ isOpen, onClose }) => {
    const { role } = useAuth()
    const pathname = usePathname()
    const items = navItems[role] || navItems.worker

    return (
        <aside style={{
            position: 'fixed',
            top: 0, left: isOpen ? 0 : undefined,
            width: '240px',
            height: '100vh',
            background: '#060A14',
            borderRight: '1px solid #1B3358',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 50,
            transition: 'transform 0.3s ease',
        }} className="dashboard-sidebar">

            {/* Logo + close btn */}
            <div style={{
                padding: '20px 16px',
                borderBottom: '1px solid #1B3358',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Logo size="sm" />
                <button
                    onClick={onClose}
                    className="sidebar-close-btn"
                    style={{
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', color: '#8892A4',
                        display: 'none',
                    }}
                >
                    <FiX size={18} />
                </button>
            </div>

            {/* Role label */}
            <div style={{ padding: '12px 16px' }}>
                <span className={`badge-${role || 'worker'}`} style={{ fontSize: '11px' }}>
                    {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Worker'} Panel
                </span>
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
                {items.map((item) => {
                    const active = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                marginBottom: '4px',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: active ? 500 : 400,
                                color: active ? '#00D4FF' : '#8892A4',
                                background: active ? '#00D4FF0E' : 'transparent',
                                borderLeft: active ? '2px solid #00D4FF' : '2px solid transparent',
                                transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => {
                                if (!active) {
                                    e.currentTarget.style.color = '#E8EAF0'
                                    e.currentTarget.style.background = '#ffffff08'
                                }
                            }}
                            onMouseLeave={e => {
                                if (!active) {
                                    e.currentTarget.style.color = '#8892A4'
                                    e.currentTarget.style.background = 'transparent'
                                }
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom home link */}
            <div style={{ padding: '16px 12px', borderTop: '1px solid #1B3358' }}>
                <Link href="/" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 12px', borderRadius: '8px',
                    textDecoration: 'none', fontSize: '13px',
                    color: '#4A5568', transition: 'color 0.15s',
                }}
                    onMouseEnter={e => e.currentTarget.style.color = '#8892A4'}
                    onMouseLeave={e => e.currentTarget.style.color = '#4A5568'}
                >
                    ← Back to Home
                </Link>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .dashboard-sidebar {
            transform: ${isOpen ? 'translateX(0)' : 'translateX(-100%)'};
          }
          .sidebar-close-btn { display: flex !important; }
        }
      `}</style>
        </aside>
    )
}

export default DashboardSidebar