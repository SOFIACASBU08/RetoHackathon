import { useState } from 'react';
import Login from './pages/Login/Login';
import Questionnaire from './pages/Questionnaire/Questionnaire';
import Results from './pages/Results/Results';
import './App.css';

export default function App() {
  const [page, setPage] = useState('login');
  const [answers, setAnswers] = useState({});

  return (
    <div className="app-container">
      {page === 'login' && (
        <Login onLoginSuccess={() => setPage('questionnaire')} />
      )}
      {page === 'questionnaire' && (
        <Questionnaire 
          onNavigate={setPage} 
          answers={answers} 
          setAnswers={setAnswers} 
        />
      )}
      {page === 'results' && (
        <Results 
          onNavigate={setPage} 
          answers={answers} 
          setAnswers={setAnswers} 
        />
      )}
    </div>
  );
}
