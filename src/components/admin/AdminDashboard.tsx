import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Edit2, LogOut, Upload, Image as ImageIcon, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Project } from '@/types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
}

export default function AdminDashboard({ 
  isOpen, 
  onClose, 
  onLogout,
  projects,
  onProjectsChange 
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'add'>('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state for new/edit project
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'clothing',
    image: ''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Define default categories
  const defaultCategories = ['clothing', 'formal', 'casual', 'haute couture', 'ready-to-wear', 'bridal', 'editorial', 'beauty'];

  // Extract unique categories from existing projects and merge with defaults
  const allCategories = Array.from(new Set([...defaultCategories, ...projects.map(project => project.category)]));

  // Check if Cloudinary environment variables are configured
  useEffect(() => {
    if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || !import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) {
      toast.error('Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.');
    }
  }, []);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate that Cloudinary is properly configured
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      toast.error('Cloudinary is not configured. Please set up your environment variables.');
      setIsUploading(false);
      return;
    }

    setIsUploading(true);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      setPreviewImage(imageUrl);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }

    if (editingProject) {
      // Update existing project
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...formData }
          : p
      );
      onProjectsChange(updatedProjects);
      toast.success('Project updated successfully!');
    } else {
      // Add new project
      // Generate a more unique ID to prevent potential collisions
      const newProject: Project = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...formData,
        createdAt: new Date().toISOString()
      };
      onProjectsChange([...projects, newProject]);
      toast.success('Project added successfully!');
    }

    resetForm();
    setActiveTab('projects');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      onProjectsChange(updatedProjects);
      toast.success('Project deleted successfully!');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image
    });
    setPreviewImage(project.image);
    setActiveTab('add');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'clothing',
      image: ''
    });
    setPreviewImage(null);
    setEditingProject(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetForm();
    setActiveTab('projects');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300]"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Dashboard */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/10">
          <div>
            <h2 className="font-serif text-2xl text-black">Admin Dashboard</h2>
            <p className="font-sans text-xs text-gray-500 mt-1">
              Manage your portfolio content
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 border border-black/20 font-sans text-xs tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-[#D9004C] flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-black/10">
          <button
            onClick={() => {
              setActiveTab('projects');
              resetForm();
            }}
            className={`flex-1 py-4 font-sans text-xs tracking-wider uppercase transition-colors ${
              activeTab === 'projects' 
                ? 'bg-black text-white' 
                : 'text-gray-500 hover:text-black'
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-4 font-sans text-xs tracking-wider uppercase transition-colors ${
              activeTab === 'add' 
                ? 'bg-black text-white' 
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {editingProject ? 'Edit Project' : 'Add New'}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'projects' ? (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="font-sans text-gray-500">No projects yet</p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="mt-4 text-magenta font-sans text-sm hover:underline"
                    >
                      Add your first project
                    </button>
                  </div>
                ) : (
                  projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 border border-black/10 hover:border-black/30 transition-colors group"
                    >
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-sans text-[10px] tracking-wider uppercase text-gray-500">
                              {project.category}
                            </span>
                            <h3 className="font-serif text-lg text-black truncate">
                              {project.title}
                            </h3>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(project)}
                              className="w-8 h-8 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                              aria-label="Edit project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="w-8 h-8 border border-black/20 flex items-center justify-center hover:bg-magenta hover:border-magenta hover:text-white transition-colors"
                              aria-label="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="font-sans text-sm text-gray-500 line-clamp-2 mt-1">
                          {project.description}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            ) : (
              <motion.form
                key="add"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Image Upload */}
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-gray-500 block mb-2">
                    Project Image
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-video border-2 border-dashed border-black/20 flex flex-col items-center justify-center cursor-pointer hover:border-black/40 transition-colors overflow-hidden"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    {previewImage ? (
                      <>
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white font-sans text-sm">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="font-sans text-sm text-gray-500">Click to upload image</span>
                        <span className="font-sans text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      aria-label="Upload project image"
                    />
                  </div>
                  {isUploading && (
                    <div className="mt-2 flex items-center gap-2 text-gray-500">
                      <span className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                      <span className="font-sans text-xs">Uploading...</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-gray-500 block mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="w-full px-4 py-3 border border-black/20 font-sans focus:outline-none focus:border-black transition-colors"
                    placeholder="e.g., Midnight Architecture"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-gray-500 block mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-black/20 font-sans focus:outline-none focus:border-black transition-colors bg-white"
                  >
                    {allCategories.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-gray-500 block mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-black/20 font-sans focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Describe your project..."
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-4 border border-black/20 font-sans text-sm tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}