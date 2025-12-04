import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import cliente1 from "@/assets/cliente-novo-1.png";
import cliente2 from "@/assets/cliente-novo-2.jpeg";
import cliente3 from "@/assets/cliente-novo-3.jpeg";
import cliente4 from "@/assets/cliente-novo-4.jpeg";
import cliente5 from "@/assets/cliente-novo-5.jpeg";
import cliente6 from "@/assets/cliente-novo-6.jpeg";
import cliente7 from "@/assets/cliente-novo-7.jpeg";
import cliente8 from "@/assets/cliente-novo-8.jpeg";
import cliente9 from "@/assets/cliente-novo-9.jpeg";

const TestimonialsSection = () => {
  const clientImages = [cliente1, cliente2, cliente3, cliente4, cliente5, cliente6, cliente7, cliente8, cliente9];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simule agora gratuitamente e descubra o melhor plano para conquistar o seu sonho
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            As condições podem mudar a qualquer momento
          </p>
          <Button 
            onClick={() => {
              const element = document.getElementById("simulador");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-base px-8 py-6 rounded-lg shadow-lg"
          >
            Quero meu plano ideal →
          </Button>
        </div>

        <div className="max-w-6xl mx-auto mt-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {clientImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Cliente Contemplado ${index + 1}`}
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
