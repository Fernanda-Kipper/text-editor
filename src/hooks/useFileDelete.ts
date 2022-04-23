import { useMutation, useQueryClient } from "react-query";
import { customFetcher } from "../services/fetcher";
import { DeleteFileResponse, PublishFileResponse} from '../types/api-response';
import { generatePublishQuery } from '../utils/generate-publish-query';

interface MutationInput {
    id: string,
    query: string
}

const generateDeleteQuery = (id: string) => `
    mutation {
        deleteFile(where: {id: "${id}"}){
            id
        }
    }
`

const fetcher = (query: string) => customFetcher<DeleteFileResponse>(query)
  .then(res => res.data.data);

const updateFile = async (id: string, query: string) => {
  await fetcher(query)
  const { publishFile } = await customFetcher<PublishFileResponse>(generatePublishQuery(id)).then(res => res.data.data)
  return {
    slug: publishFile?.slug,
  }
}

export function useFileDelete(){
    const queryClient = useQueryClient()
    const { data, isLoading, isError, isSuccess, mutate } = useMutation(
      (data: MutationInput) => updateFile(data.id, data.query),
      {onSuccess: () => queryClient.invalidateQueries('files')}
    );

    const deleteFile = (fileId: string) => {
        if(!fileId) return
        return mutate({ id: fileId, query: generateDeleteQuery(fileId)})
    }
    
    return {
        deleteFile,
        isSuccess,
        data,
        isLoading,
        isError
      }
}