// ===== MODERN PORTFOLIO JAVASCRIPT =====

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
});

// ===== LOADING SCREEN =====
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.style.overflow = "auto";
  }, 2000);
});

// ===== NAVIGATION =====
class Navigation {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.navToggle = document.getElementById("nav-toggle");
    this.navMenu = document.getElementById("nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.themeToggle = document.getElementById("theme-toggle");

    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleThemeToggle();
    this.handleSmoothScroll();
    this.handleActiveLink();
    this.handleScrollArrow();
  }

  handleScroll() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.navbar.classList.add("scrolled");
      } else {
        this.navbar.classList.remove("scrolled");
      }
    });
  }

  handleMobileMenu() {
    this.navToggle.addEventListener("click", () => {
      this.navToggle.classList.toggle("active");
      this.navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close mobile menu when clicking on a link
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.navToggle.classList.remove("active");
        this.navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.navbar.contains(e.target)) {
        this.navToggle.classList.remove("active");
        this.navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }

  handleThemeToggle() {
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);

    this.themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Update theme toggle icon
      this.themeToggle.innerHTML =
        newTheme === "dark"
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
    });

    // Set initial icon
    this.themeToggle.innerHTML =
      currentTheme === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  }

  handleSmoothScroll() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  handleActiveLink() {
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      this.navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  handleScrollArrow() {
    const scrollArrow = document.getElementById("scroll-arrow");
    if (scrollArrow) {
      scrollArrow.addEventListener("click", () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          const offsetTop = aboutSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    }
  }
}

// ===== PARTICLE BACKGROUND =====
class ParticleBackground {
  constructor() {
    this.canvas = document.getElementById("particles");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 50;

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
    this.animate();

    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.fill();
    });

    // Draw connections
    this.drawConnections();

    requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${
            0.1 * (1 - distance / 100)
          })`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
}

// ===== ANIMATED COUNTERS =====
class AnimatedCounters {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number");
    this.init();
  }

  init() {
    this.observeCounters();
  }

  observeCounters() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach((counter) => {
      observer.observe(counter);
    });
  }

  animateCounter(counter) {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  }
}

// ===== SKILL BARS =====
class SkillBars {
  constructor() {
    this.skillBars = document.querySelectorAll(".skill-progress");
    this.init();
  }

  init() {
    this.observeSkillBars();
  }

  observeSkillBars() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateSkillBar(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.skillBars.forEach((bar) => {
      observer.observe(bar);
    });
  }

  animateSkillBar(bar) {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width + "%";
    }, 200);
  }
}

// ===== CONTACT FORM =====
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.init();
  }

  init() {
    if (this.form) {
      this.handleSubmit();
      this.handleValidation();
    }
  }

  handleSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validate all fields before submitting
      const inputs = this.form.querySelectorAll("input, textarea");
      let isValid = true;

      inputs.forEach((input) => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        this.showMessage("Please fix the errors above", "error");
        return;
      }

      // Get form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData);

      // Show loading state
      const submitBtn = this.form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Send email using EmailJS
      this.sendEmail(data, submitBtn, originalText);
    });
  }

  sendEmail(data, submitBtn, originalText) {
    // Create mailto link as a simple solution
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    const mailtoLink = `mailto:safakyildiz95@gmail.com?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Show success message
    this.showMessage(
      "Opening your email client... Please send the email to complete the process.",
      "success"
    );
    this.form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }

  handleValidation() {
    const inputs = this.form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = "";

    // Remove existing error styling
    field.classList.remove("error");
    this.removeErrorMessage(field);

    // Validation rules
    switch (fieldName) {
      case "name":
        if (value.length < 2) {
          isValid = false;
          errorMessage = "Name must be at least 2 characters long";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "subject":
        if (value.length < 5) {
          isValid = false;
          errorMessage = "Subject must be at least 5 characters long";
        }
        break;
      case "message":
        if (value.length < 10) {
          isValid = false;
          errorMessage = "Message must be at least 10 characters long";
        }
        break;
    }

    if (!isValid) {
      field.classList.add("error");
      this.showErrorMessage(field, errorMessage);
    }

    return isValid;
  }

  showErrorMessage(field, message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.color = "#ef4444";
    errorDiv.style.fontSize = "0.875rem";
    errorDiv.style.marginTop = "0.25rem";
    field.parentNode.appendChild(errorDiv);
  }

  removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
  }

  showMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === "success" ? "#10b981" : "#ef4444"};
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  new Navigation();
  new ParticleBackground();
  new AnimatedCounters();
  new SkillBars();
  new ContactForm();

  // Add custom CSS animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .menu-open {
            overflow: hidden;
        }
    `;
  document.head.appendChild(style);
});
