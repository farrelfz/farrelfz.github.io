# farrelfz.github.io

Portfolio pribadi **Muhamad Farrel Dava Fauzan** — Physics Education Researcher, EdTech Developer, AI for Education.

Situs: https://farrelfz.github.io/

Repo ini adalah **satu-satunya sumber** untuk portfolio: kode sumber sekaligus situs yang terbit.
Sebelumnya source code berada di repo terpisah (`science-explorer-portfolio`) dan hasil build
di-push ke repo ini. Sekarang keduanya digabung agar tidak ada duplikasi repositori.

## Stack

- Vite 6 + React 18 + TypeScript
- Tailwind CSS v4 (CSS-first) + shadcn/ui (base: Radix)
- framer-motion, react-router v7
- Font: Inter, Playfair Display, JetBrains Mono, Space Grotesk

## Struktur

```
.
├── index.html                  # entry Vite
├── src/
│   ├── components/             # layout, sections, ui
│   ├── pages/                  # route halaman
│   ├── data/                   # konten (proyek, publikasi, tulisan)
│   └── assets/
├── public/                     # aset statis + redirect URL lama
├── .github/workflows/deploy.yml# build & deploy ke GitHub Pages
├── PRODUCT.md                  # ringkasan produk & stack
├── DESIGN.md                   # token desain
└── AGENTS.md                   # konvensi kerja untuk agen/AI
```

## Pengembangan

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # output ke dist/
npm run preview  # cek hasil build
npm run lint
```

## Deployment

Push ke `main` → workflow `.github/workflows/deploy.yml` menjalankan `npm ci`, `npm run build`,
menyalin `dist/index.html` menjadi `dist/404.html` (fallback SPA untuk deep link), lalu
menerbitkan `dist/` lewat GitHub Actions Pages (`build_type: workflow`).

Tidak ada branch hasil build dan tidak ada deploy key: artefak hanya hidup sebagai deployment Pages.

## URL lama (redirect)

| URL lama | Tujuan |
|---|---|
| `/HydroArena/` | `/ArenaFisikaseru/HydroArena/` |
| `/VectorArena/` | `/ArenaFisikaseru/VectorArena/` |

Redirect disimpan di `public/HydroArena/` dan `public/VectorArena/` supaya tautan yang sudah
dibagikan ke siswa tetap berfungsi meski repo arena yang lama sudah tidak ada.