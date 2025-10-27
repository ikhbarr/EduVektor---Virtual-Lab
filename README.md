# EduVektor
**EduVektor** adalah aplikasi web interaktif yang dirancang untuk merevolusi cara belajar tentang vektor. Platform ini menggabungkan materi pembelajaran teoretis dengan simulasi visual sehingga memungkinkan pengguna untuk melihatnya beraksi secara *real-time*.
Dari dasar-dasar aljabar vektor hingga aplikasi dunia nyata di bidang Fisika, EduVektor menyediakan lingkungan belajar yang lengkap dan menarik.

## Fitur Utama
Proyek ini dibangun dengan serangkaian fitur yang berfokus pada pengalaman belajar interaktif:
  * **Otentikasi Pengguna:** Sistem *login* dan registrasi yang aman menggunakan Firebase Authentication.
  * **Materi Pembelajaran:** Konten materi yang kaya disajikan, memungkinkan perpaduan antara teks penjelasan dan formula matematika.
      * **Topik Mencakup:** Dasar-Dasar Vektor, Aplikasi di AI, Fisika, dan Matematika.
  * **Simulasi Vektor Kartesius:** Kanvas interaktif di mana pengguna dapat memanipulasi Vektor A dan B dan secara instan menghitung serta memvisualisasikan **Vektor Resultan (A + B)**.
  * **Simulasi Proyektor Vektor:** Simulasi berbasis fisika di mana pengguna menggambar sebuah vektor untuk menentukan lintasan, memberikan pemahaman intuitif tentang komponen dan magnitudo.
  * **Simulasi Palet RGB:** Aplikasi unik yang mengajarkan operasi vektor menggunakan **warna RGB** sebagai model vektor 3D.
  * **Sistem Kuis:** Uji pemahaman pengguna dengan kuis pilihan ganda. Jawaban diperiksa, skor dihitung, dan hasilnya disimpan.
  * **Dasbor Progres Pengguna:** Halaman khusus bagi pengguna yang *login* untuk melacak kemajuan belajar mereka.
      * **Statistik Utama:** Menampilkan skor tertinggi, skor rata-rata, dan jumlah pengerjaan kuis.
      * **Grafik Progres:** Visualisasi skor kuis dari waktu ke waktu menggunakan *recharts*.
      * **Riwayat Kuis:** Tabel terperinci dari semua upaya kuis sebelumnya.
  * **Penyimpanan Riwayat:** Riwayat perhitungan dari simulasi Kartesius dan hasil kuis secara otomatis disimpan ke Firestore untuk pengguna yang terautentikasi.
  * **Tur Interaktif:** Panduan *onboarding* untuk memandu pengguna baru melalui fitur-fitur di halaman simulasi.

## Tumpukan Teknologi (Tech Stack)
  * **Frontend:** **React.js**
  * **Routing:** **React Router v6**
  * **Backend & Database:** **Firebase**
      * Firebase Authentication
      * Firestore (sebagai database NoSQL)
  * **Styling:** **CSS Modules** & CSS Global
  * **Konten & Matematika:**
      * **MDX (Markdown with JSX)**
      * **React-Katex** (untuk me-render formula matematika \<Math\>)
  * **Visualisasi Data:** **Recharts** (untuk grafik di dasbor)
  * **UI/UX:**
      * **React Joyride** (untuk tur interaktif)
      * Komponen kustom (Tabs, Modals, dll.)
  * **Development:** Dibangun menggunakan **Vite**

## Memulai Proyek
Untuk menjalankan proyek ini secara lokal:
1.  **Clone repositori:**
    git clone https://github.com/nama-anda/eduvektor.git
    cd eduvektor

2.  **Install dependensi:**
    npm install

3.  **Siapkan Firebase:**
      * Buat proyek baru di [Firebase Console](https://console.firebase.google.com/).
      * Aktifkan **Authentication** (Email/Password dan Google).
      * Aktifkan **Firestore Database**.
      * Dapatkan konfigurasi proyek Anda (kunci API, dll.).
      * Buat file `.env.local` di root proyek dan isi dengan kredensial Firebase Anda:
        VITE_API_KEY=...
        VITE_AUTH_DOMAIN=...
        VITE_PROJECT_ID=...
        VITE_STORAGE_BUCKET=...
        VITE_MESSAGING_SENDER_ID=...
        VITE_APP_ID=...
        VITE_MEASUREMENT_ID=...

4.  **Jalankan server development:**
    npm run dev
