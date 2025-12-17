import { MessageCircle, FileText } from "lucide-react";
import bancosParceiros from "@/assets/bancos-parceiros.png";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: MessageCircle,
      title: "Receba direto no WhatsApp",
      description: "Sua simulação de crédito é enviada rapidamente para o seu WhatsApp com todas as informações necessárias.",
      isImage: false
    },
    {
      icon: null,
      title: "Bancos Parceiros",
      description: "Trabalhamos com os principais bancos do mercado para oferecer as melhores condições de financiamento.",
      isImage: true
    },
    {
      icon: FileText,
      title: "Simulação sem compromisso",
      description: "Faça quantas simulações quiser, totalmente grátis e sem consulta ao SPC ou Serasa.",
      isImage: false
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {benefit.isImage ? (
                <div className="mb-5 mx-auto">
                  <img 
                    src={bancosParceiros} 
                    alt="Bancos Parceiros" 
                    className="h-24 w-auto object-contain mx-auto"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5 mx-auto">
                  {benefit.icon && <benefit.icon className="w-8 h-8 text-primary" />}
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
