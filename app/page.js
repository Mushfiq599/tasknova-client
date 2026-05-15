import MainLayout from '../components/shared/MainLayout'
import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import HowItWorks from '../components/home/HowItWorks'
import TopWorkers from '../components/home/TopWorkers'
import Testimonials from '../components/home/Testimonials'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <TopWorkers />
      <Testimonials />
      <CTASection />
    </MainLayout>
  )
}