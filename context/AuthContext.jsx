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
    const [coins, setCoins] = useState(0)
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
        setCoins(0)
        return signOut(auth)
    }

    const fetchUserData = async (email) => {
        try {
            const [roleRes, coinsRes] = await Promise.all([
                axiosInstance.get(`/users/role/${email}`),
                axiosInstance.get(`/users/coins/${email}`),
            ])
            setRole(roleRes.data.role)
            setCoins(coinsRes.data.coins || 0)
        } catch {
            setRole(null)
            setCoins(0)
        }
    }

    // Call this to refresh coins after any transaction
    const refreshCoins = async (email) => {
        try {
            const res = await axiosInstance.get(`/users/coins/${email}`)
            setCoins(res.data.coins || 0)
        } catch {
            // silent
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
                    // silent
                }
                await fetchUserData(currentUser.email)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{
            user, role, coins, loading,
            register, updateUserProfile,
            login, googleLogin, logout,
            refreshCoins,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider