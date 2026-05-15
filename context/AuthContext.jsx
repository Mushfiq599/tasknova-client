'use client'

import { createContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import axiosInstance from '../api/axiosInstance'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    const register = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password)

    const updateUserProfile = (name, photoURL) =>
        updateProfile(auth.currentUser, { displayName: name, photoURL })

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password)

    const googleLogin = () => signInWithPopup(auth, googleProvider)

    const logout = () => {
        localStorage.removeItem('access-token')
        setRole(null)
        return signOut(auth)
    }

    const fetchRole = async (email) => {
        try {
            const res = await axiosInstance.get(`/users/role/${email}`)
            setRole(res.data.role)
        } catch {
            setRole(null)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                try {
                    const res = await axiosInstance.post('/auth/jwt', {
                        email: currentUser.email,
                    })
                    localStorage.setItem('access-token', res.data.token)
                } catch {
                    // silent — token may already exist
                }
                await fetchRole(currentUser.email)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{
            user, role, loading,
            register, updateUserProfile,
            login, googleLogin, logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider