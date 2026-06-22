import { useRef } from 'react'
import Hero from './components/Hero'
import WhyInvest from './components/WhyInvest'
import FeaturedStation from './components/FeaturedStation'
import Network from './components/Network'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'

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
      <Hero onScrollToForm={scrollToForm} />
      <WhyInvest />
      <FeaturedStation onScrollToNetwork={scrollToNetwork} />
      <div ref={networkRef}>
        <Network />
      </div>
      <div ref={formRef}>
        <LeadForm />
      </div>
      <Footer onScrollToForm={scrollToForm} />
    </div>
  )
}
