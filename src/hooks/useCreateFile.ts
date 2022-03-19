import { useMutation } from 'react-query'
import { customFetcher } from '../services/fetcher'
import { CreateFilePayload, CreateFileResponse } from '../types/createFile'

const generateCreatorQuery = (data: CreateFilePayload) => `
  mutation {
    createFile(data: {
        title: "${data.title}",
        body:"${data.body}",
        slug: "${data.slug}",
        lastUpdated: "${data.lastUpdated}"
      }) {
        slug
      }
  }
`

const fetcher = (query: string) => customFetcher<CreateFileResponse>(query)
  .then(res => res.data.data);

export function useCreateFile() {
  const { data, isLoading, isError, isSuccess, mutate } = useMutation(
    (mutation: CreateFilePayload) => fetcher(generateCreatorQuery(mutation))
  );

  return {
    mutate,
    isSuccess,
    data,
    isLoading,
    isError
  }
}