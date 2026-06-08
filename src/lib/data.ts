import type {
  ClinicConfig, Service, Testimonial, BeforeAfterCase, Technology,
  BlogPost, FAQItem, TrustBadge,
  StatCard, WhyChooseItem, JourneyStep,
} from "@/types";

// ─── CLINIC CONFIG ──────────────────────────────────────────────
export const CLINIC_CONFIG: ClinicConfig = {
  name: "Dr. Pooja Bala's Clinic",
  tagline: "Creating Healthy & Beautiful Smiles for Life",
  doctor: {
    name: "Dr. Pooja Bala",
    title: "Endodontist & Restorative Dentist",

    qualifications: [
      "BDS — Maharshi Dayanand University, Rohtak (2008)",
      "MDS Prosthodontics — Nair Hospital Dental College (2012)",
      "Fellowship — International Implant Foundation, Germany",
      "Invisalign Certified Provider — Platinum Level",
      "Diplomate — Indian Board of Aesthetic Dentistry",
    ],
    experience: 18,
    bio: "Dr. Pooja Bala is an Endodontist and Restorative Dentist in Avas Vikas Colony, Agra and has an experience of 18 years in these fields. Dr. Pooja Bala practices at Shree Narayan Das Medicare in Avas Vikas Colony, Agra. She completed BDS from Maharshi Dayanand University, Rohtak in 2008. She is a member of Indian Endodontic Society.",

    philosophy:

      "Dentistry is not just about fixing teeth — it is about restoring confidence, health, and the pure joy of a genuine smile.",
    fellowships: [
      "International Congress of Oral Implantologists (ICOI)",
      "Indian Dental Association (IDA) — Life Member",
      "Academy of Osseointegration",
    ],
  },
  contact: {
    phone: "+91 98200 12345",
    emergencyPhone: "+91 98200 99999",
    email: "poojabala@gmail.com",
    address: {
      line1: "Shree Narayan Medicare Centre, 1083/4r Sector 4/R",
      line2: "Opposite Holy Public School, Avas Vikas Colony",
      city: "Agra",
      state: "Uttar Pradesh",
      pin: "282002",
      country: "India",
    },
    hours: [
      { day: "Monday – Saturday", open: "10:15 AM - 2:00 PM, 5:00 PM - 8:00 PM", close: "" },
      { day: "Sunday",            open: "Closed",    close: "" },
      { day: "Emergency",         open: "24/7",      close: "", isEmergency: true },
    ],
  },
  social: {
    instagram: "https://instagram.com/puresmile",
    facebook:  "https://facebook.com/puresmile",
    youtube:   "https://youtube.com/@puresmile",
    whatsapp:  "https://wa.me/919820012345",
  },
  seo: {
    title: "Dr. Pooja Bala — Endodontist & Restorative Dentist in Agra | Root Canal & Restorations",
    description:
      "Dr. Pooja Bala provides expert endodontic (root canal) and restorative dental care in Avas Vikas Colony, Agra. 18 years of experience and patient-first treatment for comfortable results.",


    keywords: [
      "dental clinic Mumbai", "cosmetic dentist Bandra", "dental implants Mumbai",
      "teeth whitening Mumbai", "Invisalign Mumbai", "smile makeover",
      "root canal specialist", "pediatric dentist Mumbai", "best dentist Bandra",
    ],
    ogImage: "/og-image.jpg",
    canonicalUrl: "https://puresmile.in",
    locale: "en_IN",
  },
};

// ─── STATS ─────────────────────────────────────────────────────
export const STATS: StatCard[] = [
  { id: "patients",   value: "500+",  numericValue: 500,  suffix: "+", label: "Happy Patients",     icon: "", waypoints: [0, 250, 500] },
  { id: "experience", value: "18+",   numericValue: 18,   suffix: "+", label: "Years Experience",   icon: "", waypoints: [0, 9, 18] },
  { id: "treatments", value: "100+",  numericValue: 100,  suffix: "+", label: "Treatments",        icon: "", waypoints: [0, 50, 100] },
  { id: "reviews",    value: "1,000+", numericValue: 1000, suffix: "+", label: "5★ Google Reviews",  icon: "", waypoints: [0, 500, 1000] },
];

// ─── TRUST BADGES ───────────────────────────────────────────────
export const TRUST_BADGES: TrustBadge[] = [
  { id: "ida",    icon: "", label: "Indian Endodontist Member " },
  { id: "award",  icon: "", label: "Best Dental Clinic 2024" },
  { id: "aacd",   icon: "", label: "AACD Accredited" },
  { id: "nabh",   icon: "", label: "NABH Accredited Clinic" },
  { id: "icoi",   icon: "", label: "ICOI Fellow" },
];

// ─── SERVICES ──────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: "implants",
    icon: "",
    name: "Dental Implants",
    shortDesc: "Permanent, natural-looking tooth replacements.",
    description:
      "Nobel Biocare and Straumann implants placed with CT-guided precision. We offer single implants, implant-supported bridges, and All-on-4/All-on-6 full-arch rehabilitation.",
    benefits: ["Looks & feels like natural teeth", "Lifetime durability with care", "Preserves jawbone structure"],
    duration: "1–2 visits over 3–6 months",
    priceRange: "₹25,000–₹80,000 per implant",
    isFeatured: true,
    href: "/services/dental-implants",
  },
  {
    id: "whitening",
    icon: "",
    name: "Teeth Whitening",
    shortDesc: "Up to 10 shades brighter in 90 minutes.",
    description:
      "Philips ZOOM in-office whitening combined with custom take-home trays for long-lasting, dramatic results with virtually zero sensitivity.",
    benefits: ["In-office & take-home options", "Sensitivity-free formula", "Lasts 2–3 years"],
    duration: "90-minute in-office session",
    priceRange: "₹8,000–₹18,000",
    href: "/services/teeth-whitening",
  },
  {
    id: "makeover",
    icon: "",
    name: "Smile Makeover",
    shortDesc: "A complete transformation of your smile.",
    description:
      "Combining porcelain veneers, whitening, aligners, and gum contouring — we design your ideal smile with DSD (Digital Smile Design) software before a single tooth is touched.",
    benefits: ["Digital smile preview before treatment", "Fully customised aesthetic plan", "Life-changing confidence"],
    duration: "3–6 visits over 4–8 weeks",
    priceRange: "₹80,000–₹5,00,000+",
    isFeatured: true,
    href: "/services/smile-makeover",
  },
  {
    id: "root-canal",
    icon: "",
    name: "Root Canal Treatment",
    shortDesc: "Pain-free treatment to save your natural tooth.",
    description:
      "Single-sitting rotary root canal therapy using ProTaper NEXT rotary files and warm vertical compaction. Apex locators and digital X-rays ensure precision.",
    benefits: ["Completely painless under anaesthesia", "Single-visit for most cases", "Preserves your natural tooth"],
    duration: "60–90 minutes",
    priceRange: "₹5,000–₹15,000",
    href: "/services/root-canal",
  },
  {
    id: "crowns",
    icon: "",
    name: "Crowns & Bridges",
    shortDesc: "Same-day CEREC ceramic crowns crafted chairside.",
    description:
      "Full-zirconia, e.max, and CEREC same-day crowns. 3Shape Trios digital impression — no goopy trays. Shade-matched with a spectrophotometer.",
    benefits: ["Same-day CEREC crown option", "No metal, 100% ceramic", "Indistinguishable from real teeth"],
    duration: "1–2 hours (same-day) or 1 week (lab)",
    priceRange: "₹10,000–₹35,000",
    href: "/services/crowns-bridges",
  },
  {
    id: "aligners",
    icon: "",
    name: "Braces & Aligners",
    shortDesc: "Straight teeth with Invisalign or ceramic braces.",
    description:
      "Invisalign Platinum Provider. We also offer ceramic braces and self-ligating brackets. ClinCheck 3D simulation shows your final result before you commit.",
    benefits: ["Virtually invisible Invisalign", "ClinCheck 3D smile preview", "Adult & teen options"],
    duration: "6–18 months",
    priceRange: "₹60,000–₹2,50,000",
    isFeatured: true,
    href: "/services/braces-aligners",
  },
  {
    id: "veneers",
    icon: "",
    name: "Porcelain Veneers",
    shortDesc: "Instant perfection with ultra-thin ceramic shells.",
    description:
      "IPS e.max lithium disilicate veneers — 0.3 mm thin, impossibly natural. Designed via DSD, crafted by our master ceramist, bonded with precision.",
    benefits: ["Minimal enamel reduction", "Lifelike translucency", "10–15 year longevity"],
    duration: "2–3 visits over 2 weeks",
    priceRange: "₹15,000–₹35,000 per tooth",
    href: "/services/veneers",
  },
  {
    id: "pediatric",
    icon: "",
    name: "Pediatric Dentistry",
    shortDesc: "Gentle, child-friendly dental care.",
    description:
      "Our MDS-Pedodontist specialists create positive dental experiences from the very first visit. Kid-friendly decor, nitrous oxide sedation, and no-syringe behaviour management.",
    benefits: ["Specialist pedodontist team", "Anxiety-free environment", "Prevention & fluoride care"],
    duration: "30–60 minutes",
    priceRange: "₹500–₹10,000",
    href: "/services/pediatric-dentistry",
  },
  {
    id: "cleaning",
    icon: "",
    name: "Dental Cleaning",
    shortDesc: "Professional prophylaxis every 6 months.",
    description:
      "EMS Airflow ultrasonics + polishing + fluoride varnish. Our hygienist also provides customised oral hygiene instruction and gum disease screening.",
    benefits: ["Ultrasonic & Airflow scaling", "Fluoride varnish included", "Gum disease risk assessment"],
    duration: "45–60 minutes",
    priceRange: "₹1,500–₹4,000",
    href: "/services/dental-cleaning",
  },
];

// ─── BEFORE / AFTER ─────────────────────────────────────────────
export const BEFORE_AFTER: BeforeAfterCase[] = [
  { id: "makeover-1", title: "Anterior Composite Buildup", treatment: "8 Porcelain Veneers + Zoom Whitening", duration: "3 visits · 3 weeks", beforeEmoji: "😬", afterEmoji: "😁", beforeImage: "/images/before-after/before.jpg", afterImage: "/images/before-after/after.jpg" },
  { id: "implant-1",  title: "Full-Arch Implants",  treatment: "All-on-6 Upper + Lower Arch", duration: "8 weeks · 4 visits", beforeEmoji: "😔", afterEmoji: "🥰" , beforeImage: "/images/before-after/implantsbefore.png", afterImage: "/images/before-after/implantsafter.png" },
  { id: "aligner-1",  title: "Invisalign Correction", treatment: "28 Aligners · Platinum Provider", duration: "11 months", beforeEmoji: "😐", afterEmoji: "😊" , beforeImage: "/images/before-after/invisalignbefore.jpg", afterImage: "/images/before-after/invisalignafter.jpg" },
  { id: "whitening-1",title: "Zoom Whitening",       treatment: "In-office + Custom Take-home Trays", duration: "1 session · 90 min", beforeEmoji: "🙁", afterEmoji: "😄" , beforeImage: "/images/before-after/teethwhitebefore.jpg", afterImage: "/images/before-after/teethwhiteafter.jpg" },
  { id: "veneer-1",   title: "E.max Veneers",         treatment: "6 Upper Anterior Veneers", duration: "2 visits · 2 weeks", beforeEmoji: "😑", afterEmoji: "🤩" , beforeImage: "/images/before-after/emaxveneersbefore.png", afterImage: "/images/before-after/emaxveneersafter.png" },
  { id: "crown-1",    title: "CEREC Crown Restoration",treatment: "4 Posterior Zirconia Crowns", duration: "1 visit · 2 hours", beforeEmoji: "😫", afterEmoji: "😌" , beforeImage: "/images/before-after/crownrestorationbefore.png", afterImage: "/images/before-after/crownrestorationafter.png" },
];

// ─── WHY CHOOSE ─────────────────────────────────────────────────
export const WHY_CHOOSE: WhyChooseItem[] = [
  { id: "tech",      number: "01", icon: "🔬", title: "Advanced Technology",    description: "3D CBCT imaging, CEREC same-day crowns, Airflow EMS ultrasonic hygiene, and DSD smile design software. We invest in the finest equipment available." },
  { id: "painless",  number: "02", icon: "💊", title: "Pain-Free Guarantee",    description: "STA Wand computer-controlled anaesthesia, nitrous oxide sedation, and a gentle team. We promise comfort — or we make it right." },
  { id: "team",      number: "03", icon: "👩‍⚕️", title: "Multi-Specialty Team", description: "Implantologist, prosthodontist, orthodontist, pedodontist, and endodontist — all under one roof. No referrals, no delays." },
  { id: "pricing",   number: "04", icon: "💰", title: "Transparent Pricing",   description: "Detailed itemised estimates before we begin. No hidden fees, no upselling. Third-party financing available at 0% EMI." },
  { id: "schedule",  number: "05", icon: "📅", title: "Flexible Scheduling",   description: "Book online 24/7. Early mornings from 10:15 AM, evenings until 8 PM, and emergency slots always reserved." },
  { id: "sterilisation", number: "06", icon: "🏥", title: "Hospital-Grade Sterilisation", description: "Class B autoclave, single-use disposables, and real-time sterilisation monitoring. NABH-compliant infection control protocols." },
];

// ─── JOURNEY STEPS ───────────────────────────────────────────────
export const JOURNEY_STEPS: JourneyStep[] = [
  { id: "book",     step: 1, icon: "", title: "Book Consultation",       description: "Schedule online or call. We confirm within 30 minutes during clinic hours." },
  { id: "exam",     step: 2, icon: "", title: "Comprehensive Exam",      description: "Full digital X-rays, 3D scan, gum assessment, and digital smile analysis." },
  { id: "plan",     step: 3, icon: "", title: "Personalised Plan",        description: "DSD smile preview, itemised cost estimate, and phased treatment roadmap." },
  { id: "treat",    step: 4, icon: "", title: "Expert Treatment",         description: "Precision care using state-of-the-art technology in a comfortable environment." },
  { id: "followup", step: 5, icon: "", title: "Ongoing Care & Follow-up", description: "Recall reminders, free post-treatment checks, and long-term smile maintenance." },
];

// TECHNOLOGIES removed

// ─── TESTIMONIALS ────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Priya Raghunathan", initials: "PR", rating: 5, review: "I was terrified of the dentist for over a decade. Dr. Pooja Bala and her team made me feel completely at ease. My smile makeover with 6 e.max veneers transformed not just my teeth but my entire confidence. I cry happy tears every time I see my smile in the mirror.", treatment: "Smile Makeover — 6 E.max Veneers", date: "April 2025", verified: true, source: "google", avatarBg: "from-violet-200 to-purple-300" },
  { id: "t2", name: "Arjun Khanna", initials: "AK", rating: 5, review: "Emergency root canal after hours on a Saturday. They had me seen within 45 minutes of my call. Absolutely zero pain during the procedure. I was back at work the next morning. The STA wand anaesthesia delivery was something else — I barely felt a thing.", treatment: "Emergency Root Canal + Crown", date: "March 2025", verified: true, source: "google", avatarBg: "from-blue-200 to-blue-300" },
  { id: "t3", name: "Sneha Mahajan", initials: "SM", rating: 5, review: "My Invisalign journey was smoother than I imagined. The ClinCheck 3D simulation showed me exactly what my smile would look like month by month — I was hooked immediately. 11 months later, my teeth are perfectly straight. Worth every rupee.", treatment: "Invisalign — 28 Aligners, 11 months", date: "February 2025", verified: true, source: "google", avatarBg: "from-teal-200 to-cyan-300" },
  { id: "t4", name: "Rahul Deshmukh", initials: "RD", rating: 5, review: "Three implants done with CT-guided precision. No guesswork, no surprises. The CEREC crown fitting was done the same day. I was eating normally within 48 hours. The team is incredibly professional and made the entire multi-month process feel seamless.", treatment: "3 Nobel Biocare Implants + CEREC Crowns", date: "January 2025", verified: true, source: "google", avatarBg: "from-amber-200 to-orange-300" },
  { id: "t5", name: "Nidhi Patel", initials: "NP", rating: 5, review: "Both my kids (ages 5 and 8) absolutely love coming here. The pediatric team is phenomenal — patient, funny, and so gentle. My 5-year-old has no fear of the dentist at all, which is a miracle. The kids' waiting area with the TV and games is a stroke of genius.", treatment: "Pediatric Dentistry — Preventive Care", date: "December 2024", verified: true, source: "google", avatarBg: "from-pink-200 to-rose-300" },
  { id: "t6", name: "Vijay Gokhale", initials: "VG", rating: 5, review: "Zoom whitening results blew me away — 10 shades in 90 minutes. The custom trays for maintenance are excellent quality. The clinic itself feels more like a luxury lounge than a dental office. Pristine, calm, and incredibly professional. Highly recommend.", treatment: "Philips ZOOM Whitening + Custom Trays", date: "November 2024", verified: true, source: "google", avatarBg: "from-green-200 to-emerald-300" },
];

// ─── BLOG POSTS ─────────────────────────────────────────────────
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "how-to-brush-floss-correctly",
    title: "The Dentist-Approved Way to Brush & Floss for a Lifetime of Healthy Gums",
    excerpt: "Most people brush their teeth but miss the critical technique nuances that prevent gum disease. Our hygienist walks you through the Bass Technique and other dentist-approved habits.",
    category: "Oral Hygiene",
    author: "Dr. Pooja Bala",
    date: "May 2026",
    readTime: 7,
    emoji: "🦷",
    bgClass: "from-blue-50 to-blue-100",
    href: "/blog/how-to-brush-floss-correctly",
    content: `
      <p>Most people brush their teeth but miss the critical technique nuances that prevent gum disease. Our hygienist walks you through the <strong>Bass Technique</strong> and other dentist-approved oral hygiene practices that can help protect your teeth and gums for a lifetime.</p>
      <p>Healthy gums are the foundation of a healthy smile. Yet, gum disease remains one of the most common oral health problems worldwide, often developing silently before symptoms become noticeable. Fortunately, a few simple daily habits can dramatically reduce your risk.</p>
      <h2>Why Proper Brushing Matters</h2>
      <p>Brushing isn't just about keeping your teeth looking clean. Its primary purpose is to remove plaque—a sticky film of bacteria that constantly forms on the teeth and along the gumline. If plaque is not removed effectively, it can lead to cavities, gum inflammation, bad breath, and eventually periodontal disease.</p>
      <p>Many people brush regularly but use techniques that fail to clean the most important areas, especially where the teeth meet the gums.</p>
      <h2>The Bass Technique: A Better Way to Brush</h2>
      <p>The Bass Technique is one of the most effective methods recommended by dental professionals for plaque removal.</p>
      <h3>Step 1: Position the Brush Correctly</h3>
      <p>Hold your toothbrush at approximately a <strong>45-degree angle</strong> toward the gumline. The bristles should gently touch both the teeth and the edge of the gums.</p>
      <h3>Step 2: Use Small Gentle Motions</h3>
      <p>Rather than scrubbing aggressively, use short, gentle back-and-forth vibrations. This allows the bristles to reach slightly below the gumline where bacteria often accumulate.</p>
      <h3>Step 3: Clean Every Surface</h3>
      <p>Move systematically around your mouth, ensuring you clean:</p>
      <ul>
        <li>Outer tooth surfaces</li>
        <li>Inner tooth surfaces</li>
        <li>Chewing surfaces</li>
        <li>The inside surfaces of the front teeth</li>
      </ul>
      <h3>Step 4: Brush for Two Minutes</h3>
      <p>Spend at least <strong>two minutes brushing twice a day</strong>—once in the morning and once before bed.</p>
      <h2>Flossing: The Step You Shouldn't Skip</h2>
      <p>Even the best toothbrush cannot effectively clean between teeth. Flossing removes plaque and food particles from areas where cavities and gum disease commonly begin.</p>
      <p>To floss correctly:</p>
      <ul>
        <li>Use about 18 inches of floss.</li>
        <li>Gently guide it between teeth without snapping.</li>
        <li>Curve the floss into a "C" shape around each tooth.</li>
        <li>Slide it up and down beneath the gumline.</li>
        <li>Use a clean section of floss for each tooth.</li>
      </ul>
      <p>Daily flossing can significantly improve gum health and reduce inflammation.</p>
      <h2>Common Mistakes That Harm Your Gums</h2>
      <p>Many patients are surprised to learn that over-brushing can be just as harmful as under-brushing.</p>
      <p>Avoid these common mistakes:</p>
      <ul>
        <li>Brushing too hard</li>
        <li>Using a hard-bristled toothbrush</li>
        <li>Skipping flossing</li>
        <li>Brushing for less than two minutes</li>
        <li>Ignoring the tongue and gumline</li>
        <li>Waiting too long to replace your toothbrush</li>
      </ul>
      <p>A soft-bristled toothbrush replaced every 3–4 months is usually the best choice.</p>
      <h2>Extra Tips for Lifelong Oral Health</h2>
      <p>Alongside brushing and flossing, consider these simple habits:</p>
      <ul>
        <li>Drink plenty of water throughout the day</li>
        <li>Limit sugary snacks and beverages</li>
        <li>Maintain a balanced diet rich in fruits and vegetables</li>
        <li>Schedule regular dental check-ups and professional cleanings</li>
        <li>Avoid tobacco products</li>
      </ul>
      <p>These small steps can make a significant difference in preserving your smile.</p>
      <h2>When to See Your Dentist</h2>
      <p>Don't ignore warning signs such as:</p>
      <ul>
        <li>Bleeding gums</li>
        <li>Persistent bad breath</li>
        <li>Swollen or red gums</li>
        <li>Tooth sensitivity</li>
        <li>Receding gums</li>
        <li>Loose teeth</li>
      </ul>
      <p>Early treatment is often simpler, more comfortable, and more effective than waiting until problems become severe.</p>
      <h2>Final Thoughts</h2>
      <p>A healthy smile starts with healthy habits. By using the Bass Technique, flossing daily, and keeping up with regular dental visits, you can protect your teeth and gums for years to come.</p>
      <p><strong>Remember: It's not just about brushing every day—it's about brushing correctly.</strong> A few extra minutes of proper oral care today can help prevent major dental problems tomorrow. <span>🦷✨</span></p>
    `,
  },
  {
    id: "b2",
    slug: "veneers-vs-whitening",
    title: "Veneers vs. Whitening: A Complete Guide to Choosing the Right Cosmetic Treatment",
    excerpt: "Both veneers and whitening can transform your smile — but they solve very different problems. Understanding which is right for your goals can save you time, money, and help you achieve the results you truly want.",
    category: "Cosmetic Dentistry",
    author: "Dr. Pooja Bala",
    date: "April 2026",
    readTime: 7,
    emoji: "✨",
    bgClass: "from-purple-50 to-purple-100",
    href: "/blog/veneers-vs-whitening",
    content: `
      <p>Both veneers and whitening can transform your smile — but they solve very different problems. Understanding which is right for your goals can save you time, money, and help you achieve the results you truly want.</p>
      <p>A bright, confident smile is something many people desire, and modern cosmetic dentistry offers several ways to achieve it. Two of the most popular treatments are professional teeth whitening and dental veneers. While both can improve the appearance of your smile, they are designed for different purposes and deliver different results.</p>
      <h2>What Whitening Does</h2>
      <p>Professional teeth whitening works by removing stains and discoloration from the natural tooth surface. It is an excellent option for patients whose teeth are healthy but have become yellow or stained over time due to coffee, tea, smoking, or aging. Whitening is a quick, non-invasive treatment that can noticeably brighten your smile while preserving your natural tooth structure.</p>
      <h2>What Veneers Do</h2>
      <p>Dental veneers are thin custom-made shells that are bonded to the front surface of the teeth. Veneers not only improve tooth color but can also correct issues such as chipped teeth, minor gaps, uneven shapes, and worn enamel. They are often chosen by patients looking for a complete smile makeover rather than simply a brighter smile.</p>
      <h2>Which Treatment is Right for You?</h2>
      <p>The right treatment depends on your individual goals. If your main concern is discoloration, professional whitening may provide the results you're looking for. If you wish to improve both the color and appearance of your teeth, veneers may be a more suitable solution.</p>
      <p>Every smile is unique, which is why a professional consultation is the best way to determine the most appropriate treatment option. A personalized treatment plan can help you achieve natural-looking, long-lasting results that complement your facial features and enhance your confidence.</p>
      <h2>Investing in Your Smile</h2>
      <p>Whether you choose whitening or veneers, investing in your smile is an investment in your self-confidence. With the right cosmetic treatment, achieving a healthier, brighter, and more attractive smile is easier than ever. <span>🦷✨</span></p>
    `,
  },
  {
    id: "b3",
    slug: "childs-first-dental-visit",
    title: "Your Child's First Dental Visit: What to Expect and When to Start",
    excerpt: "The IDA recommends a child's first dental visit by age 1. Early visits set the foundation for a lifetime of healthy, anxiety-free dental care. Here is how to prepare and what you can expect during your child's first appointment.",
    category: "Kids Dental Health",
    author: "Dr. Pooja Bala",
    date: "March 2026",
    readTime: 5,
    emoji: "🧒",
    bgClass: "from-orange-50 to-amber-100",
    href: "/blog/childs-first-dental-visit",
    content: `
      <p>The IDA recommends a child's first dental visit by age 1. Early visits set the foundation for a lifetime of healthy, anxiety-free dental care. Here is how to prepare and what you can expect during your child's first appointment.</p>
      <p>Many parents assume that dental visits can wait until all of their child's teeth have appeared. However, early dental care plays an important role in preventing cavities, monitoring oral development, and helping children become comfortable with visiting the dentist.</p>
      <h2>Why Early Dental Visits Matter</h2>
      <p>Baby teeth may be temporary, but they serve important functions. They help children chew properly, speak clearly, and guide permanent teeth into their correct positions.</p>
      <p>Regular dental check-ups from an early age allow dentists to identify potential issues before they become serious and provide guidance on proper oral hygiene habits.</p>
      <h2>When Should Your Child First Visit the Dentist?</h2>
      <p>The ideal time for a child's first dental visit is:</p>
      <ul>
        <li>By their first birthday, or</li>
        <li>Within six months of the first tooth appearing</li>
      </ul>
      <p>Starting early helps create a positive relationship with dental care and reduces the likelihood of dental anxiety in the future.</p>
      <h2>What Happens During the First Visit?</h2>
      <p>The first appointment is usually short, gentle, and focused on helping your child feel comfortable.</p>
      <p>During the visit, the dentist may:</p>
      <ul>
        <li>Examine your child's teeth, gums, and jaw development</li>
        <li>Check for early signs of tooth decay</li>
        <li>Discuss feeding and dietary habits</li>
        <li>Provide guidance on brushing techniques</li>
        <li>Answer any questions parents may have</li>
      </ul>
      <p>In most cases, no major treatment is required during the first visit unless a specific concern is identified.</p>
      <h2>Preparing Your Child for the Appointment</h2>
      <p>Parents can help make the experience enjoyable by:</p>
      <ul>
        <li>Speaking positively about the dentist</li>
        <li>Reading children's books about dental visits</li>
        <li>Scheduling appointments when the child is well-rested</li>
        <li>Bringing a favorite toy or comfort item</li>
      </ul>
      <p>Avoid using words that may create fear or anxiety. A calm and positive approach often helps children feel more relaxed.</p>
      <h2>Building Healthy Habits Early</h2>
      <p>Good oral health starts at home. Parents should:</p>
      <ul>
        <li>Clean baby's gums even before teeth appear</li>
        <li>Begin brushing as soon as the first tooth erupts</li>
        <li>Limit sugary snacks and drinks</li>
        <li>Encourage regular brushing routines</li>
        <li>Schedule routine dental check-ups</li>
      </ul>
      <p>These habits can significantly reduce the risk of cavities and other dental problems.</p>
      <h2>Common Concerns Parents Ask About</h2>
      <p>Some of the most common topics discussed during a first visit include:</p>
      <ul>
        <li>Teething discomfort</li>
        <li>Thumb sucking</li>
        <li>Pacifier use</li>
        <li>Bottle feeding habits</li>
        <li>Proper brushing techniques</li>
        <li>Fluoride recommendations</li>
      </ul>
      <p>Your dentist can provide personalized advice based on your child's age and development.</p>
      <h2>Final Thoughts</h2>
      <p>A child's first dental visit is an important milestone that helps establish lifelong oral health habits. Early check-ups allow for preventive care, early detection of problems, and a positive introduction to the dental environment.</p>
      <p>By starting dental visits early and maintaining good oral hygiene at home, parents can help their children enjoy healthy smiles and confident dental experiences for years to come. <span>🦷✨</span></p>
    `,
  },
  { id: "b4", slug: "dental-implants-complete-guide", title: "Dental Implants in 2025: A Complete Patient Guide to Costs, Timeline, and What to Expect", excerpt: "Everything you need to know about modern implant dentistry — from CT-guided placement to osseointegration, final crown delivery, and long-term maintenance.", category: "Dental Care Tips", author: "Dr. Pooja Bala", date: "February 2025", readTime: 10, emoji: "", bgClass: "from-teal-50 to-cyan-100", href: "/blog/dental-implants-complete-guide", content: "" },
  { id: "b5", slug: "invisalign-vs-braces", title: "Invisalign vs. Traditional Braces: Which Is Right for You in 2025?", excerpt: "A head-to-head comparison of clear aligners vs. metal braces covering aesthetics, effectiveness, cost, duration, and which cases each handles best.", category: "Dental Technology", author: "Dr. Pooja Bala", date: "January 2025", readTime: 8, emoji: "😬", bgClass: "from-green-50 to-emerald-100", href: "/blog/invisalign-vs-braces", content: "" },
  { id: "b6", slug: "overcoming-dental-anxiety", title: "Overcoming Dental Anxiety: How Modern Dentistry Makes It Easier Than Ever", excerpt: "Dental phobia affects 1 in 5 adults. Pain-free anaesthesia, sedation options, and compassionate care have made anxiety-free dentistry a reality for all patients.", category: "Patient Stories", author: "Dr. Pooja Bala", date: "December 2024", readTime: 6, emoji: "😌", bgClass: "from-rose-50 to-pink-100", href: "/blog/overcoming-dental-anxiety", content: "" },
];


// ─── FAQS ───────────────────────────────────────────────────────
export const FAQS: FAQItem[] = [
  { id: "f1",  question: "How often should I visit the dentist?", answer: "We recommend a dental check-up and professional cleaning every 6 months. Patients with active gum disease, a high cavity risk, or certain systemic conditions (diabetes, pregnancy) may need visits every 3–4 months. We will always tailor your recall schedule to your individual needs.", category: "General" },
  { id: "f2",  question: "Is teeth whitening safe?", answer: "Yes — professional Philips ZOOM whitening at PureSmile is completely safe when performed under clinical supervision. We use a custom-fitted tray and a pH-neutral, clinically tested gel. Sensitivity is managed with pre-treatment fluoride and desensitising paste. Over-the-counter strips and home kits without professional guidance are far more likely to cause enamel erosion.", category: "Treatments" },
  { id: "f3",  question: "How long do dental implants last?", answer: "With proper care and regular maintenance, dental implants can last a lifetime. The titanium fixture itself integrates permanently with bone and rarely needs replacement. The ceramic crown on top typically lasts 15–25 years depending on bite forces and oral hygiene. Nobel Biocare and Straumann implants carry lifetime manufacturer warranties.", category: "Treatments" },
  { id: "f4",  question: "Is a root canal painful?", answer: "No — modern root canal treatment at PureSmile is no more uncomfortable than a routine filling. We use the STA Wand computer-controlled anesthetic delivery for virtually painless injections, combined with ProTaper NEXT rotary files for efficient, single-visit treatment. Most patients are surprised at how comfortable it is.", category: "Treatments" },
  { id: "f5",  question: "How much does Invisalign cost in Mumbai?", answer: "Invisalign cost at PureSmile ranges from ₹60,000–₹2,50,000 depending on case complexity (mild crowding vs. complex bite correction), the number of aligners needed, and whether refinements are included. We offer a free 30-minute Invisalign consultation with a ClinCheck 3D simulation so you can see your result before committing.", category: "Cost & Insurance" },
  { id: "f6",  question: "At what age should a child first see a dentist?", answer: "The Indian Dental Association recommends a child's first visit by their first birthday or within 6 months of their first tooth erupting — whichever comes first. Early visits allow us to identify developmental issues, apply protective fluoride varnish, and — most importantly — build a positive, fear-free association with dental care from day one.", category: "General" },
  { id: "f7",  question: "Which insurance plans do you accept?", answer: "We accept 20+ major insurance providers including Star Health, HDFC ERGO, Bajaj Allianz, ICICI Lombard, New India Assurance, United Health, and corporate dental plans. Our team will verify your benefits before treatment and assist with direct billing wherever possible. Call us or WhatsApp your card details and we will check coverage within an hour.", category: "Cost & Insurance" },
  { id: "f8",  question: "What is a smile makeover and how long does it take?", answer: "A smile makeover is a comprehensive, customised plan that may combine teeth whitening, porcelain veneers, crown and bridge work, gum contouring, and orthodontics to transform your smile. At PureSmile, we begin with Digital Smile Design (DSD) — you see your new smile on screen before any treatment starts. Most makeovers are completed in 3–8 visits over 4–12 weeks.", category: "Treatments" },
  { id: "f9",  question: "How long does professional teeth whitening last?", answer: "In-office Zoom whitening results typically last 1–3 years depending on diet (coffee, tea, red wine), smoking habits, and oral hygiene. We provide custom take-home trays and whitening gel with every in-office treatment — periodic 30-minute top-up sessions at home maintain your bright result indefinitely.", category: "Treatments" },
  { id: "f11", question: "What should I do in a dental emergency?", answer: "Call us immediately on +91 98200 99999 — our emergency line is staffed 24/7. For a knocked-out adult tooth: rinse it gently (do not scrub), keep it moist in milk or the patient's own saliva, and see us within 30–60 minutes for the best chance of reimplantation. For toothache, broken crowns, or facial swelling, we have dedicated same-day emergency slots reserved every morning.", category: "Appointments" },
  { id: "f12", question: "How long does the full dental implant process take?", answer: "Implant placement is typically a 45–90 minute procedure under local anaesthesia. Osseointegration (bone healing and implant fusion) takes 8–16 weeks depending on bone density. Final crown delivery is a 1-hour appointment. Total timeline: 4–6 months for a standard single implant. Immediate loading (same-day temporary crown) is available for suitable cases.", category: "Treatments" },
  { id: "f13", question: "Are porcelain veneers reversible?", answer: "Traditional veneers require 0.3–0.7 mm of enamel reduction and are therefore considered an irreversible procedure. However, ultra-thin (no-prep) Lumineers® require minimal to no enamel reduction. We always perform a Digital Smile Design preview and a wax-up mock-up — you can wear a temporary version over your natural teeth before committing to any permanent enamel preparation.", category: "Treatments" },
  { id: "f14", question: "What is the difference between Invisalign and traditional braces?", answer: "Both systems move teeth effectively, but through different mechanisms. Invisalign uses a series of removable clear aligners — essentially invisible, easily removed for eating and cleaning, and generally more comfortable. Traditional braces use brackets and wires bonded to teeth — typically more effective for complex bite corrections, severe rotations, and vertical tooth movements. We will recommend the best system for your specific case during your consultation.", category: "Treatments" },
  { id: "f15", question: "Do you offer sedation for anxious patients?", answer: "Absolutely. We offer nitrous oxide (laughing gas) for mild to moderate anxiety — safe, fast-acting, and you can drive home immediately afterwards. Oral sedation tablets are available for moderate-to-severe anxiety (requires a companion for travel). IV sedation is available through our visiting anaesthesiologist for major procedures or severe phobia cases. Please let us know when booking and we will arrange the most appropriate option.", category: "Appointments" },
  { id: "f16", question: "How can I prevent gum disease?", answer: "Gum disease prevention is straightforward: brush for 2 minutes twice daily using the Bass technique with a soft brush, floss or use interdental brushes once daily, use an alcohol-free fluoride mouthwash, avoid tobacco entirely, manage systemic conditions like diabetes, and attend a professional cleaning every 6 months. If caught early (gingivitis), gum disease is completely reversible.", category: "General" },
  { id: "f17", question: "What causes tooth sensitivity and how is it treated?", answer: "Common causes include enamel erosion (acid from diet or reflux), gum recession exposing root surfaces, cracked teeth, cavities, post-whitening sensitivity, and bruxism. Treatment depends on cause: desensitising pastes, fluoride varnish, bonding agent over exposed roots, gum grafts, a night guard for grinding, or treating the underlying cavity. Our diagnostics identify the specific cause before recommending treatment.", category: "Treatments" },
  { id: "f18", question: "How do I know if I need a root canal?", answer: "Classic signs include: severe spontaneous throbbing toothache, prolonged sensitivity to hot or cold after the stimulus is removed, pain on biting, tooth discolouration, a recurring pimple or sinus tract on the gum, or facial swelling. A periapical digital X-ray and pulp vitality testing give us a definitive diagnosis. Do not wait — an untreated infected tooth can spread and become a serious systemic health risk.", category: "Treatments" },
  
  { id: "f20", question: "Is there parking available near the clinic?", answer: "Yes — there is a paid multi-level parking facility directly across from our building on Linking Road (open 24/7). On-street parking is available on the Bandra Hill Road side after 8 PM. We are also a 5-minute walk from Bandra (W) railway station and 10 minutes from the Bandra metro station, making public transport very convenient.", category: "General" },
];

export const TREATMENT_OPTIONS = [
  "General Check-up & Cleaning",
  "Dental Implants",
  "Teeth Whitening (Zoom)",
  "Smile Makeover / Veneers",
  "Root Canal Treatment",
  "Crowns & Bridges (CEREC)",
  "Braces & Invisalign",
  "Pediatric Dentistry",
  "Dental Emergency",
  "Gum Treatment",
  "Bone Grafting",
  "Wisdom Tooth Extraction",
  "Dentures / Overdentures",
  "Sports Mouthguard",
  "Other / Not Sure",
];

export const TIME_SLOTS = [
   "10:15 AM","10:30 AM","10:45 AM","11:00 AM", "11:15 AM","11:30 AM", "11:45 AM","12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM","1:00 PM", "1:15 PM", "1:30 PM", "1:45 AM", "2:00 PM",
   "5:00 PM", "5:15 PM",  "5:30 PM", "5:45 PM","6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM"
];
