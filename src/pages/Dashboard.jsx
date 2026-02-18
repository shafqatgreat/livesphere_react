import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
// 1. Import Recharts components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 1. Add PieChart components to your Recharts import
import {   PieChart, Pie, Cell, Legend } from 'recharts';
// 2. Define colors for the slices (Use professional, muted tones)
const COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f87171'];

function Dashboard() {
  const { user } = useContext(AuthContext);
  
  // 1. We start stats as 'null' to handle the initial loading state
  const [stats, setStats] = useState(null);

  // NEW: State to store graph history (array of data points)
  const [graphData, setGraphData] = useState([]);

  const [trafficData, setTrafficData] = useState([
    { name: 'Direct', value: 400 },
    { name: 'Search', value: 300 },
    { name: 'Social', value: 300 },
    { name: 'Referral', value: 200 },
  ]);

  // Get first letter of username for the avatar
  const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';

  // 2. The Logic: Fetching data from our live Vercel Serverless Backend
  const fetchLiveStats = async () => {
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/stats');
      const data = await response.json();
      
      // Update our React state with the fresh numbers from the cloud
      setStats(data);
      
      //  NEW: Randomly shift traffic sources slightly to simulate live movement
      setTrafficData(prevData => prevData.map(source => ({
        ...source,
        // Add or subtract a small random amount to make the pie "dance"
        value: Math.max(50, source.value + (Math.floor(Math.random() * 21) - 10))
      })));


      // 3. NEW: Update graph data
      setGraphData((prevData) => {
        const newDataPoint = {
          time: data.timestamp.split(' ')[0], // Extract time from timestamp
          sales: parseInt(data.sales.replace(',', '')) // Convert string "3,435" to number
        };
        
        // Keep only the last 10 data points for a "rolling" effect
        const updatedData = [...prevData, newDataPoint];
        return updatedData.slice(-20); 
        // return updatedData; 
      });



    } catch (error) {
      console.error("Failed to fetch live stats:", error);
    }
  };



  useEffect(() => {
    /** * 4. THE FIX: Cascading Renders
     * We use a 0ms setTimeout for the initial call. 
     * This pushes the fetch request to the end of the execution queue, 
     * letting React finish the UI render first.
     */
    const initialFetch = setTimeout(() => {
      fetchLiveStats();
    }, 0);

    /** * 5. THE HEARTBEAT: 
     * We set up a timer to "poll" the API every 2 seconds.
     * This keeps the dashboard data moving like a stock exchange.
     */
    const intervalId = setInterval(() => {
      fetchLiveStats();
    }, 5000);

    /** * 6. THE CLEANUP:
     * This is crucial! We clear both the timeout and the interval
     * so they don't keep running if the user logs out or switches pages.
     */
    return () => {
      clearTimeout(initialFetch);
      clearInterval(intervalId);
    };
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
           {/* Visual cue to show the system is live */}
           <span className="status-badge live">● Live Feed Active</span>
        </div>
      </header>

      {/* 7. STATS SECTION: Using optional chaining (?.) to prevent crashes */}
      <section className="stats-row">
        <div className="stat-card green">
          <span>Revenue</span>
          <h2>{stats?.revenue || "..."}</h2>
          <small>Updated: {stats?.timestamp || "Syncing..."}</small>
        </div>
        
        <div className="stat-card purple">
          <span>Sales</span>
          <h2>{stats?.sales || "..."}</h2>
          <small>↑ Live Volume</small>
        </div>

        <div className="stat-card blue">
          <span>Customers</span>
          <h2>{stats?.customers || "..."}</h2>
          <small>Real-time Active</small>
        </div>

        <div className="stat-card orange">
          <span>Bounce Rate</span>
          <h2>{stats?.bounce || "..."}</h2>
          <small>Site Health</small>
        </div>
      </section>

      {/* 8. ANALYTICS PLACEHOLDERS */}
      <section className="main-stats">
        
        <div className="chart-container">
          <h3>Sales Overview (Live)</h3>
          <div className="chart-wrapper" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#818cf8" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 8 }} 
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>





        {/* 4. Traffic Sources Pie Chart (Right side) */}
        <div className="traffic-container">
          <h3>Traffic Sources</h3>
          <div className="chart-wrapper" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60} // Makes it a "Donut" chart (more modern)
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={800}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>





      </section>
    </div>
  );
}



function DashboardNormalv3() {
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