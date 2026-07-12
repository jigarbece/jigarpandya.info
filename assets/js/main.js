
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

  const visitorCount = document.querySelector("[data-visitor-count]");
  if (visitorCount) {
    const total = visitorCount.querySelector("[data-visitor-total]");
    const storageKey = "jp_unique_visit_counted";
    const counterBase = "https://api.counterapi.dev/v1/jigarpandya-info/unique-visitors";
    let shouldCount = true;

    try {
      shouldCount = sessionStorage.getItem(storageKey) !== "1";
    } catch (_) {
      shouldCount = true;
    }

    visitorCount.hidden = false;
    if (total && !total.textContent.trim()) total.textContent = "1+";

    const counterUrl = shouldCount ? `${counterBase}/up` : `${counterBase}/`;
    fetch(counterUrl)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const count = Number(data.count ?? data.value);
        if (!Number.isFinite(count)) return;
        total.textContent = count.toLocaleString();
        visitorCount.hidden = false;
        if (shouldCount) {
          try {
            sessionStorage.setItem(storageKey, "1");
          } catch (_) {}
        }
      })
      .catch(() => {
        visitorCount.hidden = false;
      });
  }

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
    gsap.utils.toArray(".career-card").forEach((card) => {
      gsap.from(card, window.ScrollTrigger ? { y: 46, opacity: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 84%" } } : { y: 46, opacity: 0, duration: 0.85, ease: "power3.out" });
    });
    gsap.utils.toArray(".timeline-milestone").forEach((item, index) => {
      gsap.from(item.querySelector(".timeline-panel"), window.ScrollTrigger ? { x: index % 2 === 0 ? -58 : 58, y: 18, opacity: 0, duration: 0.82, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 82%" } } : { x: 0, y: 18, opacity: 0, duration: 0.82, ease: "power3.out" });
      gsap.from(item.querySelector(".timeline-node"), window.ScrollTrigger ? { scale: 0.65, opacity: 0, duration: 0.65, ease: "back.out(1.7)", scrollTrigger: { trigger: item, start: "top 82%" } } : { scale: 0.65, opacity: 0, duration: 0.65, ease: "back.out(1.7)" });
      const companion = item.querySelector(".timeline-companion");
      if (companion) {
        gsap.from(companion, window.ScrollTrigger ? { x: index % 2 === 0 ? 48 : -48, opacity: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 82%" } } : { x: 0, opacity: 0, duration: 0.72, ease: "power3.out" });
      }
    });

    gsap.from(".project-card", window.ScrollTrigger ? { y: 34, scale: 0.97, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".project-card", start: "top 86%" } } : { y: 34, scale: 0.97, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" });
    gsap.from(".project-showcase-card", window.ScrollTrigger ? { y: 42, rotateX: -6, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".project-showcase", start: "top 82%" } } : { y: 42, rotateX: -6, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" });
    gsap.from(".project-lab-top", window.ScrollTrigger ? { y: 28, opacity: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: ".project-lab-top", start: "top 86%" } } : { y: 28, opacity: 0, duration: 0.75, ease: "power3.out" });
  }

  document.querySelectorAll(".project-showcase-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      if (window.matchMedia("(pointer: fine)").matches) {
        card.style.transform = `rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 7}deg) translateY(-4px)`;
      }
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "20%");
    });
  });

  const careerLinks = [...document.querySelectorAll(".career-index-link")];
  const careerCards = [...document.querySelectorAll(".career-card")];
  if (careerLinks.length && careerCards.length) {
    const setActiveCareer = (id) => {
      careerLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
    };
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveCareer(entry.target.id);
        });
      }, { rootMargin: "-35% 0px -50% 0px", threshold: 0.1 });
      careerCards.forEach((card) => observer.observe(card));
    }
  }

  const careerTimelineData = {
    priya: {
      accent: "#00d4ff",
      years: "2022-Present",
      level: "Current Chapter",
      title: "Lead Analyst",
      company: "Priya Softweb Solutions, Ahmedabad",
      project: "Polaris Payroll - enterprise payroll management for US-based firms.",
      impact: ["Team delivery", "Critical bug resolution", "API architecture"],
      points: ["Led full development team and managed sprint delivery.", "Resolved critical bugs and implemented client-driven feature enhancements.", "Architected API layer using ASP.NET MVC + .NET Core."],
      tech: [".NET Core", "C#.NET", "Web Forms", "MS SQL Server", "MVC API", "SSRS"]
    },
    wide: {
      accent: "#7c3aed",
      years: "2020-2022",
      level: "Product Build",
      title: "Senior Software Engineer",
      company: "Wide Perceptions IT Pvt. Ltd., Ahmedabad",
      project: "MavenList social platform and Cargo Management System.",
      impact: ["Database design", "Xamarin delivery", "Dashboards"],
      points: ["Designed full database schema and business logic layer.", "Delivered end-to-end features using Xamarin Forms + RESTful APIs.", "Built reporting, invoicing, and interactive dashboard modules for logistics workflows."],
      tech: ["Xamarin Forms", "Core REST API", "ASP.NET MVC", "MS SQL Server", "SSRS", "jQuery", "AJAX"]
    },
    itech: {
      accent: "#ff6348",
      years: "2017-2020",
      level: "Full Stack",
      title: "Senior .NET Developer",
      company: "itechnotree, Ahmedabad",
      project: "Capture My Photo desktop app and Ceramic Company Website CMS.",
      impact: ["Camera integration", "Image processing", "CMS delivery"],
      points: ["Integrated camera workflows, real-time image processing, and UI customization.", "Delivered CMS features from DB design to frontend integration.", "Built production features with C#.NET, ASP.NET MVC, and SQL Server."],
      tech: ["C#.NET", "ASP.NET MVC", "MS SQL Server", "jQuery", "HTML5", "CSS3"]
    },
    oceans: {
      accent: "#22c55e",
      years: "2013-2016",
      level: "Computer Vision",
      title: "Senior .NET Developer",
      company: "IT Oceans Web Solutions, Ahmedabad",
      project: "Face Recognition Tool for smart pole surveillance in academic institutions.",
      impact: ["Facial matching", "DB structure", "Realtime processing"],
      points: ["Designed DB structure and implemented facial detection and matching.", "Integrated OpenCV with C#.NET for real-time image processing.", "Supported academic surveillance use cases with reliable recognition workflows."],
      tech: ["C#.NET", "MS SQL Server", "OpenCV"]
    },
    triston: {
      accent: "#ffd166",
      years: "2010-2011",
      level: "Foundation",
      title: ".NET Developer",
      company: "Triston Software, Ahmedabad",
      project: "Real Estate Portal and OCR Data Migration Tool.",
      impact: ["Requirement analysis", "UI/UX", "OCR parsing"],
      points: ["Handled requirement analysis, UI/UX, and backend development for property listings.", "Built OCR document-to-Excel automation for migration workflows.", "Implemented parsing and data transformation logic."],
      tech: ["ASP.NET", "JavaScript", "MVC", "MS SQL Server", "C#.NET", "OCR Tools"]
    }
  };

  document.querySelectorAll(".interactive-timeline").forEach((timeline) => {
    const detail = timeline.querySelector(".timeline-detail");
    if (!detail) return;
    const fields = {
      years: detail.querySelector("[data-career-years]"),
      level: detail.querySelector("[data-career-level]"),
      title: detail.querySelector("[data-career-title]"),
      company: detail.querySelector("[data-career-company]"),
      project: detail.querySelector("[data-career-project]"),
      impact: detail.querySelector("[data-career-impact]"),
      points: detail.querySelector("[data-career-points]"),
      tech: detail.querySelector("[data-career-tech]")
    };
    const setRole = (key) => {
      const role = careerTimelineData[key];
      if (!role) return;
      detail.style.setProperty("--role-accent", role.accent);
      fields.years.textContent = role.years;
      fields.level.textContent = role.level;
      fields.title.textContent = role.title;
      fields.company.textContent = role.company;
      fields.project.textContent = role.project;
      fields.impact.innerHTML = role.impact.map((item) => `<span>${item}</span>`).join("");
      fields.points.innerHTML = role.points.map((item) => `<li>${item}</li>`).join("");
      fields.tech.innerHTML = role.tech.map((item) => `<span>${item}</span>`).join("");
      timeline.querySelectorAll(".timeline-step").forEach((step) => step.classList.toggle("active", step.dataset.role === key));
      if (window.gsap) gsap.fromTo(detail, { opacity: 0.72, y: 10 }, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" });
    };
    timeline.querySelectorAll(".timeline-step").forEach((step) => {
      step.addEventListener("mouseenter", () => setRole(step.dataset.role));
      step.addEventListener("focus", () => setRole(step.dataset.role));
      step.addEventListener("click", () => {
        setRole(step.dataset.role);
        if (window.matchMedia("(max-width: 991px)").matches) {
          const mobileRole = timeline.querySelector(`[data-mobile-role="${step.dataset.role}"]`);
          window.setTimeout(() => (mobileRole || detail).scrollIntoView({ behavior: "smooth", block: "start" }), 80);
        }
      });
    });
  });

  const projectsPageData = {
    tejsikho: {
      accent: "#f97316",
      image: "assets/images/projects/tejsikho.png",
      alt: "Tej Sikho screenshot",
      badges: ["Learning Project", "Live & Deployed"],
      title: "Tej Sikho तेज़ सीखो",
      tagline: "Gamified Hindi Handwriting App for Kids",
      description: "A forgiving-by-design PWA that sends kids back to pen and paper: show a Hindi letter, the child writes it by hand and scans it with the camera, and a lenient OCR pipeline rewards effort with coins, XP, and collectible cards. It never says \"wrong\" — only \"so close, try again!\"",
      live: "https://learn.jigarpandya.info/",
      features: ["Write-on-paper → scan → earn real-world learning loop", "Forgiving OCR that weights base characters above matras", "Full gamification: XP, levels, daily streaks & challenges, badges", "Reward economy: 100 collectible cards, treasure shop, grow-a-garden, leaderboard", "Live global \"champions\" visitor counter", "Immersive 3D landing & dashboard with floating letters and coins", "Data-driven, language-agnostic content (Hindi, Gujarati, English)", "Offline-capable PWA with network-first service worker"],
      tech: ["React 18", "Vite", "Tailwind CSS", "Three.js", "Framer Motion", "Zustand", "Firebase Auth", "Cloud Firestore", "Google Cloud Vision", "Tesseract.js", "PWA", "Vitest"],
      learnings: ["Confidence-aware, forgiving Devanagari scoring", "OCR pipeline with graceful Vision → Tesseract fallback", "Data-driven multi-language content architecture", "Firebase auth, atomic Firestore counters & security rules", "3D UI with Three.js and Framer Motion", "PWA service workers and offline app shell"]
    },
    snaprain: {
      accent: "#00b4d8",
      image: "assets/images/projects/snaprain.png",
      alt: "SnapRain screenshot",
      badges: ["Learning Project", "Live & Deployed"],
      title: "SnapRain 🌧️",
      tagline: "Signup-Free Real-Time Photo Sharing for Any Gathering",
      description: "A PWA that lets anyone at an event share and view photos in real-time using just a 6-character event code. No account, no app download, no friction.",
      live: "https://snaprain.jigarpandya.info",
      features: ["Instant event creation with unique 6-character code", "Join with just your name, zero signup required", "Real-time photo and video sharing via Supabase Realtime", "Organizer approval flow and dashboard", "Auto-compress before upload", "Save All bulk download", "Event auto-expiry options", "PWA install and offline gallery support"],
      tech: ["Next.js", "TypeScript", "Tailwind CSS v4", "Supabase", "PostgreSQL", "Supabase Realtime", "Supabase Storage", "Vercel", "PWA"],
      learnings: ["Supabase Realtime subscriptions for live updates", "Next.js App Router and mobile-first UX", "Signup-free organizer key pattern", "Optional email OTP recovery", "Client-side image compression", "Vercel deployment with custom subdomain"]
    },
    vitalai: {
      accent: "#ff4757",
      image: "assets/images/projects/vitalai.png",
      alt: "VitalAI screenshot",
      badges: ["Learning Project", "In Development"],
      title: "VitalAI 🩺",
      tagline: "AI-Powered Blood Report Analyzer",
      description: "Upload a blood test report and receive AI-generated personalized diet plans, exercise recommendations, and biomarker analysis.",
      live: "https://vitalai.jigarpandya.info/",
      features: ["Blood report upload", "AI biomarker analysis via Claude API", "Personalized diet and exercise plan", "Health score with indicators", "Blood marker status table"],
      tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Anthropic Claude API", "pdf-parse", "Tesseract.js"],
      learnings: ["Anthropic API integration", "File parsing pipelines", "Stateless backend design", "Multi-step UX flows"]
    },
    astro: {
      accent: "#7c3aed",
      image: "assets/images/projects/astro.png",
      alt: "AstroPortal screenshot",
      badges: ["Learning Project", "In Development"],
      title: "AstroPortal 🔮",
      tagline: "AI-Powered Astrology & Kundali Platform",
      description: "Astrology portal serving personalized Kundali reports with WhatsApp Business API delivery for PDF reports.",
      live: "http://shivaspeaksastroportal.com/",
      features: ["Kundali report generation", "WhatsApp PDF delivery via Meta Cloud API", "Client management with mobile numbers", "Custom SVG planet assets", "AI-generated interpretations"],
      tech: ["ASP.NET Core", "C#", "MS SQL Server", "Meta WhatsApp Cloud API", "JavaScript", "Custom SVG"],
      learnings: ["WhatsApp Business API", "Meta Cloud API document messages", "Template approval flow", "SVG asset design"]
    },
    youtube: {
      accent: "#ff0000",
      image: "assets/images/projects/youtube.png",
      alt: "ClipForge AI screenshot",
      badges: ["Learning Project", "Built & Testing"],
      title: "ClipForge AI 🎬",
      tagline: "Fully Automated Faceless YouTube Channel",
      description: "Pipeline that researches trends, generates scripts, creates voiceovers, assembles videos, and prepares YouTube uploads.",
      live: "",
      features: ["Trending topic research", "Local Mistral script generation", "Text-to-speech voiceover", "Auto video assembly", "Scheduled YouTube upload"],
      tech: ["Python", "Ollama", "Mistral LLM", "MoviePy", "FFmpeg", "edge-tts", "pytrends", "Pexels API", "YouTube Data API v3"],
      learnings: ["Local LLM orchestration", "Video pipeline automation", "Python scripting", "API chaining"]
    }
  };

  document.querySelectorAll(".project-browser").forEach((browser) => {
    const panel = browser.querySelector(".project-detail-panel");
    const image = browser.querySelector("[data-project-detail-image]");
    const fields = {
      badges: browser.querySelector("[data-project-detail-badges]"),
      title: browser.querySelector("[data-project-detail-title]"),
      tagline: browser.querySelector("[data-project-detail-tagline]"),
      description: browser.querySelector("[data-project-detail-description]"),
      live: browser.querySelector("[data-project-detail-live]"),
      features: browser.querySelector("[data-project-detail-features]"),
      tech: browser.querySelector("[data-project-detail-tech]"),
      learnings: browser.querySelector("[data-project-detail-learnings]")
    };
    let active = browser.dataset.activeProject || "snaprain";
    const setProject = (key, userAction = false) => {
      const project = projectsPageData[key];
      if (!project || !panel) return;
      active = key;
      browser.dataset.activeProject = key;
      panel.style.setProperty("--project-accent", project.accent);
      image.src = project.image;
      image.alt = project.alt;
      fields.badges.innerHTML = project.badges.map((badge) => `<span class="badge ${badge.includes("Live") || badge.includes("Built") ? "badge-green" : badge.includes("Development") ? "badge-status" : "badge-learning"}">${badge}</span>`).join("");
      fields.title.textContent = project.title;
      fields.tagline.textContent = project.tagline;
      fields.description.textContent = project.description;
      fields.live.href = project.live || "#";
      fields.live.textContent = project.live ? "🌐 Live App" : "Case Study";
      fields.live.style.display = project.live ? "inline-flex" : "none";
      fields.features.innerHTML = project.features.map((item) => `<li>${item}</li>`).join("");
      fields.tech.innerHTML = project.tech.map((item) => `<span>${item}</span>`).join("");
      fields.learnings.innerHTML = project.learnings.map((item) => `<li>${item}</li>`).join("");
      browser.querySelectorAll(".project-thumb").forEach((thumb) => {
        const selected = thumb.dataset.project === key;
        thumb.classList.toggle("active", selected);
        if (selected) thumb.scrollIntoView({ behavior: userAction ? "smooth" : "auto", inline: "center", block: "nearest" });
      });
      if (window.gsap) gsap.fromTo(panel, { opacity: 0.78, y: 12 }, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" });
    };
    browser.querySelectorAll(".project-thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => setProject(thumb.dataset.project, true));
    });
    setProject(active);
  });

  document.querySelectorAll("img[loading='lazy']").forEach((image) => {
    image.classList.add("lazy-media");
    if (image.complete) image.classList.add("is-loaded");
    image.addEventListener("load", () => image.classList.add("is-loaded"), { once: true });
  });

  const projectData = {
    tejsikho: {
      accent: "#f97316",
      status: "Live & Deployed",
      title: "Tej Sikho तेज़ सीखो",
      tagline: "Gamified Hindi Handwriting App for Kids",
      desc: "Show a Hindi letter, the child writes it on paper and scans it — a forgiving OCR pipeline rewards effort with coins, XP & collectible cards. Never \"wrong,\" only \"try again!\"",
      image: "assets/images/projects/tejsikho.png",
      alt: "Tej Sikho app screenshot",
      tech: ["React", "Three.js", "Firebase", "Cloud Vision"],
      details: "projects.html#tejsikho",
      live: "https://learn.jigarpandya.info/"
    },
    vitalai: {
      accent: "#ff4757",
      status: "In Development",
      title: "VitalAI 🩺",
      tagline: "AI Blood Report Analyzer",
      desc: "Upload a blood report -> get personalized diet & exercise plan powered by Claude AI.",
      image: "assets/images/projects/vitalai.png",
      alt: "VitalAI app screenshot",
      tech: ["React", "Node.js", "Anthropic API", "Tailwind"],
      details: "projects.html#vitalai",
      live: "https://vitalai.jigarpandya.info/"
    },
    astro: {
      accent: "#7c3aed",
      status: "In Development",
      title: "AstroPortal 🔮",
      tagline: "AI-Powered Astrology Platform",
      desc: "Kundali reports, AI interpretations, and WhatsApp PDF delivery via Meta Cloud API.",
      image: "assets/images/projects/astro.png",
      alt: "AstroPortal app screenshot",
      tech: ["ASP.NET Core", "SQL Server", "WhatsApp API"],
      details: "projects.html#astroportal",
      live: "http://shivaspeaksastroportal.com/"
    },
    snaprain: {
      accent: "#00b4d8",
      status: "Live & Deployed",
      title: "SnapRain 🌧️",
      tagline: "Signup-Free Real-Time Photo Sharing",
      desc: "Create an event, share a 6-character code, and let everyone's photos rain down to the group instantly.",
      image: "assets/images/projects/snaprain.png",
      alt: "SnapRain app screenshot",
      tech: ["Next.js", "Supabase", "Realtime", "PWA"],
      details: "projects.html#snaprain",
      live: "https://snaprain.jigarpandya.info"
    },
    clipforge: {
      accent: "#ff0000",
      status: "Built & Testing",
      title: "ClipForge AI 🎬",
      tagline: "Automated Faceless YouTube Pipeline",
      desc: "Research trends, generate scripts, create voiceovers, assemble videos, and prepare YouTube uploads.",
      image: "assets/images/projects/youtube.png",
      alt: "ClipForge AI app screenshot",
      tech: ["Python", "Ollama", "MoviePy", "FFmpeg"],
      details: "projects.html#youtube-pipeline",
      live: ""
    }
  };

  document.querySelectorAll(".project-switcher").forEach((switcher) => {
    const feature = switcher.querySelector(".showcase-feature");
    const title = switcher.querySelector("[data-project-title]");
    const tagline = switcher.querySelector("[data-project-tagline]");
    const desc = switcher.querySelector("[data-project-desc]");
    const image = switcher.querySelector("[data-project-image]");
    const status = switcher.querySelector("[data-project-status]");
    const tech = switcher.querySelector("[data-project-tech]");
    const details = switcher.querySelector("[data-project-details]");
    const live = switcher.querySelector("[data-project-live]");

    function setProject(projectKey) {
      const project = projectData[projectKey];
      if (!project || !feature) return;
      switcher.dataset.activeProject = projectKey;
      feature.classList.add("is-changing");
      window.setTimeout(() => {
        feature.style.setProperty("--project-accent", project.accent);
        status.textContent = project.status;
        status.classList.toggle("badge-green", project.status.includes("Live"));
        status.classList.toggle("badge-status", !project.status.includes("Live"));
        title.textContent = project.title;
        tagline.textContent = project.tagline;
        desc.textContent = project.desc;
        image.onload = () => image.classList.add("is-loaded");
        image.src = project.image;
        image.alt = project.alt;
        image.classList.remove("is-loaded");
        if (image.complete) image.classList.add("is-loaded");
        tech.innerHTML = project.tech.map((item) => `<span>${item}</span>`).join("");
        details.href = project.details;
        live.href = project.live || project.details;
        live.textContent = project.live ? "Live App" : "View Case Study";
        live.target = project.live ? "_blank" : "";
        if (project.live) live.setAttribute("rel", "noreferrer");
        else live.removeAttribute("rel");
        switcher.querySelectorAll(".project-rail-item").forEach((item) => {
          const selected = item.dataset.project === projectKey;
          item.classList.toggle("active", selected);
          item.setAttribute("aria-selected", selected ? "true" : "false");
        });
        feature.classList.remove("is-changing");
        if (window.gsap) {
          gsap.fromTo(feature.querySelector(".showcase-device img"), { y: 18, rotate: 5, opacity: 0 }, { y: 0, rotate: 3, opacity: 1, duration: 0.55, ease: "power3.out" });
        }
      }, 180);
    }

    switcher.querySelectorAll(".project-rail-item").forEach((button) => {
      button.addEventListener("click", () => setProject(button.dataset.project));
    });
  });

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
