import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Fórmula calibrada: 4h=1688, 5h=2110, 7h=2955 → ~422/hora
const RENDIMENTO_POR_HORA = 422
const COTA_VALOR = 50_000

function calcular(horas: number) {
  const por_cota = Math.round(horas * RENDIMENTO_POR_HORA)
  const rent     = (por_cota / COTA_VALOR) * 100
  return { por_cota, rent }
}

function fmt(n: number) {
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Simulator() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const [horas, setHoras] = useState(5)
  const { por_cota, rent } = calcular(horas)

  useGSAP(() => {
    if (prefersReduced) return
    gsap.fromTo(cardRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
    )
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  const pct = ((horas - 1) / (18 - 1)) * 100

  return (
    <section
      ref={sectionRef}
      className="bg-steel-deep py-16 sm:py-20 lg:py-28"
      aria-labelledby="simulator-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="mb-14">
          <p className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.35em] mb-5">
            Simulador
          </p>
          <h2
            id="simulator-heading"
            className="font-anton text-[2rem] sm:text-4xl lg:text-[3.2rem] text-white uppercase leading-[1.08] tracking-tight max-w-2xl"
          >
            Quanto você pode receber por mês
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-lg">
            Ajuste as horas de utilização diária e veja a estimativa de retorno mensal por cota de R$ 50.000.
          </p>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          className={`border border-white/8 rounded-2xl p-8 lg:p-12 will-change-transform ${prefersReduced ? '' : 'gsap-hidden'}`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Slider */}
            <div>
              <div className="flex items-baseline justify-between mb-6">
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Horas de uso por dia</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-anton text-4xl text-white">{horas}</span>
                  <span className="text-white/40 text-sm">h/dia</span>
                </div>
              </div>

              {/* Range input */}
              <div className="relative mb-6">
                <input
                  type="range"
                  min={1}
                  max={18}
                  step={1}
                  value={horas}
                  onChange={e => setHoras(Number(e.target.value))}
                  className="w-full appearance-none h-1 rounded-full outline-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #2B7EFF ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
                  }}
                  aria-label="Horas de utilização por dia"
                />
              </div>

              <div className="flex justify-between text-white/20 text-[10px] uppercase tracking-[0.15em]">
                <span>1h</span>
                <span>18h</span>
              </div>

              {/* Referências */}
              <div className="mt-8 space-y-3">
                {[
                  { h: 3,  label: 'Conservador' },
                  { h: 5,  label: 'Moderado' },
                  { h: 10, label: 'Otimista' },
                ].map(ref => (
                  <button
                    key={ref.h}
                    onClick={() => setHoras(ref.h)}
                    className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] transition-colors duration-150 ${
                      horas === ref.h ? 'text-brand-blue' : 'text-white/25 hover:text-white/50'
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${horas === ref.h ? 'bg-brand-blue' : 'bg-white/20'}`} />
                    {ref.label} — {ref.h}h/dia
                  </button>
                ))}
              </div>
            </div>

            {/* Resultado */}
            <div className="border-t border-white/8 lg:border-t-0 lg:border-l lg:pl-20 pt-10 lg:pt-0">
              <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mb-6">
                Estimativa mensal por cota
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-white/40 text-lg font-anton">R$</span>
                  <span className="font-anton text-[3.5rem] sm:text-[4.5rem] lg:text-[5rem] text-white leading-none">
                    {fmt(por_cota).replace(',', '.')}
                  </span>
                </div>
                <p className="text-white/30 text-xs uppercase tracking-[0.2em]">/mês por cota</p>
              </div>

              {/* Rentabilidade */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-white/10" />
                <div>
                  <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mb-1">Rentabilidade</p>
                  <p className="font-anton text-2xl text-brand-blue">{rent.toFixed(2).replace('.', ',')}%<span className="text-white/30 text-sm font-sans font-normal ml-1">ao mês</span></p>
                </div>
              </div>

              {/* Nota */}
              <p className="text-white/20 text-[10px] leading-relaxed">
                Estimativa baseada em: venda R$ 2,50/kWh · compra R$ 0,75/kWh · potência 60 kW · 2 investidores por eletroposto. Valores brutos antes de IR pessoal do investidor.
              </p>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2B7EFF;
          border: 2px solid #fff;
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(43,126,255,0.2);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2B7EFF;
          border: 2px solid #fff;
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(43,126,255,0.2);
        }
      `}</style>
    </section>
  )
}
