import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

const WA_NUMBER = '5531997328451'

interface FormState {
  name: string
  phone: string
  email: string
  profile: string
}

const profiles = [
  'Pessoa física',
  'Empresário / Empreendedor',
  'Fundo / Family office',
  'Outro',
]

function buildWhatsAppUrl(form: FormState): string {
  const lines = [
    'Olá! Quero ser acionista de um eletroposto NewCharged.',
    '',
    `*Nome:* ${form.name}`,
    `*Telefone:* ${form.phone}`,
    `*E-mail:* ${form.email}`,
  ]
  if (form.profile) lines.push(`*Perfil:* ${form.profile}`)
  lines.push('', 'Aguardo o contato de um especialista. Obrigado!')
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}

export default function LeadForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const [form, setForm] = useState<FormState>({ name: '', phone: '', email: '', profile: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useGSAP(() => {
    if (prefersReduced) return

    gsap.fromTo(leftRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
    )
    gsap.fromTo(rightRef.current,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
    )
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      window.open(buildWhatsAppUrl(form), '_blank', 'noopener,noreferrer')
    }, 600)
  }

  return (
    <section
      ref={sectionRef}
      id="lead-form"
      className="bg-steel-deep py-16 sm:py-20 lg:py-28"
      aria-labelledby="form-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Esquerda */}
          <div
            ref={leftRef}
            className={`${prefersReduced ? '' : 'gsap-hidden'}`}
          >
            <p className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.35em] mb-7">
              Quero Investir
            </p>
            <h2
              id="form-heading"
              className="font-anton text-[2rem] sm:text-4xl lg:text-[3.2rem] text-white uppercase leading-[1.08] tracking-tight mb-7"
            >
              Receba a Apresentação Completa
            </h2>
            <p className="text-white/50 text-sm lg:text-base leading-relaxed mb-12 max-w-sm">
              Preencha o formulário ao lado e você será redirecionado diretamente para o WhatsApp da NewCharged com todos os seus dados. Um especialista entrará em contato em seguida.
            </p>

            <div className="space-y-0 mb-12">
              <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] mb-5">O que você receberá</p>
              {[
                'Apresentação completa dos eletropostos disponíveis',
                'Projeções detalhadas de rentabilidade por cota',
                'Contrato e condições de investimento',
                'Contato direto com o time NewCharged',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 py-4 border-b border-white/6 last:border-b-0">
                  <span className="text-brand-blue font-mono text-[10px] flex-shrink-0 mt-0.5 w-5 text-right">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-white/60 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Direita — painel do formulário */}
          <div
            ref={rightRef}
            className={`will-change-transform ${prefersReduced ? '' : 'gsap-hidden'}`}
          >
            {submitted ? (
              <div className="rounded-2xl border border-brand-blue/25 bg-brand-blue/5 p-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                  <span className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.25em]">WhatsApp aberto</span>
                </div>
                <h3 className="font-anton text-3xl text-white uppercase leading-[1.08] mb-4">
                  Mensagem enviada
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  O WhatsApp foi aberto com sua mensagem pronta. Caso não tenha aberto, clique abaixo para tentar novamente.
                </p>
                <a
                  href={buildWhatsAppUrl(form)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-blue hover:bg-brand-blue/85 text-white font-bold text-[11px] uppercase tracking-[0.15em] px-7 py-4 rounded-xl transition-colors duration-200"
                >
                  Abrir WhatsApp novamente
                </a>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/8 bg-steel-mid/40 overflow-hidden">
                {/* Barra de topo */}
                <div className="h-0.5 bg-gradient-to-r from-brand-blue via-brand-blue/50 to-transparent" />

                <form onSubmit={handleSubmit} noValidate className="p-8 lg:p-10 space-y-7">

                  {/* Nome */}
                  <div>
                    <label htmlFor="f-name" className="block text-white/30 text-[10px] uppercase tracking-[0.3em] mb-3">
                      Nome completo <span className="text-brand-blue">*</span>
                    </label>
                    <input
                      id="f-name" name="name" type="text" autoComplete="name" required
                      value={form.name} onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="w-full bg-white/4 border border-white/8 hover:border-white/14 focus:border-brand-blue/50 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none transition-colors duration-200"
                    />
                  </div>

                  {/* Telefone + E-mail */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="f-phone" className="block text-white/30 text-[10px] uppercase tracking-[0.3em] mb-3">
                        WhatsApp <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        id="f-phone" name="phone" type="tel" autoComplete="tel" required
                        value={form.phone} onChange={handleChange}
                        placeholder="(31) 9 0000-0000"
                        className="w-full bg-white/4 border border-white/8 hover:border-white/14 focus:border-brand-blue/50 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="f-email" className="block text-white/30 text-[10px] uppercase tracking-[0.3em] mb-3">
                        E-mail <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        id="f-email" name="email" type="email" autoComplete="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="seu@email.com"
                        className="w-full bg-white/4 border border-white/8 hover:border-white/14 focus:border-brand-blue/50 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Perfil */}
                  <div>
                    <label htmlFor="f-profile" className="block text-white/30 text-[10px] uppercase tracking-[0.3em] mb-3">
                      Perfil de investidor
                    </label>
                    <select
                      id="f-profile" name="profile"
                      value={form.profile} onChange={handleChange}
                      className="w-full bg-white/4 border border-white/8 hover:border-white/14 focus:border-brand-blue/50 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none appearance-none cursor-pointer transition-colors duration-200"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-[#1E283B]">Selecione seu perfil</option>
                      {profiles.map(p => (
                        <option key={p} value={p} className="bg-[#1E283B]">{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* Botão */}
                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.phone || !form.email}
                    className="w-full bg-brand-blue hover:bg-brand-blue/85 active:scale-[0.98] disabled:opacity-35 disabled:cursor-not-allowed text-white font-bold text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Enviando…" />
                    ) : (
                      <>
                        Quero Ser Acionista
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-white/18 text-[10px] text-center leading-relaxed">
                    Ao clicar, você será redirecionado ao WhatsApp com sua mensagem pronta.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
