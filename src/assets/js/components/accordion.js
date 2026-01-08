/**
 * Accordion Component
 * Vanilla JS replacement for Alpine accordion
 */
class Accordion {
  constructor(element) {
    this.element = element;
    this.items = element.querySelectorAll("[data-accordion-item]");
    this.openIndex = null;
    this.init();
  }

  init() {
    this.items.forEach((item, index) => {
      const trigger = item.querySelector("[data-accordion-trigger]");
      const content = item.querySelector("[data-accordion-content]");

      if (!trigger || !content) return;

      // Set initial state
      content.style.maxHeight = "0";
      content.style.overflow = "hidden";
      content.style.transition = "max-height 0.3s ease-out";

      // Add click handler
      trigger.addEventListener("click", () => this.toggle(index));

      // Keyboard support
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggle(index);
        }
      });
    });
  }

  toggle(index) {
    const item = this.items[index];
    const content = item.querySelector("[data-accordion-content]");
    const trigger = item.querySelector("[data-accordion-trigger]");
    const icon = trigger.querySelector("[data-accordion-icon]");

    if (this.openIndex === index) {
      // Close current item
      content.style.maxHeight = "0";
      trigger.setAttribute("aria-expanded", "false");
      if (icon) icon.style.transform = "rotate(0deg)";
      this.openIndex = null;
    } else {
      // Close previous item if open
      if (this.openIndex !== null && this.items[this.openIndex]) {
        const prevItem = this.items[this.openIndex];
        const prevContent = prevItem.querySelector("[data-accordion-content]");
        const prevTrigger = prevItem.querySelector("[data-accordion-trigger]");
        const prevIcon = prevTrigger?.querySelector("[data-accordion-icon]");

        if (prevContent) prevContent.style.maxHeight = "0";
        if (prevTrigger) prevTrigger.setAttribute("aria-expanded", "false");
        if (prevIcon) prevIcon.style.transform = "rotate(0deg)";
      }

      // Open new item
      content.style.maxHeight = content.scrollHeight + "px";
      trigger.setAttribute("aria-expanded", "true");
      if (icon) icon.style.transform = "rotate(180deg)";
      this.openIndex = index;
    }
  }
}

// Initialize all accordions on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-accordion]").forEach((el) => new Accordion(el));
});
