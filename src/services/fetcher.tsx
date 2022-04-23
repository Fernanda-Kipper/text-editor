import axios, { AxiosPromise } from 'axios';

const url = process.env.REACT_APP_CONTENT_API_URL as string;
const token = process.env.REACT_APP_CONTENT_API_TOKEN_DRAFT as string;

export function customFetcher<TData>(query: string): AxiosPromise<TData> {
  return axios({
    url,
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data: { query }
  })
}