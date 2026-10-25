import type { DecisionGuide } from './decisionGuides';
import kimonoChecklistHero from '../assets/hero/kimono-rental-checklist-hero.jpg';
import kimonoAreaHero from '../assets/hero/kimono-rental-asakusa-vs-ginza-kamakura-hero.jpg';
import kimonoRentalHero from '../assets/hero/kimono-rental-tokyo-hero.jpg';

// Kimono pillar articles. Same rule as decisionGuides: newest article goes to
// the front and carries `featured`. Shared between the homepage Kimono section
// and the /kimono hub.
export const kimonoGuides: DecisionGuide[] = [
  {
    href: '/kimono-rental-checklist/',
    tag: 'Checklist',
    title: "What to Look for in a Kimono Rental (A Wearer's Checklist)",
    desc: "What to check on the booking page, at the counter, while you're being dressed, and in a two-minute test before you walk out.",
    image: kimonoChecklistHero,
    alt: 'The back of a beige kimono with an orange and gold floral obi tied in a drum knot, in a softly lit Japanese interior',
    featured: true,
  },
  {
    href: '/kimono-rental-asakusa-vs-ginza-kamakura/',
    tag: 'Area Comparison',
    title: 'Kimono Rental Near Tokyo Compared: Asakusa vs Ginza vs Kamakura',
    desc: "Where to rent depends on the day you want: easy temple photos, a calm Ginza afternoon, or a full day of Kamakura's hills and seasonal flowers.",
    image: kimonoAreaHero,
    alt: 'The vermilion main shrine of Tsurugaoka Hachimangu in Kamakura at the top of its stone staircase, framed by green trees',
  },
  {
    href: '/kimono-rental-tokyo/',
    tag: 'Rental Guide',
    title: "Kimono Rental in Tokyo: A Wearer's Honest Guide",
    desc: 'What separates a good rental from a tourist trap, rough prices, and the vintage option.',
    image: kimonoRentalHero,
    alt: 'A close-up of an ornate floral textile pattern in white, red, and blue',
  },
];
