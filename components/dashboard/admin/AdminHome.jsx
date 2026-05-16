'use client'

import { useEffect, useState } from 'react'
import { FiUsers, FiDollarSign, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import StatCard from '../../ui/StatCard'
import EmptyState from '../../ui/EmptyState'
import Badge from '../../ui/Badge'
import axiosInstance from '../../../api/axiosInstance'
import { formatDate, coinsToDollars } from '../../../utils/helpers'

const AdminHome = () => {
    const [stats, setStats] = useState({ workers: 0, buyers: 0, totalCoins: 0, totalPayments: 0 })
    const [withdrawals, setWithdrawals] = useState([])
    const [loading, setLoading] = useState(true)
    const [approving, setApproving] = useState(null)

    const fetchData = async () => {
        try {
            const [statsRes, withdrawRes] = await Promise.all([
                axiosInstance.get('/admin/stats'),
                axiosInstance.get('/withdrawals/pending'),
            ])
            setStats(statsRes.data)
            setWithdrawals(withdrawRes.data || [])
        } catch {
            // keep defaults
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchData() }, [])

    const handleApprove = async (w) => {
        setApproving(w._id)
        try {
            await axiosInstance.patch(`/withdrawals/approve/${w._id}`, {
                worker_email: w.worker_email,
                withdrawal_coin: w.withdrawal_coin,
            })
            toast.success(`Payment approved for ${w.worker_name}`)
            fetchData()
        } catch {
            toast.error('Approval failed')
        } finally {
            setApproving(null)
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Admin Dashboard
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    Platform overview and pending withdrawal approvals.
                </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}
                className="stats-grid">
                <StatCard label="Total Workers" value={loading ? '—' : stats.workers} icon={<FiUsers />} color="cyan" />
                <StatCard label="Total Buyers" value={loading ? '—' : stats.buyers} icon={<FiUsers />} color="purple" />
                <StatCard label="Coins in System" value={loading ? '—' : stats.totalCoins} icon="⬡" color="amber" />
                <StatCard label="Total Payments" value={loading ? '—' : `$${stats.totalPayments}`} icon={<FiDollarSign />} color="green" />
            </div>

            {/* Withdrawal requests */}
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8EAF0' }}>
                            Pending Withdrawal Requests
                        </h2>
                        <p style={{ fontSize: '13px', color: '#8892A4', marginTop: '2px' }}>
                            Approve payments to release coins from worker accounts
                        </p>
                    </div>
                    {withdrawals.length > 0 && (
                        <span style={{
                            background: '#F59E0B18', border: '1px solid #F59E0B44',
                            color: '#FCD34D', fontSize: '12px', fontWeight: 600,
                            padding: '3px 10px', borderRadius: '20px',
                        }}>
                            {withdrawals.length} pending
                        </span>
                    )}
                </div>

                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#4A5568' }}>Loading...</div>
                ) : withdrawals.length === 0 ? (
                    <EmptyState icon="✅" title="No pending withdrawals" subtitle="All withdrawal requests have been processed." />
                ) : (
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Worker</th>
                                    <th>Amount</th>
                                    <th>Coins</th>
                                    <th>Payment Via</th>
                                    <th>Account</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawals.map(w => (
                                    <tr key={w._id}>
                                        <td style={{ color: '#E8EAF0', fontWeight: 500 }}>
                                            <div>{w.worker_name}</div>
                                            <div style={{ fontSize: '12px', color: '#4A5568' }}>{w.worker_email}</div>
                                        </td>
                                        <td style={{ color: '#34D399', fontWeight: 700 }}>${w.withdrawal_amount}</td>
                                        <td style={{ color: '#00D4FF' }}>⬡ {w.withdrawal_coin}</td>
                                        <td>{w.payment_system}</td>
                                        <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{w.account_number}</td>
                                        <td>{formatDate(w.withdraw_date)}</td>
                                        <td>
                                            <button
                                                className="btn-primary btn-sm"
                                                onClick={() => handleApprove(w)}
                                                disabled={approving === w._id}
                                                style={{
                                                    borderColor: '#10B981', color: '#34D399',
                                                    display: 'flex', alignItems: 'center', gap: '5px',
                                                    opacity: approving === w._id ? 0.6 : 1,
                                                }}
                                            >
                                                <FiCheckCircle size={13} />
                                                {approving === w._id ? 'Processing...' : 'Approve'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}

export default AdminHome