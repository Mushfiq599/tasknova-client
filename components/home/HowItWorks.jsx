'use client'

import SectionHeading from '../ui/SectionHeading'

const workerSteps = [
    { step: '01', title: 'Create Account', desc: 'Register as a Worker and get 10 free coins to start.', icon: '👤' },
    { step: '02', title: 'Browse Tasks', desc: 'Explore available tasks from buyers across many categories.', icon: '🔍' },
    { step: '03', title: 'Submit Your Work', desc: 'Complete the task and submit your proof for review.', icon: '📤' },
    { step: '04', title: 'Get Paid', desc: 'Once approved, coins are added. Withdraw anytime.', icon: '💸' },
]

const buyerSteps = [
    { step: '01', title: 'Register as Buyer', desc: 'Sign up as a Buyer and receive 50 coins on registration.', icon: '🧑‍💼' },
    { step: '02', title: 'Purchase Coins', desc: 'Top up your wallet using Stripe to fund your tasks.', icon: '💳' },
    { step: '03', title: 'Post a Task', desc: 'Create a task with details, deadline, and coin reward.', icon: '📋' },
    { step: '04', title: 'Review & Approve', desc: 'Check submissions and approve quality work to release pay.', icon: '✅' },
]

const StepCard = ({ step, title, desc, icon, accent }) => (
    <div style={{
        display: 'flex', gap: '16px', alignItems: 'flex-start',
    }}>
        <div style={{
            width: '48px', height: '48px', flexShrink: 0,
            background: `${accent}12`,
            border: `1px solid ${accent}33`,
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px',
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '11px', color: accent, fontWeight: 600, letterSpacing: '0.1em', marginBottom: '4px' }}>
                STEP {step}
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#E8EAF0', marginBottom: '6px' }}>{title}</h4>
            <p style={{ fontSize: '13px', color: '#8892A4', lineHeight: 1.6 }}>{desc}</p>
        </div>
    </div>
)

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="section" style={{ background: '#080C1888' }}>
            <div className="container">
                <SectionHeading
                    label="How It Works"
                    title="Simple Steps to"
                    highlight="Start Earning"
                    subtitle="Whether you want to complete tasks or post them, TaskNova makes it easy to get started in minutes."
                    center
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                }} className="hiw-grid">
                    {/* Workers panel */}
                    <div className="card" style={{ borderColor: '#00D4FF33' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            marginBottom: '28px',
                            paddingBottom: '16px',
                            borderBottom: '1px solid #1B3358',
                        }}>
                            <span style={{
                                background: '#00D4FF18', border: '1px solid #00D4FF55',
                                color: '#00D4FF', fontSize: '12px', fontWeight: 600,
                                padding: '4px 12px', borderRadius: '20px',
                            }}>
                                For Workers
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {workerSteps.map((s) => (
                                <StepCard key={s.step} {...s} accent="#00D4FF" />
                            ))}
                        </div>
                    </div>

                    {/* Buyers panel */}
                    <div className="card" style={{ borderColor: '#7C3AED33' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            marginBottom: '28px',
                            paddingBottom: '16px',
                            borderBottom: '1px solid #1B3358',
                        }}>
                            <span style={{
                                background: '#7C3AED18', border: '1px solid #7C3AED55',
                                color: '#A78BFA', fontSize: '12px', fontWeight: 600,
                                padding: '4px 12px', borderRadius: '20px',
                            }}>
                                For Buyers
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {buyerSteps.map((s) => (
                                <StepCard key={s.step} {...s} accent="#A78BFA" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .hiw-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    )
}

export default HowItWorks