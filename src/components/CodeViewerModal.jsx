import React from 'react';
import { X, Code2 } from 'lucide-react';

export default function CodeViewerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <Code2 size={22} style={{ color: '#818cf8' }} />
            Implementation Code Breakdown
          </h3>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p style={{ color: '#9ca3af', marginBottom: '1rem', fontSize: '0.9rem' }}>
          This component demonstrates <strong>List Rendering using .map()</strong> with unique <strong>key props</strong> and <strong>Conditional Rendering</strong> for student scores.
        </p>

        <div className="code-block">
          <span className="code-comment">// 1. Array of student objects with id, name, and score</span><br />
          <span className="code-keyword">const</span> students = [<br />
          &nbsp;&nbsp;&#123; <span className="code-var">id</span>: <span className="code-num">101</span>, <span className="code-var">name</span>: <span className="code-string">"Alexander Wright"</span>, <span className="code-var">score</span>: <span className="code-num">92</span> &#125;,<br />
          &nbsp;&nbsp;&#123; <span className="code-var">id</span>: <span className="code-num">102</span>, <span className="code-var">name</span>: <span className="code-string">"Sophia Martinez"</span>, <span className="code-var">score</span>: <span className="code-num">48</span> &#125;,<br />
          ];<br /><br />
          <span className="code-comment">// 2. Dynamic List Rendering with .map() & unique key</span><br />
          students.<span className="code-func">map</span>((student) =&gt; (<br />
          &nbsp;&nbsp;&lt;<span className="code-tag">div</span> <span className="code-var">key</span>=&#123;student.<span className="code-var">id</span>&#125;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-tag">h3</span>&gt;&#123;student.<span className="code-var">name</span>&#125;&lt;/<span className="code-tag">h3</span>&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-tag">p</span>&gt;Score: &#123;student.<span className="code-var">score</span>&#125;&lt;/<span className="code-tag">p</span>&gt;<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// 3. Conditional Rendering based on score &gt;= 50</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#123;student.<span className="code-var">score</span> &gt;= <span className="code-num">50</span> ? (<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-tag">span</span> <span className="code-var">style</span>=&#123;&#123; <span className="code-var">color</span>: <span className="code-string">'#10b981'</span> &#125;&#125;&gt;Pass&lt;/<span className="code-tag">span</span>&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;) : (<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-tag">span</span> <span className="code-var">style</span>=&#123;&#123; <span className="code-var">color</span>: <span className="code-string">'#ef4444'</span> &#125;&#125;&gt;Fail&lt;/<span className="code-tag">span</span>&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;)&#125;<br />
          &nbsp;&nbsp;&lt;/<span className="code-tag">div</span>&gt;<br />
          ))
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
