export default async function userProfilePage({ params }: any) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div>
      <h1 className="text-center">Profile page</h1>
      <p className="text-center">
        This is the{" "}
        <span className="text-red-500">{id}</span>
      </p>
    </div>
  );
}
