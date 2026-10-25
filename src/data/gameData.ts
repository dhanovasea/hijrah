export interface TimelineCard {
  id: string;
  orderCorrect: number; // 1 to 6
  title: string;
  shortDesc: string;
  iconName: string;
}

export interface CharacterMatchItem {
  id: string;
  name: string;
  characterTitle: string;
  roleDescription: string;
  matchedId: string;
}

export interface MoralMissionScenario {
  id: number;
  title: string;
  story: string;
  question: string;
  options: {
    text: string;
    isBestChoice: boolean;
    feedback: string;
    valueLearned: string;
  }[];
}

export const orderGameCards: TimelineCard[] = [
  {
    id: 'step_1',
    orderCorrect: 1,
    title: 'Persiapan Hijrah di Makkah',
    shortDesc: 'Membuat rencana rahasia, menyiapkan dua unta, dan Ali r.a. menggantikan tidur di ranjang Nabi.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'step_2',
    orderCorrect: 2,
    title: 'Menuju Gua Tsur di Selatan Makkah',
    shortDesc: 'Berangkat di kegelapan malam menuju arah berlawanan untuk mengelabui kejaran musuh.',
    iconName: 'Compass'
  },
  {
    id: 'step_3',
    orderCorrect: 3,
    title: 'Persembunyian di Gua Tsur',
    shortDesc: 'Berlindung selama tiga hari tiga malam dengan bantuan Asma, Abdullah, dan Amir bin Fuhairah.',
    iconName: 'Mountain'
  },
  {
    id: 'step_4',
    orderCorrect: 4,
    title: 'Melanjutkan Perjalanan via Rute Pesisir',
    shortDesc: 'Dipandu Abdullah bin Uraiqit menembus padang pasir melalui jalur pesisir yang terpencil.',
    iconName: 'Footprints'
  },
  {
    id: 'step_5',
    orderCorrect: 5,
    title: 'Tiba di Quba',
    shortDesc: 'Singgah beberapa hari di perkampungan Quba dan meletakkan batu pertama Masjid Quba.',
    iconName: 'Landmark'
  },
  {
    id: 'step_6',
    orderCorrect: 6,
    title: 'Tiba di Madinah al-Munawwarah',
    shortDesc: 'Disambut gembira oleh kaum Ansar, membangun Masjid Nabawi, dan mempersaudarakan umat.',
    iconName: 'HeartHandshake'
  }
];

export const characterMatchPairs = [
  {
    id: 'char_1',
    name: 'Abu Bakar Ash-Shiddiq r.a.',
    role: 'Sahabat setia yang menemani Nabi SAW sepanjang perjalanan hijrah dan mempersiapkan bekal serta unta.'
  },
  {
    id: 'char_2',
    name: 'Ali bin Abi Thalib r.a.',
    role: 'Pemuda pemberani yang tidur di ranjang Nabi untuk mengecoh musuh dan mengembalikan barang titipan.'
  },
  {
    id: 'char_3',
    name: 'Asma binti Abu Bakar r.a.',
    role: 'Putri pemberani yang mengantarkan makanan dan bekal ke Gua Tsur dengan membelah ikat pinggangnya.'
  },
  {
    id: 'char_4',
    name: 'Abdullah bin Abu Bakar r.a.',
    role: 'Pemuda cerdas yang bertugas mencari kabar dan perkembangan situasi Makkah untuk dilaporkan ke Gua Tsur.'
  },
  {
    id: 'char_5',
    name: 'Abdullah bin Uraiqit',
    role: 'Penunjuk jalan padang pasir yang sangat amanah dan ahli rute terpencil di pesisir Laut Merah.'
  },
  {
    id: 'char_6',
    name: 'Kaum Ansar',
    role: 'Penduduk Madinah yang menyambut penuh cinta dan menolong kaum Muslimin yang baru datang.'
  },
  {
    id: 'char_7',
    name: 'Kaum Muhajirin',
    role: 'Kaum Muslimin yang rela meninggalkan tanah kelahiran dan harta di Makkah demi mempertahankan iman.'
  }
];

export const moralMissionScenarios: MoralMissionScenario[] = [
  {
    id: 1,
    title: 'Misi 1: Teman Baru yang Pendiam',
    story: 'Di hari Senin pagi, seorang siswa baru bernama Farhan masuk ke kelas 4. Ia tampak bingung, duduk sendirian di sudut kelas, dan belum berani mengajak bicara siapa pun.',
    question: 'Tindakan mulia apa yang sebaiknya kamu lakukan untuk meneladani sikap kaum Ansar?',
    options: [
      {
        text: 'Menghampirinya dengan senyuman, mengajaknya berkenalan, dan menawarinya duduk bersama saat istirahat.',
        isBestChoice: true,
        feedback: 'Luar biasa! Kamu meneladani kaum Ansar yang hangat dan peduli, membuat teman baru merasa diterima dan bahagia.',
        valueLearned: 'Persaudaraan & Keramahan Kasih Sayang'
      },
      {
        text: 'Membiarkannya sendiri karena nanti juga akan mencari teman dengan sendirinya.',
        isBestChoice: false,
        feedback: 'Teman baru sering kali merasa cemas dan malu. Sedikit sapaan darimu akan sangat membantunya merasa aman.',
        valueLearned: 'Kepekaan Sosial'
      },
      {
        text: 'Berbisik-bisik membicarakan penampilannya bersama teman-teman yang lain.',
        isBestChoice: false,
        feedback: 'Membicarakan teman di belakang dapat melukai perasaannya dan bertentangan dengan ajaran akhlak mulia.',
        valueLearned: 'Menjaga Lisan'
      }
    ]
  },
  {
    id: 2,
    title: 'Misi 2: Ujian Matematika yang Terasa Sulit',
    story: 'Dua hari lagi akan ada ulangan matematika. Kamu merasa ada beberapa materi pembagian yang belum kamu pahami dengan lancar.',
    question: 'Bagaimana cara kamu memadukan ikhtiar (usaha) dan tawakal seperti teladan perencanaan hijrah?',
    options: [
      {
        text: 'Menyerah dan pasrah saja, berharap soal ulangan nanti mudah secara kebetulan.',
        isBestChoice: false,
        feedback: 'Tawakal tanpa usaha bukanlah ajaran yang benar. Rasulullah SAW merencanakan hijrah dengan teliti sebelum bertawakal.',
        valueLearned: 'Pentingnya Berikhtiar'
      },
      {
        text: 'Membuat jadwal belajar, mencoba mengerjakan latihan soal, bertanya pada guru atau teman, lalu berdoa memohon kemudahan kepada Allah.',
        isBestChoice: true,
        feedback: 'Hebat sekali! Inilah paduan sempurna antara perencanaan, kerja keras, dan doa yang diajarkan Rasulullah SAW.',
        valueLearned: 'Ikhtiar Terencana & Tawakal'
      },
      {
        text: 'Menyiapkan catatan kecil rahasia untuk menyontek saat ujian berlangsung.',
        isBestChoice: false,
        feedback: 'Menyontek adalah perbuatan tidak jujur dan merusak nilai amanah yang sangat dijunjung tinggi dalam Islam.',
        valueLearned: 'Kejujuran & Amanah'
      }
    ]
  },
  {
    id: 3,
    title: 'Misi 3: Tugas Kelompok dan Teman yang Berbeda Pendapat',
    story: 'Dalam kerja kelompok PAI membuat mading, ada teman yang mengusulkan ide berbeda dari idemu tentang warna hiasan mading.',
    question: 'Bagaimana sikap terbaik yang mencerminkan semangat musyawarah dan persaudaraan di Madinah?',
    options: [
      {
        text: 'Marah dan memaksakan ide sendiri karena merasa ide kita paling bagus.',
        isBestChoice: false,
        feedback: 'Memaksakan kehendak dapat memicu pertengkaran dan merusak kekompakan kelompok.',
        valueLearned: 'Menghindari Sikap Egois'
      },
      {
        text: 'Mendengarkan penjelasannya dengan tenang, mendiskusikan bersama kelompok, dan memadukan ide terbaik demi hasil yang indah.',
        isBestChoice: true,
        feedback: 'Sempurna! Kamu mencontoh adab musyawarah para sahabat di Madinah yang saling menghargai pendapat.',
        valueLearned: 'Musyawarah & Toleransi'
      },
      {
        text: 'Mogok tidak mau mengerjakan mading lagi dan keluar dari kelompok.',
        isBestChoice: false,
        feedback: 'Meninggalkan tanggung jawab tidak menyelesaikan masalah. Kebersamaan membutuhkan kelapangan hati.',
        valueLearned: 'Tanggung Jawab Bersama'
      }
    ]
  },
  {
    id: 4,
    title: 'Misi 4: Menemukan Jam Tangan di Meja Belajar',
    story: 'Saat jam istirahat, kamu melihat sebuah jam tangan tertinggal di atas meja kelas dan tidak ada orang di sekitarnya.',
    question: 'Tindakan amanah apa yang mencerminkan keteladanan Ali bin Abi Thalib r.a.?',
    options: [
      {
        text: 'Menyerahkannya kepada wali kelas atau guru piket agar segera diumumkan kepada pemiliknya.',
        isBestChoice: true,
        feedback: 'Sangat terpuji! Seperti Ali r.a. yang menjaga barang titipan penduduk Makkah, kamu menjaga amanah dengan sempurna.',
        valueLearned: 'Integritas & Sifat Amanah'
      },
      {
        text: 'Memasukkannya ke saku dan membawanya pulang ke rumah secara diam-diam.',
        isBestChoice: false,
        feedback: 'Mengambil barang milik orang lain adalah dosa dan melanggar perintah Allah SWT.',
        valueLearned: 'Menghormati Hak Orang Lain'
      },
      {
        text: 'Membiarkannya tergeletak begitu saja sehingga berisiko terinjak atau hilang.',
        isBestChoice: false,
        feedback: 'Peduli terhadap barang yang tertinggal dengan melapor ke guru adalah bentuk kebaikan kecil yang bernilai pahala.',
        valueLearned: 'Kepedulian & Tanggap Lingkungan'
      }
    ]
  }
];
