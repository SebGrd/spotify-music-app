export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-8 border p-8 rounded">
        <h1 className="text-4xl font-bold">Music App</h1>
        <div>
          <a className="bg-green-600 font-bold p-4 block rounded w-full text-center mb-2" href="/api/auth/login" >
            Login with Spotify
          </a>
          <a className="border font-bold p-4 block rounded w-full text-center" href="/webplayer" >
            Web player
          </a>
        </div>
      </div>
    </div>
  );
}
