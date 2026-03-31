// routes/contact.js – Contact/Feedback message handling
const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { verifyToken } = require('../middleware/auth');

// POST /api/contact  – Public: user submits feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ success: false, error: 'Name and message are required.' });
    }
    // Basic length guards
    if (message.length > 2000) {
      return res.status(400).json({ success: false, error: 'Message too long (max 2000 chars).' });
    }
    const result = await db.query(`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES ($1, $2, $3, $4) RETURNING id, created_at
    `, [
      name.slice(0,100),
      (email || '').slice(0,200),
      (subject || 'General Enquiry').slice(0,200),
      message.slice(0,2000)
    ]);
    res.status(201).json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /api/contact  – Admin only: list all messages
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100'
    );
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PATCH /api/contact/:id/reply  – Admin saves a reply note
router.patch('/:id/reply', verifyToken, async (req, res) => {
  try {
    const { reply } = req.body;
    if (!reply) return res.status(400).json({ success: false, error: 'Reply text required.' });
    const result = await db.query(`
      UPDATE contact_messages SET reply=$1, replied_at=NOW(), status='replied'
      WHERE id=$2 RETURNING id
    `, [reply.slice(0,2000), req.params.id]);
    if (!result.rowCount) return res.status(404).json({ success: false, error: 'Message not found.' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DELETE /api/contact/:id  – Admin deletes a message
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const result = await db.query('DELETE FROM contact_messages WHERE id=$1 RETURNING id', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ success: false, error: 'Message not found.' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
