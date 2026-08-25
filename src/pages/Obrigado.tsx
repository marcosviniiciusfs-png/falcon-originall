import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Obrigado = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("lead_submission_success") !== "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-primary" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Obrigado!
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Sua solicitação foi enviada com sucesso! Em breve entraremos em contato.
        </p>
        
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          size="lg"
        >
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default Obrigado;
