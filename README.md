# Avukat Hasan Birdal Yilmaz - Web Sitesi

Bu proje, Avukat Hasan Birdal Yilmaz icin gelistirilmis tek sayfa (SPA) bir tanitim sitesidir.
Teknoloji olarak React + TypeScript + Vite + Tailwind CSS kullanir.

## Teknoloji Yigini

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Motion
- Lucide React

## Lokal Gelistirme

Gereksinim:
- Node.js 20+ (onerilen)
- npm 10+ (onerilen)

Kurulum ve calistirma:

```bash
npm install
npm run dev
```

Uygulama varsayilan olarak su adreste acilir:
- http://localhost:3000

## Build ve Onizleme

```bash
npm run build
npm run preview
```

Build ciktilari `dist` klasorune yazilir.

## Netlify Dagitimi

Proje Netlify icin hazirlanmistir. Kok dizinde `netlify.toml` bulunur.

Icinde tanimli ayarlar:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: tum yollar `index.html` dosyasina yonlenir

### Yontem 1: Git uzerinden Netlify

1. Projeyi bir Git reposuna push edin.
2. Netlify panelinde "Add new site" > "Import an existing project" secin.
3. Repo baglantisini yapin.
4. Netlify ayarlari otomatik olarak `netlify.toml` dosyasindan okunur.
5. Deploy edin.

### Yontem 2: Netlify CLI ile

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

Ilk calistirmada Netlify girisi ve site secimi ister.

## Proje Yapisi

- `src/main.tsx`: uygulama giris noktasi
- `src/App.tsx`: ana sayfa icerigi
- `src/index.css`: global stiller
- `birdal.jpeg`: ana sayfada kullanilan gorsel
- `vite.config.ts`: Vite ayarlari
- `netlify.toml`: Netlify build/redirect ayarlari

## Komutlar

- `npm run dev`: gelistirme sunucusu
- `npm run build`: production build
- `npm run preview`: build ciktilarini lokal onizleme
- `npm run lint`: TypeScript tip kontrolu
- `npm run clean`: dist klasorunu temizler
