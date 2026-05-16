'use client'

import { useEffect, useState } from 'react'
import { FiTrash2, FiSearch } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Badge from '../../ui/Badge'
import EmptyState from '../../ui/EmptyState'
import axiosInstance from '../../../api/axiosInstance'

const ROLES = ['worker', 'buyer', 'admin']

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [updating, setUpdating] = useState(null)

    const fetchUsers = () => {
        axiosInstance.get('/users')
            .then(res => {
                setUsers(res.data || [])
                setFiltered(res.data || [])
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchUsers() }, [])

    // Search filter
    useEffect(() => {
        const q = search.toLowerCase()
        setFiltered(users.filter(u =>
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role?.toLowerCase().includes(q)
        ))
    }, [search, users])

    const handleRoleChange = async (userId, newRole) => {
        setUpdating(userId)
        try {
            await axiosInstance.patch(`/users/role/${userId}`, { role: newRole })
            toast.success('Role updated successfully')
            fetchUsers()
        } catch {
            toast.error('Failed to update role')
        } finally {
            setUpdating(null)
        }
    }

    const handleDelete = async (user) => {
        if (!confirm(`Remove ${user.name}? This cannot be undone.`)) return
        try {
            await axiosInstance.delete(`/users/${user._id}`)
            toast.success('User removed')
            fetchUsers()
        } catch {
            toast.error('Failed to remove user')
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Manage Users
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    View, update roles, and remove users from the platform.
                </p>
            </div>

            {/* Search + count */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', maxWidth: '360px', flex: 1 }}>
                    <FiSearch size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4A5568' }} />
                    <input
                        className="input" style={{ paddingLeft: '40px' }}
                        placeholder="Search by name, email or role..."
                        value={search} onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <span style={{ fontSize: '13px', color: '#4A5568', whiteSpace: 'nowrap' }}>
                    {filtered.length} user{filtered.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="card">
                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#4A5568' }}>Loading...</div>
                ) : filtered.length === 0 ? (
                    <EmptyState icon="👥" title="No users found" subtitle="Try adjusting your search." />
                ) : (
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Coins</th>
                                    <th>Change Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(u => (
                                    <tr key={u._id}>
                                        {/* Avatar + name */}
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img
                                                    src={u.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${u.email}`}
                                                    alt={u.name}
                                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #1B3358', objectFit: 'cover' }}
                                                />
                                                <span style={{ color: '#E8EAF0', fontWeight: 500, fontSize: '14px' }}>{u.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: '13px' }}>{u.email}</td>
                                        <td><Badge type={u.role} /></td>
                                        <td style={{ color: '#00D4FF', fontWeight: 600 }}>⬡ {u.coins}</td>

                                        {/* Role dropdown */}
                                        <td>
                                            <select
                                                value={u.role}
                                                disabled={updating === u._id}
                                                onChange={e => handleRoleChange(u._id, e.target.value)}
                                                style={{
                                                    background: '#0D1526',
                                                    border: '1px solid #1B3358',
                                                    borderRadius: '6px',
                                                    padding: '5px 10px',
                                                    color: '#E8EAF0',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    outline: 'none',
                                                    opacity: updating === u._id ? 0.5 : 1,
                                                }}
                                            >
                                                {ROLES.map(r => (
                                                    <option key={r} value={r}>
                                                        {r.charAt(0).toUpperCase() + r.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                        {/* Delete */}
                                        <td>
                                            <button
                                                className="btn-danger btn-sm"
                                                onClick={() => handleDelete(u)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                            >
                                                <FiTrash2 size={13} /> Remove
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

export default ManageUsers