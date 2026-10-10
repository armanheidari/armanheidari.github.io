# Arman Heidari — Academic Portfolio & Personal Hub

[![Website](https://img.shields.io/badge/Live%20Site-armanheidari.github.io-blue?style=flat-square)](https://armanheidari.github.io)
[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro%205-ff5d01?style=flat-square&logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Deploy to GitHub Pages](https://github.com/armanheidari/armanheidari.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/armanheidari/armanheidari.github.io/actions/workflows/deploy.yml)

The personal academic website and research hub of **Arman Heidari**, M.Sc. Student in Artificial Intelligence at **Sharif University of Technology** (Tehran, Iran).

Live portfolio: **[armanheidari.github.io](https://armanheidari.github.io)**

---

## 🌟 Key Features

- **Swiss-Style Interactive Academic Hub**: Numbered sections organizing academic trajectory, research, and technical work with zero layout shifts.
- **Dedicated Subpages & Detail Routing**: Individual permalink pages for university degrees, teaching appointments, industry experience, and technical competencies.
- **Accurate Coursework & GPA Computation**: Complete B.Sc. major-specific and general coursework catalog with verified American 4.00 and Iranian 20.00 scale GPA breakdown.
- **Interactive Formula Canvas**: Lightweight math visualizer rendering foundational RL/DL formulas (Bellman equations, PPO clip objective, Softmax attention).
- **BibTeX Modal**: 1-click citation export for publications and preprints.
- **Modern Web Architecture**: Built with Astro 5 static site generation, Tailwind CSS v4, KaTeX math typesetting, and automated GitHub Actions deployment.
- **Full Dark/Light Mode**: Seamless theme switching with system preference detection and zero-flicker inline hydration.

---

## 📁 Repository Structure

```text
armanheidari.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── images/                 # Optimized avatars and university SVG logos (Sharif, ATU)
│   ├── favicon.ico             # Custom site favicon
│   ├── favicon.svg             # Vector site monogram favicon
│   └── Arman_Heidari_Academic_CV.pdf # Academic Curriculum Vitae
├── src/
│   ├── components/
│   │   ├── hub/                # Hub sections (Hero, About, Education, Teaching, Research, Experience, Projects, Skills)
│   │   ├── Header.astro        # Sticky navigation with dynamic scroll-avatar
│   │   ├── Footer.astro        # Social and academic identifiers
│   │   └── ThemeToggle.astro   # Accessible Dark / Light mode toggle
│   ├── content/
│   │   └── _drafts/            # Preserved technical writing drafts & MDX templates
│   ├── data/                   # Structured TypeScript schemas (profile, education, experience, teaching, skills, projects)
│   ├── layouts/
│   │   └── BaseLayout.astro    # Common HTML skeleton, metadata, KaTeX styling, and SEO tags
│   ├── pages/                  # Static file-based routing (/education/*, /teaching/*, /skills/*, /experience/*)
│   └── styles/
│       └── global.css          # Tailwind CSS v4 design tokens and font typography
├── astro.config.mjs            # Astro configuration
└── package.json                # Project dependencies and build scripts
```

---

## 🛠️ Development & Build

### Prerequisites
- **Node.js**: `v20+` or `v22+` recommended
- **npm**: `v10+`

### Setup & Local Server

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

The site will be available at `http://localhost:4321`.

### Production Build & Preview

```bash
# Compile optimized static output into ./dist
npm run build

# Preview the production build locally
npm run preview
```

---

## 🚀 Deployment

The project is continuously built and deployed to **GitHub Pages** using GitHub Actions:
- Any push to `main` triggers `.github/workflows/deploy.yml`.
- Dependencies are installed via `npm ci`, Astro compiles static pages to `./dist`, and the artifact is deployed to `https://armanheidari.github.io`.

---

## 📬 Contact & Links

- **Email**: [armanheidari192@gmail.com](mailto:armanheidari192@gmail.com)
- **LinkedIn**: [linkedin.com/in/arman-heidari](https://www.linkedin.com/in/arman-heidari/)
- **GitHub**: [github.com/armanheidari](https://github.com/armanheidari)
- **Google Scholar**: [Arman Heidari](https://scholar.google.com/citations?user=fgeLGrAAAAAJ&hl=en)
- **ORCID**: [0009-0005-7230-1878](https://orcid.org/0009-0005-7230-1878)
