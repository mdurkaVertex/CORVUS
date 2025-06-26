import React from 'react';
import NodePalette from './NodePalette';
import '../components styles/Sidebar.css';

function Sidebar({ visible, onClose }) {
  return (
    <div className={`sidebar ${visible ? 'visible' : ''}`}>
      <div className="sidebar-header">
        <h3>Nodes</h3>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <div className="sidebar-content">
        <NodePalette />
      </div>
    </div>
  );
}

export default Sidebar;

