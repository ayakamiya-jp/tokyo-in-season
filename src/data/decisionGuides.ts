import type { ImageMetadata } from 'astro';
import areaComparisonHero from '../assets/hero/area-comparison-hero.jpg';
import privateVsGroupHero from '../assets/hero/private-vs-group-hero.jpg';
import seizaHero from '../assets/hero/seiza-hero.jpg';
import questionsHero from '../assets/hero/questions-hero.jpg';
import wagashiTrio from '../assets/content/photo-wagashi-trio.jpeg';
import whatToWearHero from '../assets/hero/what-to-wear-hero.jpg';
import urasenkeVsOmotesenkeHero from '../assets/hero/urasenke-vs-omotesenke-hero.jpg';
import matchaGradesHero from '../assets/hero/matcha-grades-explained-hero.jpg';
import seasonsHero from '../assets/hero/tea-ceremony-seasons-tokyo-hero.jpg';
import worthItHero from '../assets/hero/is-tokyo-tea-ceremony-worth-it-hero.jpg';
import wabiSabiHero from '../assets/hero/wabi-sabi-tea-ceremony-tokyo-hero.jpg';

export interface DecisionGuide {
  href: string;
  tag: string;
  title: string;
  desc: string;
  image: ImageMetadata;
  alt: string;
  featured?: boolean;
}

// Newest article leads as the featured card (see
// project_tea_ceremony_homepage_card_order — new articles go to the front).
// Shared between the homepage (curated subset) and /tea-ceremony (full list).
export const decisionGuides: DecisionGuide[] = [
  {
    href: '/wabi-sabi-tea-ceremony-tokyo',
    tag: 'Philosophy',
    title: 'What Is Wabi-Sabi, Really? (And What Tourists Get Wrong)',
    desc: "It's not a home-decor style of beige linen and driftwood — it's a sensibility about imperfection and impermanence that most visitors never see explained.",
    image: wabiSabiHero,
    alt: 'A ceramic plate on a marble surface, cracked and rejoined with visible gold kintsugi repair lines',
    featured: true,
  },
  {
    href: '/is-tokyo-tea-ceremony-worth-it',
    tag: 'Worth It?',
    title: "Is a Tokyo Tea Ceremony Worth It? An Insider's Honest Take",
    desc: 'The honest number: of 20 experiences we track, only 2 are a genuine pick and 8 are worth skipping — price alone won\'t tell you which is which.',
    image: worthItHero,
    alt: 'A speckled glazed chawan and the tip of a bamboo chasen whisk on white textured paper, with a delicate branch shadow falling across the scene',
  },
  {
    href: '/tea-ceremony-seasons-tokyo',
    tag: 'Seasons',
    title: 'A Tea Ceremony in Every Season: What Changes Month to Month',
    desc: 'Ro vs furo hearths, robiraki in November, and why the flowers and sweets change even when a tourist booking doesn\'t.',
    image: seasonsHero,
    alt: 'A narrow garden path in Kamakura lined with blooming blue and purple hydrangea (ajisai), leading toward a traditional tiled roof',
  },
  {
    href: '/matcha-grades-explained-tea-ceremony',
    tag: 'Ingredients',
    title: "Matcha Grades Explained: What You're Actually Drinking",
    desc: 'Ceremonial vs culinary grade, and why almost every Tokyo tourist ceremony serves usucha rather than the top-tier leaf.',
    image: matchaGradesHero,
    alt: 'A white chawan with a painted floral motif holding freshly whisked usucha, on a dark lacquer table',
  },
  {
    href: '/urasenke-vs-omotesenke-tea-ceremony-tokyo',
    tag: 'Tradition',
    title: 'Urasenke vs Omotesenke: Do Schools Matter?',
    desc: 'The real differences between Tokyo\'s two big tea schools — and why almost no venue tells you which one it follows.',
    image: urasenkeVsOmotesenkeHero,
    alt: 'A glazed chawan with brushed markings holds freshly whisked matcha, set on a tatami mat beside a black lacquer dish',
  },
  {
    href: '/what-to-wear-tea-ceremony-tokyo',
    tag: 'Attire',
    title: 'What to Wear to a Tea Ceremony',
    desc: 'No kimono required — the dress rules that actually matter, from socks to jewelry.',
    image: whatToWearHero,
    alt: 'Two pairs of zori sandals and white tabi socks peeking out from beneath kimono hems',
  },
  {
    href: '/wagashi-tea-ceremony-sweets',
    tag: 'Sweets',
    title: 'Wagashi 101: The Sweets Served at Tea',
    desc: 'Namagashi vs higashi, kōhaku-tō, and how to eat them properly.',
    image: wagashiTrio,
    alt: 'A trio of soft nerikiri wagashi sweets in seasonal shapes and colors, arranged on a black lacquer tray',
  },
  {
    href: '/questions-before-booking-tea-ceremony-tokyo',
    tag: 'Booking',
    title: '10 Questions to Ask Before You Book',
    desc: 'The questions behind almost every bad review — asked for you.',
    image: questionsHero,
    alt: 'A tokonoma alcove with a hanging scroll and ikebana flower arrangement in a tatami tea room',
  },
  {
    href: '/tea-ceremony-asakusa-vs-ginza-omotesando',
    tag: 'Areas',
    title: 'Asakusa vs Ginza vs Omotesando',
    desc: 'Which area fits your trip — price, atmosphere, and depth compared.',
    image: areaComparisonHero,
    alt: 'Cherry blossoms framing Senso-ji temple\'s red gate and a paper lantern in Asakusa, Tokyo',
  },
  {
    href: '/private-vs-group-tea-ceremony-tokyo',
    tag: 'Groups',
    title: 'Private vs Group: Which to Book?',
    desc: 'When the extra cost is worth it — and when it isn\'t.',
    image: privateVsGroupHero,
    alt: 'A single bowl of matcha and two wagashi sweets on a lacquered tray',
  },
  {
    href: '/tea-ceremony-without-seiza',
    tag: 'Seating',
    title: 'Best Ceremonies If You Can\'t Sit Seiza',
    desc: 'Chair-friendly options for travellers with knee or back issues.',
    image: seizaHero,
    alt: 'A quiet traditional Japanese tatami room with open shoji screens looking out onto a garden',
  },
];
