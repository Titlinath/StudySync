import React from 'react';
import { Pin, Edit3, Trash2, Download, Clock, Tag as TagIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

export default function NoteCard({ note, index, onEdit, onDelete, onPin }) {
  const handleExportPDF = (e) => {
    e.stopPropagation();
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(note.title, margin, yPosition);
    yPosition += 15;

    // Metadata
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100);
    doc.text(`Subject: ${note.subject || 'N/A'}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Tags: ${note.tags.join(', ') || 'None'}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Created: ${new Date(note.createdAt).toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;

    // Line separator
    doc.setDrawColor(200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Content (strip HTML tags for PDF)
    doc.setFontSize(11);
    doc.setTextColor(0);
    const strippedContent = note.content.replace(/<[^>]*>/g, '');
    const splitContent = doc.splitTextToSize(strippedContent, pageWidth - (margin * 2));
    doc.text(splitContent, margin, yPosition);

    // Save PDF
    doc.save(`${note.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // Strip HTML and truncate content
  const strippedContent = note.content.replace(/<[^>]*>/g, '');
  const preview = strippedContent.length > 120 
    ? strippedContent.substring(0, 120) + '...' 
    : strippedContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white dark:bg-[#1e1b4b] dark:border dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all cursor-pointer relative overflow-hidden"
      onClick={onEdit}
    >
      {/* Pin Badge */}
      {note.pinned && (
        <div className="absolute top-4 right-4">
          <div className="px-2 py-1 bg-gradient-to-r from-[#FFD6A5] to-[#FF9A8B] dark:from-[#ec4899] dark:to-[#8b5cf6] text-white text-xs font-semibold rounded-full flex items-center gap-1">
            <Pin size={12} />
            Pinned
          </div>
        </div>
      )}

      {/* Subject Badge */}
      {note.subject && (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#A3BFFA]/20 to-[#8AC6D1]/20 dark:from-[#3b82f6]/20 dark:to-[#ec4899]/20 rounded-full mb-3">
          <span className="text-xs font-semibold text-[#8AC6D1] dark:text-[#3b82f6]">
            {note.subject}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 pr-20">
        {note.title}
      </h3>

      {/* Preview */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
        {preview}
      </p>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-xs rounded-full"
            >
              <TagIcon size={10} />
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{note.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock size={14} />
          {getTimeAgo(note.updatedAt)}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin();
            }}
            className={`p-2 rounded-lg transition-colors ${
              note.pinned
                ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400'
            }`}
            title="Pin note"
          >
            <Pin size={16} />
          </button>
          <button
            onClick={handleExportPDF}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 rounded-lg transition-colors"
            title="Export to PDF"
          >
            <Download size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}