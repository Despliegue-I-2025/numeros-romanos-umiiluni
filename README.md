<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Convertidor de Números Romanos — Proyecto Final Uma Rovetta</title>
  <style>
    :root{
      --bg:#0f1724; --card:#0b1220; --accent:#ff6bcb; --muted:#9aa4b2; --glass: rgba(255,255,255,0.04);
      --radius:16px; --glass-2: rgba(255,255,255,0.02);
    }
    *{box-sizing:border-box}
    body{font-family:Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; margin:0; background: radial-gradient(1200px 600px at 10% 10%, rgba(255,107,203,0.06), transparent), linear-gradient(180deg,#071128 0%, #071223 50%, #081126 100%); color:#e6eef8; -webkit-font-smoothing:antialiased}
    header{display:flex;align-items:center;gap:16px;padding:28px 36px}
    .logo{width:68px;height:68px;border-radius:14px;background:linear-gradient(135deg,var(--accent),#6b9bff);display:flex;align-items:center;justify-content:center;font-weight:700;color:#08202a;box-shadow:0 8px 30px rgba(0,0,0,0.6)}
    h1{font-size:20px;margin:0}
    h2{margin:0 0 8px 0}
    .subtitle{color:var(--muted);font-size:13px}
    .container{display:grid;grid-template-columns:1fr 420px;gap:28px;padding:24px 36px}
    .card{background:linear-gradient(180deg,var(--glass),var(--glass-2));border-radius:var(--radius);padding:20px;box-shadow:0 6px 30px rgba(6,10,20,0.6);border:1px solid rgba(255,255,255,0.03)}
    .hero{display:flex;flex-direction:column;gap:12px}
    .features{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:14px}
    .feature{background:rgba(255,255,255,0.03);padding:12px;border-radius:12px}
    .muted{color:var(--muted);font-size:13px}
    .small{font-size:13px}
    .badge{display:inline-block;background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:999px;font-weight:600}
    .intro{text-align:center;padding:20px;background:rgba(255,255,255,0.03);margin:20px 36px;border-radius:var(--radius);font-size:15px;color:var(--muted)}
    footer{padding:24px 36px;color:var(--muted);font-size:13px}
    pre{background:rgba(0,0,0,0.25);padding:12px;border-radius:8px;overflow:auto}
    @media (max-width:980px){.container{grid-template-columns:1fr}.logo{width:56px;height:56px}}
  </style>
</head>
<body>
  <div class="intro">
    <strong>Proyecto Final — Uma Rovetta</strong><br>
    Primer año • Carrera: <strong>Full Stack</strong> • Materia: <strong>Diseños y Arquitecturas de Despliegues I</strong>
  </div>

  <header>
    <div class="logo">UM</div>
    <div>
      <h1>Convertidor de Números Romanos</h1>
      <div class="subtitle">Aplicación web y API REST — conversión romano ↔ arábigo</div>
    </div>
  </header>

  <main class="container">
    <section class="card hero">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <h2>Descripción</h2>
          <div class="muted">Aplicación completa con interfaz web, API REST y tests — conversión bidireccional entre números romanos y arábigos (1–3999).</div>
        </div>
        <div class="badge">Versión: 1.0 • MIT</div>
      </div>

      <div class="features">
        <div class="feature"><strong>Bidireccional</strong><div class="small muted">Romano ↔ Arábigo</div></div>
        <div class="feature"><strong>API REST</strong><div class="small muted">Endpoints para integración</div></div>
        <div class="feature"><strong>Validación</strong><div class="small muted">Formato y rango 1–3999</div></div>
        <div class="feature"><strong>Tests</strong><div class="small muted">Jest + Supertest</div></div>
      </div>

      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.03);margin:12px 0">

      <h2>Demostración interactiva</h2>
      <div class="muted">Prueba la conversión directamente en esta página.</div>

      <div class="card converter" style="background:transparent;padding:12px"> 
        <div class="io">
          <input id="inputText" class="input" placeholder="Escribe un número romano (ej: MCMXCIV) o un número arábigo (ej: 1994)" />
          <input id="outputText" class="output" readonly placeholder="Resultado" />
        </div>
        <div class="controls">
          <button id="convertBtn">Convertir</button>
          <button id="clearBtn" class="ghost">Limpiar</button>
          <button id="swapBtn" class="ghost">Invertir</button>
        </div>
        <div class="muted small">Soporta números entre 1 y 3999. La validación previene entradas inválidas.</div>
      </div>

      <h2>Cómo funciona — Resumen</h2>
      <div class="muted small">Romano → Arábigo: lectura izquierda→derecha con regla de resta. Arábigo → Romano: enfoque greedy con pares ordenados.</div>

      <h2>Reglas</h2>
      <div class="muted small">Solo I,X,C,M repiten hasta 3 veces; sustracciones limitadas (I antes de V/X, X antes de L/C, C antes de D/M).</div>

      <h2>Tabla de ejemplos</h2>
      <table>
        <thead><tr><th>Romano</th><th>Arábigo</th><th>Romano</th><th>Arábigo</th></tr></thead>
        <tbody>
          <tr><td>I</td><td>1</td><td>XX</td><td>20</td></tr>
          <tr><td>IV</td><td>4</td><td>XL</td><td>40</td></tr>
          <tr><td>V</td><td>5</td><td>L</td><td>50</td></tr>
          <tr><td>IX</td><td>9</td><td>XC</td><td>90</td></tr>
          <tr><td>X</td><td>10</td><td>C</td><td>100</td></tr>
          <tr><td>XIV</td><td>14</td><td>CD</td><td>400</td></tr>
          <tr><td>XIX</td><td>19</td><td>D</td><td>500</td></tr>
          <tr><td>CM</td><td>900</td><td>MCMXCIV</td><td>1994</td></tr>
          <tr><td>MMXXIII</td><td>2023</td><td>MMMCMXCIX</td><td>3999</td></tr>
        </tbody>
      </table>

    </section>

    <aside class="card">
      <h2>Instalación & Uso</h2>
      <div class="muted small">
        <strong>Instalación:</strong>
        <pre>npm install</pre>
        <strong>Desarrollo (frontend):</strong>
        <pre>npm run dev  # abre http://localhost:5173</pre>
        <strong>Servidor (API):</strong>
        <pre>npm start    # http://localhost:3000</pre>
      </div>

      <h2>API REST</h2>
      <div class="muted small">
        <pre>GET /api/roman-to-arabic?value=XIV
GET /api/arabic-to-roman?value=1994</pre>
      </div>

      <h2>Tests</h2>
      <div class="muted small">
        Ejecuta:
        <pre>npm test</pre>
        Incluye tests unitarios e integración (Jest + Supertest). 
      </div>

      <h2>Estructura del proyecto</h2>
      <div class="muted small">
        <pre>
.
├── romanos.js
├── src/
│   └── main.js
├── index.html
├── test/
│   └── romanos.test.js
└── package.json
        </pre>
      </div>

      <h2>Tecnologías</h2>
      <div class="muted small">Node.js, Express, Vite, Vanilla JS, Jest, Supertest, CSS puro.</div>

      <h2>Deploy</h2>
      <div class="muted small">Se puede desplegar en Vercel. Comandos:
        <pre>npm i -g vercel
vercel
vercel --prod</pre>
      </div>

      <h2>Licencia</h2>
      <div class="muted small">MIT</div>
    </aside>
  </main>

  <footer>
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
      <div>© Uma Rovetta — Proyecto Final • Diseños y Arquitecturas de Despliegues I</div>
      <div class="muted">Contacto: umiluni4@gmail.com • GitHub: umiiluni</div>
    </div>
  </footer>

  <script>
    const romanMap = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
    function isRoman(s){return /^[MDCLXVI]+$/i.test(s)}
    function romanToArabic(r){ if(!r) return NaN; r = r.toUpperCase(); if(!isRoman(r)) return NaN; let total=0; for(let i=0;i<r.length;i++){ const cur=romanMap[r[i]]; const next=romanMap[r[i+1]]||0; if(cur<next) total -= cur; else total += cur;} return total; }
    const pairs = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    function arabicToRoman(n){ if(!Number.isInteger(n)) return null; if(n<1||n>3999) return null; let s=''; for(const [val,sym] of pairs){ while(n>=val){ s+=sym; n-=val; } } return s; }

    const input = document.getElementById('inputText');
    const output = document.getElementById('outputText');
    document.getElementById('convertBtn').addEventListener('click', ()=>{
      const v = input.value.trim();
      if(!v){ output.value = ''; return; }
      if(/^[0-9]+$/.test(v)){
        const n = parseInt(v,10);
        const r = arabicToRoman(n);
        output.value = r || 'Número fuera de rango (1-3999)';
      } else if(isRoman(v)){
        const n = romanToArabic(v);
        output.value = Number.isNaN(n) ? 'Entrada inválida' : n;
      } else {
        output.value = 'Entrada inválida';
      }
    });
    document.getElementById('clearBtn').addEventListener('click', ()=>{ input.value=''; output.value=''; input.focus(); });
    document.getElementById('swapBtn').addEventListener('click', ()=>{ const a=output.value; output.value=''; input.value=a; });
    window.addEventListener('load', ()=>{ input.value='MCMXCIV'; document.getElementById('convertBtn').click(); });
  </script>
</body>
</html>