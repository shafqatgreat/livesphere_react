import React , { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext'; // Note: Importing from the .js file

{ useContext, useState }
function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  // Get first letter of username for avatar
  const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';

  useEffect(() => {
    setTimeout(() => {
      setStats({
        revenue: "$23,569.00",
        sales: "3,435",
        customers: "1,245",
        bounce: "47.0%"
      });
    }, 1000);
  }, []);

  return (
    <div className="dashboard-grid">
      {/* PROFESSIONAL USER HEADER */}
      <header className="dashboard-header">
        <div className="user-profile">
          <div className="avatar">{userInitial}</div>
          <div className="welcome-text">
            <h1>Welcome back, {user?.username || 'CodingMavrick'}!</h1>
            <p>Here’s what’s happening with LiveSphere today.</p>
          </div>
        </div>
        <div className="header-actions">
           <span className="status-badge">Live System Active</span>
        </div>
      </header>

      {/* 1. Top Stats Row */}
      <section className="stats-row">
        <div className="stat-card green">
          <span>Revenue</span>
          <h2>{stats?.revenue || "..."}</h2>
          <small>↑ 12.5%</small>
        </div>
        {/* ... other cards remain the same ... */}
        <div className="stat-card purple">
          <span>Sales</span>
          <h2>{stats?.sales || "..."}</h2>
          <small>↑ 8.2%</small>
        </div>
        <div className="stat-card blue">
          <span>Customers</span>
          <h2>{stats?.customers || "..."}</h2>
          <small>↑ 5.1%</small>
        </div>
        <div className="stat-card orange">
          <span>Bounce Rate</span>
          <h2>{stats?.bounce || "..."}</h2>
          <small>↓ 2.4%</small>
        </div>
      </section>

      {/* 2. Middle Row: Analytics Placeholders */}
      <section className="main-stats">
        <div className="chart-container">
          <h3>Sales Overview</h3>
          <div className="mock-chart"></div>
        </div>
        <div className="traffic-container">
          <h3>Traffic Sources</h3>
          <div className="mock-pie"></div>
        </div>
      </section>
    </div>
  );
}


function Dashboard2() {
  // const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Concept: Fetching live data for the dashboard
    setTimeout(() => {
      setStats({
        revenue: "$23,569.00",
        sales: "3,435",
        customers: "1,245",
        bounce: "47.0%"
      });
    }, 1000);
  }, []);

  return (
    <div className="dashboard-grid">
      {/* 1. Top Stats Row */}
      <section className="stats-row">
        <div className="stat-card green">
          <span>Revenue</span>
          <h2>{stats?.revenue || "..."}</h2>
          <small>↑ 12.5%</small>
        </div>
        <div className="stat-card purple">
          <span>Sales</span>
          <h2>{stats?.sales || "..."}</h2>
          <small>↑ 8.2%</small>
        </div>
        <div className="stat-card blue">
          <span>Customers</span>
          <h2>{stats?.customers || "..."}</h2>
          <small>↑ 5.1%</small>
        </div>
        <div className="stat-card orange">
          <span>Bounce Rate</span>
          <h2>{stats?.bounce || "..."}</h2>
          <small>↓ 2.4%</small>
        </div>
      </section>

      {/* 2. Middle Row: Analytics Placeholders */}
      <section className="main-stats">
        <div className="chart-container">
          <h3>Sales Overview</h3>
          <div className="mock-chart"></div> {/* Future: Chart.js goes here */}
        </div>
        <div className="traffic-container">
          <h3>Traffic Sources</h3>
          <div className="mock-pie"></div>
        </div>
      </section>
    </div>
  );
}


function Dashboard1() {
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