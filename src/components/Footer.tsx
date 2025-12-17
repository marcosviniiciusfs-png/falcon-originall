import { Phone, Instagram, Facebook, Mail } from "lucide-react";
import grupoInvestbensLogo from "@/assets/grupo-investbens-logo.png";

const Footer = () => {
  return (
    <footer id="contato" className="bg-gradient-to-b from-[#dbecf2] via-[#dbecf2] via-[50%] to-primary to-[95%] md:via-[25%] md:to-[60%]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Logo */}
          <div>
            <div className="mb-6">
              <img src={grupoInvestbensLogo} alt="Grupo Investbens" className="h-12 w-auto" />
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Social</h3>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/grupo_investbens/"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors text-primary"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/grupoinvestbens"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors text-primary"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Fale Conosco */}
          <div>
          <h3 className="text-lg font-bold mb-4 text-primary">Fale conosco</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-primary">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary/80">CONTATO +55 68 99283-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-primary">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary/80">rninvestimentosadm@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-white">Nosso endereço</h3>
          <div className="space-y-2 text-white/90">
            <p>Estrada do Aviário, 546 - Aviário</p>
            <p>CEP: 69900-854</p>
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
