'use client'

const Badge = ({ type }) => {
    const map = {
        approved: 'badge-approved',
        pending: 'badge-pending',
        rejected: 'badge-rejected',
        worker: 'badge-worker',
        buyer: 'badge-buyer',
        admin: 'badge-admin',
    }
    const cls = map[type?.toLowerCase()] || 'badge-pending'

    return (
        <span className={cls}>
            {type?.charAt(0).toUpperCase() + type?.slice(1)}
        </span>
    )
}

export default Badge