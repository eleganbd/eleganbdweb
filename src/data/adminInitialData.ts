import { 
  CategoryItem, 
  StockLog, 
  DollarExpense, 
  Partnership, 
  GeneralExpense, 
  AdminUser, 
  CMSBanner, 
  StoreSettings 
} from '../types';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-pant',
    name: 'Formal Pant',
    slug: 'formal-pant',
    description: 'Executive formal trousers, pleated trousers, and tailored luxury chinos.',
    productCount: 4,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu8-tfS_u-lV5MEu9TTqpMiIImMo2xjv5zH1m47ePUnR0aObEi74GzMQ-rKkfrnFOcCHxdb-OfWqbGEGoueAtl-c-xwk70KaWjkiPj9Sov9AU3eIhlxC6yVmS3zkRnwY8c7xF3mxPap8RPDgozje21H-e6uN3TF7LNumzEA99TXgPBphtyD-4LPUYeWARNl49U6wmUal9jkHfRvZIZbkrEz7t3kGhzgNrGRQpGmWTDbHlOrwqGMHTi'
  },
  {
    id: 'cat-shirt',
    name: 'Shirt',
    slug: 'shirt',
    description: 'Pure Egyptian Giza cotton formal shirts, knit polos, and Oxford button-downs.',
    productCount: 2,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOm-SnPnfIV6vJVnuBLIxbl1LEhIlmovmuUoBsjntKywAPDLh0gefZ5BYUUl6AyzCHDVV6yHC-aviiRY7-fTUTx2w2Ser30aOsuF2SMjrqbYA0OEl1USZ7RE3QbWUesSc4G8YqppCS2UwVpv9aYgYErD0L4buCZlf3wSh_gIVD3pddrKwZLLxCjhF2Bo_hYhtyF4F42wHr63sJnsGbBa7XF8ASLT_fdH4z_dyz02ZMXuwz2hTV_bOf'
  },
  {
    id: 'cat-others',
    name: 'Others',
    slug: 'others',
    description: 'Italian leather belts, blazer accents, custom cuffs, and sartorial accessories.',
    productCount: 1,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBofdo0Cwim2e7YizzBSW-9IOxslK4VUYIw6GjyHqvkk9g6QbzAX6p5zmBA_68jCqTZdjzJ0SBbcjrS_Ggnkn2sqba4ivwmAAhyHpxIF1nwFKc7bkNBVM_wmHOPjBK4bKACkihZaDGDRiv2XrL0WoXWlMS6TLJlx__-8Vy9nS7GXxQ1pEYxx5I_E9bhZl47wS1vszd9EYpI_3EOIH-a4sVs2NDuJsBthmunquYrHJoWn85BfB9oQ5GL'
  }
];

export const INITIAL_STOCK_LOGS: StockLog[] = [
  {
    id: 'stk-in-1',
    date: '19 Sep 2026, 11:30 AM',
    productId: 'sovereign-charcoal',
    productName: 'The Sovereign Charcoal Slim',
    size: '32',
    quantity: 50,
    type: 'in',
    reason: 'New Batch Production',
    note: 'Export quality batch from Dhaka atelier production line',
    batchNumber: 'BATCH-2026-09A',
    recordedBy: 'Admin (eleganbd@gmail.com)'
  },
  {
    id: 'stk-in-2',
    date: '18 Sep 2026, 04:15 PM',
    productId: 'executive-midnight-navy',
    productName: 'The Executive Midnight Navy',
    size: '34',
    quantity: 40,
    type: 'in',
    reason: 'Restock Batch',
    note: 'Premium poly-rayon blend fabric received',
    batchNumber: 'BATCH-2026-09B',
    recordedBy: 'Admin (eleganbd@gmail.com)'
  },
  {
    id: 'stk-out-1',
    date: '19 Sep 2026, 02:20 PM',
    productId: 'sovereign-charcoal',
    productName: 'The Sovereign Charcoal Slim',
    size: '32',
    quantity: 1,
    type: 'out',
    reason: 'Customer Order (ELG-84920)',
    note: 'Dispatched via Express Courier',
    recordedBy: 'Order System'
  },
  {
    id: 'stk-out-2',
    date: '17 Sep 2026, 10:00 AM',
    productId: 'riviera-sand-beige',
    productName: 'The Riviera Sand Beige Pant',
    size: '30',
    quantity: 2,
    type: 'out',
    reason: 'Showroom Sample Display',
    note: 'Gulshan Experience Center showroom mannequin',
    recordedBy: 'Admin (eleganbd@gmail.com)'
  }
];

export const INITIAL_DOLLAR_EXPENSES: DollarExpense[] = [
  {
    id: 'dexp-1',
    date: '18 Sep 2026',
    description: 'Meta (Facebook & Instagram) Conversion Ad Campaign',
    usdAmount: 85.00,
    exchangeRate: 122.50,
    bdtAmount: 10412.50,
    category: 'Facebook Ads',
    invoiceNo: 'META-INV-849201',
    status: 'paid'
  },
  {
    id: 'dexp-2',
    date: '15 Sep 2026',
    description: 'Google Performance Max & Search Retargeting Ads',
    usdAmount: 50.00,
    exchangeRate: 122.50,
    bdtAmount: 6125.00,
    category: 'Google Ads',
    invoiceNo: 'GOOG-INV-99238',
    status: 'paid'
  },
  {
    id: 'dexp-3',
    date: '10 Sep 2026',
    description: 'Shopify / SaaS Cloud Infrastructure & CDN tools',
    usdAmount: 29.00,
    exchangeRate: 122.50,
    bdtAmount: 3552.50,
    category: 'Software / Tools',
    invoiceNo: 'CLD-INV-4402',
    status: 'paid'
  }
];

export const INITIAL_PARTNERSHIPS: Partnership[] = [
  {
    id: 'part-1',
    partnerName: 'Managing Director & Lead Designer',
    phone: '01631496122',
    email: 'eleganbd@gmail.com',
    equityShare: 60,
    totalInvestment: 500000,
    profitWithdrawn: 120000,
    joinedDate: 'January 2025'
  },
  {
    id: 'part-2',
    partnerName: 'Operations & Supply Chain Partner',
    phone: '01711223344',
    email: 'operations@eleganbd.com',
    equityShare: 40,
    totalInvestment: 350000,
    profitWithdrawn: 80000,
    joinedDate: 'February 2025'
  }
];

export const INITIAL_GENERAL_EXPENSES: GeneralExpense[] = [
  {
    id: 'gexp-1',
    date: '19 Sep 2026',
    title: 'Custom Branded Magnetic Box & Butter Paper Packaging',
    category: 'Packaging',
    amount: 8500,
    note: '500 luxury packaging boxes from press'
  },
  {
    id: 'gexp-2',
    date: '18 Sep 2026',
    title: 'Steadfast Courier Delivery Advance & Hub Logistics',
    category: 'Logistics',
    amount: 4200,
    note: 'Dhaka and Nationwide delivery hub fees'
  },
  {
    id: 'gexp-3',
    date: '15 Sep 2026',
    title: 'Gulshan Atelier Studio Utilities & Showroom Maintenance',
    category: 'Rent',
    amount: 15000,
    note: 'Monthly showroom upkeep and electricity'
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'adm-1',
    name: 'Elegan Master Admin',
    email: 'eleganbd@gmail.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: 'Active Now',
    phone: '01631496122'
  },
  {
    id: 'adm-2',
    name: 'Order Fulfillment Officer',
    email: 'orders@eleganbd.com',
    role: 'Order Manager',
    status: 'active',
    lastLogin: 'Yesterday, 5:30 PM',
    phone: '01711998877'
  },
  {
    id: 'adm-3',
    name: 'Warehouse & Inventory Lead',
    email: 'inventory@eleganbd.com',
    role: 'Inventory Manager',
    status: 'active',
    lastLogin: '2 days ago',
    phone: '01811223344'
  }
];

export const INITIAL_CMS_BANNER: CMSBanner = {
  headline: 'THE REFINED MODERN TROUSER',
  subheadline: 'Impeccably tailored trousers engineered for supreme comfort, boardroom poise, and effortless elegance.',
  badge: 'SARTORIAL ATELIER COLLECTION 2026',
  buttonText: 'SHOP BESTSELLERS',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu8-tfS_u-lV5MEu9TTqpMiIImMo2xjv5zH1m47ePUnR0aObEi74GzMQ-rKkfrnFOcCHxdb-OfWqbGEGoueAtl-c-xwk70KaWjkiPj9Sov9AU3eIhlxC6yVmS3zkRnwY8c7xF3mxPap8RPDgozje21H-e6uN3TF7LNumzEA99TXgPBphtyD-4LPUYeWARNl49U6wmUal9jkHfRvZIZbkrEz7t3kGhzgNrGRQpGmWTDbHlOrwqGMHTi'
};

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'ELEGAN BD',
  contactNumber: '01631496122',
  whatsappNumber: '01631496122',
  email: 'eleganbd@gmail.com',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  address: 'Gulshan 2, Dhaka - 1212, Bangladesh',
  deliveryDhaka: 70,
  deliveryOutside: 130,
  freeDeliveryMinItems: 3,
  codEnabled: true,
  orderAutoConfirm: true,
  metaPixelId: '',
  metaPixelEnabled: false,
  testEventCode: ''
};
