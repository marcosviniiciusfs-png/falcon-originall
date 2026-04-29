import { ThumbsUp, MessageCircle, BadgeCheck } from "lucide-react";

const comments = [
  {
    name: "Mariana Oliveira",
    location: "Curitiba - PR",
    initials: "MO",
    color: "bg-blue-500",
    time: "há 2 dias",
    text: "Gente, eu não acreditei quando recebi a ligação dizendo que fui contemplada! Em menos de 4 meses já estava com a carta na mão. Atendimento da Falcon é nota 10, só tenho a agradecer! 🙏",
    likes: 184,
    replies: 12,
  },
  {
    name: "Rafael Santos",
    location: "São José dos Pinhais - PR",
    initials: "RS",
    color: "bg-emerald-500",
    time: "há 5 dias",
    text: "Sempre sonhei em ter meu próprio carro 0km e graças à Falcon esse sonho virou realidade. Equipe super atenciosa, tiraram todas as minhas dúvidas. Recomendo demais!",
    likes: 142,
    replies: 8,
  },
  {
    name: "Juliana Costa",
    location: "Pinhais - PR",
    initials: "JC",
    color: "bg-pink-500",
    time: "há 1 semana",
    text: "Fui contemplada na 3ª assembleia e até hoje não caiu a ficha! Conquistei meu apartamento sem pagar juros abusivos de financiamento. Obrigada Falcon por mudar a minha vida! ❤️",
    likes: 256,
    replies: 21,
  },
  {
    name: "Bruno Almeida",
    location: "Colombo - PR",
    initials: "BA",
    color: "bg-orange-500",
    time: "há 1 semana",
    text: "Confesso que no começo fiquei com um pé atrás, mas a equipe da Falcon foi extremamente transparente em todo o processo. Hoje estou com a chave da minha casa nova. Vale cada centavo!",
    likes: 198,
    replies: 15,
  },
  {
    name: "Camila Ferreira",
    location: "Araucária - PR",
    initials: "CF",
    color: "bg-purple-500",
    time: "há 2 semanas",
    text: "Simulei sem compromisso só pra entender, acabei entrando no plano e fui contemplada antes do esperado! O sonho da casa própria saiu do papel. Indico de olhos fechados 👏",
    likes: 167,
    replies: 9,
  },
  {
    name: "Eduardo Lima",
    location: "Curitiba - PR",
    initials: "EL",
    color: "bg-cyan-500",
    time: "há 2 semanas",
    text: "Parcela cabe no bolso e o atendimento é diferenciado. Já indiquei pra família toda e meu irmão também foi contemplado! Empresa séria e comprometida com o cliente.",
    likes: 211,
    replies: 18,
  },
  {
    name: "Patrícia Mendes",
    location: "Fazenda Rio Grande - PR",
    initials: "PM",
    color: "bg-rose-500",
    time: "há 3 semanas",
    text: "Que felicidade poder dizer que estou contemplada! 🥹 A Falcon cumpriu tudo o que prometeu. Estrutura organizada, consultor sempre disponível e a contemplação veio rapidinho.",
    likes: 178,
    replies: 11,
  },
  {
    name: "Thiago Rocha",
    location: "São José dos Pinhais - PR",
    initials: "TR",
    color: "bg-indigo-500",
    time: "há 1 mês",
    text: "Comprei minha moto 0km com a carta de crédito e ainda sobrou crédito! Melhor decisão que tomei. A Falcon é referência no mercado e eu posso afirmar isso com toda certeza.",
    likes: 153,
    replies: 7,
  },
  {
    name: "Larissa Souza",
    location: "Curitiba - PR",
    initials: "LS",
    color: "bg-teal-500",
    time: "há 1 mês",
    text: "O processo todo foi muito mais simples do que eu imaginava. Sem burocracia, sem letras miúdas. Recebi minha carta de crédito e realizei o sonho do meu apartamento. Gratidão eterna! 🙌",
    likes: 234,
    replies: 19,
  },
];

const CommentsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-blue-100 text-primary text-sm font-semibold rounded-full mb-4">
            Depoimentos reais
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes contemplados estão dizendo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja os comentários de quem já realizou o sonho com a Falcon
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-video">
            <video
              src={`${import.meta.env.BASE_URL}videos/depoimento.mp4`}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            >
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-3">
            Depoimento em vídeo de cliente contemplado
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-5 md:grid-cols-2">
          {comments.map((comment, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`${comment.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0`}
                  aria-hidden="true"
                >
                  {comment.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-foreground truncate">
                      {comment.name}
                    </h3>
                    <BadgeCheck
                      className="w-4 h-4 text-primary flex-shrink-0"
                      aria-label="Cliente verificado"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {comment.location} · {comment.time}
                  </p>
                </div>
              </div>

              <p className="text-foreground/90 text-sm leading-relaxed mb-4">
                {comment.text}
              </p>

              <div className="flex items-center gap-5 text-muted-foreground text-sm pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4 text-primary" />
                  <span className="font-medium">{comment.likes}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-medium">{comment.replies}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
