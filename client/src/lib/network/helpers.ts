import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { Config } from '../Config';
// import { getCurrentUILanguage } from '../i18n/utils';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { BadRequestError } from './errors/BadRequestError';
import { UnexpectedError } from './errors/UnexpectedError';

type ParserFunction = (json: any) => object;
const noParser: ParserFunction = json => json;
const parse = (parser: any) => (json: any) => parser(json);
const extractData = (response: any) => {
  try {
    if (response.status === 204) {
      return;
    }

    return response.data;
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const doGet = async <T>(url: string, parser?: any, body?: object): Promise<T> =>
  doRequest<T>(url, 'GET', body, parser);

export const doPost = async <T>(url: string, body: object = {}, parser?: any): Promise<T> =>
  doRequest<T>(url, 'POST', body, parser);

export const doPatch = async <T>(url: string, body: object = {}, parser?: any): Promise<T> =>
  doRequest<T>(url, 'PATCH', body, parser);

export const doPut = async <T>(url: string, body: object = {}, parser?: any): Promise<T> =>
  doRequest<T>(url, 'PUT', body, parser);

export const doDelete = async <T>(url: string, parser?: any): Promise<T> =>
  doRequest<T>(url, 'DELETE', parser);

export const doPutFileUpload = async <T>(url: string, body: FormData, parser?: any): Promise<T> =>
  doRequestUpload<T>(url, 'PUT', body, parser);

export const doPostFileUpload = async <T>(url: string, body: FormData, parser?: any): Promise<T> =>
  doRequestUpload<T>(url, 'POST', body, parser);

const getBodyFromResponse = (response: AxiosResponse) => {
  try {
    return response.data;
  } catch (e) {
    return 'No body';
  }
};

export const handleErrors = (response: AxiosResponse) => {
  if (response.statusText !== 'OK') {
    const body = getBodyFromResponse(response);
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

const doRequest = async <T>(
  endpoint: string,
  method: Method,
  body?: object,
  parser = noParser): Promise<T> => {

  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    // 'user-lang': getCurrentUILanguage()
  };

  const request: AxiosRequestConfig = {
    method,
    headers
  };

  if (body) {
    request.data = JSON.stringify(body);
  }

  const url = Config.API_URL + endpoint;
  return new Promise((resolve, reject) => {
    axios(url, request)
    .then(handleErrors)
    .then(extractData)
    .then(parse(parser))
    .then(resolve)
    .catch(err => reject(err));
  });
};

const doRequestUpload = async <T>(endpoint: string,
  method: Method,
  body: FormData,
  parser = noParser): Promise<T> => {

  const request: AxiosRequestConfig = {
    method
  };

  if (body) {
    request.data = body;
  }

  const url = Config.API_URL + endpoint;
  return new Promise((resolve, reject) => {
    axios(url, request)
      .then(handleErrors)
      .then(extractData)
      .then(parse(parser))
      .then(resolve)
      .catch(err => reject(err));
  });
};

export const mainFetcher = doRequest;

// export const isAClientError = (error) =>
//   error.code === 400;

// export const isUnauthorizedError = (error) =>
//   error.code === 401;
