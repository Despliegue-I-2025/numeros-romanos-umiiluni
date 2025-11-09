# 🧮 Proyecto Final — Uma Rovetta  
### Materia: Diseños y Arquitecturas de Despliegues I  
### Primer Año — Full Stack Developer  

## Características

- Conversión bidireccional entre números romanos y arábigos
- Interfaz web interactiva y responsive
- API REST para integraciones
- Validación completa de entrada
- Soporte para números del 1 al 3999
- Tests automatizados con alta cobertura
- Diseño moderno con animaciones suaves

## Demostración

La aplicación incluye:
- **Interfaz Web**: Conversión visual con ejemplos interactivos
- **API REST**: Endpoints para integración con otros sistemas

## Instalación

```bash
npm install
```

## Uso

### Interfaz Web

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173`

### API REST

Inicia el servidor backend:

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`


## Cómo Funciona

### Conversión Romano a Arábigo

El algoritmo recorre el número romano de izquierda a derecha:

1. **Validación**: Verifica que el formato sea válido usando expresiones regulares
2. **Mapeo**: Cada letra romana tiene un valor asociado (I=1, V=5, X=10, L=50, C=100, D=500, M=1000)
3. **Regla de resta**: Si un valor menor precede a uno mayor, se resta (ej: IV = 4)
4. **Regla de suma**: En otros casos, se suman los valores (ej: VI = 6)

Ejemplo: `MCMXCIV`
- M = 1000
- CM = 900 (C antes de M, entonces 1000 - 100)
- XC = 90 (X antes de C, entonces 100 - 10)
- IV = 4 (I antes de V, entonces 5 - 1)
- Total: 1000 + 900 + 90 + 4 = 1994

### Conversión Arábigo a Romano

El algoritmo usa un enfoque greedy (codicioso):

1. **Validación**: Verifica que el número esté entre 1 y 3999
2. **Tabla de valores**: Usa pares de valores ordenados de mayor a menor
3. **Sustracción iterativa**: Resta el valor más grande posible repetidamente
4. **Construcción**: Concatena los símbolos romanos correspondientes

Ejemplo: `1994`
- 1994 >= 1000: Agrega "M", queda 994
- 994 >= 900: Agrega "CM", queda 94
- 94 >= 90: Agrega "XC", queda 4
- 4 >= 4: Agrega "IV", queda 0
- Resultado: "MCMXCIV"

### Reglas de los Números Romanos

- **Símbolos básicos**: I (1), V (5), X (10), L (50), C (100), D (500), M (1000)
- **Repetición**: Solo I, X, C y M pueden repetirse hasta 3 veces consecutivas
- **Sustracción**: Solo se permite en casos específicos:
  - I antes de V o X
  - X antes de L o C
  - C antes de D o M
- **Rango válido**: 1 a 3999

## Tests

Ejecuta los tests con cobertura:

```bash
npm test
```

El proyecto incluye:
- Tests unitarios para ambas funciones de conversión
- Tests de integración para la API
- Uso de mocks para testing avanzado
- Cobertura de código completa
- Tests de casos límite y errores

### Ejemplos de Tests

```javascript
// Test básico
test('convierte XIV a 14', () => {
  expect(romanToArabic('XIV')).toBe(14);
});

// Test con mock
test('mock de romanToArabic', () => {
  const mockRomanToArabic = jest.fn().mockReturnValue(42);
  expect(mockRomanToArabic('XLII')).toBe(42);
});
```

## Build para Producción

Genera la versión optimizada:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`

## Deploy en Vercel

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Para producción:
```bash
vercel --prod
```

## Estructura del Proyecto

```
.
├── romanos.js           # Backend API con Express
├── src/
│   └── main.js         # Lógica del frontend
├── index.html          # Interfaz web
├── test/
│   └── romanos.test.js # Suite de tests
├── vite.config.js      # Configuración de Vite
└── package.json        # Dependencias y scripts
```

## Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: Vite + Vanilla JavaScript
- **Testing**: Jest + Supertest
- **Estilos**: CSS puro con animaciones
- **Deploy**: Vercel

## Ejemplos de Conversión

| Romano | Arábigo | Romano | Arábigo |
|--------|---------|--------|---------|
| I      | 1       | XX     | 20      |
| IV     | 4       | XL     | 40      |
| V      | 5       | L      | 50      |
| IX     | 9       | XC     | 90      |
| X      | 10      | C      | 100     |
| XIV    | 14      | CD     | 400     |
| XV     | 15      | D      | 500     |
| XIX    | 19      | CM     | 900     |
|        |         | M      | 1000    |
|        |         | MCMXCIV| 1994    |
|        |         | MMXXIII| 2023    |
|        |         | MMMCMXCIX| 3999  |

## Licencia

MIT
