'use client'

const stats = [
    { value: '10,000+', label: 'Registered Workers', icon: '👷', color: 'cyan' },
    { value: '50,000+', label: 'Tasks Completed', icon: '✅', color: 'purple' },
    { value: '$120K+', label: 'Total Paid Out', icon: '💰', color: 'green' },
    { value: '2,500+', label: 'Active Buyers', icon: '🧑‍💼', color: 'amber' },
]

const colors = {
    cyan: { val: '#00D4FF', bg: '#00D4FF12', border: '#00D4FF33' },
    purple: { val: '#A78BFA', bg: '#7C3AED12', border: '#7C3AED33' },
    green: { val: '#34D399', bg: '#10B98112', border: '#10B98133' },
    amber: { val: '#FCD34D', bg: '#F59E0B12', border: '#F59E0B33' },
}

const StatsSection = () => {
    return (
        <section style={{ padding: '0 0 80px' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                }} className="stats-grid">
                    {stats.map(({ value, label, icon, color }) => {
                        const c = colors[color]
                        return (
                            <div key={label} className="card" style={{ borderColor: c.border, textAlign: 'center' }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    background: c.bg, border: `1px solid ${c.border}`,
                                    borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '22px', margin: '0 auto 12px',
                                }}>
                                    {icon}
                                </div>
                                <p style={{ fontSize: '26px', fontWeight: 700, color: c.val }}>{value}</p>
                                <p style={{ fontSize: '13px', color: '#8892A4', marginTop: '4px' }}>{label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    )
}

export default StatsSection