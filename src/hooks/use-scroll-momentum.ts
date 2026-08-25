import { useEffect } from "react";
import Lenis from "lenis";

const ENABLE_WHEEL_MOMENTUM = true;
const WHEEL_LERP = 0.065;
const SETTLE_DISTANCE = 0.45;

declare global {
  interface Window {
    __siteLenis?: Lenis;
  }
}

const shouldKeepNativeScroll = (target: EventTarget | null, deltaY: number) => {
  if (!(target instanceof Element)) return false;
  if (target.closest("input, textarea, select, [role='listbox'], [role='dialog'], [data-radix-popper-content-wrapper], [data-scroll-momentum='off']")) {
    return true;
  }

  let element: Element | null = target;
  while (element && element !== document.documentElement) {
    const node = element as HTMLElement;
    const style = window.getComputedStyle(node);
    const scrollable = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight;
    if (scrollable) {
      const canScrollDown = deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1;
      const canScrollUp = deltaY < 0 && node.scrollTop > 0;
      if (canScrollDown || canScrollUp) return true;
    }
    element = element.parentElement;
  }

  return false;
};

export const useScrollMomentum = () => {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.075,
      anchors: true,
      smoothWheel: false,
      wheelMultiplier: 1,
      syncTouch: false,
    });
    window.__siteLenis = lenis;
    document.documentElement.dataset.smoothScroll = "lenis";

    if (!ENABLE_WHEEL_MOMENTUM) {
      return () => {
        lenis.destroy();
        delete window.__siteLenis;
        delete document.documentElement.dataset.smoothScroll;
      };
    }

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let frame = 0;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const animate = () => {
      const distance = targetScroll - currentScroll;
      if (Math.abs(distance) <= SETTLE_DISTANCE) {
        currentScroll = targetScroll;
        window.scrollTo(0, currentScroll);
        frame = 0;
        return;
      }
      currentScroll += distance * WHEEL_LERP;
      window.scrollTo(0, currentScroll);
      frame = requestAnimationFrame(animate);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || shouldKeepNativeScroll(event.target, event.deltaY)) return;

      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : 1;
      const deltaY = event.deltaY * unit;
      if (!deltaY) return;

      event.preventDefault();
      currentScroll = window.scrollY;
      targetScroll = Math.min(maxScroll(), Math.max(0, targetScroll + deltaY));
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const syncScroll = () => {
      if (!frame) {
        currentScroll = window.scrollY;
        targetScroll = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    window.addEventListener("scroll", syncScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("scroll", syncScroll);
      if (frame) cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__siteLenis;
      delete document.documentElement.dataset.smoothScroll;
    };
  }, []);
};
