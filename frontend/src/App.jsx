import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChartComponent from './components/ChartComponent';
import RiskLegend from './components/RiskLegend';
import Reports from './components/Reports';
import ExportData from './components/ExportData';
import Login from './components/Login';
import Register from './components/Register';
import DetailedView from './components/DetailedView';
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

    fetch('http://localhost:5000/api/risks')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Data:', data);
        setData(data);
      })
      .catch(err => console.error('Failed to fetch risk data:', err));

    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 text-gray-800">
        <header className="p-6 shadow-lg bg-white rounded-b-lg sticky top-0 z-50">
          <h1 className="text-4xl font-bold text-center">Risk Evaluation Dashboard</h1>
        </header>

        <main className="container mx-auto p-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details" element={<DetailedView />} />
            {user ? (
              <Route path="/" element={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <section className="col-span-2 bg-white rounded-lg shadow-md p-6">
                    <ChartComponent data={data} />
                  </section>
                  <aside className="bg-white text-gray-800 shadow-md rounded-lg p-6">
                    <RiskLegend />
                    <div className="mt-8">
                      <h2 className="text-2xl font-semibold">Reports & Export</h2>
                      <Reports data={data} />
                      <ExportData data={data} />
                    </div>
                  </aside>
                </div>
              } />
            ) : (
              <Route path="/" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>

        <footer className="sticky bottom-0 p-4 text-center bg-white text-gray-600 shadow-inner z-50">
          © 2024 Risk Analysis Corp
        </footer>
      </div>
    </Router>
  );
}

export default App;
