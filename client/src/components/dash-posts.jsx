import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `/api/post/get-posts?userId=${currentUser._id}`,
        );
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, [currentUser._id]);

  return (
    <div className="scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 table-auto overflow-x-scroll p-3 md:mx-auto">
      {currentUser.isAdmin && posts.length > 0 ? (
        <>
          <Table className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map((post) => (
                <Table.Row
                  key={post._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-10 w-20 rounded bg-gray-500 object-cover"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white/90"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="cursor-pointer font-medium text-red-600 hover:underline">
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-post/${post.slug}`}
                      className="font-semibold text-teal-400 hover:underline"
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <p>You have no posts</p>
      )}
    </div>
  );
}
