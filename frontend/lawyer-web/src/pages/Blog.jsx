import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs, fetchSuggestedBlogs, fetchBlogCategories } from '../features/blog/api';

const Blog = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleAllBlogsCount, setVisibleAllBlogsCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [categoryOptions, setCategoryOptions] = useState(['All Categories']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        const publishedBlogs = data.filter(blog => blog.status === 'published');
        setAllBlogs(publishedBlogs);
      } catch (error) {
        console.error('Failed to load blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchBlogCategories();
        const categoryNames = Array.from(new Set(categories.map(category => category.name).filter(Boolean))).sort();
        setCategoryOptions(['All Categories', ...categoryNames]);
      } catch (error) {
        console.error('Failed to load blog categories:', error);
      }
    };

    loadCategories();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allBlogs.filter(blog => {
      const matchesCategory = selectedCategory && selectedCategory !== 'All Categories'
        ? (blog.category_name || 'Uncategorized') === selectedCategory
        : true;

      const matchesQuery = query
        ? [blog.title, blog.content, blog.slug, blog.category_name]
            .filter(Boolean)
            .some(field => field.toLowerCase().includes(query))
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [allBlogs, searchQuery, selectedCategory]);

  const latestBlogs = filteredBlogs.slice(0, 4);

  useEffect(() => {
    const loadSuggestedBlogs = async () => {
      try {
        const keyword = searchQuery.trim() || (selectedCategory && selectedCategory !== 'All Categories' ? selectedCategory : null);
        const suggested = await fetchSuggestedBlogs(keyword);
        setSuggestedBlogs(suggested.slice(0, 4));
      } catch (error) {
        console.error('Failed to load suggested blogs:', error);
      }
    };

    if (!loading) {
      loadSuggestedBlogs();
      setVisibleAllBlogsCount(12);
    }
  }, [searchQuery, selectedCategory, loading]);

  const handleViewMore = () => {
    setVisibleAllBlogsCount(prev => prev + 8);
  };

  const visibleAllBlogs = useMemo(() => {
    const latestIds = new Set(latestBlogs.map(b => b.id));
    const suggestedIds = new Set(suggestedBlogs.map(b => b.id));
    const excludedIds = new Set([...latestIds, ...suggestedIds]);

    const remainingBlogs = filteredBlogs.filter(blog => !excludedIds.has(blog.id));
    return remainingBlogs.slice(0, visibleAllBlogsCount);
  }, [filteredBlogs, latestBlogs, suggestedBlogs, visibleAllBlogsCount]);

  const hasMoreBlogs = visibleAllBlogsCount < filteredBlogs.filter(blog => {
    const latestIds = new Set(latestBlogs.map(b => b.id));
    const suggestedIds = new Set(suggestedBlogs.map(b => b.id));
    const excludedIds = new Set([...latestIds, ...suggestedIds]);
    return !excludedIds.has(blog.id);
  }).length;

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

      {/* Blog Content */}
      <section className="py-24 px-4 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-24">

          {/* Search & Category Filter */}
          <div className="max-w-7xl mx-auto mb-12 grid gap-4 md:grid-cols-[1fr_240px] items-center">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Cari Artikel</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan judul, category, atau kata kunci..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A02E]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Bidang Layanan</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A02E]"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Latest Blogs Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">
              Latest <span className="text-[#C5A02E]">Articles</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {latestBlogs.map((post) => (
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
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-400 text-xs mb-3">{formatDate(post.created_at)}</p>
                    <h4 className="text-lg font-bold text-black mb-4 group-hover:text-[#C5A02E] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                      Pelajari lebih dalam mengenai dinamika hukum terbaru...
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

          {/* Suggested Blogs Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">
              Suggested <span className="text-[#C5A02E]">For You</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {suggestedBlogs.map((post) => (
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
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-400 text-xs mb-3">{formatDate(post.created_at)}</p>
                    <h4 className="text-lg font-bold text-black mb-4 group-hover:text-[#C5A02E] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                      Rekomendasi artikel yang mungkin Anda minati...
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

          {/* All Blogs Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">
              All <span className="text-[#C5A02E]">Articles</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {visibleAllBlogs.map((post) => (
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

            {/* View More Button */}
            {hasMoreBlogs && (
              <div className="text-center mt-16">
                <button
                  onClick={handleViewMore}
                  className="bg-[#C5A02E] text-black font-bold py-4 px-8 uppercase tracking-wider hover:bg-black hover:text-[#C5A02E] transition-colors duration-300"
                >
                  View More Articles
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Blog;