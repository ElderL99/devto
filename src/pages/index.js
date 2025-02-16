import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    fetch("http://localhost:4000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data); 
        setPosts(data.posts || []); 
      })
      .catch((error) => console.error("Error al cargar los posts:", error));
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Últimos Posts</h1>
      {Array.isArray(posts) && posts.length === 0 ? ( 
        <p>Cargando posts...</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
              <p className="text-sm text-gray-500">Autor: {post.author?.username}</p>
              <Link href={`/post/${post._id}`} className="text-blue-500 hover:underline">
                Leer más
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
