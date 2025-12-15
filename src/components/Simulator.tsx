import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import InputMask from "react-input-mask";
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
    
    if (isShortFlow && currentStep >= 3) {
      // Fluxo de 6 passos: 0, 1, 2, 3, 6, 7
      const stepMapping: { [key: number]: number } = { 0: 1, 1: 2, 2: 3, 3: 4, 6: 5, 7: 6 };
      const displayStep = stepMapping[currentStep] || currentStep + 1;
      return {
        currentDisplay: displayStep,
        totalDisplay: 6,
        progress: (displayStep / 6) * 100
      };
    }
    
    return {
      currentDisplay: currentStep + 1,
      totalDisplay: 8,
      progress: ((currentStep + 1) / 8) * 100
    };
  };

  const progressInfo = getProgressInfo();
  const isLastStep = currentStep === 7;

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const amount = Number(numbers) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(amount);
  };

  const handleCurrencyChange = (field: keyof SimulatorData, value: string) => {
    const formatted = formatCurrency(value);
    setFormData({ ...formData, [field]: formatted });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.propertyType !== "";
      case 1: return formData.creditAmount !== "";
      case 2: return formData.creditModality !== "";
      case 3: 
        if (formData.hasDownPayment === "Sim") {
          return formData.downPaymentAmount !== "";
        }
        return formData.hasDownPayment !== "";
      case 4: return formData.monthlyPayment !== "";
      case 5: return formData.city.trim() !== "";
      case 6: return formData.fullName.trim() !== "";
      case 7: return formData.whatsapp.replace(/\D/g, "").length === 11;
      default: return false;
    }
  };

  const handleNext = () => {
    // Se responder "Não" na entrada, pula direto para o nome (step 6)
    if (currentStep === 3 && formData.hasDownPayment === "Não") {
      setFormData({ ...formData, downPaymentAmount: "", monthlyPayment: "", city: "" });
      setCurrentStep(6);
      return;
    }
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    // Se está no nome e tinha respondido "Não", volta para entrada
    if (currentStep === 6 && formData.hasDownPayment === "Não") {
      setCurrentStep(3);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    try {
      // Formatar data no formato YYYY-MM-DD
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const dataEntrada = `${year}-${month}-${day}`;
      
      // Preparar dados para envio
      const webhookData = {
        "Data de Entrada": dataEntrada,
        "Nome Completo": formData.fullName,
        "WhatsApp": formData.whatsapp,
        "Tipo de Bem": formData.propertyType,
        "Valor Pretendido": formData.creditAmount,
        "Modalidade de Crédito": formData.creditModality,
        "Valor de Entrada": formData.hasDownPayment === "Sim" ? formData.downPaymentAmount : "Não possui",
        "Parcela Ideal": formData.monthlyPayment || "Não informado",
        "Cidade": formData.city || "Não informado"
      };

      // Enviar para o webhook
      await fetch("https://hook.us1.make.com/6r6jln0cb3mrsdve0cf1xpaf8uhv3zbl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      toast({
        title: "Simulação enviada!",
        description: "Em breve entraremos em contato via WhatsApp.",
      });

      // Redirecionar para página de agradecimento
      navigate("/obrigado");
    } catch (error) {
      console.error("Erro ao enviar simulação:", error);
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

      case 2:
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

      case 3:
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
            
            {formData.hasDownPayment === "Sim" && (
              <div className="space-y-3 mt-6">
                <Label className="text-sm text-muted-foreground">
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
                      <SelectItem value="Entrada de 12k a 20 mil" translate="no">Entrada de 12k a 20 mil</SelectItem>
                      <SelectItem value="20 a 30 mil" translate="no">20 a 30 mil</SelectItem>
                      <SelectItem value="30 a 40 mil" translate="no">30 a 40 mil</SelectItem>
                      <SelectItem value="Acima de 40 mil" translate="no">Acima de 40 mil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Label htmlFor="monthlyPayment" className="text-lg font-semibold text-primary text-center block mb-6">
              Qual a parcela mensal ideal pra você?
            </Label>
            <Input
              id="monthlyPayment"
              value={formData.monthlyPayment}
              onChange={(e) => handleCurrencyChange("monthlyPayment", e.target.value)}
              placeholder="R$ 0,00"
              className="text-lg p-6 text-center max-w-md mx-auto"
            />
          </div>
        );

      case 5:
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

      case 6:
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

      case 7:
        return (
          <div className="space-y-4">
            <Label htmlFor="whatsapp" className="text-lg font-semibold text-primary text-center block mb-6">
              WhatsApp para contato
            </Label>
            <InputMask
              mask="(99) 99999-9999"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            >
              {/* @ts-ignore */}
              {(inputProps: any) => (
                <Input
                  {...inputProps}
                  id="whatsapp"
                  placeholder="(00) 00000-0000"
                  className="text-lg p-6 text-center max-w-md mx-auto"
                />
              )}
            </InputMask>
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
                  disabled={!canProceed()}
                  className="bg-primary hover:bg-primary-hover px-8 py-6 text-base font-semibold"
                >
                  Finalizar Simulação
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
