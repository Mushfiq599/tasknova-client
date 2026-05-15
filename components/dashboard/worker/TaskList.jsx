'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiArrowRight, FiUsers, FiCalendar } from 'react-icons/fi'
import EmptyState from '../../ui/EmptyState'
import axiosInstance from '../../../api/axiosInstance'
import { formatDate, truncate } from '../../../utils/helpers'

const TaskList = () => {
    const router = useRouter()
    const [tasks, setTasks] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosInstance.get('/tasks/available')
            .then(res => {
                setTasks(res.data || [])
                setFiltered(res.data || [])
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    // Search filter
    useEffect(() => {
        const q = search.toLowerCase()
        setFiltered(tasks.filter(t =>
            t.task_title?.toLowerCase().includes(q) ||
            t.Buyer_name?.toLowerCase().includes(q)
        ))
    }, [search, tasks])

    return (
        <div>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Available Tasks
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    Browse and complete tasks to earn coins.
                </p>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '24px' }}>
                <FiSearch size={15} style={{
                    position: 'absolute', left: '14px',
                    top: '50%', transform: 'translateY(-50%)',
                    color: '#4A5568',
                }} />
                <input
                    className="input"
                    style={{ paddingLeft: '40px' }}
                    placeholder="Search tasks or buyers..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '48px', color: '#4A5568' }}>Loading tasks...</div>
            ) : filtered.length === 0 ? (
                <EmptyState icon="📋" title="No tasks available" subtitle="Check back later for new tasks from buyers." />
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                }} className="tasks-grid">
                    {filtered.map(task => (
                        <div key={task._id} className="card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* Task image */}
                            {task.task_image_url && (
                                <img
                                    src={task.task_image_url}
                                    alt={task.task_title}
                                    style={{
                                        width: '100%', height: '140px',
                                        objectFit: 'cover', borderRadius: '8px',
                                        marginBottom: '14px',
                                        border: '1px solid #1B3358',
                                    }}
                                    onError={e => e.target.style.display = 'none'}
                                />
                            )}

                            {/* Title */}
                            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#E8EAF0', marginBottom: '8px' }}>
                                {truncate(task.task_title, 50)}
                            </h3>

                            {/* Buyer */}
                            <p style={{ fontSize: '12px', color: '#4A5568', marginBottom: '14px' }}>
                                by <span style={{ color: '#8892A4' }}>{task.Buyer_name}</span>
                            </p>

                            {/* Meta */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                    <span style={{ color: '#4A5568', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <FiUsers size={12} /> Workers needed
                                    </span>
                                    <span style={{ color: '#00D4FF', fontWeight: 600 }}>{task.required_workers}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                    <span style={{ color: '#4A5568', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <FiCalendar size={12} /> Deadline
                                    </span>
                                    <span style={{ color: '#8892A4' }}>{formatDate(task.completion_date)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                    <span style={{ color: '#4A5568' }}>Reward</span>
                                    <span style={{
                                        background: '#A78BFA18', border: '1px solid #A78BFA44',
                                        color: '#A78BFA', padding: '2px 10px', borderRadius: '20px',
                                        fontWeight: 600, fontSize: '12px',
                                    }}>
                                        ⬡ {task.payable_amount} coins
                                    </span>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => router.push(`/dashboard/task-list/${task._id}`)}
                                className="btn-primary btn-sm"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                View Details <FiArrowRight size={13} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 1024px) {
          .tasks-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .tasks-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}

export default TaskList