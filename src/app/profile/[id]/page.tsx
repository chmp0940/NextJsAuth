import { Metadata } from "next";

interface PageProps {
  params: {
    id: string;
  };
}
/*
This tells TypeScript:
"The component will receive a prop called params, and params will have an id property of type string."
*/

/*
PageProps makes sure your component knows what data it will receive from Next.js for dynamic routes, and helps with type safety and autocompletion in TypeScript.
*/

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

/*
The export async function generateMetadata function in a Next.js app dynamically sets the metadata (like the page <title>) for your page based on the route parameters.
*/

/*
Usage:
It allows each user profile page (e.g., /profile/123) to have a unique, descriptive title.
This improves SEO and user experience, because the browser tab and search engines will show the correct title for each profile.
*/
