import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Obrigado = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Meta Pixel Code
    if (!(window as any).fbq) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      `;
      document.head.appendChild(script);
    }
    
    if ((window as any).fbq) {
      (window as any).fbq('init', '1404605704629531');
      (window as any).fbq('track', 'PageView');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
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
          size="lg"
          className="mt-8"
        >
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default Obrigado;
