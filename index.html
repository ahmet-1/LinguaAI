import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
   RENK PALETİ — Orman Yeşili + Petrol Mavisi
───────────────────────────────────────────── */
const K = {
  bg:    "#071512", bg2:   "#0a1e14", bg3:   "#0d2618",
  card:  "#0f2c1c", card2: "#122f1f",
  bdr:   "#1a4028", bdr2:  "#1f5030", bdr3:  "#266040",
  g1:"#1b5e20", g2:"#2e7d32", g3:"#388e3c", g4:"#43a047", gL:"#66bb6a",
  t1:"#004d40", t2:"#00695c", t3:"#00897b", tL:"#26a69a",
  tx:"#e8f5e9", tx2:"#a5d6a7", tx3:"#6a9e74", tx4:"#3d6b47",
  warn:"#f9a825", err:"#c62828", errL:"#ef5350", gold:"#f57f17",
};

/* ─────────────────────────────────────────────
   KALICI VERİTABANI
───────────────────────────────────────────── */
const DB = {
  g: k => { try { const v = localStorage.getItem("la_"+k); return v?JSON.parse(v):null; } catch { return null; } },
  s: (k,v) => { try { localStorage.setItem("la_"+k, JSON.stringify(v)); } catch {} },
  d: k => { try { localStorage.removeItem("la_"+k); } catch {} },
};
const getA = () => DB.g("adm") || { pw:"admin123", email:"", contactEmail:"", iban:"", bank:"", acName:"", users:[], pays:[] };
const setA = d => DB.s("adm", d);

/* ─────────────────────────────────────────────
   DİLLER & HOCALAR
───────────────────────────────────────────── */
const DILLER = [
  {id:"quran",  ad:"Kur'an-ı Kerim", yerel:"القرآن الكريم", bayrak:"🕌", renk:"#0d2a14", vurgu:"#f9a825", acik:"Tecvid, Makam ve Hıfz",        mic:"ar-SA", moduller:["Tecvid","Makam","Hıfz","Sure Mealleri"]},
  {id:"arabic", ad:"Arapça",          yerel:"العربية",       bayrak:"🇪🇬", renk:"#2a0e0e", vurgu:"#ff8f00", acik:"Nahiv, Sarf ve Konuşma",        mic:"ar-SA", moduller:["Nahiv","Sarf","Konuşma","Okuma-Yazma"]},
  {id:"english",ad:"İngilizce",        yerel:"English",       bayrak:"🇬🇧", renk:"#0e1a2a", vurgu:"#ef5350", acik:"British & American English",    mic:"en-US", moduller:["Grammar","Speaking","Vocabulary","IELTS"]},
  {id:"german", ad:"Almanca",          yerel:"Deutsch",       bayrak:"🇩🇪", renk:"#1a1a0e", vurgu:"#fdd835", acik:"A1'den C2'ye Almanca",           mic:"de-DE", moduller:["Grammatik","Sprechen","Vokabeln","TestDaF"]},
  {id:"italian",ad:"İtalyanca",        yerel:"Italiano",      bayrak:"🇮🇹", renk:"#0e2a0e", vurgu:"#ff8f00", acik:"La bella lingua italiana",       mic:"it-IT", moduller:["Grammatica","Conversazione","Cultura","CILS"]},
  {id:"french", ad:"Fransızca",        yerel:"Français",      bayrak:"🇫🇷", renk:"#0a1030", vurgu:"#ef5350", acik:"La langue de l'amour",           mic:"fr-FR", moduller:["Grammaire","Conversation","Culture","DELF"]},
  {id:"chinese",ad:"Çince",            yerel:"中文",           bayrak:"🇨🇳", renk:"#2a0a0a", vurgu:"#fdd835", acik:"Mandarin & HSK",                  mic:"zh-CN", moduller:["Pinyin","Hanzi","Konuşma","HSK"]},
  {id:"turkish",ad:"Türkçe",           yerel:"Türkçe",        bayrak:"🇹🇷", renk:"#2a0a0a", vurgu:"#ecf0f1", acik:"Ana dil & Yabancılara Türkçe",   mic:"tr-TR", moduller:["Dilbilgisi","Konuşma","Yazma","TÖMER"]},
  {id:"russian",ad:"Rusça",            yerel:"Русский",       bayrak:"🇷🇺", renk:"#0a0a2a", vurgu:"#ef5350", acik:"Kiril alfabesi & Konuşma",        mic:"ru-RU", moduller:["Kiril","Gramer","Konuşma","TORFL"]},
  {id:"spanish",ad:"İspanyolca",       yerel:"Español",       bayrak:"🇪🇸", renk:"#2a1a0a", vurgu:"#ff8f00", acik:"Dünyanın en yaygın dili",         mic:"es-ES", moduller:["Gramática","Conversación","Cultura","DELE"]},
];

const HOCALAR = {
  quran:[
    {id:"q1",ad:"Şeyh Ahmed Al-Ghamdi",   yer:"Mekke, S.Arabistan",   uz:"Tecvid & Hıfz Uzmanı",    p:4.9,n:1240,c:false},
    {id:"q2",ad:"Şeyh Omar Al-Fadil",     yer:"Medine, S.Arabistan",  uz:"Makam & Kıraat Uzmanı",   p:4.8,n:980, c:false},
    {id:"q3",ad:"Üst. Meryem Al-Husseini",yer:"Kahire, Mısır",        uz:"Sure Mealleri & Tefsir",  p:4.9,n:1560,c:false},
    {id:"q4",ad:"Üst. Fatıma Al-Zahrawi", yer:"Güney Sina, Mısır",    uz:"Tecvid & Kıraat Uzmanı",  p:4.7,n:870, c:false},
    {id:"q5",ad:"Öğrt. Yusuf Al-Nuri",    yer:"Kahire, Mısır",        uz:"Çocuklara Kur'an & Hıfz", p:4.9,n:640, c:true},
    {id:"q6",ad:"Öğrt. Zeynep Al-Safa",   yer:"Medine, S.Arabistan",  uz:"Çocuklara Tecvid",        p:4.8,n:510, c:true},
  ],
  arabic:[
    {id:"a1",ad:"Dr. Khalid Al-Mansouri",yer:"Kahire, Mısır",  uz:"Nahiv & Sarf Uzmanı",    p:4.9,n:2100,c:false},
    {id:"a2",ad:"Prof. Yusuf Al-Azhari", yer:"Kahire, Mısır",  uz:"Fesahat & Belağat",      p:4.8,n:1450,c:false},
    {id:"a3",ad:"Dr. Nour Al-Rashidi",   yer:"Bağdat, Irak",   uz:"Modern Arapça",          p:4.9,n:1890,c:false},
    {id:"a4",ad:"Üst. Layla Al-Baghdadi",yer:"Amman, Ürdün",   uz:"Nahiv & Okuma-Yazma",    p:4.7,n:1120,c:false},
    {id:"a5",ad:"Öğrt. Samir Al-Faruq", yer:"Kahire, Mısır",  uz:"Çocuklara Temel Arapça", p:4.9,n:720, c:true},
    {id:"a6",ad:"Öğrt. Hana Al-Zubi",   yer:"Amman, Ürdün",   uz:"Çocuklara Arapça",       p:4.8,n:590, c:true},
  ],
  english:[
    {id:"e1",ad:"James Harrison",        yer:"Londra, İngiltere",    uz:"British English & IELTS",    p:4.9,n:3200,c:false},
    {id:"e2",ad:"Dr. William Clarke",    yer:"Oxford, İngiltere",    uz:"Academic English & Writing", p:4.8,n:2100,c:false},
    {id:"e3",ad:"Sarah Mitchell",        yer:"New York, ABD",        uz:"American English & TOEFL",   p:4.9,n:2800,c:false},
    {id:"e4",ad:"Emma Thompson",         yer:"Manchester, İngiltere",uz:"Conversation & Pronunciation",p:4.8,n:1950,c:false},
    {id:"e5",ad:"Tom Bradley",           yer:"Bristol, İngiltere",   uz:"Çocuklara Eğlenceli İngilizce",p:4.9,n:880,c:true},
    {id:"e6",ad:"Lucy Williams",         yer:"Edinburgh, İskoçya",   uz:"Çocuk İngilizcesi",          p:4.8,n:740, c:true},
  ],
  german:[
    {id:"g1",ad:"Prof. Klaus Weber",  yer:"Berlin, Almanya",   uz:"Grammatik & TestDaF",       p:4.9,n:1800,c:false},
    {id:"g2",ad:"Dr. Hans Mueller",   yer:"Münih, Almanya",    uz:"İş Almancası & C2",         p:4.7,n:1200,c:false},
    {id:"g3",ad:"Anna Schneider",     yer:"Hamburg, Almanya",  uz:"Konuşma & Telaffuz",        p:4.9,n:2100,c:false},
    {id:"g4",ad:"Dr. Maria Fischer",  yer:"Viyana, Avusturya", uz:"A1-B2 & Günlük Almanca",   p:4.8,n:1600,c:false},
    {id:"g5",ad:"Felix Braun",        yer:"Köln, Almanya",     uz:"Çocuklara Eğlenceli Almanca",p:4.9,n:650,c:true},
    {id:"g6",ad:"Lena Hoffmann",      yer:"Stuttgart, Almanya",uz:"Çocuk Almancası",           p:4.8,n:520, c:true},
  ],
  italian:[
    {id:"i1",ad:"Marco Rossi",           yer:"Roma, İtalya",     uz:"Conversazione & Cultura",   p:4.8,n:1400,c:false},
    {id:"i2",ad:"Prof. Antonio Bianchi", yer:"Floransa, İtalya", uz:"Grammatica & CILS",         p:4.9,n:1100,c:false},
    {id:"i3",ad:"Sofia De Luca",         yer:"Milano, İtalya",   uz:"Moda İtalyancası & İş",     p:4.9,n:1750,c:false},
    {id:"i4",ad:"Giulia Ferrari",        yer:"Napoli, İtalya",   uz:"Konuşma & Telaffuz",        p:4.7,n:980, c:false},
    {id:"i5",ad:"Luca Marino",           yer:"Torino, İtalya",   uz:"Çocuklara İtalyanca",       p:4.8,n:430, c:true},
    {id:"i6",ad:"Chiara Esposito",       yer:"Roma, İtalya",     uz:"Çocuk İtalyancası",         p:4.9,n:380, c:true},
  ],
  french:[
    {id:"f1",ad:"Pierre Dubois",       yer:"Paris, Fransa",    uz:"Grammaire & DELF",          p:4.8,n:1900,c:false},
    {id:"f2",ad:"Dr. Jean-Luc Martin", yer:"Lyon, Fransa",     uz:"Fransız Edebiyatı",         p:4.9,n:1200,c:false},
    {id:"f3",ad:"Marie Dupont",        yer:"Paris, Fransa",    uz:"Konuşma & Telaffuz",        p:4.9,n:2300,c:false},
    {id:"f4",ad:"Camille Bernard",     yer:"Bordeaux, Fransa", uz:"İş Fransızcası",            p:4.7,n:1050,c:false},
    {id:"f5",ad:"Theo Laurent",        yer:"Marseille, Fransa",uz:"Çocuklara Fransızca",       p:4.8,n:490, c:true},
    {id:"f6",ad:"Amelie Petit",        yer:"Nice, Fransa",     uz:"Çocuk Fransızcası",         p:4.9,n:420, c:true},
  ],
  chinese:[
    {id:"c1",ad:"Wang Wei",  yer:"Pekin, Çin",     uz:"Pinyin & HSK 1-4",     p:4.8,n:2100,c:false},
    {id:"c2",ad:"Li Jian",   yer:"Şanghay, Çin",   uz:"İş Çincesi & HSK 5-6", p:4.9,n:1600,c:false},
    {id:"c3",ad:"Lin Mei",   yer:"Pekin, Çin",     uz:"Hanzi & Konuşma",      p:4.9,n:2400,c:false},
    {id:"c4",ad:"Zhang Li",  yer:"Chengdu, Çin",   uz:"Başlangıç Çincesi",    p:4.8,n:1800,c:false},
    {id:"c5",ad:"Chen Hao",  yer:"Guangzhou, Çin", uz:"Çocuklara Çince",      p:4.9,n:580, c:true},
    {id:"c6",ad:"Xiao Ying", yer:"Pekin, Çin",     uz:"Çocuk Çincesi",        p:4.8,n:490, c:true},
  ],
  turkish:[
    {id:"t1",ad:"Prof. Mehmet Yıldız",yer:"İstanbul, Türkiye",uz:"Dilbilgisi & Yazma",       p:4.9,n:1500,c:false},
    {id:"t2",ad:"Dr. Ali Kaya",       yer:"Ankara, Türkiye",  uz:"Yabancılara Türkçe",       p:4.8,n:1100,c:false},
    {id:"t3",ad:"Prof. Ayşe Demir",   yer:"İstanbul, Türkiye",uz:"Konuşma & Telaffuz",       p:4.9,n:1900,c:false},
    {id:"t4",ad:"Dr. Zeynep Arslan",  yer:"Bursa, Türkiye",   uz:"Edebiyat & İleri Türkçe",  p:4.8,n:1300,c:false},
    {id:"t5",ad:"Öğrt. Burak Şahin", yer:"İzmir, Türkiye",   uz:"Çocuklara Türkçe",         p:4.9,n:620, c:true},
    {id:"t6",ad:"Öğrt. Elif Kılıç",  yer:"Ankara, Türkiye",  uz:"Çocuk Türkçesi",           p:4.8,n:540, c:true},
  ],
  russian:[
    {id:"r1",ad:"Prof. Dmitri Volkov", yer:"Moskova, Rusya",      uz:"Kiril & Rus Grameri",  p:4.9,n:1600,c:false},
    {id:"r2",ad:"Dr. Alexei Petrov",   yer:"St.Petersburg, Rusya",uz:"İş Rusçası & TORFL",   p:4.8,n:1200,c:false},
    {id:"r3",ad:"Dr. Natasha Ivanova", yer:"Moskova, Rusya",      uz:"Konuşma & Telaffuz",   p:4.9,n:2000,c:false},
    {id:"r4",ad:"Prof. Elena Sorokina",yer:"Kazan, Rusya",        uz:"Edebiyat & Rusça",     p:4.8,n:1400,c:false},
    {id:"r5",ad:"Öğrt. Ivan Novikov",  yer:"Moskova, Rusya",      uz:"Çocuklara Rusça",      p:4.9,n:560, c:true},
    {id:"r6",ad:"Öğrt. Olga Morozova", yer:"Novosibirsk, Rusya",  uz:"Çocuk Rusçası",        p:4.8,n:480, c:true},
  ],
  spanish:[
    {id:"s1",ad:"Prof. Carlos García",  yer:"Madrid, İspanya",    uz:"Gramática & DELE",        p:4.9,n:2400,c:false},
    {id:"s2",ad:"Dr. Miguel Rodríguez", yer:"Barselona, İspanya",  uz:"İş İspanyolcası",         p:4.8,n:1800,c:false},
    {id:"s3",ad:"Ana Martínez",         yer:"Sevilla, İspanya",    uz:"Conversación",            p:4.9,n:2600,c:false},
    {id:"s4",ad:"Dr. Isabel López",     yer:"Valencia, İspanya",   uz:"Latin Amerika İspanyolcası",p:4.8,n:2100,c:false},
    {id:"s5",ad:"Öğrt. Diego Sánchez",  yer:"Madrid, İspanya",     uz:"Çocuklara İspanyolca",    p:4.9,n:720, c:true},
    {id:"s6",ad:"Öğrt. Lucía Fernández",yer:"Barselona, İspanya",  uz:"Çocuk İspanyolcası",      p:4.8,n:640, c:true},
  ],
};

/* ─────────────────────────────────────────────
   AVATAR
───────────────────────────────────────────── */
function Av({ h, dil, sz = 64 }) {
  const bas = h.ad.split(" ").slice(-2).map(w => w[0]).join("");
  return (
    <div style={{
      width:sz, height:sz, borderRadius:"50%", flexShrink:0, position:"relative",
      background:`linear-gradient(145deg,${dil.renk},${dil.renk}cc)`,
      border:`${sz>50?3:2}px solid ${dil.vurgu}`,
      display:"flex", alignItems:"center", justifyContent:"center",
      boxShadow:`0 0 20px ${dil.vurgu}33`,
    }}>
      <span style={{fontSize:sz>80?28:sz>50?18:12, fontWeight:900, color:"#fff", fontFamily:"Georgia,serif"}}>{bas}</span>
      {h.c && sz>50 && (
        <div style={{position:"absolute",top:-4,right:-4,width:20,height:20,borderRadius:"50%",
          background:K.gold,border:`2px solid ${K.bg}`,display:"flex",alignItems:"center",
          justifyContent:"center",fontSize:10,color:"#fff",fontWeight:700}}>★</div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   GİRİŞ / KAYIT MODAL
───────────────────────────────────────────── */
function AuthModal({ ilkMod, kapat, basari }) {
  const [mod, setMod]     = useState(ilkMod || "giris");
  const [form, setForm]   = useState({ad:"",email:"",tel:"",tc:"",dogum:"",sehir:"",sifre:"",sifre2:"",onay:false});
  const [hatalar, setH]   = useState({});
  const [tamam, setTamam] = useState(false);
  const [mesaj, setMesaj] = useState("");

  const f = (k, tip="text", yer="") => (
    <div style={{marginBottom:12}}>
      <input type={tip} value={form[k]} placeholder={yer}
        onChange={e => { setForm(p=>({...p,[k]:e.target.value})); setH(p=>({...p,[k]:""})); }}
        style={{width:"100%",padding:"11px 14px",background:K.bg3,
          border:`1px solid ${hatalar[k]?K.err:K.bdr}`,borderRadius:9,
          color:K.tx,fontSize:13,outline:"none",boxSizing:"border-box"}} />
      {hatalar[k] && <div style={{color:K.errL,fontSize:11,marginTop:3}}>{hatalar[k]}</div>}
    </div>
  );

  const girisYap = () => {
    const h={};
    if(!form.email) h.email="E-posta gerekli";
    if(!form.sifre) h.sifre="Şifre gerekli";
    if(Object.keys(h).length){setH(h);return;}
    const a=getA();
    const u=(a.users||[]).find(x=>x.email.toLowerCase()===form.email.toLowerCase()&&x.pw===form.sifre);
    if(!u){setH({sifre:"E-posta veya şifre hatalı"});return;}
    basari(getA().users.find(x=>x.id===u.id)||u);
  };

  const kayitOl = () => {
    const h={};
    if(!form.ad.trim())    h.ad="Zorunlu";
    if(!form.email.includes("@")) h.email="Geçerli e-posta girin";
    if(!form.tel.trim())   h.tel="Zorunlu";
    if(form.tc.length!==11||!/^\d+$/.test(form.tc)) h.tc="11 haneli TC";
    if(!form.dogum)        h.dogum="Zorunlu";
    if(!form.sehir.trim()) h.sehir="Zorunlu";
    if(form.sifre.length<6) h.sifre="En az 6 karakter";
    if(form.sifre!==form.sifre2) h.sifre2="Şifreler eşleşmiyor";
    if(!form.onay)         h.onay="Onay zorunlu";
    if(Object.keys(h).length){setH(h);return;}
    const a=getA();
    if((a.users||[]).find(x=>x.email.toLowerCase()===form.email.toLowerCase())){
      setH({email:"Bu e-posta zaten kayıtlı"}); return;
    }
    const yeni={
      id:Date.now(), ad:form.ad, email:form.email, tel:form.tel,
      tc:form.tc, dogum:form.dogum, sehir:form.sehir, pw:form.sifre,
      plan:"Deneme", durum:"Deneme", dil:"—",
      tarih:new Date().toLocaleDateString("tr-TR"),
      odeme:"₺0", trialStart:Date.now(), hediye:false,
    };
    setA({...a,users:[...(a.users||[]),yeni]});
    setTamam(true);
    basari(yeni);
  };

  const sSifre = () => {
    if(!form.email.includes("@")){setH({email:"Geçerli e-posta girin"});return;}
    setMesaj("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
  };

  const tabSt = aktif => ({
    flex:1,padding:"10px",border:"none",cursor:"pointer",fontWeight:700,fontSize:13,
    background:aktif?`linear-gradient(135deg,${K.g2},${K.t2})`:`${K.bg3}`,
    color:aktif?"#fff":K.tx3,borderRadius:8,
  });
  const btnSt = {width:"100%",padding:13,background:`linear-gradient(135deg,${K.g2},${K.t2})`,color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14,marginBottom:8};
  const linkSt = {background:"none",border:"none",color:K.tL,cursor:"pointer",fontSize:12,fontWeight:600};

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9000}}>
      <div style={{background:K.card,borderRadius:22,padding:26,width:410,border:`1px solid ${K.bdr3}`,maxHeight:"94vh",overflowY:"auto",boxShadow:`0 24px 64px rgba(0,0,0,0.8)`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          {mod!=="unuttu" && (
            <div style={{display:"flex",gap:6,flex:1}}>
              <button style={tabSt(mod==="giris")}    onClick={()=>{setMod("giris");setH({});setMesaj("");}}>Giriş Yap</button>
              <button style={tabSt(mod==="kayit")}    onClick={()=>{setMod("kayit");setH({});setTamam(false);}}>Üye Ol</button>
            </div>
          )}
          {mod==="unuttu" && <div style={{color:K.tx,fontSize:16,fontWeight:700}}>Şifremi Unuttum</div>}
          <button onClick={kapat} style={{background:"none",border:"none",color:K.tx3,fontSize:22,cursor:"pointer",marginLeft:8}}>✕</button>
        </div>

        {/* GİRİŞ */}
        {mod==="giris" && <>
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>E-posta</div>
          {f("email","email","ornek@mail.com")}
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>Şifre</div>
          {f("sifre","password","••••••••")}
          <div style={{textAlign:"right",marginBottom:14}}>
            <button style={linkSt} onClick={()=>{setMod("unuttu");setH({});setMesaj("");}}>Şifremi Unuttum</button>
          </div>
          <button style={btnSt} onClick={girisYap}>Giriş Yap</button>
          <div style={{textAlign:"center",color:K.tx3,fontSize:12}}>
            Hesabın yok mu? <button style={linkSt} onClick={()=>{setMod("kayit");setH({});setTamam(false);}}>Üye Ol</button>
          </div>
        </>}

        {/* KAYIT */}
        {mod==="kayit" && (tamam ? (
          <div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{fontSize:56,marginBottom:12}}>🎉</div>
            <div style={{color:K.tx,fontSize:20,fontWeight:700,marginBottom:8}}>Hoş Geldin!</div>
            <div style={{color:K.tx3,fontSize:13,marginBottom:20}}>5 günlük ücretsiz denemen başladı.</div>
            <button style={btnSt} onClick={kapat}>Derse Başla →</button>
          </div>
        ) : <>
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>Ad Soyad</div>{f("ad","text","Ahmet Yılmaz")}
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>E-posta</div>{f("email","email","ornek@mail.com")}
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>Telefon</div>{f("tel","tel","05XX XXX XXXX")}
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>T.C. Kimlik No</div>{f("tc","text","12345678901")}
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>Doğum Tarihi</div>{f("dogum","date","")}
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>Şehir</div>{f("sehir","text","İstanbul")}
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>Şifre</div>{f("sifre","password","min 6 karakter")}
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>Şifre Tekrar</div>{f("sifre2","password","tekrar girin")}
          <div style={{background:K.bg3,borderRadius:9,padding:12,marginBottom:13,border:`1px solid ${K.bdr}`}}>
            <label style={{display:"flex",gap:9,cursor:"pointer",alignItems:"flex-start"}}>
              <input type="checkbox" checked={form.onay} onChange={e=>setForm(p=>({...p,onay:e.target.checked}))}
                style={{marginTop:2,width:15,height:15,accentColor:K.gL}}/>
              <span style={{color:K.tx3,fontSize:11,lineHeight:1.6}}>
                Platform hizmet kalitesi kontrolleri kapsamındaki denetim uygulamalarını ve gizlilik politikasını okudum, kabul ediyorum.
              </span>
            </label>
            {hatalar.onay && <div style={{color:K.errL,fontSize:10,marginTop:4}}>{hatalar.onay}</div>}
          </div>
          <button style={btnSt} onClick={kayitOl}>Kayıt Ol →</button>
          <div style={{textAlign:"center",color:K.tx3,fontSize:12}}>
            Zaten hesabın var mı? <button style={linkSt} onClick={()=>{setMod("giris");setH({});}}>Giriş Yap</button>
          </div>
        </>)}

        {/* ŞİFREMİ UNUTTUM */}
        {mod==="unuttu" && (mesaj ? (
          <div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{fontSize:50,marginBottom:12}}>📧</div>
            <div style={{color:K.tx,fontSize:16,fontWeight:700,marginBottom:8}}>E-posta Gönderildi!</div>
            <div style={{color:K.tx3,fontSize:13,marginBottom:20}}>{mesaj}</div>
            <button style={btnSt} onClick={()=>setMod("giris")}>Giriş Yap</button>
          </div>
        ) : <>
          <div style={{color:K.tx3,fontSize:12,marginBottom:14,lineHeight:1.6}}>
            Kayıtlı e-posta adresinizi girin. Şifre sıfırlama bağlantısı göndereceğiz.
          </div>
          <div style={{color:K.tx3,fontSize:11,marginBottom:4}}>E-posta</div>
          {f("email","email","ornek@mail.com")}
          <button style={btnSt} onClick={sSifre}>Sıfırlama E-postası Gönder</button>
          <div style={{textAlign:"center"}}>
            <button style={linkSt} onClick={()=>setMod("giris")}>← Geri Dön</button>
          </div>
        </>)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DERS EKRANI
───────────────────────────────────────────── */
function DersEkrani({ dilId, hoca, kullanici, kapat }) {
  const dil = DILLER.find(d=>d.id===dilId);
  const [mesajlar, setM]  = useState([]);
  const [yazi, setY]      = useState("");
  const [yukl, setYukl]   = useState(false);
  const [mikr, setMikr]   = useState(false);
  const [mikErr, setMikErr]= useState("");
  const [sure, setSure]   = useState(kullanici?.plan==="Deneme"?1200:0);
  const sonRef = useRef(null);
  const recRef = useRef(null);

  useEffect(()=>{
    setM([{tip:"ai",tx:`Merhaba ${kullanici?.ad?.split(" ")[0]||""}! Ben ${hoca.ad}, ${hoca.yer} kökenli AI öğretmenin.\n\nUzmanlık: ${hoca.uz}\n\nYazarak veya 🎤 butonuna basarak sesli konuşabilirsin. Başlayalım!`}]);
    if(kullanici?.plan==="Deneme"){
      const t=setInterval(()=>setSure(s=>{if(s<=1){clearInterval(t);return 0;}return s-1;}),1000);
      return()=>clearInterval(t);
    }
  },[]);

  useEffect(()=>{sonRef.current?.scrollIntoView({behavior:"smooth"});},[mesajlar]);

  const mikBasla = () => {
    setMikErr("");
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){setMikErr("Tarayıcınız ses girişini desteklemiyor. Yazarak devam edebilirsiniz.");return;}
    try{
      const r=new SR();
      r.lang=dil.mic||"tr-TR"; r.continuous=false; r.interimResults=false;
      r.onstart=()=>setMikr(true);
      r.onresult=e=>{setY(e.results[0][0].transcript);setMikr(false);};
      r.onerror=e=>{setMikr(false);setMikErr(e.error==="not-allowed"?"Mikrofon izni reddedildi. Tarayıcı ayarlarından izin verin.":"Ses algılanamadı, tekrar dene.");setTimeout(()=>setMikErr(""),4000);};
      r.onend=()=>setMikr(false);
      recRef.current=r; r.start();
    }catch{setMikErr("Mikrofon başlatılamadı.");}
  };
  const mikBirak = ()=>{try{recRef.current?.stop();}catch{}setMikr(false);};

  const gonder = async()=>{
    if(!yazi.trim()||yukl)return;
    const txt=yazi.trim(); setY(""); setYukl(true);
    setM(m=>[...m,{tip:"user",tx:txt}]);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:800,
          system:`Sen ${hoca.ad} adlı AI dil öğretmenisin. ${hoca.yer} kökenlisin. ${dil.ad} dersi veriyorsun. Uzmanlık: ${hoca.uz}. Türkçe yanıt ver ve ${dil.yerel} dilinde örnekler ekle. Sıcak, sabırlı ve motive edici ol. Hataları nazikçe düzelt. Maksimum 3 paragraf.`,
          messages:[...mesajlar.filter(m=>m.tip).map(m=>({role:m.tip==="ai"?"assistant":"user",content:m.tx})),{role:"user",content:txt}]
        })
      });
      if(!r.ok){const d=await r.json().catch(()=>({}));throw new Error(d?.error?.message||`Sunucu hatası (${r.status})`);}
      const d=await r.json();
      const yanit=d.content?.[0]?.text;
      if(!yanit)throw new Error("Yanıt alınamadı.");
      setM(m=>[...m,{tip:"ai",tx:yanit}]);
      try{window.speechSynthesis?.cancel();const u=new SpeechSynthesisUtterance(yanit.substring(0,150));u.lang=dil.mic||"tr-TR";u.rate=0.9;window.speechSynthesis?.speak(u);}catch{}
    }catch(e){
      setM(m=>[...m,{tip:"ai",tx:`Yanıt alınamadı: ${e.message}. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.`}]);
    }
    setYukl(false);
  };

  const mm=String(Math.floor(sure/60)).padStart(2,"0");
  const ss2=String(sure%60).padStart(2,"0");

  return(
    <div style={{position:"fixed",inset:0,background:K.bg,display:"flex",flexDirection:"column",zIndex:8000,fontFamily:"inherit"}}>
      <style>{`.nokta{animation:nokta 1s var(--d,0s) infinite} @keyframes nokta{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}} @keyframes titret{0%,100%{opacity:1}50%{opacity:.4}}`}</style>

      <div style={{background:`rgba(27,94,32,0.2)`,padding:"4px 16px",fontSize:11,color:K.gL,textAlign:"center",borderBottom:`1px solid ${K.g1}44`}}>
        🔒 Platform hizmet kalitesi kapsamında denetlenebilir — Kayıt yapılmaz
      </div>

      <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:`linear-gradient(135deg,${dil.renk}ee,${dil.renk}99)`,borderBottom:`2px solid ${dil.vurgu}`}}>
        <Av h={hoca} dil={dil} sz={46}/>
        <div style={{flex:1}}>
          <div style={{color:"#fff",fontWeight:700,fontSize:14}}>{hoca.ad}</div>
          <div style={{color:dil.vurgu,fontSize:11}}>{hoca.yer} • {hoca.uz}</div>
        </div>
        {kullanici?.plan==="Deneme"&&sure>0&&(
          <div style={{background:"rgba(0,0,0,0.4)",borderRadius:8,padding:"4px 12px",textAlign:"center"}}>
            <div style={{fontSize:9,color:"#aaa"}}>KALAN</div>
            <div style={{fontWeight:800,color:sure<300?K.errL:dil.vurgu,fontSize:17}}>{mm}:{ss2}</div>
          </div>
        )}
        <button onClick={kapat} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontWeight:700}}>✕ Çıkış</button>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <div style={{width:195,background:K.bg2,borderRight:`1px solid ${K.bdr}`,padding:12,display:"flex",flexDirection:"column",gap:10,overflowY:"auto"}}>
          <div style={{background:K.card,borderRadius:10,padding:12,border:`1px solid ${K.bdr2}`,textAlign:"center"}}>
            <div style={{fontSize:9,color:K.tx4,marginBottom:8,fontWeight:700,letterSpacing:1}}>AI HOCAN</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><Av h={hoca} dil={dil} sz={76}/></div>
            <div style={{color:K.tx,fontWeight:700,fontSize:13}}>{hoca.ad}</div>
            <div style={{color:dil.vurgu,fontSize:10,marginTop:3}}>{hoca.yer}</div>
            <div style={{color:K.tx3,fontSize:10,marginTop:3}}>{hoca.uz}</div>
            <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:8}}>
              <span style={{color:dil.vurgu,fontSize:12}}>⭐ {hoca.p}</span>
              <span style={{color:K.tx4,fontSize:11}}>{hoca.n.toLocaleString()}</span>
            </div>
            {yukl&&<div style={{marginTop:6,color:K.gL,fontSize:10,animation:"titret 1s infinite"}}>Yanıt yazıyor...</div>}
          </div>

          <div style={{background:K.card,borderRadius:10,padding:12,border:`1px solid ${K.bdr}`,textAlign:"center"}}>
            <div style={{fontSize:9,color:K.tx4,marginBottom:6,fontWeight:700,letterSpacing:1}}>KAMERA</div>
            <div style={{background:K.bg3,borderRadius:8,padding:"12px 10px"}}>
              <div style={{fontSize:22}}>📷</div>
              <div style={{color:K.warn,fontSize:11,fontWeight:700,marginTop:4}}>Yakında!</div>
              <div style={{color:K.tx4,fontSize:10,marginTop:3}}>Güncellemeyle gelecek</div>
            </div>
          </div>

          {mikErr&&<div style={{background:"rgba(198,40,40,0.12)",borderRadius:8,padding:10,color:K.errL,fontSize:11,border:`1px solid ${K.err}44`}}>{mikErr}</div>}

          <div style={{background:K.card,borderRadius:10,padding:12}}>
            <div style={{fontSize:9,color:K.tx4,marginBottom:8,fontWeight:700,letterSpacing:1}}>MODÜLLER</div>
            {dil.moduller.map(m=>(
              <div key={m} style={{padding:"6px 10px",borderRadius:7,marginBottom:4,background:K.bg3,color:K.tx2,fontSize:11,borderLeft:`3px solid ${dil.vurgu}55`}}>{m}</div>
            ))}
          </div>
        </div>

        <div style={{flex:1,display:"flex",flexDirection:"column"}}>
          <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:12}}>
            {mesajlar.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.tip==="user"?"flex-end":"flex-start",gap:8,alignItems:"flex-start"}}>
                {m.tip==="ai"&&<Av h={hoca} dil={dil} sz={32}/>}
                <div style={{
                  maxWidth:"70%",padding:"11px 14px",borderRadius:16,color:K.tx,
                  fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap",
                  background:m.tip==="user"?`linear-gradient(135deg,${K.g2},${K.t2})`:K.card,
                  borderBottomRightRadius:m.tip==="user"?4:16,
                  borderBottomLeftRadius:m.tip==="ai"?4:16,
                  border:m.tip==="ai"?`1px solid ${K.bdr}`:"none",
                }}>{m.tx}</div>
              </div>
            ))}
            {yukl&&(
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <Av h={hoca} dil={dil} sz={32}/>
                <div style={{background:K.card,borderRadius:16,padding:"10px 16px",border:`1px solid ${K.bdr}`,display:"flex",gap:4,alignItems:"center"}}>
                  {[0,1,2].map(i=><div key={i} className="nokta" style={{"--d":`${i*0.18}s`,width:7,height:7,borderRadius:"50%",background:K.gL}}/>)}
                </div>
              </div>
            )}
            <div ref={sonRef}/>
          </div>

          <div style={{padding:12,borderTop:`1px solid ${K.bdr}`,background:K.bg2}}>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button
                onMouseDown={mikBasla} onMouseUp={mikBirak}
                onTouchStart={e=>{e.preventDefault();mikBasla();}}
                onTouchEnd={e=>{e.preventDefault();mikBirak();}}
                style={{width:46,height:46,borderRadius:"50%",
                  background:mikr?"rgba(198,40,40,0.2)":K.bg3,
                  border:`2px solid ${mikr?K.errL:K.g3}`,
                  cursor:"pointer",fontSize:19,flexShrink:0,
                  animation:mikr?"titret 0.5s infinite":"none",
                  userSelect:"none",WebkitUserSelect:"none"}}>
                {mikr?"🔴":"🎤"}
              </button>
              <input value={yazi} onChange={e=>setY(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&gonder()}
                placeholder="Mesaj yaz veya 🎤 basılı tut konuş..."
                style={{flex:1,background:K.bg3,border:`1px solid ${K.bdr}`,borderRadius:10,
                  padding:"12px 14px",color:K.tx,fontSize:13,outline:"none"}}/>
              <button onClick={gonder} disabled={yukl||!yazi.trim()}
                style={{padding:"12px 20px",borderRadius:10,fontWeight:700,fontSize:15,
                  border:"none",flexShrink:0,cursor:yukl||!yazi.trim()?"not-allowed":"pointer",
                  background:yukl||!yazi.trim()?K.bg3:`linear-gradient(135deg,${K.g2},${K.t2})`,
                  color:yukl||!yazi.trim()?K.tx4:"#fff"}}>➤</button>
            </div>
            <div style={{textAlign:"center",color:K.tx4,fontSize:10,marginTop:5}}>
              Mikrofona bas ve konuş • Bırak gönder • Enter ile de gönder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ADMİN PANELİ
───────────────────────────────────────────── */
function AdminPaneli({ kapat }) {
  const [sekme, setSekme]   = useState("dash");
  const [ayar, setAyar]     = useState(getA());
  const [kayd, setKayd]     = useState(false);
  const [hE,setHE]=useState(""); const [hT,setHT]=useState("7 Gün"); const [hOk,setHOk]=useState(false); const [hErr,setHErr]=useState("");
  const [p1,setP1]=useState(""); const [p2,setP2]=useState(""); const [pMsg,setPMsg]=useState("");
  const [izle,setIzle]=useState(null);

  const kaydet = y => { setAyar(y); setA(y); setKayd(true); setTimeout(()=>setKayd(false),2000); };

  const kullar = ayar.users||[];
  const odemeler = ayar.pays||[];
  const toplam = kullar.length;
  const aktif = kullar.filter(u=>u.durum==="Aktif").length;
  const deneme = kullar.filter(u=>u.durum==="Deneme").length;
  const bekleyen = odemeler.filter(o=>o.d==="bekle").length;
  const gelir = kullar.reduce((t,u)=>{const n=parseInt((u.odeme||"0").replace(/[^0-9]/g,""));return t+(isNaN(n)?0:n);},0);

  const onayOde = id=>{
    const o=odemeler.find(x=>x.id===id); if(!o)return;
    kaydet({...ayar,
      pays:odemeler.map(x=>x.id===id?{...x,d:"ok"}:x),
      users:kullar.map(u=>u.email===o.email?{...u,plan:o.plan,durum:"Aktif",odeme:`₺${parseInt((u.odeme||"0").replace(/[^0-9]/g,""))+(o.tutar||299)}`}:u)
    });
  };

  const hediyeGonder = ()=>{
    if(!hE.includes("@")){setHErr("Geçerli e-posta girin");return;}
    const u=kullar.find(x=>x.email===hE);
    if(!u){setHErr("Bu e-posta kayıtlı kullanıcılarda yok");return;}
    kaydet({...ayar,users:kullar.map(x=>x.email===hE?{...x,plan:hT,durum:"Aktif",hediye:true}:x)});
    setHOk(true);
  };

  const sifreDegis = ()=>{
    if(p1.length<6){setPMsg("En az 6 karakter");return;}
    if(p1!==p2){setPMsg("Şifreler eşleşmiyor");return;}
    kaydet({...ayar,pw:p1}); setPMsg("✅ Şifre güncellendi!"); setP1(""); setP2("");
  };

  const gI={width:"100%",padding:"10px 12px",background:K.bg3,border:`1px solid ${K.bdr}`,borderRadius:9,color:K.tx,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:12};
  const kD={background:K.card,borderRadius:12,padding:16,border:`1px solid ${K.bdr}`,marginBottom:14};
  const bG={padding:"10px 20px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13,border:"none",background:`linear-gradient(135deg,${K.g2},${K.t2})`,color:"#fff"};

  const SEKMELER=[["dash","📊","Dashboard"],["kullar","👥","Kullanıcılar"],["odeme","💳","Ödemeler"],["dersler","📡","Aktif Dersler"],["hediye","🎁","Hediye Ver"],["bildir","🔔","Bildirimler"],["ayarlar","⚙️","Ayarlar"]];

  return(
    <div style={{position:"fixed",inset:0,background:K.bg,zIndex:7000,display:"flex",fontFamily:"inherit"}}>
      <div style={{width:215,background:K.bg2,borderRight:`1px solid ${K.bdr}`,display:"flex",flexDirection:"column",padding:14,gap:3}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,paddingBottom:14,borderBottom:`1px solid ${K.bdr}`}}>
          <div style={{width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${K.g4},${K.t3})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:17}}>L</div>
          <span style={{fontWeight:900,color:K.tx,fontSize:15}}>Lingua<span style={{color:K.gL}}>AI</span></span>
        </div>
        <div style={{fontSize:9,color:K.tx4,marginBottom:5,letterSpacing:1,fontWeight:700,paddingLeft:3}}>YÖNETİCİ PANELİ</div>
        {SEKMELER.map(([id,ic,lb])=>(
          <button key={id} onClick={()=>setSekme(id)}
            style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:9,border:"none",
              background:sekme===id?`rgba(46,125,50,0.18)`:"transparent",
              color:sekme===id?K.gL:K.tx4,cursor:"pointer",fontSize:12,textAlign:"left",fontWeight:sekme===id?700:400,
              borderLeft:sekme===id?`3px solid ${K.g3}`:"3px solid transparent"}}>
            {ic} {lb}
          </button>
        ))}
        <div style={{flex:1}}/>
        <button onClick={kapat}
          style={{padding:"10px 12px",borderRadius:9,border:`1px solid ${K.bdr}`,background:"transparent",color:K.tx4,cursor:"pointer",fontSize:12}}>
          ← Uygulamaya Dön
        </button>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:22}}>

        {sekme==="dash"&&(
          <div>
            <div style={{fontSize:20,fontWeight:800,color:K.tx,marginBottom:16}}>Dashboard</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
              {[{l:"Toplam Kullanıcı",v:toplam,c:K.gL},{l:"Aktif Abonelik",v:aktif,c:K.tL},{l:"Deneme Süreci",v:deneme,c:K.warn},{l:"Bekleyen Ödeme",v:bekleyen,c:K.errL},{l:"Toplam Gelir",v:`₺${gelir.toLocaleString()}`,c:K.warn},{l:"Toplam Hoca",v:60,c:K.gL}].map(s=>(
                <div key={s.l} style={{...kD,marginBottom:0,padding:16}}>
                  <div style={{fontSize:24,fontWeight:900,color:s.c,marginBottom:3}}>{s.v}</div>
                  <div style={{color:K.tx4,fontSize:11}}>{s.l}</div>
                </div>
              ))}
            </div>
            {ayar.contactEmail&&<div style={kD}><div style={{color:K.tx2,fontSize:12,marginBottom:4,fontWeight:600}}>İletişim E-postası</div><div style={{color:K.gL,fontSize:15,fontWeight:700}}>{ayar.contactEmail}</div></div>}
            {ayar.iban&&<div style={kD}><div style={{color:K.tx2,fontSize:12,marginBottom:8,fontWeight:600}}>IBAN</div><div style={{color:K.tx3,fontSize:13,lineHeight:2}}>{ayar.acName}<br/><strong style={{color:K.gL,fontFamily:"monospace"}}>{ayar.iban}</strong><br/>{ayar.bank}</div></div>}
          </div>
        )}

        {sekme==="kullar"&&(
          <div>
            <div style={{fontSize:20,fontWeight:800,color:K.tx,marginBottom:16}}>Kullanıcılar ({toplam})</div>
            {kullar.length===0?(
              <div style={{...kD,color:K.tx4,textAlign:"center",padding:30}}>Henüz kayıtlı kullanıcı yok</div>
            ):(
              <div style={{...kD,padding:0,overflow:"hidden"}}>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr 0.8fr",padding:"9px 14px",background:K.bg3,fontSize:9,color:K.tx4,fontWeight:700,letterSpacing:0.5}}>
                  {["AD / E-POSTA","TEL / TC","PLAN","DURUM","GELİR"].map(h=><div key={h}>{h}</div>)}
                </div>
                {kullar.map(u=>(
                  <div key={u.id} style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr 0.8fr",padding:"11px 14px",borderTop:`1px solid ${K.bdr}`,alignItems:"center"}}>
                    <div><div style={{color:K.tx,fontSize:12,fontWeight:600}}>{u.ad}</div><div style={{color:K.tx4,fontSize:10}}>{u.email}</div><div style={{color:K.tx4,fontSize:10}}>{u.tarih}</div></div>
                    <div><div style={{color:K.tx2,fontSize:11}}>{u.tel||"—"}</div><div style={{color:K.tx4,fontSize:10}}>{u.tc?`TC: ${u.tc}`:""}</div></div>
                    <div style={{color:K.tx2,fontSize:11}}>{u.plan}{u.hediye&&<span style={{color:K.gL}}> 🎁</span>}</div>
                    <div style={{display:"inline-block",borderRadius:5,padding:"2px 7px",fontSize:10,fontWeight:600,
                      background:u.durum==="Aktif"?`rgba(46,125,50,0.18)`:u.durum==="Deneme"?`rgba(249,168,37,0.15)`:`rgba(198,40,40,0.15)`,
                      color:u.durum==="Aktif"?K.gL:u.durum==="Deneme"?K.warn:K.errL}}>{u.durum}</div>
                    <div style={{color:K.warn,fontSize:12,fontWeight:700}}>{u.odeme}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {sekme==="odeme"&&(
          <div>
            <div style={{fontSize:20,fontWeight:800,color:K.tx,marginBottom:16}}>Ödemeler</div>
            {!ayar.iban&&<div style={{background:`rgba(249,168,37,0.1)`,border:`1px solid ${K.warn}44`,borderRadius:10,padding:14,marginBottom:14}}><div style={{color:K.warn,fontWeight:700,marginBottom:4}}>⚠️ IBAN girilmemiş</div><div style={{color:K.tx4,fontSize:12}}>Ayarlar sekmesinden IBAN ekleyin.</div></div>}
            {ayar.iban&&<div style={kD}><div style={{color:K.tx2,fontWeight:700,marginBottom:10}}>Aktif IBAN</div><div style={{color:K.tx3,fontSize:13,lineHeight:2.2}}>{ayar.acName}<br/><strong style={{color:K.gL,fontFamily:"monospace",fontSize:14}}>{ayar.iban}</strong><br/>{ayar.bank}</div></div>}
            <div style={{color:K.tx,fontWeight:700,marginBottom:12,fontSize:14}}>Bekleyen Ödemeler ({bekleyen})</div>
            {odemeler.filter(o=>o.d==="bekle").length===0?(
              <div style={{...kD,color:K.tx4,textAlign:"center",fontSize:13}}>Bekleyen ödeme yok</div>
            ):odemeler.filter(o=>o.d==="bekle").map(o=>(
              <div key={o.id} style={{...kD,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{color:K.tx,fontWeight:700}}>{o.ad}</div><div style={{color:K.tx4,fontSize:11,marginTop:2}}>{o.email} • {o.plan} • {o.tarih}</div></div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{color:K.warn,fontSize:16,fontWeight:700}}>₺{o.tutar}</div>
                  <button onClick={()=>onayOde(o.id)} style={bG}>✓ Onayla</button>
                </div>
              </div>
            ))}
            <div style={{color:K.tx,fontWeight:700,marginBottom:12,fontSize:14,marginTop:16}}>Onaylananlar</div>
            {odemeler.filter(o=>o.d==="ok").length===0?(
              <div style={{...kD,color:K.tx4,textAlign:"center",fontSize:13}}>Henüz yok</div>
            ):odemeler.filter(o=>o.d==="ok").map(o=>(
              <div key={o.id} style={{...kD,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{color:K.tx,fontSize:12}}>{o.ad} — {o.plan}</div></div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{color:K.warn,fontWeight:700}}>₺{o.tutar}</div>
                  <div style={{background:`rgba(46,125,50,0.15)`,color:K.gL,borderRadius:5,padding:"2px 8px",fontSize:10,fontWeight:600}}>✓ Onaylı</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sekme==="dersler"&&(
          <div>
            <div style={{fontSize:20,fontWeight:800,color:K.tx,marginBottom:8}}>Aktif Dersler</div>
            <div style={{color:K.tx4,fontSize:12,marginBottom:16}}>Hizmet kalitesi kapsamında izleyebilirsiniz. Kayıt yapılmaz.</div>
            {kullar.filter(u=>u.durum==="Aktif").length===0?(
              <div style={{...kD,color:K.tx4,textAlign:"center",padding:30}}>Şu an aktif ders yok</div>
            ):kullar.filter(u=>u.durum==="Aktif").map(u=>(
              <div key={u.id} style={{...kD,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{color:K.tx,fontWeight:700}}>{u.ad}</div><div style={{color:K.tx4,fontSize:11,marginTop:2}}>{u.email} • {u.plan}</div></div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <div style={{background:`rgba(46,125,50,0.12)`,color:K.gL,borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700}}>AKTİF</div>
                  <button onClick={()=>setIzle(u)} style={{padding:"7px 12px",borderRadius:7,background:K.bg3,color:K.tL,border:`1px solid ${K.bdr2}`,cursor:"pointer",fontSize:11,fontWeight:600}}>👁 İzle</button>
                </div>
              </div>
            ))}
            <div style={{background:`rgba(249,168,37,0.08)`,borderRadius:10,padding:14,border:`1px solid ${K.warn}33`,marginTop:8}}>
              <div style={{color:K.warn,fontSize:12,fontWeight:700,marginBottom:6}}>Güvenlik Protokolü</div>
              <div style={{color:K.tx4,fontSize:11,lineHeight:1.8}}>• Uygunsuz içerik tespitinde ders sonlandırılır<br/>• Kayıt yapılmaz, veriler saklanmaz</div>
            </div>
            {izle&&(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999}}>
                <div style={{background:K.card,borderRadius:18,padding:26,width:380,border:`1px solid ${K.bdr3}`}}>
                  <div style={{color:K.tx,fontSize:16,fontWeight:700,marginBottom:4}}>👁 İzleme Modu</div>
                  <div style={{color:K.tx4,fontSize:12,marginBottom:16}}>{izle.ad} — {izle.email}</div>
                  <div style={{background:`rgba(249,168,37,0.08)`,borderRadius:10,padding:12,border:`1px solid ${K.warn}33`,marginBottom:14}}>
                    <div style={{color:K.tx4,fontSize:11,lineHeight:1.8}}>• Kullanıcı sizin katıldığınızı görmez<br/>• Kayıt yapılmaz<br/>• Yalnızca hizmet kalitesi denetimi amaçlıdır</div>
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <button onClick={()=>setIzle(null)} style={{flex:1,padding:10,background:"transparent",color:K.tx4,border:`1px solid ${K.bdr}`,borderRadius:9,cursor:"pointer"}}>İptal</button>
                    <button onClick={()=>setIzle(null)} style={{...bG,flex:2}}>Derse Katıl</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {sekme==="hediye"&&(
          <div>
            <div style={{fontSize:20,fontWeight:800,color:K.tx,marginBottom:16}}>Hediye Ver</div>
            <div style={{...kD,maxWidth:440}}>
              {hOk?(
                <div style={{textAlign:"center",padding:16}}>
                  <div style={{fontSize:50,marginBottom:12}}>🎁</div>
                  <div style={{color:K.tx,fontSize:18,fontWeight:700,marginBottom:6}}>Gönderildi!</div>
                  <div style={{color:K.tx4,fontSize:12,marginBottom:16}}>{hE} → {hT} Ücretsiz</div>
                  <button onClick={()=>{setHOk(false);setHE("");}} style={bG}>Tamam</button>
                </div>
              ):(
                <>
                  <div style={{color:K.tx2,fontSize:12,marginBottom:14,lineHeight:1.6}}>Kayıtlı kullanıcının e-postasını girerek ücretsiz kullanım hediye edin.</div>
                  <div style={{color:K.tx4,fontSize:11,marginBottom:5}}>Kullanıcı E-postası</div>
                  <input value={hE} onChange={e=>{setHE(e.target.value);setHErr("");}} placeholder="ornek@mail.com" style={gI}/>
                  {hErr&&<div style={{color:K.errL,fontSize:11,marginBottom:8}}>{hErr}</div>}
                  <div style={{color:K.tx4,fontSize:11,marginBottom:8}}>Hediye Türü</div>
                  {["7 Gün","1 Ay","3 Ay","Yıllık","Sınırsız"].map(g=>(
                    <div key={g} onClick={()=>setHT(g)}
                      style={{padding:"10px 14px",borderRadius:9,background:hT===g?`rgba(46,125,50,0.2)`:K.bg3,border:`1px solid ${hT===g?K.g3:K.bdr}`,color:hT===g?K.gL:K.tx2,cursor:"pointer",marginBottom:7,fontSize:12,fontWeight:hT===g?700:400}}>
                      🎁 {g} Ücretsiz
                    </div>
                  ))}
                  <button onClick={hediyeGonder} style={{...bG,width:"100%",padding:"12px",marginTop:4,fontSize:14}}>Hediye Gönder</button>
                </>
              )}
            </div>
          </div>
        )}

        {sekme==="bildir"&&(
          <div>
            <div style={{fontSize:20,fontWeight:800,color:K.tx,marginBottom:16}}>Bildirim Gönder</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[{t:"Premium Teşvik",m:"5 günlük denemeniz bitiyor! Premium'a geçin."},{t:"Özel İndirim",m:"Bu hafta yıllık plana özel indirim!"},{t:"Yeni Hoca",m:"Yeni hocalarımız uygulamaya katıldı!"},{t:"Ders Hatırlatma",m:"Bugün ders yapmadınız. Hocanız bekliyor."}].map(n=>(
                <div key={n.t} style={{...kD,marginBottom:0}}>
                  <div style={{color:K.tx,fontWeight:700,marginBottom:6,fontSize:13}}>{n.t}</div>
                  <div style={{color:K.tx4,fontSize:11,lineHeight:1.6,marginBottom:10}}>{n.m}</div>
                  <button onClick={()=>alert("Bildirim gönderildi!")} style={{width:"100%",padding:"7px",borderRadius:7,background:`rgba(46,125,50,0.12)`,color:K.gL,border:`1px solid ${K.g1}44`,cursor:"pointer",fontSize:11,fontWeight:600}}>Tüm Kullanıcılara Gönder</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {sekme==="ayarlar"&&(
          <div>
            <div style={{fontSize:20,fontWeight:800,color:K.tx,marginBottom:16}}>Ayarlar</div>
            <div style={kD}>
              <div style={{color:K.tx,fontWeight:700,marginBottom:14,fontSize:14}}>👤 Hesap Bilgileri</div>
              <div style={{color:K.tx4,fontSize:11,marginBottom:5}}>Yönetici E-postası</div>
              <input value={ayar.email||""} onChange={e=>setAyar(s=>({...s,email:e.target.value}))} placeholder="admin@linguaai.com" style={gI}/>
              <div style={{color:K.tx4,fontSize:11,marginBottom:5}}>Kullanıcılara Gösterilen İletişim E-postası</div>
              <input value={ayar.contactEmail||""} onChange={e=>setAyar(s=>({...s,contactEmail:e.target.value}))} placeholder="iletisim@linguaai.com" style={gI}/>
            </div>
            <div style={kD}>
              <div style={{color:K.tx,fontWeight:700,marginBottom:14,fontSize:14}}>💳 IBAN Bilgileri</div>
              <div style={{color:K.tx4,fontSize:11,marginBottom:5}}>Hesap Sahibi</div>
              <input value={ayar.acName||""} onChange={e=>setAyar(s=>({...s,acName:e.target.value}))} placeholder="Ad Soyad" style={gI}/>
              <div style={{color:K.tx4,fontSize:11,marginBottom:5}}>IBAN</div>
              <input value={ayar.iban||""} onChange={e=>setAyar(s=>({...s,iban:e.target.value}))} placeholder="TR00 0000 0000 0000 0000 0000 00" style={gI}/>
              <div style={{color:K.tx4,fontSize:11,marginBottom:5}}>Banka Adı</div>
              <input value={ayar.bank||""} onChange={e=>setAyar(s=>({...s,bank:e.target.value}))} placeholder="Ziraat Bankası" style={gI}/>
            </div>
            <div style={kD}>
              <div style={{color:K.tx,fontWeight:700,marginBottom:6,fontSize:14}}>🔐 Şifre Değiştir</div>
              <div style={{color:K.tx4,fontSize:11,marginBottom:12}}>Varsayılan şifre: admin123 — lütfen değiştirin</div>
              <input type="password" value={p1} onChange={e=>setP1(e.target.value)} placeholder="Yeni şifre" style={gI}/>
              <input type="password" value={p2} onChange={e=>setP2(e.target.value)} placeholder="Tekrar girin" style={gI}/>
              {pMsg&&<div style={{color:pMsg.startsWith("✅")?K.gL:K.errL,fontSize:12,marginBottom:10}}>{pMsg}</div>}
              <button onClick={sifreDegis} style={{padding:"9px 18px",background:`rgba(46,125,50,0.15)`,color:K.gL,border:`1px solid ${K.g1}55`,borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:12}}>Şifreyi Güncelle</button>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <button onClick={()=>kaydet(ayar)} style={{...bG,padding:"13px 28px",fontSize:15}}>💾 Tüm Ayarları Kaydet</button>
              {kayd&&<div style={{color:K.gL,fontSize:13,fontWeight:600}}>✅ Kaydedildi!</div>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANA UYGULAMA
───────────────────────────────────────────── */
export default function App() {
  const [kullanici,   setKul]  = useState(()=>DB.g("kul"));
  const [adminGiris,  setAdG]  = useState(()=>DB.g("adGiris")===true);
  const [adminAcik,   setAdA]  = useState(false);
  const [sayfa,       setSayfa]= useState("ana");
  const [dilSec,      setDS]   = useState(null);
  const [cocukMod,    setCM]   = useState(false);
  const [ders,        setDers] = useState(null);
  const [authAcik,    setAuth] = useState(false);
  const [authMod,     setAMod] = useState("giris");
  const [adminModal,  setAMod2]= useState(false);
  const [adminSifre,  setAS]   = useState("");
  const [adminHata,   setAH]   = useState("");
  const [odemePlan,   setOP]   = useState(null);

  const kulGiris  = u => { setKul(u); DB.s("kul",u); };
  const kulCikis  = () => { setKul(null); DB.d("kul"); };
  const admGiris  = () => {
    const a=getA();
    if(adminSifre===a.pw){setAdG(true);DB.s("adGiris",true);setAdA(true);setAMod2(false);setAS("");setAH("");}
    else setAH("Yanlış şifre");
  };
  const admCikis  = () => { setAdG(false); DB.d("adGiris"); setAdA(false); };

  const dersGirebilir = () => {
    if(DB.g("adGiris")===true||adminGiris) return true;
    if(!kullanici) return false;
    if(kullanici.durum==="Aktif") return true;
    if(kullanici.durum==="Deneme") return (Date.now()-kullanici.trialStart)/(1000*60*60*24)<5;
    return false;
  };

  const git = s => { setSayfa(s); setDS(null); };
  const adm = getA();

  if(adminAcik||adminGiris) return <AdminPaneli kapat={()=>{setAdA(false);}}/>;
  if(ders) return <DersEkrani dilId={ders.dil} hoca={ders.hoca} kullanici={ders.kul||kullanici} kapat={()=>setDers(null)}/>;

  const bP = {padding:"13px 28px",background:`linear-gradient(135deg,${K.g2},${K.t2})`,color:"#fff",border:"none",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:14,boxShadow:`0 4px 20px ${K.g2}55`};
  const bS = {padding:"13px 28px",background:"transparent",color:K.tx2,border:`1px solid ${K.bdr}`,borderRadius:12,cursor:"pointer",fontWeight:600,fontSize:14};
  const gI2 = {width:"100%",padding:"11px 13px",background:K.bg3,border:`1px solid ${K.bdr}`,borderRadius:9,color:K.tx,fontSize:13,outline:"none",boxSizing:"border-box"};

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(170deg,${K.bg},${K.bg2} 50%,${K.bg})`,fontFamily:`'Segoe UI',system-ui,sans-serif`}}>
      <style>{`
        @keyframes y0{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes y1{0%,100%{transform:translateY(-5px)}50%{transform:translateY(7px)}}
        @keyframes y2{0%,100%{transform:translateY(4px)}50%{transform:translateY(-8px)}}
        @keyframes gir{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes titret{0%,100%{opacity:1}50%{opacity:.4}}
        *{box-sizing:border-box}
      `}</style>

      {/* NAVBAR */}
      <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 22px",borderBottom:`1px solid ${K.bdr}`,background:"rgba(7,21,16,0.97)",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(20px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>git("ana")}>
          <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${K.g4},${K.t3})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:18,boxShadow:`0 2px 14px ${K.g2}66`}}>L</div>
          <span style={{fontSize:20,fontWeight:900,color:K.tx}}>Lingua</span><span style={{fontSize:20,fontWeight:900,color:K.gL}}>AI</span>
        </div>

        <div style={{display:"flex",gap:3}}>
          {[["ana","Ana Sayfa"],["diller","Diller"],["fiyatlar","Fiyatlar"],["iletisim","İletişim"]].map(([s,l])=>(
            <button key={s} onClick={()=>git(s)} style={{padding:"7px 13px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:sayfa===s?700:400,background:sayfa===s?`rgba(46,125,50,0.2)`:"transparent",color:sayfa===s?K.gL:K.tx3}}>{l}</button>
          ))}
        </div>

        <div style={{display:"flex",gap:7,alignItems:"center"}}>
          {kullanici ? (
            <>
              <div style={{background:`rgba(46,125,50,0.12)`,borderRadius:8,padding:"6px 13px",fontSize:12,color:K.gL,fontWeight:600,border:`1px solid ${K.g1}44`}}>
                👤 {kullanici.ad.split(" ")[0]}
                <span style={{color:kullanici.durum==="Aktif"?K.gL:K.warn,fontSize:10,marginLeft:5}}>{kullanici.durum}</span>
              </div>
              <button onClick={kulCikis} style={{padding:"6px 11px",borderRadius:8,border:`1px solid ${K.bdr}`,background:"transparent",color:K.tx4,cursor:"pointer",fontSize:11}}>Çıkış</button>
            </>
          ) : (
            <>
              <button onClick={()=>{setAMod("giris");setAuth(true);}} style={{padding:"7px 14px",borderRadius:8,border:`1px solid ${K.bdr}`,background:"transparent",color:K.tx2,cursor:"pointer",fontSize:12,fontWeight:600}}>Giriş Yap</button>
              <button onClick={()=>{setAMod("kayit");setAuth(true);}} style={{padding:"7px 16px",borderRadius:8,background:`linear-gradient(135deg,${K.g2},${K.t2})`,color:"#fff",border:"none",cursor:"pointer",fontWeight:700,fontSize:12}}>Üye Ol</button>
            </>
          )}
          <button onClick={()=>{setAMod2(true);setAH("");setAS("");}} style={{padding:"6px 9px",borderRadius:8,border:`1px solid ${K.bdr}`,background:"transparent",color:K.tx4,cursor:"pointer",fontSize:10}}>⚙</button>
        </div>
      </nav>

      {/* ANA SAYFA */}
      {sayfa==="ana"&&(
        <div style={{animation:"gir 0.5s ease"}}>
          <div style={{textAlign:"center",padding:"68px 22px 42px"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`rgba(46,125,50,0.1)`,border:`1px solid rgba(46,125,50,0.25)`,borderRadius:20,padding:"5px 16px",fontSize:11,color:K.gL,marginBottom:22,fontWeight:600}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:K.gL,display:"inline-block"}}/>
              5 Gün Ücretsiz • Yazılı & Sesli AI Hoca • 10 Dil
            </div>
            <h1 style={{fontSize:48,fontWeight:900,lineHeight:1.08,margin:"0 auto 18px",maxWidth:650,letterSpacing:-1.5,color:K.tx}}>
              AI Hocanla<br/>
              <span style={{background:`linear-gradient(90deg,${K.gL},${K.tL})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>10 Dil Öğren</span>
            </h1>
            <p style={{fontSize:15,color:K.tx3,maxWidth:440,margin:"0 auto 30px",lineHeight:1.8}}>Yaz veya mikrofona bas, AI hocanla birebir ders yap.<br/>Kameralı özellik yakında güncellemeyle geliyor!</p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button style={bP} onClick={()=>{if(kullanici)git("diller");else{setAMod("kayit");setAuth(true);}}}>Ücretsiz Başla →</button>
              <button style={bS} onClick={()=>git("fiyatlar")}>Fiyatlar</button>
            </div>
          </div>

          <div style={{display:"flex",justifyContent:"center",gap:18,padding:"0 22px 36px",flexWrap:"wrap",alignItems:"flex-end"}}>
            {[{ad:"Şeyh Ahmed Al-Ghamdi",p:4.9,n:1240,c:false,uz:"Tecvid & Hıfz",dil:DILLER[0],a:0},{ad:"Sarah Mitchell",p:4.9,n:2800,c:false,uz:"American English",dil:DILLER[2],a:1},{ad:"Dr. Natasha Ivanova",p:4.9,n:2000,c:false,uz:"Konuşma",dil:DILLER[8],a:2},{ad:"Prof. Carlos García",p:4.9,n:2400,c:false,uz:"Gramática",dil:DILLER[9],a:0},{ad:"Lin Mei",p:4.9,n:2400,c:false,uz:"Hanzi",dil:DILLER[6],a:1},{ad:"Prof. Klaus Weber",p:4.9,n:1800,c:false,uz:"Grammatik",dil:DILLER[3],a:2}].map((h,i)=>(
              <div key={i} style={{textAlign:"center",animation:`y${h.a} ${2.8+i*0.25}s ease-in-out infinite`,cursor:"pointer"}} onClick={()=>git("diller")}>
                <Av h={h} dil={h.dil} sz={72}/><div style={{color:K.tx4,fontSize:10,marginTop:7}}>{h.dil.ad}</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:12,padding:"0 22px 36px",justifyContent:"center",flexWrap:"wrap"}}>
            {[{t:"🎤 Sesli Konuşma",d:"Mikrofona bas, hocanla sesli konuş"},{t:"✍️ Yazılı Ders",d:"İstediğin konuda yazarak pratik yap"},{t:"🌍 10 Dil",d:"Kur'an dahil 10 dil, 60 farklı hoca"},{t:"👶 Çocuk Modu",d:"Her dilde özel çocuk hocaları"}].map(f=>(
              <div key={f.t} style={{background:K.card,borderRadius:14,padding:"18px 16px",width:190,border:`1px solid ${K.bdr}`,textAlign:"center"}}>
                <div style={{fontWeight:700,fontSize:13,marginBottom:6,color:K.tx}}>{f.t}</div>
                <div style={{color:K.tx4,fontSize:11,lineHeight:1.6}}>{f.d}</div>
              </div>
            ))}
          </div>

          <div style={{padding:"0 22px 58px",textAlign:"center"}}>
            <div style={{fontSize:13,fontWeight:700,color:K.tx4,marginBottom:16}}>10 Dil</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
              {DILLER.map(d=>(
                <button key={d.id} onClick={()=>{setDS(d);git("diller");}}
                  style={{background:K.card,border:`1px solid ${K.bdr}`,borderRadius:10,padding:"8px 14px",cursor:"pointer",color:K.tx3,display:"flex",alignItems:"center",gap:7,fontSize:12}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=d.vurgu;e.currentTarget.style.color=K.tx;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=K.bdr;e.currentTarget.style.color=K.tx3;}}>
                  <span style={{fontSize:16}}>{d.bayrak}</span>{d.ad}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DİLLER */}
      {sayfa==="diller"&&!dilSec&&(
        <div style={{padding:"26px 22px"}}>
          <div style={{textAlign:"center",marginBottom:26}}>
            <h2 style={{fontSize:26,fontWeight:800,marginBottom:6,color:K.tx}}>Dil Seç</h2>
            <p style={{color:K.tx4,fontSize:13}}>Her dilde yetişkin ve çocuklara özel hocanlar</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16,maxWidth:1000,margin:"0 auto"}}>
            {DILLER.map(d=>(
              <div key={d.id} onClick={()=>setDS(d)}
                style={{background:K.card,borderRadius:16,overflow:"hidden",border:`1px solid ${K.bdr}`,cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=d.vurgu;e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=K.bdr;e.currentTarget.style.transform="translateY(0)";}}>
                <div style={{background:`linear-gradient(135deg,${d.renk},${d.renk}cc)`,padding:"16px 16px 12px",borderBottom:`3px solid ${d.vurgu}`}}>
                  <div style={{fontSize:26}}>{d.bayrak}</div>
                  <div style={{fontSize:17,fontWeight:800,marginTop:5,color:"#fff"}}>{d.ad}</div>
                  <div style={{color:d.vurgu,fontSize:12,marginTop:2}}>{d.yerel}</div>
                </div>
                <div style={{padding:14}}>
                  <div style={{color:K.tx4,fontSize:11,marginBottom:10}}>{d.acik}</div>
                  <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:12}}>
                    {d.moduller.map(m=><span key={m} style={{background:K.bg3,border:`1px solid ${d.vurgu}22`,borderRadius:4,padding:"2px 6px",fontSize:10,color:K.tx4}}>{m}</span>)}
                  </div>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}>
                    {HOCALAR[d.id].filter(h=>!h.c).map(h=><Av key={h.id} h={h} dil={d} sz={26}/>)}
                    <div style={{background:K.bg3,borderRadius:5,padding:"2px 7px",fontSize:9,color:K.tL,fontWeight:600}}>+2 Çocuk</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOCA SEÇ */}
      {sayfa==="diller"&&dilSec&&(
        <div style={{padding:"26px 22px"}}>
          <button onClick={()=>setDS(null)} style={{background:"none",border:"none",color:K.tx4,cursor:"pointer",fontSize:12,marginBottom:16}}>← Geri</button>
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{fontSize:32,marginBottom:6}}>{dilSec.bayrak}</div>
            <h2 style={{fontSize:22,fontWeight:800,marginBottom:5,color:K.tx}}>{dilSec.ad} — Hocanı Seç</h2>
            <p style={{color:K.tx4,fontSize:12}}>2 erkek + 2 kadın yetişkin • 1 erkek + 1 kadın çocuk</p>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:22}}>
            {[false,true].map(k=>(
              <button key={String(k)} onClick={()=>setCM(k)}
                style={{padding:"9px 22px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:12,
                  border:`1px solid ${cocukMod===k?dilSec.vurgu:K.bdr}`,
                  background:cocukMod===k?`rgba(46,125,50,0.12)`:"transparent",
                  color:cocukMod===k?dilSec.vurgu:K.tx4}}>
                {k?"👶 Çocuklara Özel":"🎓 Yetişkin Hocaları"}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:16,maxWidth:900,margin:"0 auto"}}>
            {HOCALAR[dilSec.id].filter(h=>h.c===cocukMod).map(h=>(
              <div key={h.id}
                style={{background:K.card,borderRadius:16,padding:18,border:`1px solid ${K.bdr}`,textAlign:"center",cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=dilSec.vurgu;e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=K.bdr;e.currentTarget.style.transform="translateY(0)";}}
                onClick={()=>{
                  if(!kullanici&&!adminGiris){setAMod("kayit");setAuth(true);return;}
                  if(!dersGirebilir()){setOP({id:"up",ad:"Premium Üyelik",fiyat:"₺299",donem:"/ay",tutar:299});return;}
                  const k=adminGiris?{id:"admin",ad:"Admin",plan:"Sınırsız",durum:"Aktif",trialStart:0}:kullanici;
                  setDers({dil:dilSec.id,hoca:h,kul:k});
                }}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Av h={h} dil={dilSec} sz={80}/></div>
                {h.c&&<div style={{background:`rgba(249,168,37,0.12)`,color:K.warn,borderRadius:6,padding:"2px 8px",fontSize:10,fontWeight:700,marginBottom:8,display:"inline-block",border:`1px solid ${K.warn}33`}}>👶 Çocuklara Özel</div>}
                <div style={{fontWeight:700,fontSize:14,marginBottom:3,color:K.tx}}>{h.ad}</div>
                <div style={{color:K.tx4,fontSize:11,marginBottom:7}}>{h.yer}</div>
                <div style={{background:K.bg3,borderRadius:7,padding:"3px 9px",fontSize:11,color:K.tx2,marginBottom:10,display:"inline-block"}}>{h.uz}</div>
                <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:14}}>
                  <span style={{color:dilSec.vurgu,fontSize:12,fontWeight:600}}>⭐ {h.p}</span>
                  <span style={{color:K.tx4,fontSize:11}}>{h.n.toLocaleString()}</span>
                </div>
                <button style={{width:"100%",padding:"9px",borderRadius:9,background:`linear-gradient(135deg,${K.g2},${K.t2})`,color:"#fff",border:"none",cursor:"pointer",fontWeight:700,fontSize:12}}>
                  🎤 Derse Başla
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FİYATLAR */}
      {sayfa==="fiyatlar"&&(
        <div style={{padding:"50px 22px",textAlign:"center"}}>
          <h2 style={{fontSize:30,fontWeight:800,marginBottom:8,color:K.tx}}>Fiyatlandırma</h2>
          <p style={{color:K.tx4,marginBottom:38,fontSize:14}}>5 gün ücretsiz dene, havale ile öde</p>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            {[
              {id:"d",ad:"5 Günlük Deneme",fiyat:"Ücretsiz",donem:"",    hl:false,oz:["1 dil","Günde 20 dk","Yazılı AI hoca","Sesli konuşma"]},
              {id:"a",ad:"Aylık Plan",      fiyat:"₺299",    donem:"/ay", hl:false,oz:["Tüm 10 dil","Sınırsız ders","4+2 hoca","Çocuk hocaları"],tutar:299},
              {id:"y",ad:"Yıllık Plan",     fiyat:"₺1990",   donem:"/yıl",hl:true, oz:["Tüm 10 dil","Sınırsız ders","4+2 hoca","Çocuk hocaları","Öncelikli destek","%44 tasarruf"],tutar:1990},
            ].map(p=>(
              <div key={p.id}
                style={{background:p.hl?`linear-gradient(135deg,${K.bg2},${K.bg3})`:K.card,border:p.hl?`2px solid ${K.g3}`:`1px solid ${K.bdr}`,borderRadius:20,padding:26,width:245,position:"relative",transition:"transform 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                {p.hl&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${K.g3},${K.t3})`,color:"#fff",borderRadius:18,padding:"3px 14px",fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>⭐ EN POPÜLER</div>}
                <div style={{fontSize:15,fontWeight:700,marginBottom:7,color:K.tx}}>{p.ad}</div>
                <div style={{marginBottom:18}}><span style={{fontSize:34,fontWeight:900,color:p.hl?K.gL:K.tx}}>{p.fiyat}</span><span style={{color:K.tx4,fontSize:13}}>{p.donem}</span></div>
                {p.oz.map(o=><div key={o} style={{display:"flex",gap:7,marginBottom:7,textAlign:"left"}}><span style={{color:K.gL,fontWeight:700}}>✓</span><span style={{color:K.tx3,fontSize:12}}>{o}</span></div>)}
                <button onClick={()=>{
                  if(p.id==="d"){if(kullanici)git("diller");else{setAMod("kayit");setAuth(true);}}
                  else{if(!kullanici){setAMod("kayit");setAuth(true);}else setOP(p);}
                }} style={{width:"100%",marginTop:18,padding:11,borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer",
                  background:p.hl?`linear-gradient(135deg,${K.g2},${K.t2})`:p.id==="d"?"transparent":K.bg3,
                  color:p.hl?"#fff":K.tx2,border:p.id==="d"?`1px solid ${K.g2}`:p.hl?"none":`1px solid ${K.bdr}`}}>
                  {p.id==="d"?"Ücretsiz Başla":"Havale ile Satın Al"}
                </button>
              </div>
            ))}
          </div>
          {adm.iban&&(
            <div style={{marginTop:34,background:K.card,borderRadius:14,padding:22,maxWidth:440,margin:"34px auto 0",border:`1px solid ${K.bdr}`,textAlign:"left"}}>
              <div style={{color:K.tx,fontWeight:700,marginBottom:10,fontSize:14}}>💳 Havale Bilgileri</div>
              <div style={{color:K.tx4,fontSize:13,lineHeight:2.2}}>Ad Soyad: <strong style={{color:K.tx}}>{adm.acName}</strong><br/>IBAN: <strong style={{color:K.gL,fontFamily:"monospace"}}>{adm.iban}</strong><br/>Banka: <strong style={{color:K.tx}}>{adm.bank}</strong></div>
              <div style={{background:`rgba(46,125,50,0.08)`,borderRadius:8,padding:10,marginTop:10,border:`1px solid ${K.g1}44`}}>
                <div style={{color:K.tx4,fontSize:11,lineHeight:1.7}}>Açıklama kısmına e-posta adresinizi yazın.<br/>Onaydan sonra üyeliğiniz aktifleşir (max 2 saat).</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* İLETİŞİM */}
      {sayfa==="iletisim"&&(
        <div style={{padding:"50px 22px",maxWidth:500,margin:"0 auto"}}>
          <h2 style={{fontSize:26,fontWeight:800,marginBottom:8,color:K.tx}}>İletişim</h2>
          <p style={{color:K.tx4,marginBottom:26,fontSize:14}}>Sorularınız için bize ulaşın</p>
          <div style={{background:K.card,borderRadius:16,padding:24,border:`1px solid ${K.bdr}`}}>
            {adm.contactEmail&&<div style={{marginBottom:20}}><div style={{color:K.tx4,fontSize:12,marginBottom:6}}>E-posta</div><a href={`mailto:${adm.contactEmail}`} style={{color:K.gL,fontSize:17,fontWeight:700,textDecoration:"none"}}>{adm.contactEmail}</a></div>}
            <div style={{borderTop:`1px solid ${K.bdr}`,paddingTop:18}}>
              <div style={{color:K.tx4,fontSize:12,marginBottom:12}}>Mesaj Gönderin</div>
              <input placeholder="Adınız" style={{...gI2,marginBottom:10}}/>
              <input placeholder="E-postanız" type="email" style={{...gI2,marginBottom:10}}/>
              <textarea placeholder="Mesajınız..." rows={4} style={{...gI2,resize:"vertical",marginBottom:14}}/>
              <button onClick={()=>alert("Mesajınız alındı! En kısa sürede dönüş yapacağız.")}
                style={{width:"100%",padding:12,background:`linear-gradient(135deg,${K.g2},${K.t2})`,color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14}}>
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALLER */}

      {authAcik&&(
        <AuthModal ilkMod={authMod} kapat={()=>setAuth(false)}
          basari={u=>{kulGiris(u);setAuth(false);git("diller");}}/>
      )}

      {odemePlan&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9000}}>
          <div style={{background:K.card,borderRadius:20,padding:26,width:400,border:`1px solid ${K.bdr3}`,boxShadow:`0 24px 64px rgba(0,0,0,0.8)`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
              <div><div style={{color:K.tx,fontSize:16,fontWeight:700}}>Ödeme — {odemePlan.ad}</div><div style={{color:K.tx4,fontSize:11,marginTop:2}}>{odemePlan.fiyat}{odemePlan.donem}</div></div>
              <button onClick={()=>setOP(null)} style={{background:"none",border:"none",color:K.tx4,fontSize:18,cursor:"pointer"}}>✕</button>
            </div>
            {adm.iban?(
              <div style={{background:K.bg3,borderRadius:11,padding:15,marginBottom:14,border:`1px solid ${K.bdr}`}}>
                <div style={{color:K.tx,fontWeight:700,marginBottom:9,fontSize:13}}>Havale Bilgileri</div>
                <div style={{color:K.tx4,fontSize:12,lineHeight:2.2}}>Ad Soyad: <strong style={{color:K.tx}}>{adm.acName}</strong><br/>IBAN: <strong style={{color:K.gL,fontFamily:"monospace"}}>{adm.iban}</strong><br/>Tutar: <strong style={{color:K.warn}}>{odemePlan.fiyat}</strong></div>
                <div style={{background:`rgba(46,125,50,0.08)`,borderRadius:7,padding:9,marginTop:9,border:`1px solid ${K.g1}44`}}>
                  <div style={{color:K.tx4,fontSize:11}}>Açıklama: <strong style={{color:K.tx}}>{kullanici?.email}</strong></div>
                </div>
              </div>
            ):<div style={{color:K.tx4,fontSize:13,marginBottom:14,padding:14,background:K.bg3,borderRadius:10}}>IBAN henüz girilmemiş. Bize e-posta gönderin.</div>}
            <button onClick={()=>{
              const a=getA();
              const ny={id:Date.now(),ad:kullanici?.ad||"",email:kullanici?.email||"",tutar:odemePlan.tutar||0,plan:odemePlan.ad,tarih:new Date().toLocaleDateString("tr-TR"),d:"bekle"};
              setA({...a,pays:[...(a.pays||[]),ny]});
              alert("Bildiriminiz alındı! Admin onayladıktan sonra üyeliğiniz aktifleşecektir.");
              setOP(null);
            }} style={{width:"100%",padding:12,background:`linear-gradient(135deg,${K.g2},${K.t2})`,color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13}}>
              ✓ Havaleyi Yaptım, Bildir
            </button>
          </div>
        </div>
      )}

      {adminModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9000}}>
          <div style={{background:K.card,borderRadius:18,padding:26,width:300,border:`1px solid ${K.bdr3}`,boxShadow:`0 24px 64px rgba(0,0,0,0.8)`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
              <div style={{color:K.tx,fontSize:15,fontWeight:700}}>Yönetici Girişi</div>
              <button onClick={()=>{setAMod2(false);setAH("");setAS("");}} style={{background:"none",border:"none",color:K.tx4,fontSize:18,cursor:"pointer"}}>✕</button>
            </div>
            <input type="password" value={adminSifre} placeholder="Yönetici şifresi"
              onChange={e=>{setAS(e.target.value);setAH("");}}
              onKeyDown={e=>e.key==="Enter"&&admGiris()}
              style={{width:"100%",padding:"11px 13px",background:K.bg3,border:`1px solid ${adminHata?K.err:K.bdr}`,borderRadius:9,color:K.tx,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:6}}/>
            {adminHata&&<div style={{color:K.errL,fontSize:11,marginBottom:8}}>{adminHata}</div>}
            <div style={{height:10}}/>
            <div style={{display:"flex",gap:9}}>
              <button onClick={()=>{setAMod2(false);setAH("");setAS("");}} style={{flex:1,padding:10,background:"transparent",color:K.tx4,border:`1px solid ${K.bdr}`,borderRadius:9,cursor:"pointer"}}>İptal</button>
              <button onClick={admGiris} style={{flex:1,padding:10,background:`linear-gradient(135deg,${K.g2},${K.t2})`,color:"#fff",border:"none",borderRadius:9,cursor:"pointer",fontWeight:700}}>Giriş</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
