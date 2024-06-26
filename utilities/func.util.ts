import { VariationProps } from '@/constants/product-detail';
import { AttributeInProductDto } from '@techcell/node-sdk';

/**
 * Generates a URL query string from an object of parameters.
 *
 * @param {Object} params - The object containing parameters to be converted to a query string.
 * @returns {string} The URL query string generated from the parameters object.
 * @template T - The type of the object containing parameters. It extends an object with string keys and any values.
 */
export const getSearchParams = <T extends { [key: string]: any }>(params: T): string => {
  const url = new URLSearchParams();

  Object.entries(params).map(([key, value]) => {
    if (!value) {
      return;
    }
    url.append(key, value as string);
  });

  return url.toString();
};

/**
 * Checks if a value is an instance of a specified type.
 *
 * @param {*} value - The value to be checked.
 * @param {Function} type - The constructor function representing the type to check against.
 * @returns {boolean} True if the value is an instance of the specified type, otherwise false.
 * @template T - The type to be checked against.
 */
export const isType = <T>(value: any, type: new (...args: any[]) => T): value is T => {
  return value instanceof type;
};

/**
 * Gets the changes made to fields between two objects.
 *
 * @param payloadForm The current form data.
 * @param payloadOrigin The original form data.
 * @returns An object containing the changed fields.
 */
export const getFieldChanges = <T extends Record<string, any>>(
  payloadForm: T,
  payloadOrigin: T,
): Partial<T> => {
  const output: Partial<T> = {};

  for (const key in payloadForm) {
    if (payloadForm.hasOwnProperty(key) && payloadForm[key] !== payloadOrigin[key]) {
      output[key] = payloadForm[key];
    }
  }

  return output;
};

/**
 * User Service Func - getShortName
 */
export const getShortName = (fullname: string) => {
  if (!fullname || fullname.trim() === '') {
    return '';
  }
  const words = fullname.split(' ');
  let shortName = '';

  for (const word of words) {
    if (word) {
      shortName += word[0];
    }
  }

  return shortName.toUpperCase();
};

export const capitallize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertToSnakeCase = (input: string): string => {
  const normalized = input.normalize('NFD');
  const withoutAccents = normalized.replace(/[\u0300-\u036f]/g, '');
  return withoutAccents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

//format currency
export const currencyFormat = (price: number | null): string => {
  if (typeof price !== 'number') {
    throw new Error('Invalid input. Please provide a number.');
  }

  // Convert the number to a string
  const numberString: string = price.toString();

  // Format the integer part with dots every three digits
  const formattedIntegerPart: string = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return formattedIntegerPart;
};

export function calculateSaleOffPercentage(base: number, special: number): number {
  const difference = base - special;
  const percentage = (difference / base) * 100;
  return Math.round(percentage);
}

// Function to get unique attribute keys from all variations
export const getUniqueAttributeKeys = (variations: VariationProps[]) =>
  Array.from(
    new Set(variations.flatMap((variation) => variation.attributes.map((attr) => attr.k))),
  );

/**
 * Get a string that stand for the variation attributes
 * @param attributes
 * @returns
 */
export function getVariationString(attributes: AttributeInProductDto[]): string {
  return attributes.map((attr) => `${attr.v}${attr.u ? ` ${attr.u}` : ''}`).join(', ');
}
