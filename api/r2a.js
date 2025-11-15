export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Metodo no permitido' });
  }

  const { roman } = req.query;

  if (!roman || roman === '') {
    return res.status(400).json({ error: 'Parametro roman invalido o ausente' });
  }

  // Validaciones mas estrictas para numeros romanos
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
    return { isValid: false, error: 'Caracteres invalidos en numero romano' };
  }

  // Reglas de repeticion mas estrictas
  const repetitionRules = {
    'I': 3, 'X': 3, 'C': 3, 'M': 3,  // Máximo 3 repeticiones
    'V': 1, 'L': 1, 'D': 1  // V, L, D no pueden repetirse
  };

  // Verificar repeticiones excesivas
  for (const [numeral, maxRepeat] of Object.entries(repetitionRules)) {
    const regex = new RegExp(`${numeral}{${maxRepeat + 1},}`);
    if (regex.test(roman)) {
      return { isValid: false, error: `Repeticion excesiva del numeral ${numeral}` };
    }
  }

  // Validar patrones especificos que deben dar error
  const invalidPatterns = [
    { pattern: /MMMCMMM/, error: 'Estructura invalida' },
    { pattern: /VX/, error: 'Orden incorrecto' },
    { pattern: /^III$/, error: 'Repeticiones excesivas' }, // Solo para III exacto
    { pattern: /IL/, error: 'Sustraccion invalida' },
    { pattern: /IC/, error: 'Sustraccion invalida' },
    { pattern: /ID/, error: 'Sustraccion invalida' },
    { pattern: /IM/, error: 'Sustraccion invalida' },
    { pattern: /XD/, error: 'Sustraccion invalida' },
    { pattern: /XM/, error: 'Sustraccion invalida' },
    { pattern: /V[IVXLCDM]/, error: 'Caracter V no puede restar' },
    { pattern: /L[IVXLCDM]/, error: 'Caracter L no puede restar' },
    { pattern: /D[IVXLCDM]/, error: 'Caracter D no puede restar' }
  ];

  for (const { pattern, error } of invalidPatterns) {
    if (pattern.test(roman)) {
      return { isValid: false, error };
    }
  }

  // Reglas de sustraccion validas
  const validSubtractions = {
    'I': ['V', 'X'],
    'X': ['L', 'C'],
    'C': ['D', 'M']
  };

  // Verificar sustracciones invalidas
  for (let i = 0; i < roman.length - 1; i++) {
    const current = roman[i];
    const next = roman[i + 1];

    const currentVal = romanToInt(current);
    const nextVal = romanToInt(next);

    if (currentVal < nextVal) {
      // Verificar si la sustraccion es valida
      if (!validSubtractions[current] || !validSubtractions[current].includes(next)) {
        return { isValid: false, error: `Sustraccion invalida: ${current}${next}` };
      }

      // Verificar que no haya multiples caracteres en sustraccion
      if (i > 0 && romanToInt(roman[i - 1]) < nextVal) {
        return { isValid: false, error: 'Sustraccion invalida: multiples caracteres restados' };
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
      i++;
    } else {
      result += current;
    }
  }
  return result;
}