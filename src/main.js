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

function showResult(elementId, message, isError = false) {
  const resultElement = document.getElementById(elementId);
  resultElement.textContent = message;
  resultElement.classList.remove('show', 'error');

  setTimeout(() => {
    if (isError) {
      resultElement.classList.add('error');
    }
    resultElement.classList.add('show');
  }, 10);
}

document.getElementById('romanToArabicForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('romanInput').value.trim();

  if (!input) {
    showResult('romanResult', 'Por favor ingresa un número romano', true);
    return;
  }

  const result = romanToArabic(input);

  if (result === null) {
    showResult('romanResult', `"${input}" no es un número romano válido`, true);
  } else {
    showResult('romanResult', `${input.toUpperCase()} = ${result}`);
  }
});

document.getElementById('arabicToRomanForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('arabicInput').value;
  const number = parseInt(input, 10);

  if (!input || isNaN(number)) {
    showResult('arabicResult', 'Por favor ingresa un número', true);
    return;
  }

  const result = arabicToRoman(number);

  if (result === null) {
    showResult('arabicResult', `${number} está fuera del rango válido (1-3999)`, true);
  } else {
    showResult('arabicResult', `${number} = ${result}`);
  }
});

document.querySelectorAll('.example-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const targetId = tag.getAttribute('data-target');
    const targetInput = document.getElementById(targetId);
    targetInput.value = tag.textContent;
    targetInput.focus();

    const event = new Event('input', { bubbles: true });
    targetInput.dispatchEvent(event);
  });
});

document.getElementById('romanInput').addEventListener('input', (e) => {
  e.target.value = e.target.value.toUpperCase();
});

document.getElementById('arabicInput').addEventListener('input', (e) => {
  const value = parseInt(e.target.value, 10);
  if (value > 3999) {
    e.target.value = 3999;
  } else if (value < 1 && e.target.value !== '') {
    e.target.value = 1;
  }
});
