import { Phone, Instagram, Facebook, Mail } from "lucide-react";
import falconLogo from "@/assets/falcon-logo.jpg";

const Footer = () => {
  return (
    <footer id="contato" className="bg-[#002059]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <div className="mb-6 flex justify-center md:justify-start">
              <img src={falconLogo} alt="Falcon Empreendimentos e Negócios" className="h-16 w-auto rounded" />
            </div>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-white">Social</h3>
            <div className="flex gap-3 justify-center md:justify-start">
              <a 
                href="https://www.instagram.com/grupo_investbens/"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/grupoinvestbens"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Fale Conosco */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Fale conosco</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/80">+55 41 99264-8895</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-white">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/80">rninvestimentosadm@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-white">Nosso endereço</h3>
          <div className="space-y-2 text-white/80">
            <p>São José dos Pinhais - PR</p>
            <p>Rua Quinze de Novembro, 1002 - Centro</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-white/80 text-sm">
            Copyright 2025 - Todos os direitos reservados por Falcon Empreendimentos
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
