export interface ApproachPillar {
  number: string;
  total: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tag: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails: string[];
  image: string;
  badge: string;
}

export interface VehicleBuild {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  status: 'Delivered' | 'Available' | 'In Commission';
  image: string;
  power: string;
  acceleration: string;
  chassis: string;
  highlights: string[];
}

export const FORGE_MARQUES = [
  'PORSCHE',
  'ROLLS-ROYCE',
  'FERRARI',
  'LAND ROVER',
  'MCLAREN',
  'LAMBORGHINI',
  'MERCEDES-AMG',
  'ASTON MARTIN',
  'BENTLEY',
];

export const APPROACH_PILLARS: ApproachPillar[] = [
  {
    number: '01',
    total: '03',
    title: 'Identity',
    tag: 'THE CLIENT PROFILE',
    description:
      'Every build begins with the person behind the wheel, shaped around their individual taste, lifestyle, presence and personal sense of identity on the road.',
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/da57e5f387ccdbcac3a5062687c96077cce58732-2880x2234.jpg?auto=format&fit=max&w=1920',
    alt: 'Forge Identity – Spirit of Ecstasy',
  },
  {
    number: '02',
    total: '03',
    title: 'Insight',
    tag: 'INTELLIGENT FORM',
    description:
      'Exterior, interior and performance are brought together through a considered, detail-led approach, creating one complete and fully resolved vision.',
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/7e3618f8e7e2adade4756571eb45bc5b269c945f-2880x2174.jpg?auto=format&fit=max&w=1920',
    alt: 'Forge Intent – Custom Carbon Fibre Weave',
  },
  {
    number: '03',
    total: '03',
    title: 'Cohesion',
    tag: 'HARMONIC RESOLUTION',
    description:
      'Every modification is chosen with precision, ensuring each detail adds purpose, balance and distinction to the final bespoke automotive build.',
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/6ae234c0882d982601f3c56bb5949218746831a5-2880x2218.jpg?auto=format&fit=max&w=1920',
    alt: 'Forge Cohesion – Backend McLaren Aerodynamics',
  },
];

export const FORGE_SERVICES: ServiceItem[] = [
  {
    id: 'bodystyling',
    title: 'Bodystyling',
    category: 'AERO & FORM',
    badge: 'STAGE 1 / BESPOKE',
    description:
      'From aero styling to carbon details and exterior refinement, bodywork is designed to change the vehicle’s presence without compromising its original character.',
    fullDetails: [
      'Dry carbon aerodynamic splitters, rear diffusers, and decklid spoilers',
      'OEM+ widebody panel alignment & precision hand-finish',
      'Wind-tunnel verified aerodynamic balance and high-speed downforce',
    ],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/19b7e49a2f12696686bcf17288ce472acff82b3e-1254x1254.png?auto=format&fit=max&w=1200&q=85',
  },
  {
    id: 'interior',
    title: 'Interior',
    category: 'CABIN ATELIER',
    badge: 'TAILORED LEATHERS',
    description:
      'Material, stitching, trim and finish are selected to create an interior that feels personal, tactile and composed. We turn the cabin into a space of identity, comfort and control.',
    fullDetails: [
      'Bridge of Weir & Scottish Nappa hides with bespoke perforation patterns',
      'Bespoke diamond fluting and tone-matched Alcantara headlining',
      'Milled knurled aluminium dials, titanium switchgear, and forged carbon trim',
    ],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/10ebf92161cd329a63294240810302d888878636-1440x1800.jpg?auto=format&fit=max&w=1200&q=85',
  },
  {
    id: 'wheels',
    title: 'Wheels',
    category: 'STANCE & DYNAMICS',
    badge: 'AEROSPACE MONOBLOCK',
    description:
      'Bespoke wheel upgrades designed to enhance stance, proportion and road presence, with fitments selected to complement the vehicle’s character and performance.',
    fullDetails: [
      '6061-T6 aerospace forged monoblock and modular 2-piece configurations',
      'Millimeter-engineered negative offset for flush stance without rub',
      'Custom brushed tinted clear, satin champagne, and liquid bronze finishes',
    ],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/5f5b1b063f2ce9527c148819ad59e40f1803f7a7-1440x1800.jpg?auto=format&fit=max&w=1200&q=85',
  },
  {
    id: 'lighting',
    title: 'Lighting',
    category: 'OPTIC ARCHITECTURE',
    badge: 'LASER & OLED',
    description:
      'Lighting gives a vehicle its expression. From subtle tinting to signature illumination and refined visual details, we use light to sharpen character, presence and atmosphere.',
    fullDetails: [
      'Blackline laser LED projector retrofit with crystal-cut prism lenses',
      'Custom welcome sequence choreography upon vehicle approach',
      'Subtle optic smoked protective lenses preserving 100% luminous flux',
    ],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/b702180a6720e017269ea18a09158b80d35b568d-1440x1800.jpg?auto=format&fit=max&w=1200&q=85',
  },
  {
    id: 'exhaust',
    title: 'Exhaust',
    category: 'ACOUSTIC ENGINEERING',
    badge: 'VALVETRONIC TITANIUM',
    description:
      'Exhaust upgrades are chosen for tone, response and presence. Not noise for the sake of noise, but a sound profile that gives the vehicle more character and depth.',
    fullDetails: [
      'Inconel and titanium alloy free-flow system with remote active valves',
      'Bespoke acoustic tuning eliminating low-rpm cabin drone',
      'Quad ceramic-coated or quad raw titanium burnt heat-shield tips',
    ],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/b035e63f8c811ca259b8baa42aef3213928828a3-1440x1800.jpg?auto=format&fit=max&w=1200&q=85',
  },
  {
    id: 'protection',
    title: 'Protection',
    category: 'FINISH PRESERVATION',
    badge: 'STEALTH SATIN PPF',
    description:
      'Paint protective film solutions that preserve the finish of the vehicle while allowing for satin finishes, coloured films and full visual transformation.',
    fullDetails: [
      'Self-healing 8mil elastomeric thermoplastic polyurethane barrier',
      'Complete wrapped edge technique without blade contact on paint',
      'High-gloss hydrophobic ceramic topcoat or satin matte conversion',
    ],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/2c1a6f9f85de2f6ff7ea0a7de3c3898345710a58-1440x1800.jpg?auto=format&fit=max&w=1200&q=85',
  },
];

export const FORGE_BUILDS: VehicleBuild[] = [
  {
    id: 'g63-obsidian',
    title: 'Forge G63 AMG "Obsidian"',
    subtitle: 'Widebody Carbon Edition',
    year: '2026 Commission',
    status: 'Delivered',
    power: '720 HP / 950 Nm',
    acceleration: '0-62 mph in 3.6s',
    chassis: 'Mercedes-AMG G63 Bi-Turbo',
    highlights: ['Visible satin carbon wide arches', '23" Forged mono wheels', 'Custom Hermès leather cabin'],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/9e787594ef2847dbc40ccfad10a2d216286d948b-708x1402.png?auto=format&fit=max&w=1200',
  },
  {
    id: 'gt3-rosso',
    title: 'Forge 992 GT3 "Rosso Carbon"',
    subtitle: 'Atelier Lightweight Touring',
    year: '2026 Commission',
    status: 'Available',
    power: '525 HP Naturally Aspirated',
    acceleration: '0-62 mph in 3.2s',
    chassis: 'Porsche 911 (992.1) GT3',
    highlights: ['Carbon swan-neck wing & vented hood', 'Inconel valvetronic exhaust', 'Clubsport rollcage in body colour'],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/682e73d1b2acb4f13627274e87a4177e916e71ac-708x1402.png?auto=format&fit=max&w=1200',
  },
  {
    id: 'defender-v8-stealth',
    title: 'Forge Defender 110 V8 "Shadow"',
    subtitle: 'Tactical Luxury Overland',
    year: '2026 Commission',
    status: 'Available',
    power: '525 HP Supercharged V8',
    acceleration: '0-62 mph in 4.9s',
    chassis: 'Land Rover Defender 110 V8',
    highlights: ['Stealth satin paint protection', '22" Gloss black bespoke alloys', 'Quad valvetronic exhausts'],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/ba98741cf2c606538db469ad0ae866ba4a03829e-707x1402.png?auto=format&fit=max&w=1200',
  },
  {
    id: 'atelier-fleet',
    title: 'Forge Atelier Master Collection',
    subtitle: 'Curated 5-Vehicle Collection',
    year: '2026 Series',
    status: 'In Commission',
    power: 'Atelier Benchmark Builds',
    acceleration: 'Bespoke Calibrated',
    chassis: 'Defender • G63 • GT3 • Huracán • Emira',
    highlights: ['Synchronized build aesthetic', 'Private client showroom commissioning', 'Concierge handover'],
    image:
      'https://cdn.forgeautomotive.media/images/ed72g2cx/production/02dd1fb0de568518e405be67ae7dc3ef47fe383a-1320x2388.jpg?auto=format&fit=max&w=1600',
  },
];
