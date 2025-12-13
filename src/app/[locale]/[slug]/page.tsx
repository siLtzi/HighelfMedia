import { notFound } from "next/navigation";

type Params = Promise<{ locale: "fi" | "en"; slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  // TODO: fetch project by slug
  if (!slug) notFound();

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-10">
      <h1 className="text-3xl font-bold">Work: {slug}</h1>
    </main>
  );
}
