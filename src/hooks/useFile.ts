import { useQuery } from 'react-query'
import { customFetcher } from '../services/fetcher'
import { FetchFileResponse } from '../types/api-response'

const generateCreatorQuery = (slug: string) => `
  query {
      file(where: {slug: "${slug}"}) {
        body,
        id
      }
  }
`

const fetcher = (query: string) => customFetcher<FetchFileResponse>(query)
  .then(res => res.data.data);

export function useFile(slug?: string) {
  const { data, isLoading, isError } = useQuery(
    ['file', slug],
    () => fetcher(generateCreatorQuery(slug ?? "")),
    {
      enabled: !!slug
    }
  );

  return {
    data: data?.file,
    isLoading,
    isError
  }
}