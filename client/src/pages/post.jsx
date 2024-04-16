import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/get-posts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }

        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchPost();
  }, [postSlug]);
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col p-3">
      <h1 className="mx-auto mt-10 max-w-2xl p-3 text-center font-serif text-3xl lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="mt-5 self-center"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        className="mx-auto mt-10 max-h-[400px] w-full object-cover p-3"
        alt={post && post.title}
      />
      <div className="mx-auto flex w-full justify-between border-b border-slate-500 p-3 text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="w-fullp-3 post-content mx-auto"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
    </main>
  );
}