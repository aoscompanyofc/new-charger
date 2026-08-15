import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Station {
  num: string
  name: string
  location: string
  description: string
  forecast: string
  img: string
  highlight?: string
}

const stations: Station[] = [
  {
    num: '01',
    name: 'Pampulha Mall',
    location: 'Belo Horizonte — MG',
    description: 'Corredor viário que conecta Pampulha, Centro, Vetor Norte e Aeroporto de Confins.',
    forecast: '2º sem. 2026',
    img: '/images/pampulha-mall.jpg',
  },
  {
    num: '02',
    name: 'Mercado Central BH',
    location: 'Belo Horizonte — MG',
    description: 'Polo turístico e gastronômico, um dos maiores centros de consumo de Minas Gerais.',
    forecast: '2º sem. 2026',
    img: '/images/mercado-central.jpg',
  },
  {
    num: '03',
    name: 'Feira dos Produtores',
    location: 'Belo Horizonte — MG',
    description: 'Fluxo recorrente de consumidores e comerciantes com alto potencial de fidelização.',
    forecast: '2º sem. 2026',
    img: '/images/feira-produtores.jpg',
  },
  {
    num: '04',
    name: 'Posto Cinco Mil',
    location: 'Região Metropolitana — MG',
    description: 'Modelo híbrido — abastecimento convencional e mobilidade elétrica integrados.',
    forecast: '2º sem. 2026',
    img: '/images/posto-cinco-mil.jpg',
  },
  {
    num: '05',
    name: 'Vettore Mall',
    location: 'Abrahão Caram — BH',
    description: 'Hub estratégico próximo ao Mineirão, Mineirinho e Lagoa da Pampulha.',
    forecast: '2º sem. 2026',
    img: '/images/vettore-mall.webp',
  },
  {
    num: '06',
    name: 'Andradas Multicenter',
    location: 'Santa Efigênia — BH',
    description: 'Calçada e estacionamento em polo de atacarejo e supermercados, cercado por Araujo, CNR e salas comerciais.',
    forecast: '2º sem. 2026',
    img: '/images/andradas-multicenter.webp',
  },
  {
    num: '07',
    name: 'Granvitta Comercial',
    location: 'Barreiro — BH',
    description: 'Funcionamento 24h em ponto com banco, academia, supermercado e comércio em geral no Barreiro.',
    forecast: '2º sem. 2026',
    img: '/images/granvitta-comercial.webp',
  },
  {
    num: '08',
    name: 'Woods | Verde Mar',
    location: 'Luxemburgo — BH',
    description: 'Estacionamento em polo de supermercado, Araujo, academia, alimentação, escola e petshop no Luxemburgo.',
    forecast: '2º sem. 2026',
    img: '/images/woods-verde-mar-luxemburgo.png',
  },
  {
    num: '09',
    name: 'Mercado Novo',
    location: 'Centro — BH',
    description: 'Estacionamento no coração gastronômico e turístico do Centro, com eventos, arte e comércio em geral.',
    forecast: '2º sem. 2026',
    img: '/images/mercado-novo.jpg',
  },
  {
    num: '10',
    name: 'EPA Estoril',
    location: 'Estoril — BH',
    description: 'Funcionamento 24h com supermercado, Araujo, concessionárias e forte fluxo de alimentação e comércio.',
    forecast: '2º sem. 2026',
    img: '/images/epa-estoril.jpg',
  },
  {
    num: '11',
    name: 'EPA Castelo',
    location: 'Castelo — BH',
    description: 'Funcionamento 24h em mall com supermercado, petshop, alimentação, lotérica e salão.',
    forecast: '2º sem. 2026',
    img: '/images/epa-castelo.webp',
  },
  {
    num: '12',
    name: 'Luna Street Mall',
    location: 'Venda Nova — BH',
    description: 'Banco, salão, alimentação, Araujo, escola e consultórios em polo de comércio e serviços de Venda Nova.',
    forecast: '2º sem. 2026',
    img: '/images/luna-street-mall.webp',
  },
  {
    num: '13',
    name: 'Verde Mar Belvedere',
    location: 'Belvedere — Nova Lima',
    description: 'Estacionamento com supermercado, Araujo e forte oferta gastronômica em Nova Lima.',
    forecast: '2º sem. 2026',
    img: '/images/verde-mar-belvedere.jpg',
  },
  {
    num: '14',
    name: 'EPA Santo Agostinho',
    location: 'Santo Agostinho — BH',
    description: 'Estacionamento com supermercado, Araujo, alimentação e proximidade com a Assembleia Legislativa.',
    forecast: '2º sem. 2026',
    img: '/images/epa-santo-agostinho.webp',
  },
  {
    num: '15',
    name: 'Mall Av. Portugal',
    location: 'Santa Amélia — BH',
    description: 'Banco, feira do Minas Shopping, padaria, restaurantes e sorveteria em ponto de forte gastronomia.',
    forecast: '2º sem. 2026',
    img: '/images/mall-av-portugal.jpg',
  },
  {
    num: '16',
    name: 'EPA Cidade Jardim',
    location: 'Cidade Jardim — BH',
    description: 'Supermercado, farmácia, hotéis, academia, alimentação e banco na Cidade Jardim.',
    forecast: '2º sem. 2026',
    img: '/images/epa-cidade-jardim.jpg',
  },
  {
    num: '17',
    name: 'Shopping Justinópolis',
    location: 'Ribeirão das Neves — MG',
    description: 'Supermercados BH, Americanas, UPA, alimentação, lotérica, comércio em geral.',
    forecast: '2º sem. 2026',
    img: '/images/shopping-justinopolis.jpg',
  },
  {
    num: '18',
    name: 'Betim Shopping',
    location: 'Angola — Betim',
    description: 'Shopping com supermercado, cinema, praça de alimentação e banco em Betim.',
    forecast: '2º sem. 2026',
    img: '/images/betim-shopping.webp',
  },
  {
    num: '19',
    name: 'Alphaville Centro Comercial',
    location: 'Alphaville — Nova Lima',
    description: 'Restaurantes, eventos culturais, escolas e faculdades no polo comercial de Alphaville.',
    forecast: '2º sem. 2026',
    img: '/images/alphaville-centro-comercial.jpg',
  },
  {
    num: '20',
    name: 'Vettore Mall Fleming',
    location: 'Ouro Preto — BH',
    description: 'Estacionamento com supermercado, banco, salão, petshop, alimentação e farmácia.',
    forecast: '2º sem. 2026',
    img: '/images/vettore-mall-fleming.webp',
  },
  {
    num: '21',
    name: 'Posto Luziense',
    location: 'Asteca — Santa Luzia',
    description: 'Posto de combustível 24h a dois quarteirões da Av. Brasília, com clínicas, óticas e farmácia.',
    forecast: '2º sem. 2026',
    img: '/images/posto-luziense.png',
  },
]

function StationCard({ s, reduced }: { s: Station; reduced: boolean }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <article
      data-card
      className={`group relative flex flex-col rounded-2xl overflow-hidden border border-white/8 hover:border-brand-blue/30 bg-steel-mid transition-all duration-400 will-change-transform ${reduced ? '' : 'gsap-hidden'}`}
    >
      {/* Imagem / Placeholder */}
      <div className="relative h-52 overflow-hidden flex-shrink-0 bg-steel-deep">
        {/* Gradiente de fundo sempre visível */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1E283B 0%, #172339 60%, #0d1521 100%)',
          }}
        />
        {/* Número decorativo de fundo */}
        <span
          className="absolute bottom-2 right-4 font-anton text-[6rem] leading-none select-none pointer-events-none"
          style={{ color: 'rgba(45,142,232,0.07)' }}
          aria-hidden="true"
        >
          {s.num}
        </span>
        {/* Linha vertical de acento */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-brand-blue/40 via-brand-blue/10 to-transparent" />

        {/* Imagem real */}
        <img
          src={s.img}
          alt={s.name}
          width="480"
          height="208"
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => {}}
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-600 ${imgLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-mid via-steel-mid/60 to-transparent" />

        {/* Header da imagem */}
        <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
          <span className="text-white/30 text-[10px] font-mono font-bold">{s.num}</span>
          {s.highlight && (
            <span className="text-brand-blue text-[9px] font-bold uppercase tracking-[0.2em] border border-brand-blue/25 px-2 py-1 rounded-full bg-brand-blue/8">
              {s.highlight}
            </span>
          )}
        </div>

        {/* Nome grande dentro da imagem */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="font-anton text-white text-xl uppercase leading-tight group-hover:text-brand-blue transition-colors duration-300">
            {s.name}
          </h3>
          <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] mt-1">{s.location}</p>
        </div>
      </div>

      {/* Corpo do card */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <p className="text-white/50 text-xs leading-relaxed flex-1">{s.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-white/6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-white/30 text-[10px] uppercase tracking-[0.15em]">Previsão</span>
          </div>
          <span className="text-white/60 text-[11px] font-semibold">{s.forecast}</span>
        </div>
      </div>
    </article>
  )
}

export default function Network() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return

    gsap.fromTo(headRef.current,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
    )

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('[data-card]')
      gsap.fromTo(cards,
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' } }
      )
    }
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  return (
    <section
      ref={sectionRef}
      className="bg-[#111b2c] py-16 sm:py-20 lg:py-28"
      aria-labelledby="network-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Cabeçalho */}
        <div
          ref={headRef}
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 ${prefersReduced ? '' : 'gsap-hidden'}`}
        >
          <div>
            <p className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.35em] mb-5">
              Expansão 2026
            </p>
            <h2
              id="network-heading"
              className="font-anton text-[2rem] sm:text-4xl lg:text-[3.2rem] text-white uppercase leading-[1.08] tracking-tight"
            >
              Rede de Eletropostos
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-white/35 text-sm leading-relaxed">
              21 pontos estratégicos com alto fluxo, selecionados para maximizar a rentabilidade dos investidores.
            </p>
          </div>
        </div>

        {/* Grid de cards */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {stations.map((s) => (
            <StationCard key={s.num} s={s} reduced={prefersReduced} />
          ))}
        </div>

        {/* Rodapé informativo */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/6">
          <p className="text-white/25 text-xs uppercase tracking-[0.25em]">
            Operação gerenciada pela NewCharged em todos os pontos
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <span className="text-white/35 text-xs">60 kW por conector · 24 h por dia</span>
          </div>
        </div>

      </div>
    </section>
  )
}
