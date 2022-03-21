import { useMutation } from 'react-query'
import { customFetcher } from '../services/fetcher'
import { CreateFileResponse, PublishFileResponse } from '../types/api-response'
import { CreateFilePayload } from '../types/api-payload'
import { generatePublishQuery } from '../utils/generate-publish-query'

const generateCreateQuery = (data: CreateFilePayload) => `
  mutation {
    createFile(data: {
        title: "${data.title}",
        body:"${data.body}",
        slug: "${data.slug}",
        lastUpdated: "${data.lastUpdated}"
      }) {
        slug,
        id
      }
  }
`

const createAndPublishFile = async (mutation: CreateFilePayload) => {
  const { createFile } = await customFetcher<CreateFileResponse>(generateCreateQuery(mutation)).then(res => res.data.data);
  const { publishFile } = await customFetcher<PublishFileResponse>(generatePublishQuery(createFile.id)).then(res => res.data.data);
  return {
    slug: publishFile?.slug,
  }
}

export function useCreateFile() {
  const { data, isLoading, isError, isSuccess, mutate } = useMutation(
    (mutation: CreateFilePayload) => createAndPublishFile(mutation)
  );

  return {
    mutate,
    isSuccess,
    data,
    isLoading,
    isError
  }
}