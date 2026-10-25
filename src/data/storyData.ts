import { StorySlide } from '../types';

export const storyData: StorySlide[] = [
  {
    id: 1,
    title: '1. Kota Makkah di Lembah Pegunungan Berbatu',
    subtitle: 'Awal Mula Perjuangan Dakwah Islam',
    narration: 'Kota Makkah terletak di sebuah lembah kering yang dikelilingi perbukitan tandus dan bebatuan hitam. Di lembah inilah Ka\'bah berdiri megah sebagai kiblat tauhid. Di tengah masyarakat Quraisy, Rasulullah SAW menyampaikan risalah kasih sayang, keadilan, dan persaudaraan.',
    historicalFact: 'Pada abad ke-7 Masehi, Makkah adalah pusat persimpangan jalur perdagangan penting antara Yaman di selatan dan Syam di utara.',
    altText: 'Lanskap lembah kota Makkah zaman dahulu dengan bukit-bukit batu gurun alami di bawah sinar matahari hangat.',
    sceneType: 'makkah',
    interactiveQuestion: {
      question: 'Berdasarkan kondisi alamnya, bagaimanakah keadaan geografis Kota Makkah?',
      options: [
        'Dikelilingi perbukitan batu tandus di dalam lembah kering',
        'Daerah rawa bersalju tebal',
        'Hutan tropis lebat yang selalu hujan'
      ],
      correctIndex: 0,
      explanation: 'Benar sekali! Makkah berada di lembah yang tandus dan dikelilingi pegunungan bebatuan cadas.'
    }
  },
  {
    id: 2,
    title: '2. Melangkah Rahasia Menuju Jabal Tsur',
    subtitle: 'Strategi Keluar dari Kepungan Musuh',
    narration: 'Malam itu begitu sunyi. Dengan pertolongan Allah SWT, Rasulullah SAW bersama sahabat karibnya Abu Bakar Ash-Shiddiq r.a. melangkah berhati-hati meninggalkan Makkah. Mereka tidak mengambil arah utara menuju Madinah, melainkan mendaki arah selatan menuju gunung tinggi berbatu bernama Jabal Tsur.',
    historicalFact: 'Jarak antara Makkah dan Jabal Tsur sekitar 5 kilometer ke arah selatan. Gunung ini memiliki bebatuan terjal yang sulit didaki.',
    altText: 'Siluet perbukitan batu Jabal Tsur di bawah taburan bintang malam dengan jalur setapak gurun yang sunyi.',
    sceneType: 'mountain_track',
    interactiveQuestion: {
      question: 'Mengapa Rasulullah dan Abu Bakar mengambil arah selatan ke Jabal Tsur?',
      options: [
        'Sebagai strategi pengecoh karena Madinah sebenarnya berada di arah utara',
        'Karena mereka tersesat di tengah malam',
        'Karena ingin membeli barang dagangan'
      ],
      correctIndex: 0,
      explanation: 'Tepat! Ini adalah strategi brilian untuk mengecoh pihak yang menduga rombongan langsung pergi ke utara.'
    }
  },
  {
    id: 3,
    title: '3. Keheningan di Mulut Gua Tsur',
    subtitle: 'Perlindungan Menenangkan di Celah Bebatuan',
    narration: 'Di dekat puncak bukit terdapat Gua Tsur, celah batu sempit yang aman dari pandangan. Selama tiga hari tiga malam, Nabi SAW dan Abu Bakar berlindung di sini. Allah menumbuhkan sarang laba-laba dan burung merpati yang bersarang di mulut gua, sehingga para pencari mengira gua ini telah lama tak tersentuh manusia.',
    historicalFact: 'Gua Tsur memiliki dua celah masuk yang sangat rendah, sehingga orang yang masuk harus merayap dengan hati-hati.',
    altText: 'Pintu masuk gua bebatuan alami di celah tebing karang dengan jaring laba-laba halus dan ranting semak gurun.',
    sceneType: 'cave_tsur',
    interactiveQuestion: {
      question: 'Tanda perlindungan apa yang menutupi pintu Gua Tsur dari pandangan musuh?',
      options: [
        'Sarang laba-laba dan burung merpati yang tenang di pintu gua',
        'Pintu besi yang sangat tebal',
        'Tumpukan batu bata buatan manusia'
      ],
      correctIndex: 0,
      explanation: 'Laba-laba dan burung merpati menjadi tanda kebesaran Allah yang melindungi mereka secara luar biasa.'
    }
  },
  {
    id: 4,
    title: '4. Menempuh Samudra Pasir dan Tebing Pesisir',
    subtitle: 'Perjalanan Berhari-hari Bersama Pemandu Ahli',
    narration: 'Setelah situasi aman, Abdullah bin Uraiqit datang membawa unta tunggangan. Mereka membelah hamparan gurun yang membara di siang hari dan menusuk dingin di malam hari. Mereka menyusuri tepian pesisir Laut Merah melewati rute yang terjal dan tersembunyi.',
    historicalFact: 'Jarak antara Makkah dan Madinah melalui rute pesisir ini mencapai lebih dari 450 kilometer, ditempuh selama berhari-hari.',
    altText: 'Hamparan bukit pasir keemasan dan pegunungan berbatu di bawah langit biru cerah dengan jejak kaki unta di atas pasir.',
    sceneType: 'desert_journey',
    interactiveQuestion: {
      question: 'Siapa yang menjadi pemandu ahli rute rahasia selama melintasi padang pasir?',
      options: [
        'Abdullah bin Uraiqit',
        'Penduduk kota Roma',
        'Pasukan berkuda Quraisy'
      ],
      correctIndex: 0,
      explanation: 'Hebat! Abdullah bin Uraiqit adalah penunjuk jalan yang sangat amanah dan ahli membaca rute padang pasir.'
    }
  },
  {
    id: 5,
    title: '5. Sejuknya Oasis dan Rindangnya Perkebunan Kurma',
    subtitle: 'Menatap Lembah Yatsrib yang Subur',
    narration: 'Setelah hari-hari melelahkan di gurun tandus, tampaklah pemandangan hijau dari kejauhan. Kota Yatsrib diberkahi dengan sumur-sumur air tawar dan ribuan pohon kurma yang berdaun rimbun. Udara sejuk menyapa para musafir yang telah menempuh perjalanan ratusan kilometer.',
    historicalFact: 'Berbeda dengan Makkah yang berbatu kering, Madinah sejak dahulu terkenal sebagai wilayah oasis pertanian yang subur.',
    altText: 'Lanskap pemukiman tradisional bersahaja dari tanah liat di antara rimbunnya kebun pohon kurma dan oasis air tawar.',
    sceneType: 'oasis_outskirts',
    interactiveQuestion: {
      question: 'Tanaman apa yang menjadi ciri khas kesuburan lembah Madinah?',
      options: [
        'Pohon kurma yang berbuah lebat di dekat mata air',
        'Pohon apel salju',
        'Pohon teh di pegunungan tinggi'
      ],
      correctIndex: 0,
      explanation: 'Madinah terkenal dengan kebun-kebun kurmanya yang manis dan hijau menyejukkan.'
    }
  },
  {
    id: 6,
    title: '6. Sukacita Sambutan Kaum Ansar',
    subtitle: 'Thala\'al Badru \'Alayna Bergema Indah',
    narration: 'Keluarga-keluarga di Madinah telah menunggu setiap hari di pinggiran kota. Ketika rombongan terlihat di kejauhan, seluruh kota bergetar dengan sukacita dan takbir. Anak-anak dan orang dewasa bernyanyi menyambut kedatangan Rasulullah SAW dengan senyuman tulus dan air mata bahagia.',
    historicalFact: 'Syair legendaris "Thala\'al Badru \'Alayna" (Bulan purnama telah terbit menyinari kami) dilantunkan saat menyambut kedatangan Nabi SAW.',
    altText: 'Suasana gerbang pemukiman tradisional Madinah dihiasi pepohonan kurma dengan suasana kehangatan warga bersahaja.',
    sceneType: 'ansar_welcome',
    interactiveQuestion: {
      question: 'Bagaimanakah sikap penduduk Madinah (Kaum Ansar) saat rombongan tiba?',
      options: [
        'Menyambut dengan penuh kehangatan, sukacita, dan kebahagiaan mendalam',
        'Mengunci pintu rumah dan bersembunyi',
        'Meminta rombongan segera kembali ke Makkah'
      ],
      correctIndex: 0,
      explanation: 'Kaum Ansar menunjukkan teladan keramahtamahan tertinggi dalam menyambut tamu dan saudara seiman.'
    }
  },
  {
    id: 7,
    title: '7. Membangun Masjid Nabawi yang Bersahaja',
    subtitle: 'Pondasi Persatuan dan Peradaban Mulia',
    narration: 'Bersama-sama, kaum Muhajirin dan kaum Ansar bergotong royong mendirikan Masjid Nabawi. Rasulullah SAW turut mengangkat batu dan batang kurma bersama sahabat-sahabatnya. Masjid ini sangat sederhana beratap pelepah kurma, namun memancarkan cahaya ilmu, kasih sayang, dan keadilan bagi semesta.',
    historicalFact: 'Unta Rasulullah SAW berhenti di tanah milik dua anak yatim bernama Sahl dan Suhail. Rasulullah membeli tanah tersebut dengan harga yang adil.',
    altText: 'Ilustrasi arsitektur dinding tanah liat dan tiang-tiang batang kurma bersahaja dari Masjid Nabawi masa awal abad ke-7.',
    sceneType: 'nabawi_building',
    interactiveQuestion: {
      question: 'Bahan alami apa yang digunakan untuk tiang dan atap awal Masjid Nabawi?',
      options: [
        'Batang dan pelepah pohon kurma yang bersahaja',
        'Besi baja modern berkilau',
        'Kaca patri warna-warni'
      ],
      correctIndex: 0,
      explanation: 'Masjid Nabawi di masa awal sangat bersahaja, melambangkan kerendahan hati dan ketakwaan sejati.'
    }
  },
  {
    id: 8,
    title: '8. Teladan Persaudaraan Sepanjang Masa',
    subtitle: 'Membawa Semangat Hijrah ke Sekolah Kita Hari Ini',
    narration: 'Kisah persaudaraan Muhajirin dan Ansar mengajarkan kita arti sejati dari persaudaraan. Hari ini di sekolah kita, ketika ada teman yang kesulitan, teman yang bersedih, atau teman baru yang belum punya kawan bermain, kita bisa menjadi "penolong" yang ramah dan penuh cinta seperti kaum Ansar.',
    historicalFact: 'Piagam Madinah menjamin hak setiap warga kota untuk hidup rukun, tolong-menolong, dan saling menghormati keberagaman.',
    altText: 'Ilustrasi anak-anak sekolah yang tersenyum riang belajar bersama, saling berbagi buku dan membantu teman baru.',
    sceneType: 'brotherhood_today',
    interactiveQuestion: {
      question: 'Bagaimana cara kita meneladani kaum Ansar di lingkungan kelas hari ini?',
      options: [
        'Suka menyapa, berbagi, dan mengajak teman baru bermain dengan gembira',
        'Memilih-milih teman hanya yang kaya saja',
        'Mengejek teman yang sedang kesulitan'
      ],
      correctIndex: 0,
      explanation: 'Luar biasa! Sikap peduli dan bersahabat adalah wujud nyata nilai hijrah di masa sekarang.'
    }
  }
];
