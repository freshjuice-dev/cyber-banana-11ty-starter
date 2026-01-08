/**
 * Mobile Menu Component
 * Vanilla JS mobile menu with smooth dropdown animation
 */
class MobileMenu {
  constructor() {
    this.isOpen = false;
    this.button = document.querySelector("[data-mobile-menu-toggle]");
    this.menu = document.querySelector("[data-mobile-menu]");
    this.openIcon = document.querySelector("[data-mobile-menu-icon-open]");
    this.closeIcon = document.querySelector("[data-mobile-menu-icon-close]");

    if (this.button && this.menu) {
      this.init();
    }
  }

  init() {
    // Toggle on button click
    this.button.addEventListener("click", () => this.toggle());

    // Close menu when clicking nav links
    this.menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => this.close());
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
        this.button.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isOpen && !this.menu.contains(e.target) && !this.button.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.menu.hidden = false;

    // Trigger reflow for animation
    this.menu.offsetHeight;

    // Apply open state classes
    this.menu.classList.remove("invisible", "opacity-0", "scale-95");
    this.menu.classList.add("visible", "opacity-100", "scale-100");
    this.menu.style.maxHeight = this.menu.scrollHeight + "px";

    this.button.setAttribute("aria-expanded", "true");

    if (this.openIcon) this.openIcon.hidden = true;
    if (this.closeIcon) this.closeIcon.hidden = false;
  }

  close() {
    this.isOpen = false;

    // Apply closed state classes
    this.menu.classList.remove("visible", "opacity-100", "scale-100");
    this.menu.classList.add("invisible", "opacity-0", "scale-95");
    this.menu.style.maxHeight = "0";

    this.button.setAttribute("aria-expanded", "false");

    if (this.openIcon) this.openIcon.hidden = false;
    if (this.closeIcon) this.closeIcon.hidden = true;

    // Hide after animation completes
    const handleTransitionEnd = () => {
      if (!this.isOpen) {
        this.menu.hidden = true;
      }
      this.menu.removeEventListener("transitionend", handleTransitionEnd);
    };

    this.menu.addEventListener("transitionend", handleTransitionEnd);
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => new MobileMenu());
