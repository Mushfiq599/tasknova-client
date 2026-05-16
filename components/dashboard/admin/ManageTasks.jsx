'use client'

import { useEffect, useState } from 'react'
import { FiTrash2, FiSearch } from 'react-icons/fi'
import toast from 'react-hot-toast'
import EmptyState from '../../ui/EmptyState'
import axiosInstance from '../../../api/axiosInstance'
import { formatDate, truncate } from '../../../utils/helpers'

const ManageTasks = () => {
    const [tasks, setTasks] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [deleting, setDeleting] = useState(null)

    const fetchTasks = () => {
        axiosInstance.get('/tasks')
            .then(res => {
                setTasks(res.data || [])
                setFiltered(res.data || [])
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchTasks() }, [])

    // Search filter
    useEffect(() => {
        const q = search.toLowerCase()
        setFiltered(tasks.filter(t =>
            t.task_title?.toLowerCase().includes(q) ||
            t.Buyer_name?.toLowerCase().includes(q) ||
            t.Buyer_email?.toLowerCase().includes(q)
        ))
    }, [search, tasks])

    const handleDelete = async (task) => {
        if (!confirm(`Delete "${task.task_title}"?`)) return
        setDeleting(task._id)
        try {
            await axiosInstance.delete(`/tasks/${task._id}`)
            toast.success('Task deleted')
            fetchTasks()
        } catch {
            toast.error('Failed to delete task')
        } finally {
            setDeleting(null)
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Manage Tasks
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    View and delete tasks posted by buyers on the platform.
                </p>
            </div>

            {/* Search + count */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', maxWidth: '360px', flex: 1 }}>
                    <FiSearch size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4A5568' }} />
                    <input
                        className="input" style={{ paddingLeft: '40px' }}
                        placeholder="Search by title or buyer..."
                        value={search} onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <span style={{ fontSize: '13px', color: '#4A5568', whiteSpace: 'nowrap' }}>
                    {filtered.length} task{filtered.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="card">
                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#4A5568' }}>Loading...</div>
                ) : filtered.length === 0 ? (
                    <EmptyState icon="📋" title="No tasks found" subtitle="Try adjusting your search." />
                ) : (
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Task Title</th>
                                    <th>Buyer</th>
                                    <th>Workers</th>
                                    <th>Per Worker</th>
                                    <th>Deadline</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(t => (
                                    <tr key={t._id}>
                                        <td>
                                            <div style={{ color: '#E8EAF0', fontWeight: 500 }}>
                                                {truncate(t.task_title, 40)}
                                            </div>
                                            {t.task_image_url && (
                                                <div style={{ fontSize: '11px', color: '#4A5568', marginTop: '2px' }}>
                                                    Has image
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '13px', color: '#E8EAF0' }}>{t.Buyer_name}</div>
                                            <div style={{ fontSize: '11px', color: '#4A5568' }}>{t.Buyer_email}</div>
                                        </td>
                                        <td style={{ color: '#00D4FF', fontWeight: 600 }}>{t.required_workers}</td>
                                        <td style={{ color: '#A78BFA', fontWeight: 600 }}>⬡ {t.payable_amount}</td>
                                        <td style={{ fontSize: '13px' }}>{formatDate(t.completion_date)}</td>
                                        <td>
                                            <button
                                                className="btn-danger btn-sm"
                                                onClick={() => handleDelete(t)}
                                                disabled={deleting === t._id}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '4px',
                                                    opacity: deleting === t._id ? 0.5 : 1,
                                                }}
                                            >
                                                <FiTrash2 size={13} />
                                                {deleting === t._id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageTasks