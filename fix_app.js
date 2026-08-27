const fs = require('fs');
const path = 'src/App.jsx';

let code = fs.readFileSync(path, 'utf8');

// 1. Sayfa yenilendiğinde derste kalmaya devam etsin (Ders oturumunu geri yüklüyoruz)
code = code.replace(
  /const \[b,\s*C\]\s*=\s*L\.useState\(\(\)\s*=>\s*\{[\s\S]*?return null[\s\S]*?\}\);/g,
  'const [b, C] = L.useState(() => { try { const u = sessionStorage.getItem("ders"); return u ? JSON.parse(u) : null; } catch { return null; } });'
);

// 2. Mesaj alanının en altına görünmez odak noktası (auto-scroll) ekle
if (!code.includes('messagesEndRef')) {
  code = code.replace('const [s, d] =', 'const messagesEndRef = React.useRef(null);\n  React.useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [s]);\n  const [s, d] =');
}

fs.writeFileSync(path, code, 'utf8');
console.log("DERS OTURUMU VE OTOMATIK KAYDIRMA DUZELTILDI.");
