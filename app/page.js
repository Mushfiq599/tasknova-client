export default function HomePage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <span style={{ fontSize: '52px' }}>⬡</span>
      <h1 style={{ fontSize: '32px', fontWeight: 600, color: '#00D4FF' }}>
        TaskNova
      </h1>
      <p style={{ color: '#8892A4', fontSize: '14px' }}>
        Foundation ready — building in progress...
      </p>
    </main>
  )
}