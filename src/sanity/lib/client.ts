import { createClient, type QueryParams } from "next-sanity";
import { draftMode } from "next/headers"; // Required for switching between Live/Draft
import { apiVersion, dataset, projectId } from "../env"; // Ensure these point to your env.ts

// 1. Standard Client Configuration
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to true for production speed
});

// 2. The missing 'sanityFetch' helper
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
    next: { revalidate: 60, tags },
  });
}
