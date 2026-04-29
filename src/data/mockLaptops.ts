export interface Laptop {
  id: string;
  name: string;
  price: number;
  image: string;
  short_description: string;
  performance_badge: 'Basic' | 'Smooth' | 'Powerful';
  performance_score: number; // 1-100
  use_case_tags: string[];
  specs: {
    cpu: { raw: string; human: string };
    gpu: { raw: string; human: string };
    ram: { raw: string; human: string };
    storage: { raw: string; human: string };
    screen: { raw: string; human: string };
    battery: { raw: string; human: string };
    cooling: { raw: string; human: string };
    ports: { raw: string; human: string };
  };
  real_images: string[];
  reviews: { user: string; rating: number; text: string }[];
  video_url?: string;
}

export const LAPTOPS: Laptop[] = [
  {
    id: 'l1',
    name: 'Asus Vivobook Go 14',
    price: 6500000,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    short_description: 'Sangat lancar untuk ngetik tugas dan browsing berjam-jam.',
    performance_badge: 'Basic',
    performance_score: 55,
    use_case_tags: ['Laptop untuk Kuliah', 'Laptop untuk Office'],
    specs: {
      cpu: { raw: 'AMD Ryzen 3 7320U', human: 'Cepat untuk tugas sehari-hari & browsing' },
      gpu: { raw: 'AMD Radeon Graphics', human: 'Cukup untuk nonton film HD & presentasi' },
      ram: { raw: '8GB DDR5', human: 'Bisa buka 10-15 tab browser sekaligus' },
      storage: { raw: '512GB NVMe', human: 'Muat ribuan file dokumen dan foto' },
      screen: { raw: '14" FHD (1920 x 1080)', human: 'Nyaman di mata untuk baca teks lama' },
      battery: { raw: '42WHrs', human: 'Tahan hingga 6-8 jam pemakaian normal' },
      cooling: { raw: 'Single Fan', human: 'Hening dan tidak cepat panas untuk tugas ringan' },
      ports: { raw: '1x USB-C, 2x USB-A, 1x HDMI', human: 'Lengkap untuk colok flashdisk & proyektor' },
    },
    real_images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80'
    ],
    reviews: [
      { user: 'Siti R.', rating: 5, text: 'Baterainya awet banget buat dibawa ngampus seharian tanpa charger.' },
      { user: 'Budi Hartono', rating: 4, text: 'Layar cukup jelas, buat ngetik word dan excel lancar jaya.' },
    ],
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'l2',
    name: 'Lenovo IdeaPad Slim 5',
    price: 11500000,
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=800&q=80',
    short_description: 'Gesit untuk multitasking, coding, dan editing ringan.',
    performance_badge: 'Smooth',
    performance_score: 75,
    use_case_tags: ['Laptop untuk Kuliah', 'Laptop untuk Coding', 'Laptop untuk Office'],
    specs: {
      cpu: { raw: 'Intel Core i5-12450H', human: 'Sangat responsif untuk multitasking berat' },
      gpu: { raw: 'Intel UHD Graphics', human: 'Mulus untuk desain presentasi & edit foto ringan' },
      ram: { raw: '16GB LPDDR5', human: 'Sangat lega, lancar buka 30+ tab & aplikasi berat bersamaan' },
      storage: { raw: '512GB SSD Gen 4', human: 'Loading aplikasi dan hidupkan laptop sangat cepat' },
      screen: { raw: '14" WUXGA OLED', human: 'Warna sangat tajam dan hidup, enak buat nonton film' },
      battery: { raw: '56.6Wh', human: 'Tahan seharian di kafe (sekitar 8-10 jam)' },
      cooling: { raw: 'Dual-Fan Cooling', human: 'Tetap adem meski dipakai buka program berat' },
      ports: { raw: '2x USB-C (PD/DP), 2x USB-A, HDMI, MicroSD', human: 'Bisa ngecas pakai powerbank laptop & dual monitor' },
    },
    real_images: [
      'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&w=400&q=80'
    ],
    reviews: [
      { user: 'Andi S.', rating: 5, text: 'Layar OLED-nya juara banget, warna hitamnya pekat.' },
      { user: 'Rina D.', rating: 5, text: 'Buat ngoding VS Code dan jalanin docker masih enteng.' },
    ]
  },
  {
    id: 'l3',
    name: 'Apple MacBook Air M2',
    price: 17500000,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    short_description: 'Ringan, mewah, sangat cepat dengan baterai super awet.',
    performance_badge: 'Powerful',
    performance_score: 90,
    use_case_tags: ['Laptop untuk Desain', 'Laptop untuk Coding', 'Laptop untuk Office'],
    specs: {
      cpu: { raw: 'Apple M2 Chip', human: 'Performa monster dalam bodi super tipis' },
      gpu: { raw: '8-core Apple GPU', human: 'Lancar edit video 4K & desain grafis profesional' },
      ram: { raw: '8GB Unified Memory', human: 'Beda dengan RAM biasa, terasa seperti 16GB untuk multitasking' },
      storage: { raw: '256GB SSD', human: 'Ruang cukup untuk software dan file kerja penting' },
      screen: { raw: '13.6" Liquid Retina', human: 'Kualitas kelas pro, warna paling akurat untuk desain' },
      battery: { raw: '52.6Wh', human: 'Tahan luar biasa hingga 15 jam, bebas charger seharian' },
      cooling: { raw: 'Fanless Design', human: 'Sama sekali tidak bersuara (0 dB), tapi tidak mudah panas' },
      ports: { raw: '2x Thunderbolt / USB 4, MagSafe 3', human: 'Koneksi super cepat tapi colokan USB terbatas (butuh dongle)' },
    },
    real_images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=400&q=80'
    ],
    reviews: [
      { user: 'Diana F.', rating: 5, text: 'Paling puas sama desain tipisnya. Kalau buat jualan presentasi ke klien ini keren abis.' }
    ]
  },
  {
    id: 'l4',
    name: 'Acer Nitro V 15',
    price: 14000000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    short_description: 'Siap libas game berat dan rendering video resolusi tinggi.',
    performance_badge: 'Powerful',
    performance_score: 88,
    use_case_tags: ['Laptop untuk Gaming', 'Laptop untuk Desain'],
    specs: {
      cpu: { raw: 'Intel Core i5-13420H', human: 'Kinerja maksimal untuk gaming & proses beban tinggi' },
      gpu: { raw: 'NVIDIA RTX 4050 6GB', human: 'Grafis super mulus untuk game AAA zaman sekarang & rendering 3D' },
      ram: { raw: '16GB DDR5 5200MHz', human: 'Sangat responsif, jamin main game tidak ngelag' },
      storage: { raw: '512GB PCIe Gen4', human: 'Bisa simpan sekitar 5-8 game ukuran besar' },
      screen: { raw: '15.6" FHD 144Hz', human: 'Pergerakan di layar sangat halus (144Hz), penting buat game tembak-tembakan' },
      battery: { raw: '57Wh', human: 'Standar gaming, tahan 3-4 jam (wajib colok saat main game)' },
      cooling: { raw: 'Dual-Fan, Quad-Exhaust', human: 'Sistem pendingin gahar agar performa tidak drop saat main lama (agak berisik)' },
      ports: { raw: '1x Thunderbolt 4, 3x USB-A, HDMI 2.1, RJ45', human: 'Bisa colok LAN untuk internet ngebut & monitor external' },
    },
    real_images: [
      'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=400&q=80'
    ],
    reviews: [
      { user: 'Reza R.', rating: 5, text: 'Buat main Valorant dapet fps 200+. Adem juga dimaenin berjam-jam.' },
      { user: 'Dimas A.', rating: 4, text: 'Baterai agak boros sih kalau ga dicolok, tapi ya wajar laptop gaming.' }
    ]
  },
  {
    id: 'l5',
    name: 'HP Pavilion Aero 13',
    price: 12500000,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    short_description: 'Laptop paling ringan, cocok untuk yang sering kerja di jalan.',
    performance_badge: 'Smooth',
    performance_score: 72,
    use_case_tags: ['Laptop untuk Office', 'Laptop untuk Kuliah'],
    specs: {
      cpu: { raw: 'AMD Ryzen 5 7535U', human: 'Gesit buat kerja kantoran, ketik-ketik, dan meeting online' },
      gpu: { raw: 'AMD Radeon 660M', human: 'Lancar buat edit foto canva & lightroom' },
      ram: { raw: '16GB Onboard', human: 'Aman buka banyak aplikasi barengan tanpa lag' },
      storage: { raw: '512GB SSD', human: 'Kapasitas yang sangat cukup untuk kerja dokumen' },
      screen: { raw: '13.3" WUXGA', human: 'Layar cerah & bezel tipis, tulisan kelihat tajam' },
      battery: { raw: '43 Wh Li-ion polymer', human: 'Lumayan awet, sekitar 6-8 jam buat meeting nyambung terus' },
      cooling: { raw: 'Standard Fan', human: 'Kipas cukup tenang, tidak ganggu orang sebelah saat di perpus' },
      ports: { raw: '1x USB-C, 2x USB-A, 1x HDMI', human: 'Colokan standar sudah lengkap' },
    },
    real_images: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&q=80'
    ],
    reviews: [
      { user: 'Tia M.', rating: 5, text: 'Serius ini enteng banget, cuma 1kg kurang. Enggak berasa bawa laptop.' }
    ]
  }
];
