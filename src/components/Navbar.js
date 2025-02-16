import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-lg font-bold">DevTo Clone</Link>
      <div>
        {user ? (
          <>
            <Link href="/new-post" className="mr-4">Nuevo Post</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link href="/login" className="mr-4">Iniciar Sesión</Link>
            <Link href="/register" className="bg-blue-500 px-3 py-1 rounded">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
