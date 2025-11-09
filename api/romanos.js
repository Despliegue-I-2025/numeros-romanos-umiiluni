import { romanToArabic, arabicToRoman } from '../romanos.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).setHeader('Access-Control-Allow-Origin', '*').end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  const path = req.url.split('?')[0];

  if (path === '/api/r2a' || path === '/r2a') {
    const roman = req.query.roman;
    if (!roman) {
      return res.status(400).json({ error: 'Parametro roman requerido.' });
    }

    const arabic = romanToArabic(roman);
    if (arabic === null) {
      return res.status(400).json({ error: 'Numero romano invalido.' });
    }

    return res.status(200).json({ arabic });
  }

  if (path === '/api/a2r' || path === '/a2r') {
    const arabicNumber = parseInt(req.query.arabic, 10);
    if (isNaN(arabicNumber)) {
      return res.status(400).json({ error: 'Parametro arabic requerido.' });
    }

    const roman = arabicToRoman(arabicNumber);
    if (roman === null) {
      return res.status(400).json({ error: 'Numero arabico invalido.' });
    }

    return res.status(200).json({ roman });
  }

  return res.status(404).json({ error: 'Endpoint no encontrado.' });
}
