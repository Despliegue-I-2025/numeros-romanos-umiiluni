const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Romanos a Arabigos
app.get('/r2a', (req, res) => {
  const romanNumeral = req.query.roman;
  if (!romanNumeral) {
    return res.status(400).json({ error: 'Parametro roman requerido.' });
  }

  const arabicNumber = romanToArabic(romanNumeral);
  if (arabicNumber === null) {
    return res.status(400).json({ error: 'Numero romano invalido.' });
  }

  return res.json({ arabic: arabicNumber });
});

// Arabigos a Romanos
app.get('/a2r', (req, res) => {
  const arabicNumber = parseInt(req.query.arabic, 10);
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parametro arabic requerido.' });
  }

  const romanNumeral = arabicToRoman(arabicNumber);
  if (romanNumeral === null) {
    return res.status(400).json({ error: 'Numero arabico invalido.' });
  }

  return res.json({ roman: romanNumeral });
});

function romanToArabic(roman) {
  if (!roman || typeof roman !== 'string') {
    return null;
  }

  const romanUpper = roman.toUpperCase();
  const romanNumerals = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };

  const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  if (!validRomanRegex.test(romanUpper)) {
    return null;
  }

  let result = 0;
  for (let i = 0; i < romanUpper.length; i++) {
    const current = romanNumerals[romanUpper[i]];
    const next = romanNumerals[romanUpper[i + 1]];

    if (current === undefined) {
      return null;
    }

    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }

  return result;
}

function arabicToRoman(arabic) {
  if (typeof arabic !== 'number' || arabic < 1 || arabic > 3999 || !Number.isInteger(arabic)) {
    return null;
  }

  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  let result = '';
  for (let i = 0; i < values.length; i++) {
    while (arabic >= values[i]) {
      result += numerals[i];
      arabic -= values[i];
    }
  }

  return result;
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor de conversión de números romanos escuchando en el puerto ${PORT}`);
  });
}


module.exports = { app, romanToArabic, arabicToRoman };
