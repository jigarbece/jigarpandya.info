/* Jigar M. Pandya - Portfolio | jigarpandya.info | contact@jigarpandya.info */
(function () {
  const nav = document.querySelector(".site-nav");
  const backToTop = document.querySelector(".back-to-top");

  function onScroll() {
    const scrolled = window.scrollY > 80;
    nav?.classList.toggle("scrolled", scrolled);
    backToTop?.classList.toggle("visible", window.scrollY > 420);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const typewriter = document.querySelector(".typewriter");
  if (typewriter) {
    const phrases = typewriter.dataset.phrases.split("|");
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const phrase = phrases[phraseIndex];
      typewriter.textContent = phrase.slice(0, charIndex) + (charIndex % 2 ? "|" : "");
      if (!deleting && charIndex < phrase.length) charIndex++;
      else if (!deleting) deleting = true;
      else if (charIndex > 0) charIndex--;
      else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(tick, deleting ? 42 : 72);
    }
    tick();
  }

  if (window.gsap) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    gsap.from(".logo-mark", { scale: 0.86, opacity: 0.5, duration: 0.9, ease: "elastic.out(1, 0.45)" });

    const title = document.querySelector(".split-title");
    if (title) {
      const words = Array.from(title.children);
      words.forEach((word) => {
        word.innerHTML = word.textContent.split("").map((letter) => `<span class="title-letter">${letter}</span>`).join("");
      });
      gsap.from(".title-letter", { yPercent: 90, opacity: 0, duration: 0.65, stagger: 0.05, ease: "power3.out" });
    }

    gsap.utils.toArray(".cta-animate").forEach((btn) => {
      btn.addEventListener("mouseenter", () => gsap.to(btn, { scale: 1.05, boxShadow: "0 0 42px rgba(0,212,255,0.45)", duration: 0.2 }));
      btn.addEventListener("mouseleave", () => gsap.to(btn, { scale: 1, boxShadow: "", duration: 0.2 }));
    });

    gsap.utils.toArray(".stat-card").forEach((card) => {
      gsap.from(card, window.ScrollTrigger ? { y: 28, opacity: 0, duration: 0.7, scrollTrigger: { trigger: card, start: "top 88%" } } : { y: 28, opacity: 0, duration: 0.7 });
      const value = card.querySelector("[data-count]");
      if (!value) return;
      const state = { n: 0 };
      gsap.to(state, {
        n: Number(value.dataset.count),
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: window.ScrollTrigger ? { trigger: card, start: "top 88%", once: true } : undefined,
        onUpdate: () => {
          value.textContent = Math.round(state.n) + (value.dataset.suffix || "");
        }
      });
    });

    gsap.utils.toArray(".timeline-card").forEach((card, index) => {
      gsap.from(card, window.ScrollTrigger ? { x: index % 2 === 0 ? -52 : 52, opacity: 0, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 82%" } } : { x: 0, opacity: 0, duration: 0.75, ease: "power2.out" });
    });

    gsap.from(".project-card", window.ScrollTrigger ? { scale: 0.95, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".project-card", start: "top 86%" } } : { scale: 0.95, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power2.out" });
  }

  function initParticles() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BufferGeometry();
    const count = 150;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 900;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 520;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 520;
      const cyan = Math.random() > 0.62;
      colors[i * 3] = cyan ? 0 : 1;
      colors[i * 3 + 1] = cyan ? 0.83 : 1;
      colors[i * 3 + 2] = 1;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 3.2, transparent: true, opacity: 0.72, vertexColors: true, depthWrite: false });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", resize);

    function animate(time) {
      const t = time * 0.00035;
      points.rotation.y = t * 0.18 - mouse.x * 0.08;
      points.rotation.x = Math.sin(t) * 0.05 + mouse.y * 0.05;
      const attr = geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        attr.array[i * 3 + 1] += Math.sin(t + i) * 0.008;
      }
      attr.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
  initParticles();
})();
