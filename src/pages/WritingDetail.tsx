import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { writings } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/AnimationPrimitives";
import { ArrowLeft, Clock, CalendarDays } from "lucide-react";

const articlesContent: Record<string, { paragraphs: string[]; quote?: string; headings?: string[] }> = {
  "rekonseptualisasi-pendidikan-fisika": {
    headings: ["Krisis Manipulasi Simbol Tanpa Makna", "Simulasi sebagai Jembatan Fenomenologis", "Menuju Pembelajaran Berbasis Rekonstruksi"],
    paragraphs: [
      "Dalam banyak ruang kelas fisika tingkat menengah di Indonesia, fisika sering kali tereduksi menjadi serangkaian rumus aljabar yang harus dihafal untuk memecahkan soal ujian. Siswa dapat dengan lancar menghitung nilai gaya normal atau percepatan sudut, namun ketika dihadapkan pada fenomena fisika di dunia nyata yang memerlukan transfer konsep, pemahaman mereka runtuh.",
      "Kesenjangan ini terjadi karena proses belajar jarang memfasilitasi terjadinya perubahan konseptual (conceptual change). Teori belajar konstruktivisme menegaskan bahwa siswa tidak datang ke kelas sebagai bejana kosong; mereka membawa pra-konsepsi intuitif yang kerap bertentangan dengan hukum fisika baku.",
      "Teknologi pendidikan modern seperti simulasi Canvas 2D dan WebGL yang interaktif hadir bukan untuk menggantikan peran laboratorium fisik, melainkan untuk membuat hal-hal yang abstrak menjadi kasat mata: vektor medan gaya, dinamika fluks, dan momentum. Ketika simulasi dipadukan dengan alur inkuiri terstruktur dan tahap refleksi wajib, siswa tidak lagi sekadar menghafal hasil akhir, melainkan mengonstruksi pemahaman secara mandiri."
    ],
    quote: "Pemahaman sejati lahir saat siswa menghubungkan model mental dalam pikirannya dengan fenomena empiris, bukan dari manipulasi simbol matematika tanpa jangkar konseptual."
  },
  "prinsip-epistemik-ai-riset": {
    headings: ["Bahaya Halusinasi dan Otomasi Buta", "Arsitektur Lima Lapis Epistemik", "Prinsip Human-in-the-Control"],
    paragraphs: [
      "Kemunculan model bahasa besar (LLM) telah memicu gelombang penggunaan AI generatif dalam penulisan dan riset akademis. Namun dalam riset pendidikan sains, bahaya terbesar bukanlah kekurangan informasi, melainkan munculnya sintesis yang terdengar meyakinkan namun secara metodologis cacat atau bahkan halusinasi data.",
      "Untuk menjaga integritas ilmiah, sistem AI untuk riset seperti PHYSION dirancang dengan pendekatan bertingkat (epistemic retrieval). Model tidak diizinkan menyimpulkan klaim tanpa melacak kutipan langsung hingga ke tingkat struktur IMRAD (Introduction, Methods, Results, and Discussion) dari dokumen sumber.",
      "AI seharusnya bertindak sebagai pembantu kognitif yang memetakan variasi argumen, menghitung trust score metodologis, dan menyajikan bukti terkalibrasi kepada peneliti, sementara keputusan inferensial akhir tetap berada sepenuhnya di tangan akal manusia (human-in-control)."
    ],
    quote: "Kecerdasan buatan dalam riset sains harus dirancang untuk memperjelas rantai penalaran dan integritas bukti, bukan untuk mengambil jalan pintas pemikiran kritis."
  },
  "observatory-miskonsepsi-conceptra": {
    headings: ["Pentingnya Data Forensik dalam Riset", "Memvalidasi 17.000 Artikel dengan Invariant", "Dari Data Menjadi Intervensi Pedagogis"],
    paragraphs: [
      "Selama tiga dekade terakhir, ratusan peneliti di Indonesia telah mendokumentasikan miskonsepsi fisika siswa dalam berbagai skripsi, tesis, dan artikel jurnal. Sayangnya, seluruh temuan berharga ini tersebar dalam repositori kampus yang terfragmentasi tanpa adanya ontologi atau peta pengetahuan terpusat.",
      "Membangun Conceptra sebagai laboratorium observasi miskonsepsi menuntut ketelitian forensik data yang ketat. Mengingat banyaknya metadata jurnal lama yang rentan terhadap galat, pipeline ekstraksi kami mengintegrasikan API OpenAlex dan menerapkan aturan invariant yang ketat: artikel tanpa DOI valid atau bukti metodologis yang terverifikasi ditandai secara tegas.",
      "Hasil dari pemetaan 1.002 varian miskonsepsi pada 17.755 artikel ini bukan sekadar statistik, melainkan fondasi bagi para pendidik untuk merancang instrumen diagnostik yang tepat sasaran sebelum materi pelajaran disampaikan di kelas."
    ],
    quote: "Data riset pendidikan yang terisolasi adalah kesempatan belajar yang hilang. Menyusunnya ke dalam knowledge graph terverifikasi membuka jalan bagi perbaikan kurikulum nasional."
  },
  "analisis-wacana-publik-sains": {
    headings: ["Sains di Luar Dinding Sekolah", "Klasifikasi 8 Tindak Diskursus dengan IndoBERT", "Menjembatani Sains Populer dan Formal"],
    paragraphs: [
      "Di era platform video daring seperti YouTube, jutaan generasi muda Indonesia belajar konsep sains di luar kelas melalui kanal sains edukatif seperti Kok Bisa?. Pertanyaan penting bagi peneliti pendidikan adalah: bentuk percakapan dan penalaran ilmiah apa yang sebenarnya terjadi di kolom komentar video tersebut?",
      "Melalui penambangan 202.429 komentar publik pada 35 video fisika, kami melatih model IndoBERT untuk mengenali 8 kategori tindak diskursus (discourse acts), mulai dari ekspresi rasa ingin tahu, analogi informal, miskonsepsi umum, hingga perdebatan epistemik.",
      "Dengan akurasi 97.73%, data ini membuktikan bahwa minat publik terhadap fisika sangat masif jika disajikan dengan narasi yang relevan. Temuan ini menjadi masukan berharga bagi kurikulum formal untuk mengadopsi cara-cara komunikasi sains yang lebih membumi dan memantik rasa ingin tahu autentik."
    ],
    quote: "Kolom komentar media edukasi adalah cermin jujur dari literasi sains publik: di sanalah keingintahuan murni, miskonsepsi, dan dialog informal berdenyut."
  }
};

const WritingDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = writings.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Muhamad Farrel Dava Fauzan`;
    } else {
      navigate("/writing");
    }
  }, [article, navigate]);

  if (!article) return null;

  const content = articlesContent[article.slug] || {
    paragraphs: [article.excerpt],
    headings: ["Perspektif"],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <article className="pt-32 pb-20">
          <div className="container-narrow">
            <FadeIn>
              <Link
                to="/writing"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-10 group"
              >
                <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
                Kembali ke Daftar Tulisan
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold border bg-card text-foreground">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Clock size={12} /> {article.readingTime}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <CalendarDays size={12} /> {article.date}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight font-display">
                {article.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-12 font-medium italic border-l-4 border-[hsl(180_70%_35%)] pl-6">
                {article.excerpt}
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {content.paragraphs.map((p, idx) => (
                  <div key={idx} className="space-y-3">
                    {content.headings && content.headings[idx] && (
                      <h2 className="text-xl font-bold text-foreground mt-8 mb-3">
                        {content.headings[idx]}
                      </h2>
                    )}
                    <p>{p}</p>
                  </div>
                ))}

                {content.quote && (
                  <blockquote className="my-8 p-6 rounded-2xl border bg-muted/40 text-foreground font-medium italic border-l-4 border-l-[hsl(180_70%_35%)]">
                    "{content.quote}"
                  </blockquote>
                )}
              </div>
            </FadeIn>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default WritingDetail;
