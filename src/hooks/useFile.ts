import { useQuery } from 'react-query'
import { customFetcher } from '../services/fetcher'
import { FetchFileResponse } from '../types/api-response'

const generateCreatorQuery = (id: string) => `
    query {
        file(where: {id: ${id}}) {
          body
        }
    }
`

const fetcher = (query: string) => customFetcher<FetchFileResponse>(query)
  .then(res => res.data.data);

export function useFile(id?: string) {
  const { data, isLoading, isError } = useQuery(
    ['file', id],
    () => fetcher(generateCreatorQuery(id ?? "")),
    {
      enabled: !!id
    }
  );

  return {
    body: data?.body,
    isLoading,
    isError
  }
}