import { useState } from "react";

const heroSlides = [
  {
    title: "Tugu Malang",
    text: "Ikon kota yang menjadi titik temu, ruang berfoto, dan penanda identitas urban Malang yang terus hidup dari pagi hingga malam.",
    image:
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1920",
  },
  {
    title: "Alun-Alun Kota Malang",
    text: "Ruang publik yang hangat, dikelilingi ritme kota, tempat warga berkumpul, berjalan santai, dan menikmati suasana pusat kota.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Alun-Alun_Kota_Malang.jpg/800px-Alun-Alun_Kota_Malang.jpg",
  },
  {
    title: "Jatim Park",
    text: "Destinasi keluarga modern yang mempertemukan hiburan, edukasi, dan pengalaman rekreasi dalam satu kawasan wisata populer.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920",
  },
];

const malangCultures = [
  {
    title: "Tari Topeng",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Tari_Topeng_Malangan.jpg/800px-Tari_Topeng_Malangan.jpg",
    lokasi: "Sanggar Budaya Malang",
    estimasi: "Pementasan Festival",
    category: "Seni Tari",
    rincian: "Tarian klasik dengan topeng kayu.",
    description: [
      "Tari Topeng Malangan merupakan salah satu kekayaan budaya Jawa Timur yang berakar kuat di Kabupaten dan Kota Malang sejak masa Kerajaan Kanjuruhan pada abad ke-8. Tarian ini menggabungkan gerak tubuh yang dinamis dengan penggunaan topeng kayu berukir halus yang merepresentasikan karakter-karakter pewayangan seperti Panji Asmoro Bangun, Dewi Sekartaji, dan Klono Sewandono. Setiap topeng dipahat dengan makna filosofis yang mendalam, mencerminkan nilai-nilai kehidupan masyarakat Jawa.",
      "Dalam konteks budaya Malang, Tari Topeng memiliki peran sentral sebagai media dakwah, hiburan, dan ritual adat. Pertunjukan ini biasanya digelar dalam upacara bersih desa, pernikahan, dan festival budaya tahunan. Gerakan tarian yang lembut namun penuh ekspresi menjadi ciri khas yang membedakannya dari tari topeng daerah lain. Iringan gamelan Jawa Timuran dengan langgam khas Malangan menambah kedalaman estetika pertunjukan.",
      "Upaya pelestarian Tari Topeng Malangan terus dilakukan melalui sanggar-sanggar budaya, kurikulum muatan lokal di sekolah, serta dukungan pemerintah daerah dalam bentuk festival tahunan. Generasi muda Malang kini semakin aktif mempelajari seni tari ini, menjadikannya tidak sekadar warisan masa lalu tetapi juga identitas hidup yang terus berkembang dan beradaptasi dengan zaman modern."
    ],
  },
  {
    title: "Bahasa Walikan",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Alun-Alun_Kota_Malang.jpg/800px-Alun-Alun_Kota_Malang.jpg",
    lokasi: "Seluruh Kota Malang",
    estimasi: "Gratis",
    category: "Bahasa & Tradisi",
    rincian: "Bahasa terbalik khas Malang.",
    description: [
      "Bahasa Walikan atau yang dikenal juga sebagai 'Boso Walikan' adalah fenomena linguistik unik yang lahir dari kreativitas masyarakat Malang. Bahasa ini diciptakan dengan cara membalik suku kata atau huruf dalam sebuah kata, misalnya 'Malang' menjadi 'Ngalam', 'bakso' menjadi 'oskab'. Tradisi ini diperkirakan muncul pada masa perjuangan kemerdekaan sebagai sandi rahasia para pejuang untuk mengelabui penjajah Jepang.",
      "Bahasa Walikan telah menjadi bagian tak terpisahkan dari identitas sosial masyarakat Malang. Penggunaannya meluas dari percakapan sehari-hari hingga nama-nama usaha, slogan kota, dan bahkan menjadi materi akademis di beberapa universitas. Fenomena ini mencerminkan karakter masyarakat Malang yang kreatif, humoris, dan memiliki kebanggaan tinggi terhadap identitas lokalnya.",
      "Di era digital, Bahasa Walikan mengalami revitalisasi melalui media sosial dan komunitas daring. Anak-anak muda Malang dengan bangga menggunakan bahasa ini sebagai penanda identitas generasi mereka. Pemerintah Kota Malang juga turut melestarikan tradisi ini dengan memasukkannya ke dalam branding kota, seperti penggunaan kata 'Ngalam' dalam berbagai kampanye pariwisata dan budaya."
    ],
  },
  {
    title: "Bantengan",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bantengan.jpg/800px-Bantengan.jpg",
    lokasi: "Desa Budaya",
    estimasi: "Tergantung Event",
    category: "Seni Pertunjukan",
    rincian: "Seni pertunjukan kolosal mistis.",
    description: [
      "Bantengan adalah kesenian tradisional khas Malang yang menampilkan pertunjukan kolosal dengan menggunakan properti kepala banteng besar yang terbuat dari kayu dan kulit. Kesenian ini dipercaya telah ada sejak zaman Kerajaan Singhasari dan memiliki kaitan erat dengan ritual tolak bala serta ucapan syukur masyarakat agraris Malang. Pertunjukan Bantengan melibatkan puluhan penari yang menirukan gerak-gerik banteng liar dengan iringan musik tradisional yang menghentak.",
      "Dalam pertunjukannya, Bantengan sering kali menampilkan unsur trance atau kesurupan yang menjadi daya tarik utama bagi penonton. Pemain yang memerankan banteng akan bergerak liar seolah kerasukan roh binatang, menerjang penonton, dan bahkan memanjat pohon. Tradisi ini mencerminkan kepercayaan animisme dan dinamisme yang masih hidup dalam masyarakat pedesaan Malang, berpadu dengan nilai-nilai Islam yang dianut mayoritas penduduk.",
      "Pelestarian Bantengan kini mendapat perhatian serius dari pemerintah daerah dan komunitas budaya. Beberapa desa di Kabupaten Malang menjadikan Bantengan sebagai atraksi wisata budaya yang rutin dipertunjukkan. Festival Bantengan tahunan berhasil menarik ribuan wisatawan dan menjadi ajang regenerasi bagi penari-penari muda yang ingin menjaga warisan leluhur mereka tetap hidup."
    ],
  },
  {
    title: "Candi Singosari",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Singhasari_temple.jpg/800px-Singhasari_temple.jpg",
    lokasi: "Singosari",
    estimasi: "Rp 10.000",
    category: "Situs Sejarah",
    rincian: "Peninggalan Kerajaan Singhasari.",
    description: [
      "Candi Singosari merupakan kompleks percandian peninggalan Kerajaan Singhasari yang terletak di Kecamatan Singosari, Kabupaten Malang. Dibangun pada abad ke-13, candi ini didedikasikan sebagai pendharmaan Raja Kertanegara, raja terakhir Kerajaan Singhasari yang memerintah dari tahun 1268 hingga 1292 Masehi. Arsitektur candi menunjukkan perpaduan gaya Hindu-Buddha yang khas dengan ornamen relief yang sangat detail dan arca-arca penjaga (dwarapala) yang megah.",
      "Candi Singosari memiliki nilai historis yang sangat tinggi bagi Malang dan Indonesia. Sebagai saksi bisu kejayaan salah satu kerajaan terbesar di Nusantara, candi ini menyimpan cerita tentang ambisi politik Kertanegara dalam menyatukan Nusantara. Dua arca Dwarapala setinggi hampir 4 meter yang mengapit pintu masuk menjadi ikon yang terkenal, menggambarkan kekuatan dan keagungan masa lalu.",
      "Saat ini, Candi Singosari dikelola oleh Balai Pelestarian Cagar Budaya Jawa Timur dan menjadi salah satu destinasi wisata sejarah utama di Malang. Upaya konservasi terus dilakukan untuk menjaga keutuhan struktur candi dari kerusakan akibat cuaca dan aktivitas manusia. Program edukasi bagi pelajar dan masyarakat umum juga diselenggarakan secara rutin untuk meningkatkan kesadaran akan pentingnya pelestarian warisan budaya."
    ],
  },
  {
    title: "Batik Malangan",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Batik_Kraton.jpg/800px-Batik_Kraton.jpg",
    lokasi: "Pusat Kriya",
    estimasi: "Variatif",
    category: "Kerajinan",
    rincian: "Batik dengan motif khas lokal.",
    description: [
      "Batik Malangan adalah kain batik tradisional yang memiliki motif dan corak khas yang berasal dari Malang dan sekitarnya. Berbeda dengan batik Solo atau Yogyakarta yang cenderung bermotif geometris dan klasik, Batik Malangan menampilkan motif-motif yang terinspirasi dari kekayaan alam dan budaya lokal seperti motif Candi Singosari, bunga teratai, tumbuhan khas dataran tinggi, dan topeng Malangan. Setiap motif memiliki makna filosofis yang mencerminkan karakter masyarakat Malang.",
      "Perkembangan Batik Malangan tidak lepas dari peran para pengrajin lokal yang dengan tekun menjaga tradisi membatik tulis dan cap. Sentra-sentra batik di kawasan Celaket, Turen, dan Kepanjen menjadi pusat produksi yang menghasilkan karya-karya berkualitas tinggi. Proses pembuatan batik tulis Malangan yang memakan waktu berminggu-minggu mencerminkan dedikasi dan ketelitian para pengrajin dalam menjaga warisan budaya.",
      "Dalam beberapa tahun terakhir, Batik Malangan mengalami kebangkitan berkat dukungan pemerintah daerah dan meningkatnya apresiasi masyarakat terhadap produk lokal. Program pemberdayaan UMKM batik, pameran, dan fashion show batik kontemporer berhasil memperkenalkan Batik Malangan ke pasar nasional dan internasional. Inovasi dalam desain dan pewarnaan alami menjadikan Batik Malangan semakin diminati oleh generasi muda."
    ],
  },
  {
    title: "Wayang Klitik",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Wayang_Klitik.jpg/800px-Wayang_Klitik.jpg",
    lokasi: "Museum",
    estimasi: "Edukasi",
    category: "Seni Tradisional",
    rincian: "Wayang dari kayu pipih.",
    description: [
      "Wayang Klitik adalah jenis wayang yang terbuat dari kayu pipih dan menghasilkan suara 'klitik-klitik' saat dimainkan, yang menjadi asal usul namanya. Wayang ini merupakan salah satu varian wayang yang berkembang di wilayah Jawa Timur, termasuk Malang, dan biasanya mementaskan cerita-cerita Panji yang berasal dari Kerajaan Kediri dan Singhasari. Berbeda dengan wayang kulit yang memerlukan layar dan lampu, Wayang Klitik dimainkan secara langsung di hadapan penonton.",
      "Keunikan Wayang Klitik terletak pada materinya yang terbuat dari kayu ringan dengan pewarnaan yang cerah dan mencolok. Cerita yang dibawakan umumnya berkisar pada kisah percintaan dan petualangan Panji Asmoro Bangun dan Dewi Sekartaji, yang sangat populer di kalangan masyarakat Jawa Timur. Dalang Wayang Klitik dituntut untuk memiliki keahlian khusus dalam menggerakkan wayang kayu yang lebih berat dibanding wayang kulit.",
      "Pelestarian Wayang Klitik di Malang menghadapi tantangan serius karena semakin sedikitnya dalang dan pengrajin yang menguasai seni ini. Namun, upaya revitalisasi terus dilakukan melalui dokumentasi, pelatihan, dan pertunjukan di museum-museum serta acara budaya. Beberapa komunitas seni di Malang aktif mengadakan workshop pembuatan dan pementasan Wayang Klitik untuk menarik minat generasi muda terhadap warisan budaya leluhur."
    ],
  },
  {
    title: "Tari Beskalan",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Tari_Beskalan.jpg/800px-Tari_Beskalan.jpg",
    lokasi: "Panggung Budaya",
    estimasi: "Acara Formal",
    category: "Seni Tari",
    rincian: "Tari penyambutan tamu.",
    description: [
      "Tari Beskalan adalah tarian penyambutan tamu kehormatan yang berasal dari tradisi masyarakat Malang dan sekitarnya. Tarian ini memiliki akar sejarah yang panjang, diperkirakan telah ada sejak masa Kerajaan Singhasari dan terus berkembang hingga kini. Penari Beskalan biasanya adalah perempuan yang mengenakan busana adat Jawa Timur lengkap dengan perhiasan dan tata rias yang elegan, menarikan gerakan-gerakan halus yang melambangkan keramahan dan penghormatan.",
      "Dalam tradisi masyarakat Malang, Tari Beskalan memiliki kedudukan istimewa sebagai tarian pembuka dalam berbagai acara resmi seperti pernikahan, penjemputan tamu penting, dan festival budaya. Gerakan tarian yang lemah gemulai namun penuh wibawa mencerminkan karakter masyarakat Malang yang santun dan menghargai tamu. Iringan gamelan dengan tempo yang mengalun tenang menciptakan suasana sakral dan penuh keagungan.",
      "Saat ini, Tari Beskalan terus dilestarikan melalui sanggar-sanggar tari dan lembaga pendidikan seni di Malang. Beberapa sekolah memasukkan Tari Beskalan ke dalam kurikulum ekstrakurikuler untuk memperkenalkan generasi muda pada warisan budaya lokal. Penampilan Tari Beskalan juga sering menjadi andalan dalam ajang promosi pariwisata dan budaya Malang di tingkat nasional maupun internasional."
    ],
  },
  {
    title: "Kesenian Ludruk",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ludruk.jpg/800px-Ludruk.jpg",
    lokasi: "Gedung Kesenian",
    estimasi: "Rp 25.000",
    category: "Teater Rakyat",
    rincian: "Teater rakyat Jawa Timur.",
    description: [
      "Ludruk adalah seni teater rakyat khas Jawa Timur yang menampilkan drama komedi dengan dialog dalam bahasa Jawa Timuran. Kesenian ini berkembang pesat di wilayah Surabaya, Malang, dan sekitarnya sejak awal abad ke-20. Pertunjukan Ludruk biasanya dibuka dengan tarian ngremo yang energik, dilanjutkan dengan kidungan (nyanyian solo), dan kemudian lakon utama yang mengangkat kisah-kisah kehidupan sehari-hari masyarakat dengan bumbu humor yang segar.",
      "Keunikan Ludruk di Malang terletak pada penggunaan dialek Malangan yang kental serta pengangkatan isu-isu sosial lokal yang relevan. Para pemain Ludruk dituntut untuk memiliki kemampuan improvisasi yang tinggi dan kepekaan terhadap kondisi sosial masyarakat. Peran travesti (laki-laki yang memerankan perempuan) menjadi ciri khas yang membedakan Ludruk dari bentuk teater tradisional lainnya.",
      "Meskipun sempat mengalami masa surut akibat persaingan dengan hiburan modern, Ludruk di Malang kini mengalami kebangkitan melalui adaptasi kontemporer. Kelompok-kelompok Ludruk muda bermunculan dengan format pertunjukan yang lebih segar tanpa meninggalkan esensi tradisionalnya. Dukungan dari pemerintah daerah dan institusi budaya membantu menjaga keberlangsungan seni teater rakyat yang menjadi cermin kehidupan masyarakat Jawa Timur ini."
    ],
  },
  {
    title: "Candi Jago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Candi_Jago_2.jpg/800px-Candi_Jago_2.jpg",
    lokasi: "Tumpang",
    estimasi: "Rp 5.000",
    category: "Situs Sejarah",
    rincian: "Candi bercorak Hindu-Buddha.",
    description: [
      "Candi Jago, yang juga dikenal sebagai Candi Jajaghu, adalah candi peninggalan abad ke-13 yang terletak di Desa Jago, Kecamatan Tumpang, Kabupaten Malang. Candi ini dibangun pada masa pemerintahan Raja Wisnuwardhana dari Kerajaan Singhasari sebagai tempat pendharmaan beliau. Arsitektur Candi Jago menunjukkan perpaduan unik antara gaya Hindu dan Buddha, yang mencerminkan toleransi beragama pada masa kerajaan Singhasari.",
      "Salah satu keistimewaan Candi Jago adalah relief-relief naratif yang menghiasi dinding-dinding candi. Relief tersebut menggambarkan berbagai cerita dari kitab Tantri Kamandaka, Arjunawiwaha, dan Kunjarakarna dengan gaya seni wayang beber yang sangat khas. Gaya penggambaran figur yang pipih dan bergaya wayang ini menjadi ciri khas seni relief Jawa Timur yang berbeda dari gaya Jawa Tengah yang lebih naturalistik.",
      "Upaya pelestarian Candi Jago terus dilakukan oleh Balai Pelestarian Cagar Budaya Jawa Timur bekerja sama dengan berbagai pihak. Situs ini telah menjadi objek penelitian arkeologi penting dan destinasi wisata edukasi yang diminati oleh pelajar, mahasiswa, dan wisatawan. Program pemugaran dan perawatan rutin memastikan candi ini tetap berdiri kokoh sebagai saksi sejarah peradaban besar yang pernah berjaya di tanah Malang."
    ],
  },
  {
    title: "Polowijen",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Desa_Budaya.jpg/800px-Desa_Budaya.jpg",
    lokasi: "Polowijen",
    estimasi: "Gratis/Donasi",
    category: "Kampung Budaya",
    rincian: "Kampung budaya kreatif.",
    description: [
      "Kampung Polowijen adalah salah satu kampung tematik di Kota Malang yang mengusung konsep kampung budaya dan heritage. Terletak di Kelurahan Polowijen, Kecamatan Blimbing, kampung ini menyimpan berbagai peninggalan sejarah termasuk situs-situs purbakala dari masa Kerajaan Singhasari. Warga setempat dengan penuh kesadaran menjadikan warisan budaya sebagai identitas kampung dan daya tarik wisata yang unik.",
      "Kampung Polowijen menawarkan pengalaman wisata budaya yang autentik melalui berbagai aktivitas seperti tur heritage, workshop kerajinan tradisional, pertunjukan seni, dan kuliner lokal. Mural-mural bertema sejarah dan budaya menghiasi gang-gang kampung, menciptakan ruang publik yang edukatif dan instagramable. Keberadaan situs arca dan peninggalan kuno di tengah pemukiman warga menjadikan kampung ini sebagai museum terbuka yang hidup.",
      "Keberhasilan Kampung Polowijen dalam mengangkat potensi budaya lokal menjadi inspirasi bagi kampung-kampung lain di Malang. Model pemberdayaan masyarakat berbasis budaya yang diterapkan di sini berhasil meningkatkan kesejahteraan warga sekaligus melestarikan warisan leluhur. Program-program kreatif yang melibatkan anak muda dan seniman lokal terus dikembangkan untuk menjaga keberlanjutan kampung budaya ini."
    ],
  },
  {
    title: "Jaran Pegon",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Jaran_Kepang.jpg/800px-Jaran_Kepang.jpg",
    lokasi: "Kabupaten Malang",
    estimasi: "Tergantung Event",
    category: "Seni Pertunjukan",
    rincian: "Seni kuda lumping lokal.",
    description: [
      "Jaran Pegon adalah variasi lokal dari kesenian kuda lumping yang berkembang di wilayah Kabupaten Malang dan sekitarnya. Nama 'Pegon' merujuk pada jenis kuda yang digunakan sebagai inspirasi properti pertunjukan. Kesenian ini menampilkan penari yang menunggangi kuda-kudaan dari anyaman bambu sambil menari mengikuti irama gamelan dan kendang yang dinamis. Pertunjukan ini biasanya dilakukan dalam rangkaian upacara adat, perayaan hari besar, atau hajatan warga.",
      "Keunikan Jaran Pegon di Malang terletak pada koreografi yang lebih terstruktur dan pengaruh budaya Mataraman yang kental. Kostum penari yang berwarna-warni dengan aksesoris tradisional menambah kemeriahan pertunjukan. Seperti halnya kesenian trance lainnya di Jawa Timur, Jaran Pegon juga menampilkan adegan kesurupan yang dipercaya sebagai manifestasi kekuatan spiritual. Hal ini menjadikan pertunjukan sangat menarik dan penuh kejutan bagi penonton.",
      "Pelestarian Jaran Pegon di Malang didukung oleh komunitas-komunitas seni yang tersebar di berbagai desa. Pelatihan rutin untuk generasi muda dan dokumentasi pertunjukan menjadi upaya penting dalam menjaga keberlangsungan seni ini. Festival budaya tahunan yang diselenggarakan pemerintah daerah juga memberikan panggung bagi kelompok-kelompok Jaran Pegon untuk tampil dan berkompetisi."
    ],
  },
  {
    title: "Tari Remo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tari_Remo.jpg/800px-Tari_Remo.jpg",
    lokasi: "Seluruh Wilayah",
    estimasi: "Acara Komunitas",
    category: "Seni Tari",
    rincian: "Tari energik penyambutan.",
    description: [
      "Tari Remo atau Ngremo adalah tarian khas Jawa Timur yang sangat populer di Malang dan daerah sekitarnya. Tarian ini awalnya merupakan tarian pembuka dalam pertunjukan Ludruk dan kini telah berkembang menjadi tarian mandiri yang sering ditampilkan dalam berbagai acara resmi dan festival budaya. Gerakan tarian yang energik dan penuh semangat menggambarkan jiwa ksatria dan keberanian masyarakat Jawa Timur.",
      "Dalam konteks budaya Malang, Tari Remo memiliki gaya yang sedikit berbeda dari versi Surabaya. Versi Malangan cenderung memiliki gerakan yang lebih halus dengan penekanan pada kelincahan kaki dan ekspresi wajah. Penari Remo Malangan biasanya mengenakan kostum yang lebih sederhana namun tetap elegan, dengan iringan gamelan yang khas Malangan. Tarian ini mencerminkan karakter masyarakat Malang yang dinamis namun tetap santun.",
      "Tari Remo terus dilestarikan melalui berbagai program pendidikan seni dan festival budaya di Malang. Sanggar-sanggar tari dan sekolah seni menjadi tempat regenerasi penari-penari muda yang akan melanjutkan tradisi ini. Kompetisi Tari Remo yang diadakan secara rutin berhasil memotivasi generasi muda untuk mendalami dan mengembangkan tarian tradisional yang telah menjadi kebanggaan masyarakat Jawa Timur."
    ],
  },
  {
    title: "Candi Kidal",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Candi_Kidal.jpg/800px-Candi_Kidal.jpg",
    lokasi: "Kidal, Tumpang",
    estimasi: "Rp 5.000",
    category: "Situs Sejarah",
    rincian: "Situs bersejarah kuno.",
    description: [
      "Candi Kidal adalah candi Hindu peninggalan Kerajaan Singhasari yang terletak di Desa Rejokidal, Kecamatan Tumpang, Kabupaten Malang. Dibangun sekitar tahun 1260 Masehi, candi ini merupakan pendharmaan Raja Anusapati, raja kedua Kerajaan Singhasari. Dengan tinggi sekitar 12,5 meter, Candi Kidal memiliki arsitektur yang proporsional dan elegan, menjadikannya salah satu contoh terbaik arsitektur candi Jawa Timur.",
      "Keistimewaan Candi Kidal terletak pada relief Garudeya yang menghiasi tiga sisi dinding candi. Relief ini menceritakan kisah Garuda yang berusaha membebaskan ibunya, Winata, dari perbudakan Kadru dan anak-anaknya (para naga). Kisah ini dipandang sebagai alegori politik tentang pembebasan rakyat dari penindasan. Detail pahatan yang sangat halus menunjukkan tingkat keahlian seniman masa Singhasari yang sangat tinggi.",
      "Sebagai cagar budaya nasional, Candi Kidal mendapatkan perlindungan dan perawatan dari pemerintah. Situs ini menjadi salah satu destinasi wisata sejarah populer di Kabupaten Malang yang sering dikunjungi oleh wisatawan domestik dan mancanegara. Program edukasi dan interpretasi sejarah yang diselenggarakan di lokasi membantu pengunjung memahami konteks historis dan makna filosofis dari peninggalan arsitektur yang megah ini."
    ],
  },
  {
    title: "Orem-Orem",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Tempe_Mendoan.jpg/800px-Tempe_Mendoan.jpg",
    lokasi: "Kuliner Lokal",
    estimasi: "Rp 15.000",
    category: "Kuliner Tradisional",
    rincian: "Makanan khas berbahan tempe.",
    description: [
      "Orem-orem adalah hidangan tradisional khas Malang yang berbahan dasar tempe gembus atau tempe biasa yang diolah dengan bumbu rempah kaya cita rasa. Masakan ini memiliki kuah kental berwarna kecokelatan yang berasal dari campuran kecap manis, santan, dan bumbu halus seperti bawang merah, bawang putih, kemiri, dan cabai. Orem-orem biasanya disajikan dengan nasi hangat dan lalapan segar sebagai pendamping.",
      "Dalam tradisi kuliner Malang, Orem-orem memiliki kedudukan istimewa sebagai masakan rumahan yang menjadi comfort food bagi masyarakat setempat. Hidangan ini mencerminkan kearifan lokal dalam memanfaatkan bahan pangan yang murah dan mudah didapat, seperti tempe, menjadi sajian yang lezat dan bergizi tinggi. Setiap keluarga di Malang biasanya memiliki resep orem-orem turun-temurun dengan variasi bumbu yang sedikit berbeda.",
      "Popularitas Orem-orem semakin meningkat berkat promosi wisata kuliner dan dokumentasi di media sosial. Warung-warung tradisional yang menyajikan orem-orem autentik menjadi tujuan wisata kuliner yang dicari oleh pengunjung dari luar kota. Upaya pelestarian resep tradisional dan pengembangan variasi modern memastikan hidangan khas ini tetap relevan dan diminati oleh generasi masa kini tanpa kehilangan cita rasa otentiknya."
    ],
  },
  {
    title: "Petik Laut",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Labuhan.jpg/800px-Labuhan.jpg",
    lokasi: "Sendang Biru",
    estimasi: "Event Tahunan",
    category: "Ritual Adat",
    rincian: "Upacara syukur nelayan.",
    description: [
      "Petik Laut atau Labuhan adalah upacara adat yang dilaksanakan oleh masyarakat nelayan di pesisir selatan Kabupaten Malang, khususnya di kawasan Sendang Biru dan Pantai Tamban. Ritual ini merupakan bentuk ungkapan syukur kepada Tuhan Yang Maha Esa atas rezeki hasil laut yang melimpah serta permohonan keselamatan bagi para nelayan dalam mengarungi lautan. Upacara ini biasanya digelar setahun sekali dengan prosesi yang sakral dan meriah.",
      "Rangkaian upacara Petik Laut mencakup doa bersama, prosesi arak-arakan sesaji dari darat menuju laut, hingga pelepasan sesaji ke tengah laut menggunakan perahu yang dihias indah. Sesaji biasanya berisi kepala kerbau, hasil bumi, bunga-bungaan, dan berbagai makanan tradisional. Selain ritual utama, acara ini juga dimeriahkan dengan pertunjukan seni budaya seperti wayang, tayub, dan hiburan rakyat yang mempererat kebersamaan masyarakat pesisir.",
      "Petik Laut di Sendang Biru telah berkembang menjadi event wisata budaya yang menarik perhatian wisatawan dari berbagai daerah. Pemerintah Kabupaten Malang secara aktif mendukung pelaksanaan upacara ini sebagai bagian dari pelestarian budaya maritim dan pengembangan pariwisata pesisir. Meskipun mengalami modernisasi dalam beberapa aspek, esensi spiritual dan nilai-nilai kearifan lokal dalam Petik Laut tetap dijaga dengan penuh kehormatan oleh masyarakat setempat."
    ],
  },
];

const budayaLetterImages = [
  "https://static.republika.co.id/uploads/images/xlarge/028717000-1647511644-1280-856.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXXzHp-Ez-9i09-u1O3FUhByLM_7JjytyXWdi6MiU78dh8Fbst4hS6dyM&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcKJztI8a0T81GXnnvVnlWMmJlQFx_T4HtpWvfvmHZ6evNlUHreOLEdE&s=10",
  "https://asset.kompas.com/crops/z78mzlTpqX_uMmItByGMogOXaHI=/140x0:983x562/750x500/data/photo/2022/11/23/637deff4a7743.jpg",
  "https://www.tournesia.com/blog/wp-content/uploads/2026/02/Pesona-Kota-Malang-Wisata-Sejarah-Kuliner-dan-Budaya.jpg",
  "https://cdn-1.timesmedia.co.id/images/2024/04/27/Pawai-Budaya-Kota-Malang-2.jpg",
];

export default function Budaya() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedBudaya, setSelectedBudaya] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const currentHero = heroSlides[currentSlide];

  const goToPreviousSlide = () => setCurrentSlide((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const goToNextSlide = () => setCurrentSlide((c) => (c + 1) % heroSlides.length);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <section className="relative isolate overflow-hidden bg-[url('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1920')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 md:px-24 pt-32 pb-24 items-center">
          <div>
            <div className="flex flex-row text-[6rem] md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-4">
              {['B', 'U', 'D', 'A', 'Y', 'A'].map((char, i) => (
                <span key={i} style={{ backgroundImage: `url('${budayaLetterImages[i]}')`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "cover", backgroundPosition: "center" }}>{char}</span>
              ))}
            </div>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mt-2 mb-6">💡 <strong className="text-emerald-400">Fun Fact:</strong> Tahukah kamu? Malang dijuluki sebagai "Parijs van Oost-Java" karena tata kotanya yang indah.</p>
          </div>
          <div className="relative">
            <div className="relative h-[400px] w-full overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
              <img key={currentSlide} src={currentHero.image} alt={currentHero.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button type="button" onClick={goToPreviousSlide} className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">‹</button>
              <button type="button" onClick={goToNextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">›</button>
              <div className="absolute bottom-5 left-5 max-w-[85%] rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-lg">
                <p className="text-2xl font-black text-white">{currentHero.title}</p>
                <p className="text-sm text-gray-200">{currentHero.text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F8F4E1] py-24 px-8 md:px-24 flex flex-col items-center">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-8">Lebih dari sekadar kota. <br/><span className="text-emerald-700">Ini adalah Ngalam.</span></h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">Titik temu sempurna antara warisan peradaban masa lalu, sejuknya udara pegunungan, dan inovasi pendidikan masa depan. Temukan alasan mengapa jutaan orang jatuh cinta pada kota ini.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-24">
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-emerald-900/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center">
            <span className="text-6xl mb-6">🏛️</span>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Abad ke-8</h3>
            <p className="text-gray-500 font-medium">Jejak sejarah panjang dari era Kerajaan Kanjuruhan hingga kolonial.</p>
          </div>
          <div className="bg-[#14532d] text-white rounded-[2rem] p-10 shadow-2xl flex flex-col justify-center items-center text-center transform md:-translate-y-6 hover:scale-105 transition-all duration-500">
            <span className="text-6xl mb-6">⛰️</span>
            <h3 className="text-5xl font-black text-emerald-400 mb-3">440<span className="text-2xl font-medium text-white"> mdpl</span></h3>
            <p className="text-emerald-50 text-lg">Ketinggian rata-rata yang menyajikan udara sejuk pegunungan sepanjang tahun.</p>
          </div>
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-emerald-900/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center">
            <span className="text-6xl mb-6">🎓</span>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">80+ Kampus</h3>
            <p className="text-gray-500 font-medium">Pusat pendidikan, vokasi, dan inovasi generasi muda di Jawa Timur.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
          <div className="relative h-[500px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Singhasari_temple.jpg/800px-Singhasari_temple.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sejarah" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
              <h4 className="text-3xl font-bold text-white mb-2">Pusat Peradaban</h4>
              <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">Menyimpan kekayaan candi dan peninggalan prasejarah yang megah.</p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg">
            <img src="https://images.unsplash.com/photo-1582650811985-e117498c474e?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Urban" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
              <h4 className="text-3xl font-bold text-white mb-2">Harmoni Urban</h4>
              <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">Perpaduan tata kota yang dinamis dengan pelestarian budaya lokal.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F4E1] py-24 px-8 md:px-24">
        <h2 className="text-4xl md:text-5xl font-bold text-[#14532d] text-center mb-6">Kekayaan Budaya Kota Malang</h2>
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-16 text-lg leading-relaxed">Menelusuri jejak warisan leluhur yang tak lekang oleh waktu. Dari seni pertunjukan yang memukau hingga situs sejarah yang megah, mari selami lebih dalam identitas dan pusat peradaban yang membentuk jiwa masyarakat Jawa Timur.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {malangCultures.slice(0, visibleCount).map((item) => (
            <article key={item.title} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover rounded-t-2xl" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.rincian}</p>
                <button onClick={() => setSelectedBudaya(item)} className="text-emerald-700 font-semibold hover:underline">Pelajari Lebih Lanjut ➔</button>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-12">
            {visibleCount < malangCultures.length ? (
                <button onClick={() => setVisibleCount(malangCultures.length)} className="bg-[#14532d] text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-800 transition-colors shadow-lg flex items-center gap-2">Tampilkan Lebih Banyak ▼</button>
            ) : (
                <button onClick={() => setVisibleCount(6)} className="bg-gray-300 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-400 transition-colors shadow-lg flex items-center gap-2">Tampilkan Lebih Sedikit ▲</button>
            )}
        </div>
      </section>

      <footer className="bg-[#4A3B2C] text-white pt-16 pb-8 px-8 md:px-24 border-t-4 border-emerald-700/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
                <h3 className="text-3xl font-black mb-4"><span className="text-yellow-400">Wisata </span><span className="text-green-500">Ngalam</span></h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">Platform eksplorasi digital Malang Raya. Kami berkomitmen menyajikan informasi destinasi terbaik, rincian harga, hingga pemetaan interaktif real-time untuk mempermudah petualangan liburanmu.</p>
                <div className="flex gap-3">
                    {['🌐', '📸', '✈️'].map(icon => <button key={icon} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">{icon}</button>)}
                </div>
            </div>
            <div>
                <h4 className="text-xl font-bold mb-6 border-b-2 border-emerald-600 pb-2 inline-block">Jelajahi</h4>
                <div className="flex flex-col gap-4 text-gray-300">
                    <p className="hover:text-yellow-400 cursor-pointer">🔍 Cari Destinasi</p>
                    <p className="hover:text-yellow-400 cursor-pointer">🏷️ Ragam Kategori</p>
                    <p className="hover:text-yellow-400 cursor-pointer">🗺️ Peta Geografis Interaktif</p>
                </div>
            </div>
            <div>
                <h4 className="text-xl font-bold mb-6 border-b-2 border-emerald-600 pb-2 inline-block">Kotak Aspirasi</h4>
                <p className="text-yellow-400 font-bold text-xs uppercase mb-4">ADA KRITIK PEDAS ATAU IDE GOKIL BIAR WEB INI MAKIN KEREN? 🔥</p>
                <textarea className="w-full bg-[#5d4a38] text-white border border-white/20 rounded-xl p-4 mb-4 placeholder-gray-400 focus:outline-none focus:border-green-500" rows="3" placeholder="Tumpahin semua isi pikiranmu di sini, jangan ragu ya cuy... 🚀"></textarea>
                <button className="w-full bg-[#1da04f] hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors shadow-md">Kirim Umpan Balik 🚀</button>
            </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-gray-400 text-sm"><p>© 2026 Wisata Malang Raya. Built By Team Bawa Nara Pasti Menang.</p></div>
      </footer>

      {selectedBudaya && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto flex flex-col">
          <div className="w-full flex justify-between items-center p-6 border-b border-gray-200">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Detail Budaya</span>
            <button onClick={() => setSelectedBudaya(null)} className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">Kembali</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto p-8 lg:p-16 w-full items-start">
            <img src={selectedBudaya.imageUrl} alt={selectedBudaya.title} className="w-full h-[600px] object-cover rounded-3xl shadow-xl" />
            <div>
              <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">{selectedBudaya.category}</span>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-6 mb-8">{selectedBudaya.title}</h1>
              <div className="prose prose-lg text-gray-700 leading-relaxed">
                {selectedBudaya.description && selectedBudaya.description.map((paragraph, idx) => (
                  <p key={idx} className="mb-6">{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="bg-gray-50 rounded-2xl px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Lokasi</p>
                  <p className="text-gray-900 font-semibold">{selectedBudaya.lokasi}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Estimasi Biaya</p>
                  <p className="text-gray-900 font-semibold">{selectedBudaya.estimasi}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}