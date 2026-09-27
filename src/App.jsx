import React, { useState } from 'react';
import StudentCard from './components/StudentCard';
import AddStudentModal from './components/AddStudentModal';
import CodeViewerModal from './components/CodeViewerModal';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Award, 
  Search, 
  Plus, 
  Code, 
  RotateCcw,
  Sparkles,
  KeyRound,
  Filter
} from 'lucide-react';

// Initial array of student objects containing id, name, and score
const INITIAL_STUDENTS = [
  { id: 101, name: "Alexander Wright", score: 92 },
  { id: 102, name: "Sophia Martinez", score: 48 },
  { id: 103, name: "Ethan Vance", score: 75 },
  { id: 104, name: "Olivia Chen", score: 42 },
  { id: 105, name: "Marcus Johnson", score: 88 },
  { id: 106, name: "Emily Watson", score: 35 },
  { id: 107, name: "Liam O'Connor", score: 50 },
  { id: 108, name: "Zoe Patel", score: 64 },
];

export default function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [filter, setFilter] = useState('all'); // 'all', 'pass', 'fail'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id'); // 'id', 'name', 'score-desc', 'score-asc'
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Score Updater handler
  const handleUpdateScore = (id, newScore) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, score: newScore } : student
      )
    );
  };

  // Delete Student handler
  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  // Add Student handler
  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  // Reset to initial data
  const handleResetData = () => {
    setStudents(INITIAL_STUDENTS);
    setSearchQuery('');
    setFilter('all');
  };

  // Calculated Stats
  const totalStudents = students.length;
  const passedStudents = students.filter((s) => s.score >= 50);
  const failedStudents = students.filter((s) => s.score < 50);
  const passCount = passedStudents.length;
  const failCount = failedStudents.length;
  
  const avgScore = totalStudents > 0
    ? (students.reduce((acc, s) => acc + s.score, 0) / totalStudents).toFixed(1)
    : 0;

  const passRate = totalStudents > 0 
    ? Math.round((passCount / totalStudents) * 100) 
    : 0;

  // Filtered & Sorted Student List for Rendering
  const filteredStudents = students
    .filter((student) => {
      // Filter by pass/fail status
      if (filter === 'pass' && student.score < 50) return false;
      if (filter === 'fail' && student.score >= 50) return false;

      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesId = String(student.id).includes(query);
        return matchesName || matchesId;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'score-desc') return b.score - a.score;
      if (sortBy === 'score-asc') return a.score - b.score;
      return a.id - b.id;
    });

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-badge">
          <Sparkles size={14} /> Task 3: List & Conditional Rendering
        </div>
        <h1 className="header-title">Student Performance Portal</h1>
        <p className="header-subtitle">
          Dynamic list rendering with React <code style={{ color: '#818cf8', fontFamily: 'monospace' }}>.map()</code>, unique key props, and instant conditional Pass/Fail evaluation based on score threshold (score &ge; 50).
        </p>
      </header>

      {/* Requirement Banner */}
      <div className="req-banner">
        <div className="req-items">
          <div className="req-pill">
            <span>List Method:</span> <code>Array.map()</code>
          </div>
          <div className="req-pill">
            <span>Unique Key:</span> <code>key=&#123;student.id&#125;</code>
          </div>
          <div className="req-pill pass">
            <span>Pass Threshold:</span> <code>score &ge; 50</code>
          </div>
          <div className="req-pill fail">
            <span>Fail Threshold:</span> <code>score &lt; 50</code>
          </div>
        </div>

        <button className="btn-secondary" onClick={() => setIsCodeModalOpen(true)}>
          <Code size={16} /> View Code Logic
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{totalStudents}</div>
            <div className="stat-label">Total Enrolled</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{passCount}</div>
            <div className="stat-label">Passed (&ge; 50)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">
            <XCircle size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{failCount}</div>
            <div className="stat-label">Failed (&lt; 50)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{avgScore}</div>
            <div className="stat-label">Class Average ({passRate}% Pass Rate)</div>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search, Filter Tabs, Add Student */}
      <div className="controls-bar">
        <div className="search-box">
          <Search />
          <input
            type="text"
            className="search-input"
            placeholder="Search student by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({totalStudents})
          </button>
          <button
            className={`filter-btn ${filter === 'pass' ? 'active pass-active' : ''}`}
            onClick={() => setFilter('pass')}
          >
            Pass ({passCount})
          </button>
          <button
            className={`filter-btn ${filter === 'fail' ? 'active fail-active' : ''}`}
            onClick={() => setFilter('fail')}
          >
            Fail ({failCount})
          </button>
        </div>

        <div className="action-tools">
          <select
            className="search-input"
            style={{ width: 'auto', paddingLeft: '0.75rem', cursor: 'pointer' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="score-desc">Score: High to Low</option>
            <option value="score-asc">Score: Low to High</option>
          </select>

          <button className="btn-secondary" title="Reset Initial Data" onClick={handleResetData}>
            <RotateCcw size={16} />
          </button>

          <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} /> Add Student
          </button>
        </div>
      </div>

      {/* Main Student List Rendering using .map() with unique key props */}
      {filteredStudents.length > 0 ? (
        <div className="students-grid">
          {filteredStudents.map((student) => (
            /* Requirement: Dynamic rendering with .map() using unique key props */
            <StudentCard
              key={student.id}
              student={student}
              onUpdateScore={handleUpdateScore}
              onDeleteStudent={handleDeleteStudent}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Filter className="empty-icon" />
          <h3>No Students Found</h3>
          <p style={{ marginTop: '0.5rem' }}>
            No student match your current search query or filter selection.
          </p>
          <button className="btn-secondary" style={{ marginTop: '1.25rem' }} onClick={handleResetData}>
            Reset Filters
          </button>
        </div>
      )}

      {/* Educational Note on Key Props */}
      <div className="key-prop-info">
        <h4 className="key-prop-title">
          <KeyRound size={18} /> Why Key Props Matter in List Rendering
        </h4>
        <p className="key-prop-desc">
          When rendering lists with <code style={{ color: '#c7d2fe' }}>.map()</code>, assigning a unique <code style={{ color: '#c7d2fe' }}>key</code> prop (like <code style={{ color: '#c7d2fe' }}>student.id</code>) allows React to identify which items have changed, been added, or removed. This optimizes DOM re-rendering and maintains state consistency across updates.
        </p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Task 3: List Rendering & Conditional Rendering &bull; React State & Array Mapping</p>
      </footer>

      {/* Modals */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStudent={handleAddStudent}
      />

      <CodeViewerModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
