import { Phone, Instagram, Facebook } from "lucide-react";
import rnInvestimentosLogo from "@/assets/rn-investimentos-logo.png";

const Footer = () => {
  return (
    <footer id="contato" className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Logo */}
          <div>
            <div className="mb-6">
              <img src={rnInvestimentosLogo} alt="RN Investimentos" className="h-12 w-auto" />
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Social</h3>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/rninvestimentosoficial?igsh=dGwwZDBjc3ByYWMx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61581079911785&mibextid=wwXIfr&rdid=tPWTssAf1SbsZHbX&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BXudEJnbf%2F%3Fmibextid%3DwwXIfr#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
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
                  <p className="text-white/90">CONTATO +55 67 99322-6694</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Nosso endereço</h3>
          <div className="space-y-2 text-white/90">
            <p>Rua Treze de Maio, 2500 - Centro</p>
            <p>Complemento: 3º andar sala 303</p>
            <p>CEP: 79002-923</p>
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
