/**
 * Cesta k súboru z `public/` vrátane `basePath`.
 * Na GitHub Pages beží web pod /upright, lokálne v koreni – `<img src>` to samo nedoplní.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
