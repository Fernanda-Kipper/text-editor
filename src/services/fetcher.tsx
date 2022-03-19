import axios, { AxiosPromise } from 'axios';

const url = process.env.REACT_APP_CONTENT_API_URL as string;

export function customFetcher<TData>(query: string): AxiosPromise<TData> {
  return axios({
    url,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { query }
  })
}