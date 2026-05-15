'use client'

import { useEffect, useState } from 'react'
import Badge from '../../ui/Badge'
import EmptyState from '../../ui/EmptyState'
import useAuth from '../../../hooks/useAuth'
import axiosInstance from '../../../api/axiosInstance'
import { formatDate } from '../../../utils/helpers'

const ITEMS_PER_PAGE = 10

const MySubmissions = () => {
    const { user } = useAuth()
    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

    useEffect(() => {
        if (!user?.email) return
        setLoading(true)
        axiosInstance.get(`/submissions/worker/${user.email}?page=${page}&limit=${ITEMS_PER_PAGE}`)
            .then(res => {
                setSubmissions(res.data?.submissions || [])
                setTotal(res.data?.total || 0)
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [user?.email, page])

    return (
        <div>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    My Submissions
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    Track all your submitted work and their approval status.
                </p>
            </div>

            <div className="card">
                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#4A5568' }}>Loading...</div>
                ) : submissions.length === 0 ? (
                    <EmptyState
                        icon="📤"
                        title="No submissions yet"
                        subtitle="Complete a task and submit your work to see it here."
                    />
                ) : (
                    <>
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Title</th>
                                        <th>Buyer</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map((s, i) => (
                                        <tr key={s._id}>
                                            <td style={{ color: '#4A5568' }}>
                                                {(page - 1) * ITEMS_PER_PAGE + i + 1}
                                            </td>
                                            <td style={{ color: '#E8EAF0', fontWeight: 500 }}>{s.task_title}</td>
                                            <td>{s.Buyer_name}</td>
                                            <td style={{ color: '#00D4FF', fontWeight: 600 }}>
                                                ⬡ {s.payable_amount}
                                            </td>
                                            <td>{formatDate(s.current_date)}</td>
                                            <td><Badge type={s.status} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div style={{
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: '20px', paddingTop: '16px',
                                borderTop: '1px solid #1B3358',
                            }}>
                                <p style={{ fontSize: '13px', color: '#4A5568' }}>
                                    Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, total)} of {total}
                                </p>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button
                                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                                        disabled={page === 1}
                                        className="btn-ghost btn-sm"
                                        style={{ opacity: page === 1 ? 0.4 : 1 }}
                                    >
                                        ← Prev
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                        .map((p, i, arr) => (
                                            <>
                                                {i > 0 && arr[i - 1] !== p - 1 && (
                                                    <span key={`dots-${p}`} style={{ color: '#4A5568', padding: '6px 4px', fontSize: '13px' }}>...</span>
                                                )}
                                                <button
                                                    key={p}
                                                    onClick={() => setPage(p)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        borderRadius: '6px',
                                                        border: `1px solid ${page === p ? '#00D4FF' : '#1B3358'}`,
                                                        background: page === p ? '#00D4FF18' : 'transparent',
                                                        color: page === p ? '#00D4FF' : '#8892A4',
                                                        cursor: 'pointer', fontSize: '13px',
                                                        transition: 'all 0.15s',
                                                    }}
                                                >
                                                    {p}
                                                </button>
                                            </>
                                        ))
                                    }
                                    <button
                                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                        disabled={page === totalPages}
                                        className="btn-ghost btn-sm"
                                        style={{ opacity: page === totalPages ? 0.4 : 1 }}
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default MySubmissions