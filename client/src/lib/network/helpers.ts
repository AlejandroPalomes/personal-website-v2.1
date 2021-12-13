import { Config } from '../Config';
import { PaginationOptions } from '../../hooks/api/usePagination';
import { getCurrentUILanguage } from '../i18n/utils';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { BadRequestError } from './errors/BadRequestError';
import { UnexpectedError } from './errors/UnexpectedError';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '../../hooks/useNotifications';

type ParserFunction = (json) => object;
const noParser: ParserFunction = json => json;
const parse = (parser) => json => parser(json);
const toJSON = response => {
  try {
    if (response.status === 204) {
      return;
    }
    return response.json();
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const doGet = async <T>(url: string, parser?, body?: object): Promise<T> =>
  doRequest<T>(url, 'GET', body, parser);

export const doPost = async <T>(url: string, body: object = {}, parser?): Promise<T> =>
  doRequest<T>(url, 'POST', body, parser);

export const doPatch = async <T>(url: string, body: object = {}, parser?): Promise<T> =>
  doRequest<T>(url, 'PATCH', body, parser);

export const doPut = async <T>(url: string, body: object = {}, parser?): Promise<T> =>
  doRequest<T>(url, 'PUT', body, parser);

export const doDelete = async <T>(url: string, parser?): Promise<T> =>
  doRequest<T>(url, 'DELETE', parser);

export const doPutFileUpload = async <T>(url: string, body: FormData, parser?): Promise<T> =>
  doRequestUpload<T>(url, 'PUT', body, parser);

export const doPostFileUpload = async <T>(url: string, body: FormData, parser?): Promise<T> =>
  doRequestUpload<T>(url, 'POST', body, parser);

const getBodyFromResponse = async (response) => {
  try {
    return await response.json();
  } catch (e) {
    return 'No body';
  }
};

export const handleErrors = async (response) => {
  if (!response.ok) {
    const body = await getBodyFromResponse(response);
    if (response.status >= 500) {
      throw UnexpectedError.from('Server error', body);
    }

    if (response.status === 401) {
      throw new UnauthorizedError();
    }

    if (response.status >= 400) {
      throw new BadRequestError(body.error, body.errorCode);
    }

    throw UnexpectedError.from('Unexpected error', body);
  }
  return response;
};

const doRequest = async <T>(endpoint: string,
  method: string,
  body?: object,
  parser = noParser): Promise<T> => {

  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'zazume-lang': getCurrentUILanguage()
  };

  const request: RequestInit = {
    method,
    credentials: 'include',
    headers
  };

  if (body) {
    request.body = JSON.stringify(body);
  }

  const url = Config.API_URL + endpoint;
  return new Promise((resolve, reject) => {
    fetch(url, request)
      .then(handleErrors)
      .then(toJSON)
      .then(parse(parser))
      .then(resolve)
      .catch(err => reject(err));
  });
};

const doRequestUpload = async <T>(endpoint: string,
  method: string,
  body: FormData,
  parser = noParser): Promise<T> => {

  const request: RequestInit = {
    method,
    credentials: 'include'
  };

  if (body) {
    request.body = body;
  }

  const url = Config.API_URL + endpoint;
  return new Promise((resolve, reject) => {
    fetch(url, request)
      .then(handleErrors)
      .then(toJSON)
      .then(parse(parser))
      .then(resolve)
      .catch(err => reject(err));
  });
};

export const mainFetcher = doRequest;

export const toPaginatedURL = (url: string, paginationOptions: PaginationOptions): string => {
  if (!url) {
    return '';
  }

  const params: string[] = [];
  if (paginationOptions.page && !url.includes('page=')) {
    params.push(`page=${paginationOptions.page}`);
  }

  if (!url.includes('size=')) {
    params.push(`size=${paginationOptions.size}`);
  }

  if (paginationOptions.last && !url.includes('last=')) {
    params.push(`last=${paginationOptions.last}`);
  }

  if (url.includes('?')) {
    return `${url}&${params.join('&')}`;
  }

  return `${url}?${params.join('&')}`;
};

export const isAClientError = (error) =>
  error.code === 400;

export const isUnauthorizedError = (error) =>
  error.code === 401;

export enum ErrorCode {
  USER_EMAIL_OR_PASSWORD_DONT_MATCH = 12,
  USER_ALREADY_EXISTS = 13,
  USER_UNAUTHORIZED = 14,
  USER_NOT_FOUND = 15,
  USER_WRONG_ROLE = 16,
  USER_TOKEN_EXPIRED = 17,

  PURCHASE_IS_PENDING = 21,
  PURCHASE_IS_ALREADY_CANCELLED = 22,
  PURCHASE_CANCEL_REQUEST_ALREADY_SENT = 23,
  PURCHASE_ALREADY_COMPLETED = 24,

  CANCELLATION_POLICY_ALREADY_REGISTERED = 30,
  CANCELLATION_POLICY_NOT_FOUND = 31,

  TASKS_NO_FOUND_WITH_RELATIONSHIP = 41,

  INVALID_FIELD = 50,
  INVALID_ID = 51,
  INVALID_DATE = 52,
  INVALID_PASSWORD = 53,

  ORGANIZATION_COUNTRY_NOT_SUPPORTED = 61,
  ORGANIZATION_ALREADY_EXISTS = 61,

  UNIT_ALREADY_EXISTS = 71,

  GLOBAL_NOT_FOUND = 91
}

export const useNetworkExceptions = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const handleNetworkExceptions = ({ errorCode }) =>
    showNotification(t(`errorCodes.${errorCode}`));

  return {
    handleNetworkExceptions
  };
};

export const generateQueryUniqueKey = (params: any[]) =>
  params.filter(param => param ?? null).join('_');
