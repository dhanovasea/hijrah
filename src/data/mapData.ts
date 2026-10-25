import { JourneyStop } from '../types';

export const mapData: JourneyStop[] = [
  {
    id: 'makkah',
    stepNumber: 1,
    name: 'Kota Makkah',
    historicalName: 'Bakkah / Ummul Qura',
    subtitle: 'Titik Awal Keberangkatan yang Penuh Ujian',
    distanceInfo: 'Titik Awal (0 km)',
    description: 'Kota kelahiran Nabi Muhammad SAW dan tempat Ka\'bah berdiri. Di kota ini, kaum Muslimin mengalami ujian dakwah berat sebelum akhirnya turun perintah Allah untuk berhijrah.',
    eventDetails: [
      'Pengepungan rumah Nabi oleh pemuda-pemuda penentang dakwah.',
      'Ali bin Abi Thalib r.a. rela menggantikan tidur di ranjang Rasulullah untuk mengecoh musuh.',
      'Rasulullah SAW keluar dari rumah dengan perlindungan Allah sambil membaca firman-Nya.'
    ],
    moralLesson: 'Keberanian menegakkan kebenaran dan ketenangan hati saat menghadapi rintangan.',
    coordinates: { x: 28, y: 80 },
    quiz: {
      question: 'Apa peran Ali bin Abi Thalib di Makkah pada malam keberangkatan hijrah?',
      options: ['Menggantikan tidur di tempat tidur Nabi untuk mengecoh pengepung', 'Menjadi pemandu jalan', 'Membeli perahu di pelabuhan'],
      correctIndex: 0,
      feedback: 'Ali r.a. memperlihatkan keberanian luar biasa dalam mengemban tugas mulia ini.'
    }
  },
  {
    id: 'tsur',
    stepNumber: 2,
    name: 'Jabal & Gua Tsur',
    historicalName: 'Ghar Tsawr',
    subtitle: 'Persembunyian Tiga Hari Tiga Malam',
    distanceInfo: '± 5 km ke arah Selatan Makkah',
    description: 'Sebuah gunung berbatu terjal di sebelah selatan Makkah. Rasulullah SAW dan Abu Bakar Ash-Shiddiq sengaja menuju ke arah yang berlawanan dengan arah Madinah untuk mengelabui pengejaran.',
    eventDetails: [
      'Abu Bakar Ash-Shiddiq membersihkan dan memeriksa gua terlebih dahulu demi memastikan keselamatan Nabi.',
      'Bersembunyi selama tiga hari tiga malam.',
      'Abdullah bin Abu Bakar menyampaikan kabar dan situasi Makkah setiap malam.',
      'Asma binti Abu Bakar mengantar makanan dan bekal ke atas bukit.',
      'Amir bin Fuhairah menggembala kambing untuk menghapus jejak kaki di pasir.'
    ],
    moralLesson: 'Perencanaan yang sangat rapi diiringi kepasrahan (tawakal) bulat kepada Allah SWT.',
    coordinates: { x: 30, y: 88 },
    quiz: {
      question: 'Berapa lama Rasulullah SAW dan Abu Bakar bersembunyi di Gua Tsur?',
      options: ['3 hari 3 malam', '1 bulan penuh', 'Hanya 1 jam saja'],
      correctIndex: 0,
      feedback: 'Selama 3 hari 3 malam di Gua Tsur, rombongan menunggu situasi Makkah menjadi lebih tenang.'
    }
  },
  {
    id: 'pesisir',
    stepNumber: 3,
    name: 'Jalur Pesisir Laut Merah',
    historicalName: 'Thariq As-Sahil',
    subtitle: 'Rute Rahasia Menembus Padang Pasir',
    distanceInfo: '± 350 km melintasi pesisir barat',
    description: 'Rute yang jarang dilewati oleh kafilah dagang biasa. Jalurnya terjal, berbukit karang, dan kering, namun jauh lebih aman dari patroli musuh.',
    eventDetails: [
      'Dipandu oleh Abdullah bin Uraiqit, seorang penunjuk jalan berpengalaman yang amanah.',
      'Menempuh perjalanan di bawah teriknya siang hari dan dinginnya angin gurun di malam hari.',
      'Suraqah bin Malik sempat mengejar mereka karena tergiur sayembara hadiah 100 unta, namun kudanya terperosok ke dalam pasir atas izin Allah.'
    ],
    moralLesson: 'Menghargai keahlian orang lain dan pantang mengeluh di tengah perjalanan yang berat.',
    coordinates: { x: 18, y: 52 },
    quiz: {
      question: 'Siapa yang memandu perjalanan melewati jalur pesisir ini?',
      options: ['Abdullah bin Uraiqit', 'Musafir Romawi', 'Pedagang dari Mesir'],
      correctIndex: 0,
      feedback: 'Abdullah bin Uraiqit adalah pemandu terpercaya yang sangat ahli rute gurun dan pesisir.'
    }
  },
  {
    id: 'quba',
    stepNumber: 4,
    name: 'Desa Quba',
    historicalName: 'Quba\'',
    subtitle: 'Singgah dan Mendirikan Masjid Pertama',
    distanceInfo: '± 5 km sebelum Pusat Madinah',
    description: 'Sebuah perkampungan subur di pinggiran selatan Madinah. Di tempat inilah Rasulullah beristirahat selama beberapa hari sebelum memasuki jantung kota.',
    eventDetails: [
      'Disambut hangat oleh kabilah Bani Amr bin Auf.',
      'Mendirikan Masjid Quba, masjid pertama yang dibangun dalam sejarah Islam atas dasar ketakwaan.',
      'Ali bin Abi Thalib menyusul tiba di Quba setelah berjalan kaki dari Makkah dengan kaki yang lecet.'
    ],
    moralLesson: 'Mengutamakan pembangunan tempat ibadah dan pusat kebaikan sebelum urusan duniawi.',
    coordinates: { x: 48, y: 24 },
    quiz: {
      question: 'Apa nama masjid pertama yang dibangun Rasulullah SAW saat singgah di Quba?',
      options: ['Masjid Quba', 'Masjid Al-Aqsa', 'Masjid Al-Azhar'],
      correctIndex: 0,
      feedback: 'Masjid Quba adalah masjid bersejarah pertama yang dibangun atas dasar ketakwaan.'
    }
  },
  {
    id: 'madinah',
    stepNumber: 5,
    name: 'Kota Madinah',
    historicalName: 'Yatsrib / Madinah al-Munawwarah',
    subtitle: 'Pintu Gerbang Peradaban Kasih Sayang & Persaudaraan',
    distanceInfo: 'Tujuan Akhir (± 450 km dari Makkah)',
    description: 'Kota tujuan hijrah yang penuh berkah. Di sini, masyarakat menyambut Rasulullah dengan kegembiraan yang meluap dan memulai lembaran baru masyarakat Islam yang damai dan beradab.',
    eventDetails: [
      'Gema puji-pujian Thala\'al Badru \'Alayna dari anak-anak dan warga Madinah.',
      'Mempersaudarakan kaum Muhajirin dan kaum Ansar.',
      'Pembangunan Masjid Nabawi dan penyusunan Piagam Madinah untuk hidup berdampingan secara damai.'
    ],
    moralLesson: 'Toleransi, persaudaraan yang tulus, dan saling menolong tanpa pamrih.',
    coordinates: { x: 55, y: 14 },
    quiz: {
      question: 'Bagaimana kaum Ansar menyambut kedatangan kaum Muhajirin di Madinah?',
      options: ['Membagi rumah, makanan, ladang, dan menyambut dengan penuh cinta persaudaraan', 'Meminta mereka tinggal di luar tembok kota', 'Meminta bayaran sewa yang mahal'],
      correctIndex: 0,
      feedback: 'Kaum Ansar meneladankan ketulusan persaudaraan dan kedermawanan luar biasa.'
    }
  }
];
