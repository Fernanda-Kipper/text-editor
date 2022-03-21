export const generatePublishQuery = (id: string) => `
mutation {
  publishFile(where: { id: "${id}"}){
    slug,
    title,
    body,
    lastUpdated,
    favorite
  }
}
`