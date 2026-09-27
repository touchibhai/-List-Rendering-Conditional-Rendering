import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';

export default function AddStudentModal({ isOpen, onClose, onAddStudent }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState(70);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddStudent({
      id: Date.now(), // Generate unique ID key
      name: name.trim(),
      score: Number(score)
    });

    setName('');
    setScore(70);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <UserPlus size={22} style={{ color: '#818cf8' }} />
            Add New Student
          </h3>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Student Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Maya Lin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Initial Score (0 - 100)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="form-input"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
            />
          </div>

          <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }}>
            Preview Status: {' '}
            {score >= 50 ? (
              <strong style={{ color: '#10b981' }}>PASS (Green text)</strong>
            ) : (
              <strong style={{ color: '#ef4444' }}>FAIL (Red text)</strong>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
