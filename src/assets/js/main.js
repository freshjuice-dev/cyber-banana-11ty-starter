/**
 * Cyber Banana - Main JavaScript
 * Vanilla JS with dark mode support
 */

import "lite-youtube-embed";
import "@zachleat/table-saw";
import "./components/mobile-menu.js";
import "./components/accordion.js";

/**
 * Initialize range inputs (for Chrome/Safari progress fill)
 */
function initRangeInputs() {
  // Firefox has native ::-moz-range-progress, skip it
  if (navigator.userAgent.includes("Firefox")) return;

  const updateProgress = (input) => {
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const value = parseFloat(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, var(--color-primary-500) ${percent}%, var(--color-zinc-200) ${percent}%)`;
  };

  document.querySelectorAll('input[type="range"]').forEach((input) => {
    updateProgress(input);
    input.addEventListener("input", () => updateProgress(input));
  });
}

/**
 * DOM ready handler
 */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Add loaded class for CSS transitions
    document.body.classList.add("loaded");

    // Initialize range inputs
    initRangeInputs();

    // Cyber Banana console branding
    console.log(
      "%c Cyber Banana %c Developer Portfolio ",
      "background: linear-gradient(135deg, #FFE500 0%, #E6CF00 100%); color: #0a0a0f; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 8px 0 0 8px;",
      "background: #0a0a0f; color: #FFE500; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 0 8px 8px 0;"
    );
    console.log(
      "%c Made with love by FreshJuice Team %c https://freshjuice.dev",
      "color: #71717a; font-size: 12px;",
      "color: #FFE500; font-size: 12px;"
    );
  },
  { once: true }
);
