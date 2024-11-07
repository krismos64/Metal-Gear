// Configuration Particles.js
particlesJS("particles-js", {
  particles: {
    number: { value: 110, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 5.5, random: true },
    size: { value: 5, random: true },
    line_linked: { enable: false },
    move: { enable: true, speed: 4, direction: "none" },
  },
});

// Animation GSAP pour l’apparition du texte
gsap.from(".glitch", {
  duration: 1,
  opacity: 0,
  y: -50,
  ease: "power2.out",
  stagger: 0.3,
});
