import React from 'react';
import { CheckCircle2, XCircle, PlusCircle, MinusCircle, Trash2 } from 'lucide-react';

export default function StudentCard({ student, onUpdateScore, onDeleteStudent }) {
  // Requirement check: score >= 50 is Pass, score < 50 is Fail
  const isPassed = student.score >= 50;

  // Helper to extract initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`student-card ${isPassed ? 'status-pass' : 'status-fail'}`}>
      <div>
        <div className="card-top">
          <div className="student-avatar">{getInitials(student.name)}</div>
          <span className="student-id-badge">ID #{student.id}</span>
        </div>

        <h3 className="student-name">{student.name}</h3>

        {/* Score Display and Interactive Adjuster */}
        <div className="score-section">
          <div className="score-header">
            <span>Test Score</span>
            <span className="score-value">{student.score} / 100</span>
          </div>

          <div className="score-bar-bg">
            <div
              className="score-bar-fill"
              style={{ width: `${Math.min(Math.max(student.score, 0), 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div>
        {/* Conditional Rendering Requirement: 
            Display "Pass" status in green text if score >= 50,
            Display "Fail" status in red text if score < 50. */}
        {isPassed ? (
          <div className="status-badge pass" title="Score >= 50 (Passed)">
            <CheckCircle2 size={18} style={{ color: '#10b981' }} />
            <span className="status-text">Pass</span>
          </div>
        ) : (
          <div className="status-badge fail" title="Score < 50 (Failed)">
            <XCircle size={18} style={{ color: '#ef4444' }} />
            <span className="status-text">Fail</span>
          </div>
        )}

        {/* Interactive Score Adjustment Tools */}
        <div className="card-actions">
          <button
            className="btn-icon"
            title="Decrease Score (-5)"
            onClick={() => onUpdateScore(student.id, Math.max(0, student.score - 5))}
          >
            <MinusCircle size={16} />
          </button>
          <button
            className="btn-icon"
            title="Increase Score (+5)"
            onClick={() => onUpdateScore(student.id, Math.min(100, student.score + 5))}
          >
            <PlusCircle size={16} />
          </button>
          <button
            className="btn-icon delete"
            title="Remove Student"
            onClick={() => onDeleteStudent(student.id)}
            style={{ marginLeft: 'auto' }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
