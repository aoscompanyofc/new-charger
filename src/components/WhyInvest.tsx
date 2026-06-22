import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { IconPhone } from './Icons'

const WHATSAPP_URL =
  'https://wa.me/5531997328451?text=Ol%C3%A1%21%20Tenho%20interesse%20em%20agendar%20uma%20conversa%20com%20um%20consultor%20sobre%20os%20eletropostos%20da%20NewCharged.'

const benefits = [
  'Mercado em forte crescimento',
  'Infraestrutura com alto potencial de valorização',
  'Receita recorrente proveniente da venda de energia',
  'Operação gerenciada pela NewCharged',
  'Pontos selecionados com alto potencial de fluxo',
  'Participação em ativos reais',
]

export default function WhyInvest() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
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

          {/* Esquerda — declaração editorial */}
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

            {/* Grande número decorativo */}
            <div className="relative mb-12">
              <p className="font-anton text-[5rem] sm:text-[8rem] leading-none text-white/4 select-none" aria-hidden="true">6+</p>
              <div className="absolute bottom-3 left-0">
                <p className="font-anton text-3xl text-white">6 pontos estratégicos</p>
                <p className="text-white/35 text-xs uppercase tracking-[0.2em] mt-2">em Belo Horizonte e região</p>
              </div>
            </div>

            <div className="border-t border-white/8 pt-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/60 hover:text-white text-xs uppercase tracking-[0.15em] transition-colors duration-200 group"
              >
                <span className="w-8 h-px bg-white/20 group-hover:bg-brand-blue group-hover:w-12 transition-all duration-300" />
                <IconPhone size={14} className="text-brand-blue" />
                Falar com um consultor
              </a>
            </div>
          </div>

          {/* Direita — lista numerada, sem cards */}
          <div>
            <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mb-6">Benefícios</p>
            <ul ref={listRef} role="list" className="space-y-0">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-5 py-5 border-b border-white/6 last:border-b-0 will-change-transform ${prefersReduced ? '' : 'gsap-hidden'}`}
                >
                  <span className="text-brand-blue text-[10px] font-mono mt-0.5 flex-shrink-0 w-6 text-right">
                    {String(i + 1).padStart(2, '0')}
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
