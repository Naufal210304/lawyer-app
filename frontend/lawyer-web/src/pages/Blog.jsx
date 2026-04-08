import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../features/blog/api';

const Blog = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to load blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black py-24 md:py-32 px-4 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
            Legal <span className="text-[#C5A02E]">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light">
            Artikel, berita, dan panduan hukum terbaru untuk membantu Anda memahami dinamika hukum di Indonesia.
          </p>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="py-24 px-4 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Category Tabs */}
          <div className="flex justify-center mb-16 space-x-4 md:space-x-12">
            {['all', 'latest', 'suggest'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-bold uppercase tracking-widest pb-2 transition-all duration-300 border-b-2 ${
                  activeTab === tab ? "text-[#C5A02E] border-[#C5A02E]" : "text-gray-400 border-transparent hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <div key={post.id} className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
                <div className="aspect-video bg-neutral-200 overflow-hidden relative">
                  <div className="absolute top-4 left-4 bg-[#C5A02E] text-black text-[10px] font-bold px-3 py-1 uppercase z-10">
                    {post.category_name || 'Uncategorized'}
                  </div>
                  {post.image_url ? (
                    <img src={`http://localhost:3001${post.image_url}`} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white/20 italic">
                      [Blog Image]
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-gray-400 text-xs mb-3">{formatDate(post.created_at)}</p>
                  <h4 className="text-xl font-bold text-black mb-4 group-hover:text-[#C5A02E] transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    Pelajari lebih dalam mengenai dinamika hukum terbaru yang dapat mempengaruhi bisnis dan kehidupan pribadi Anda...
                  </p>
                  <div className="mt-auto">
                    <Link to={`/blog/${post.slug}`} className="font-bold text-sm border-b-2 border-[#C5A02E] pb-1 hover:text-[#C5A02E] transition-colors inline-block">
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;