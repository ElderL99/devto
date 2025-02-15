export default function PostCard({ post }) {
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p><strong>Autor:</strong> {post.author}</p>
      </div>
    );
  }
  