'use client'

import { useEffect, useState } from 'react'
import { FiDollarSign } from 'react-icons/fi'
import toast from 'react-hot-toast'
import StatCard from '../../ui/StatCard'
import EmptyState from '../../ui/EmptyState'
import Badge from '../../ui/Badge'
import useAuth from '../../../hooks/useAuth'
import axiosInstance from '../../../api/axiosInstance'
import { coinsToDollars, formatDate } from '../../../utils/helpers'

const MIN_COINS     = 200
const PAYMENT_SYSTEMS = ['Bkash', 'Nagad', 'Rocket', 'Stripe', 'Other']

const Withdrawals = () => {
  const { user }                  = useAuth()
  const [coins, setCoins]         = useState(0)
  const [history, setHistory]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm]           = useState({
    coinToWithdraw: '',
    withdrawAmount: 0,
    paymentSystem: 'Bkash',
    accountNumber: '',
  })
  const [errors, setErrors]       = useState({})

  useEffect(() => {
    if (!user?.email) return
    Promise.all([
      axiosInstance.get(`/users/coins/${user.email}`),
      axiosInstance.get(`/withdrawals/${user.email}`),
    ])
      .then(([coinsRes, historyRes]) => {
        setCoins(coinsRes.data?.coins || 0)
        setHistory(historyRes.data || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user?.email])

  const handleCoinChange = (e) => {
    const val = Number(e.target.value)
    setForm(f => ({
      ...f,
      coinToWithdraw: e.target.value,
      withdrawAmount: +(val / 20).toFixed(2),
    }))
    setErrors(err => ({ ...err, coinToWithdraw: '' }))
  }

  const validate = () => {
    const e = {}
    const c = Number(form.coinToWithdraw)
    if (!c || c <= 0)        e.coinToWithdraw = 'Enter a valid coin amount'
    else if (c > coins)      e.coinToWithdraw = 'Exceeds your available coins'
    else if (c < MIN_COINS)  e.coinToWithdraw = `Minimum withdrawal is ${MIN_COINS} coins`
    if (!form.accountNumber.trim()) e.accountNumber = 'Account number is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await axiosInstance.post('/withdrawals', {
        worker_email:     user.email,
        worker_name:      user.displayName,
        withdrawal_coin:  Number(form.coinToWithdraw),
        withdrawal_amount: form.withdrawAmount,
        payment_system:   form.paymentSystem,
        account_number:   form.accountNumber,
        withdraw_date:    new Date(),
        status:           'pending',
      })
      toast.success('Withdrawal request submitted!')
      setCoins(c => c - Number(form.coinToWithdraw))
      setForm({ coinToWithdraw: '', withdrawAmount: 0, paymentSystem: 'Bkash', accountNumber: '' })
      // Refresh history
      const res = await axiosInstance.get(`/withdrawals/${user.email}`)
      setHistory(res.data || [])
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Request failed')
    } finally {
      setSubmitting(false)
    }
  }

  const canWithdraw = coins >= MIN_COINS

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
          Withdrawals
        </h1>
        <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
          Withdraw your earned coins as real money. Minimum {MIN_COINS} coins (${coinsToDollars(MIN_COINS)}).
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}
        className="withdraw-stats">
        <StatCard
          label="Available Coins"
          value={loading ? '—' : coins}
          icon="⬡"
          color="cyan"
          sub={`≈ $${coinsToDollars(coins)} withdrawable`}
        />
        <StatCard
          label="Total Withdrawn"
          value={loading ? '—' : `$${history.filter(h => h.status === 'approved').reduce((s, h) => s + h.withdrawal_amount, 0).toFixed(2)}`}
          icon={<FiDollarSign />}
          color="green"
          sub="All approved withdrawals"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}
        className="withdraw-grid">
        {/* Form */}
        <div className="card" style={{ borderColor: canWithdraw ? '#00D4FF33' : '#1B3358' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8EAF0', marginBottom: '20px' }}>
            Request Withdrawal
          </h2>

          {!canWithdraw ? (
            <div style={{
              background: '#F59E0B10', border: '1px solid #F59E0B33',
              borderRadius: '8px', padding: '14px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '24px', marginBottom: '8px' }}>🪙</p>
              <p style={{ fontSize: '14px', color: '#FCD34D', fontWeight: 500 }}>Insufficient Coins</p>
              <p style={{ fontSize: '13px', color: '#8892A4', marginTop: '4px' }}>
                You need at least {MIN_COINS} coins to withdraw. You have {coins}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Coins input */}
              <div style={{ marginBottom: '14px' }}>
                <label className="label">Coins to Withdraw</label>
                <input
                  type="number" className="input"
                  placeholder={`Min ${MIN_COINS} coins`}
                  value={form.coinToWithdraw}
                  onChange={handleCoinChange}
                  min={MIN_COINS} max={coins}
                  style={{ borderColor: errors.coinToWithdraw ? '#EF4444' : undefined }}
                />
                {errors.coinToWithdraw && (
                  <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{errors.coinToWithdraw}</p>
                )}
              </div>

              {/* Withdraw amount (read-only) */}
              <div style={{ marginBottom: '14px' }}>
                <label className="label">Withdraw Amount (USD)</label>
                <input
                  type="text" className="input"
                  value={form.withdrawAmount > 0 ? `$${form.withdrawAmount}` : '$0.00'}
                  readOnly
                  style={{ background: '#080C18', color: '#00D4FF', fontWeight: 600, cursor: 'not-allowed' }}
                />
                <p style={{ fontSize: '11px', color: '#4A5568', marginTop: '4px' }}>20 coins = $1.00</p>
              </div>

              {/* Payment system */}
              <div style={{ marginBottom: '14px' }}>
                <label className="label">Payment System</label>
                <select
                  className="input"
                  value={form.paymentSystem}
                  onChange={e => setForm(f => ({ ...f, paymentSystem: e.target.value }))}
                >
                  {PAYMENT_SYSTEMS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Account number */}
              <div style={{ marginBottom: '20px' }}>
                <label className="label">Account Number</label>
                <input
                  type="text" className="input"
                  placeholder="Enter your account number"
                  value={form.accountNumber}
                  onChange={e => { setForm(f => ({ ...f, accountNumber: e.target.value })); setErrors(err => ({ ...err, accountNumber: '' })) }}
                  style={{ borderColor: errors.accountNumber ? '#EF4444' : undefined }}
                />
                {errors.accountNumber && (
                  <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{errors.accountNumber}</p>
                )}
              </div>

              <button
                type="submit" disabled={submitting}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? 'Submitting...' : 'Request Withdrawal'}
              </button>
            </form>
          )}
        </div>

        {/* History */}
        <div className="card">
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8EAF0', marginBottom: '16px' }}>
            Withdrawal History
          </h2>
          {loading ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#4A5568' }}>Loading...</div>
          ) : history.length === 0 ? (
            <EmptyState icon="💸" title="No withdrawals yet" subtitle="Your withdrawal history will appear here." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {history.map(h => (
                <div key={h._id} style={{
                  background: '#0D1526', border: '1px solid #1B3358',
                  borderRadius: '8px', padding: '12px 14px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#E8EAF0', fontWeight: 500 }}>
                      ${h.withdrawal_amount} via {h.payment_system}
                    </p>
                    <p style={{ fontSize: '12px', color: '#4A5568', marginTop: '2px' }}>
                      {formatDate(h.withdraw_date)} · {h.withdrawal_coin} coins
                    </p>
                  </div>
                  <Badge type={h.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .withdraw-stats { grid-template-columns: 1fr !important; }
          .withdraw-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default Withdrawals