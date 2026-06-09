# Jesal Shah — Portfolio Site

A cohesive portfolio with deep case studies, screenshots of real built tools, and a guided assistant.

## Structure
```
index.html                         Home / portfolio
assets/
  style.css                        Shared design system (all pages use it)
  assistant.js                     "Ask about my work" assistant
  *.jpg / *.png / *.webp           Images & tool screenshots
work/
  cac.html                         Case study: CAC
  package-solution-picker.html     Case study: Package Solution Picker
  multiplan.html                   Case study: MVP MultiPlan
```

> The actual interactive tools are intentionally NOT published. The case studies
> show screenshots only, so nothing proprietary is exposed on the public site.

## Deploy (GitHub Pages)
1. Create a public repo named `yourusername.github.io`.
2. Upload everything above, keeping the folder structure exactly.
3. Settings → Pages → set source to your main branch → save.
4. Live at `https://yourusername.github.io` in a minute or two.

(The GitHub Pages settings screen changes occasionally; if a label doesn't match, check GitHub's current Pages docs.)

## The "Ask about my work" assistant
`assets/assistant.js` runs entirely in the browser with curated answers about your
work. No API key, no backend, no cost — it works as soon as the site is live.
Edit the `KB` array in that file to change or add answers.

## Upgrading to a REAL Claude-powered chat (optional, later)
A genuine LLM chat cannot live in a static site, because the API key would be
publicly visible and abusable. To do it properly you need a tiny backend that holds
the key and forwards requests (e.g. Cloudflare Workers or Vercel Functions — both
have free tiers, though limits and pricing change, so verify current terms). The
current assistant is the version that works on your live site today.
