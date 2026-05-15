'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '../../hooks/useAuth'
import { FullPageLoader } from '../ui/LoadingSpinner'

const DashboardRedirect = () => {
    const { role, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (loading) return
        if (role === 'admin') router.replace('/dashboard/admin-home')
        else if (role === 'buyer') router.replace('/dashboard/buyer-home')
        else router.replace('/dashboard/worker-home')
    }, [role, loading, router])

    return <FullPageLoader />
}

export default DashboardRedirect