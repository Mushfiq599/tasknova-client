'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '../context/AuthContext'

const queryClient = new QueryClient()

const Providers = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#111827',
                            color: '#E8EAF0',
                            border: '1px solid #1B3358',
                            fontSize: '14px',
                        },
                        success: {
                            iconTheme: { primary: '#00D4FF', secondary: '#111827' },
                        },
                        error: {
                            iconTheme: { primary: '#EF4444', secondary: '#111827' },
                        },
                    }}
                />
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default Providers