import DashboardShell from '../../components/dashboard/DashboardShell'

export const metadata = {
    title: 'Dashboard — TaskNova',
}

export default function DashboardLayout({ children }) {
    return <DashboardShell>{children}</DashboardShell>
}