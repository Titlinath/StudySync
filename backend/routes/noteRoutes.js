const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Note = require('../models/Note');

// All routes require authentication
router.use(protect);

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, content, subject, tags, color } = req.body;

    const note = await Note.create({
      userId: req.user.id,
      title,
      content,
      subject,
      tags: tags || [],
      color: color || '#FFFFFF'
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: { note }
    });
  } catch (error) {
    console.error('Create Note Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating note',
      error: error.message
    });
  }
});

// @route   GET /api/notes
// @desc    Get all notes for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { subject, tag } = req.query;
    
    const query = { userId: req.user.id };
    if (subject) query.subject = subject;
    if (tag) query.tags = tag;

    const notes = await Note.find(query).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: { notes }
    });
  } catch (error) {
    console.error('Get Notes Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notes',
      error: error.message
    });
  }
});

// @route   GET /api/notes/:id
// @desc    Get single note
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { note }
    });
  } catch (error) {
    console.error('Get Note Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching note',
      error: error.message
    });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update note
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    const { title, content, subject, tags, color } = req.body;

    if (title) note.title = title;
    if (content) note.content = content;
    if (subject) note.subject = subject;
    if (tags) note.tags = tags;
    if (color) note.color = color;

    await note.save();

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: { note }
    });
  } catch (error) {
    console.error('Update Note Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating note',
      error: error.message
    });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete Note Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting note',
      error: error.message
    });
  }
});

// @route   PATCH /api/notes/:id/pin
// @desc    Toggle note pin status
// @access  Private
router.patch('/:id/pin', async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    note.pinned = !note.pinned;
    await note.save();

    res.status(200).json({
      success: true,
      message: `Note ${note.pinned ? 'pinned' : 'unpinned'}`,
      data: { note }
    });
  } catch (error) {
    console.error('Pin Note Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling pin',
      error: error.message
    });
  }
});

module.exports = router;