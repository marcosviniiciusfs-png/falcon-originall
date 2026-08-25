export const smoothScrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const lenis = (window as Window & {
    __siteLenis?: { scrollTo: (target: Element, options?: { offset?: number }) => void };
  }).__siteLenis;

  if (lenis) {
    lenis.scrollTo(element, { offset: -72 });
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
};
