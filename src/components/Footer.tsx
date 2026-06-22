import { IconPhone, IconMail, IconGlobe } from './Icons'

const WHATSAPP_URL =
  'https://wa.me/5531997328451?text=Ol%C3%A1%21%20Tenho%20interesse%20em%20conhecer%20as%20oportunidades%20de%20investimento%20nos%20eletropostos%20da%20NewCharged.'

interface FooterProps {
  onScrollToForm: () => void
}

export default function Footer({ onScrollToForm }: FooterProps) {
  return (
    <footer className="bg-[#0d1521] border-t border-white/5" role="contentinfo">

      {/* CTA final — editorial */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.35em] mb-6">
              Oportunidade aberta
            </p>
            <h2 className="font-anton text-[2rem] sm:text-4xl lg:text-[3rem] text-white uppercase leading-[1.08] tracking-tight">
              Ainda há cotas disponíveis
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              onClick={onScrollToForm}
              className="bg-brand-blue hover:bg-brand-blue/85 text-white font-bold text-[11px] uppercase tracking-[0.2em] px-8 py-4 rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              Receber Apresentação
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white/40 hover:text-white text-xs uppercase tracking-[0.15em] transition-colors duration-200 group whitespace-nowrap"
            >
              <span className="w-6 h-px bg-white/15 group-hover:bg-brand-blue group-hover:w-10 transition-all duration-300" />
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé — linha divisória + dados */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* Marca */}
            <div className="lg:col-span-2">
              <div className="mb-5">
                <img
                  src="/images/logo-newcharged.png"
                  alt="NewCharged"
                  width="180"
                  height="72"
                  className="h-9 w-auto object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
                <p className="text-white/25 text-[10px] mt-3">NEW Engenharia e Energia</p>
              </div>
              <p className="text-white/25 text-xs leading-relaxed max-w-sm">
                Desenvolvimento, implantação e operação de infraestrutura de recarga elétrica em pontos de alto fluxo no Brasil.
              </p>
            </div>

            {/* Contato */}
            <div>
              <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] mb-6">Contato</p>
              <div className="space-y-4">
                <a
                  href="tel:+5531997328451"
                  className="flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-200 text-sm group"
                >
                  <IconPhone size={13} className="text-brand-blue flex-shrink-0" />
                  (31) 99732-8451
                </a>
                <a
                  href="mailto:contato@energianew.com.br"
                  className="flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-200 text-sm group"
                >
                  <IconMail size={13} className="text-brand-blue flex-shrink-0" />
                  contato@energianew.com.br
                </a>
                <a
                  href="https://newengenharia.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-200 text-sm group"
                >
                  <IconGlobe size={13} className="text-brand-blue flex-shrink-0" />
                  newengenharia.com.br
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/5 mt-10 pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/15 text-[10px] uppercase tracking-[0.2em]">
              © 2026 NEW Engenharia e Energia · Todos os direitos reservados
            </p>
            <p className="text-white/12 text-[10px]">CNPJ: XX.XXX.XXX/XXXX-XX</p>
          </div>
        </div>
      </div>

    </footer>
  )
}
