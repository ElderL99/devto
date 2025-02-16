import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setComments(data.comments);
        })
        .catch((error) => console.error("Error al cargar el post:", error));
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }

    const response = await fetch(`http://localhost:4000/api/comments/${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: comment })
    });

    const data = await response.json();
    setComments([...comments, data]);
    setComment(""); // Limpiar input
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
      <p className="text-sm text-gray-500">Autor: {post.author?.username}</p>

      <h3 className="text-xl font-semibold mt-5">Comentarios</h3>
      {comments.length === 0 ? <p>No hay comentarios aún.</p> : (
        <ul>
          {comments.map((c) => (
            <li key={c._id} className="border-b py-2">
              <strong>{c.author.username}</strong>: {c.content}
            </li>
          ))}
        </ul>
      )}

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border w-full p-2 mt-4"
        placeholder="Escribe un comentario..."
      />
      <button
        onClick={handleCommentSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Comentar
      </button>
    </div>
  );
}
