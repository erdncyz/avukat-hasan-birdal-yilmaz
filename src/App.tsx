import { motion } from 'motion/react';
import { Scale, ShieldCheck, Gavel, Briefcase, Users, FileText, Phone, MapPin, Mail, Instagram, Linkedin, Facebook, ChevronRight, Star, Quote } from 'lucide-react';
import { useState, useEffect, createContext, useContext } from 'react';
import { cn } from './lib/utils';
import birdalImage from '../birdal.jpeg';

// ─── Language system ────────────────────────────────────────────────────────
type Lang = 'tr' | 'en';

const T = {
  tr: {
    subtitle: 'AVUKAT & DANIŞMANLIK',
    nav: { about: 'Hakkımızda', services: 'Uzmanlık Alanları', reviews: 'Görüşler', contact: 'İletişim' },
    hero: {
      badge: 'Hukuki Mükemmellik',
      h1a: 'Adaletin', h1b: 'Güvenilir', h1c: 'Adresi.',
      desc: 'Malatya merkezli hukuk büromuzda, her davanın benzersiz olduğunun bilinciyle, profesyonel ve sonuç odaklı çözümler sunuyoruz.',
      cta1: 'Ücretsiz Danışmanlık', cta2: 'Uzmanlık Alanlarımız',
      reviewBadge: '76+ Başarılı Yorum', reviewSub: '"Malatya\'nın en iyi avukatlarından..."',
    },
    services: {
      label: 'Uzmanlık Alanlarımız',
      h: 'Her Alanda', hItalic: 'Keskin', hEnd: 'Hukuki Çözümler.',
      desc: 'Hukuki süreçlerin karmaşıklığını, basit ve etkili stratejilere dönüştürerek haklarınızı en üst düzeyde savunuyoruz.',
      learnMore: 'Detaylı Bilgi',
      areas: [
        { title: 'Ceza Hukuku', description: 'Bireysel hak ve özgürlüklerin korunması temel prensibimizdir. Her aşamada titiz savunma stratejileri geliştiriyoruz.' },
        { title: 'Aile Hukuku', description: 'Boşanma, mal paylaşımı ve velayet davalarında hassasiyet ve profesyonellik ile yanınızdayız.' },
        { title: 'Ticaret Hukuku', description: 'Şirket kuruluşları, sözleşme hazırlığı ve ticari uyuşmazlıklarda kurumsal çözümler sunuyoruz.' },
        { title: 'İş Hukuku', description: 'İşçi ve işveren haklarının korunması, işe iade ve tazminat süreçlerinin yönetimi.' },
        { title: 'Gayrimenkul Hukuku', description: 'Tapu iptal tescil, ortaklığın giderilmesi ve kira hukuku alanında uzman danışmanlık.' },
        { title: 'İcra ve İflas Hukuku', description: 'Alacak takibi ve borç yönetimi süreçlerinde hızlı ve etkin hukuki prosedürler.' },
      ],
    },
    about: {
      title: 'Hakkında &', titleItalic: 'Deneyim',
      t1h: 'Eğitim & Kariyer',
      t1p: 'Dicle Üniversitesi Hukuk Fakültesi\'nden mezun oldum. Okurken ve mezun olduktan sonra çeşitli ulusal ve uluslararası hukuk bürolarında deneyim kazandım. Son 5 yıl içerisinde kendi hukuk büromu kurdum.',
      t2h: 'Uzmanlık Alanları',
      t2p: 'Ticaret, Şirketler, Kiralama, Sözleşmeler, İcra-İflas, Bankacılık ve Sigorta Hukuku alanlarında iyi bir tecrübeye sahibim.',
      t3h: 'Hizmet Verilen Kesimler',
      t3p: 'Kendi hukuk büromda birçok anonim ve limited şirkete hizmet verdim. Aynı zamanda hukuk davalarında şahıslara hukuki hizmet verdim.',
      quote: '"Hukuk sadece bir meslek değil, toplumsal adaletin sağlanması için verilen bir sözdür. Biz bu sözü Malatya\'da her gün yeniden veriyoruz."',
      role: 'Kurucu Ortak',
    },
    reviews: {
      label: 'Müvekkil Görüşleri',
      h: 'Yüzlerce Memnun', hItalic: 'Birey ve Kurum', cta: 'Tamamı',
    },
    contact: {
      label: 'İletişim',
      h: 'Yolunuzu', hItalic: 'Hukukla', hEnd: 'Aydınlatalım.',
      addressLabel: 'Adres',
      address: 'Cemal Gürsel Mah. İsmet Paşa Cad. No:115 Kat 1 No:11, Yeşilyurt/Malatya',
      openMap: 'Haritada Aç',
      phoneLabel: 'Telefon', emailLabel: 'E-Posta',
      formTitle: 'Hızlı Danışma Formu',
      nameLabel: 'Ad Soyad', namePh: 'Ahmet Yılmaz',
      phoneLabel2: 'Telefon', subjectLabel: 'Konu',
      subjects: ['Hukuki Yardım Almak İstiyorum', 'Ceza Hukuku Danışmanlığı', 'Aile Hukuku / Boşanma', 'İş Hukuku', 'Diğer'],
      msgLabel: 'Mesajınız', msgPh: 'Davanız hakkında kısa bir bilgi veriniz...',
      submit: 'Talep Gönder',
      kvkk: 'Verileriniz KVKK kapsamında korunmaktadır ve asla üçüncü şahıslarla paylaşılmaz.',
    },
    footer: {
      subtitle: 'AVUKAT & DANIŞMANLIK',
      about: 'Hakkımızda', services: 'Uzmanlık Alanları', contact: 'İletişim',
      rights: 'Tüm Hakları Saklıdır.', dev: 'Geliştiren: Erdinç Yılmaz',
    },
  },
  en: {
    subtitle: 'ATTORNEY & CONSULTANCY',
    nav: { about: 'About', services: 'Practice Areas', reviews: 'Reviews', contact: 'Contact' },
    hero: {
      badge: 'Legal Excellence',
      h1a: "Justice's", h1b: 'Trusted', h1c: 'Address.',
      desc: 'At our Malatya-based law firm, with the awareness that each case is unique, we provide professional and result-oriented legal solutions.',
      cta1: 'Free Consultation', cta2: 'Our Practice Areas',
      reviewBadge: '76+ Successful Reviews', reviewSub: '"One of the best lawyers in Malatya..."',
    },
    services: {
      label: 'Our Practice Areas',
      h: 'In Every Field', hItalic: 'Sharp', hEnd: 'Legal Solutions.',
      desc: 'We transform the complexity of legal processes into simple and effective strategies, defending your rights at the highest level.',
      learnMore: 'Learn More',
      areas: [
        { title: 'Criminal Law', description: 'Protection of individual rights and freedoms is our core principle. We develop meticulous defense strategies at every stage.' },
        { title: 'Family Law', description: 'We are by your side in divorce, property division, and custody cases with sensitivity and professionalism.' },
        { title: 'Commercial Law', description: 'We provide corporate solutions in company formations, contract preparation, and commercial disputes.' },
        { title: 'Labor Law', description: 'Protection of employee and employer rights, management of reinstatement and compensation proceedings.' },
        { title: 'Real Estate Law', description: 'Expert consultancy in title deed cancellation, dissolution of co-ownership, and tenancy law.' },
        { title: 'Enforcement & Bankruptcy', description: 'Fast and effective legal procedures in debt collection and debt management processes.' },
      ],
    },
    about: {
      title: 'About &', titleItalic: 'Experience',
      t1h: 'Education & Career',
      t1p: 'I graduated from Dicle University Faculty of Law. During and after my studies, I gained experience at various national and international law firms. I established my own law office 5 years ago.',
      t2h: 'Areas of Expertise',
      t2p: 'I have extensive experience in Commercial, Corporate, Lease, Contracts, Enforcement & Bankruptcy, Banking, and Insurance Law.',
      t3h: 'Clients Served',
      t3p: 'At my law office, I have provided services to many joint-stock and limited liability companies, as well as to individuals in legal disputes.',
      quote: '"Law is not merely a profession; it is a pledge given for social justice. We renew this pledge every day in Malatya."',
      role: 'Founding Partner',
    },
    reviews: {
      label: 'Client Reviews',
      h: 'Hundreds of Satisfied', hItalic: 'Individuals & Companies', cta: 'See All',
    },
    contact: {
      label: 'Contact',
      h: 'Let Us Light', hItalic: 'Your Path', hEnd: 'with Law.',
      addressLabel: 'Address',
      address: 'Cemal Gürsel Mah. İsmet Paşa Cad. No:115 Kat 1 No:11, Yeşilyurt/Malatya',
      openMap: 'Open in Maps',
      phoneLabel: 'Phone', emailLabel: 'Email',
      formTitle: 'Quick Consultation Form',
      nameLabel: 'Full Name', namePh: 'John Doe',
      phoneLabel2: 'Phone', subjectLabel: 'Subject',
      subjects: ['I Need Legal Assistance', 'Criminal Law Consultation', 'Family Law / Divorce', 'Labor Law', 'Other'],
      msgLabel: 'Your Message', msgPh: 'Please provide a brief description of your case...',
      submit: 'Send Request',
      kvkk: 'Your data is protected and will never be shared with third parties.',
    },
    footer: {
      subtitle: 'ATTORNEY & CONSULTANCY',
      about: 'About', services: 'Practice Areas', contact: 'Contact',
      rights: 'All Rights Reserved.', dev: 'Developed by: Erdinç Yılmaz',
    },
  },
} as const;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'tr', setLang: () => {} });
const useLang = () => useContext(LangContext);

const GOOGLE_MAPS_URL = 'https://www.google.com/search?sca_esv=916ec883b16d68de&q=Malatya+Avukat+-+Hasan+Birdal+Y%C4%B1lmaz+Yorumlar&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NDCyNDG3tLAwMjY3NDE2NrEw2sDI-IpRzzcxJ7GkMlHBsaw0O7FEQVfBI7E4MU_BKbMoJTFHIfLIxpzcxCqFyPyi0tycxKJFrCRqAAAt7IvBfAAAAA&rldimm=1029479882371433482&tbm=lcl&hl=tr-TR&sa=X&ved=2ahUKEwii-f_7gMWUAxW9GYYAHRd9DVcQ9fQKegQILBAG&biw=1317&bih=1081&dpr=2#lkt=LocalPoiReviews';
const GOOGLE_MAPS_EMBED_URL = 'https://www.google.com/maps?q=Hasan%20Birdal%20Y%C4%B1lmaz%20Avukatl%C4%B1k%20Ofisi%2C%20Cemal%20G%C3%BCrsel%20Mah.%20%C4%B0smet%20Pa%C5%9Fa%20Cad.%20No%3A115%20Kat%201%20No%3A11%2C%20Ye%C5%9Filyurt%2FMalatya&output=embed';
const INSTAGRAM_URL = 'https://www.instagram.com/av.hasanbirdalyilmaz?igsh=MTY0OHRncWQ1MmtxaQ%3D%3D';
const LINKEDIN_URL = 'https://www.linkedin.com/in/hasan-birdal-y%C4%B1lmaz-880634249/';
const PHONE_NUMBER = '+90 507 147 47 96';

// --- Components ---

const Navbar = () => {
  const { lang, setLang } = useLang();
  const t = T[lang].nav;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="serif text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            HASAN BİRDAL YILMAZ
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-gold-600">
            {T[lang].subtitle}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          <a href="#about" className="hover:text-gold-600 transition-colors">{t.about}</a>
          <a href="#services" className="hover:text-gold-600 transition-colors">{t.services}</a>
          <a href="#reviews" className="hover:text-gold-600 transition-colors">{t.reviews}</a>
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:border-gold-500 hover:text-gold-700 transition-all rounded-sm text-xs font-bold tracking-widest"
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <a href="#contact" className="px-5 py-2.5 bg-slate-900 text-white hover:bg-gold-700 transition-all rounded-sm flex items-center gap-2 group">
            {t.contact} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile lang toggle */}
        <button
          onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
          className="md:hidden px-3 py-1.5 border border-slate-200 text-slate-600 hover:border-gold-500 hover:text-gold-700 transition-all rounded-sm text-xs font-bold tracking-widest"
        >
          {lang === 'tr' ? 'EN' : 'TR'}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { lang } = useLang();
  const t = T[lang].hero;
  return (
    <section className="relative flex items-center pt-24 pb-14 lg:min-h-screen lg:pt-20 lg:pb-0 overflow-hidden bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10 order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-[11px] font-semibold uppercase tracking-widest mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            {t.badge}
          </div>
          <h1 className="serif text-5xl sm:text-6xl md:text-8xl font-medium leading-[0.92] text-slate-900 mb-6 sm:mb-8 italic">
            {t.h1a} <br />
            <span className="not-italic font-semibold text-gold-600">{t.h1b}</span> <br />
            {t.h1c}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-md mb-8 sm:mb-10 leading-relaxed font-light">
            {t.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#contact" className="px-6 sm:px-8 py-4 bg-slate-900 text-white rounded-sm text-sm uppercase tracking-widest font-semibold hover:bg-gold-700 transition-all text-center">
              {t.cta1}
            </a>
            <a href="#services" className="px-6 sm:px-8 py-4 border border-slate-200 text-slate-900 rounded-sm text-sm uppercase tracking-widest font-semibold hover:bg-slate-50 transition-all text-center">
              {t.cta2}
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="order-1 lg:order-2 relative aspect-[3/4] sm:aspect-[4/5] w-full max-w-[280px] sm:max-w-lg mx-auto lg:ml-auto"
        >
          <div className="hidden sm:block absolute inset-0 border-[12px] border-gold-50 transform translate-x-6 translate-y-6 z-0" />
          <div className="relative z-10 w-full h-full overflow-hidden bg-slate-100 grayscale hover:grayscale-0 transition-all duration-1000">
            <img 
              src={birdalImage}
              alt="Avukat Hasan Birdal Yılmaz" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-2xl z-20 hidden md:block border-l-4 border-gold-500">
             <div className="flex gap-1 mb-2">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />)}
             </div>
             <p className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-1">{t.reviewBadge}</p>
             <p className="text-xs text-slate-500 italic">{t.reviewSub}</p>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:block absolute top-1/4 -right-24 w-96 h-96 bg-gold-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="hidden lg:block absolute bottom-1/4 -left-24 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
    </section>
  );
};

const PracticeAreaCard = ({ icon: Icon, title, description, learnMore, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="group p-10 bg-white border border-slate-100 hover:border-gold-300 transition-all duration-500 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-0 bg-gold-500 group-hover:h-full transition-all duration-500" />
    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-gold-500 transition-colors duration-500">
      <Icon className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors duration-500" />
    </div>
    <h3 className="serif text-2xl font-semibold text-slate-900 mb-4 tracking-tight group-hover:text-gold-700 transition-colors">{title}</h3>
    <p className="text-slate-500 font-light leading-relaxed mb-6">{description}</p>
    <a href="#contact" className="text-xs uppercase tracking-widest font-bold text-slate-400 group-hover:text-gold-700 flex items-center gap-2 group/link">
      {learnMore} <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
    </a>
  </motion.div>
);

const PracticeAreas = () => {
  const { lang } = useLang();
  const t = T[lang].services;
  const icons = [Gavel, Scale, Briefcase, Users, FileText, ShieldCheck];
  return (
    <section id="services" className="py-32 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="serif text-11px text-gold-600 uppercase tracking-[0.4em] font-semibold mb-4">{t.label}</h2>
            <h3 className="serif text-4xl md:text-6xl text-slate-900 leading-tight">
              {t.h} <span className="italic">{t.hItalic}</span> {t.hEnd}
            </h3>
          </div>
          <p className="text-slate-500 max-w-sm font-light leading-relaxed">{t.desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {t.areas.map((area, idx) => (
            <PracticeAreaCard key={idx} icon={icons[idx]} {...area} learnMore={t.learnMore} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { lang } = useLang();
  const t = T[lang].about;
  return (
    <section id="about" className="py-32 bg-slate-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
               whileInView={{ opacity: 1, x: 0 }}
               initial={{ opacity: 0, x: -50 }}
               viewport={{ once: true }}
               className="relative z-10 p-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm"
            >
              <h2 className="serif text-5xl md:text-7xl mb-8">{t.title} <span className="italic text-gold-400">{t.titleItalic}</span></h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-gold-400 uppercase tracking-widest text-xs font-bold mb-3">{t.t1h}</h4>
                  <p className="text-slate-400 font-light leading-relaxed">{t.t1p}</p>
                </div>
                <div>
                  <h4 className="text-gold-400 uppercase tracking-widest text-xs font-bold mb-3">{t.t2h}</h4>
                  <p className="text-slate-400 font-light leading-relaxed">{t.t2p}</p>
                </div>
                <div>
                  <h4 className="text-gold-400 uppercase tracking-widest text-xs font-bold mb-3">{t.t3h}</h4>
                  <p className="text-slate-400 font-light leading-relaxed">{t.t3p}</p>
                </div>
              </div>
            </motion.div>
            <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-gold-500/30" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-gold-500/30" />
          </div>
          
          <div className="relative lg:pl-20">
             <div className="serif text-gold-400 opacity-10 text-[20rem] absolute -top-40 -left-20 pointer-events-none select-none">"</div>
             <p className="serif text-3xl md:text-4xl italic leading-relaxed text-slate-200 mb-12 relative z-10">
               {t.quote}
             </p>
             <div className="flex items-center gap-6">
                <div className="w-16 h-px bg-gold-500" />
                <div>
                  <h5 className="text-xl font-semibold tracking-wide">Av. Hasan Birdal Yılmaz</h5>
                  <p className="text-gold-400 uppercase tracking-widest text-[10px] mt-1 font-medium italic">{t.role}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const { lang } = useLang();
  const t = T[lang].reviews;
  const reviews = [
    {
      name: "Ezgi Serefoglu Kaya",
      text: "Kazanilmasi cok zor gorunen davamda Hasan Birdal Bey avukatimdi. Bana hep moral verip, dogru bilgilerle yonlendirdi, basarili bir dava sureci yoneterek kazanmamizi sagladi. Savunmasi, arastirmasi hukuka hakimiyeti tartismaya kapali. Guvenle hukuki destek alabilirsiniz. Tesekkur ederim Hasan Bey.",
      rating: 5,
    },
    {
      name: "Baris Yigit",
      text: "Cok profesyonel bir avukat. Gonul rahatligiyla calisabilirsiniz. Sirketimizin hukuki surecleri icin beraber calistik. Kendisinden cok memnun kaldik.",
      rating: 5,
    },
    {
      name: "Ezgi Karatas",
      text: "Kamulastirma surecinde baska yerlerden yanlis yonlendirmeler almistim, ama Birdal Bey durumu en bastan dogru sekilde anlatti ve yuruttu. Durust ve isini bilen biri.",
      rating: 5,
    },
    {
      name: "Safak Kalkin",
      text: "Hukuki surecte verdiginiz destekten ve bilgilerden dolayi cok tesekkur ederim. Yas olarak cok genc bilgi olarak yillarin birikimi var sanki. Basarilarinizin devamini dilerim.",
      rating: 5,
    },
    {
      name: "Bahadir Dogan",
      text: "Her sey icin cok tesekkur ederim. Sizin gibi genc, cesur ve isini layiki ile yapan avukatlara gercekten cok ihtiyac var. Basariniz daim olsun.",
      rating: 5,
    },
    {
      name: "Sultan Dolu",
      text: "Kesinlikle bir avukat olarak gerekli ve yeterli bilgi birikime sahip birisiniz. Benim davam surecim de lehime alinan kararlarda katkiniz cok buyuk, cok tesekkur ederim.",
      rating: 5,
    },
    {
      name: "Smt O",
      text: "Kamulastirma konusunda ne yapacagimi bilemiyordum, bircok yanlis bilgi vardi. Birdal Bey net ve acik anlatarak dogru yolu gosterdi.",
      rating: 5,
    },
    {
      name: "Serap Coskun Celik",
      text: "Hukuk surecinde cok basarili islerimi basarili bir sekilde yurutuyor, sizi tebrik ederim iyi ki sizi tanimisim. Basarilar.",
      rating: 5,
    },
    {
      name: "Baran Karakus",
      text: "Bu vatanin senin gibi avukatlara ihtiyaci var. Isinde profesyonel ve ilgili, basarilariniz daim olsun Hasan Birdal Bey.",
      rating: 5,
    },
    {
      name: "Hasan Basri Tosun",
      text: "Sadece iyi bir avukat degil, ayni zamanda cok iyi bir insan. Her soruma sabirla cevap verdi.",
      rating: 5,
    },
    {
      name: "Dr. Sercan Dolu",
      text: "Hukuki surecimde her asamada yanimdaydi. Isini ciddiyetle yapan, durust bir avukat.",
      rating: 5,
    },
    {
      name: "Hakan Celik",
      text: "Hukuk demek Av. Hasan Birdal Yilmaz demek; sizi tanidigima cok sansliyim, tesekkurler.",
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="serif text-11px text-gold-600 uppercase tracking-[0.4em] font-semibold mb-4 italic">{t.label}</h2>
          <h3 className="serif text-4xl md:text-5xl text-slate-900 leading-tight">{t.h} <span className="italic font-medium">{t.hItalic}</span>{t.hEnd}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="p-10 border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-700"
             >
                <div>
                  <Quote className="w-8 h-8 text-gold-100 mb-6" />
                  <p className="text-slate-600 leading-relaxed font-light italic mb-8">"{rev.text}"</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                   <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">{rev.name}</span>
                   <div className="flex gap-0.5">
                     {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-gold-500 text-gold-500" />)}
                   </div>
                </div>
             </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-3 text-slate-400 hover:text-gold-600 transition-colors uppercase tracking-widest text-[10px] font-bold">
             {t.cta} <ChevronRight className="w-3 h-3" />
           </a>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { lang } = useLang();
  const t = T[lang].contact;
  return (
    <section id="contact" className="py-32 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="serif text-11px text-gold-600 uppercase tracking-[0.4em] font-semibold mb-4 italic">{t.label}</h2>
            <h3 className="serif text-5xl md:text-7xl text-slate-900 mb-12">{t.h} <br /><span className="italic font-medium">{t.hItalic}</span> {t.hEnd}</h3>
            
            <div className="space-y-6 sm:space-y-10">
              <div className="flex gap-4 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-white shadow-md flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 transition-colors">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">{t.addressLabel}</h4>
                  <p className="text-slate-700 font-light text-sm sm:text-base">{t.address}</p>
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener"
                    className="inline-flex items-center gap-2 mt-2 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-gold-600 transition-colors">
                    {t.openMap} <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-white shadow-md flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">{t.phoneLabel}</h4>
                  <a href="tel:+905071474796" className="text-slate-700 font-light text-sm sm:text-base hover:text-gold-700 transition-colors">{PHONE_NUMBER}</a>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-white shadow-md flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">{t.emailLabel}</h4>
                  <a href="mailto:av.hasanbirdalyilmaz@hotmail.com" className="text-slate-700 font-light text-sm sm:text-base hover:text-gold-700 transition-colors break-all">av.hasanbirdalyilmaz@hotmail.com</a>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="w-10 h-10 bg-white border border-slate-100 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all transform hover:-translate-y-1"><Instagram className="w-4 h-4" /></a>
               <a href="#" className="w-10 h-10 bg-white border border-slate-100 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all transform hover:-translate-y-1"><Facebook className="w-4 h-4" /></a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="w-10 h-10 bg-white border border-slate-100 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all transform hover:-translate-y-1"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 shadow-2xl border border-slate-50 border-t-8 border-t-gold-500"
          >
            <h4 className="serif text-3xl text-slate-900 mb-8 tracking-tight">{t.formTitle}</h4>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">{t.nameLabel}</label>
                   <input type="text" className="w-full bg-slate-50 border border-slate-100 p-4 font-light text-slate-700 focus:outline-none focus:border-gold-300 transition-colors" placeholder={t.namePh} />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">{t.phoneLabel2}</label>
                   <input type="tel" className="w-full bg-slate-50 border border-slate-100 p-4 font-light text-slate-700 focus:outline-none focus:border-gold-300 transition-colors" placeholder="05xx..." />
                 </div>
               </div>
               <div>
                 <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">{t.subjectLabel}</label>
                 <select className="w-full bg-slate-50 border border-slate-100 p-4 font-light text-slate-700 focus:outline-none focus:border-gold-300 transition-colors appearance-none">
                    {t.subjects.map((s, i) => <option key={i}>{s}</option>)}
                 </select>
               </div>
               <div>
                 <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">{t.msgLabel}</label>
                 <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 p-4 font-light text-slate-700 focus:outline-none focus:border-gold-300 transition-colors" placeholder={t.msgPh}></textarea>
               </div>
               <button className="w-full py-5 bg-slate-900 text-white rounded-sm text-sm uppercase tracking-widest font-bold hover:bg-gold-700 transition-all flex items-center justify-center gap-3">
                 {t.submit} <ChevronRight className="w-4 h-4" />
               </button>
               <p className="text-[10px] text-slate-400 text-center font-light mt-4 italic">{t.kvkk}</p>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Map */}
      <div className="mt-32 h-[500px] w-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 bg-slate-200">
         <iframe 
           src={GOOGLE_MAPS_EMBED_URL}
           width="100%" 
           height="100%" 
           style={{ border: 0 }} 
           allowFullScreen 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
         />
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang } = useLang();
  const t = T[lang].footer;
  return (
    <footer className="py-16 bg-slate-950 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <span className="serif text-xl font-bold tracking-tight text-white mb-1">HASAN BİRDAL YILMAZ</span>
          <span className="text-[9px] uppercase tracking-[0.4em] font-medium text-gold-500">{t.subtitle}</span>
        </div>
        
        <div className="flex gap-8 text-[11px] uppercase tracking-widest font-medium text-slate-500">
           <a href="#about" className="hover:text-gold-400 transition-colors">{t.about}</a>
           <a href="#services" className="hover:text-gold-400 transition-colors">{t.services}</a>
           <a href="#contact" className="hover:text-gold-400 transition-colors">{t.contact}</a>
        </div>
        
        <div className="text-[10px] text-slate-600 uppercase tracking-widest font-light text-center md:text-right">
          © 2024 Hasan Birdal Yılmaz. <br className="md:hidden" />{t.rights}
          <br />
          <a
            href="https://erdincyilmaz.netlify.app/"
            target="_blank"
            rel="noopener"
            className="mt-1 inline-block text-gold-500 hover:text-gold-300 underline underline-offset-2 transition-colors normal-case tracking-normal"
          >
            {t.dev}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Lang>('tr');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="antialiased selection:bg-gold-500 selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <PracticeAreas />
          <About />
          <Reviews />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangContext.Provider>
  );
}
