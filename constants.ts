
import { Product, Order, ActivityLog } from './types';

export const APP_NAME = "RASEL STORE";

// Expanded Category List for Sidebar
export const ALL_CATEGORIES = [
  { id: 'c1', name: 'Cyber Fashion', icon: 'Shirt' },
  { id: 'c2', name: 'Smart Phones', icon: 'Smartphone' },
  { id: 'c3', name: 'Laptops & PC', icon: 'Monitor' },
  { id: 'c4', name: 'Audio Gear', icon: 'Headphones' },
  { id: 'c5', name: 'Cameras', icon: 'Camera' },
  { id: 'c6', name: 'Gaming Console', icon: 'Gamepad' },
  { id: 'c7', name: 'Smart Home', icon: 'Home' },
  { id: 'c8', name: 'Accessories', icon: 'Watch' },
  { id: 'c9', name: 'Drones', icon: 'Wind' },
  { id: 'c10', name: 'Networking', icon: 'Wifi' },
  { id: 'c11', name: 'Software', icon: 'Code' },
  { id: 'c12', name: 'Health Tech', icon: 'Activity' },
];

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
    carbonFootprint: "Neutral",
    colors: ['#1a1a1a', '#2d3748', '#718096'],
    sizes: ['S', 'M', 'L', 'XL']
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
    carbonFootprint: "Low",
    colors: ['#000000', '#C0C0C0']
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
    carbonFootprint: "Medium",
    sizes: ['40', '41', '42', '43', '44', '45']
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
    carbonFootprint: "High",
    colors: ['#ffffff', '#000000', '#ff0000']
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
    carbonFootprint: "Medium",
    colors: ['#2b6cb0', '#2d3748']
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
    carbonFootprint: "Low",
    colors: ['#000000', '#4a5568']
  },
  {
    id: 'p7',
    name: 'Quantum Earbuds Pro',
    price: 3200,
    currency: 'BDT',
    category: 'Audio',
    description: 'Zero-latency neural interface earbuds with active noise cancellation.',
    images: ['https://picsum.photos/id/1084/600/800'],
    specs: { Battery: '30h', ANC: 'Active' },
    rating: 4.4, reviews: 55, arEnabled: false, stock: 100, carbonFootprint: 'Low',
    colors: ['#ffffff', '#000000']
  },
  {
    id: 'p8',
    name: 'Solar Punk Hoodie',
    price: 4500,
    currency: 'BDT',
    category: 'Apparel',
    description: 'Woven with flexible solar threads to charge devices on the go.',
    images: ['https://picsum.photos/id/338/600/800'], 
    specs: { Output: '5V/2A', Fabric: 'Cotton-Tech' },
    rating: 4.2, reviews: 18, arEnabled: false, stock: 20, carbonFootprint: 'Low',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'p9',
    name: 'Haptic Gaming Suit',
    price: 85000,
    currency: 'BDT',
    category: 'Gaming',
    description: 'Full body haptic feedback suit for VR immersion.',
    images: ['https://picsum.photos/id/1060/600/800'],
    specs: { Points: '128', Connectivity: 'WiFi 6E' },
    rating: 4.9, reviews: 12, arEnabled: false, stock: 3, carbonFootprint: 'High',
    sizes: ['Universal']
  },
  {
    id: 'p10',
    name: 'Portable Fusion Reactor',
    price: 150000,
    currency: 'BDT',
    category: 'Energy',
    description: 'Safe, pocket-sized cold fusion generator for unlimited power.',
    images: ['https://picsum.photos/id/237/600/800'],
    specs: { Output: '10kW', Safety: 'A++' },
    rating: 5.0, reviews: 1, arEnabled: true, stock: 1, carbonFootprint: 'Low'
  },
  {
    id: 'p11',
    name: 'Smart Plant Pot',
    price: 1200,
    currency: 'BDT',
    category: 'Home',
    description: 'AI-driven pot that moves to find sunlight.',
    images: ['https://picsum.photos/id/1080/600/800'],
    specs: { Mobility: 'Wheeled', Sensor: 'UV' },
    rating: 4.1, reviews: 200, arEnabled: false, stock: 45, carbonFootprint: 'Neutral'
  },
  {
    id: 'p12',
    name: 'Neon Sign: Tokyo',
    price: 2500,
    currency: 'BDT',
    category: 'Home',
    description: 'Cyberpunk aesthetic neon sign for wall mounting.',
    images: ['https://picsum.photos/id/1076/600/800'],
    specs: { Type: 'LED', Power: 'USB' },
    rating: 4.6, reviews: 88, arEnabled: true, stock: 15, carbonFootprint: 'Medium'
  },
  {
    id: 'p13',
    name: 'Mechanical Keyboard X1',
    price: 5500,
    currency: 'BDT',
    category: 'Tech',
    description: 'Transparent chassis with RGB underglow and hot-swappable switches.',
    images: ['https://picsum.photos/id/366/600/800'],
    specs: { Switch: 'Red', Layout: '65%' },
    rating: 4.7, reviews: 300, arEnabled: false, stock: 60, carbonFootprint: 'Medium'
  },
  {
    id: 'p14',
    name: 'Retro Game Stick',
    price: 1500,
    currency: 'BDT',
    category: 'Gaming',
    description: 'Plug and play HDMI stick with 10,000 classic games.',
    images: ['https://picsum.photos/id/96/600/800'],
    specs: { Games: '10k+', Output: 'HDMI' },
    rating: 3.9, reviews: 450, arEnabled: false, stock: 200, carbonFootprint: 'Low'
  },
  {
    id: 'p15',
    name: 'CyberDog 2.0',
    price: 250000,
    currency: 'BDT',
    category: 'Robotics',
    description: 'Loyal robotic companion with advanced pathfinding.',
    images: ['https://picsum.photos/id/169/600/800'],
    specs: { Speed: '3m/s', Battery: '2h' },
    rating: 4.9, reviews: 5, arEnabled: true, stock: 2, carbonFootprint: 'High'
  }
];

export const SUGGESTED_QUERIES = [
  "Best outfit for monsoon in Dhaka?",
  "Compare the AR Glasses and Drone",
  "Show me sustainable tech",
  "Gift ideas under 5000 BDT"
];

// MOCK DATA FOR USER PROFILE
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-72910',
    date: '2023-11-20',
    total: 54000,
    status: 'Processing',
    items: [
      { ...MOCK_PRODUCTS[1], quantity: 1 }, 
      { ...MOCK_PRODUCTS[6], quantity: 1 }
    ],
    paymentMethod: 'bKash',
    trackingNumber: 'TRK-9921002'
  },
  {
    id: 'ORD-66120',
    date: '2023-10-15',
    total: 12500,
    status: 'Delivered',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 1 }
    ],
    paymentMethod: 'VISA',
    trackingNumber: 'TRK-1123445'
  },
  {
    id: 'ORD-55102',
    date: '2023-09-02',
    total: 8500,
    status: 'Cancelled',
    items: [
      { ...MOCK_PRODUCTS[2], quantity: 1 }
    ],
    paymentMethod: 'COD'
  }
];

export const MOCK_ACTIVITY: ActivityLog[] = [
  { id: '1', action: 'Login Successful', description: 'Logged in from Chrome on Windows', timestamp: '2 mins ago', icon: 'login' },
  { id: '2', action: 'Order Placed', description: 'Order #ORD-72910 placed via bKash', timestamp: '5 days ago', icon: 'order' },
  { id: '3', action: 'Profile Updated', description: 'Changed shipping address', timestamp: '2 weeks ago', icon: 'edit' },
  { id: '4', action: 'Password Changed', description: 'Security update', timestamp: '1 month ago', icon: 'security' },
];
