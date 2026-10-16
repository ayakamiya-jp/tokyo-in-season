import type { DecisionGuide } from './decisionGuides';
import kimonoAreaHero from '../assets/hero/kimono-rental-asakusa-vs-ginza-kamakura-hero.jpg';
import kimonoRentalHero from '../assets/hero/kimono-rental-tokyo-hero.jpg';

// Kimono pillar articles. Same rule as decisionGuides: newest article goes to
// the front and carries `featured`. Shared between the homepage Kimono section
// and the /kimono hub.
export const kimonoGuides: DecisionGuide[] = [
  {
    href: '/kimono-rental-asakusa-vs-ginza-kamakura/',
    tag: 'Area Comparison',
    title: 'Kimono Rental Near Tokyo Compared: Asakusa vs Ginza vs Kamakura',
    desc: "Where to rent depends on the day you want: easy temple photos, a calm Ginza afternoon, or a full day of Kamakura's hills and seasonal flowers.",
    image: kimonoAreaHero,
    alt: 'The vermilion main shrine of Tsurugaoka Hachimangu in Kamakura at the top of its stone staircase, framed by green trees',
    featured: true,
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
