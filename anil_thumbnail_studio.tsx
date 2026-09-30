import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Shield, X, Check, ExternalLink, Mail, MessageSquare, 
  Instagram, Lock, LogOut, ChevronRight, Sparkles, Eye, 
  ArrowUpRight, Plus, Trash2, Edit3, Tag, Video, Image as ImageIcon, 
  Layers, User, Phone, Share2, Compass, PlayCircle, Award
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: '1',
    title: 'Overthinking & Stress — Kaise Roke?',
    category: 'Motivation',
    description: 'Deep psychological motivation thumbnail designed to boost CTR with high contrast emotional expression and clear typography.',
    imageUrl: 'WhatsApp Image 2026-09-30 at 14.50.32 (1).jpeg',
    aspectRatio: 'aspect-video',
    createdAt: Date.now() - 100000
  },
  {
    id: '2',
    title: 'Humrah Tu Mera — Official Music Release',
    category: 'Entertainment',
    description: 'Cinematic romantic music video thumbnail featuring premium celebrity grading and bold typography.',
    imageUrl: 'WhatsApp Image 2026-09-30 at 14.50.32.jpeg',
    aspectRatio: 'aspect-video',
    createdAt: Date.now() - 200000
  },
  {
    id: '3',
    title: 'ChatterBox Chronicles — Podcast Highlights',
    category: 'Podcast',
    description: 'Engaging multi-panel podcast discussion thumbnail capturing intense debate and curiosity gaps.',
    imageUrl: 'WhatsApp Image 2026-09-30 at 14.50.33 (1).jpeg',
    aspectRatio: 'aspect-video',
    createdAt: Date.now() - 300000
  },
  {
    id: '4',
    title: 'Top 3 Skills for a Bright Future (2026 Edition)',
    category: 'Education',
    description: 'High-value career advice thumbnail featuring clear numbered steps and professional lighting.',
    imageUrl: 'WhatsApp Image 2026-09-30 at 14.50.33 (2).jpeg',
    aspectRatio: 'aspect-video',
    createdAt: Date.now() - 400000
  },
  {
    id: '5',
    title: 'Top 3 Skills & Career Freedom Masterclass',
    category: 'Tech',
    description: 'Tech and self-development thumbnail engineered for massive student engagement and high views.',
    imageUrl: 'WhatsApp Image 2026-09-30 at 14.50.33 (3).jpeg',
    aspectRatio: 'aspect-video',
    createdAt: Date.now() - 500000
  },
  {
    id: '6',
    title: 'मेरी Habits ने मुझे बदल दिया! (Life-Changing Story)',
    category: 'Motivation',
    description: 'Powerful before-and-after transformation thumbnail highlighting personal growth and discipline.',
    imageUrl: 'WhatsApp Image 2026-09-30 at 14.50.33.jpeg',
    aspectRatio: 'aspect-video',
    createdAt: Date.now() - 600000
  },
  {
    id: '7',
    title: 'India\'s Real Problem & Social Media Truth',
    category: 'News',
    description: 'Investigative documentary style thumbnail exploring societal challenges and social media impact.',
    imageUrl: 'WhatsApp Image 2026-09-30 at 14.50.34 (1).jpeg',
    aspectRatio: 'aspect-video',
    createdAt: Date.now() - 700000
  },
  {
    id: '8',
    title: 'ChatGPT se Thumbnail Kaise Banwayen? (Tutorial)',
    category: 'Tech',
    description: 'Step-by-step AI workflow thumbnail demonstrating professional graphic design techniques.',
    imageUrl: 'WhatsApp Image 2026-09-30 at 14.50.34 (2).jpeg',
    aspectRatio: 'aspect-video',
    createdAt: Date.now() - 800000
  },
  {
    id: '9',
    title: 'Let\'s Build Your Brand Together — Full Agency Services',
    category: 'Business',
    description: 'Comprehensive branding and creator services portfolio showcase banner.',
    imageUrl: 'WhatsApp Image 2026-09-30 at 14.50.34.jpeg',
    aspectRatio: 'aspect-video',
    createdAt: Date.now() - 900000
  }
];

const CATEGORIES = [
  'All Designs', 'Tech', 'Gaming', 'Vlogs', 'Education', 
  'Motivation', 'News', 'Business', 'Podcast', 'Entertainment', 'Devotional'
];

export default function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('anil_thumbnail_projects_v2');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [activeTab, setActiveTab] = useState('Home'); // Home, YouTube Thumbnails, UGC Ads, Video Editing, Logo Design, Contact
  const [activeCategory, setActiveCategory] = useState('All Designs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Admin Dashboard State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', designType: 'Tech', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Admin Project Form State
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: '', category: 'Tech', description: '', imageUrl: '' });

  useEffect(() => {
    localStorage.setItem('anil_thumbnail_projects_v2', JSON.stringify(projects));
  }, [projects]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCategory = activeCategory === 'All Designs' || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Please fill in all required fields.');
      return;
    }
    setContactSubmitted(true);
    showToast('Inquiry sent! Anil will contact you on WhatsApp / Email shortly.');
    setContactForm({ name: '', email: '', designType: 'Tech', message: '' });
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin === 'anil2026' || adminPin === 'admin') {
      setIsAuth(true);
      setAuthError('');
      showToast('Admin Access Granted!');
    } else {
      setAuthError('Incorrect PIN. Try "anil2026"');
    }
  };

  // Handle Image Upload (Converts uploaded image file to base64 for persistent localStorage)
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectForm(prev => ({ ...prev, imageUrl: reader.result }));
        showToast('Image loaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.imageUrl) {
      showToast('Title and Image are required.');
      return;
    }

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...projectForm } : p));
      showToast('Project updated successfully!');
      setEditingProject(null);
    } else {
      const newP = {
        id: Date.now().toString(),
        ...projectForm,
        createdAt: Date.now()
      };
      setProjects([newP, ...projects]);
      showToast('New thumbnail uploaded & added to gallery!');
    }
    setProjectForm({ title: '', category: 'Tech', description: '', imageUrl: '' });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this thumbnail?')) {
      setProjects(projects.filter(p => p.id !== id));
      showToast('Project deleted.');
    }
  };

  const handleEditClick = (p) => {
    setEditingProject(p);
    setProjectForm({ title: p.title, category: p.category, description: p.description || '', imageUrl: p.imageUrl });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-500 selection:text-white relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <Sparkles className="w-5 h-5 text-rose-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button 
            onClick={() => setActiveTab('Home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-rose-500/25 group-hover:scale-105 transition-transform">
              AK
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                Anil Thumbnail Studio
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">Anil Kumar — Thumbnail Designer</p>
            </div>
          </button>

          {/* Search Bar in Header */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search thumbnails, gaming, tech, vlog, motivation..."
                className="w-full bg-slate-100/80 border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-600">
              <button onClick={() => setActiveTab('Home')} className={`hover:text-rose-600 transition-colors ${activeTab === 'Home' ? 'text-rose-600 font-bold' : ''}`}>Home</button>
              <button onClick={() => setActiveTab('YouTube Thumbnails')} className={`hover:text-rose-600 transition-colors ${activeTab === 'YouTube Thumbnails' ? 'text-rose-600 font-bold' : ''}`}>YouTube Thumbnails</button>
              <button onClick={() => setActiveTab('UGC Ads')} className={`hover:text-rose-600 transition-colors ${activeTab === 'UGC Ads' ? 'text-rose-600 font-bold' : ''}`}>UGC Ads</button>
              <button onClick={() => setActiveTab('Video Editing')} className={`hover:text-rose-600 transition-colors ${activeTab === 'Video Editing' ? 'text-rose-600 font-bold' : ''}`}>Video Editing</button>
              <button onClick={() => setActiveTab('Logo Design')} className={`hover:text-rose-600 transition-colors ${activeTab === 'Logo Design' ? 'text-rose-600 font-bold' : ''}`}>Logo Design</button>
              <button onClick={() => setActiveTab('Contact')} className={`hover:text-rose-600 transition-colors ${activeTab === 'Contact' ? 'text-rose-600 font-bold' : ''}`}>Contact</button>
            </nav>

            <button 
              onClick={() => setIsAdminOpen(true)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Admin Dashboard"
            >
              <Shield className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            <a 
              href="https://wa.me/917319652980?text=Hi%20Anil,%20I%20want%20to%20hire%20you%20for%20YouTube%20Thumbnails!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-rose-600 to-amber-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-rose-600/20 hover:shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-white no-scrollbar">
          {['Home', 'YouTube Thumbnails', 'UGC Ads', 'Video Editing', 'Logo Design', 'Contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/50 pt-10 pb-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full text-rose-600 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> Over 150M+ Views Generated on YouTube
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Anil Kumar — YouTube Thumbnail Designer <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">Studio</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Browse through my original YouTube thumbnails. Click "Message Me on WhatsApp" to order your custom high-CTR design directly!
          </p>
        </div>

        {/* Horizontally Scrollable Category Filter Buttons */}
        <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 shadow-xs ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <Tag className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area based on Tab */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Tab 1 & 2: Home or YouTube Thumbnails (Pinterest Masonry Gallery) */}
        {(activeTab === 'Home' || activeTab === 'YouTube Thumbnails') && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>YouTube Thumbnails Gallery</span>
                <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-semibold">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'Design' : 'Designs'}
                </span>
              </h3>
              {activeCategory !== 'All Designs' && (
                <button 
                  onClick={() => setActiveCategory('All Designs')}
                  className="text-sm font-semibold text-rose-600 hover:underline flex items-center gap-1"
                >
                  Reset Filter <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-12">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-600">
                  <Search className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">No thumbnails found</h4>
                <p className="text-sm text-slate-500 mb-6">No designs match your filter or search criteria.</p>
                <button 
                  onClick={() => { setActiveCategory('All Designs'); setSearchQuery(''); }}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                >
                  View All Thumbnails
                </button>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance] space-y-6">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="break-inside-avoid bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 group flex flex-col relative"
                  >
                    {/* Thumbnail Image Container */}
                    <div className="relative overflow-hidden bg-slate-100 aspect-video w-full">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "WhatsApp Image 2026-09-30 at 14.50.32 (1).jpeg";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                        {project.category}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                        <div className="flex justify-end">
                          <button 
                            onClick={() => setSelectedProject(project)}
                            className="bg-white/90 hover:bg-white text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md transition-transform hover:scale-105"
                          >
                            <Eye className="w-3.5 h-3.5 text-rose-600" /> View Full Thumbnail
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Info & Mandatory Contact Details */}
                    <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 group-hover:text-rose-600 transition-colors">
                          {project.title}
                        </h4>
                        {project.description && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-medium">
                            {project.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Directly below every thumbnail card: Anil's name, WhatsApp number, and direct WhatsApp button */}
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
                        <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Anil Kumar — YouTube Thumbnail Designer</span>
                        </div>
                        <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp: 7319652980</span>
                        </div>
                        
                        <a 
                          href={`https://wa.me/917319652980?text=Hi%20Anil,%20I%20saw%20your%20thumbnail%20"${encodeURIComponent(project.title)}"%20and%20want%20a%20similar%20design!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>💬 MESSAGE ME ON WHATSAPP</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: UGC Ads */}
        {activeTab === 'UGC Ads' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">User Generated Content</span>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3">UGC Ads & Video Creative Portfolio</h3>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                High-converting video advertisements and product showcases tailored for TikTok, Instagram Reels, and YouTube Shorts.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'SaaS App Viral TikTok Ad', views: '2.4M Views', brand: 'FinTech Startup' },
                { title: 'Skincare Unboxing & Honest Review', views: '1.1M Views', brand: 'Glow Cosmetics' },
                { title: 'Gaming Headphone Testimonial', views: '850K Views', brand: 'HyperSound' }
              ].map((ugc, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-4 font-bold">
                      <Video className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">{ugc.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold mb-4">Client: {ugc.brand} • {ugc.views}</p>
                  </div>
                  <a 
                    href="https://wa.me/917319652980?text=Hi%20Anil,%20I%20need%20UGC%20Ads%20for%20my%20brand!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" /> Book UGC Video
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Video Editing */}
        {activeTab === 'Video Editing' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">Professional Post-Production</span>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3">YouTube Video Editing & Retainers</h3>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                Dynamic pacing, engaging sound design, custom motion graphics, and retention-optimized editing for top YouTubers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Documentary Essay Editing', duration: '18 mins', style: 'Cinematic & Paced' },
                { title: 'Gaming Challenge Highlight Reel', duration: '12 mins', style: 'High Energy & Memes' },
                { title: 'Podcast Full Episode & Shorts Cut', duration: '45 mins', style: 'Clean & Professional' }
              ].map((edit, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 font-bold">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">{edit.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold mb-4">Style: {edit.style} • {edit.duration}</p>
                  </div>
                  <a 
                    href="https://wa.me/917319652980?text=Hi%20Anil,%20I%20need%20YouTube%20Video%20Editing%20services!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" /> Discuss Editing
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Logo Design */}
        {activeTab === 'Logo Design' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">Brand Identity</span>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Logo & Channel Branding Design</h3>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                Memorable channel logos, custom banners, social media kits, and brand guidelines to make your channel stand out.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'Gaming Channel Mascot Logo', desc: 'Fierce, memorable branding for esports and gaming.' },
                { title: 'Tech Reviewer Minimalist Logo', desc: 'Clean, modern tech aesthetic for tech channels.' },
                { title: 'Podcast & Studio Branding', desc: 'Sophisticated typography and emblem design.' }
              ].map((logo, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-4 font-bold">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">{logo.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mb-4">{logo.desc}</p>
                  </div>
                  <a 
                    href="https://wa.me/917319652980?text=Hi%20Anil,%20I%20want%20a%20Custom%20Logo%20Design!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" /> Order Logo
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Contact */}
        {activeTab === 'Contact' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h3 className="text-3xl font-extrabold mb-3">Let's Talk About Your Next Project</h3>
                <p className="text-slate-400 text-sm">Reach out directly on WhatsApp or fill out the project inquiry form below.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <a 
                  href="https://wa.me/917319652980?text=Hi%20Anil,%20let's%20discuss%20my%20YouTube%20thumbnails!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 p-4 rounded-2xl flex items-center gap-4 transition-all"
                >
                  <MessageSquare className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-xs font-semibold text-emerald-200">Instant WhatsApp</div>
                    <div className="text-base font-bold">+91 73196 52980</div>
                  </div>
                </a>

                <a 
                  href="mailto:anilsinghkum2728@gmail.com"
                  className="bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl flex items-center gap-4 transition-all border border-slate-700"
                >
                  <Mail className="w-8 h-8 text-rose-400" />
                  <div>
                    <div className="text-xs font-semibold text-slate-400">Direct Email</div>
                    <div className="text-sm font-bold truncate">anilsinghkum2728@gmail.com</div>
                  </div>
                </a>
              </div>

              {contactSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-lg font-bold text-emerald-300">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-300 mt-1">Anil will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your Name / Channel Name" 
                      className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="Your Email Address" 
                      className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <select 
                    value={contactForm.designType}
                    onChange={(e) => setContactForm({ ...contactForm, designType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="YouTube Thumbnails">YouTube Thumbnails</option>
                    <option value="UGC Ads">UGC Ads</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Logo Design">Logo Design</option>
                  </select>
                  <textarea 
                    rows="4" 
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell me about your project and requirements..." 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-600 to-amber-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg hover:scale-[1.01] transition-all"
                  >
                    Send Project Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </main>

      {/* About Me Section (Displayed on Home) */}
      <section id="about" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-rose-500 to-amber-500 aspect-square">
                <img 
                  src="WhatsApp Image 2026-09-30 at 14.50.34.jpeg" 
                  alt="Anil Kumar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-8 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold tracking-wider uppercase text-emerald-300">Available for hire</span>
                  </div>
                  <h4 className="text-2xl font-black">Anil Kumar</h4>
                  <p className="text-xs text-slate-300 font-medium">YouTube Thumbnail Designer & Creator</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase inline-block mb-4">
                About The Creator
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Hi, I'm Anil Kumar
              </h3>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-6">
                “I am a creative thumbnail designer who creates eye-catching YouTube thumbnails for creators, educators, gaming channels, vloggers and businesses. Explore my work and contact me to discuss your next project.”
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="https://wa.me/917319652980?text=Hi%20Anil,%20let's%20discuss%20my%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 7319652980)</span>
                </a>
                <a 
                  href="mailto:anilsinghkum2728@gmail.com"
                  className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold transition-all flex items-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4 text-rose-600" />
                  <span>Email Anil</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Modal for Full Thumbnail View */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto">
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black text-white p-2.5 rounded-full backdrop-blur-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-950">
              <div className="md:col-span-8 bg-black flex items-center justify-center p-4">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
                />
              </div>

              <div className="md:col-span-4 bg-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                    {selectedProject.description || 'Custom crafted YouTube thumbnail engineered for high click-through rates and optimal viewer retention.'}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800">
                    Anil Kumar — YouTube Thumbnail Designer
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100">
                    📱 WhatsApp: 7319652980
                  </div>

                  <a 
                    href={`https://wa.me/917319652980?text=Hi%20Anil,%20I%20want%20a%20thumbnail%20like%20"${encodeURIComponent(selectedProject.title)}"`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>💬 MESSAGE ME ON WHATSAPP</span>
                  </a>

                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-full bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Admin Dashboard & Upload Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative">
            
            {/* Admin Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center font-bold">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Anil Studio Admin & Upload Dashboard</h3>
                  <p className="text-xs text-slate-400">Add original thumbnails and manage gallery</p>
                </div>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isAuth ? (
              <div className="p-8 max-w-md mx-auto my-auto w-full text-center">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-600">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Admin Authentication</h4>
                <p className="text-sm text-slate-500 mb-6">Enter PIN to upload thumbnails. (Default PIN: <code className="bg-slate-100 px-2 py-1 rounded text-rose-600 font-mono">anil2026</code>)</p>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password" 
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter Admin PIN" 
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-rose-500"
                    autoFocus
                  />
                  {authError && <p className="text-xs font-bold text-rose-600">{authError}</p>}
                  <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg">
                    Unlock Dashboard
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50">
                
                {/* Upload & Edit Form */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
                    <span>{editingProject ? 'Edit Thumbnail Project' : 'Upload New Thumbnail'}</span>
                    {editingProject && (
                      <button onClick={() => { setEditingProject(null); setProjectForm({ title: '', category: 'Tech', description: '', imageUrl: '' }); }} className="text-xs text-rose-600 font-bold hover:underline">
                        Cancel Edit
                      </button>
                    )}
                  </h4>

                  <form onSubmit={handleSaveProject} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Project Title *</label>
                        <input 
                          type="text" 
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          placeholder="e.g. My Viral YouTube Video Thumbnail"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Category *</label>
                        <select 
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                          {CATEGORIES.filter(c => c !== 'All Designs').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Upload Thumbnail Image File *</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                      />
                      <p className="text-xs text-slate-500 mt-1">Or paste image URL / Base64 below:</p>
                      <input 
                        type="text" 
                        value={projectForm.imageUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                        placeholder="Image URL or Base64 data..."
                        className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Description (Optional)</label>
                      <textarea 
                        rows="2"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Short summary of design highlights..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-rose-600/20 transition-all flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>{editingProject ? 'Update Thumbnail' : 'Upload & Add to Gallery'}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Manage Projects List */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-4">Manage Portfolio ({projects.length} Items)</h4>
                  <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                    {projects.map((p) => (
                      <div key={p.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={p.imageUrl} alt={p.title} className="w-16 h-10 object-cover rounded-lg border border-slate-200" />
                          <div>
                            <h5 className="font-bold text-sm text-slate-900 line-clamp-1">{p.title}</h5>
                            <span className="text-xs bg-rose-50 text-rose-600 font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5">{p.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEditClick(p)} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteProject(p.id)} className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <button onClick={() => setIsAuth(false)} className="text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1">
                    <LogOut className="w-3.5 h-3.5" /> Lock Admin Session
                  </button>
                  <button onClick={() => setIsAdminOpen(false)} className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold">
                    Done & Close
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
            <div className="md:col-span-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-lg">
                  AK
                </div>
                <h4 className="font-bold text-white text-lg">Anil Thumbnail Studio</h4>
              </div>
              <p className="text-sm text-slate-400 max-w-md font-medium leading-relaxed">
                Professional YouTube thumbnail designer Anil Kumar. Order custom thumbnails via WhatsApp: +91 7319652980.
              </p>
            </div>

            <div className="md:col-span-3">
              <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Navigation</h5>
              <ul className="space-y-2.5 text-sm font-medium">
                <li><button onClick={() => setActiveTab('Home')} className="hover:text-white transition-colors">Home Gallery</button></li>
                <li><button onClick={() => setActiveTab('YouTube Thumbnails')} className="hover:text-white transition-colors">YouTube Thumbnails</button></li>
                <li><button onClick={() => setActiveTab('UGC Ads')} className="hover:text-white transition-colors">UGC Ads</button></li>
                <li><button onClick={() => setActiveTab('Video Editing')} className="hover:text-white transition-colors">Video Editing</button></li>
                <li><button onClick={() => setActiveTab('Logo Design')} className="hover:text-white transition-colors">Logo Design</button></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Direct Contact</h5>
              <ul className="space-y-2.5 text-sm font-medium">
                <li><a href="https://wa.me/917319652980" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-emerald-400 font-bold">WhatsApp: 7319652980</a></li>
                <li><a href="mailto:anilsinghkum2728@gmail.com" className="hover:text-white transition-colors">anilsinghkum2728@gmail.com</a></li>
                <li><button onClick={() => setIsAdminOpen(true)} className="hover:text-rose-400 transition-colors">Admin Dashboard</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Anil Thumbnail Studio. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <Sparkles className="w-3.5 h-3.5 text-rose-500" /> for YouTube Creators Worldwide
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}