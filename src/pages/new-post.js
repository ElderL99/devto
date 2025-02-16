import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function NewPost() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!user) {
    return <p className="text-center text-red-500">Debes iniciar sesión para crear un post.</p>;
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:4000/api/posts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    });

    if (response.ok) {
      alert("Post creado con éxito!");
      router.push("/");
    } else {
      alert("Error al crear el post.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear un Nuevo Post</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          placeholder="Contenido del post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Publicar
        </button>
      </form>
    </div>
  );
}
