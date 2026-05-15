export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

// Worker rate: 20 coins = $1
export const coinsToDollars = (coins) => (coins / 20).toFixed(2)

// Buyer rate: $1 = 10 coins
export const dollarToCoins  = (dollars) => dollars * 10

export const truncate = (str, n = 60) =>
  str?.length > n ? str.slice(0, n) + '...' : str

export const getStatusBadge = (status) => ({
  approved: 'badge-approved',
  pending:  'badge-pending',
  rejected: 'badge-rejected',
}[status] || 'badge-pending')

export const getRoleBadge = (role) => ({
  worker: 'badge-worker',
  buyer:  'badge-buyer',
  admin:  'badge-admin',
}[role] || 'badge-worker')

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export const calcTotalPayable = (workers, amount) =>
  (workers || 0) * (amount || 0)