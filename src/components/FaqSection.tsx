import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const questions = [
  ["A simulação é gratuita?", "Sim. Você pode fazer a simulação sem custo e sem compromisso."],
  ["A simulação consulta SPC ou Serasa?", "Não. O preenchimento do simulador não realiza consulta ao SPC ou Serasa."],
  ["Como recebo o retorno?", "A equipe entra em contato pelo WhatsApp informado na última etapa."],
  ["Quais tipos de bem posso simular?", "O formulário contempla imóvel, veículo, moto, caminhão, maquinário, construção e investimento."],
];

const FaqSection = () => (
  <section id="faq" className="py-20 bg-blue-50">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Dúvidas frequentes</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Antes de fazer sua simulação</h2>
      </div>
      <Accordion type="single" collapsible className="bg-white rounded-2xl px-6 shadow-sm border border-blue-100">
        {questions.map(([question, answer], index) => (
          <AccordionItem key={question} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqSection;
