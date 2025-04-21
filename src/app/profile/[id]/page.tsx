export default function userPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-4xl ">Profile page </p>

      <span className="p-2 rounded bg-orange-300 text-black m-2">
        {params.id}{" "}
      </span>
    </div>
  );
}
