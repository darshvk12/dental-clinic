# 🦷 PureSmile Dental — Production-Ready Next.js 15 Website

A world-class dental clinic website built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Hook Form + Zod**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → Open http://localhost:3000

# 3. Build for production
npm run build

# 4. Start production server
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, JSON-LD schemas
│   ├── page.tsx            # Homepage — assembles all sections
│   ├── globals.css         # Design tokens, base styles, components
│   └── sitemap.ts          # Auto-generated sitemap
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Fixed nav with scroll detection + mobile menu
│   │   └── Footer.tsx      # Full footer with links, social, hours
│   ├── sections/
│   │   ├── HeroSection.tsx         # Hero with floating cards, counters
│   │   ├── ContentSections.tsx     # TrustBar, About, Services, Before/After
│   │   ├── FeatureSections.tsx     # WhyChoose, Journey, Technology
│   │   ├── SocialProofSections.tsx # Testimonials, Insurance, FAQ, Blog
│   │   ├── AppointmentSection.tsx  # Full form with validation
│   │   └── ContactSection.tsx      # Contact info + map placeholder
│   └── ui/
│       └── StickyUI.tsx    # Sticky booking CTA + scroll-to-top
│
├── hooks/
│   └── index.ts            # useInView, useCountUp, useScrollProgress
│
├── lib/
│   ├── data.ts             # ALL site content — single source of truth
│   ├── schemas.ts          # Zod form validation schema
│   └── utils.ts            # cn(), formatPhone(), getMinDate()
│
└── types/
    └── index.ts            # TypeScript interfaces for all data
```

---

## ✏️ Customising Your Clinic

### Step 1 — Update Clinic Details
Edit **`src/lib/data.ts`** and update `CLINIC_CONFIG`:

```typescript
export const CLINIC_CONFIG: ClinicConfig = {
  name: "Your Clinic Name",
  doctor: {
    name: "Dr. Your Name",
    title: "Your Qualifications",
    // ...
  },
  contact: {
    phone: "+91 YOUR PHONE",
    email: "your@email.com",
    address: { /* your address */ },
    // ...
  },
};
```

### Step 2 — Add Real Images
Replace emoji placeholders in `HeroSection.tsx` and `AboutSection.tsx` with:

```tsx
import Image from "next/image";

// Replace the emoji div with:
<Image
  src="/images/doctor.jpg"
  alt="Dr. Your Name"
  fill
  className="object-cover object-top"
  priority
/>
```

Place images in `public/images/`.

### Step 3 — Connect Form to Backend
In `AppointmentSection.tsx`, replace the simulated API call:

```typescript
// Replace:
await new Promise(r => setTimeout(r, 1500));

// With your API call:
const res = await fetch("/api/appointment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
if (!res.ok) throw new Error("Failed");
```

Then create `src/app/api/appointment/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  // Send email via Resend / Nodemailer / SendGrid
  // Or post to Google Sheets / CRM
  return NextResponse.json({ success: true });
}
```

### Step 4 — Google Maps Embed
In `ContactSection.tsx`, replace the placeholder with a real embed:

```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
  width="100%"
  height="100%"
  style={{ border: 0, minHeight: "420px" }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="PureSmile Dental Location"
/>
```

### Step 5 — SEO Configuration
Update in `CLINIC_CONFIG.seo` and `src/app/layout.tsx`:
- Replace `YOUR_GOOGLE_VERIFICATION_CODE` with your Search Console verification
- Update `canonicalUrl` to your actual domain
- Add a real `og-image.jpg` (1200×630px) to `/public/`

---

## 🎨 Design System

### Colors
```
dental-navy   → Primary brand blue (#0F2D5E → #1E3A8A)
dental-mint   → Accent / CTA green (#2BC5A0)
dental-gold   → Star ratings (#C9913A)
dental-slate  → Neutrals (#F8FAFC → #0F172A)
dental-cream  → Page background (#FAFAF7)
```

### Typography
```
--font-display  → Cormorant Garamond (headings, editorial)
--font-body     → DM Sans (body, UI)
```

### Key Classes
```
.container-dental   → Max-width container with responsive padding
.section-py         → Standard section vertical padding
.text-display       → Display font class
.card-base          → Standard card with hover effect
.btn + .btn-primary / .btn-mint / .btn-ghost / .btn-emergency
.section-tag        → Small uppercase label above headings
.divider-dental     → Gradient accent divider
.glass              → Glass morphism (used in dark sections)
```

---

## ⚡ Performance Optimisations

- **Image priority** on hero (`priority` prop)
- **Font `display: swap`** on Google Fonts
- **Intersection Observer** lazy animations (no layout shift)
- **`"use client"`** only on interactive components
- **Static rendering** by default for all sections
- **Sitemap auto-generation** via `src/app/sitemap.ts`
- **Viewport meta** with theme-color for mobile browsers

---

## 🔍 SEO Features

- **Structured Data (JSON-LD)**:
  - `Dentist` (LocalBusiness schema)
  - `Physician` (Doctor schema)
  - Opening hours, geo coordinates, aggregate rating
- **Open Graph** for social sharing
- **Twitter Card** metadata
- **Canonical URL**
- **Auto-generated sitemap** at `/sitemap.xml`
- **Robots.txt** at `/robots.txt`
- **Local SEO keywords** in metadata

---

## 🚢 Deployment

### Vercel (Recommended — 1 command)
```bash
npx vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the `.next` folder
```

### Docker
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

Add `output: "standalone"` to `next.config.ts` for Docker.

---

## 📧 Email Integration Options

| Service  | Free Tier  | Setup                   |
|----------|------------|-------------------------|
| Resend   | 100/day    | `npm install resend`    |
| Nodemailer + Gmail | Unlimited | SMTP config  |
| SendGrid | 100/day    | `npm install @sendgrid/mail` |
| EmailJS  | 200/month  | Client-side, no backend |

---

## 📞 Support

For questions about customising this template, refer to:
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)
- [React Hook Form Docs](https://react-hook-form.com)
