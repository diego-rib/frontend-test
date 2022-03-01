const KEEP_POSITION = -1;

// Algoritmo feito baseado na documentação da MDN:
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// -----------------------------------------------
// Quando A > B retorna -1 para manter a posição
// e quando B > A retorna 1 para trocá-los
// deixando assim em ordem decrescente
// -----------------------------------------------
// Quando A < B retorna -1 para manter a posição
// e quando B < A retorna 1 para trocá-los
// deixando assim em ordem crescente

function stringSort(planets, column, type) {
  const planetsCopy = [...planets];

  planetsCopy.sort((planetA, planetB) => {
    const nameA = planetA[column].toUpperCase();
    const nameB = planetB[column].toUpperCase();

    if (nameA === nameB) return 0;

    if (type === 'ASC') {
      return nameA < nameB ? KEEP_POSITION : 1;
    }

    return nameA > nameB ? KEEP_POSITION : 1;
  });

  return planetsCopy;
}

function extractNumber(string) {
  const numberExtracted = string.match(/^[0-9]*(.\d+)?/g);
  return Number(numberExtracted);
}

const ascending = (planetsCopy, column) => {
  planetsCopy.sort((planetA, planetB) => {
    if (planetA[column] === 'unknown') return KEEP_POSITION;
    if (planetB[column] === 'unknown') return 1;

    const numberA = extractNumber(planetA[column]);
    const numberB = extractNumber(planetB[column]);

    return numberA - numberB;
  });

  return planetsCopy;
};

const descending = (planetsCopy, column) => {
  planetsCopy.sort((planetA, planetB) => {
    if (planetA[column] === 'unknown') return 1;
    if (planetB[column] === 'unknown') return KEEP_POSITION;
    const numberA = extractNumber(planetA[column]);
    const numberB = extractNumber(planetB[column]);

    return numberB - numberA;
  });

  return planetsCopy;
};

function numberSort(planets, column, type) {
  const planetsCopy = [...planets];
  if (type === 'ASC') {
    return ascending(planetsCopy, column);
  }
  return descending(planetsCopy, column);
}

const fieldsContainingStrings = ['name', 'climate', 'terrain', 'films', 'url'];

export default function orderByField(planets, { column, sort }) {
  if (fieldsContainingStrings.includes(column)) {
    return stringSort(planets, column, sort);
  }
  return numberSort(planets, column, sort);
}
