import React, { useState, useEffect } from 'react';
import './Questionnaire.css';

// Textos y configuraciones exactas de las imágenes suministradas.
const QUESTIONS = [
  {
    id: 1,
    category: "Política de datos personales",
    question: "¿Cuenta con una política de tratamiento de datos personales?",
    weight: "0-40%",
    explanation: "Una política de tratamiento de datos es un documento oficial donde la empresa declara qué datos recopila, para qué los usa, cómo los protege y cuáles son los derechos de las personas. Si tienes ese documento, responde Sí. Si no existe ningún texto escrito que lo describa, responde No."
  },
  {
    id: 2,
    category: "Política de datos personales",
    question: "¿La política está documentada y publicada en medio de fácil acceso?",
    weight: "10%",
    explanation: "No basta con tener la política guardada internamente: debe estar publicada donde cualquier persona interesada pueda consultarla fácilmente, por ejemplo en el sitio web de la empresa o en un aviso visible. Responde Sí si está publicada y accesible; No si solo existe en archivos internos o no está disponible."
  },
  {
    id: 3,
    category: "Política de datos personales",
    question: "¿Define las finalidades del tratamiento de datos?",
    weight: "10%",
    explanation: "La política debe explicar para qué exactamente se usan los datos: por ejemplo, para enviar facturas, hacer seguimiento de clientes o mejorar el servicio. Si la política especifica de forma clara estas finalidades, responde Sí. De lo contrario, responde No o Parcial si las menciona de forma muy general."
  },
  {
    id: 4,
    category: "Política de datos personales",
    question: "¿Incluye los derechos de los titulares?",
    weight: "10%",
    explanation: "Los titulares son las personas cuyos datos se manejan. La ley les otorga derechos: conocer qué datos tienen de ellos, corregirlos, actualizarlos o pedir que los eliminen. Si tu política contempla y detalla estos derechos, responde Sí. Si los nombra pero no los detalla, responde Parcial. Si no los menciona, responde No."
  },
  {
    id: 5,
    category: "Política de datos personales",
    question: "¿Menciona cómo ejercer los derechos de los titulares?",
    weight: "10%",
    explanation: "No solo se trata de nombrar los derechos: la política debe indicar cómo una persona puede ejercerlos, por ejemplo, a qué correo escribir, qué formulario llenar o a qué número llamar. Si existe esa información de contacto o proceso, responde Sí. Si no hay instrucciones claras, responde No."
  },
  {
    id: 6,
    category: "Privacidad desde el diseño",
    question: "¿Incorpora evaluaciones de impacto (Privacy Impact Assessments)?",
    weight: "12%",
    explanation: "Una evaluación de impacto (PIA) es un análisis que se hace antes de lanzar un sistema o proceso nuevo para identificar riesgos a la privacidad. Responde Sí si tu empresa realiza este tipo de análisis formal antes de implementar nuevos proyectos que involucren datos. Si nunca se ha hecho o no existe un procedimiento para ello, responde No."
  },
  {
    id: 7,
    category: "Privacidad desde el diseño",
    question: "¿Aplica técnicas de minimización de datos?",
    weight: "12%",
    explanation: "Minimizar datos significa recopilar solo lo estrictamente necesario para cumplir el objetivo, sin pedir información extra. Por ejemplo, si para enviar un pedido solo necesitas dirección y teléfono, no pedir fecha de nacimiento. Responde Sí si tu empresa revisa y limita los datos que solicita. Si se recoge todo lo posible sin filtro, responde No."
  },
  {
    id: 8,
    category: "Privacidad desde el diseño",
    question: "¿Configura sus sistemas para recopilar el mínimo de datos por defecto?",
    weight: "12%",
    explanation: "Esto va más allá de la intención: los sistemas deben estar técnicamente configurados para recoger solo los datos mínimos desde el inicio, sin que el usuario tenga que hacer ajustes. Por ejemplo, que los formularios no tengan campos opcionales marcados por defecto. Responde Sí si los sistemas están así configurados; No si no se ha revisado esa configuración."
  },
  {
    id: 9,
    category: "Gobernanza",
    question: "¿Cuenta con un sistema de administración de riesgos?",
    weight: "16%",
    explanation: "Un sistema de administración de riesgos es un proceso formal para identificar, evaluar y gestionar los riesgos que podrían afectar la privacidad de los datos. Incluye registros, responsables y planes de acción ante incidentes. Responde Sí si existe ese proceso documentado. Si los riesgos se manejan de manera informal o no existe un proceso establecido, responde No."
  },
  {
    id: 10,
    category: "Gobernanza",
    question: "¿Cuenta con un oficial de protección de datos personales?",
    weight: "8%",
    explanation: "El oficial de protección de datos (DPO, por sus siglas en inglés) es la persona encargada de velar por el cumplimiento de las normas de privacidad dentro de la organización. Puede ser un empleado o un cargo externo contratado. Responde Sí si existe alguien con esa función asignada; No si nadie tiene esa responsabilidad definida."
  },
  {
    id: 11,
    category: "Gobernanza",
    question: "¿Está designado formalmente?",
    weight: "—",
    explanation: "Esta pregunta complementa la anterior: no solo debe existir un oficial de protección de datos, sino que su nombramiento debe constar por escrito, por ejemplo en un contrato, resolución interna o acta. Responde Sí si hay un documento que lo acredite formalmente. Si el rol existe pero no está formalizado en ningún documento, responde No. Complementaria - no suma al total."
  }
];

export default function Questionnaire({ onNavigate, answers, setAnswers }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-fill daughters if parents are 'No'
  const handleAnswer = (questionId, value) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    
    if (questionId === 1 && value === 'No') {
      updatedAnswers[2] = 'No';
      updatedAnswers[3] = 'No';
      updatedAnswers[4] = 'No';
      updatedAnswers[5] = 'No';
    }
    if (questionId === 10 && value === 'No') {
      updatedAnswers[11] = 'No';
    }

    setAnswers(updatedAnswers);

    // Auto-advance with visual delay
    setTimeout(() => {
      const nextIdx = getNextIndex(currentIndex, updatedAnswers);
      if (nextIdx < QUESTIONS.length) {
        setCurrentIndex(nextIdx);
      }
    }, 250);
  };

  const getNextIndex = (index, currentAnswers) => {
    if (index === 0 && currentAnswers[1] === 'No') {
      return 5; // Skip Q2-Q5, go to Q6
    }
    if (index === 9 && currentAnswers[10] === 'No') {
      return 11; // Finished
    }
    return index + 1;
  };

  const getPrevIndex = (index, currentAnswers) => {
    if (index === 5 && currentAnswers[1] === 'No') {
      return 0; // Go back to Q1
    }
    if (index === 10 && currentAnswers[10] === 'No') {
      return 9; // Go back to Q10
    }
    return index - 1;
  };

  const handlePrev = () => {
    const prevIdx = getPrevIndex(currentIndex, answers);
    if (prevIdx >= 0) {
      setCurrentIndex(prevIdx);
    }
  };

  const handleNext = () => {
    const nextIdx = getNextIndex(currentIndex, answers);
    if (nextIdx < QUESTIONS.length) {
      setCurrentIndex(nextIdx);
    }
  };

  // Progress metrics
  const getCategoryProgress = (categoryName) => {
    const categoryQuestions = QUESTIONS.filter(q => q.category === categoryName);
    const answeredCount = categoryQuestions.filter(q => answers[q.id] !== undefined && answers[q.id] !== null).length;
    return `${answeredCount}/${categoryQuestions.length}`;
  };

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined && answers[q.id] !== null);

  return (
    <div className="questionnaire-layout">
      {/* Top Header Section */}
      <div className="questionnaire-header">
        <h2 className="questionnaire-title">Pregunta {currentIndex + 1} de {totalQuestions}</h2>
        
        {/* Floating Category Progress Indicator */}
        <div className="progress-tracker">
          <div className="progress-item">
            <span className="dot-indicator blue"></span>
            <span className="progress-label">Política de datos personales:</span>
            <span className="progress-value">{getCategoryProgress("Política de datos personales")}</span>
          </div>
          <div className="progress-item">
            <span className="dot-indicator gold"></span>
            <span className="progress-label">Privacidad desde el diseño:</span>
            <span className="progress-value">{getCategoryProgress("Privacidad desde el diseño")}</span>
          </div>
          <div className="progress-item">
            <span className="dot-indicator teal"></span>
            <span className="progress-label">Gobernanza:</span>
            <span className="progress-value">{getCategoryProgress("Gobernanza")}</span>
          </div>
        </div>
      </div>

      {/* Main Card Carousel / Stack Section */}
      <div className="card-carousel-container">
        
        {/* Navigation Arrow Left */}
        <button 
          className="nav-arrow left" 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          aria-label="Pregunta anterior"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
          </svg>
        </button>

        {/* Stack of Cards (3D Effect) */}
        <div className="stack-wrapper">
          
          {/* Third background card (Furthest) */}
          <div className="bg-card card-depth-2"></div>
          
          {/* Second background card (Middle) */}
          <div className="bg-card card-depth-1"></div>
          
          {/* Foreground main card */}
          <div className="main-question-card">
            
            {/* Card Category Header */}
            <div className="card-category-banner">
              <span className="category-text">{currentQuestion.category.toUpperCase()}</span>
              <span className="weight-badge">Peso: {currentQuestion.weight}</span>
            </div>

            {/* Question Text */}
            <div className="question-text-container">
              <p className="question-text">{currentQuestion.question}</p>
            </div>

            {/* Options Buttons - Diamond layout */}
            <div className="options-diamonds-container">
              
              <button 
                type="button" 
                className={`diamond-btn no ${answers[currentQuestion.id] === 'No' ? 'active' : ''}`}
                onClick={() => handleAnswer(currentQuestion.id, 'No')}
              >
                <div className="diamond-content">No</div>
              </button>

              <button 
                type="button" 
                className={`diamond-btn parcial ${answers[currentQuestion.id] === 'Parcial' ? 'active' : ''}`}
                onClick={() => handleAnswer(currentQuestion.id, 'Parcial')}
              >
                <div className="diamond-content">Parcial</div>
              </button>

              <button 
                type="button" 
                className={`diamond-btn si ${answers[currentQuestion.id] === 'Sí' ? 'active' : ''}`}
                onClick={() => handleAnswer(currentQuestion.id, 'Sí')}
              >
                <div className="diamond-content">Sí</div>
              </button>

            </div>

            {/* Explanation box at the bottom */}
            <div className="explanation-box">
              <h4 className="explanation-title">EXPLICACIÓN</h4>
              <p className="explanation-text">{currentQuestion.explanation}</p>
            </div>
            
          </div>
        </div>

        {/* Navigation Arrow Right */}
        <button 
          className="nav-arrow right" 
          onClick={handleNext}
          disabled={isLastQuestion}
          aria-label="Siguiente pregunta"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
          </svg>
        </button>

      </div>

      {/* Footer controls */}
      <div className="questionnaire-footer">
        <button className="back-to-menu-btn" onClick={() => onNavigate('login')}>
          Regresar
        </button>
        
        {allAnswered && (
          <button className="results-btn-primary" onClick={() => onNavigate('results')}>
            Ver Resultados
            <svg viewBox="0 0 24 24" width="18" height="18" style={{marginLeft: '8px'}}>
              <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21 12l-8.15-8.15-1.42 1.42 5.43 5.43H5v2z" fill="currentColor"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
