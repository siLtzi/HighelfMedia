import { createClient, type QueryParams } from "next-sanity";
import { draftMode } from "next/headers"; 
import { apiVersion, dataset, projectId } from "../env"; 

// 1. Standard Client Configuration
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 👈 CHANGE THIS TO FALSE (Forces fresh data)
});

export async function sanityFetch<
  T = unknown,
  const QueryString extends string = string
>({
  query,
  params = {},
  tags,
}: {
  query: QueryString;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode) {
    const token = process.env.SANITY_API_READ_TOKEN;
    if (!token) {
      throw new Error(
        "The `SANITY_API_READ_TOKEN` environment variable is required."
      );
    }

    return client.withConfig({ token }).fetch<T>(query, params, {
      perspective: "previewDrafts",
      stega: true,
      next: { revalidate: 0 },
    });
  }

  return client.fetch<T>(query, params, {
    perspective: "published",
    // 👇 CHANGE THIS TO 0 (Forces fresh fetch on every refresh)
    next: { revalidate: 0, tags }, 
  });
}