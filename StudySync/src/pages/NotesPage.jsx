import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Tag, Download, Pin, Trash2, Edit3, BookOpen, Clock, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NoteEditor from '../components/Notes/NoteEditor';
import NoteSidebar from '../components/Notes/NoteSidebar';
import NoteCard from '../components/Notes/NoteCard';

export default function NotesPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Notes');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load notes from localStorage (or API in production)
    const savedNotes = localStorage.getItem('studysync_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
      setFilteredNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('studysync_notes', JSON.stringify(notes));
    }
  }, [notes]);

  // Filter notes based on search, subject, and tags
  useEffect(() => {
    let filtered = notes;

    // Filter by subject
    if (selectedSubject !== 'All Notes') {
      filtered = filtered.filter(note => note.subject === selectedSubject);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(note =>
        selectedTags.every(tag => note.tags.includes(tag))
      );
    }

    setFilteredNotes(filtered);
  }, [searchQuery, selectedSubject, selectedTags, notes]);

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleSaveNote = (noteData) => {
    if (selectedNote) {
      // Update existing note
      setNotes(notes.map(note =>
        note.id === selectedNote.id
          ? { ...noteData, id: selectedNote.id, updatedAt: new Date().toISOString() }
          : note
      ));
    } else {
      // Create new note
      const newNote = {
        ...noteData,
        id: Date.now().toString(),
        userId: user?.id || 'demo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
    }
    setIsEditorOpen(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const handlePinNote = (noteId) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, pinned: !note.pinned } : note
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Get unique subjects and tags
  const subjects = ['All Notes', ...new Set(notes.map(note => note.subject).filter(Boolean))];
  const allTags = [...new Set(notes.flatMap(note => note.tags))];

  // Sort notes: pinned first, then by date
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#312e81] transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white/90 dark:bg-white/10 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <h1 
                onClick={() => navigate('/dashboard')}
                className="text-2xl font-bold bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] bg-clip-text text-transparent cursor-pointer"
              >
                StudySync
              </h1>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#A3BFFA]/20 to-[#8AC6D1]/20 dark:from-[#3b82f6]/20 dark:to-[#ec4899]/20 rounded-full">
                <BookOpen size={18} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Organized Notes</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:block">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/30 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-300 rounded-lg transition-all"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Search and Create Button */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Your Notes Collection
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} • Organize, search, and export
              </p>
            </div>
            <button
              onClick={handleCreateNote}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-xl font-semibold hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              New Note
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by title, content, or tags..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#8AC6D1] dark:focus:border-[#3b82f6] focus:ring-2 focus:ring-[#8AC6D1]/20 dark:focus:ring-[#3b82f6]/20 transition-all"
            />
          </div>

          {/* Tag Filter Pills */}
          {allTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white shadow-md'
                      : 'bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-[#8AC6D1] dark:hover:border-[#3b82f6]'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <NoteSidebar
            subjects={subjects}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            noteCount={notes.length}
          />

          {/* Notes Grid */}
          <div className="lg:col-span-3">
            {sortedNotes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1e1b4b] border-2 border-dashed border-gray-300 dark:border-white/20 rounded-2xl p-12 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] dark:from-[#3b82f6]/20 dark:to-[#ec4899]/20 flex items-center justify-center">
                  <Edit3 size={40} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  No notes yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                  Create your first note to start organizing your study materials. Add tags, attach files, and export to PDF anytime.
                </p>
                <button
                  onClick={handleCreateNote}
                  className="px-6 py-3 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Create Your First Note
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {sortedNotes.map((note, index) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      index={index}
                      onEdit={() => handleEditNote(note)}
                      onDelete={() => handleDeleteNote(note.id)}
                      onPin={() => handlePinNote(note.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Note Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <NoteEditor
            note={selectedNote}
            onSave={handleSaveNote}
            onClose={() => {
              setIsEditorOpen(false);
              setSelectedNote(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}