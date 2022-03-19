export const generateSlug = (title: string, lastUpdated: number) => {
    return `${title}-${lastUpdated}`;
}