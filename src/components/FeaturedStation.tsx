import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface FeaturedStationProps {
  onScrollToNetwork: () => void
}

const projections = [
  { label: 'Conservador', hours: '4 h/dia', value: 'R$ 1.688', cents: ',00/mês' },
  { label: 'Moderado',    hours: '5 h/dia', value: 'R$ 2.110', cents: ',00/mês', featured: true },
  { label: 'Otimista',   hours: '7 h/dia', value: 'R$ 2.955', cents: ',00/mês' },
]

const differentials = [
  'Operação 24 horas',
  'Recarga rápida até 60 kW',
  'Conexão direta com o Centro de BH',
  'Forte presença de motoristas de aplicativo',
  'Alto potencial de utilização diária',
]

export default function FeaturedStation({ onScrollToNetwork }: FeaturedStationProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const projRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return

    const cols = projRef.current?.querySelectorAll('[data-proj]')
    if (cols) {
      gsap.fromTo(cols,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: projRef.current, start: 'top 85%' } }
      )
    }

    gsap.fromTo(sealRef.current,
      { autoAlpha: 0, scale: 0.96 },
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sealRef.current, start: 'top 85%' } }
    )
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  return (
    <section
      ref={sectionRef}
      className="bg-steel-deep py-16 sm:py-20 lg:py-28"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="mb-14">
          <p className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.35em] mb-5">
            Destaque Exclusivo
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              id="featured-heading"
              className="font-anton text-[2rem] sm:text-4xl lg:text-[3.2rem] text-white uppercase leading-[1.08] tracking-tight max-w-2xl"
            >
              Rodoviária de Belo Horizonte
            </h2>
            <div className="flex items-center gap-2 pb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.25em]">
                Inauguração em 10 dias
              </span>
            </div>
          </div>
        </div>

        {/* Grid: texto + imagem */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">

          {/* Texto */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-white/55 text-sm lg:text-base leading-relaxed mb-10">
                Um dos maiores terminais rodoviários do Brasil, com fluxo praticamente ininterrupto de pessoas, veículos particulares, aplicativos, táxis, vans e ônibus.
              </p>
              <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mb-5">Diferenciais</p>
              <ul role="list" className="space-y-0">
                {differentials.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 py-3.5 border-b border-white/6 last:border-b-0">
                    <span className="w-1 h-1 rounded-full bg-brand-blue flex-shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Imagem */}
          <div className="relative rounded-2xl overflow-hidden min-h-[320px] lg:min-h-auto bg-steel-mid">
            <img
              src="/images/rodoviaria-bh.webp"
              alt="Rodoviária de Belo Horizonte — NewCharged"
              width="600"
              height="849"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-deep/50 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">NewCharged</span>
            </div>
          </div>
        </div>

        {/* Projeções — cards */}
        <div className="border-t border-white/8 pt-14 mb-14">
          <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mb-10">Projeção de rentabilidade</p>
          <div ref={projRef} className="grid sm:grid-cols-3 gap-4">
            {projections.map((proj) => (
              <div
                key={proj.label}
                data-proj
                className={`relative rounded-2xl p-6 lg:p-8 will-change-transform overflow-hidden transition-colors duration-300
                  ${proj.featured
                    ? 'bg-brand-blue/10 border border-brand-blue/30'
                    : 'bg-white/3 border border-white/8 hover:border-white/16'
                  } ${prefersReduced ? '' : 'gsap-hidden'}`}
              >
                {/* Glow de fundo no destaque */}
                {proj.featured && (
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-blue/15 blur-2xl pointer-events-none" />
                )}

                {/* Topo — label + horas */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {proj.featured && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />}
                    <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${proj.featured ? 'text-brand-blue' : 'text-white/35'}`}>
                      {proj.label}
                    </p>
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
                    proj.featured ? 'border-brand-blue/30 text-brand-blue/70 bg-brand-blue/10' : 'border-white/8 text-white/25 bg-white/4'
                  }`}>
                    {proj.hours}
                  </span>
                </div>

                {/* Divisor */}
                <div className={`w-8 h-px mb-5 ${proj.featured ? 'bg-brand-blue/40' : 'bg-white/10'}`} />

                {/* Valor */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-xs font-bold ${proj.featured ? 'text-white/50' : 'text-white/25'}`}>R$</span>
                  <span className={`font-anton text-3xl lg:text-[2.4rem] leading-none ${proj.featured ? 'text-white' : 'text-white/55'}`}>
                    {proj.value.replace('R$ ', '')}
                  </span>
                </div>
                <p className={`text-[10px] uppercase tracking-[0.2em] ${proj.featured ? 'text-white/35' : 'text-white/20'}`}>
                  por mês / cota
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Esgotado */}
        <div
          ref={sealRef}
          className={`border border-white/8 rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 will-change-transform ${prefersReduced ? '' : 'gsap-hidden'}`}
        >
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-400 text-[10px] font-bold uppercase tracking-[0.25em] whitespace-nowrap">
              Cotas Esgotadas
            </span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed flex-1">
            As cotas deste projeto já foram totalmente comercializadas. Ainda é possível investir nos demais eletropostos da rede NewCharged.
          </p>
          <button
            onClick={onScrollToNetwork}
            className="flex-shrink-0 bg-brand-blue hover:bg-brand-blue/85 text-white font-bold text-[11px] uppercase tracking-[0.15em] px-6 py-3.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            Ver Outros Projetos
          </button>
        </div>

      </div>
    </section>
  )
}
