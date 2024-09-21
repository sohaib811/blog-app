import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (err) {
        setError('Error fetching posts. Please try again later.');
      }
    };

    fetchPosts();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <Link to={`/post/${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.body.substring(0, 100)}...</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-4 py-2 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
