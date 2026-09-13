/* ============================================================
   JNL PET STUDIO — content.js
   -------------------------------------------------------------
   All site copy, services, team, testimonials and contact info
   live here. Edit this file to update the site — script.js and
   index.html never hard-code content.
   ============================================================ */

const BUSINESS = {
  name: "JnL Pet Studio",
  tagline: "Grooming, boarding and training, under one roof.",
  intro: "JnL Pet Studio is a small, owner-run space for dogs and cats — a calm place for a wash and trim, a few nights of boarding, or a training plan that actually sticks.",
  founded: "2016",
};

/* ---------- SERVICES ---------- */
const SERVICES = [
  {
    id: "grooming",
    name: "Grooming",
    icon: "\u2702\uFE0F",
    shortDesc: "Bath, trim and tidy-up for dogs and cats of any coat type.",
    longDesc: "From a quick bath-and-brush to a full breed-standard trim, every groom starts with a coat and skin check. We use fragrance-light shampoos and take real breaks for nervous or older pets — no pet is rushed through.",
    priceFrom: "RM 60",
    duration: "45\u201390 min",
    includes: ["Bath & blow-dry", "Nail trim & ear clean", "Breed-specific or custom cut", "De-shedding treatment (add-on)"],
    image: "web.png",
  },
  {
    id: "boarding",
    name: "Boarding",
    icon: "\uD83C\uDFE0",
    shortDesc: "Cage-free overnight stays with small group sizes.",
    longDesc: "Our boarding rooms are cage-free and capped at six guests a night, split by size and temperament. Daily updates go out by message, and every stay includes two supervised play sessions and a comfort call to check on medication or feeding routines.",
    priceFrom: "RM 55 / night",
    duration: "Per night",
    includes: ["Cage-free rooms, capped occupancy", "Two supervised play sessions daily", "Daily photo update", "Medication administration"],
    image: "https://picsum.photos/seed/jnl-boarding/1000/750",
  },
  {
    id: "training",
    name: "Training",
    icon: "\uD83C\uDF7E",
    shortDesc: "Positive-reinforcement training for puppies and adult dogs.",
    longDesc: "We teach with positive reinforcement only — no shock collars, no dominance techniques. Sessions run one-on-one or in small puppy groups, covering everything from house manners to loose-leash walking and recall.",
    priceFrom: "RM 90 / session",
    duration: "50 min",
    includes: ["1:1 or small-group sessions", "Puppy foundations course", "Leash & recall coaching", "Take-home practice plan"],
    image: "https://picsum.photos/seed/jnl-training/1000/750",
  },
];

/* ---------- WHY JNL (feature highlights) ---------- */
const FEATURES = [
  { title: "Small by design", text: "We cap bookings so every pet gets full attention — not a rotating shift of strangers." },
  { title: "Fear-free handling", text: "Groomers and trainers are trained to read stress signals and slow down or stop." },
  { title: "Daily updates", text: "Boarding guests get a photo and a short note sent to you every day, not just on pickup." },
  { title: "No shortcuts on hygiene", text: "Rooms and grooming stations are cleaned between every single guest, not once a day." },
];

/* ---------- TESTIMONIALS ---------- */
const TESTIMONIALS = [
  { name: "Nadia R.", pet: "Milo, Shih Tzu", quote: "Milo used to shake through every groom. He walked out of JnL wagging his tail. That alone earned my loyalty." },
  { name: "Farhan T.", pet: "Bella, Golden Retriever", quote: "We boarded Bella for a week and got a photo update every single evening. It made travelling so much easier." },
  { name: "Wei Ling", pet: "Coco, Poodle mix", quote: "Coco went from pulling my arm off to walking politely in four sessions. The trainers explain the why, not just the how." },
];

/* ---------- TEAM ---------- */
const TEAM = [
  { name: "Jamie Lau", role: "Co-founder & Head Groomer", bio: "Ten years behind the clippers, certified in breed-standard and hand-scissor trims.", image: "https://picsum.photos/seed/jnl-team-jamie/500/500" },
  { name: "Liyana Hashim", role: "Co-founder & Trainer", bio: "Certified in positive-reinforcement training, with a focus on fearful and reactive dogs.", image: "https://picsum.photos/seed/jnl-team-liyana/500/500" },
  { name: "Danial Aziz", role: "Boarding Lead", bio: "Runs the overnight floor and every play session — the one behind your daily photo update.", image: "https://picsum.photos/seed/jnl-team-danial/500/500" },
];

/* ---------- VALUES (About page) ---------- */
const VALUES = [
  { title: "Every pet is a guest, not a customer", text: "We plan around the animal in front of us, not a fixed script." },
  { title: "Transparency over convenience", text: "If a groom or session needs to stop early, we say so and explain why." },
  { title: "Small enough to remember your pet's name", text: "We keep booking volume low on purpose, even when it costs us a busy weekend." },
];

/* ---------- FACILITY GALLERY ---------- */
const GALLERY = [
  { image: "web.png", caption: "Grooming station" },
  { image: "https://picsum.photos/seed/jnl-gallery-2/700/500", caption: "Cage-free boarding room" },
  { image: "https://picsum.photos/seed/jnl-gallery-3/700/500", caption: "Outdoor play yard" },
  { image: "https://picsum.photos/seed/jnl-gallery-4/700/500", caption: "Training studio" },
  { image: "https://picsum.photos/seed/jnl-gallery-5/700/500", caption: "Reception & waiting area" },
  { image: "https://picsum.photos/seed/jnl-gallery-6/700/500", caption: "Bath & dry suite" },
];

/* ---------- PET TYPES (for the enquiry form) ---------- */
const PET_TYPES = ["Dog", "Cat", "Other"];

/* ---------- FAQ (Contact page) ---------- */
const FAQS = [
  { q: "Do I need to book ahead for grooming?", a: "Yes — we take a limited number of grooms per day, so weekend slots are best booked 3\u20134 days ahead." },
  { q: "Can cats board alongside dogs?", a: "No. Cat boarding is in a separate, quieter room away from the dog floor." },
  { q: "What vaccinations do you require for boarding?", a: "Up-to-date core vaccinations plus proof of recent deworming and flea/tick prevention." },
  { q: "Do you handle reactive or anxious dogs?", a: "Yes \u2014 mention it in your enquiry so we can plan a slower first visit and pair the right staff member." },
];

/* ---------- CONTACT INFO ---------- */
const CONTACT_INFO = {
  email: "hello@jnlpetstudio.my",
  phone: "+60 12-345 6789",
  whatsapp: "+60 12-345 6789",
  address: "12, Jalan Damansara Utama, 47400 Petaling Jaya, Selangor, Malaysia",
  hours: [
    { day: "Monday \u2013 Friday", time: "9:00am \u2013 7:00pm" },
    { day: "Saturday \u2013 Sunday", time: "9:00am \u2013 5:00pm" },
    { day: "Public holidays", time: "Closed" },
  ],
  socials: [
    { platform: "Instagram", handle: "@jnlpetstudio", url: "#" },
    { platform: "Facebook", handle: "/jnlpetstudio", url: "#" },
  ],
};
