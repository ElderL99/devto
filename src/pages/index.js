import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "@/components/PostCard"; 

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error obteniendo posts:", error));
  }, []);

  return (
    <div>
      <h1>Posts en Devto Clone</h1>
      {posts.length > 0 ? (
        posts.map(post => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No hay posts disponibles.</p>
      )}
    </div>
  );
}
