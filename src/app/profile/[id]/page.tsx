import { Metadata } from "next";

interface PageProps {
  params: {
    id: string;
  };
}

export default function UserPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">User Profile</h1>
      <h2 className="text-2xl">User ID: {id}</h2>
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `Profile of User ${params.id}`,
  };
}
