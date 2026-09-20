import { TrouserProduct, SizeDimension, ReviewItem } from '../types';
import solidShirtImg from '../assets/images/category_solid_shirt_1789811576240.jpg';
import poloImg from '../assets/images/category_polo_1789811614458.jpg';

export const ELEGAN_LOGO = "https://lh3.googleusercontent.com/aida/AEtjO1X8hWnx4R_14GLfAlzECOsr5mJMvkcEVMQ9Mrf1d-E5pAMqgEnnROXzbSuh4HMVnKaRJdECMx-JTq425f557zAL_BIz0nJxJvklxa6rFcSPfnRs3nlzKlOvpY20tMjrfy96VDqaS9z-PVTx5jU3btRZgQ0-hvK5hIFWxbxtYW9e2WO_0HwiN_YIsO-QSX3u9UWhVdZ3IMPbk10lJdfVmTluqz0UKDHnJYOXl9h5EA7KTiBGQnvz8mSAFhI";
export const ATELIER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuA9vm4xBenH3W5G8-BDUUWOcwm8jUIQLJgwFDw9M5Cs8c8uHU4sP0Nx6E3A0uUIA8gah5BLdwhyIsDM5yPlqNnx2K9KFuZWB50HDJ_FMZXFrQoK_iT15Fr7x7ZE3EcX2_7_iAYOZtlFF5xJiAAoNSBiVGNbfR7rT19pi_AAbGj0MI9lk2IyTZC76sZ0yYqiEpbmpE_SC3HgTMrMAAn2ZtscwN0ZbkF5WQPesO-_8SFmopWQOCVbsez4";

export const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAu8-tfS_u-lV5MEu9TTqpMiIImMo2xjv5zH1m47ePUnR0aObEi74GzMQ-rKkfrnFOcCHxdb-OfWqbGEGoueAtl-c-xwk70KaWjkiPj9Sov9AU3eIhlxC6yVmS3zkRnwY8c7xF3mxPap8RPDgozje21H-e6uN3TF7LNumzEA99TXgPBphtyD-4LPUYeWARNl49U6wmUal9jkHfRvZIZbkrEz7t3kGhzgNrGRQpGmWTDbHlOrwqGMHTi";
export const BEIGE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDOm-SnPnfIV6vJVnuBLIxbl1LEhIlmovmuUoBsjntKywAPDLh0gefZ5BYUUl6AyzCHDVV6yHC-aviiRY7-fTUTx2w2Ser30aOsuF2SMjrqbYA0OEl1USZ7RE3QbWUesSc4G8YqppCS2UwVpv9aYgYErD0L4buCZlf3wSh_gIVD3pddrKwZLLxCjhF2Bo_hYhtyF4F42wHr63sJnsGbBa7XF8ASLT_fdH4z_dyz02ZMXuwz2hTV_bOf";
export const NAVY_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBofdo0Cwim2e7YizzBSW-9IOxslK4VUYIw6GjyHqvkk9g6QbzAX6p5zmBA_68jCqTZdjzJ0SBbcjrS_Ggnkn2sqba4ivwmAAhyHpxIF1nwFKc7bkNBVM_wmHOPjBK4bKACkihZaDGDRiv2XrL0WoXWlMS6TLJlx__-8Vy9nS7GXxQ1pEYxx5I_E9bhZl47wS1vszd9EYpI_3EOIH-a4sVs2NDuJsBthmunquYrHJoWn85BfB9oQ5GL";

export const PRODUCTS: TrouserProduct[] = [
  {
    id: 'sovereign-charcoal',
    name: 'The Sovereign Charcoal Slim',
    subtitle: 'Export Spec Executive Cut',
    category: 'Formal Pant',
    badge: 'Bestseller • Export Spec',
    badgeType: 'bestseller',
    colorName: 'Charcoal Black',
    colorHex: '#141414',
    colorFamily: 'obsidian',
    price: 1650,
    originalPrice: 2250,
    stockStatus: 'In Stock',
    stockNote: 'Ready for same-day dispatch',
    imageUrl: HERO_IMAGE,
    galleryImages: [
      HERO_IMAGE,
      BEIGE_IMAGE,
      NAVY_IMAGE
    ],
    description: 'The definitive boardroom and evening formal trouser. Woven with an ultra-dense tropical bi-stretch blend with high colorfastness, tailored with clean mid-rise geometry and razor crease preservation.',
    fabricSpecs: [
      '68% Fine Poly, 28% Eco Rayon, 4% High-Recovery Spandex',
      'Anti-wrinkle weave engineered for humid tropical climates',
      'Internal silicon shirt-gripper waistband to keep shirts tucked',
      'YKK auto-locking brass zipper with horn button closure',
      'Includes 2-inch internal waist let-out allowance'
    ],
    availableSizes: [28, 30, 32, 34, 36, 38]
  },
  {
    id: 'riviera-sand-beige',
    name: 'The Riviera Sand Beige Pant',
    subtitle: 'Resort & Sartorial Casual Cut',
    category: 'Formal Pant',
    badge: 'Trending Edit',
    badgeType: 'trending',
    colorName: 'Riviera Beige',
    colorHex: '#D4C3A3',
    colorFamily: 'beige',
    price: 1650,
    originalPrice: 2250,
    stockStatus: 'Fast Moving',
    stockNote: 'Only 35 pairs left in Gulshan atelier',
    imageUrl: BEIGE_IMAGE,
    galleryImages: [
      BEIGE_IMAGE,
      HERO_IMAGE,
      NAVY_IMAGE
    ],
    description: 'Effortless Mediterranean resort flair made for smart business lunches and weekend social events. Pairs flawlessly with midnight navy knit polos, crisp linen shirts, and dark brown horsebit loafers.',
    fabricSpecs: [
      '68% Poly, 28% Rayon, 4% Spandex high-density weave',
      'Cool-touch surface that repels lint and resists staining',
      'Clean 14.5" to 15.5" ankle taper falling cleanly with zero fabric pool',
      'Reinforced diamond crotch gusset prevents seam blowouts',
      'Pre-washed and shrink-resistant construction'
    ],
    availableSizes: [28, 30, 32, 34, 36, 38]
  },
  {
    id: 'executive-midnight-navy',
    name: 'The Executive Midnight Navy',
    subtitle: 'Crown Wool-Touch Foundation',
    category: 'Formal Pant',
    badge: 'Premium Wool Blend',
    badgeType: 'premium',
    colorName: 'Deep Navy Blue',
    colorHex: '#1A2538',
    colorFamily: 'navy',
    price: 1750,
    originalPrice: 2400,
    stockStatus: 'In Stock',
    stockNote: 'Official corporate uniform of choice',
    imageUrl: NAVY_IMAGE,
    galleryImages: [
      NAVY_IMAGE,
      HERO_IMAGE,
      BEIGE_IMAGE
    ],
    description: 'The premier cornerstone of modern corporate authority. Imbued with a rich midnight hue that shifts under ambient lighting, offering unparalleled sharpness for conferences, presentations, and client meetings.',
    fabricSpecs: [
      '70% Micro-Poly, 26% Viscose Wool-Touch, 4% Elastane',
      'Four-way mechanical flex restoring crease integrity instantly',
      'Dual welt back pockets with genuine horn buttons',
      'Curved ergonomic waistband prevents lower-back gaping',
      'Machine washable on gentle cycle or dry cleanable'
    ],
    availableSizes: [28, 30, 32, 34, 36, 38]
  },
  {
    id: 'milano-pearl-offwhite',
    name: 'The Milano Pearl Off-White',
    subtitle: 'Limited Gallery Trouser',
    category: 'Formal Pant',
    badge: 'Limited Drop • 40 Left',
    badgeType: 'limited',
    colorName: 'Pearl Off-White',
    colorHex: '#F4F1EA',
    colorFamily: 'offwhite',
    price: 1750,
    originalPrice: 2400,
    stockStatus: 'Low Stock',
    stockNote: 'Limited edition production batch',
    imageUrl: BEIGE_IMAGE,
    galleryImages: [
      BEIGE_IMAGE,
      NAVY_IMAGE,
      HERO_IMAGE
    ],
    description: 'High-fashion, pristine tailored ivory engineered with non-sheer high-opacity lining. Formulated for wedding receptions, gallery openings, Eid celebrations, and luxury occasions.',
    fabricSpecs: [
      'Double-ply opaque weave that is 100% non-transparent',
      'Internal whisper-soft satin half-lining down to the knee',
      'Teflon moisture-wicking and gentle stain barrier treatment',
      'Precision blind-stitched hem with 1.5-inch extra let-down',
      'Custom dyed horn buttons and anti-slip waistband'
    ],
    availableSizes: [28, 30, 32, 34, 36, 38]
  },
  {
    id: 'giza-sky-blue-shirt',
    name: 'Executive Giza Cotton Sky Blue Formal Shirt',
    subtitle: '100% Egyptian Giza Cotton',
    category: 'Shirt',
    badge: 'New Arrival',
    badgeType: 'trending',
    colorName: 'Sky Blue',
    colorHex: '#93C5FD',
    colorFamily: 'navy',
    price: 1450,
    originalPrice: 1950,
    stockStatus: 'In Stock',
    stockNote: 'Ready for same-day dispatch',
    imageUrl: solidShirtImg,
    galleryImages: [
      solidShirtImg,
      poloImg
    ],
    description: 'Woven from 100% long-staple Egyptian Giza cotton. Features a perfect spread collar, breathable weave, and wrinkle-resistant finish for executive elegance.',
    fabricSpecs: [
      '100% Long-Staple Egyptian Giza Cotton',
      'Wrinkle-resistant luxury finish',
      'German fusible interlining collar and cuffs',
      'Mother-of-pearl finish buttons with cross-stitching'
    ],
    availableSizes: [28, 30, 32, 34, 36, 38]
  },
  {
    id: 'royal-white-oxford-shirt',
    name: 'Royal Crisp White Formal Shirt',
    subtitle: 'Pure High-Density Cotton',
    category: 'Shirt',
    badge: 'Executive Choice',
    badgeType: 'bestseller',
    colorName: 'Crisp White',
    colorHex: '#FFFFFF',
    colorFamily: 'offwhite',
    price: 1450,
    originalPrice: 1950,
    stockStatus: 'In Stock',
    stockNote: 'Ready for same-day dispatch',
    imageUrl: solidShirtImg,
    galleryImages: [
      solidShirtImg,
      poloImg
    ],
    description: 'Tailored slim fit formal white shirt made with premium high-density cotton. Engineered with stiffened collar bands that hold structure cleanly under blazers.',
    fabricSpecs: [
      '100% Fine Combed Cotton',
      'Stain-release and easy-iron treatment',
      'Reinforced gusset side seams',
      'Adjustable dual-button cuffs'
    ],
    availableSizes: [28, 30, 32, 34, 36, 38]
  }
];

export const COLOR_CAPSULES = [
  {
    id: 'obsidian',
    name: 'Black Obsidian',
    count: '6 Styles',
    swatch: '#111111',
    description: 'The essential boardroom and black-tie standard. Deepest pigmented dye with high colorfastness.',
    image: HERO_IMAGE
  },
  {
    id: 'beige',
    name: 'Riviera Sand Beige',
    count: '5 Styles',
    swatch: '#D4C3A3',
    description: 'Effortless Mediterranean resort flair. Ideal pairing for dark navy polos, loafers, and linen coats.',
    image: BEIGE_IMAGE
  },
  {
    id: 'navy',
    name: 'Midnight Navy',
    count: '7 Styles',
    swatch: '#1A2538',
    description: 'The supreme foundation for executive business wear. Pairs flawlessly with crisp white formal shirts.',
    image: NAVY_IMAGE
  },
  {
    id: 'offwhite',
    name: 'Pearl Off-White',
    count: '4 Styles',
    swatch: '#F4F1EA',
    description: 'High-fashion, pristine tailored ivory. Styled for modern wedding receptions, polo matches, and luxury galas.',
    image: BEIGE_IMAGE
  }
];

export const SIZE_MATRIX: SizeDimension[] = [
  {
    size: 28,
    exactWaist: '28.5 inches',
    thighCircumference: '22.0 inches',
    kneeWidth: '15.5 inches',
    ankleOpening: '13.5 inches',
    standardLength: '38.0 inches'
  },
  {
    size: 30,
    exactWaist: '30.5 inches',
    thighCircumference: '23.0 inches',
    kneeWidth: '16.0 inches',
    ankleOpening: '14.0 inches',
    standardLength: '39.0 inches'
  },
  {
    size: 32,
    exactWaist: '32.5 inches',
    thighCircumference: '24.0 inches',
    kneeWidth: '16.5 inches',
    ankleOpening: '14.5 inches',
    standardLength: '40.0 inches',
    isPopular: true
  },
  {
    size: 34,
    exactWaist: '34.5 inches',
    thighCircumference: '25.0 inches',
    kneeWidth: '17.0 inches',
    ankleOpening: '15.0 inches',
    standardLength: '40.5 inches'
  },
  {
    size: 36,
    exactWaist: '36.5 inches',
    thighCircumference: '26.0 inches',
    kneeWidth: '17.5 inches',
    ankleOpening: '15.5 inches',
    standardLength: '41.0 inches'
  },
  {
    size: 38,
    exactWaist: '38.5 inches',
    thighCircumference: '27.0 inches',
    kneeWidth: '18.0 inches',
    ankleOpening: '16.0 inches',
    standardLength: '41.5 inches'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    rating: 5,
    quote: '"The fabric quality genuinely matches Zara Man and Massimo Dutti pants I bought from Dubai Mall, but at ৳1,650 this value is unmatched. The cash on delivery courier arrived in Banani within 22 hours."',
    author: 'Tanvir Ahmed',
    location: 'Banani, Dhaka • Verified Buyer',
    verified: true,
    avatarText: 'TA'
  },
  {
    id: 'rev-2',
    rating: 5,
    quote: '"The waist fit and ankle taper is bespoke custom-tailor level without having to waste 3 weekends visiting Elephant Road. The internal rubber shirt-gripper really keeps my dress shirt tucked all day."',
    author: 'Rafid Hasan',
    location: 'Dhanmondi, Dhaka • Verified Buyer',
    verified: true,
    avatarText: 'RH'
  },
  {
    id: 'rev-3',
    rating: 5,
    quote: '"Delivery was prompt in Chittagong (৳130). Paid cash only after checking the stitching and trying the fit. Fabric feels heavy and expensive, doesn\'t wrinkle even after whole day courtroom hearings."',
    author: 'Mahmudur Rahman',
    location: 'Nasirabad, Chittagong • Verified Buyer',
    verified: true,
    avatarText: 'MR'
  }
];
