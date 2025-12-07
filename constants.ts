import { Product } from './types';

export const APP_NAME = "RASEL STORE";

export const CATEGORIES = [
  { id: 'c1', name: 'Cyber Apparel', slug: 'apparel', gradient: 'from-pink-500 to-rose-500' },
  { id: 'c2', name: 'Neural Tech', slug: 'tech', gradient: 'from-cyan-400 to-blue-600' },
  { id: 'c3', name: 'Anti-Grav Footwear', slug: 'footwear', gradient: 'from-violet-500 to-purple-600' },
  { id: 'c4', name: 'Smart Home', slug: 'home', gradient: 'from-emerald-400 to-green-600' }
];

export const SERVICE_FEATURES = [
  { id: 's1', title: 'Free Shipping', desc: 'On orders over 5k BDT', icon: 'Truck' },
  { id: 's2', title: 'Money Guarantee', desc: '30 days money back', icon: 'ShieldCheck' },
  { id: 's3', title: 'Online Support', desc: '24/7 technical aid', icon: 'Headphones' },
  { id: 's4', title: 'Secure Payment', desc: 'Encrypted transactions', icon: 'Lock' },
];

export const BRANDS = [
  { name: 'Samsung', url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'Apple', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Sony', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sony_logo.svg' },
  { name: 'Asus', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
  { name: 'Intel', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg' },
  { name: 'Nvidia', url: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg' }
];

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
  },
  {
    id: 'p5',
    name: 'Holo-Projection Watch',
    price: 22000,
    currency: 'BDT',
    category: 'Tech',
    description: 'Wrist-mounted holographic display projector. Syncs with all devices for air-touch control.',
    images: [
      'https://picsum.photos/id/175/600/800',
      'https://picsum.photos/id/3/600/800'
    ],
    specs: {
      Battery: '48 Hours',
      Projection: '10 inch HD',
      Sensor: 'LiDAR'
    },
    rating: 4.5,
    reviews: 89,
    arEnabled: true,
    stock: 12,
    carbonFootprint: "Medium"
  },
  {
    id: 'p6',
    name: 'Stealth Urban Pack',
    price: 6500,
    currency: 'BDT',
    category: 'Accessories',
    description: 'Anti-theft minimalist backpack with solar charging fabric and signal blocking pockets.',
    images: [
      'https://picsum.photos/id/367/600/800',
      'https://picsum.photos/id/531/600/800'
    ],
    specs: {
      Capacity: '25L',
      Material: 'Kevlar Weave',
      Solar: '5W Panel'
    },
    rating: 4.8,
    reviews: 340,
    arEnabled: false,
    stock: 50,
    carbonFootprint: "Low"
  }
];

export const SUGGESTED_QUERIES = [
  "Best outfit for monsoon in Dhaka?",
  "Compare the AR Glasses and Drone",
  "Show me sustainable tech",
  "Gift ideas under 5000 BDT"
];