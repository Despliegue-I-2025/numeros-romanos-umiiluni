const request = require('supertest');
const { app, romanToArabic, arabicToRoman } = require('../romanos');

describe('romanToArabic', () => {
  describe('casos basicos', () => {
    test('convierte I a 1', () => {
      expect(romanToArabic('I')).toBe(1);
    });

    test('convierte V a 5', () => {
      expect(romanToArabic('V')).toBe(5);
    });

    test('convierte X a 10', () => {
      expect(romanToArabic('X')).toBe(10);
    });

    test('convierte L a 50', () => {
      expect(romanToArabic('L')).toBe(50);
    });

    test('convierte C a 100', () => {
      expect(romanToArabic('C')).toBe(100);
    });

    test('convierte D a 500', () => {
      expect(romanToArabic('D')).toBe(500);
    });

    test('convierte M a 1000', () => {
      expect(romanToArabic('M')).toBe(1000);
    });
  });

  describe('casos de suma', () => {
    test('convierte II a 2', () => {
      expect(romanToArabic('II')).toBe(2);
    });

    test('convierte III a 3', () => {
      expect(romanToArabic('III')).toBe(3);
    });

    test('convierte VI a 6', () => {
      expect(romanToArabic('VI')).toBe(6);
    });

    test('convierte VII a 7', () => {
      expect(romanToArabic('VII')).toBe(7);
    });

    test('convierte VIII a 8', () => {
      expect(romanToArabic('VIII')).toBe(8);
    });

    test('convierte XII a 12', () => {
      expect(romanToArabic('XII')).toBe(12);
    });

    test('convierte XV a 15', () => {
      expect(romanToArabic('XV')).toBe(15);
    });

    test('convierte XX a 20', () => {
      expect(romanToArabic('XX')).toBe(20);
    });

    test('convierte XXX a 30', () => {
      expect(romanToArabic('XXX')).toBe(30);
    });
  });

  describe('casos de resta', () => {
    test('convierte IV a 4', () => {
      expect(romanToArabic('IV')).toBe(4);
    });

    test('convierte IX a 9', () => {
      expect(romanToArabic('IX')).toBe(9);
    });

    test('convierte XL a 40', () => {
      expect(romanToArabic('XL')).toBe(40);
    });

    test('convierte XC a 90', () => {
      expect(romanToArabic('XC')).toBe(90);
    });

    test('convierte CD a 400', () => {
      expect(romanToArabic('CD')).toBe(400);
    });

    test('convierte CM a 900', () => {
      expect(romanToArabic('CM')).toBe(900);
    });
  });

  describe('casos complejos', () => {
    test('convierte MCMXCIV a 1994', () => {
      expect(romanToArabic('MCMXCIV')).toBe(1994);
    });

    test('convierte MMXXIII a 2023', () => {
      expect(romanToArabic('MMXXIII')).toBe(2023);
    });

    test('convierte MMMCMXCIX a 3999', () => {
      expect(romanToArabic('MMMCMXCIX')).toBe(3999);
    });

    test('convierte CDXLIV a 444', () => {
      expect(romanToArabic('CDXLIV')).toBe(444);
    });

    test('convierte DCCCXC a 890', () => {
      expect(romanToArabic('DCCCXC')).toBe(890);
    });

    test('convierte MMCDXXI a 2421', () => {
      expect(romanToArabic('MMCDXXI')).toBe(2421);
    });
  });

  describe('minusculas y mayusculas', () => {
    test('acepta minusculas', () => {
      expect(romanToArabic('xiv')).toBe(14);
    });

    test('acepta mixtas', () => {
      expect(romanToArabic('XiV')).toBe(14);
    });
  });

  describe('casos invalidos', () => {
    test('retorna null para string vacio', () => {
      expect(romanToArabic('')).toBe(null);
    });

    test('retorna null para null', () => {
      expect(romanToArabic(null)).toBe(null);
    });

    test('retorna null para undefined', () => {
      expect(romanToArabic(undefined)).toBe(null);
    });

    test('retorna null para numero', () => {
      expect(romanToArabic(123)).toBe(null);
    });

    test('retorna null para caracteres invalidos', () => {
      expect(romanToArabic('ABC')).toBe(null);
    });

    test('retorna null para formato invalido IIII', () => {
      expect(romanToArabic('IIII')).toBe(null);
    });

    test('retorna null para formato invalido VV', () => {
      expect(romanToArabic('VV')).toBe(null);
    });

    test('retorna null para formato invalido IC', () => {
      expect(romanToArabic('IC')).toBe(null);
    });
  });
});

describe('arabicToRoman', () => {
  describe('casos basicos', () => {
    test('convierte 1 a I', () => {
      expect(arabicToRoman(1)).toBe('I');
    });

    test('convierte 5 a V', () => {
      expect(arabicToRoman(5)).toBe('V');
    });

    test('convierte 10 a X', () => {
      expect(arabicToRoman(10)).toBe('X');
    });

    test('convierte 50 a L', () => {
      expect(arabicToRoman(50)).toBe('L');
    });

    test('convierte 100 a C', () => {
      expect(arabicToRoman(100)).toBe('C');
    });

    test('convierte 500 a D', () => {
      expect(arabicToRoman(500)).toBe('D');
    });

    test('convierte 1000 a M', () => {
      expect(arabicToRoman(1000)).toBe('M');
    });
  });

  describe('casos de suma', () => {
    test('convierte 2 a II', () => {
      expect(arabicToRoman(2)).toBe('II');
    });

    test('convierte 3 a III', () => {
      expect(arabicToRoman(3)).toBe('III');
    });

    test('convierte 6 a VI', () => {
      expect(arabicToRoman(6)).toBe('VI');
    });

    test('convierte 7 a VII', () => {
      expect(arabicToRoman(7)).toBe('VII');
    });

    test('convierte 8 a VIII', () => {
      expect(arabicToRoman(8)).toBe('VIII');
    });

    test('convierte 12 a XII', () => {
      expect(arabicToRoman(12)).toBe('XII');
    });

    test('convierte 15 a XV', () => {
      expect(arabicToRoman(15)).toBe('XV');
    });

    test('convierte 20 a XX', () => {
      expect(arabicToRoman(20)).toBe('XX');
    });

    test('convierte 30 a XXX', () => {
      expect(arabicToRoman(30)).toBe('XXX');
    });
  });

  describe('casos de resta', () => {
    test('convierte 4 a IV', () => {
      expect(arabicToRoman(4)).toBe('IV');
    });

    test('convierte 9 a IX', () => {
      expect(arabicToRoman(9)).toBe('IX');
    });

    test('convierte 40 a XL', () => {
      expect(arabicToRoman(40)).toBe('XL');
    });

    test('convierte 90 a XC', () => {
      expect(arabicToRoman(90)).toBe('XC');
    });

    test('convierte 400 a CD', () => {
      expect(arabicToRoman(400)).toBe('CD');
    });

    test('convierte 900 a CM', () => {
      expect(arabicToRoman(900)).toBe('CM');
    });
  });

  describe('casos complejos', () => {
    test('convierte 1994 a MCMXCIV', () => {
      expect(arabicToRoman(1994)).toBe('MCMXCIV');
    });

    test('convierte 2023 a MMXXIII', () => {
      expect(arabicToRoman(2023)).toBe('MMXXIII');
    });

    test('convierte 3999 a MMMCMXCIX', () => {
      expect(arabicToRoman(3999)).toBe('MMMCMXCIX');
    });

    test('convierte 444 a CDXLIV', () => {
      expect(arabicToRoman(444)).toBe('CDXLIV');
    });

    test('convierte 890 a DCCCXC', () => {
      expect(arabicToRoman(890)).toBe('DCCCXC');
    });

    test('convierte 2421 a MMCDXXI', () => {
      expect(arabicToRoman(2421)).toBe('MMCDXXI');
    });
  });

  describe('casos invalidos', () => {
    test('retorna null para 0', () => {
      expect(arabicToRoman(0)).toBe(null);
    });

    test('retorna null para numeros negativos', () => {
      expect(arabicToRoman(-5)).toBe(null);
    });

    test('retorna null para numeros mayores a 3999', () => {
      expect(arabicToRoman(4000)).toBe(null);
    });

    test('retorna null para string', () => {
      expect(arabicToRoman('123')).toBe(null);
    });

    test('retorna null para null', () => {
      expect(arabicToRoman(null)).toBe(null);
    });

    test('retorna null para undefined', () => {
      expect(arabicToRoman(undefined)).toBe(null);
    });

    test('retorna null para decimales', () => {
      expect(arabicToRoman(3.14)).toBe(null);
    });

    test('retorna null para NaN', () => {
      expect(arabicToRoman(NaN)).toBe(null);
    });
  });
});

describe('API Endpoints', () => {
  describe('GET /r2a', () => {
    test('convierte romano a arabico correctamente', async () => {
      const response = await request(app)
        .get('/r2a')
        .query({ roman: 'XIV' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ arabic: 14 });
    });

    test('convierte numero complejo', async () => {
      const response = await request(app)
        .get('/r2a')
        .query({ roman: 'MCMXCIV' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ arabic: 1994 });
    });

    test('acepta minusculas', async () => {
      const response = await request(app)
        .get('/r2a')
        .query({ roman: 'xiv' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ arabic: 14 });
    });

    test('retorna error sin parametro roman', async () => {
      const response = await request(app).get('/r2a');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Parametro roman requerido.' });
    });

    test('retorna error para romano invalido', async () => {
      const response = await request(app)
        .get('/r2a')
        .query({ roman: 'IIII' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Numero romano invalido.' });
    });

    test('retorna error para caracteres invalidos', async () => {
      const response = await request(app)
        .get('/r2a')
        .query({ roman: 'XYZ' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Numero romano invalido.' });
    });
  });

  describe('GET /a2r', () => {
    test('convierte arabico a romano correctamente', async () => {
      const response = await request(app)
        .get('/a2r')
        .query({ arabic: 14 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ roman: 'XIV' });
    });

    test('convierte numero complejo', async () => {
      const response = await request(app)
        .get('/a2r')
        .query({ arabic: 1994 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ roman: 'MCMXCIV' });
    });

    test('convierte numero maximo 3999', async () => {
      const response = await request(app)
        .get('/a2r')
        .query({ arabic: 3999 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ roman: 'MMMCMXCIX' });
    });

    test('retorna error sin parametro arabic', async () => {
      const response = await request(app).get('/a2r');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Parametro arabic requerido.' });
    });

    test('retorna error para numero invalido', async () => {
      const response = await request(app)
        .get('/a2r')
        .query({ arabic: 0 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Numero arabico invalido.' });
    });

    test('retorna error para numero negativo', async () => {
      const response = await request(app)
        .get('/a2r')
        .query({ arabic: -5 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Numero arabico invalido.' });
    });

    test('retorna error para numero mayor a 3999', async () => {
      const response = await request(app)
        .get('/a2r')
        .query({ arabic: 4000 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Numero arabico invalido.' });
    });

    test('retorna error para string no numerico', async () => {
      const response = await request(app)
        .get('/a2r')
        .query({ arabic: 'abc' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Parametro arabic requerido.' });
    });
  });
});

describe('Mocks', () => {
  test('mock de romanToArabic', () => {
    const mockRomanToArabic = jest.fn().mockReturnValue(42);
    expect(mockRomanToArabic('XLII')).toBe(42);
    expect(mockRomanToArabic).toHaveBeenCalledWith('XLII');
  });

  test('mock de arabicToRoman', () => {
    const mockArabicToRoman = jest.fn().mockReturnValue('XLII');
    expect(mockArabicToRoman(42)).toBe('XLII');
    expect(mockArabicToRoman).toHaveBeenCalledWith(42);
  });

  test('mock con multiples llamadas', () => {
    const mockConvert = jest.fn()
      .mockReturnValueOnce('I')
      .mockReturnValueOnce('V')
      .mockReturnValueOnce('X');

    expect(mockConvert()).toBe('I');
    expect(mockConvert()).toBe('V');
    expect(mockConvert()).toBe('X');
    expect(mockConvert).toHaveBeenCalledTimes(3);
  });
});
