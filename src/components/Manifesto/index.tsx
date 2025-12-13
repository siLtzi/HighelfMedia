import ManifestoContent from './Content';

interface ManifestoProps {
  data: {
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
  } | null;
}

export default function Manifesto({ data }: ManifestoProps) {
  // 1. Safety Check: If no data at all, don't render anything
  if (!data) return null;

  // 2. Fallbacks: Ensure strings exist even if empty in Sanity
  const heading = data.title || "Manifesto";
  const statement = data.description || "";

  return (
    <ManifestoContent 
      heading={heading}
      statement={statement}
    />
  );
}