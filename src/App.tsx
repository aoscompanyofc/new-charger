import { useRef } from 'react'
import Hero from './components/Hero'
import WhyInvest from './components/WhyInvest'
import FeaturedStation from './components/FeaturedStation'
import Network from './components/Network'
import Simulator from './components/Simulator'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'
import EnergyBackground from './components/EnergyBackground'

export default function App() {
  const formRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<HTMLDivElement>(null)

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function scrollToNetwork() {
    networkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-steel-deep">
      <EnergyBackground />
      <Hero onScrollToForm={scrollToForm} />
      <WhyInvest />
      <FeaturedStation onScrollToNetwork={scrollToNetwork} />
      <div ref={networkRef}>
        <Network />
      </div>
      <Simulator />
      <div ref={formRef}>
        <LeadForm />
      </div>
      <Footer onScrollToForm={scrollToForm} />
    </div>
  )
}
