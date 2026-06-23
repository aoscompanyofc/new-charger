import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { IconChevronDown } from './Icons'

interface HeroProps {
  onScrollToForm: () => void
}

const chips = [
  { value: '60 kW', label: 'Potência de recarga', pos: 'top-[18%] left-0', accent: false },
  { value: '24 h', label: 'Operação contínua',   pos: 'top-[42%] right-0', accent: false },
  { value: 'R$ 50K', label: 'Cota mínima',       pos: 'top-[63%] left-0', accent: true  },
]

export default function Hero({ onScrollToForm }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(eyebrowRef.current,  { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
      .fromTo(subtitleRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.3)
      .fromTo(statsRef.current,    { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.45)
      .fromTo(ctaRef.current,      { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.6)
      .fromTo(imgRef.current,      { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.9 }, 0.1)

    /* chips aparecem depois da imagem */
    const chipEls = imgRef.current?.querySelectorAll('[data-chip]')
    if (chipEls) {
      gsap.fromTo(chipEls,
        { autoAlpha: 0, y: 12, scale: 0.92 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.6)', delay: 0.7 }
      )
    }
  }, { scope: containerRef, dependencies: [prefersReduced] })

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden flex items-center bg-steel-deep"
      aria-label="Hero — NewCharged"
    >
      {/* Fundo grid técnico */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-steel-deep to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 items-center gap-6 lg:gap-8">

          {/* ── Texto ── */}
          <div className="lg:col-span-7 xl:col-span-6">

            {/* Logo */}
            <div className="mb-7">
              <img
                src="/images/logo-newcharged.png"
                alt="NewCharged"
                width="240"
                height="96"
                className="h-[4.5rem] sm:h-[5.5rem] lg:h-[6.5rem] w-auto object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>

            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              className={`text-brand-blue text-[10px] font-bold uppercase tracking-[0.35em] mb-5 ${prefersReduced ? '' : 'gsap-hidden'}`}
            >
              Belo Horizonte · Junho 2026
            </p>

            {/* Título */}
            <h1 className="font-anton text-[1.75rem] sm:text-[2.4rem] lg:text-[3rem] xl:text-[3.6rem] text-white uppercase leading-[1.08] tracking-tight mb-5">
              Inauguração dos 2 novos eletropostos da Rodoviária de Belo Horizonte
            </h1>

            {/* Linha de acento */}
            <div className="w-10 h-px bg-brand-blue mb-5" aria-hidden="true" />

            {/* Subtítulo */}
            <p
              ref={subtitleRef}
              className={`text-white/60 text-sm lg:text-base leading-relaxed max-w-md mb-8 ${prefersReduced ? '' : 'gsap-hidden'}`}
            >
              A mobilidade elétrica já é uma realidade. A NewCharged expande sua rede com ativos estratégicos em regiões de alto fluxo — conectando tecnologia, localização e rentabilidade.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className={`flex items-start gap-6 sm:gap-10 mb-8 sm:mb-10 ${prefersReduced ? '' : 'gsap-hidden'}`}
            >
              {[
                { value: '60kW',  label: 'Potência' },
                { value: '24h',   label: 'Operação' },
                { value: 'R$50K', label: 'Cota mínima' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-anton text-2xl sm:text-3xl text-white leading-none">{value}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-1.5">{label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className={`flex items-center gap-7 ${prefersReduced ? '' : 'gsap-hidden'}`}>
              <button
                onClick={onScrollToForm}
                className="bg-brand-blue hover:bg-brand-blue/85 text-white font-bold text-[11px] uppercase tracking-[0.15em] px-7 py-4 rounded-lg transition-colors duration-200"
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

          {/* ── Imagem + chips ── */}
          <div
            ref={imgRef}
            className={`hidden lg:block lg:col-span-5 xl:col-span-6 relative h-[86vh] will-change-transform ${prefersReduced ? '' : 'gsap-hidden'}`}
            aria-hidden="true"
          >
            {/* Charger */}
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

            {/* Floating stat chips */}
            {chips.map((chip) => (
              <div
                key={chip.value}
                data-chip
                className={`absolute ${chip.pos} ${prefersReduced ? '' : 'opacity-0'}
                  backdrop-blur-md rounded-2xl px-5 py-3.5 min-w-[130px]
                  border shadow-lg
                  ${chip.accent
                    ? 'bg-brand-blue/20 border-brand-blue/40 shadow-brand-blue/10'
                    : 'bg-steel-mid/70 border-white/10 shadow-black/30'
                  }`}
              >
                <p className={`font-anton text-2xl leading-none mb-1 ${chip.accent ? 'text-white' : 'text-white'}`}>
                  {chip.value}
                </p>
                <p className={`text-[10px] uppercase tracking-[0.2em] ${chip.accent ? 'text-brand-blue/80' : 'text-white/40'}`}>
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

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5" aria-hidden="true">
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        <IconChevronDown size={14} className="text-white/20 animate-bounce" />
      </div>
    </section>
  )
}
