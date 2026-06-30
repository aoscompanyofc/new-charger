import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

const benefits = [
  'Mercado em forte crescimento',
  'Infraestrutura com alto potencial de valorização',
  'Receita recorrente proveniente da venda de energia',
  'Operação gerenciada pela NewCharged',
  'Pontos selecionados com alto potencial de fluxo',
  'Participação em ativos reais',
]

const metrics = [
  { value: '6+',     label: 'Pontos estratégicos' },
  { value: '60 kW',  label: 'Potência por ponto' },
  { value: '24 h',   label: 'Operação contínua' },
]

export default function WhyInvest() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef    = useRef<HTMLUListElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return

    gsap.fromTo(leftRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 85%' } }
    )

    const items = listRef.current?.querySelectorAll('li')
    if (items) {
      gsap.fromTo(items,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 85%' } }
      )
    }
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  return (
    <section
      ref={sectionRef}
      className="bg-[#111b2c] py-16 sm:py-20 lg:py-28"
      aria-labelledby="why-invest-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Esquerda */}
          <div ref={leftRef} className={prefersReduced ? '' : 'gsap-hidden'}>
            <p className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.35em] mb-8">
              Por que investir
            </p>

            <h2
              id="why-invest-heading"
              className="font-anton text-[2rem] sm:text-4xl lg:text-[3.2rem] text-white uppercase leading-[1.08] tracking-tight mb-8"
            >
              O Futuro da Recarga Elétrica
            </h2>

            <p className="text-white/55 text-sm lg:text-base leading-relaxed mb-12 max-w-sm">
              A NewCharged desenvolve e opera eletropostos em pontos de alta demanda, preparados para atender o crescimento acelerado da frota de veículos elétricos no Brasil.
            </p>

            {/* Métricas */}
            <div className="grid grid-cols-3 gap-4">
              {metrics.map(m => (
                <div key={m.value} className="rounded-xl border border-white/8 bg-white/3 px-4 py-5">
                  <p className="font-anton text-2xl text-white leading-none mb-1.5">{m.value}</p>
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em] leading-snug">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Direita — lista */}
          <div>
            <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mb-6">Benefícios</p>
            <ul ref={listRef} role="list" className="space-y-0">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-4 py-5 border-b border-white/6 last:border-b-0 will-change-transform ${prefersReduced ? '' : 'gsap-hidden'}`}
                >
                  {/* Check */}
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#2B7EFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-white/75 text-sm lg:text-base leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
