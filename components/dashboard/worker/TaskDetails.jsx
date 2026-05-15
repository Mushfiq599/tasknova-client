'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiCalendar, FiUsers, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'
import axiosInstance from '../../../api/axiosInstance'
import useAuth from '../../../hooks/useAuth'
import { formatDate } from '../../../utils/helpers'
import { FullPageLoader } from '../../ui/LoadingSpinner'

const TaskDetails = ({ id }) => {
    const { user } = useAuth()
    const router = useRouter()
    const [task, setTask] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [details, setDetails] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        axiosInstance.get(`/tasks/${id}`)
            .then(res => setTask(res.data))
            .catch(() => toast.error('Task not found'))
            .finally(() => setLoading(false))
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!details.trim()) { setError('Submission details are required'); return }
        setSubmitting(true)
        try {
            await axiosInstance.post('/submissions', {
                task_id: task._id,
                task_title: task.task_title,
                payable_amount: task.payable_amount,
                worker_email: user.email,
                worker_name: user.displayName,
                Buyer_name: task.Buyer_name,
                Buyer_email: task.Buyer_email,
                submission_details: details,
                current_date: new Date(),
                status: 'pending',
            })
            toast.success('Submission sent for review!')
            router.push('/dashboard/my-submissions')
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Submission failed')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <FullPageLoader />
    if (!task) return (
        <div style={{ textAlign: 'center', padding: '48px', color: '#4A5568' }}>
            Task not found.
        </div>
    )

    return (
        <div style={{ maxWidth: '760px' }}>
            {/* Back */}
            <button
                onClick={() => router.back()}
                className="btn-ghost btn-sm"
                style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
                <FiArrowLeft size={14} /> Back to Tasks
            </button>

            {/* Task card */}
            <div className="card" style={{ marginBottom: '20px' }}>
                {task.task_image_url && (
                    <img
                        src={task.task_image_url}
                        alt={task.task_title}
                        style={{
                            width: '100%', height: '200px', objectFit: 'cover',
                            borderRadius: '8px', marginBottom: '20px',
                            border: '1px solid #1B3358',
                        }}
                        onError={e => e.target.style.display = 'none'}
                    />
                )}

                <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#E8EAF0', marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {task.task_title}
                </h1>

                {/* Meta row */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px', marginBottom: '20px',
                }} className="meta-grid">
                    {[
                        { icon: <FiUser size={14} />, label: 'Buyer', val: task.Buyer_name },
                        { icon: <FiUsers size={14} />, label: 'Workers', val: `${task.required_workers} needed` },
                        { icon: <FiCalendar size={14} />, label: 'Deadline', val: formatDate(task.completion_date) },
                    ].map(({ icon, label, val }) => (
                        <div key={label} style={{
                            background: '#0D1526', border: '1px solid #1B3358',
                            borderRadius: '8px', padding: '12px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4A5568', fontSize: '12px', marginBottom: '4px' }}>
                                {icon} {label}
                            </div>
                            <p style={{ fontSize: '14px', color: '#E8EAF0', fontWeight: 500 }}>{val}</p>
                        </div>
                    ))}
                </div>

                {/* Reward */}
                <div style={{
                    background: '#00D4FF08', border: '1px solid #00D4FF33',
                    borderRadius: '8px', padding: '14px 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '20px',
                }}>
                    <span style={{ fontSize: '13px', color: '#8892A4' }}>Reward per submission</span>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#00D4FF' }}>
                        ⬡ {task.payable_amount} coins
                    </span>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '12px', color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                        Task Description
                    </p>
                    <p style={{ fontSize: '14px', color: '#8892A4', lineHeight: 1.7 }}>
                        {task.task_detail}
                    </p>
                </div>

                {/* Submission info */}
                <div>
                    <p style={{ fontSize: '12px', color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                        What to Submit
                    </p>
                    <p style={{ fontSize: '14px', color: '#A78BFA', lineHeight: 1.7 }}>
                        {task.submission_info}
                    </p>
                </div>
            </div>

            {/* Submission form */}
            <div className="card" style={{ borderColor: '#00D4FF33' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8EAF0', marginBottom: '16px' }}>
                    Submit Your Work
                </h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label className="label">Submission Details</label>
                        <textarea
                            className="input"
                            rows={5}
                            placeholder={`Paste your ${task.submission_info || 'proof'} here...`}
                            value={details}
                            onChange={e => { setDetails(e.target.value); setError('') }}
                            style={{
                                resize: 'vertical', minHeight: '120px',
                                borderColor: error ? '#EF4444' : undefined,
                            }}
                        />
                        {error && <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{error}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary"
                        style={{
                            width: '100%', justifyContent: 'center',
                            padding: '12px', fontSize: '15px',
                            opacity: submitting ? 0.7 : 1,
                            cursor: submitting ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {submitting ? 'Submitting...' : 'Submit for Review'}
                    </button>
                </form>
            </div>

            <style>{`
        @media (max-width: 640px) {
          .meta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}

export default TaskDetails