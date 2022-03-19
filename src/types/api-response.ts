import { File } from './file'

export type CreateFileResponse = {
    data: {
        createFile: {
            slug: string
            id: string
        }
    }
}

export type PublishFileResponse = {
    data: {
        publishFile?: {
            slug: string
        }
    }
}

export type FetchFilesResponse = {
    data: { 
        files: Omit<File, "body">[]
    }
}