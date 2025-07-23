export const snakeToCamel = (snakeStr: string) => {
  return snakeStr.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
};

export const transformKeysToCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeysToCamelCase(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((accumulator, key) => {
      const camelCaseKey = snakeToCamel(key);
      (accumulator as any)[camelCaseKey] = transformKeysToCamelCase(
        (obj as any)[key],
      );
      return accumulator;
    }, {} as T);
  }
  return obj;
};

export const camelToSnake = (camelStr: string): string =>
  camelStr.replace(/([A-Z])/g, '_$1').toLowerCase();

export const transformKeysToSnakeCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeysToSnakeCase(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((accumulator, key) => {
      const snakeCaseKey = camelToSnake(key);
      (accumulator as any)[snakeCaseKey] = transformKeysToSnakeCase(
        (obj as any)[key],
      );
      return accumulator;
    }, {} as T);
  }
  return obj;
};
