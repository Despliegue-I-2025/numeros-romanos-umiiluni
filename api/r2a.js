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
  
  if (!roman || roman === '') {
    return res.status(400).json({ error: 'Parámetro roman inválido o ausente' });
  }
  
  // Validaciones más estrictas para números romanos
  const validation = validateRomanNumeral(roman.toUpperCase());
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  
  const arabic = convertToArabic(roman.toUpperCase());
  res.status(200).json({ arabic });
}

function validateRomanNumeral(roman) {
  // Validar caracteres permitidos
  if (!/^[IVXLCDM]+$/.test(roman)) {
    return { isValid: false, error: 'Caracteres inválidos en número romano' };
  }
  
  // Reglas de repetición (no más de 3 caracteres iguales seguidos, excepto para M)
  const repetitionRules = {
    'I': 3, 'X': 3, 'C': 3, 'M': 4, // M puede repetirse más, pero por simplicidad
    'V': 1, 'L': 1, 'D': 1  // V, L, D no pueden repetirse
  };
  
  // Verificar repeticiones excesivas
  for (const [numeral, maxRepeat] of Object.entries(repetitionRules)) {
    const regex = new RegExp(`${numeral}{${maxRepeat + 1},}`);
    if (regex.test(roman)) {
      return { isValid: false, error: `Repetición excesiva del numeral ${numeral}` };
    }
  }
  
  // Reglas de sustracción válidas
  const validSubtractions = {
    'I': ['V', 'X'],
    'X': ['L', 'C'], 
    'C': ['D', 'M']
  };
  
  // Verificar sustracciones inválidas
  for (let i = 0; i < roman.length - 1; i++) {
    const current = roman[i];
    const next = roman[i + 1];
    
    // Si el valor actual es menor que el siguiente, es una sustracción
    const currentVal = romanToInt(current);
    const nextVal = romanToInt(next);
    
    if (currentVal < nextVal) {
      // Verificar si la sustracción es válida
      if (!validSubtractions[current] || !validSubtractions[current].includes(next)) {
        return { isValid: false, error: `Sustracción inválida: ${current}${next}` };
      }
      
      // Verificar que no haya múltiples caracteres en sustracción
      if (i > 0 && romanToInt(roman[i - 1]) < nextVal) {
        return { isValid: false, error: 'Sustracción inválida: múltiples caracteres restados' };
      }
    }
  }
  
  return { isValid: true };
}

function romanToInt(char) {
  const values = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };
  return values[char] || 0;
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
    
    if (current < next) {
      result += next - current;
      i++; // Saltar el siguiente carácter
    } else {
      result += current;
    }
  }
  return result;
}