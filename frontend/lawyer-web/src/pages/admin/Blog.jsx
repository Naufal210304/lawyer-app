import React from 'react';

const Blog = () => {
  // Data dummy yang mengikuti struktur field database blogs
  const blogs = [
    { 
      id: 1, 
      author_id: 1, 
      category_id: 1, 
      title: "Pentingnya Legalitas Bisnis di Era Digital", 
      slug: "pentingnya-legalitas-bisnis", 
      type: "latest", 
      content: "Isi konten artikel...", 
      image_url: "/uploads/blog1.jpg", 
      status: "published", 
      created_at: "2023-10-15 10:00", 
      updated_at: "2023-10-15 10:00" 
    },
    { 
      id: 2, 
      author_id: 1, 
      category_id: 2, 
      title: "Cara Menghadapi Sengketa Tanah", 
      slug: "cara-menghadapi-sengketa-tanah", 
      type: "suggest", 
      content: "Isi konten artikel...", 
      image_url: "/uploads/blog2.jpg", 
      status: "draft", 
      created_at: "2023-10-12 14:20", 
      updated_at: "2023-10-12 14:20" 
    },
  ];

  return (
    <div>
      {/* Header - Identik dengan Dashboard */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            Blog Management
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Kelola artikel, berita, dan wawasan hukum yang tampil di website.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 w-fit">
          + Buat Artikel Baru
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
          <h2 className="text-base md:text-lg font-bold text-slate-800">Daftar Artikel</h2>
          <div className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Cari judul atau slug..." 
              className="w-full md:w-64 pl-3 pr-10 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 border-b">ID</th>
                <th className="px-6 py-4 border-b">Title & Slug</th>
                <th className="px-6 py-4 border-b">Details</th>
                <th className="px-6 py-4 border-b">Type</th>
                <th className="px-6 py-4 border-b">Status</th>
                <th className="px-6 py-4 border-b">Created At</th>
                <th className="px-6 py-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-400">#{blog.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </span>
                      <span className="text-xs text-slate-400 italic font-mono truncate max-w-[200px]">
                        /{blog.slug}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-[11px] leading-tight">
                      <span className="text-slate-500 font-medium uppercase">Auth ID: {blog.author_id}</span>
                      <span className="text-slate-400">Cat ID: {blog.category_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-tight">
                      {blog.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      blog.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {blog.created_at}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors" title="Edit">
                        ✏️
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors" title="Hapus">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blog;