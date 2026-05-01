const POSTS = [
  {
    title: '5 Trends in Modern Sustainable Architecture',
    excerpt: 'Discover how eco-friendly materials and design are shaping the next generation of homes.',
    date: 'May 12, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1518005020485-6105f2b800ca?auto=format&fit=crop&q=80&w=2070',
    category: 'Design'
  },
  {
    title: 'The Real Cost of Building Your Dream Home',
    excerpt: 'A comprehensive breakdown of hidden expenses every homeowner should prepare for.',
    date: 'Apr 28, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=2070',
    category: 'Finance'
  },
  {
    title: 'Why Smart Site Preparation Saves Millions',
    excerpt: 'Detailed analysis on why geotechnical surveys are the best investment you can make.',
    date: 'Apr 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35682ff933cc?auto=format&fit=crop&q=80&w=2070',
    category: 'Strategy'
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-4">Insights</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic line-tight md:leading-none">Update News <br className="md:hidden" /> & Blogs</h3>
          </div>
          <button className="text-orange-500 font-bold text-sm hover:underline flex items-center gap-2">
            View All Posts
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article key={post.title} className="group cursor-pointer">
              <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-6 border border-zinc-800">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=2070';
                  }}
                />
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest px-2 py-1 bg-orange-500/10 rounded-md">
                  {post.category}
                </span>
                <span className="text-xs text-zinc-500 font-medium">{post.date}</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors leading-tight">
                {post.title}
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Read Full Story
                <div className="h-[2px] w-8 bg-orange-500" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
