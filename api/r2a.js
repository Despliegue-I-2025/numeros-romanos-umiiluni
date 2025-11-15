export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  
  const { roman } = req.query;
  
  // Validar parámetro
  if (!roman || typeof roman !== 'string') {
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
  
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];
    
    if (current === undefined) return -1; // Carácter inválido
    
    if (next && current < next) {
      result += next - current;
      i++; // Saltar el siguiente carácter ya que se procesó
    } else {
      result += current;
    }
  }
  return result;
}