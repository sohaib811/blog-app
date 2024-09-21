import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const commentsData = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        setPost(response.data);
        setComments(commentsData.data);
      } catch (err) {
        setError('Error fetching post. Please try again later.');
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <div className="text-red-500">{error}</div>;

  if (!post) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-700 mt-4">{post.body}</p>
      <h3 className="mt-10">Comments</h3>
        {comments?
        comments.map(comment => (
            <div key={comment.id} className="border p-4 rounded mt-4">
                <p className="font-semibold">{comment.name}</p>
                <p className="text-gray-500">{comment.email}</p>
                <p className="text-gray-700 mt-2">{comment.body}</p>
            </div>
        )): <p className="text-gray-500">No comments ...</p>}
    </div>
  );
};

export default BlogPost;
