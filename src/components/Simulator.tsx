import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { createEventId, trackLead } from "@/lib/meta";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SimulatorData {
  propertyType: string;
  creditAmount: string;
  creditModality: string;
  hasDownPayment: string;
  downPaymentAmount: string;
  monthlyPayment: string;
  city: string;
  fullName: string;
  whatsapp: string;
}

const Simulator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SimulatorData>({
    propertyType: "",
    creditAmount: "",
    creditModality: "",
    hasDownPayment: "",
    downPaymentAmount: "",
    monthlyPayment: "",
    city: "",
    fullName: "",
    whatsapp: ""
  });

  const getProgressInfo = () => {
    const isShortFlow = formData.hasDownPayment === "Não";
    
    if (isShortFlow) {
      // Fluxo curto: 4 passos (tipo de bem, entrada, nome, telefone)
      // Steps reais: 0, 1, 7, 8
      const stepMapping: { [key: number]: number } = { 0: 1, 1: 2, 7: 3, 8: 4 };
      const displayStep = stepMapping[currentStep] || 1;
      return {
        currentDisplay: displayStep,
        totalDisplay: 4,
        progress: (displayStep / 4) * 100
      };
    }
    
    return {
      currentDisplay: currentStep + 1,
      totalDisplay: 9,
      progress: ((currentStep + 1) / 9) * 100
    };
  };

  const progressInfo = getProgressInfo();
  const isLastStep = currentStep === 8;

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits.replace(/^(\d{0,2})/, "($1");
    if (digits.length <= 7) return digits.replace(/^(\d{2})(\d+)/, "($1) $2");
    return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.propertyType !== "";
      case 1: return formData.hasDownPayment !== "";
      case 2: return formData.creditAmount !== "";
      case 3: return formData.downPaymentAmount !== "";
      case 4: return formData.creditModality !== "";
      case 5: return formData.monthlyPayment !== "";
      case 6: return formData.city.trim() !== "";
      case 7: return formData.fullName.trim() !== "";
      case 8: return formData.whatsapp.replace(/\D/g, "").length === 11;
      default: return false;
    }
  };

  const handleNext = () => {
    // Se responder "Não" na entrada (step 1), pula direto para o nome (step 7)
    if (currentStep === 1 && formData.hasDownPayment === "Não") {
      setFormData({ 
        ...formData, 
        creditAmount: "", 
        downPaymentAmount: "", 
        creditModality: "",
        monthlyPayment: "", 
        city: "" 
      });
      setCurrentStep(7);
      return;
    }
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    // Se está no nome (step 7) e tinha respondido "Não", volta para entrada (step 1)
    if (currentStep === 7 && formData.hasDownPayment === "Não") {
      setCurrentStep(1);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Formatar data no formato YYYY-MM-DD
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const dataEntrada = `${year}-${month}-${day}`;
      
      const eventId = createEventId();
      const endpoint = import.meta.env.VITE_META_CAPI_URL ||
        "https://hook.us1.make.com/3s8saehot3tbxrg0gsohavxhag4bzjkh";
      const webhookData = {
        "Data de Entrada": dataEntrada,
        "Nome Completo": formData.fullName,
        "WhatsApp": formData.whatsapp,
        "Tipo de Bem": formData.propertyType,
        "Valor Pretendido (R$)": formData.creditAmount || "Não informado",
        "Valor de Entrada (R$)": formData.hasDownPayment === "Sim" ? formData.downPaymentAmount : "Não possui entrada",
        "Parcela Ideal (R$)": formData.monthlyPayment || "Não informado",
        "Cidade": formData.city || "Não informado",
        "Modalidade de Crédito": formData.creditModality || "Não informado",
        origem: "simulador_falcon",
        event_id: eventId,
        source_url: window.location.href,
        received_at: now.toISOString()
      };

      const isCapiEndpoint = Boolean(import.meta.env.VITE_META_CAPI_URL);
      const payload = isCapiEndpoint ? {
        event_name: "Lead",
        event_id: eventId,
        event_source_url: window.location.href,
        lead_data: webhookData,
        user_data: {
          ph: formData.whatsapp,
          fn: formData.fullName.trim().split(/\s+/)[0] || "",
          ln: formData.fullName.trim().split(/\s+/).slice(1).join(" "),
          ct: formData.city,
        },
        custom_data: {
          content_name: "Simulador Falcon",
          lead_type: "simulador_falcon",
          tipo_bem: formData.propertyType,
        },
      } : webhookData;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Falha ao registrar lead (${response.status}).`);
      }

      trackLead(eventId);
      sessionStorage.setItem("lead_submission_success", "true");

      toast({
        title: "Simulação enviada!",
        description: "Em breve entraremos em contato via WhatsApp.",
      });

      // Redirecionar para página de agradecimento
      navigate("/obrigado", { replace: true });
    } catch (error) {
      console.error("Erro ao enviar simulação:", error);
      setIsSubmitting(false);
      toast({
        title: "Erro ao enviar simulação",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-primary text-center block mb-6">
              Qual tipo de bem você deseja adquirir?
            </Label>
            <div className="max-w-md mx-auto">
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              >
                <SelectTrigger className="w-full text-lg p-6">
                  <SelectValue placeholder="Selecione o tipo de bem" />
                </SelectTrigger>
                <SelectContent translate="no">
                  <SelectItem value="Imóvel" translate="no">Imóvel</SelectItem>
                  <SelectItem value="Veículo" translate="no">Veículo</SelectItem>
                  <SelectItem value="Moto" translate="no">Moto</SelectItem>
                  <SelectItem value="Caminhão" translate="no">Caminhão</SelectItem>
                  <SelectItem value="Maquinário" translate="no">Maquinário</SelectItem>
                  <SelectItem value="Construção" translate="no">Construção</SelectItem>
                  <SelectItem value="Investimento" translate="no">Investimento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-primary text-center block mb-6">
              Tem valor de entrada?
            </Label>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <button
                onClick={() => setFormData({ ...formData, hasDownPayment: "Sim" })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.hasDownPayment === "Sim"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 text-muted-foreground"
                }`}
              >
                <span className="text-base font-normal">Sim</span>
              </button>
              <button
                onClick={() => setFormData({ ...formData, hasDownPayment: "Não" })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.hasDownPayment === "Não"
                    ? "border-foreground bg-foreground/5 text-foreground"
                    : "border-border hover:border-primary/50 text-muted-foreground"
                }`}
              >
                <span className="text-base font-normal">Não</span>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-primary text-center block mb-6">
              Qual o valor do crédito que deseja simular?
            </Label>
            <div className="max-w-md mx-auto">
              <Select
                value={formData.creditAmount}
                onValueChange={(value) => setFormData({ ...formData, creditAmount: value })}
              >
                <SelectTrigger className="w-full text-lg p-6">
                  <SelectValue placeholder="Selecione o valor do crédito" />
                </SelectTrigger>
                <SelectContent translate="no">
                  <SelectItem value="De R$ 100.000 à 250 mil" translate="no">De R$ 100.000 à 250 mil</SelectItem>
                  <SelectItem value="De R$ 250.000 à 300 mil" translate="no">De R$ 250.000 à 300 mil</SelectItem>
                  <SelectItem value="De R$ 300.000 à 500 mil" translate="no">De R$ 300.000 à 500 mil</SelectItem>
                  <SelectItem value="Acima de 550 mil" translate="no">Acima de 550 mil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-primary text-center block mb-6">
              Qual valor de entrada disponível?
            </Label>
            <div className="max-w-md mx-auto">
              <Select
                value={formData.downPaymentAmount}
                onValueChange={(value) => setFormData({ ...formData, downPaymentAmount: value })}
              >
                <SelectTrigger className="w-full text-lg p-6">
                  <SelectValue placeholder="Selecione o valor de entrada" />
                </SelectTrigger>
                <SelectContent translate="no">
                  <SelectItem value="12 a 20 mil" translate="no">12 a 20 mil</SelectItem>
                  <SelectItem value="20 a 30 mil" translate="no">20 a 30 mil</SelectItem>
                  <SelectItem value="30 a 40 mil" translate="no">30 a 40 mil</SelectItem>
                  <SelectItem value="Acima de 40 mil" translate="no">Acima de 40 mil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-primary text-center block mb-6">
              Modalidade de crédito para compra do bem?
            </Label>
            <div className="max-w-md mx-auto">
              <Select
                value={formData.creditModality}
                onValueChange={(value) => setFormData({ ...formData, creditModality: value })}
              >
                <SelectTrigger className="w-full text-lg p-6">
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent translate="no">
                  <SelectItem value="Sem preferência" translate="no">Sem preferência</SelectItem>
                  <SelectItem value="Consórcio" translate="no">Consórcio</SelectItem>
                  <SelectItem value="Financiamento" translate="no">Financiamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <Label htmlFor="monthlyPayment" className="text-lg font-semibold text-primary text-center block mb-6">
              Qual a parcela mensal ideal pra você?
            </Label>
            <div className="max-w-md mx-auto">
              <Select
                value={formData.monthlyPayment}
                onValueChange={(value) => setFormData({ ...formData, monthlyPayment: value })}
              >
                <SelectTrigger className="w-full text-lg p-6">
                  <SelectValue placeholder="Selecione a parcela ideal" />
                </SelectTrigger>
                <SelectContent translate="no">
                  <SelectItem value="R$ 1.100,00 a 1.600,00" translate="no">R$ 1.100,00 a 1.600,00</SelectItem>
                  <SelectItem value="R$ 1.600,00 a 2.500,00" translate="no">R$ 1.600,00 a 2.500,00</SelectItem>
                  <SelectItem value="R$ 2.500,00 a 3.500,00" translate="no">R$ 2.500,00 a 3.500,00</SelectItem>
                  <SelectItem value="Acima de R$ 3.500,00" translate="no">Acima de R$ 3.500,00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <Label htmlFor="city" className="text-lg font-semibold text-primary text-center block mb-6">
              Qual cidade você reside?
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Digite sua cidade"
              className="text-lg p-6 text-center max-w-md mx-auto"
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <Label htmlFor="fullName" className="text-lg font-semibold text-primary text-center block mb-6">
              Nome completo
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Digite seu nome completo"
              className="text-lg p-6 text-center max-w-md mx-auto"
            />
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <Label htmlFor="whatsapp" className="text-lg font-semibold text-primary text-center block mb-6">
              WhatsApp para contato
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: formatWhatsapp(e.target.value) })}
              placeholder="(00) 00000-0000"
              className="text-lg p-6 text-center max-w-md mx-auto"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="simulador" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
              SIMULE AGORA
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Responda as perguntas para fazer sua simulação
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium text-foreground mb-1">
                <span>{progressInfo.currentDisplay} de {progressInfo.totalDisplay}</span>
              </div>
              <Progress value={progressInfo.progress} className="h-3" />
            </div>

            <div className="min-h-[220px]">
              {renderStep()}
            </div>

            <div className="flex justify-between gap-4 pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-6 text-base"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Button>

              {!isLastStep ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-hover px-8 py-6 text-base font-semibold"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-primary hover:bg-primary-hover px-8 py-6 text-base font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Finalizar Simulação"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simulator;
