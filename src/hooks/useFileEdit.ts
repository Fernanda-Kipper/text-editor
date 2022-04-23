import { useMutation, useQueryClient } from 'react-query'
import { customFetcher } from '../services/fetcher'
import { EditFileResponse, PublishFileResponse } from '../types/api-response'
import { File } from '../types/file'
import { generatePublishQuery } from '../utils/generate-publish-query'

type MutationInput = {
  query: string
  id: string
}

const generateUpdateFavoriteQuery = (mutation: Partial<File>) => `
  mutation {
    updateFile(where: {id: "${mutation.id}"}, data: {
      favorite: ${mutation.favorite}
    }){
      slug
    }
  }
`

const generateUpdateBodyQuery = (mutation: Partial<File>) => `
  mutation {
    updateFile(where: {id: "${mutation.id}"}, data: {
      body: ${mutation.body}
    }){
      slug
    }
  }
`

const fetcher = (query: string) => customFetcher<EditFileResponse>(query)
  .then(res => res.data.data);

const updateFile = async (id: string, query: string) => {
  await fetcher(query)
  const { publishFile } = await customFetcher<PublishFileResponse>(generatePublishQuery(id)).then(res => res.data.data)
  return {
    slug: publishFile?.slug,
  }
}

export function useEditFile() {
  const queryClient = useQueryClient()
  const { data, isLoading, isError, isSuccess, mutate } = useMutation(
    (data: MutationInput) => updateFile(data.id, data.query),
    {onSuccess: () => queryClient.invalidateQueries('files')}
  );

  const updateFavorite = (file: Partial<File>) => {
    if(!file?.id) return
    return mutate({ id: file.id, query: generateUpdateFavoriteQuery(file)})
  }

  const updateBody = (file: Partial<File>) => {
    if(!file?.id) return
    return mutate({ id: file.id, query: generateUpdateBodyQuery(file)})
  }

  return {
    updateFavorite,
    updateBody,
    isSuccess,
    data,
    isLoading,
    isError
  }
}