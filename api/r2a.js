export default function handler(req, res) {
  // Configurar CORS de manera más completa
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  
  const { roman } = req.query;
  
  // Validar parámetro
  if (!roman || roman === '') {
    return res.status(400).json({ error: 'Parámetro roman inválido o ausente' });
  }
  
  // Convertir a arábigo
  const arabic = convertToArabic(roman.toUpperCase());
  if (arabic === -1) {
    return res.status(400).json({ error: 'Número romano inválido' });
  }
  
  res.status(200).json({ arabic });
}

function convertToArabic(roman) {
  const romanMap = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };
  
  // Validar caracteres romanos
  if (!/^[IVXLCDM]+$/i.test(roman)) {
    return -1;
  }
  
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];
    
    if (current === undefined) return -1;
    
    if (next && current < next) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }
  return result;
}