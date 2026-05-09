# LinguaAI
import { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════
   LINGUA AI — TAM ÜRETİM UYGULAMASI
   • 10 Dil, 60 Hoca (yetişkin + çocuk)
   • Yazılı + Sesli AI Hoca
   • Havale Ödeme Sistemi
   • Admin Paneli (IBAN, şifre, hediye, dinleme)
   • Kullanıcı kaydı (TC, telefon, doğum tarihi dahil)
══════════════════════════════════════════════════════════ */

// ─── VERİ ────────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { id:"quran",   name:"Kur'an-ı Kerim", native:"القرآن الكريم", flag:"🕌", color:"#1a5c35", accent:"#f0c040", desc:"Tecvid, Makam ve Hıfz",         modules:["Tecvid","Makam","Hıfz","Sure Mealleri"] },
  { id:"arabic",  name:"Arapça",         native:"العربية",       flag:"🇪🇬", color:"#7a0000", accent:"#ffd700", desc:"Nahiv, Sarf ve Konuşma",        modules:["Nahiv","Sarf","Konuşma","Okuma-Yazma"] },
  { id:"english", name:"İngilizce",      native:"English",       flag:"🇬🇧", color:"#012169", accent:"#cf142b", desc:"British & American English",    modules:["Grammar","Speaking","Vocabulary","IELTS"] },
  { id:"german",  name:"Almanca",        native:"Deutsch",       flag:"🇩🇪", color:"#1a1a1a", accent:"#ffd600", desc:"A1'den C2'ye Almanca",           modules:["Grammatik","Sprechen","Vokabeln","TestDaF"] },
  { id:"italian", name:"İtalyanca",      native:"Italiano",      flag:"🇮🇹", color:"#006400", accent:"#ff8c00", desc:"La bella lingua italiana",       modules:["Grammatica","Conversazione","Cultura","CILS"] },
  { id:"french",  name:"Fransızca",      native:"Français",      flag:"🇫🇷", color:"#002395", accent:"#ed2939", desc:"La langue de l'amour",          modules:["Grammaire","Conversation","Culture","DELF"] },
  { id:"chinese", name:"Çince",          native:"中文",           flag:"🇨🇳", color:"#8b0000", accent:"#ffde00", desc:"Mandarin & HSK",                 modules:["Pinyin","Hanzi","Konuşma","HSK"] },
  { id:"turkish", name:"Türkçe",         native:"Türkçe",        flag:"🇹🇷", color:"#9b0000", accent:"#f0f0f0", desc:"Ana dil & Yabancılara Türkçe",  modules:["Dilbilgisi","Konuşma","Yazma","TÖMER"] },
  { id:"russian", name:"Rusça",          native:"Русский",       flag:"🇷🇺", color:"#003580", accent:"#e8112d", desc:"Kiril alfabesi & Konuşma",       modules:["Kiril","Gramer","Konuşma","TORFL"] },
  { id:"spanish", name:"İspanyolca",     native:"Español",       flag:"🇪🇸", color:"#9b1c1c", accent:"#fbbf24", desc:"Dünyanın en yaygın dili",       modules:["Gramática","Conversación","Cultura","DELE"] },
];

const TEACHERS = {
  quran:[
    {id:"q1",name:"Şeyh Ahmed Al-Ghamdi",   origin:"Mekke, S. Arabistan",  gender:"male",   specialty:"Tecvid & Hıfz Uzmanı",     rating:4.9,students:1240,kids:false},
    {id:"q2",name:"Şeyh Omar Al-Fadil",     origin:"Medine, S. Arabistan", gender:"male",   specialty:"Makam & Kıraat Uzmanı",    rating:4.8,students:980, kids:false},
    {id:"q3",name:"Üst. Meryem Al-Husseini",origin:"Kahire, Mısır",        gender:"female", specialty:"Sure Mealleri & Tefsir",   rating:4.9,students:1560,kids:false},
    {id:"q4",name:"Üst. Fatıma Al-Zahrawi", origin:"Güney Sina, Mısır",    gender:"female", specialty:"Tecvid & Kıraat Uzmanı",   rating:4.7,students:870, kids:false},
    {id:"q5",name:"Öğrt. Yusuf Al-Nuri",    origin:"Kahire, Mısır",        gender:"male",   specialty:"Çocuklara Kur'an & Hıfz",  rating:4.9,students:640, kids:true},
    {id:"q6",name:"Öğrt. Zeynep Al-Safa",   origin:"Medine, S. Arabistan", gender:"female", specialty:"Çocuklara Tecvid & Makam", rating:4.8,students:510, kids:true},
  ],
  arabic:[
    {id:"a1",name:"Dr. Khalid Al-Mansouri", origin:"Kahire, Mısır",        gender:"male",   specialty:"Nahiv & Sarf Uzmanı",      rating:4.9,students:2100,kids:false},
    {id:"a2",name:"Prof. Yusuf Al-Azhari",  origin:"Kahire, Mısır",        gender:"male",   specialty:"Fesahat & Belağat",        rating:4.8,students:1450,kids:false},
    {id:"a3",name:"Dr. Nour Al-Rashidi",    origin:"Bağdat, Irak",         gender:"female", specialty:"Modern Arapça & Konuşma",  rating:4.9,students:1890,kids:false},
    {id:"a4",name:"Üst. Layla Al-Baghdadi", origin:"Amman, Ürdün",         gender:"female", specialty:"Nahiv & Okuma-Yazma",      rating:4.7,students:1120,kids:false},
    {id:"a5",name:"Öğrt. Samir Al-Faruq",   origin:"Kahire, Mısır",        gender:"male",   specialty:"Çocuklara Temel Arapça",   rating:4.9,students:720, kids:true},
    {id:"a6",name:"Öğrt. Hana Al-Zubi",     origin:"Amman, Ürdün",         gender:"female", specialty:"Çocuklara Arapça & Oyun",  rating:4.8,students:590, kids:true},
  ],
  english:[
    {id:"e1",name:"James Harrison",         origin:"Londra, İngiltere",    gender:"male",   specialty:"British English & IELTS",       rating:4.9,students:3200,kids:false},
    {id:"e2",name:"Dr. William Clarke",     origin:"Oxford, İngiltere",    gender:"male",   specialty:"Academic English & Writing",    rating:4.8,students:2100,kids:false},
    {id:"e3",name:"Sarah Mitchell",         origin:"New York, ABD",        gender:"female", specialty:"American English & TOEFL",      rating:4.9,students:2800,kids:false},
    {id:"e4",name:"Emma Thompson",          origin:"Manchester, İngiltere",gender:"female", specialty:"Conversation & Pronunciation",  rating:4.8,students:1950,kids:false},
    {id:"e5",name:"Tom Bradley",            origin:"Bristol, İngiltere",   gender:"male",   specialty:"Çocuklara Eğlenceli İngilizce", rating:4.9,students:880,kids:true},
    {id:"e6",name:"Lucy Williams",          origin:"Edinburgh, İskoçya",   gender:"female", specialty:"Çocuk İngilizcesi & Şarkılar",  rating:4.8,students:740,kids:true},
  ],
  german:[
    {id:"g1",name:"Prof. Klaus Weber",      origin:"Berlin, Almanya",      gender:"male",   specialty:"Grammatik & TestDaF",            rating:4.9,students:1800,kids:false},
    {id:"g2",name:"Dr. Hans Mueller",       origin:"Münih, Almanya",       gender:"male",   specialty:"İş Almancası & C2",              rating:4.7,students:1200,kids:false},
    {id:"g3",name:"Anna Schneider",         origin:"Hamburg, Almanya",     gender:"female", specialty:"Konuşma & Telaffuz",             rating:4.9,students:2100,kids:false},
    {id:"g4",name:"Dr. Maria Fischer",      origin:"Viyana, Avusturya",    gender:"female", specialty:"A1-B2 & Günlük Almanca",         rating:4.8,students:1600,kids:false},
    {id:"g5",name:"Felix Braun",            origin:"Köln, Almanya",        gender:"male",   specialty:"Çocuklara Eğlenceli Almanca",    rating:4.9,students:650, kids:true},
    {id:"g6",name:"Lena Hoffmann",          origin:"Stuttgart, Almanya",   gender:"female", specialty:"Çocuk Almancası & Masallar",     rating:4.8,students:520, kids:true},
  ],
  italian:[
    {id:"i1",name:"Marco Rossi",            origin:"Roma, İtalya",         gender:"male",   specialty:"Conversazione & Cultura",        rating:4.8,students:1400,kids:false},
    {id:"i2",name:"Prof. Antonio Bianchi",  origin:"Floransa, İtalya",     gender:"male",   specialty:"Grammatica & CILS",              rating:4.9,students:1100,kids:false},
    {id:"i3",name:"Sofia De Luca",          origin:"Milano, İtalya",       gender:"female", specialty:"Moda İtalyancası & İş",          rating:4.9,students:1750,kids:false},
    {id:"i4",name:"Giulia Ferrari",         origin:"Napoli, İtalya",       gender:"female", specialty:"Konuşma & Telaffuz",             rating:4.7,students:980, kids:false},
    {id:"i5",name:"Luca Marino",            origin:"Torino, İtalya",       gender:"male",   specialty:"Çocuklara Eğlenceli İtalyanca",  rating:4.8,students:430,kids:true},
    {id:"i6",name:"Chiara Esposito",        origin:"Roma, İtalya",         gender:"female", specialty:"Çocuk İtalyancası & Şarkılar",   rating:4.9,students:380,kids:true},
  ],
  french:[
    {id:"f1",name:"Pierre Dubois",          origin:"Paris, Fransa",        gender:"male",   specialty:"Grammaire & DELF",               rating:4.8,students:1900,kids:false},
    {id:"f2",name:"Dr. Jean-Luc Martin",    origin:"Lyon, Fransa",         gender:"male",   specialty:"Fransız Edebiyatı & Kültür",    rating:4.9,students:1200,kids:false},
    {id:"f3",name:"Marie Dupont",           origin:"Paris, Fransa",        gender:"female", specialty:"Konuşma & Telaffuz",             rating:4.9,students:2300,kids:false},
    {id:"f4",name:"Camille Bernard",        origin:"Bordeaux, Fransa",     gender:"female", specialty:"İş Fransızcası & DALF",          rating:4.7,students:1050,kids:false},
    {id:"f5",name:"Theo Laurent",           origin:"Marseille, Fransa",    gender:"male",   specialty:"Çocuklara Eğlenceli Fransızca",  rating:4.8,students:490,kids:true},
    {id:"f6",name:"Amelie Petit",           origin:"Nice, Fransa",         gender:"female", specialty:"Çocuk Fransızcası",              rating:4.9,students:420,kids:true},
  ],
  chinese:[
    {id:"c1",name:"Wang Wei",               origin:"Pekin, Çin",           gender:"male",   specialty:"Pinyin & HSK 1-4",               rating:4.8,students:2100,kids:false},
    {id:"c2",name:"Li Jian",                origin:"Şanghay, Çin",         gender:"male",   specialty:"İş Çincesi & HSK 5-6",           rating:4.9,students:1600,kids:false},
    {id:"c3",name:"Lin Mei",                origin:"Pekin, Çin",           gender:"female", specialty:"Hanzi & Konuşma",                rating:4.9,students:2400,kids:false},
    {id:"c4",name:"Zhang Li",               origin:"Chengdu, Çin",         gender:"female", specialty:"Başlangıç Çincesi & Kültür",     rating:4.8,students:1800,kids:false},
    {id:"c5",name:"Chen Hao",               origin:"Guangzhou, Çin",       gender:"male",   specialty:"Çocuklara Eğlenceli Çince",      rating:4.9,students:580, kids:true},
    {id:"c6",name:"Xiao Ying",              origin:"Pekin, Çin",           gender:"female", specialty:"Çocuk Çincesi & Resim",          rating:4.8,students:490, kids:true},
  ],
  turkish:[
    {id:"t1",name:"Prof. Mehmet Yıldız",    origin:"İstanbul, Türkiye",    gender:"male",   specialty:"Dilbilgisi & Yazma",             rating:4.9,students:1500,kids:false},
    {id:"t2",name:"Dr. Ali Kaya",           origin:"Ankara, Türkiye",      gender:"male",   specialty:"Yabancılara Türkçe & TÖMER",     rating:4.8,students:1100,kids:false},
    {id:"t3",name:"Prof. Ayşe Demir",       origin:"İstanbul, Türkiye",    gender:"female", specialty:"Konuşma & Telaffuz",             rating:4.9,students:1900,kids:false},
    {id:"t4",name:"Dr. Zeynep Arslan",      origin:"Bursa, Türkiye",       gender:"female", specialty:"Edebiyat & İleri Türkçe",        rating:4.8,students:1300,kids:false},
    {id:"t5",name:"Öğrt. Burak Şahin",     origin:"İzmir, Türkiye",       gender:"male",   specialty:"Çocuklara Eğlenceli Türkçe",     rating:4.9,students:620, kids:true},
    {id:"t6",name:"Öğrt. Elif Kılıç",      origin:"Ankara, Türkiye",      gender:"female", specialty:"Çocuk Türkçesi & Masallar",      rating:4.8,students:540, kids:true},
  ],
  russian:[
    {id:"r1",name:"Prof. Dmitri Volkov",    origin:"Moskova, Rusya",       gender:"male",   specialty:"Kiril & Rus Grameri",            rating:4.9,students:1600,kids:false},
    {id:"r2",name:"Dr. Alexei Petrov",      origin:"St. Petersburg, Rusya",gender:"male",   specialty:"İş Rusçası & TORFL",             rating:4.8,students:1200,kids:false},
    {id:"r3",name:"Dr. Natasha Ivanova",    origin:"Moskova, Rusya",       gender:"female", specialty:"Konuşma & Telaffuz",             rating:4.9,students:2000,kids:false},
    {id:"r4",name:"Prof. Elena Sorokina",   origin:"Kazan, Rusya",         gender:"female", specialty:"Edebiyat & İleri Rusça",         rating:4.8,students:1400,kids:false},
    {id:"r5",name:"Öğrt. Ivan Novikov",     origin:"Moskova, Rusya",       gender:"male",   specialty:"Çocuklara Eğlenceli Rusça",      rating:4.9,students:560, kids:true},
    {id:"r6",name:"Öğrt. Olga Morozova",    origin:"Novosibirsk, Rusya",   gender:"female", specialty:"Çocuk Rusçası & Masallar",       rating:4.8,students:480, kids:true},
  ],
  spanish:[
    {id:"s1",name:"Prof. Carlos García",    origin:"Madrid, İspanya",      gender:"male",   specialty:"Gramática & DELE",               rating:4.9,students:2400,kids:false},
    {id:"s2",name:"Dr. Miguel Rodríguez",   origin:"Barselona, İspanya",   gender:"male",   specialty:"İş İspanyolcası & C2",           rating:4.8,students:1800,kids:false},
    {id:"s3",name:"Ana Martínez",           origin:"Sevilla, İspanya",     gender:"female", specialty:"Conversación & Telaffuz",        rating:4.9,students:2600,kids:false},
    {id:"s4",name:"Dr. Isabel López",       origin:"Valencia, İspanya",    gender:"female", specialty:"Latin Amerika İspanyolcası",     rating:4.8,students:2100,kids:false},
    {id:"s5",name:"Öğrt. Diego Sánchez",    origin:"Madrid, İspanya",      gender:"male",   specialty:"Çocuklara Eğlenceli İspanyolca", rating:4.9,students:720,kids:true},
    {id:"s6",name:"Öğrt. Lucía Fernández",  origin:"Barselona, İspanya",   gender:"female", specialty:"Çocuk İspanyolcası & Şarkılar",  rating:4.8,students:640,kids:true},
  ],
};

const PLANS = [
  {id:"trial",  name:"5 Günlük Deneme", price:"Ücretsiz", period:"",     features:["1 dil seçimi — 5 gün","Günde 20 dk","Yazılı AI hoca","Sesli konuşma","Kamera yakında"]},
  {id:"monthly",name:"Aylık Plan",      price:"₺299",     period:"/ay",  features:["Tüm 10 dil","Sınırsız ders","4+2 hoca","Çocuk hocaları","Sesli konuşma","İlerleme raporu"]},
  {id:"yearly", name:"Yıllık Plan",     price:"₺1990",    period:"/yıl", features:["Tüm 10 dil","Sınırsız ders","4+2 hoca","Çocuk hocaları","Sesli konuşma","İlerleme raporu","Öncelikli destek","%44 tasarruf"]},
];

// ─── GLOBAL STATE (localStorage simülasyonu) ──────────────────────────────────
const getAdminSettings = () => {
  try {
    const s = sessionStorage.getItem("linguaai_admin");
    return s ? JSON.parse(s) : {
      iban: "",
      bankName: "",
      accountName: "",
      adminEmail: "",
      contactEmail: "",
      adminPassword: "admin123",
      users: [
        {id:1,name:"Ahmet Yılmaz",email:"ahmet@mail.com",phone:"0532 111 2233",tc:"12345678901",birthdate:"1990-05-15",city:"İstanbul",plan:"Yıllık",lang:"Arapça",status:"active",joined:"15 Nis 2026",paid:"₺1990",sessions:24,trialDays:0,giftUsed:false},
        {id:2,name:"Fatma Demir", email:"fatma@mail.com",phone:"0541 222 3344",tc:"23456789012",birthdate:"1995-08-22",city:"Ankara",  plan:"Aylık", lang:"İngilizce",status:"active",joined:"20 Nis 2026",paid:"₺299", sessions:8, trialDays:0,giftUsed:false},
        {id:3,name:"Mehmet Kaya", email:"mehmet@mail.com",phone:"0555 333 4455",tc:"34567890123",birthdate:"1988-03-10",city:"İzmir",   plan:"Deneme",lang:"Almanca",  status:"trial", joined:"24 Nis 2026",paid:"₺0",   sessions:2, trialDays:4,giftUsed:false},
        {id:4,name:"Ayşe Çelik",  email:"ayse@mail.com",  phone:"0533 444 5566",tc:"45678901234",birthdate:"1992-11-30",city:"Bursa",   plan:"Yıllık",lang:"Fransızca",status:"active",joined:"1 Nis 2026", paid:"₺1990",sessions:41,trialDays:0,giftUsed:false},
        {id:5,name:"Ali Şahin",   email:"ali@mail.com",   phone:"0542 555 6677",tc:"56789012345",birthdate:"1985-07-18",city:"Antalya", plan:"Aylık", lang:"Rusça",    status:"suspended",joined:"10 Mar 2026",paid:"₺897",sessions:15,trialDays:0,giftUsed:false},
      ],
      pendingPayments: [
        {id:1,name:"Hasan Demir",email:"hasan@mail.com",amount:"₺299",plan:"Aylık",date:"3 May 2026",note:"Aylık plan - hasan@mail.com",status:"waiting"},
        {id:2,name:"Selin Kara", email:"selin@mail.com", amount:"₺1990",plan:"Yıllık",date:"2 May 2026",note:"Yıllık plan - selin@mail.com",status:"waiting"},
      ],
      activeSessions: [
        {id:1,user:"Ahmet Yılmaz",lang:"Arapça",   teacher:"Dr. Khalid Al-Mansouri",start:"14:32",dur:"28 dk",listening:false},
        {id:2,user:"Fatma Demir", lang:"İngilizce", teacher:"Sarah Mitchell",        start:"14:15",dur:"45 dk",listening:false},
      ],
    };
  } catch { return {}; }
};

const saveAdminSettings = (s) => {
  try { sessionStorage.setItem("linguaai_admin", JSON.stringify(s)); } catch {}
};

// ─── HOCA KARTI (Fotoğrafsız, Profesyonel) ───────────────────────────────────
function TeacherCard({ teacher, lang, size = "normal", onClick }) {
  const isFemale = teacher.gender === "female";
  const isSmall = size === "small";
  const dim = isSmall ? 36 : size === "large" ? 100 : 72;
  const initials = teacher.name.split(" ").slice(-2).map(w => w[0]).join("");

  return (
    <div onClick={onClick}
      style={{
        width: dim, height: dim, borderRadius: "50%",
        background: `linear-gradient(135deg, ${lang.color}, ${lang.color}88)`,
        border: `${isSmall?2:3}px solid ${lang.accent}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, cursor: onClick ? "pointer" : "default",
        boxShadow: `0 4px 16px ${lang.accent}44`,
        position: "relative",
      }}>
      <span style={{
        fontSize: isSmall ? 13 : size === "large" ? 32 : 22,
        fontWeight: 800, color: "#fff",
        textShadow: "0 1px 4px rgba(0,0,0,0.5)",
        fontFamily: "serif",
      }}>{initials}</span>
      {teacher.kids && !isSmall && (
        <div style={{
          position: "absolute", top: -4, right: -4,
          width: 18, height: 18, borderRadius: "50%",
          background: "#ff6b35", border: "2px solid #fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, color: "#fff", fontWeight: 700,
        }}>★</div>
      )}
    </div>
  );
}

// ─── DERS EKRANI ──────────────────────────────────────────────────────────────

// ─── SEVİYE SINAVI ────────────────────────────────────────────────────────────
const LEVEL_QUESTIONS = {
  quran: [
    { q: "Tecvid kurallarından 'İdğam' nedir?", opts: ["Harf uzatma", "İki harfi birleştirme", "Harf gizleme", "Bilmiyorum"], correct: 1, level: "B1" },
    { q: "Aşağıdakilerden hangisi bir sure adıdır?", opts: ["Bakara", "Salam", "Numan", "Bilmiyorum"], correct: 0, level: "A1" },
    { q: "Kuran kaç cüzden oluşur?", opts: ["20", "25", "30", "Bilmiyorum"], correct: 2, level: "A1" },
    { q: "Makam nedir?", opts: ["Namaz vakti", "Kıraat ezgisi", "Sure başlığı", "Bilmiyorum"], correct: 1, level: "A2" },
    { q: "Hıfz ne demektir?", opts: ["Okumak", "Ezberleme", "Anlama", "Bilmiyorum"], correct: 1, level: "A2" },
  ],
  arabic: [
    { q: "Arapçada 'كِتَابٌ' ne demektir?", opts: ["Kalem", "Kitap", "Masa", "Bilmiyorum"], correct: 1, level: "A1" },
    { q: "Nahivde 'fail' ne anlama gelir?", opts: ["Özne", "Nesne", "Yüklem", "Bilmiyorum"], correct: 0, level: "B1" },
    { q: "Arapçada kaç harf vardır?", opts: ["26", "28", "30", "Bilmiyorum"], correct: 1, level: "A1" },
    { q: "Sarf ilmi neyi inceler?", opts: ["Cümle yapısı", "Kelime yapısı", "Ses bilgisi", "Bilmiyorum"], correct: 1, level: "B1" },
    { q: "مَرْحَبًا ne demektir?", opts: ["Güle güle", "Merhaba", "Teşekkürler", "Bilmiyorum"], correct: 1, level: "A1" },
  ],
  english: [
    { q: "What is the past tense of 'go'?", opts: ["Goed", "Gone", "Went", "Don't know"], correct: 2, level: "A2" },
    { q: "Choose the correct: 'She ___ a doctor.'", opts: ["is", "are", "am", "Don't know"], correct: 0, level: "A1" },
    { q: "What does 'although' mean?", opts: ["Because", "Therefore", "Even though", "Don't know"], correct: 2, level: "B1" },
    { q: "Complete: 'If I ___ rich, I would travel.'", opts: ["am", "were", "be", "Don't know"], correct: 1, level: "B2" },
    { q: "What is a synonym for 'happy'?", opts: ["Sad", "Joyful", "Tired", "Don't know"], correct: 1, level: "A2" },
  ],
  german: [
    { q: "Was bedeutet 'Haus'?", opts: ["Auto", "Haus", "Baum", "Weiß nicht"], correct: 1, level: "A1" },
    { q: "Welcher Artikel hat 'Buch'?", opts: ["der", "die", "das", "Weiß nicht"], correct: 2, level: "A2" },
    { q: "Konjugiere: Ich ___ Deutsch.", opts: ["lerne", "lernt", "lernen", "Weiß nicht"], correct: 0, level: "A1" },
    { q: "Was ist der Konjunktiv II?", opts: ["Gegenwart", "Möglichkeitsform", "Vergangenheit", "Weiß nicht"], correct: 1, level: "B2" },
    { q: "Übersetze: 'Ich bin müde.'", opts: ["Mutluyum", "Yorgunum", "Açım", "Weiß nicht"], correct: 1, level: "A1" },
  ],
  french: [
    { q: "Que signifie 'bonjour'?", opts: ["Au revoir", "Bonjour", "Merci", "Je ne sais pas"], correct: 1, level: "A1" },
    { q: "Comment dit-on 'Je m'appelle...'?", opts: ["Adım...", "Nasılsın", "Nerede", "Je ne sais pas"], correct: 0, level: "A1" },
    { q: "Quel est le genre de 'table'?", opts: ["Masculin", "Féminin", "Neutre", "Je ne sais pas"], correct: 1, level: "A2" },
    { q: "Conjuguez: Je ___ (aller)", opts: ["vais", "vas", "va", "Je ne sais pas"], correct: 0, level: "B1" },
    { q: "Que signifie 'néanmoins'?", opts: ["Donc", "Néanmoins", "Parce que", "Je ne sais pas"], correct: 1, level: "B2" },
  ],
  italian: [
    { q: "Come si dice 'grazie'?", opts: ["Prego", "Grazie", "Ciao", "Non so"], correct: 1, level: "A1" },
    { q: "Qual è il plurale di 'libro'?", opts: ["libri", "libros", "libre", "Non so"], correct: 0, level: "A2" },
    { q: "Come si coniuga 'essere' (io)?", opts: ["sono", "sei", "è", "Non so"], correct: 0, level: "A1" },
    { q: "Cosa significa 'tuttavia'?", opts: ["Quindi", "Tuttavia", "Perché", "Non so"], correct: 1, level: "B1" },
    { q: "Il congiuntivo si usa per esprimere...", opts: ["Certezza", "Incertezza", "Passato", "Non so"], correct: 1, level: "B2" },
  ],
  chinese: [
    { q: "你好 ne anlama gelir?", opts: ["Güle güle", "Merhaba", "Teşekkürler", "Bilmiyorum"], correct: 1, level: "A1" },
    { q: "中文'一'hangi sayıdır?", opts: ["İki", "Üç", "Bir", "Bilmiyorum"], correct: 2, level: "A1" },
    { q: "Pinyin'de 'x' sesi nasıl okunur?", opts: ["ks", "ş benzeri", "z", "Bilmiyorum"], correct: 1, level: "A2" },
    { q: "我是学生 ne demektir?", opts: ["Öğrenciyim", "Öğretmenim", "Doktorum", "Bilmiyorum"], correct: 0, level: "A2" },
    { q: "HSK sınavı kaç seviyeye sahiptir?", opts: ["4", "6", "8", "Bilmiyorum"], correct: 1, level: "B1" },
  ],
  turkish: [
    { q: "Türkçede kaç ünlü harf vardır?", opts: ["6", "8", "10", "Bilmiyorum"], correct: 1, level: "A1" },
    { q: "'Geldim' fiilinin zamanı nedir?", opts: ["Geniş zaman", "Geçmiş zaman", "Gelecek zaman", "Bilmiyorum"], correct: 1, level: "A2" },
    { q: "Eklemeli dil ne demektir?", opts: ["Ekler çıkarılır", "Ekler eklenerek anlam değişir", "Sadece kök kullanılır", "Bilmiyorum"], correct: 1, level: "B1" },
    { q: "Aşağıdakilerden hangisi bir bağlaçtır?", opts: ["Güzel", "Ve", "Hızlı", "Bilmiyorum"], correct: 1, level: "A2" },
    { q: "'Kitap okumayı severim' cümlesinde eylem adı nedir?", opts: ["Kitap", "Okumayı", "Severim", "Bilmiyorum"], correct: 1, level: "B1" },
  ],
  russian: [
    { q: "Привет ne anlama gelir?", opts: ["Güle güle", "Merhaba", "Teşekkürler", "Bilmiyorum"], correct: 1, level: "A1" },
    { q: "Kiril alfabesinde kaç harf vardır?", opts: ["26", "33", "40", "Bilmiyorum"], correct: 1, level: "A1" },
    { q: "Как дела? ne demektir?", opts: ["Adın ne?", "Nasılsın?", "Nerelisin?", "Bilmiyorum"], correct: 1, level: "A2" },
    { q: "Rusçada kaç durum (падеж) vardır?", opts: ["4", "6", "8", "Bilmiyorum"], correct: 1, level: "B1" },
    { q: "Я студент ne demektir?", opts: ["Ben öğretmenim", "Ben öğrenciyim", "Ben doktorum", "Bilmiyorum"], correct: 1, level: "A1" },
  ],
  spanish: [
    { q: "¿Cómo se dice 'gracias'?", opts: ["Hola", "Gracias", "Adiós", "No sé"], correct: 1, level: "A1" },
    { q: "¿Cuál es el plural de 'libro'?", opts: ["libros", "libres", "libro", "No sé"], correct: 0, level: "A1" },
    { q: "Conjuga: Yo ___ (ser)", opts: ["eres", "soy", "es", "No sé"], correct: 1, level: "A1" },
    { q: "¿Qué es el subjuntivo?", opts: ["Tiempo pasado", "Modo de posibilidad", "Tiempo futuro", "No sé"], correct: 1, level: "B1" },
    { q: "¿Qué significa 'sin embargo'?", opts: ["Por eso", "Sin embargo", "Porque", "No sé"], correct: 1, level: "B1" },
  ],
};

const LEVEL_RESULTS = {
  0: { level: "A1", label: "Başlangıç", desc: "Hiç bilmiyorum, sıfırdan başlıyorum", color: "#4caf50" },
  1: { level: "A1", label: "Başlangıç", desc: "Çok az biliyorum, temellerden başlayalım", color: "#4caf50" },
  2: { level: "A2", label: "Temel", desc: "Biraz biliyorum, temel konulardan devam", color: "#2196f3" },
  3: { level: "B1", label: "Orta", desc: "Orta seviyedesin, konuşma pratiğine geçelim", color: "#ff9800" },
  4: { level: "B2", label: "Orta-İleri", desc: "İyi seviyedesin, ileri konulara odaklanalım", color: "#9c27b0" },
  5: { level: "C1", label: "İleri", desc: "Çok iyi! İncelikler ve akıcılık üzerinde çalışalım", color: "#f44336" },
};

function LevelTest({ lang, teacher, onComplete }) {
  const questions = LEVEL_QUESTIONS[lang.id] || LEVEL_QUESTIONS.english;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswer = (idx) => {
    setSelected(idx);
    setTimeout(() => {
      const newAnswers = [...answers, idx === questions[current].correct];
      setAnswers(newAnswers);
      if (current + 1 >= questions.length) {
        const score = newAnswers.filter(Boolean).length;
        setResult(LEVEL_RESULTS[score] || LEVEL_RESULTS[0]);
        setDone(true);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
    }, 600);
  };

  if (done && result) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, fontFamily: "'Segoe UI',sans-serif" }}>
        <div style={{ background: "#111", borderRadius: 22, padding: 36, width: 420, border: "1px solid #2a2a3a", textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎓</div>
          <div style={{ color: result.color, fontSize: 36, fontWeight: 900, marginBottom: 8 }}>{result.level}</div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{result.label} Seviye</div>
          <div style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{result.desc}</div>
          <div style={{ background: "#1a1a2a", borderRadius: 12, padding: 14, marginBottom: 24, border: "1px solid #2a2a3a" }}>
            <div style={{ color: "#aaa", fontSize: 12, marginBottom: 4 }}>Hocan</div>
            <div style={{ color: "#fff", fontWeight: 700 }}>{teacher.name}</div>
            <div style={{ color: lang.accent, fontSize: 12 }}>{teacher.specialty}</div>
          </div>
          <button onClick={() => onComplete(result.level)}
            style={{ width: "100%", padding: 14, background: `linear-gradient(135deg,${result.color},${result.color}99)`, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 16 }}>
            {result.level} Seviyesinden Başla →
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, fontFamily: "'Segoe UI',sans-serif" }}>
      <div style={{ background: "#111", borderRadius: 22, padding: 32, width: 460, border: "1px solid #2a2a3a" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ color: "#fff", fontSize: 17, fontWeight: 700 }}>{lang.flag} {lang.name} Seviye Testi</div>
            <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>Sana özel müfredat oluşturalım</div>
          </div>
          <div style={{ color: lang.accent, fontWeight: 700, fontSize: 14 }}>{current + 1} / {questions.length}</div>
        </div>

        {/* Progress */}
        <div style={{ height: 5, background: "#1a1a2a", borderRadius: 3, marginBottom: 24 }}>
          <div style={{ height: "100%", borderRadius: 3, width: `${progress}%`, background: `linear-gradient(90deg,${lang.accent},${lang.accent}88)`, transition: "width 0.4s" }} />
        </div>

        {/* Soru */}
        <div style={{ background: "#1a1a2a", borderRadius: 14, padding: 20, marginBottom: 20, border: `1px solid ${lang.accent}22` }}>
          <div style={{ color: "#fff", fontSize: 16, fontWeight: 600, lineHeight: 1.5 }}>{q.q}</div>
        </div>

        {/* Seçenekler */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.opts.map((opt, i) => {
            let bg = "#1a1a2a", border = "#2a2a3a", color = "#ccc";
            if (selected !== null) {
              if (i === q.correct) { bg = "#1a3a1a"; border = "#4caf50"; color = "#4caf50"; }
              else if (i === selected && selected !== q.correct) { bg = "#3a1a1a"; border = "#ef5350"; color = "#ef5350"; }
            }
            return (
              <button key={i} onClick={() => selected === null && handleAnswer(i)}
                style={{ padding: "13px 18px", borderRadius: 12, background: bg, border: `1px solid ${border}`, color, cursor: selected === null ? "pointer" : "default", fontSize: 14, textAlign: "left", fontWeight: selected !== null && i === q.correct ? 700 : 400, transition: "all 0.2s" }}>
                <span style={{ color: "#555", marginRight: 10 }}>{["A", "B", "C", "D"][i]}.</span> {opt}
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 16, color: "#444", fontSize: 12 }}>
          Bilmiyorsan "Bilmiyorum" seçeneğini seç — bu sınav not için değil, sana uygun seviyeyi bulmak için
        </div>
      </div>
    </div>
  );
}

function SessionScreen({ langId, teacher, user, onClose }) {
  const lang = LANGUAGES.find(l => l.id === langId);
  const [levelDone, setLevelDone] = useState(false);
  const [userLevel, setUserLevel] = useState("A1");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(user?.plan === "trial" ? 1200 : 99999);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [micActive, setMicActive] = useState(false);
  const endRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setMessages([{
      role: "assistant",
      text: `Merhaba ${user?.name?.split(" ")[0] || ""}! Ben ${teacher.name}, ${teacher.origin} kökenli AI dil öğretmenin.\n\nUzmanlık alanım: ${teacher.specialty}\n\nYazarak veya mikrofon butonuna basarak sesli konuşabilirsin. Başlayalım! 🎓`
    }]);
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setVoiceError("Tarayıcınız sesli girişi desteklemiyor. Yazarak devam edin."); return; }
    const r = new SR();
    r.lang = lang.id === "turkish" ? "tr-TR" : lang.id === "english" ? "en-US" : lang.id === "german" ? "de-DE" : lang.id === "french" ? "fr-FR" : lang.id === "spanish" ? "es-ES" : lang.id === "russian" ? "ru-RU" : lang.id === "italian" ? "it-IT" : lang.id === "chinese" ? "zh-CN" : "ar-SA";
    r.continuous = false;
    r.interimResults = false;
    r.onstart = () => setMicActive(true);
    r.onresult = (e) => { setInput(e.results[0][0].transcript); setMicActive(false); };
    r.onerror = () => { setMicActive(false); setVoiceError("Ses algılanamadı, tekrar dene."); setTimeout(() => setVoiceError(""), 3000); };
    r.onend = () => setMicActive(false);
    recognitionRef.current = r;
    r.start();
  };

  const stopVoice = () => { recognitionRef.current?.stop(); setMicActive(false); };

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim(); setInput("");
    setMessages(m => [...m, { role: "user", text: msg }]);
    setLoading(true);
    const sys = `Sen ${teacher.name} adlı AI dil öğretmenisin. ${teacher.origin} kökenlisin. ${lang.name} öğretiyorsun. Uzmanlık: ${teacher.specialty}. Türkçe yanıt ver, ${lang.native} örnekler ve telaffuz rehberi ekle. Sıcak, sabırlı, motive edici ol. Hataları nazikçe düzelt. Maks 3 paragraf.`;
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 800, system: sys,
          messages: [...messages.filter(m => m.role).map(m => ({ role: m.role, content: m.text })), { role: "user", content: msg }] })
      });
      const d = await r.json();
      const reply = d.content?.[0]?.text || "Hata oluştu.";
      setMessages(m => [...m, { role: "assistant", text: reply }]);
      // Text-to-speech
      if (window.speechSynthesis) {
        const utt = new SpeechSynthesisUtterance(reply.substring(0, 200));
        utt.lang = lang.id === "turkish" ? "tr-TR" : lang.id === "english" ? "en-US" : "tr-TR";
        utt.rate = 0.9;
        window.speechSynthesis.speak(utt);
      }
    } catch { setMessages(m => [...m, { role: "assistant", text: "Bağlantı hatası. Lütfen tekrar deneyin." }]); }
    setLoading(false);
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <div style={{ position: "fixed", inset: 0, background: "#09090f", display: "flex", flexDirection: "column", zIndex: 1000, fontFamily: "'Segoe UI',sans-serif" }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}} @keyframes dotB{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}`}</style>

      <div style={{ background: "#1a1500", borderBottom: "1px solid #3a3000", padding: "5px 20px", fontSize: 12, color: "#ffd600", textAlign: "center" }}>
        🔒 Bu ders platform güvenliği kapsamında izlenebilir. Kayıt yapılmaz.
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px", background: `linear-gradient(135deg,${lang.color}dd,${lang.color}99)`, borderBottom: `2px solid ${lang.accent}` }}>
        <TeacherCard teacher={teacher} lang={lang} size="small" />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{teacher.name}</div>
          <div style={{ color: lang.accent, fontSize: 12 }}>{teacher.origin} • {teacher.specialty}</div>
        </div>
        {user?.plan === "trial" && (
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "5px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#aaa" }}>DENEME SÜRESİ</div>
            <div style={{ fontWeight: 800, color: timeLeft < 300 ? "#ef5350" : lang.accent, fontSize: 18 }}>{mm}:{ss}</div>
          </div>
        )}
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 600 }}>✕ Çıkış</button>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sol panel */}
        <div style={{ width: 240, background: "#0d0d14", borderRight: "1px solid #1a1a2a", padding: 14, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>

          {/* Hoca bilgisi */}
          <div style={{ background: "#111", borderRadius: 12, padding: 14, border: `1px solid ${lang.accent}33`, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#555", marginBottom: 10, fontWeight: 700, letterSpacing: 1 }}>AI HOCAN</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <TeacherCard teacher={teacher} lang={lang} size="large" />
            </div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{teacher.name}</div>
            <div style={{ color: lang.accent, fontSize: 11, marginTop: 4 }}>{teacher.origin}</div>
            <div style={{ color: "#888", fontSize: 11, marginTop: 4 }}>{teacher.specialty}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 8 }}>
              <span style={{ color: lang.accent, fontSize: 12 }}>⭐ {teacher.rating}</span>
              <span style={{ color: "#555", fontSize: 11 }}>{teacher.students.toLocaleString()} öğrenci</span>
            </div>
            {loading && (
              <div style={{ marginTop: 8, color: lang.accent, fontSize: 11, animation: "pulse 1s infinite" }}>
                Yanıt yazıyor...
              </div>
            )}
          </div>

          {/* Kamera — Yakında */}
          <div style={{ background: "#111", borderRadius: 12, padding: 14, border: "1px solid #2a2a3a", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#555", marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>KAMERA ANALİZİ</div>
            <div style={{ background: "#1a1a2a", borderRadius: 10, padding: "20px 14px" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
              <div style={{ color: "#ffd600", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Yakında Geliyor!</div>
              <div style={{ color: "#555", fontSize: 11, lineHeight: 1.5 }}>Kameralı ders özelliği güncellemeyle eklenecek</div>
            </div>
          </div>

          {/* Ses durumu */}
          <div style={{ background: "#111", borderRadius: 12, padding: 12, border: `1px solid ${lang.accent}33` }}>
            <div style={{ fontSize: 10, color: "#555", marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>SESLİ KONUŞMA</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4caf50", animation: "pulse 2s infinite" }} />
              <span style={{ color: "#888", fontSize: 12 }}>Mikrofon hazır</span>
            </div>
            {voiceError && <div style={{ color: "#ef5350", fontSize: 11, marginTop: 6 }}>{voiceError}</div>}
          </div>

          {/* Modüller */}
          <div style={{ background: "#111", borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, color: "#555", marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>MODÜLLER</div>
            {lang.modules.map(m => (
              <div key={m} style={{ padding: "7px 12px", borderRadius: 8, marginBottom: 5, background: "#1a1a2a", color: "#aaa", fontSize: 12, cursor: "pointer", borderLeft: `3px solid ${lang.accent}44` }}>{m}</div>
            ))}
          </div>
        </div>

        {/* Sohbet */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: 10, alignItems: "flex-start" }}>
                {msg.role === "assistant" && <TeacherCard teacher={teacher} lang={lang} size="small" />}
                <div style={{ maxWidth: "68%", padding: "12px 16px", borderRadius: 18, background: msg.role === "user" ? lang.color : "#141420", color: "#fff", fontSize: 14, lineHeight: 1.7, borderBottomRightRadius: msg.role === "user" ? 4 : 18, borderBottomLeftRadius: msg.role === "assistant" ? 4 : 18, border: msg.role === "assistant" ? "1px solid #1e1e2e" : "none", whiteSpace: "pre-wrap" }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 10 }}>
                <TeacherCard teacher={teacher} lang={lang} size="small" />
                <div style={{ background: "#141420", borderRadius: 18, padding: "12px 18px", border: "1px solid #1e1e2e", display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: lang.accent, animation: `dotB 1s ${i * 0.18}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 14, borderTop: "1px solid #1a1a2a", background: "#0d0d14" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {/* Mikrofon */}
              <button
                onMouseDown={startVoice}
                onMouseUp={stopVoice}
                onTouchStart={startVoice}
                onTouchEnd={stopVoice}
                style={{ width: 48, height: 48, borderRadius: "50%", background: micActive ? "#ef5350" : "#1a2a1a", border: `2px solid ${micActive ? "#ef5350" : lang.accent}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, animation: micActive ? "pulse 0.5s infinite" : "none" }}>
                {micActive ? "🔴" : "🎤"}
              </button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                placeholder={`${teacher.name.split(" ")[0]}'a yazın veya mikrofona basın...`}
                style={{ flex: 1, background: "#141420", border: "1px solid #2a2a3a", borderRadius: 12, padding: "13px 16px", color: "#fff", fontSize: 14, outline: "none" }}
              />
              <button onClick={send} disabled={loading || !input.trim()} style={{ padding: "13px 22px", borderRadius: 12, background: loading || !input.trim() ? "#2a2a2a" : lang.accent, color: loading || !input.trim() ? "#555" : "#000", border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>➤</button>
            </div>
            <div style={{ textAlign: "center", color: "#444", fontSize: 11, marginTop: 6 }}>Mikrofona bas ve konuş • Bırak ve gönder • Ya da yazarak mesaj gönder</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANELİ ─────────────────────────────────────────────────────────────

// ─── YÖNETİCİ PANELİ ─────────────────────────────────────────────────────────
function AdminPanel({ onClose }) {
  const [tab, setTab] = useState("dashboard");
  const [settings, setSettings] = useState(getAdminSettings());
  const [saved, setSaved] = useState(false);

  // Hediye
  const [giftEmail, setGiftEmail] = useState("");
  const [giftType, setGiftType] = useState("1 Ay Ücretsiz");
  const [giftDone, setGiftDone] = useState(false);
  const [giftErr, setGiftErr] = useState("");

  // Şifre
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [passMsg, setPassMsg] = useState("");

  // Ders dinleme
  const [watchTarget, setWatchTarget] = useState(null);

  // Mesaj
  const [msgTarget, setMsgTarget] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [msgDone, setMsgDone] = useState(false);

  const save = (updated) => { setSettings(updated); saveAdminSettings(updated); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const approvePayment = (id) => {
    const p = settings.pendingPayments.find(x => x.id === id);
    const updated = {
      ...settings,
      pendingPayments: settings.pendingPayments.map(x => x.id === id ? { ...x, status: "approved" } : x),
      users: [...settings.users, {
        id: Date.now(), name: p?.name || "", email: p?.email || "",
        phone: "", tc: "", birthdate: "", city: "",
        plan: p?.plan || "Aylık", lang: "—", status: "active",
        joined: new Date().toLocaleDateString("tr-TR"),
        paid: p?.amount || "₺0", sessions: 0, trialDays: 0, giftUsed: false,
      }]
    };
    save(updated);
  };

  const sendGift = () => {
    if (!giftEmail.includes("@")) { setGiftErr("Geçerli e-posta girin"); return; }
    save({ ...settings, users: settings.users.map(u => u.email === giftEmail ? { ...u, plan: giftType, status: "active", giftUsed: true } : u) });
    setGiftDone(true); setGiftErr("");
  };

  const changePass = () => {
    if (newPass.length < 6) { setPassMsg("En az 6 karakter"); return; }
    if (newPass !== newPass2) { setPassMsg("Şifreler eşleşmiyor"); return; }
    save({ ...settings, adminPassword: newPass });
    setPassMsg("✅ Şifre güncellendi!"); setNewPass(""); setNewPass2("");
  };

  // İstatistikler
  const totalUsers = settings.users.length;
  const activeUsers = settings.users.filter(u => u.status === "active").length;
  const trialUsers = settings.users.filter(u => u.status === "trial").length;
  const premiumUsers = settings.users.filter(u => u.plan === "Yıllık" || u.plan === "Aylık").length;
  const pendingCount = settings.pendingPayments.filter(p => p.status === "waiting").length;
  const totalRevenue = settings.users.reduce((sum, u) => {
    const n = parseInt((u.paid || "0").replace(/[^0-9]/g, ""));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  const TABS = [
    ["dashboard", "📊", "Dashboard"],
    ["users",     "👥", "Kullanıcılar"],
    ["payments",  "💳", "Ödemeler"],
    ["sessions",  "📡", "Aktif Dersler"],
    ["gift",      "🎁", "Hediye Ver"],
    ["notify",    "🔔", "Bildirimler"],
    ["settings",  "⚙️",  "Ayarlar"],
  ];

  const C = {
    bg: "#08080e", sidebar: "#0d0d15", card: "#111", border: "#1a1a2a",
    text: "#fff", sub: "#555", accent: "#4caf50", danger: "#ef5350", warn: "#ffd600",
  };

  const Card = ({ children, style = {} }) => (
    <div style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, ...style }}>{children}</div>
  );

  const Input = ({ label, value, onChange, placeholder, type = "text", error }) => (
    <div style={{ marginBottom: 14 }}>
      {label && <div style={{ color: "#aaa", fontSize: 12, marginBottom: 5 }}>{label}</div>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: "100%", padding: "11px 14px", background: "#1a1a2a", border: `1px solid ${error ? C.danger : C.border}`, borderRadius: 10, color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
      {error && <div style={{ color: C.danger, fontSize: 11, marginTop: 3 }}>{error}</div>}
    </div>
  );

  const Btn = ({ children, onClick, variant = "primary", style = {} }) => (
    <button onClick={onClick} style={{
      padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13, border: "none",
      background: variant === "primary" ? "linear-gradient(135deg,#4caf50,#2e7d32)" :
                  variant === "danger"  ? C.danger :
                  variant === "ghost"   ? "transparent" : "#1a1a2a",
      color: variant === "ghost" ? "#666" : "#fff",
      border: variant === "ghost" ? `1px solid ${C.border}` : "none",
      ...style
    }}>{children}</button>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 2000, fontFamily: "'Segoe UI',sans-serif", display: "flex" }}>

      {/* ── SIDEBAR ── */}
      <div style={{ width: 225, background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", padding: 16, gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#4caf50,#1b5e20)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18 }}>L</div>
          <div><span style={{ fontWeight: 900, color: C.text, fontSize: 16 }}>Lingua</span><span style={{ fontWeight: 900, color: C.accent, fontSize: 16 }}>AI</span></div>
        </div>
        <div style={{ fontSize: 10, color: "#3a3a4a", marginBottom: 6, paddingLeft: 4, letterSpacing: 1, fontWeight: 700 }}>YÖNETİCİ PANELİ</div>
        {TABS.map(([id, ic, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", borderRadius: 10, border: "none", background: tab === id ? "#1a2a1a" : "transparent", color: tab === id ? C.accent : C.sub, cursor: "pointer", fontSize: 13, textAlign: "left", fontWeight: tab === id ? 700 : 400 }}>
            {ic} {lb}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        {settings.adminEmail && (
          <div style={{ background: "#1a1a2a", borderRadius: 8, padding: "8px 10px", marginBottom: 8 }}>
            <div style={{ color: "#444", fontSize: 10 }}>Giriş yapıldı</div>
            <div style={{ color: C.accent, fontSize: 11, fontWeight: 600 }}>{settings.adminEmail}</div>
          </div>
        )}
        <button onClick={onClose} style={{ padding: "10px 13px", borderRadius: 10, border: `1px solid ${C.border}`, background: "transparent", color: C.sub, cursor: "pointer", fontSize: 12 }}>← Uygulamaya Dön</button>
      </div>

      {/* ── ANA İÇERİK ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 6 }}>Dashboard</div>
            <div style={{ color: C.sub, fontSize: 13, marginBottom: 22 }}>Anlık platform özeti</div>

            {/* Stat kartları */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { l: "Toplam Kullanıcı",  v: totalUsers,   c: "#4caf50", icon: "👥" },
                { l: "Aktif Abonelik",    v: activeUsers,  c: "#2196f3", icon: "✅" },
                { l: "Deneme Sürecinde",  v: trialUsers,   c: "#ffd600", icon: "⏳" },
                { l: "Premium Üye",       v: premiumUsers, c: "#ab47bc", icon: "⭐" },
                { l: "Bekleyen Ödeme",    v: pendingCount, c: "#ef5350", icon: "💳" },
                { l: "Aktif Ders",        v: settings.activeSessions.length, c: "#ff7043", icon: "📡" },
              ].map(s => (
                <Card key={s.l}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.c, marginBottom: 4 }}>{s.v}</div>
                  <div style={{ color: C.sub, fontSize: 12 }}>{s.l}</div>
                </Card>
              ))}
            </div>

            {/* Gelir */}
            <Card style={{ marginBottom: 16 }}>
              <div style={{ color: C.text, fontWeight: 700, marginBottom: 14, fontSize: 15 }}>💰 Toplam Gelir</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#ffd600" }}>₺{totalRevenue.toLocaleString("tr-TR")}</div>
              <div style={{ color: C.sub, fontSize: 12, marginTop: 4 }}>Onaylanan ödemeler toplamı</div>
            </Card>

            {/* Hızlı bilgiler */}
            {(settings.contactEmail || settings.iban) && (
              <Card>
                <div style={{ color: C.text, fontWeight: 700, marginBottom: 12 }}>Hızlı Bilgiler</div>
                {settings.contactEmail && (
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ color: C.sub, fontSize: 12 }}>İletişim Maili: </span>
                    <span style={{ color: C.accent, fontSize: 13, fontWeight: 600 }}>{settings.contactEmail}</span>
                  </div>
                )}
                {settings.iban && (
                  <div>
                    <span style={{ color: C.sub, fontSize: 12 }}>IBAN: </span>
                    <span style={{ color: C.accent, fontFamily: "monospace", fontSize: 13, fontWeight: 600 }}>{settings.iban}</span>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}

        {/* ── KULLANICILAR ── */}
        {tab === "users" && (
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 20 }}>Kullanıcılar ({totalUsers})</div>
            <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 1fr 1fr 1fr 1fr 1fr", padding: "10px 16px", background: "#0d0d15", fontSize: 10, color: "#3a3a4a", fontWeight: 700, letterSpacing: 0.5 }}>
                {["AD / E-POSTA", "TELEFON / TC", "ŞEHİR", "PLAN", "DURUM", "ÖDEME", "İŞLEM"].map(h => <div key={h}>{h}</div>)}
              </div>
              {settings.users.map(u => (
                <div key={u.id} style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 1fr 1fr 1fr 1fr 1fr", padding: "12px 16px", borderTop: `1px solid ${C.border}`, alignItems: "center" }}>
                  <div>
                    <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{u.name}</div>
                    <div style={{ color: "#444", fontSize: 11 }}>{u.email}</div>
                    <div style={{ color: "#333", fontSize: 10 }}>{u.joined}</div>
                  </div>
                  <div>
                    <div style={{ color: "#888", fontSize: 12 }}>{u.phone || "—"}</div>
                    <div style={{ color: "#444", fontSize: 11 }}>{u.tc ? `TC: ${u.tc}` : "TC yok"}</div>
                    <div style={{ color: "#333", fontSize: 10 }}>{u.birthdate || ""}</div>
                  </div>
                  <div style={{ color: "#888", fontSize: 12 }}>{u.city || "—"}</div>
                  <div>
                    <div style={{ color: "#ccc", fontSize: 12 }}>{u.plan}{u.giftUsed && <span style={{ color: C.accent, fontSize: 10 }}> 🎁</span>}</div>
                    <div style={{ color: "#555", fontSize: 11 }}>{u.lang}</div>
                  </div>
                  <div>
                    <div style={{ display: "inline-block", background: u.status === "active" ? "#1a3a1a" : u.status === "trial" ? "#2a2a0a" : "#3a1a1a", color: u.status === "active" ? C.accent : u.status === "trial" ? C.warn : C.danger, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>
                      {u.status === "active" ? "Aktif" : u.status === "trial" ? `Deneme` : "Askıda"}
                    </div>
                    {u.status === "trial" && <div style={{ color: C.warn, fontSize: 10, marginTop: 2 }}>{u.trialDays}g kaldı</div>}
                  </div>
                  <div style={{ color: "#ffd600", fontSize: 13, fontWeight: 700 }}>{u.paid}</div>
                  <div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
                    <button onClick={() => { setMsgTarget(u); setMsgDone(false); setMsgText(""); }}
                      style={{ padding: "4px 8px", borderRadius: 6, background: "#1a1a2a", color: "#64b5f6", border: `1px solid #2a2a4a`, cursor: "pointer", fontSize: 10, fontWeight: 600 }}>✉ Mesaj</button>
                    <button onClick={() => { setGiftEmail(u.email); setTab("gift"); }}
                      style={{ padding: "4px 8px", borderRadius: 6, background: "#1a2a1a", color: C.accent, border: `1px solid #2a4a2a`, cursor: "pointer", fontSize: 10, fontWeight: 600 }}>🎁 Hediye</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mesaj modal */}
            {msgTarget && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }}>
                <div style={{ background: C.card, borderRadius: 20, padding: 28, width: 420, border: `1px solid ${C.border}` }}>
                  {msgDone ? (
                    <div style={{ textAlign: "center", padding: 16 }}>
                      <div style={{ fontSize: 50, marginBottom: 12 }}>✉️</div>
                      <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Mesaj Gönderildi!</div>
                      <Btn onClick={() => setMsgTarget(null)}>Tamam</Btn>
                    </div>
                  ) : (
                    <>
                      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>✉ Mesaj Gönder</div>
                      <div style={{ color: C.sub, fontSize: 13, marginBottom: 16 }}>{msgTarget.name} — {msgTarget.email}</div>
                      <textarea value={msgText} onChange={e => setMsgText(e.target.value)} placeholder="Mesajınızı yazın..."
                        style={{ width: "100%", minHeight: 90, padding: "11px 14px", background: "#1a1a2a", border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 14 }} />
                      <div style={{ display: "flex", gap: 10 }}>
                        <Btn variant="ghost" onClick={() => setMsgTarget(null)}>İptal</Btn>
                        <Btn onClick={() => setMsgDone(true)} style={{ flex: 1 }}>Gönder</Btn>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ÖDEMELER ── */}
        {tab === "payments" && (
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 20 }}>Havale Ödeme Yönetimi</div>

            {!settings.iban ? (
              <div style={{ background: "#1a1a0d", border: `1px solid #3a3a0d`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ color: C.warn, fontWeight: 700, marginBottom: 6 }}>⚠️ IBAN bilgisi girilmemiş</div>
                <div style={{ color: C.sub, fontSize: 13 }}>Ayarlar sekmesinden IBAN bilgilerinizi girin.</div>
              </div>
            ) : (
              <Card style={{ marginBottom: 20 }}>
                <div style={{ color: C.text, fontWeight: 700, marginBottom: 10 }}>Aktif IBAN Bilgileri</div>
                <div style={{ color: "#888", fontSize: 13, lineHeight: 2.2 }}>
                  Ad Soyad: <span style={{ color: C.text, fontWeight: 600 }}>{settings.accountName}</span><br />
                  IBAN: <span style={{ color: C.accent, fontFamily: "monospace", fontWeight: 700, fontSize: 15 }}>{settings.iban}</span><br />
                  Banka: <span style={{ color: C.text }}>{settings.bankName}</span>
                </div>
              </Card>
            )}

            <div style={{ color: C.text, fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Bekleyen Havale Bildirimleri ({pendingCount})</div>
            {settings.pendingPayments.filter(p => p.status === "waiting").length === 0 ? (
              <Card style={{ textAlign: "center", color: C.sub, marginBottom: 20 }}>Bekleyen ödeme yok</Card>
            ) : (
              settings.pendingPayments.filter(p => p.status === "waiting").map(p => (
                <div key={p.id} style={{ background: C.card, borderRadius: 12, padding: 18, border: `1px solid ${C.warn}44`, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: C.text, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>{p.email} • {p.plan} • {p.date}</div>
                    <div style={{ color: "#555", fontSize: 11, marginTop: 2 }}>Açıklama: {p.note}</div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ color: C.warn, fontSize: 18, fontWeight: 800 }}>{p.amount}</div>
                    <Btn onClick={() => approvePayment(p.id)} style={{ background: C.accent }}>✓ Onayla & Aktifleştir</Btn>
                  </div>
                </div>
              ))
            )}

            <div style={{ color: C.text, fontWeight: 700, marginBottom: 14, fontSize: 15, marginTop: 20 }}>Onaylanan Ödemeler</div>
            {settings.pendingPayments.filter(p => p.status === "approved").map(p => (
              <div key={p.id} style={{ background: C.card, borderRadius: 12, padding: 14, border: `1px solid ${C.accent}33`, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: C.text, fontSize: 13 }}>{p.name} — {p.plan}</div>
                  <div style={{ color: C.sub, fontSize: 11 }}>{p.date}</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ color: C.warn, fontWeight: 700 }}>{p.amount}</div>
                  <div style={{ background: "#1a3a1a", color: C.accent, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>✓ Onaylı</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── AKTİF DERSLER ── */}
        {tab === "sessions" && (
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 8 }}>Aktif Dersler</div>
            <div style={{ color: C.sub, fontSize: 13, marginBottom: 20 }}>
              Hizmet kalitesi denetimi kapsamında dersleri izleyebilirsiniz. Kayıt yapılmaz.
            </div>
            {settings.activeSessions.length === 0 ? (
              <Card style={{ textAlign: "center", color: C.sub }}>Şu an aktif ders yok</Card>
            ) : settings.activeSessions.map(s => (
              <div key={s.id} style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.accent}33`, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ color: C.text, fontWeight: 700 }}>{s.user}</div>
                  <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>{s.lang} • {s.teacher}</div>
                  <div style={{ color: C.sub, fontSize: 11, marginTop: 2 }}>Başladı: {s.start} • Süre: {s.dur}</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ background: "rgba(239,83,80,0.12)", color: C.danger, borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>● CANLI</div>
                  <Btn variant="secondary" onClick={() => setWatchTarget(s)} style={{ background: "#1a1a2a", color: "#64b5f6", border: `1px solid #2a2a4a` }}>👁 İzle</Btn>
                </div>
              </div>
            ))}
            <div style={{ background: "#1a1a0d", borderRadius: 12, padding: 14, border: `1px solid #3a3a0d`, marginTop: 8 }}>
              <div style={{ color: C.warn, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Güvenlik Protokolü</div>
              <div style={{ color: "#666", fontSize: 12, lineHeight: 1.8 }}>
                • Uygunsuz içerik tespitinde ders sonlandırılır<br />
                • Tekrarlayan ihlallerde hesap askıya alınır<br />
                • Kayıt yapılmaz, veriler saklanmaz
              </div>
            </div>

            {watchTarget && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }}>
                <div style={{ background: C.card, borderRadius: 20, padding: 28, width: 420, border: `1px solid ${C.border}` }}>
                  <div style={{ color: C.text, fontSize: 17, fontWeight: 700, marginBottom: 4 }}>👁 İzleme Modu</div>
                  <div style={{ color: "#888", fontSize: 13, marginBottom: 18 }}>{watchTarget.user} • {watchTarget.lang}</div>
                  <div style={{ background: "#1a1a0d", borderRadius: 12, padding: 14, border: `1px solid #3a3a0d`, marginBottom: 16 }}>
                    <div style={{ color: C.warn, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Bilgilendirme</div>
                    <div style={{ color: "#777", fontSize: 12, lineHeight: 1.8 }}>
                      • Kullanıcı sizin katıldığınızı görmez<br />
                      • Ders kayıt edilmez<br />
                      • Yalnızca hizmet kalitesi denetimi amaçlıdır
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Btn variant="ghost" onClick={() => setWatchTarget(null)}>İptal</Btn>
                    <Btn onClick={() => setWatchTarget(null)} style={{ flex: 1 }}>Derse Katıl</Btn>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── HEDİYE VER ── */}
        {tab === "gift" && (
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 20 }}>Ücretsiz Kullanım Hediye Et</div>
            <Card style={{ maxWidth: 480 }}>
              {giftDone ? (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>🎁</div>
                  <div style={{ color: C.text, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Hediye Gönderildi!</div>
                  <div style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>{giftEmail} → {giftType}</div>
                  <Btn onClick={() => { setGiftDone(false); setGiftEmail(""); }}>Tamam</Btn>
                </div>
              ) : (
                <>
                  <div style={{ color: "#aaa", fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
                    Kullanıcının kayıtlı e-posta adresini girerek istediğin planı ücretsiz hediye edebilirsin.
                  </div>
                  <Input label="Kullanıcı E-postası" value={giftEmail} onChange={e => setGiftEmail(e.target.value)} placeholder="ornek@mail.com" error={giftErr} />
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ color: "#aaa", fontSize: 12, marginBottom: 8 }}>Hediye Türü</div>
                    {["7 Gün Ücretsiz", "1 Ay Ücretsiz", "3 Ay Ücretsiz", "Yıllık Ücretsiz", "Sınırsız Kullanım"].map(g => (
                      <div key={g} onClick={() => setGiftType(g)}
                        style={{ padding: "11px 16px", borderRadius: 10, background: giftType === g ? "#1a2a1a" : "#1a1a2a", border: `1px solid ${giftType === g ? C.accent : C.border}`, color: giftType === g ? C.accent : "#ccc", cursor: "pointer", marginBottom: 8, fontSize: 13, fontWeight: giftType === g ? 700 : 400 }}>
                        🎁 {g}
                      </div>
                    ))}
                  </div>
                  <Btn onClick={sendGift} style={{ width: "100%", padding: "13px" }}>Hediye Gönder</Btn>
                </>
              )}
            </Card>
          </div>
        )}

        {/* ── BİLDİRİMLER ── */}
        {tab === "notify" && (
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 20 }}>Bildirim Gönder</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              {[
                { t: "Premium Teşvik",    m: "7 günlük denemeniz bitiyor! Premium'a geçin, sınırsız ders yapın." },
                { t: "Özel İndirim",      m: "Bu hafta yıllık plana geçenlere %20 ekstra indirim!" },
                { t: "Yeni Hoca",         m: "Yeni hocalarımız uygulamaya katıldı. Profillerine bakın!" },
                { t: "Ders Hatırlatma",   m: "Bugün ders yapmadınız. Hocanız sizi bekliyor." },
              ].map(n => (
                <Card key={n.t}>
                  <div style={{ color: C.text, fontWeight: 700, marginBottom: 8 }}>{n.t}</div>
                  <div style={{ color: "#666", fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>{n.m}</div>
                  <Btn style={{ width: "100%", padding: "8px", background: "#1a2a1a", color: C.accent, border: `1px solid #2a4a2a` }}>Tüm Kullanıcılara Gönder</Btn>
                </Card>
              ))}
            </div>
            <Card>
              <div style={{ color: C.text, fontWeight: 700, marginBottom: 14 }}>Özel Mesaj</div>
              <textarea placeholder="Mesajınızı yazın..."
                style={{ width: "100%", minHeight: 80, padding: "11px 14px", background: "#1a1a2a", border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 12 }} />
              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="secondary" style={{ flex: 1, background: "#1a1a2a", color: "#aaa", border: `1px solid ${C.border}` }}>Deneme Kullanıcılarına</Btn>
                <Btn style={{ flex: 1 }}>Tüm Kullanıcılara</Btn>
              </div>
            </Card>
          </div>
        )}

        {/* ── AYARLAR ── */}
        {tab === "settings" && (
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 20 }}>Ayarlar</div>

            {/* Hesap bilgileri */}
            <Card style={{ marginBottom: 16 }}>
              <div style={{ color: C.text, fontWeight: 700, marginBottom: 16, fontSize: 15 }}>👤 Yönetici Hesabı</div>
              <Input label="Yönetici E-postası (giriş için)" value={settings.adminEmail || ""} onChange={e => setSettings(s => ({ ...s, adminEmail: e.target.value }))} placeholder="admin@linguaai.com" />
              <Input label="Kullanıcılara Gösterilen İletişim E-postası" value={settings.contactEmail || ""} onChange={e => setSettings(s => ({ ...s, contactEmail: e.target.value }))} placeholder="iletisim@linguaai.com" />
            </Card>

            {/* IBAN */}
            <Card style={{ marginBottom: 16 }}>
              <div style={{ color: C.text, fontWeight: 700, marginBottom: 16, fontSize: 15 }}>💳 IBAN & Ödeme Bilgileri</div>
              <Input label="Hesap Sahibi Ad Soyad" value={settings.accountName || ""} onChange={e => setSettings(s => ({ ...s, accountName: e.target.value }))} placeholder="Ad Soyad" />
              <Input label="IBAN" value={settings.iban || ""} onChange={e => setSettings(s => ({ ...s, iban: e.target.value }))} placeholder="TR00 0000 0000 0000 0000 0000 00" />
              <Input label="Banka Adı" value={settings.bankName || ""} onChange={e => setSettings(s => ({ ...s, bankName: e.target.value }))} placeholder="Ziraat Bankası" />
            </Card>

            {/* Şifre */}
            <Card style={{ marginBottom: 16 }}>
              <div style={{ color: C.text, fontWeight: 700, marginBottom: 16, fontSize: 15 }}>🔐 Şifre Değiştir</div>
              <div style={{ color: C.sub, fontSize: 12, marginBottom: 12 }}>Mevcut şifre: admin123 (değiştirmeniz önerilir)</div>
              <Input label="Yeni Şifre" type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="En az 6 karakter" />
              <Input label="Şifre Tekrar" type="password" value={newPass2} onChange={e => setNewPass2(e.target.value)} placeholder="Tekrar girin" />
              {passMsg && <div style={{ color: passMsg.startsWith("✅") ? C.accent : C.danger, fontSize: 13, marginBottom: 10 }}>{passMsg}</div>}
              <Btn variant="secondary" onClick={changePass} style={{ background: "#1a2a1a", color: C.accent, border: `1px solid #2a4a2a` }}>Şifreyi Güncelle</Btn>
            </Card>

            {/* Kaydet */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Btn onClick={() => save(settings)} style={{ padding: "14px 32px", fontSize: 15 }}>
                💾 Tüm Ayarları Kaydet
              </Btn>
              {saved && <div style={{ color: C.accent, fontSize: 13, fontWeight: 600 }}>✅ Kaydedildi!</div>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ─── KAYIT MODAL ──────────────────────────────────────────────────────────────
function RegisterModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", tc: "", birthdate: "", city: "", password: "", confirm: "", consent: false });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Zorunlu";
    if (!form.email.includes("@")) e.email = "Geçerli e-posta girin";
    if (!form.phone.trim()) e.phone = "Zorunlu";
    if (form.tc.length !== 11 || !/^\d+$/.test(form.tc)) e.tc = "11 haneli TC kimlik no girin";
    if (!form.birthdate) e.birthdate = "Zorunlu";
    if (!form.city.trim()) e.city = "Zorunlu";
    if (form.password.length < 6) e.password = "En az 6 karakter";
    if (form.password !== form.confirm) e.confirm = "Şifreler eşleşmiyor";
    if (!form.consent) e.consent = "Onay zorunlu";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }}>
      <div style={{ background: "#111", borderRadius: 22, padding: 32, width: 440, border: "1px solid #2a2a3a", maxHeight: "92vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
          <div><div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>Hesap Oluştur</div><div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>5 gün ücretsiz başla</div></div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 60, marginBottom: 14 }}>🎉</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Hoş Geldin!</div>
            <div style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>7 günlük ücretsiz denemen başladı.</div>
            <button onClick={() => onSuccess(form)} style={{ width: "100%", padding: 13, background: "linear-gradient(135deg,#4caf50,#2e7d32)", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 16 }}>Derse Başla →</button>
          </div>
        ) : (
          <>
            {[
              { l: "Ad Soyad", k: "name", p: "Ahmet Yılmaz", t: "text" },
              { l: "E-posta", k: "email", p: "ornek@mail.com", t: "email" },
              { l: "Telefon", k: "phone", p: "05XX XXX XXXX", t: "tel" },
              { l: "T.C. Kimlik No", k: "tc", p: "12345678901", t: "text" },
              { l: "Doğum Tarihi", k: "birthdate", p: "", t: "date" },
              { l: "Şehir", k: "city", p: "İstanbul", t: "text" },
              { l: "Şifre", k: "password", p: "••••••••", t: "password" },
              { l: "Şifre Tekrar", k: "confirm", p: "••••••••", t: "password" },
            ].map(f => (
              <div key={f.k} style={{ marginBottom: 12 }}>
                <div style={{ color: "#aaa", fontSize: 12, marginBottom: 4 }}>{f.l}</div>
                <input type={f.t} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} placeholder={f.p}
                  style={{ width: "100%", padding: "11px 14px", background: "#1a1a2a", border: `1px solid ${errors[f.k] ? "#ef5350" : "#2a2a3a"}`, borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                {errors[f.k] && <div style={{ color: "#ef5350", fontSize: 11, marginTop: 2 }}>{errors[f.k]}</div>}
              </div>
            ))}
            <div style={{ background: "#1a1a2a", borderRadius: 10, padding: 12, marginBottom: 14, border: "1px solid #2a2a3a" }}>
              <label style={{ display: "flex", gap: 10, cursor: "pointer", alignItems: "flex-start" }}>
                <input type="checkbox" checked={form.consent} onChange={e => setForm(p => ({ ...p, consent: e.target.checked }))} style={{ marginTop: 3, width: 16, height: 16, accentColor: "#4caf50" }} />
                <span style={{ color: "#888", fontSize: 12, lineHeight: 1.65 }}>
                  Platform hizmet kalitesi kontrolleri kapsamındaki denetim uygulamalarını ve gizlilik politikasını okudum, kabul ediyorum.
                </span>
              </label>
              {errors.consent && <div style={{ color: "#ef5350", fontSize: 11, marginTop: 4 }}>{errors.consent}</div>}
            </div>
            <button onClick={() => { if (validate()) setDone(true); }} style={{ width: "100%", padding: 13, background: "linear-gradient(135deg,#4caf50,#2e7d32)", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 16 }}>Kayıt Ol →</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── ANA UYGULAMA ─────────────────────────────────────────────────────────────
export default function LinguaAI() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminErr, setAdminErr] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);
  const [kidsMode, setKidsMode] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [payPlan, setPayPlan] = useState(null);
  const [adminSettings] = useState(getAdminSettings());

  if (showAdmin) return <AdminPanel onClose={() => setShowAdmin(false)} />;
  if (activeSession) return <SessionScreen langId={activeSession.lang} teacher={activeSession.teacher} user={user} onClose={() => setActiveSession(null)} />;

  const tryAdmin = () => {
    const s = getAdminSettings();
    if (adminPass === s.adminPassword) { setShowAdmin(true); setShowAdminLogin(false); setAdminPass(""); setAdminErr(false); }
    else setAdminErr(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#07070f,#0d0d1a 55%,#070f07)", fontFamily: "'Segoe UI','Helvetica Neue',sans-serif", color: "#fff" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}} @keyframes float0{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}} @keyframes float1{0%,100%{transform:translateY(-5px)}50%{transform:translateY(7px)}} @keyframes float2{0%,100%{transform:translateY(3px)}50%{transform:translateY(-8px)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 36px", borderBottom: "1px solid #1a1a2a", background: "rgba(7,7,15,0.97)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(24px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { setScreen("home"); setSelectedLang(null); }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#4caf50,#1b5e20)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18, boxShadow: "0 2px 12px rgba(76,175,80,0.4)" }}>L</div>
          <span style={{ fontSize: 21, fontWeight: 900 }}>Lingua</span><span style={{ fontSize: 21, fontWeight: 900, color: "#4caf50" }}>AI</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[["home", "Ana Sayfa"], ["languages", "Diller"], ["pricing", "Fiyatlar"], ["contact", "İletişim"]].map(([s, l]) => (
            <button key={s} onClick={() => { setScreen(s); setSelectedLang(null); }} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: screen === s ? "#4caf50" : "transparent", color: screen === s ? "#000" : "#777", fontWeight: screen === s ? 700 : 400, fontSize: 13 }}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {user ? (
            <>
              <div style={{ background: "#1a2a1a", borderRadius: 8, padding: "7px 14px", fontSize: 13, color: "#4caf50", fontWeight: 600 }}>👤 {user.name.split(" ")[0]}</div>
              <button onClick={() => setUser(null)} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid #2a2a3a", background: "transparent", color: "#777", cursor: "pointer", fontSize: 12 }}>Çıkış</button>
            </>
          ) : (
            <button onClick={() => setShowRegister(true)} style={{ padding: "9px 20px", borderRadius: 9, background: "linear-gradient(135deg,#4caf50,#2e7d32)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, boxShadow: "0 2px 12px rgba(76,175,80,0.3)" }}>Üye Ol</button>
          )}
          <button onClick={() => setShowAdminLogin(true)} style={{ padding: "7px 11px", borderRadius: 8, border: "1px solid #1a1a2a", background: "transparent", color: "#333", cursor: "pointer", fontSize: 11 }}>⚙</button>
        </div>
      </nav>

      {/* HOME */}
      {screen === "home" && (
        <div style={{ animation: "fadeUp 0.6s ease" }}>
          <div style={{ textAlign: "center", padding: "80px 36px 48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: 22, padding: "6px 18px", fontSize: 12, color: "#4caf50", marginBottom: 24, fontWeight: 600 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4caf50", display: "inline-block", boxShadow: "0 0 6px #4caf50" }} />
              7 Gün Ücretsiz • Yazılı & Sesli AI Hoca • 10 Dil
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.08, margin: "0 auto 20px", maxWidth: 720, letterSpacing: -1.5 }}>
              AI Hocanla<br />
              <span style={{ background: "linear-gradient(90deg,#4caf50,#66bb6a,#a5d6a7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>10 Dil Öğren</span>
            </h1>
            <p style={{ fontSize: 17, color: "#555", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.8 }}>
              Yaz veya mikrofona bas, AI hocanla birebir ders yap.<br />Kameralı özellik yakında güncellemeyle geliyor!
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
              <button onClick={() => user ? setScreen("languages") : setShowRegister(true)}
                style={{ padding: "15px 38px", background: "linear-gradient(135deg,#4caf50,#2e7d32)", color: "#fff", border: "none", borderRadius: 14, cursor: "pointer", fontWeight: 700, fontSize: 16, boxShadow: "0 4px 24px rgba(76,175,80,0.4)" }}>
                Ücretsiz Başla →
              </button>
              <button onClick={() => setScreen("pricing")}
                style={{ padding: "15px 38px", background: "transparent", color: "#888", border: "1px solid #2a2a3a", borderRadius: 14, cursor: "pointer", fontWeight: 600, fontSize: 16 }}>
                Fiyatlar
              </button>
            </div>
          </div>

          {/* Hoca vitrin — dil renkleriyle animasyonlu kartlar */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, padding: "0 36px 48px", flexWrap: "wrap", alignItems: "flex-end" }}>
            {[
              { id: "q1", name: "Şeyh Ahmed Al-Ghamdi", gender: "male", lang: "Kur'an", langObj: LANGUAGES[0], fi: 0 },
              { id: "e3", name: "Sarah Mitchell", gender: "female", lang: "İngilizce", langObj: LANGUAGES[2], fi: 1 },
              { id: "r3", name: "Dr. Natasha Ivanova", gender: "female", lang: "Rusça", langObj: LANGUAGES[8], fi: 2 },
              { id: "s1", name: "Prof. Carlos García", gender: "male", lang: "İspanyolca", langObj: LANGUAGES[9], fi: 0 },
              { id: "c3", name: "Lin Mei", gender: "female", lang: "Çince", langObj: LANGUAGES[6], fi: 1 },
              { id: "g1", name: "Prof. Klaus Weber", gender: "male", lang: "Almanca", langObj: LANGUAGES[3], fi: 2 },
            ].map((t, i) => (
              <div key={i} style={{ textAlign: "center", animation: `float${t.fi} ${2.8 + i * 0.25}s ease-in-out infinite`, cursor: "pointer" }} onClick={() => setScreen("languages")}>
                <TeacherCard teacher={{ name: t.name, gender: t.gender, kids: false }} lang={t.langObj} size="large" />
                <div style={{ color: "#555", fontSize: 11, marginTop: 8, fontWeight: 500 }}>{t.lang}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, padding: "0 36px 44px", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { t: "Yazılı Ders", d: "Hocanla istediğin konuda yazarak pratik yap" },
              { t: "🎤 Sesli Konuşma", d: "Mikrofona basarak hocanla sesli konuş" },
              { t: "10 Dil", d: "Kur'an dahil 10 dil, 60 farklı hoca" },
              { t: "📷 Kamera Yakında", d: "Kameralı özellik güncellemeyle geliyor" },
            ].map(f => (
              <div key={f.t} style={{ background: "#0d0d1a", borderRadius: 16, padding: "20px 18px", width: 195, border: "1px solid #1a1a2a", textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: "#fff" }}>{f.t}</div>
                <div style={{ color: "#444", fontSize: 12, lineHeight: 1.65 }}>{f.d}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: "0 36px 70px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#444", marginBottom: 20 }}>10 Dil</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {LANGUAGES.map(lang => (
                <button key={lang.id} onClick={() => { setSelectedLang(lang); setScreen("languages"); }}
                  style={{ background: "#0d0d1a", border: "1px solid #1a1a2a", borderRadius: 12, padding: "10px 18px", cursor: "pointer", color: "#888", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = lang.accent; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a2a"; e.currentTarget.style.color = "#888"; }}>
                  <span style={{ fontSize: 18 }}>{lang.flag}</span>{lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DİL LİSTESİ */}
      {screen === "languages" && !selectedLang && (
        <div style={{ padding: "36px" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Dil Seç</h2>
            <p style={{ color: "#555", fontSize: 14 }}>Her dilde yetişkin ve çocuklara özel hocanlar</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(255px,1fr))", gap: 18, maxWidth: 1100, margin: "0 auto" }}>
            {LANGUAGES.map(lang => (
              <div key={lang.id} onClick={() => setSelectedLang(lang)}
                style={{ background: "#0d0d1a", borderRadius: 18, overflow: "hidden", border: "1px solid #1a1a2a", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = lang.accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a2a"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ background: `linear-gradient(135deg,${lang.color},${lang.color}aa)`, padding: "18px 18px 14px", borderBottom: `3px solid ${lang.accent}` }}>
                  <div style={{ fontSize: 28 }}>{lang.flag}</div>
                  <div style={{ fontSize: 19, fontWeight: 800, marginTop: 6 }}>{lang.name}</div>
                  <div style={{ color: lang.accent, fontSize: 13, marginTop: 2 }}>{lang.native}</div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ color: "#444", fontSize: 12, marginBottom: 10 }}>{lang.desc}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
                    {lang.modules.map(m => <span key={m} style={{ background: "#1a1a2a", border: `1px solid ${lang.accent}22`, borderRadius: 5, padding: "2px 7px", fontSize: 10, color: "#666" }}>{m}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
                    {TEACHERS[lang.id].filter(t => !t.kids).map(t => (
                      <TeacherCard key={t.id} teacher={t} lang={lang} size="small" />
                    ))}
                    <div style={{ background: "#1a1a2a", borderRadius: 6, padding: "2px 8px", fontSize: 10, color: "#64b5f6", fontWeight: 600 }}>+2 Çocuk</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOCA SEÇİMİ */}
      {screen === "languages" && selectedLang && (
        <div style={{ padding: "36px" }}>
          <button onClick={() => setSelectedLang(null)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Geri</button>
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{selectedLang.flag}</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>{selectedLang.name} — Hocanı Seç</h2>
            <p style={{ color: "#555", fontSize: 13 }}>2 erkek + 2 kadın yetişkin • 1 erkek + 1 kadın çocuk hocası</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 26 }}>
            {[false, true].map(k => (
              <button key={String(k)} onClick={() => setKidsMode(k)}
                style={{ padding: "10px 26px", borderRadius: 10, border: `1px solid ${kidsMode === k ? selectedLang.accent : "#2a2a3a"}`, background: kidsMode === k ? `${selectedLang.accent}18` : "transparent", color: kidsMode === k ? selectedLang.accent : "#666", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                {k ? "👶 Çocuklara Özel" : "🎓 Yetişkin Hocaları"}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(225px,1fr))", gap: 18, maxWidth: 980, margin: "0 auto" }}>
            {TEACHERS[selectedLang.id].filter(t => t.kids === kidsMode).map(t => (
              <div key={t.id}
                style={{ background: "#0d0d1a", borderRadius: 18, padding: 22, border: "1px solid #1a1a2a", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = selectedLang.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a2a"; e.currentTarget.style.transform = "translateY(0)"; }}
                onClick={() => { if (!user) { setShowRegister(true); return; } setActiveSession({ lang: selectedLang.id, teacher: t }); }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                  <TeacherCard teacher={t} lang={selectedLang} size="large" />
                </div>
                {t.kids && <div style={{ background: "#0d1a0d", color: "#4caf50", borderRadius: 7, padding: "3px 10px", fontSize: 11, fontWeight: 700, marginBottom: 8, display: "inline-block", border: "1px solid #1a3a1a" }}>👶 Çocuklara Özel</div>}
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "#fff" }}>{t.name}</div>
                <div style={{ color: "#555", fontSize: 12, marginBottom: 8 }}>{t.origin}</div>
                <div style={{ background: "#1a1a2a", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "#aaa", marginBottom: 12, display: "inline-block" }}>{t.specialty}</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 16 }}>
                  <span style={{ color: selectedLang.accent, fontSize: 13, fontWeight: 600 }}>⭐ {t.rating}</span>
                  <span style={{ color: "#444", fontSize: 12 }}>{t.students.toLocaleString()} öğrenci</span>
                </div>
                <button style={{ width: "100%", padding: "10px", borderRadius: 10, background: `linear-gradient(135deg,${selectedLang.accent},${selectedLang.accent}cc)`, color: "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                  🎤 Derse Başla
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FİYATLAR */}
      {screen === "pricing" && (
        <div style={{ padding: "60px 36px", textAlign: "center" }}>
          <h2 style={{ fontSize: 38, fontWeight: 800, marginBottom: 10 }}>Fiyatlandırma</h2>
          <p style={{ color: "#555", marginBottom: 48, fontSize: 15 }}>5 gün ücretsiz dene, havale ile öde</p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {PLANS.map((plan, idx) => (
              <div key={plan.id}
                style={{ background: idx === 2 ? "linear-gradient(135deg,#0d1f0d,#0d0d1a)" : "#0d0d1a", border: idx === 2 ? "2px solid #4caf50" : "1px solid #2a2a3a", borderRadius: 22, padding: 30, width: 255, position: "relative", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                {idx === 2 && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#4caf50,#2e7d32)", color: "#fff", borderRadius: 20, padding: "4px 16px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>⭐ EN POPÜLER</div>}
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: "#fff" }}>{plan.name}</div>
                <div style={{ marginBottom: 22 }}>
                  <span style={{ fontSize: 38, fontWeight: 900, color: idx === 2 ? "#4caf50" : "#fff" }}>{plan.price}</span>
                  <span style={{ color: "#444", fontSize: 14 }}>{plan.period}</span>
                </div>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", gap: 9, marginBottom: 9, textAlign: "left" }}>
                    <span style={{ color: "#4caf50", fontWeight: 700 }}>✓</span>
                    <span style={{ color: "#888", fontSize: 13 }}>{f}</span>
                  </div>
                ))}
                <button
                  onClick={() => { if (plan.id === "trial") { user ? setScreen("languages") : setShowRegister(true); } else { if (!user) setShowRegister(true); else setPayPlan(plan); } }}
                  style={{ width: "100%", marginTop: 22, padding: 13, borderRadius: 12, background: idx === 2 ? "linear-gradient(135deg,#4caf50,#2e7d32)" : plan.id === "trial" ? "transparent" : "#1a1a2a", color: idx === 2 ? "#fff" : "#ccc", border: plan.id === "trial" ? "1px solid #4caf50" : idx === 2 ? "none" : "1px solid #2a2a3a", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                  {plan.id === "trial" ? "Ücretsiz Başla" : "Satın Al (Havale)"}
                </button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, background: "#0d0d1a", borderRadius: 16, padding: 24, maxWidth: 520, margin: "40px auto 0", border: "1px solid #1a1a2a", textAlign: "left" }}>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 12, fontSize: 15 }}>💳 Havale / EFT ile Ödeme</div>
            {adminSettings.iban ? (
              <>
                <div style={{ color: "#888", fontSize: 13, lineHeight: 2.2 }}>
                  Ad Soyad: <span style={{ color: "#fff", fontWeight: 600 }}>{adminSettings.accountName}</span><br />
                  IBAN: <span style={{ color: "#4caf50", fontFamily: "monospace", fontWeight: 700 }}>{adminSettings.iban}</span><br />
                  Banka: <span style={{ color: "#fff" }}>{adminSettings.bankName}</span>
                </div>
                <div style={{ background: "#1a2a1a", borderRadius: 10, padding: 12, marginTop: 12, border: "1px solid #2a4a2a" }}>
                  <div style={{ color: "#4caf50", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>⚡ Nasıl çalışır?</div>
                  <div style={{ color: "#888", fontSize: 12, lineHeight: 1.7 }}>1. Havaleyi yapın, açıklamaya e-posta adresinizi yazın<br />2. "Havale Yaptım" butonuna tıklayın<br />3. Admin onayladıktan sonra üyeliğiniz aktifleşir (max 2 saat)</div>
                </div>
              </>
            ) : (
              <div style={{ color: "#888", fontSize: 13 }}>Ödeme bilgileri yakında eklenecektir. İletişim için bize ulaşın.</div>
            )}
          </div>
        </div>
      )}

      {/* İLETİŞİM */}
      {screen === "contact" && (
        <div style={{ padding: "60px 36px", maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 10 }}>İletişim</h2>
          <p style={{ color: "#555", marginBottom: 32, fontSize: 15 }}>Sorularınız için bize ulaşın</p>
          <div style={{ background: "#0d0d1a", borderRadius: 18, padding: 28, border: "1px solid #1a1a2a" }}>
            {adminSettings.contactEmail ? (
              <div style={{ marginBottom: 24 }}>
                <div style={{ color: "#aaa", fontSize: 13, marginBottom: 8 }}>E-posta</div>
                <a href={`mailto:${adminSettings.contactEmail}`} style={{ color: "#4caf50", fontSize: 18, fontWeight: 700, textDecoration: "none" }}>{adminSettings.contactEmail}</a>
              </div>
            ) : (
              <div style={{ color: "#888", fontSize: 14, marginBottom: 20 }}>İletişim bilgileri yakında eklenecektir.</div>
            )}
            <div style={{ borderTop: "1px solid #1a1a2a", paddingTop: 20, marginTop: 4 }}>
              <div style={{ color: "#aaa", fontSize: 13, marginBottom: 12 }}>Mesaj Gönderin</div>
              <input placeholder="Adınız" style={{ width: "100%", padding: "11px 14px", background: "#1a1a2a", border: "1px solid #2a2a3a", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
              <input placeholder="E-postanız" style={{ width: "100%", padding: "11px 14px", background: "#1a1a2a", border: "1px solid #2a2a3a", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
              <textarea placeholder="Mesajınız..." style={{ width: "100%", minHeight: 100, padding: "11px 14px", background: "#1a1a2a", border: "1px solid #2a2a3a", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 14 }} />
              <button style={{ width: "100%", padding: 13, background: "linear-gradient(135deg,#4caf50,#2e7d32)"
