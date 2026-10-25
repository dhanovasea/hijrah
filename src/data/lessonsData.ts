import { LessonChapter } from '../types';

export const lessonsData: LessonChapter[] = [
  {
    id: 1,
    title: 'Bab 1 — Apa Itu Hijrah?',
    subtitle: 'Mengenal arti perpindahan bersejarah yang mengubah peradaban dunia',
    readTime: '3 Menit',
    summary: 'Hijrah adalah perpindahan Nabi Muhammad SAW dan kaum Muslimin dari Kota Makkah ke Kota Madinah pada tahun 622 Masehi demi menjaga keimanan dan beribadah dengan aman.',
    content: [
      'Kata "Hijrah" secara bahasa berarti berpindah atau meninggalkan sesuatu.',
      'Dalam sejarah Islam, hijrah yang agung merujuk pada peristiwa perpindahan Nabi Muhammad SAW bersama para sahabat tercinta dari Kota Makkah menuju Kota Yatsrib (yang kemudian dinamai Madinah al-Munawwarah).',
      'Peristiwa penting ini terjadi pada tahun 622 Masehi atas perintah Allah SWT.',
      'Tahukah kamu? Peristiwa hijrah ini begitu penting dan bersejarah, sehingga di masa Khalifah Umar bin Khattab r.a., tahun terjadinya hijrah disepakati sebagai tahun pertama dalam penanggalan kalender Islam, yaitu Kalender Hijriah!'
    ],
    teaser: {
      question: 'Menurutmu, mengapa seseorang terkadang harus meninggalkan tempat yang sudah dikenalnya demi tujuan yang baik?',
      options: [
        'A. Karena ingin mencari tempat liburan yang seru dan bermain seharian.',
        'B. Demi menjaga keselamatan, keimanan, dan meraih kebaikan bersama di tempat baru.',
        'C. Karena sekadar bosan dan tidak ingin belajar lagi di tempat lama.'
      ],
      correctIndex: 1,
      explanation: 'Tepat sekali! Meninggalkan tempat yang dicintai memang berat, namun demi tujuan mulia—seperti menjaga agama Allah, melindungi sesama, dan membangun masyarakat damai—diperlukan tekad dan keberanian yang tulus.'
    }
  },
  {
    id: 2,
    title: 'Bab 2 — Mengapa Kaum Muslimin Berhijrah?',
    subtitle: 'Sebab, tujuan mulia, dan alasan di balik langkah penuh keberanian',
    readTime: '4 Menit',
    summary: 'Kaum Muslimin berhijrah karena tekanan di Makkah semakin keras, sementara penduduk Madinah telah beriman dan mengundang Rasulullah SAW untuk tinggal bersama mereka dengan aman.',
    content: [
      'Di Kota Makkah, kaum Muslimin awal mengalami ujian yang amat berat. Sebagian dari kaum Quraisy menolak ajaran tauhid dan melakukan boikot, celaan, hingga kekerasan fisik terhadap orang-orang beriman.',
      'Penting diingat: Kita tidak boleh menyamakan semua penduduk Makkah atau seluruh kaum Quraisy. Sebagian dari mereka ada yang bersikap adil, melindungi kerabat, atau bahkan kelak memeluk Islam dengan hati lapang.',
      'Pada musim haji, utusan dari penduduk kota Yatsrib (sekarang Madinah) bertemu dengan Nabi Muhammad SAW. Mereka mendengarkan ayat-ayat Al-Quran, beriman, lalu mengundang beliau dan kaum Muslimin untuk datang ke kota mereka (Peristiwa Baiat Aqabah).',
      'Penduduk Madinah berjanji akan menyambut dan melindungi kaum Muslimin seperti melindungi keluarga mereka sendiri.',
      'Hijrah bukan sekadar pindah rumah atau melarikan diri, melainkan strategi besar yang membutuhkan keberanian, kesabaran yang kokoh, dan perencanaan yang matang demi masa depan dakwah Islam.'
    ]
  },
  {
    id: 3,
    title: 'Bab 3 — Siapa Saja Tokoh Pentingnya?',
    subtitle: 'Mengenal para pejuang mulia yang saling melengkapi dalam perjuangan',
    readTime: '5 Menit',
    summary: 'Perjalanan hijrah melibatkan kerja sama luar biasa antara Rasulullah SAW, para sahabat setia, para pemuda cerdas, kaum wanita yang tangguh, hingga penunjuk jalan yang amanah.',
    content: [
      'Keberhasilan hijrah adalah buah dari pertolongan Allah SWT yang diiringi dengan perencanaan teliti serta kerja sama antar-sahabat dengan keahliannya masing-masing.',
      'Buka setiap kartu tokoh di bawah ini untuk mempelajari peran mulia mereka dalam perjalanan bersejarah ini!'
    ],
    characters: [
      {
        id: 'nabi',
        name: 'Nabi Muhammad SAW',
        roleTitle: 'Pemimpin Agung & Rasulullah',
        description: 'Rasulullah SAW memimpin seluruh proses hijrah atas wahyu Allah SWT. Beliau merencanakan strategi rahasia, menunjukkan keteladanan tawakal tertinggi, dan memandu umat menuju peradaban baru yang adil di Madinah.',
        iconName: 'Compass',
        question: 'Bagaimana sikap Nabi Muhammad SAW saat menghadapi ancaman sebelum hijrah?',
        options: ['Tetap tenang, membuat perencanaan matang, dan bertawakal penuh kepada Allah SWT', 'Panik dan marah-marah', 'Langsung menyerah tanpa berusaha'],
        correctIndex: 0,
        explanation: 'Rasulullah SAW mengajarkan kita untuk selalu berikhtiar sungguh-sungguh lalu berserah diri (tawakal) kepada Allah SWT.'
      },
      {
        id: 'abubakar',
        name: 'Abu Bakar Ash-Shiddiq r.a.',
        roleTitle: 'Sahabat Sejati Perjalanan Hijrah',
        description: 'Sahabat yang paling setia menemani Nabi Muhammad SAW sepanjang perjalanan yang berbahaya. Beliau mempersiapkan dua ekor unta terbaik dan menjaga Rasulullah dengan penuh kasih sayang di Gua Tsur.',
        iconName: 'HeartHandshake',
        question: 'Apa peran utama Abu Bakar Ash-Shiddiq dalam peristiwa hijrah?',
        options: ['Menjadi pemandu jalan dari Syam', 'Setia menemani, menjaga, dan mempersiapkan perbekalan perjalanan hijrah bersama Rasulullah', 'Tinggal diam di Makkah tanpa membantu'],
        correctIndex: 1,
        explanation: 'Abu Bakar adalah teladan sahabat sejati yang siap mengorbankan harta dan jiwanya demi mendampingi Rasulullah SAW.'
      },
      {
        id: 'ali',
        name: 'Ali bin Abi Thalib r.a.',
        roleTitle: 'Pemuda Pemberani Pengemban Amanah',
        description: 'Pemuda yang sangat berani. Beliau rela tidur di ranjang Rasulullah SAW pada malam pengepungan untuk mengecoh musuh, serta menuntaskan amanah mengembalikan barang-barang titipan penduduk Makkah sebelum menyusul hijrah.',
        iconName: 'Shield',
        question: 'Tugas mulia apa yang dijalankan Ali bin Abi Thalib sebelum menyusul ke Madinah?',
        options: ['Mengembalikan barang-barang titipan penduduk Makkah secara amanah', 'Membeli rumah baru di Makkah', 'Bersembunyi dan tidak menemui siapa pun'],
        correctIndex: 0,
        explanation: 'Meskipun sebagian penduduk Makkah menentang dakwah, Rasulullah dan Ali r.a. tetap menjaga amanah dan mengembalikan seluruh barang titipan.'
      },
      {
        id: 'asma',
        name: 'Asma binti Abu Bakar r.a.',
        roleTitle: 'Dzatun Nithaqain (Penyedia Bekal yang Tangguh)',
        description: 'Putri Abu Bakar yang pemberani. Beliau bertugas membawakan makanan dan bekal ke Gua Tsur pada malam hari. Beliau merobek ikat pinggangnya menjadi dua untuk mengikat wadah makanan dan tempat air minum.',
        iconName: 'PackageCheck',
        question: 'Mengapa Asma binti Abu Bakar dijuluki Dzatun Nithaqain (Pemilik Dua Ikat Pinggang)?',
        options: ['Karena mengoleksi pakaian', 'Karena membelah ikat pinggangnya untuk mengikat bekal Rasulullah dan Abu Bakar ke Gua Tsur', 'Karena memenangkan lomba di Makkah'],
        correctIndex: 1,
        explanation: 'Keberanian dan kecerdasan Sayyidah Asma r.a. menunjukkan peran luar biasa kaum wanita dalam perjuangan dakwah Islam.'
      },
      {
        id: 'abdullah_abubakar',
        name: 'Abdullah bin Abu Bakar r.a.',
        roleTitle: 'Pencari Kabar & Informasi Penting',
        description: 'Putra Abu Bakar yang cerdas. Pada siang hari ia berbaur dengan masyarakat Makkah untuk mendengar rencana musuh, lalu saat malam tiba ia mendaki ke Gua Tsur untuk mengabarkan informasi penting kepada Rasulullah dan ayahnya.',
        iconName: 'MessageSquare',
        question: 'Apa tugas penting yang dijalankan Abdullah bin Abu Bakar?',
        options: ['Menjual dagangan ke pasar', 'Menyampaikan informasi penting dan situasi di Makkah kepada Rasulullah di Gua Tsur', 'Membuat perahu nelayan'],
        correctIndex: 1,
        explanation: 'Informasi akurat sangat menentukan keselamatan perjalanan rahasia hijrah.'
      },
      {
        id: 'amir',
        name: 'Amir bin Fuhairah r.a.',
        roleTitle: 'Penggembala yang Menyamarkan Jejak',
        description: 'Sahabat yang menggembalakan kambing-kambing Abu Bakar di sekitar jalur Gua Tsur. Kambing-kambing ini menghasilkan susu segar untuk bekal, sekaligus jejak kakinya menghapus bekas tapak langkah Asma dan Abdullah di pasir.',
        iconName: 'Footprints',
        question: 'Bagaimana peran domba/kambing yang digembalakan Amir bin Fuhairah?',
        options: ['Menghapus jejak kaki di pasir dan menyediakan susu segar untuk diminum', 'Menjadi penarik gerobak besar', 'Dibawa ke Madinah untuk dijual kembali'],
        correctIndex: 0,
        explanation: 'Ini membuktikan betapa telitinya perencanaan hijrah Nabi Muhammad SAW dalam menyamarkan jejak dari kejaran musuh.'
      },
      {
        id: 'uraiqit',
        name: 'Abdullah bin Uraiqit',
        roleTitle: 'Penunjuk Jalan yang Terpercaya',
        description: 'Seorang ahli rute padang pasir yang sangat hafal jalur-jalur rahasia dan tidak lazim di pesisir barat Jazirah Arab. Meskipun saat itu belum memeluk Islam, beliau sangat jujur, amanah, dan dapat dipercaya memandu rombongan dengan selamat.',
        iconName: 'MapPin',
        question: 'Apa pelajaran penting dari dilibatkannya Abdullah bin Uraiqit sebagai penunjuk jalan?',
        options: ['Bekerja sama secara profesional dan saling menghormati dengan orang yang amanah dan ahli di bidangnya', 'Jangan pernah mempekerjakan pemandu jalan', 'Hanya berjalan di jalan raya yang ramai'],
        correctIndex: 0,
        explanation: 'Rasulullah menghargai keahlian dan kejujuran seseorang serta menunjukkan sikap inklusif dan kerja sama yang berlandaskan saling percaya.'
      },
      {
        id: 'ansar',
        name: 'Kaum Ansar',
        roleTitle: 'Penduduk Madinah yang Menolong',
        description: 'Penduduk asli Madinah (suku Aus dan Khazraj) yang telah memeluk Islam dan menyambut saudara-saudara seiman dari Makkah dengan hati terbuka, berbagi rumah, makanan, ladang, dan perlindungan.',
        iconName: 'Home',
        question: 'Siapakah yang dimaksud dengan Kaum Ansar?',
        options: ['Penduduk Madinah yang menyambut dan menolong saudara seiman yang berhijrah', 'Pedagang asing dari negeri Romawi', 'Rombongan musafir yang tersesat di gurun'],
        correctIndex: 0,
        explanation: 'Kata "Ansar" berarti para penolong. Mereka menjadi teladan kemurahan hati dan persaudaraan tanpa pamrih.'
      },
      {
        id: 'muhajirin',
        name: 'Kaum Muhajirin',
        roleTitle: 'Para Pejuang yang Berhijrah',
        description: 'Kaum Muslimin yang meninggalkan rumah, keluarga, dan harta benda mereka di Makkah demi mempertahankan keimanan kepada Allah SWT dan mengikuti seruan Rasulullah SAW ke Madinah.',
        iconName: 'Users',
        question: 'Siapakah Kaum Muhajirin?',
        options: ['Orang-orang yang berhijrah dari Makkah ke Madinah karena Allah SWT', 'Penduduk asli kota Madinah', 'Pengawal istana raja'],
        correctIndex: 0,
        explanation: 'Muhajirin rela berkorban demi keyakinan mereka dan menjadi teladan kesabaran serta keteguhan iman.'
      }
    ]
  },
  {
    id: 4,
    title: 'Bab 4 — Perjalanan Hijrah dan Gua Tsur',
    subtitle: 'Menelusuri jejak langkah keteguhan di celah bebatuan dan hamparan pasir',
    readTime: '6 Menit',
    summary: 'Rute hijrah dirancang dengan sangat cerdas: menuju arah selatan ke Gua Tsur terlebih dahulu untuk mengecoh pengejaran, baru kemudian bergerak ke utara menuju Madinah melalui jalan pantai.',
    content: [
      'Jalan biasa dari Makkah ke Madinah mengarah ke utara. Namun, Rasulullah SAW dan Abu Bakar r.a. bergerak ke arah selatan menuju Jabal Tsur untuk mengecoh orang-orang yang mengejar.',
      'Di Gua Tsur, mereka bersembunyi selama tiga malam dengan penuh ketenangan dan perlindungan Allah SWT.',
      'Setelah situasi aman, Abdullah bin Uraiqit membawakan dua unta yang telah disiapkan, lalu memandu mereka melewati jalur pesisir Laut Merah yang terjal dan sepi.'
    ],
    scenes: [
      {
        step: 1,
        title: 'Malam Keberangkatan dari Makkah',
        description: 'Saat rumah beliau dikepung, Nabi Muhammad SAW keluar dengan tenang membaca doa dan ayat Al-Quran. Ali r.a. menggantikan beliau di ranjang untuk mengecoh pengepung.',
        question: 'Siapa yang menggantikan tidur di ranjang Rasulullah malam itu?',
        options: ['Ali bin Abi Thalib r.a.', 'Umar bin Khattab r.a.', 'Bilal bin Rabah r.a.'],
        correctIndex: 0
      },
      {
        step: 2,
        title: 'Mendaki ke Puncak Jabal Tsur',
        description: 'Rasulullah SAW bersama Abu Bakar Ash-Shiddiq menaiki gunung bebatuan yang curam di selatan Makkah demi mencari tempat perlindungan yang tidak disangka oleh musuh.',
        question: 'Ke arah manakah Jabal Tsur berada dari kota Makkah?',
        options: ['Arah selatan (arah berlawanan dari Madinah)', 'Langsung lurus ke utara menuju Madinah', 'Ke arah timur menuju padang pasir kosong'],
        correctIndex: 0
      },
      {
        step: 3,
        title: 'Perlindungan Menakjubkan di Gua Tsur',
        description: 'Ketika para pengejar sampai tepat di depan mulut gua, Abu Bakar merasa khawatir akan keselamatan Rasulullah. Nabi SAW menenangkannya dengan lembut: "Jangan berduka cita, sesungguhnya Allah bersama kita." Allah melindungi mereka dengan sarang laba-laba dan burung merpati yang bersarang di pintu gua.',
        question: 'Pesan menenangkan apa yang diucapkan Rasulullah kepada Abu Bakar di Gua Tsur?',
        options: ['"Jangan berduka cita, sesungguhnya Allah bersama kita"', '"Kita harus segera berlari keluar"', '"Semoga mereka tidak melihat kita"'],
        correctIndex: 0
      },
      {
        step: 4,
        title: 'Melintasi Jalur Pesisir yang Jarang Dilewati',
        description: 'Dengan bantuan penunjuk jalan Abdullah bin Uraiqit, rombongan menempuh jalur terjal di pesisir barat. Mereka menahan terik matahari siang dan dinginnya malam di gurun.',
        question: 'Mengapa rombongan memilih jalur yang tidak biasa?',
        options: ['Agar tidak mudah terlacak oleh pihak yang mencari mereka', 'Karena jalurnya lebih dekat dan mudah', 'Supaya bisa berbelanja di pasar pesisir'],
        correctIndex: 0
      },
      {
        step: 5,
        title: 'Singgah di Quba dan Membangun Masjid Pertama',
        description: 'Sebelum memasuki pusat kota Madinah, Rasulullah tiba di perkampungan Quba. Di sinilah beliau meletakkan batu pertama pembangunan Masjid Quba, masjid pertama yang dibangun dalam sejarah Islam.',
        question: 'Apa peristiwa bersejarah yang terjadi saat Rasulullah singgah di Quba?',
        options: ['Membangun Masjid Quba atas dasar ketakwaan', 'Menandatangani perjanjian dagang', 'Beristirahat tanpa melakukan kegiatan apa pun'],
        correctIndex: 0
      },
      {
        step: 6,
        title: 'Memasuki Kota Madinah yang Berkah',
        description: 'Rombongan melanjutkan perjalanan ke pusat Yatsrib. Warga menyambut kedatangan beliau dengan nyanyian gembira dan sukacita yang belum pernah terjadi sebelumnya.',
        question: 'Nama kota Yatsrib kemudian dikenal dengan nama baru apa?',
        options: ['Madinah al-Munawwarah (Kota yang Bercahaya)', 'Kota Baghdad', 'Kota Kairo'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 5,
    title: 'Bab 5 — Tiba di Madinah',
    subtitle: 'Menyemai bibit perdamaian, persaudaraan, dan masyarakat yang penuh kasih',
    readTime: '4 Menit',
    summary: 'Di Madinah, Rasulullah mempersaudarakan kaum Muhajirin dan Ansar, mendirikan Masjid Nabawi yang bersahaja, serta menyusun Piagam Madinah untuk hidup rukun berdampingan.',
    content: [
      'Kedatangan Rasulullah SAW disambut dengan puji-pujian penuh kegembiraan: "Thala\'al badru \'alayna, min tsaniyyatil wada\'" (Bulan purnama telah terbit menyinari kami).',
      'Langkah pertama yang dilakukan Rasulullah adalah membangun Masjid Nabawi. Bangunan awal masjid ini sangat sederhana, berdinding tanah liat, beratap pelepah kurma, dan bertiangkan batang kurma. Masjid ini menjadi pusat ibadah, musyawarah, dan sekolah bagi kaum Muslimin.',
      'Langkah mulia kedua: Mempersaudarakan kaum Muhajirin dan kaum Ansar. Kaum Ansar dengan ikhlas membagi rumah, makanan, pakaian, dan modal usaha kepada saudara mereka yang baru datang dari Makkah tanpa membawa harta.',
      'Langkah ketiga: Menyusun Piagam Madinah (Shahifah Madinah) untuk menjamin hak semua golongan, termasuk kaum Yahudi dan suku-suku lokal, agar hidup damai dan saling melindungi kota Madinah.'
    ]
  },
  {
    id: 6,
    title: 'Bab 6 — Hikmah Hijrah untuk Kehidupan Kita',
    subtitle: 'Meneladani nilai-nilai luhur hijrah di sekolah, rumah, dan pertemanan',
    readTime: '4 Menit',
    summary: 'Hijrah mengajarkan kita untuk selalu berbuat baik, sabar saat menghadapi rintangan, tidak pernah putus asa, dan selalu menyayangi sesama teman.',
    content: [
      'Peristiwa hijrah bukan hanya cerita masa lalu, tetapi merupakan lentera penuntun hidup kita setiap hari.',
      'Dalam arti yang luas bagi kita sebagai anak sekolah, hijrah berarti berpindah dari sifat kurang baik menuju sifat yang terpuji: dari malas belajar menjadi rajin, dari suka mengeluh menjadi penuh syukur, dan dari acuh menjadi suka menolong.'
    ],
    morals: [
      {
        title: 'Sabar Menghadapi Kesulitan',
        meaning: 'Tidak mudah menyerah saat belajar atau menghadapi keadaan yang sulit.',
        schoolExample: 'Saat belum paham materi matematika atau PAI, kita tetap berusaha mencoba kembali dan bertanya dengan sopan kepada guru.',
        icon: 'Sparkles'
      },
      {
        title: 'Berani Membela Kebaikan',
        meaning: 'Memiliki keberanian untuk berkata jujur dan membela teman yang diperlakukan tidak adil.',
        schoolExample: 'Menegur dengan lembut teman yang mengejek orang lain, dan tidak ikut-ikutan melakukan bullying.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Amanah & Dapat Dipercaya',
        meaning: 'Menjaga titipan dan menepati janji yang telah diucapkan.',
        schoolExample: 'Menjaga buku perpustakaan dengan rapi dan mengembalikannya tepat waktu tanpa rusak.',
        icon: 'Lock'
      },
      {
        title: 'Tawakal & Ikhtiar Berencana',
        meaning: 'Berusaha sungguh-sungguh membuat rencana belajar yang baik, lalu berdoa memohon kemudahan kepada Allah SWT.',
        schoolExample: 'Mempersiapkan jadwal belajar sebelum ulangan tiba, bukan hanya belajar sistem kebut semalam.',
        icon: 'CalendarClock'
      },
      {
        title: 'Persaudaraan & Saling Menolong',
        meaning: 'Mencontoh kaum Ansar yang hangat dan peduli kepada siapa saja yang membutuhkan.',
        schoolExample: 'Menyapa teman baru yang baru pindah ke kelas, meminjamkan alat tulis saat teman lupa membawa, dan makan bersama.',
        icon: 'Heart'
      },
      {
        title: 'Kerja Sama yang Kompak',
        meaning: 'Saling melengkapi kelebihan dan kekurangan bersama teman demi mencapai tujuan bersama.',
        schoolExample: 'Bekerja sama dalam piket kebersihan kelas sehingga kelas menjadi bersih dan nyaman.',
        icon: 'Users2'
      }
    ],
    reflection: {
      question: 'Jika kamu melihat teman baru di kelas yang belum memiliki teman bermain, nilai hijrah apa yang sedang kamu praktikkan saat mengajaknya bergabung?',
      sampleThoughts: [
        'Nilai persaudaraan dan kepedulian seperti kaum Ansar yang menyambut kaum Muhajirin.',
        'Nilai keramahan dan empati agar teman baru merasa nyaman dan dihargai di lingkungan barunya.',
        'Nilai berbagi kebahagiaan dan menciptakan lingkungan kelas yang damai dan rukun.'
      ]
    }
  }
];
