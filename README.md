# Anup Agrawal — Personal Portfolio

A responsive, single-page personal portfolio website built with **pure HTML, CSS, and JavaScript** — no frameworks, no build step, zero dependencies.

🔗 **Live Site:** [anup-agrawal.vercel.app](https://anup-agrawal.vercel.app/)
🔗 **GitHub:** [github.com/anupcode18](https://github.com/anupcode18)
🔗 **LinkedIn:** [linkedin.com/in/anup-agrawal18](https://www.linkedin.com/in/anup-agrawal18)

---

## 🖼 Preview

<!-- Add a screenshot of the live site here so visitors see the design before clicking the link -->
<!-- Example: ![Portfolio preview](assets/preview.png) -->

---

## 🚀 Features

- **Single-page** with smooth-scroll anchor navigation (Home → About → Skills → Projects → Contact)
- **Typewriter hero** cycling through role titles
- **Scroll-triggered fade/slide-in animations** via IntersectionObserver API
- **CSS-only 3D hover effects** on cards + real-time mouse-tilt (no Three.js)
- **Animated particle canvas** in hero background (vanilla Canvas API)
- **Animated stat counters** in About section
- **4-category Skills grid** — tag chips, no progress bars
- **JavaScript form validation** with live inline error feedback
- **Fully responsive** across mobile / tablet / desktop
- **GitHub, LinkedIn, Instagram & Email** social icon links
- **Resume PDF** download link
- **Back-to-top** button with smooth scroll
- **SEO optimised** meta tags (Open Graph, Twitter Card, robots)
- **Accessible** — ARIA labels, focus-visible, semantic HTML5

---

## 🛠 Tech Stack

| Layer      | Technology                                                  |
| ---------- | ------------------------------------------------------------ |
| Markup     | HTML5 (semantic)                                              |
| Styling    | Vanilla CSS3 (custom properties, grid, flexbox, animations)   |
| Scripting  | Vanilla JavaScript ES6+ (no frameworks)                       |
| Fonts      | Google Fonts — Inter, Space Grotesk, JetBrains Mono            |
| Deployment | Vercel                                                         |

---

## 📁 File Structure

```
AnupsPortfolio/
├── index.html        # Single-page HTML — all 5 sections
├── style.css         # All styles, animations, responsive design
├── script.js         # Typewriter, scroll reveals, particles, form validation, tilt
├── assets/
│   └── resume.pdf    # Resume PDF served for download
└── README.md
```

---

## 🖥 Featured Projects

### [EASE-IT – AI-Powered Health Assistant](https://github.com/anupcode18/EASE-IT-AI-POWERED-HEALTH-ASSISTANT)
OCR-based food label scanner using Tesseract.js + Gemini AI for ingredient safety analysis. Deployed on Vercel with JWT auth.
**Stack:** HTML · CSS · JS · Node.js · MongoDB · Gemini API · JWT · Vercel

### [VoteWise – AI-Powered Civic Guidance System](https://github.com/anupcode18/VoteWise)
End-to-end voter guidance web app. Gemini AI explains voting steps in plain language. 61/61 tests passing, bundle < 1MB.
**Stack:** HTML · CSS · JS · Node.js · Gemini API · Docker · Google Cloud Run

---

## 🌐 Deployment

The live site is deployed on **Vercel**, connected directly to this repository — every push to `main` auto-deploys.

To deploy your own copy:
1. Fork/clone this repo
2. Import it into [Vercel](https://vercel.com/new) as a static project
3. Deploy — no build command needed

<details>
<summary>Alternative: Deploy to GitHub Pages</summary>

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**
3. Your site will be live at `https://anupcode18.github.io/AnupsPortfolio/`

</details>

---

## 🔧 Run Locally

No build step needed — just open `index.html` in a browser, or:

```
npx serve .
# or
python -m http.server 8080
```

---

## 🗒 Known Limitations

- The contact form currently validates input client-side but does not send messages to a real inbox yet. Connecting it to a service like [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/) is a planned next step.

---

Built with ❤️ by [Anup Agrawal](https://github.com/anupcode18)
