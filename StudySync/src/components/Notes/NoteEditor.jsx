import React, { useState, useEffect } from 'react';
import { X, Save, Tag as TagIcon, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TagInput from './TagInput';

export default function NoteEditor({ note, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setSubject(note.subject || '');
      setTags(note.tags || []);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    onSave({
      title: title.trim(),
      content,
      subject: subject.trim(),
      tags,
      pinned: note?.pinned || false
    });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1e1b4b] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {note ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full text-2xl font-bold mb-4 px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#8AC6D1] dark:focus:border-[#3b82f6] transition-colors"
            autoFocus
          />

          {/* Subject */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <BookOpen size={16} />
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Mathematics, DBMS, Algorithms..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#8AC6D1] dark:focus:border-[#3b82f6] transition-all"
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <TagIcon size={16} />
              Tags
            </label>
            <TagInput tags={tags} setTags={setTags} />
          </div>

          {/* Rich Text Editor */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <div className="bg-white dark:bg-white/5 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-white/10">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="Start writing your notes..."
                className="dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Save size={18} />
            Save Note
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}