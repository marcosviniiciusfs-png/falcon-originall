import { Phone, Instagram } from "lucide-react";
import amRepresentacaoLogo from "@/assets/am-representacao-logo.png";

const Footer = () => {
  return (
    <footer id="contato" className="bg-[#1c3a3e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Logo */}
          <div>
            <div className="mb-6">
              <img src={amRepresentacaoLogo} alt="AM Representação" className="h-12 w-auto" />
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Social</h3>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/t.aempreendimentos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/t.aempreendimentos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Fale Conosco */}
          <div>
          <h3 className="text-lg font-bold mb-4">Fale conosco</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/90">(98) 98477-7834 - Atendimento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Nosso endereço</h3>
          <div className="space-y-2 text-white/90">
            <p>Av dos Holandeses Nº4</p>
            <p>Bairro: Calhau</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-white/80 text-sm">
            Copyright 2025 - Todos os direitos reservados por SimuLead
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
