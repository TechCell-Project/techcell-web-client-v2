import { type ClassValue, clsx } from 'clsx';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { EntityError } from './http';
import { toast } from '@/components/ui/use-toast';
import { CASE_AUTH, ERROR_MSG } from '@/constants/error';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    console.log('error: ', error.payload);
    if (error.payload.errors[0] !== undefined) {
      error.payload.errors.forEach((item) => {
        setError(item.field, {
          type: 'server',
          message: item.message,
        });
      });
    } else {
      const errEntries = Object.entries(error.payload.errors);
      for (const [key, value] of errEntries) {
        setError(key, {
          type: 'server',
          message: `${key} ${combineArraysToString(Object.entries(value))}`,
        });
      }
    }
  } else {
    toast({
      title: 'Lỗi',
      description: error?.payload?.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000,
    });
  }
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
