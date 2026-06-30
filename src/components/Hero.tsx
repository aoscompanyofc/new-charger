import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { IconChevronDown } from './Icons'

interface HeroProps {
  onScrollToForm: () => void
}

const chips = [
  { value: '60 kW',  label: 'Potência de recarga', pos: 'top-[16%] -left-2 lg:left-0', accent: false },
  { value: '24 h',   label: 'Operação contínua',   pos: 'top-[42%] -right-2 lg:right-0', accent: false },
  { value: 'R$ 50K', label: 'Cota mínima',         pos: 'top-[64%] -left-2 lg:left-0', accent: true  },
]

export default function Hero({ onScrollToForm }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const eyebrowRef   = useRef<HTMLParagraphElement>(null)
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const imgRef       = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(eyebrowRef.current,  { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
      .fromTo(subtitleRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.3)
      .fromTo(statsRef.current,    { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.45)
      .fromTo(ctaRef.current,      { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.6)
      .fromTo(imgRef.current,      { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, duration: 0.9 }, 0.1)

    const chipEls = imgRef.current?.querySelectorAll('[data-chip]')
    if (chipEls) {
      gsap.fromTo(chipEls,
        { autoAlpha: 0, y: 12, scale: 0.92 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.6)', delay: 0.75 }
      )
    }
  }, { scope: containerRef, dependencies: [prefersReduced] })

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-steel-deep"
      aria-label="Hero — NewCharged"
    >
      {/* Background sutil — Rodoviária BH */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/images/rodoviaria-bh.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[#172339]/88" />
      </div>

      {/* Grid de fundo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-steel-deep to-transparent" />
      </div>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT (oculto em lg+)
      ══════════════════════════════════════════ */}
      <div className="lg:hidden absolute inset-0 flex flex-col">

        {/* Topo — texto centralizado */}
        <div className="relative z-10 flex-shrink-0 flex flex-col items-center text-center px-6 pt-10">

          {/* Logo */}
          <img
            src="/images/logo-newcharged.png"
            alt="NewCharged"
            width="280"
            height="112"
            className="h-[4.5rem] w-auto object-contain mb-4"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Eyebrow */}
          <p className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.35em] mb-3">
            Belo Horizonte · Junho 2026
          </p>

          {/* Título */}
          <h1 className="font-anton text-[1.55rem] text-white uppercase leading-[1.08] tracking-tight mb-3 max-w-xs">
            Inauguração dos 2 novos eletropostos da Rodoviária de BH
          </h1>

          {/* Linha de acento */}
          <div className="w-10 h-px bg-brand-blue mb-4" aria-hidden="true" />

          {/* Stats */}
          <div className="flex items-start justify-center gap-7 mb-5">
            {[
              { value: '60kW',  label: 'Potência' },
              { value: '24h',   label: 'Operação' },
              { value: 'R$50K', label: 'Cota mínima' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-anton text-xl text-white leading-none">{value}</p>
                <p className="text-white/35 text-[10px] uppercase tracking-[0.18em] mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={onScrollToForm}
              className="bg-brand-blue hover:bg-brand-blue-dim text-white font-bold text-[11px] uppercase tracking-[0.15em] px-6 py-3.5 rounded-lg transition-colors duration-200"
            >
              Receber Apresentação
            </button>
            <button
              onClick={onScrollToForm}
              className="text-white/50 hover:text-white text-[11px] uppercase tracking-[0.15em] underline underline-offset-4 decoration-white/20 transition-all duration-200"
            >
              Investir
            </button>
          </div>
        </div>

        {/* Base — eletroposto centralizado colado no rodapé */}
        <div className="relative flex-1 flex items-end justify-center pb-8" aria-hidden="true">
          {/* Glow azul sutil atrás do carregador */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(43,126,255,0.18) 0%, transparent 70%)' }}
          />
          <img
            src="/images/hero-charger-cutout.webp"
            alt=""
            width="700"
            height="990"
            className="relative z-10 h-[78%] w-auto object-contain object-bottom drop-shadow-2xl"
            style={{
              maskImage: 'linear-gradient(to top, transparent 0%, black 10%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%)',
              filter: 'drop-shadow(0 0 32px rgba(43,126,255,0.15))',
            }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT (oculto abaixo de lg)
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex absolute inset-0 items-center">
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-12 items-center gap-8">

            {/* Texto */}
            <div className="lg:col-span-7 xl:col-span-6">

              <div className="mb-6">
                <img
                  src="/images/logo-newcharged.png"
                  alt="NewCharged"
                  width="280"
                  height="112"
                  className="h-[7.5rem] w-auto object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>

              <p
                ref={eyebrowRef}
                className={`text-brand-blue text-[10px] font-bold uppercase tracking-[0.35em] mb-4 ${prefersReduced ? '' : 'gsap-hidden'}`}
              >
                Belo Horizonte · Junho 2026
              </p>

              <h1 className="font-anton text-[3rem] xl:text-[3.6rem] text-white uppercase leading-[1.08] tracking-tight mb-4">
                Inauguração dos 2 novos eletropostos da Rodoviária de Belo Horizonte
              </h1>

              <div className="w-10 h-px bg-brand-blue mb-4" aria-hidden="true" />

              <p
                ref={subtitleRef}
                className={`text-white/60 text-base leading-relaxed max-w-md mb-6 ${prefersReduced ? '' : 'gsap-hidden'}`}
              >
                A mobilidade elétrica já é uma realidade. A NewCharged expande sua rede com ativos estratégicos em regiões de alto fluxo — conectando tecnologia, localização e rentabilidade.
              </p>

              <div
                ref={statsRef}
                className={`flex items-start gap-10 mb-7 ${prefersReduced ? '' : 'gsap-hidden'}`}
              >
                {[
                  { value: '60kW',  label: 'Potência' },
                  { value: '24h',   label: 'Operação' },
                  { value: 'R$50K', label: 'Cota mínima' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-anton text-3xl text-white leading-none">{value}</p>
                    <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] mt-1.5">{label}</p>
                  </div>
                ))}
              </div>

              <div ref={ctaRef} className={`flex items-center gap-7 ${prefersReduced ? '' : 'gsap-hidden'}`}>
                <button
                  onClick={onScrollToForm}
                  className="bg-brand-blue hover:bg-brand-blue-dim text-white font-bold text-[11px] uppercase tracking-[0.15em] px-7 py-4 rounded-lg transition-colors duration-200"
                  aria-label="Receber apresentação completa"
                >
                  Receber Apresentação
                </button>
                <button
                  onClick={onScrollToForm}
                  className="text-white/50 hover:text-white text-[11px] uppercase tracking-[0.15em] underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-all duration-200"
                >
                  Quero Investir
                </button>
              </div>
            </div>

            {/* Imagem desktop + chips */}
            <div
              ref={imgRef}
              className={`lg:col-span-5 xl:col-span-6 relative h-[86vh] will-change-transform ${prefersReduced ? '' : 'gsap-hidden'}`}
              aria-hidden="true"
            >
              <img
                src="/images/hero-charger-cutout.webp"
                alt="Eletroposto NewCharged"
                width="700"
                height="990"
                className="absolute inset-0 mx-auto h-full w-auto object-contain object-bottom"
                style={{
                  maskImage: 'linear-gradient(to top, transparent 0%, black 16%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 16%)',
                }}
              />

              {chips.map((chip) => (
                <div
                  key={chip.value}
                  data-chip
                  className={`absolute ${chip.pos} ${prefersReduced ? '' : 'opacity-0'}
                    backdrop-blur-md rounded-2xl px-5 py-3.5 min-w-[130px] border shadow-lg
                    ${chip.accent
                      ? 'bg-brand-blue/20 border-brand-blue/40 shadow-brand-blue/10'
                      : 'bg-steel-mid/70 border-white/10 shadow-black/30'
                    }`}
                >
                  <p className="font-anton text-2xl leading-none mb-1 text-white">{chip.value}</p>
                  <p className={`text-[10px] uppercase tracking-[0.2em] ${chip.accent ? 'text-brand-blue' : 'text-white/40'}`}>
                    {chip.label}
                  </p>
                  {chip.accent && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5" aria-hidden="true">
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        <IconChevronDown size={14} className="text-white/20 animate-bounce" />
      </div>
    </section>
  )
}
