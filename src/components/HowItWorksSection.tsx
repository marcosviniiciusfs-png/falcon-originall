import { ClipboardList, MessageCircle, SearchCheck } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Conte o que você procura", description: "Responda às perguntas do simulador com o tipo de bem e as condições que fazem sentido para você." },
  { icon: SearchCheck, title: "Receba uma análise", description: "A equipe avalia suas respostas para buscar opções alinhadas ao seu objetivo." },
  { icon: MessageCircle, title: "Fale com um especialista", description: "Você recebe o retorno pelo WhatsApp informado no simulador." },
];

const HowItWorksSection = () => (
  <section id="como-funciona" className="py-20 bg-blue-50">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Como funciona</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Da simulação ao atendimento em três passos</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <article key={title} className="bg-white rounded-2xl p-7 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">{index + 1}</span>
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
