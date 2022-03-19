import { useQuery } from 'react-query'
import { customFetcher } from '../services/fetcher'
import { FetchFilesResponse } from '../types/api-response'

const generateCreatorQuery = () => `
    query {
        files {
            title
            slug
            lastUpdated
            favorite
        }
    }
`

const fetcher = (query: string) => customFetcher<FetchFilesResponse>(query)
  .then(res => res.data.data);

export function useFiles() {
  const { data, isLoading, isError } = useQuery(
    'files',
    () => fetcher(generateCreatorQuery())
  );

  return {
    data,
    isLoading,
    isError
  }
}