import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>LiveSphere Pro</h3>
        <ul>
          <li>Overview</li>
          <li>Analytics</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className="content">
        <h1>User Dashboard</h1>
        <div className="stats-grid">
          <div className="stat-card">Active Users: 1,204</div>
          <div className="stat-card">Server Status: Online</div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;