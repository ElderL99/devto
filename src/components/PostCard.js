import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
      <Link href={`/post/${post._id}`} className="text-blue-500 mt-2">
        Leer más →
      </Link>
    </div>
  );
};

export default PostCard;
