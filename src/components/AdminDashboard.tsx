import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { useAdmin } from './AdminProvider';
import { motion, AnimatePresence } from 'motion/react';
import { X, LayoutDashboard, MessageSquare, Settings, ChevronRight, Check, Trash2, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn, formatDate } from '@/src/lib/utils';

export default function AdminDashboard() {
  const { isAdmin, user, setupAdmin } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('inquiries');
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Residential',
    imageUrl: '',
    description: ''
  });

  // Load Inquiries
  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'inquiries');
    });
  }, [isAdmin]);
  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });
  }, [isAdmin]);

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `inquiries/${id}`);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `inquiries/${id}`);
    }
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingProject) {
        await updateDoc(doc(db, 'projects', editingProject.id), {
          ...projectForm,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'projects'), {
          ...projectForm,
          createdAt: serverTimestamp()
        });
      }
      setIsProjectFormOpen(false);
      setEditingProject(null);
      setProjectForm({ title: '', category: 'Residential', imageUrl: '', description: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'projects');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  };

  const openProjectForm = (project: any = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title,
        category: project.category,
        imageUrl: project.imageUrl,
        description: project.description
      });
    } else {
      setEditingProject(null);
      setProjectForm({ title: '', category: 'Residential', imageUrl: '', description: '' });
    }
    setIsProjectFormOpen(true);
  };

  if (!user || (!isAdmin && user.email !== 'esorezekiel100@gmail.com')) return null;

  return (
    <>
      {/* Floating Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <LayoutDashboard className="w-6 h-6" />
        <span className="absolute right-full mr-4 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Admin Panel
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[70] bg-zinc-950 flex flex-col md:flex-row"
          >
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold tracking-tighter text-white font-display uppercase italic">
                  VERTEX<span className="text-orange-500">ADMIN</span>
                </span>
                <button onClick={() => setIsOpen(false)} className="md:hidden text-zinc-400">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow space-y-2">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                    activeTab === 'inquiries' ? "bg-orange-500 text-white" : "text-zinc-400 hover:bg-zinc-800"
                  )}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-bold text-sm">Inquiries</span>
                  {inquiries.filter(i => i.status === 'new').length > 0 && (
                    <span className="ml-auto w-5 h-5 bg-zinc-950/20 rounded-full flex items-center justify-center text-[10px]">
                      {inquiries.filter(i => i.status === 'new').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                    activeTab === 'projects' ? "bg-orange-500 text-white" : "text-zinc-400 hover:bg-zinc-800"
                  )}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-bold text-sm">Projects</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                    activeTab === 'settings' ? "bg-orange-500 text-white" : "text-zinc-400 hover:bg-zinc-800"
                  )}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-bold text-sm">Settings</span>
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="hidden md:flex items-center justify-center gap-2 w-full py-3 bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
                Back to Site
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto p-6 md:p-12">
              {!isAdmin ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mb-6">
                    <Settings className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Admin Setup Required</h3>
                  <p className="text-zinc-400 max-w-sm mb-8">
                    You are logged in as the primary developer. Press the button below to initialize your admin permissions.
                  </p>
                  <button
                    onClick={setupAdmin}
                    className="px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all hover:scale-105"
                  >
                    Initialize Admin Access
                  </button>
                </div>
              ) : (
                <div className="max-w-5xl mx-auto">
                  {activeTab === 'inquiries' ? (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-8">Recent Project Inquiries</h2>
                      <div className="space-y-4">
                        {inquiries.length === 0 ? (
                          <div className="p-12 rounded-3xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-500">
                            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                            <p>No inquiries submitted yet.</p>
                          </div>
                        ) : (
                          inquiries.map((inquiry) => (
                            <div 
                              key={inquiry.id}
                              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-start"
                            >
                              <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className={cn(
                                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                    inquiry.status === 'new' ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400"
                                  )}>
                                    {inquiry.status}
                                  </span>
                                  <span className="text-xs text-zinc-500">
                                    {inquiry.createdAt?.toDate ? formatDate(inquiry.createdAt.toDate()) : 'Recently'}
                                  </span>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-1">{inquiry.name}</h4>
                                <div className="flex gap-4 text-sm text-zinc-400 mb-4">
                                  <span>{inquiry.email}</span>
                                  <span>{inquiry.phone}</span>
                                </div>
                                <div className="p-4 bg-zinc-950 rounded-xl mb-4 border border-zinc-800">
                                  <p className="text-sm font-bold text-orange-500 mb-1">Project: {inquiry.projectType}</p>
                                  <p className="text-sm text-zinc-300 italic">{inquiry.message}</p>
                                </div>
                              </div>
                              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                                {inquiry.status === 'new' && (
                                  <button 
                                    onClick={() => updateInquiryStatus(inquiry.id, 'contacted')}
                                    className="flex-grow px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                                  >
                                    <Check className="w-4 h-4" />
                                    Mark Contacted
                                  </button>
                                )}
                                <button 
                                  onClick={() => deleteInquiry(inquiry.id)}
                                  className="px-4 py-2 text-rose-500 hover:bg-rose-500/10 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : activeTab === 'projects' ? (
                    <div>
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">Manage Projects</h2>
                        <button 
                          onClick={() => openProjectForm()}
                          className="px-6 py-2 bg-orange-500 text-white font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-orange-600 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          Add Project
                        </button>
                      </div>

                      <AnimatePresence>
                        {isProjectFormOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-12"
                          >
                            <form onSubmit={handleSubmitProject} className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-6">
                                <div>
                                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Project Title</label>
                                  <input 
                                    type="text"
                                    required
                                    value={projectForm.title}
                                    onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-orange-500 transition-colors"
                                    placeholder="e.g., Luxury Beachfront Villa"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Category</label>
                                  <select 
                                    value={projectForm.category}
                                    onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-orange-500 transition-colors"
                                  >
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Renovation">Renovation</option>
                                    <option value="Industrial">Industrial</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Image URL</label>
                                  <input 
                                    type="url"
                                    required
                                    value={projectForm.imageUrl}
                                    onChange={e => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-orange-500 transition-colors"
                                    placeholder="https://images.unsplash.com/..."
                                  />
                                </div>
                              </div>
                              <div className="space-y-6">
                                <div>
                                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Description</label>
                                  <textarea 
                                    rows={5}
                                    required
                                    value={projectForm.description}
                                    onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-orange-500 transition-colors resize-none"
                                    placeholder="Describe the project scope and results..."
                                  />
                                </div>
                                <div className="flex gap-4">
                                  <button 
                                    type="button"
                                    onClick={() => setIsProjectFormOpen(false)}
                                    className="flex-grow py-3 bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-700 transition-all"
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-grow py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                                  >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : editingProject ? 'Update' : 'Create'} Project
                                  </button>
                                </div>
                              </div>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid md:grid-cols-2 gap-6">
                        {projects.length === 0 ? (
                          <div className="col-span-full p-12 rounded-3xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-500">
                            <LayoutDashboard className="w-12 h-12 mb-4 opacity-20" />
                            <p>No projects in the database.</p>
                          </div>
                        ) : (
                          projects.map((project) => (
                            <div key={project.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col group">
                              <div className="aspect-video relative overflow-hidden">
                                <img src={project.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 px-2 py-1 bg-zinc-950/80 rounded text-[10px] font-bold text-white uppercase backdrop-blur-sm">
                                  {project.category}
                                </div>
                              </div>
                              <div className="p-6">
                                <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
                                <p className="text-zinc-500 text-sm mb-6 line-clamp-2">{project.description}</p>
                                <div className="flex gap-4">
                                  <button 
                                    onClick={() => openProjectForm(project)}
                                    className="flex-grow py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-all"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => deleteProject(project.id)}
                                    className="px-4 py-2 text-rose-500 hover:bg-rose-500/10 rounded-lg text-xs font-bold transition-all"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                      <Settings className="w-16 h-16 text-zinc-800 mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-2">Editor Settings</h3>
                      <p className="text-zinc-500">Content management modules (Projects, Services, Blog) are coming soon.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
