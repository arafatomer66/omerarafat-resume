# Omer Arafat — Portfolio & Resume

Personal portfolio site for **Omer Arafat** — Senior Software Engineer, IAM Expert, and Co-Founder & CTO of [ShareDeal](https://sharedealnow.com).

**Live:** https://arafatomer66.github.io/omerarafat-resume/

A premium dark-themed single-page portfolio built with **pure HTML, CSS, and JavaScript** — no frameworks, no build step.

## Sections

- **Hero** — animated intro with stats (years of experience, team size, seed raised, app installs)
- **About** — bio, awards, social links
- **Skills** — IAM, frontend, backend, databases, cloud, integration, leadership
- **Experience** — timeline from Allianz Australia → ShareDeal → earlier roles
- **Projects** — ShareDeal, HishabPati, Bdstall, Schertech MES, Netverk, Square Bear
- **Blog** — written posts on engineering, IAM, and startup lessons
- **Education** — MSc (Jahangirnagar University), BSc (AIUB)
- **Contact** — email, WhatsApp, LinkedIn, GitHub

## Project structure

```
omerarafat-resume/
├── index.html              # Main single-page portfolio
├── css/
│   └── style.css           # All styles (dark theme, responsive)
├── js/
│   └── main.js             # Scroll effects, mobile menu, counter, reveal animations
├── blog/
│   ├── building-sharedeal.html
│   └── iam-at-scale.html
└── README.md
```

## Running locally

The site is fully static — open `index.html` directly in a browser, or serve it with any static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Adding a new blog post

1. Copy one of the existing files in `blog/` (e.g. `cp blog/iam-at-scale.html blog/my-new-post.html`)
2. Edit the new file: update `<title>`, meta description, header, cover gradient/emoji, and post body
3. In `index.html`, add a matching card inside the `<div class="blog-grid">` of the `#blog` section, linking to your new file

No build, no rebuild — just refresh.

## Deployment

Hosted on **GitHub Pages** from the `master` branch root. Pushing to `master` deploys automatically.

## Tech

- HTML5 / CSS3 (custom properties, grid, flexbox, `@media` queries)
- Vanilla JavaScript (IntersectionObserver for scroll reveals, animated counters)
- Google Fonts: [Inter](https://fonts.google.com/specimen/Inter) and [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)

## License

Personal portfolio — all content © Omer Arafat. Code structure may be referenced for learning.

---

Built in Dhaka, Bangladesh.
