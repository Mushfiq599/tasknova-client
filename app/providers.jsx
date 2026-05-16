'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '../context/AuthContext'
import ThemeProvider from '../context/ThemeContext'

const queryClient = new QueryClient()

const Providers = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    {children}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            style: {
                                background: 'var(--color-surface)',
                                color: 'var(--color-text)',
                                border: '1px solid var(--color-border)',
                                fontSize: '14px',
                            },
                            success: {
                                iconTheme: { primary: '#00D4FF', secondary: 'var(--color-surface)' },
                            },
                            error: {
                                iconTheme: { primary: '#EF4444', secondary: 'var(--color-surface)' },
                            },
                        }}
                    />
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default Providers