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
            id
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

  const favorites = data?.files.filter(file => !!file.favorite)

  return {
    files: data?.files,
    favorites,
    isLoading,
    isError
  }
}