import { Product } from './types';

export const APP_NAME = "LUMINA";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'CyberWeave Zenith Jacket',
    price: 12500,
    currency: 'BDT',
    category: 'Apparel',
    description: 'Adaptive thermal regulation with hydrophobic nano-coating. Features programmable LED accents controlled via app.',
    images: [
      'https://picsum.photos/id/338/600/800',
      'https://picsum.photos/id/325/600/800'
    ],
    specs: {
      Material: 'Graphene-Nylon Blend',
      Fit: 'Oversized Tech',
      Waterproof: 'IPX6'
    },
    rating: 4.8,
    reviews: 124,
    arEnabled: true,
    stock: 15,
    carbonFootprint: "Neutral"
  },
  {
    id: 'p2',
    name: 'NeuroLink AR Glasses',
    price: 45000,
    currency: 'BDT',
    category: 'Tech',
    description: 'Lightweight augmented reality HUD. Instant translation, navigation overlay, and biometric tracking.',
    images: [
      'https://picsum.photos/id/250/600/800',
      'https://picsum.photos/id/180/600/800'
    ],
    specs: {
      Display: 'MicroLED 4K',
      Battery: '12 Hours',
      Weight: '42g'
    },
    rating: 4.9,
    reviews: 850,
    arEnabled: true,
    stock: 5,
    carbonFootprint: "Low"
  },
  {
    id: 'p3',
    name: 'NeoStep Gravity Boots',
    price: 8500,
    currency: 'BDT',
    category: 'Footwear',
    description: 'Mag-lev sole technology for impact reduction. Self-lacing system with posture correction AI.',
    images: [
      'https://picsum.photos/id/21/600/800',
      'https://picsum.photos/id/103/600/800'
    ],
    specs: {
      Sole: 'Magnetic Levitation',
      Upper: 'Recycled Polymer',
      Connectivity: 'Bluetooth 5.3'
    },
    rating: 4.6,
    reviews: 42,
    arEnabled: true,
    stock: 32,
    carbonFootprint: "Medium"
  },
  {
    id: 'p4',
    name: 'AeroDrone Mini',
    price: 18000,
    currency: 'BDT',
    category: 'Tech',
    description: 'Pocket-sized personal drone photographer. Follow-me mode with 8K obstacle avoidance.',
    images: [
      'https://picsum.photos/id/96/600/800',
      'https://picsum.photos/id/119/600/800'
    ],
    specs: {
      Range: '2km',
      Camera: '48MP',
      FlightTime: '25mins'
    },
    rating: 4.7,
    reviews: 210,
    arEnabled: false,
    stock: 8,
    carbonFootprint: "High"
  }
];

export const SUGGESTED_QUERIES = [
  "Best outfit for monsoon in Dhaka?",
  "Compare the AR Glasses and Drone",
  "Show me sustainable tech",
  "Gift ideas under 5000 BDT"
];
