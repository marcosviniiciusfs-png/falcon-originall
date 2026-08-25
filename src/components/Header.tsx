import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import falconLogo from "@/assets/falcon-logo-header.png";
import { smoothScrollToSection } from "@/lib/scroll";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappUrl = "https://wa.me/5541992648895?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Falcon%20e%20quero%20fazer%20uma%20simula%C3%A7%C3%A3o.";

  const scrollToSection = (id: string) => {
    smoothScrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-border/20 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img src={falconLogo} alt="Falcon Empreendimentos e Negócios" className="h-14 w-auto rounded" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-white/90 hover:text-white transition-colors"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection("simulador")}
            className="text-white/90 hover:text-white transition-colors"
          >
            Simulador
          </button>
          <button
            onClick={() => scrollToSection("beneficios")}
            className="text-white/90 hover:text-white transition-colors"
          >
            Benefícios
          </button>
          <button
            onClick={() => scrollToSection("contato")}
            className="text-white/90 hover:text-white transition-colors"
          >
            Contato
          </button>
          <Button asChild className="bg-white text-primary hover:bg-white/90 font-semibold">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-border/20">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-white/90 hover:text-white transition-colors text-left py-2"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("simulador")}
              className="text-white/90 hover:text-white transition-colors text-left py-2"
            >
              Simulador
            </button>
            <button
              onClick={() => scrollToSection("beneficios")}
              className="text-white/90 hover:text-white transition-colors text-left py-2"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-white/90 hover:text-white transition-colors text-left py-2"
            >
              Contato
            </button>
            <Button asChild className="bg-white text-primary hover:bg-white/90 font-semibold mt-1">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
