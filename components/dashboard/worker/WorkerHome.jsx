'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiFileText, FiClock, FiDollarSign, FiArrowRight } from 'react-icons/fi'
import StatCard from '../../ui/StatCard'
import EmptyState from '../../ui/EmptyState'
import Badge from '../../ui/Badge'
import useAuth from '../../../hooks/useAuth'
import axiosInstance from '../../../api/axiosInstance'
import { formatDate, coinsToDollars } from '../../../utils/helpers'

const WorkerHome = () => {
    const { user } = useAuth()
    const [stats, setStats] = useState({ total: 0, pending: 0, earning: 0 })
    const [approved, setApproved] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.email) return
        const fetchData = async () => {
            try {
                const [statsRes, approvedRes] = await Promise.all([
                    axiosInstance.get(`/submissions/worker-stats/${user.email}`),
                    axiosInstance.get(`/submissions/approved/${user.email}`),
                ])
                setStats(statsRes.data)
                setApproved(approvedRes.data || [])
            } catch {
                // keep defaults
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [user?.email])

    return (
        <div>
            {/* Page header */}
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Worker Dashboard
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    Track your submissions, earnings and task progress.
                </p>
            </div>

            {/* Stat cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px',
            }} className="stats-grid">
                <StatCard
                    label="Total Submissions"
                    value={loading ? '—' : stats.total}
                    icon={<FiFileText />}
                    color="cyan"
                    sub="All time submissions"
                />
                <StatCard
                    label="Pending Submissions"
                    value={loading ? '—' : stats.pending}
                    icon={<FiClock />}
                    color="amber"
                    sub="Awaiting buyer review"
                />
                <StatCard
                    label="Total Earnings"
                    value={loading ? '—' : `$${coinsToDollars(stats.earning)}`}
                    icon={<FiDollarSign />}
                    color="green"
                    sub={`${stats.earning} coins earned`}
                />
            </div>

            {/* Approved submissions table */}
            <div className="card">
                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}>
                    <div>
                        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8EAF0' }}>
                            Approved Submissions
                        </h2>
                        <p style={{ fontSize: '13px', color: '#8892A4', marginTop: '2px' }}>
                            Tasks that have been approved by buyers
                        </p>
                    </div>
                    <Link href="/dashboard/my-submissions" className="btn-ghost btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        View All <FiArrowRight size={13} />
                    </Link>
                </div>

                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#4A5568', fontSize: '14px' }}>
                        Loading...
                    </div>
                ) : approved.length === 0 ? (
                    <EmptyState
                        icon="✅"
                        title="No approved submissions yet"
                        subtitle="Complete tasks and get them approved to see them here."
                    />
                ) : (
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Task Title</th>
                                    <th>Buyer</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approved.slice(0, 8).map((s) => (
                                    <tr key={s._id}>
                                        <td style={{ color: '#E8EAF0', fontWeight: 500 }}>{s.task_title}</td>
                                        <td>{s.Buyer_name}</td>
                                        <td style={{ color: '#00D4FF', fontWeight: 600 }}>+{s.payable_amount} coins</td>
                                        <td>{formatDate(s.current_date)}</td>
                                        <td><Badge type={s.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}

export default WorkerHome