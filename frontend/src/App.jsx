import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChartComponent from './components/ChartComponent';
import RiskLegend from './components/RiskLegend';
import Reports from './components/Reports';
import ExportData from './components/ExportData';
import Login from './components/Login';
import Register from './components/Register';
import DetailedView from './components/DetailedView'; // Import the DetailedView component
import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

   fetch(`${import.meta.env.VITE_BACKEND_URL}/api/risks`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Data:', data)
        setData(data)
      }).catch(err => console.error('Failed to fetch risk data:', err));

    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 text-white">
        <header className="p-4 shadow-lg bg-white text-gray-800">
          <h1 className="text-4xl font-bold text-center">Risk Evaluation Dashboard</h1>
        </header>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details" element={<DetailedView />} /> {/* Add route for DetailedView */}
          {user ? (
            <Route path="/" element={
              <div className="container mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <section className="col-span-2">
                    <ChartComponent data={data} />
                  </section>
                  <aside className="bg-white text-gray-800 shadow-lg p-6 rounded-lg">
                    <RiskLegend />
                    <div className="mt-8">
                      <h2 className="text-2xl font-semibold">Reports & Export</h2>
                      <Reports data={data} />
                      <ExportData data={data} />
                    </div>
                  </aside>
                </div>
              </div>
            } />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
        </Routes>

        <footer className="p-4 text-center bg-white text-gray-600">
          © 2024 Risk Analysis Corp
        </footer>
      </div>
    </Router>
  );
}

export default App;
