import { type ClassValue, clsx } from 'clsx';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { EntityError, HttpError } from './http';
import { ERROR_MSG } from '@/constants/error';
import { UserAddressResponseDto } from '@techcell/node-sdk';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
}: {
  error: any;
  setError?: UseFormSetError<any>;
}) => {
  if (error instanceof EntityError) {
    if (setError) {
      Object.entries(error.payload.errors).forEach(([field, message]) => {
        setError(field, { type: 'server', message });
      });
    }
    return {
      status: 422,
    };
  }
  if (error instanceof HttpError) {
    return {
      status: error.status,
      payload: error.payload,
    };
  }
  return {
    status: 500,
  };
};

function combineArraysToString(arrays: [string, string][]): string {
  // Sort the arrays based on the first element (index 0)
  arrays.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  // Combine the second element (index 1) of each array into a string
  const combinedString = arrays.map((array) => array[1]).join('');

  return combinedString;
}

/**
 * Remove the leading slash ('/') from the path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

/**
 * Retrieves a specific error message based on the provided status code and error case.
 * This function centralizes error message retrieval, making it easier to manage and update error messages.
 *
 * @param {number} statusCode - The HTTP status code associated with the error.
 * @param {string} errorCase - A specific case of the error to retrieve a more detailed message.
 * @returns {string} The error message corresponding to the given status code and error case. Returns a default error message if the specific case is not found.
 */
export function getErrorMsg(statusCode: number, errorCase: string): string {
  const errorObj = ERROR_MSG.get(statusCode) ?? (ERROR_MSG.get(0) as Record<string, string>);

  return errorObj[errorCase] ?? errorObj.CASE_DEFAULT;
}

export function getSearchParamsQuery(key: string, value: string): URLSearchParams {
  const searchParams: URLSearchParams = new URLSearchParams();
  searchParams.append(key, value);

  return searchParams;
}

export const upperCase = (name: string) => {
  return name[0].toUpperCase() + name.slice(1);
};

export function getDefaultAddress(addresses: UserAddressResponseDto[]) {
  if (!Array.isArray(addresses)) {
    return null;
  }

  let result = addresses.find((a) => a?.isDefault);
  if (!result) {
    result = addresses[0];
  }
  return result;
}

export function buildAddressString(address: UserAddressResponseDto): string {
  const { detail } = address;
  let { wardLevel, districtLevel, provinceLevel } = address;
  wardLevel = Array.isArray(wardLevel) ? wardLevel[0] : wardLevel;
  districtLevel = Array.isArray(districtLevel) ? districtLevel[0] : districtLevel;
  provinceLevel = Array.isArray(provinceLevel) ? provinceLevel[0] : provinceLevel;

  let result = '';
  result += detail + ', ';
  result += wardLevel?.wardName + ', ';
  result += districtLevel?.districtName + ', ';
  result += provinceLevel?.provinceName + '.';

  return result;
}

/**
 * This function take searchParams from url and return valid payload that can be pass to fetching data
 * @param searchParams - The object get from url params query
 * @param validKeys - An array that provide specific keys could get from params for specific case
 * @returns { [key: string] : string } - An object of valid values can be pass to api
 */

export function filterSearchParams(
  searchParams: { [key: string]: string | undefined },
  validKeys: string[],
): { [key: string]: string } {
  const filteredParams: { [key: string]: string } = {};

  // Iterate through all keys in the URLSearchParams
  Object.entries(searchParams).forEach(([key, value]) => {
    // Check if the key is valid
    if (validKeys.includes(key)) {
      if (value) {
        // Add the valid key-value pair to the filteredParams object
        filteredParams[key] = value;
      }
    }
  });

  return filteredParams;
}
