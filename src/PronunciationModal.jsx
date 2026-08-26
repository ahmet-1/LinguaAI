import React from 'react';

export default function PronunciationModal({ isOpen, onClose, result, theme, onPlayWord, langCode, gender }) {
  if (!isOpen) return null;
  const a = theme || {
    card: '#1e293b',
    bg3: '#0f172a',
    bdr3: '#334155',
    bdr: '#334155',
    tx: '#f8fafc',
    tx2: '#e2e8f0',
    tx3: '#cbd5e1',
    tx4: '#94a3b8',
    gL: '#10b981',
    g2: '#059669',
    t2: '#0d9488',
    warn: '#f59e0b',
    errL: '#ef4444'
  };

  const isInfo = !result || result.info;
  const isError = result && result.error;
  const isReady = result && !result.info && !result.error;

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:99999,padding:20}}>
      <div style={{background:a.card,borderRadius:18,padding:24,width:380,maxWidth:"95vw",border:"1px solid "+a.bdr3,color:a.tx,boxShadow:"0 20px 50px rgba(0,0,0,0.5)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:18,fontWeight:700}}>🎯 Telaffuz Değerlendirmesi</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:a.tx4,fontSize:22,cursor:"pointer"}}>✕</button>
        </div>

        {isInfo && (
          <div style={{textAlign:"center",padding:20}}>
            <div style={{fontSize:40,marginBottom:12}}>🎙️</div>
            <div style={{color:a.gL,fontSize:15,fontWeight:600}}>{result?.info || "Lütfen cümleyi veya ayeti tane tane okuyun..."}</div>
            <div style={{color:a.tx4,fontSize:12,marginTop:8}}>Okumanız bittiğinde değerlendirme yapılacaktır.</div>
          </div>
        )}

        {isError && (
          <div style={{textAlign:"center",padding:16}}>
            <div style={{color:a.errL,fontSize:14,marginBottom:12}}>⚠️ {result.error}</div>
            <button onClick={onClose} style={{padding:"8px 16px",background:a.bg3,color:a.tx,border:"1px solid "+a.bdr,borderRadius:8,cursor:"pointer"}}>Kapat</button>
          </div>
        )}

        {isReady && (
          <div>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:38,fontWeight:900,color:((result.pronScore||0)>=80?a.gL:(result.pronScore||0)>=60?a.warn:a.errL)}}>
                {Math.round(result.pronScore || 0)}/100
              </div>
              <div style={{color:a.tx4,fontSize:12,marginTop:2}}>Genel Başarı Skoru</div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              <div style={{background:a.bg3,borderRadius:8,padding:10,textAlign:"center"}}>
                <div style={{color:a.gL,fontWeight:700,fontSize:16}}>%{Math.round(result.accuracyScore || 0)}</div>
                <div style={{color:a.tx4,fontSize:11}}>Doğruluk</div>
              </div>
              <div style={{background:a.bg3,borderRadius:8,padding:10,textAlign:"center"}}>
                <div style={{color:a.gL,fontWeight:700,fontSize:16}}>%{Math.round(result.fluencyScore || 0)}</div>
                <div style={{color:a.tx4,fontSize:11}}>Akıcılık</div>
              </div>
            </div>

            {Array.isArray(result.words) && result.words.length > 0 && (
              <div style={{marginBottom:14,maxHeight:160,overflowY:"auto"}}>
                <div style={{color:a.tx3,fontSize:12,fontWeight:700,marginBottom:6}}>Kelime Analizi:</div>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  {result.words.map((w, idx) => (
                    <div key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:a.bg3,padding:"6px 10px",borderRadius:6}}>
                      <span style={{fontSize:14,color:(w.accuracyScore>=80?a.gL:a.errL),fontWeight:600}}>{w.word}</span>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:10,color:a.tx4}}>{w.durumMesaj || (w.accuracyScore>=80?"✅ Doğru":"❌ Hatalı")}</span>
                        <button onClick={()=>onPlayWord && onPlayWord(w.word, langCode, gender)} style={{background:"none",border:"none",cursor:"pointer",fontSize:14}}>🔊</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={onClose}
              style={{width:"100%",padding:12,background:"linear-gradient(135deg,"+a.g2+","+a.t2+")",color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14,marginTop:8}}>
              ✅ Kapat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
