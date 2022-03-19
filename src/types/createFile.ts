export type CreateFileResponse = {
    data: {
        createFile: {
            slug: string
        }
    }
}

export type CreateFilePayload = {
    title: string
    body: string[]
    slug: string
    lastUpdated: number
}