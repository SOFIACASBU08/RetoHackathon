import React, { useState } from 'react';
import './Results.css';

// Mapeo de recomendaciones y brechas por pregunta para los modales y PDF
const RECOMENDACIONES_DATA = {
  1: { gap: "No cuenta con una política formal de tratamiento de datos personales.", rec: "Diseñar, documentar y formalizar una política de tratamiento de datos personales de acuerdo con la Ley 1581 de 2012.", priority: "Alta" },
  2: { gap: "La política de tratamiento de datos no se encuentra publicada o documentada en medios de fácil acceso.", rec: "Publicar la política en la página web oficial y habilitar avisos de privacidad visibles.", priority: "Alta" },
  3: { gap: "La política no define con claridad las finalidades para las que se tratan los datos personales.", rec: "Actualizar la política especificando detalladamente los propósitos de la recolección de información.", priority: "Media" },
  4: { gap: "No se contemplan de forma completa los derechos de los titulares de la información en la política.", rec: "Incorporar explícitamente en la política los derechos de consulta, reclamo y supresión de datos.", priority: "Media" },
  5: { gap: "Falta establecer o documentar el procedimiento y canales para que los titulares ejerzan sus derechos.", rec: "Definir canales claros (correo, línea telefónica) y un proceso interno con tiempos de respuesta.", priority: "Alta" },
  6: { gap: "No se realizan evaluaciones de impacto a la privacidad (PIA) en nuevos proyectos o sistemas.", rec: "Establecer un procedimiento obligatorio para realizar evaluaciones de impacto antes de implementar sistemas.", priority: "Media" },
  7: { gap: "No se aplican de forma sistemática técnicas de minimización de datos en la recolección.", rec: "Revisar los formularios de captura y bases de datos para eliminar campos redundantes.", priority: "Baja" },
  8: { gap: "Los sistemas de información no están configurados para recopilar el mínimo de datos por defecto.", rec: "Ajustar las configuraciones por defecto en sistemas para no marcar casillas de aceptación automáticas.", priority: "Media" },
  9: { gap: "No existe un sistema estructurado de administración de riesgos asociados al tratamiento de datos.", rec: "Implementar una matriz de riesgos de privacidad de datos y plan de respuesta a incidentes.", priority: "Alta" },
  10: { gap: "La empresa no cuenta con un oficial o área responsable de la protección de datos personales.", rec: "Designar internamente o contratar un Oficial de Protección de Datos (DPO).", priority: "Alta" },
  11: { gap: "El nombramiento del oficial de protección de datos no está formalizado por escrito.", rec: "Elaborar un acta de designación formal o resolución interna detallando sus funciones.", priority: "Media" }
};

const QUESTIONS_TEXT = {
  1: "¿Cuenta con una política de tratamiento de datos personales?",
  2: "¿La política está documentada y publicada en medio de fácil acceso?",
  3: "¿Define las finalidades del tratamiento de datos?",
  4: "¿Incluye los derechos de los titulares?",
  5: "¿Menciona cómo ejercer los derechos de los titulares?",
  6: "¿Incorpora evaluaciones de impacto (Privacy Impact Assessments)?",
  7: "¿Aplica técnicas de minimización de datos?",
  8: "¿Configura sus sistemas para recopilar el mínimo de datos por defecto?",
  9: "¿Cuenta con un sistema de administración de riesgos?",
  10: "¿Cuenta con un oficial de protección de datos personales?",
  11: "¿Está designado formalmente?"
};

export default function Results({ onNavigate, answers, setAnswers }) {
  const [activeModal, setActiveModal] = useState(null); // 'recomendaciones' | 'plan' | null

  // --- SCORE CALCULATION LOGIC ---
  const getQScoreVal = (qId, weight) => {
    const ans = answers[qId];
    if (ans === 'Sí') return weight;
    if (ans === 'Parcial') return weight * 0.5;
    return 0;
  };

  // 1. Política de datos personales (max 40%)
  const q2Val = getQScoreVal(2, 10);
  const q3Val = getQScoreVal(3, 10);
  const q4Val = getQScoreVal(4, 10);
  const q5Val = getQScoreVal(5, 10);
  const sumDaughters = q2Val + q3Val + q4Val + q5Val;

  let policyScore = 0;
  if (answers[1] === 'Sí') {
    policyScore = sumDaughters;
  } else if (answers[1] === 'Parcial') {
    policyScore = sumDaughters * 0.5;
  } else {
    policyScore = 0;
  }

  // 2. Privacidad desde el diseño (max 36%)
  const q6Val = getQScoreVal(6, 12);
  const q7Val = getQScoreVal(7, 12);
  const q8Val = getQScoreVal(8, 12);
  const privacyScore = q6Val + q7Val + q8Val;

  // 3. Gobernanza (max 24%)
  const q9Val = getQScoreVal(9, 16);
  const q10Val = getQScoreVal(10, 8);
  const governanceScore = q9Val + q10Val;

  // Overall Score
  const totalScore = Math.min(100, Math.round((policyScore + privacyScore + governanceScore) * 10) / 10);

  // Convert to percentages of category (for Radar Chart)
  const policyPercent = Math.round((policyScore / 40) * 100) || 0;
  const privacyPercent = Math.round((privacyScore / 36) * 100) || 0;
  const governancePercent = Math.round((governanceScore / 24) * 100) || 0;

  // Brechas percentage
  const gapsPercent = 100 - totalScore;

  // Previous comparison
  const prevScore = 45;
  const improvement = Math.round((totalScore - prevScore) * 10) / 10;
  const sign = improvement >= 0 ? '+' : '';
  const improvementColorClass = improvement >= 0 ? 'text-green' : 'text-red';

  // Gather lists of gaps and recommendations
  const gapsList = [];
  Object.keys(RECOMENDACIONES_DATA).forEach((qIdStr) => {
    const qId = parseInt(qIdStr);
    const ans = answers[qId];
    if (ans === 'No' || ans === 'Parcial') {
      gapsList.push({
        id: qId,
        question: QUESTIONS_TEXT[qId],
        answer: ans,
        gapText: RECOMENDACIONES_DATA[qId].gap,
        recText: RECOMENDACIONES_DATA[qId].rec,
        priority: RECOMENDACIONES_DATA[qId].priority,
        category: qId <= 5 ? "Política de datos personales" : (qId <= 8 ? "Privacidad desde el diseño" : "Gobernanza")
      });
    }
  });

  // Radar Chart Grid & Polygon Math
  const cx = 90;
  const cy = 95;
  const r = 52;

  // Angles for Top (Política), Bottom-Right (Privacidad), Bottom-Left (Gobernanza)
  const angle1 = -Math.PI / 2; // -90 deg
  const angle2 = Math.PI / 6;  // 30 deg
  const angle3 = 5 * Math.PI / 6; // 150 deg

  const getX = (angle, scale) => cx + r * scale * Math.cos(angle);
  const getY = (angle, scale) => cy + r * scale * Math.sin(angle);

  // Active polygon points
  const pX1 = getX(angle1, policyPercent / 100);
  const pY1 = getY(angle1, policyPercent / 100);
  const pX2 = getX(angle2, privacyPercent / 100);
  const pY2 = getY(angle2, privacyPercent / 100);
  const pX3 = getX(angle3, governancePercent / 100);
  const pY3 = getY(angle3, governancePercent / 100);

  // Download PDF Report
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <html>
        <head>
          <title>Reporte de Diagnóstico Ley 1581 - Cavaltec</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; padding: 40px; line-height: 1.6; }
            .header { text-align: center; border-bottom: 3px solid #0d3578; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #0d3578; }
            .subtitle { color: #f39c12; font-size: 14px; font-weight: bold; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.1em; }
            .title { font-size: 22px; margin-top: 15px; color: #0d3578; font-weight: 800; }
            .score-box { background: #f1f5f9; border-radius: 8px; padding: 25px; margin-bottom: 35px; display: flex; justify-content: space-around; align-items: center; border: 1px solid #cbd5e1; }
            .score-num { font-size: 52px; font-weight: 900; color: #0d3578; line-height: 1; }
            .score-label { font-size: 14px; font-weight: bold; color: #475569; margin-top: 5px; }
            .level-badge { padding: 6px 16px; border-radius: 20px; color: white; font-weight: 800; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase; }
            .level-GOOD { background: #10b981; }
            .level-ATTENTION { background: #f39c12; }
            .level-POOR { background: #ef4444; }
            .section-title { font-size: 18px; color: #0d3578; border-bottom: 2px solid #0d3578; padding-bottom: 8px; margin-top: 35px; margin-bottom: 15px; font-weight: 800; }
            .category-row { display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 8px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 4px; }
            .gap-card { border: 1px solid #e2e8f0; border-left: 5px solid #ef4444; border-radius: 8px; padding: 18px; margin-bottom: 18px; background: #fafafa; }
            .gap-card.parcial { border-left-color: #f39c12; }
            .gap-header { display: flex; justify-content: space-between; font-weight: 800; color: #0d3578; font-size: 14px; margin-bottom: 8px; }
            .gap-label { font-size: 11px; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; color: #fff; }
            .label-No { background: #ef4444; }
            .label-Parcial { background: #f39c12; }
            .gap-text { color: #b91c1c; font-size: 13px; margin: 6px 0; background: #fff5f5; padding: 8px 12px; border-radius: 4px; border: 1px solid #fee2e2; }
            .gap-rec { color: #047857; font-size: 13px; margin: 6px 0; font-weight: 550; background: #ecfdf5; padding: 8px 12px; border-radius: 4px; border: 1px solid #d1fae5; }
            .footer { text-align: center; margin-top: 60px; font-size: 11px; color: #94a3b8; border-top: 1px solid #cbd5e1; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🛡️ CAVALTEC</div>
            <div class="subtitle">Ciberseguridad y TI</div>
            <div class="title">Reporte de Cumplimiento Diagnóstico Ley 1581</div>
            <div style="font-size: 12px; margin-top: 5px; color: #64748b;">Generado el: ${new Date().toLocaleDateString()}</div>
          </div>
          
          <div class="score-box">
            <div>
              <div class="score-num">${totalScore}%</div>
              <div class="score-label">Porcentaje de Cumplimiento Global</div>
            </div>
            <div>
              <span class="level-badge level-${totalScore >= 80 ? 'GOOD' : (totalScore >= 50 ? 'ATTENTION' : 'POOR')}">${totalScore >= 80 ? 'GOOD' : (totalScore >= 50 ? 'ATTENTION' : 'POOR')}</span>
            </div>
          </div>
          
          <div class="section-title">Resultados por Categoría</div>
          <div class="category-row">
            <span>Política de datos personales (Preguntas 1-5):</span>
            <span>${policyScore}% / 40% (${policyPercent}% de logro)</span>
          </div>
          <div class="category-row">
            <span>Privacidad desde el diseño (Preguntas 6-8):</span>
            <span>${privacyScore}% / 36% (${privacyPercent}% de logro)</span>
          </div>
          <div class="category-row">
            <span>Gobernanza (Preguntas 9-11):</span>
            <span>${governanceScore}% / 24% (${governancePercent}% de logro)</span>
          </div>
          
          <div class="section-title">Brechas Abiertas y Recomendaciones</div>
          ${gapsList.length === 0 ? `
            <p style="color: #10b981; font-weight: bold;">¡Felicitaciones! No se detectaron brechas en este diagnóstico. El cumplimiento es total.</p>
          ` : gapsList.map(gap => `
            <div class="gap-card ${gap.answer === 'Parcial' ? 'parcial' : ''}">
              <div class="gap-header">
                <span>Pregunta ${gap.id}: ${gap.question}</span>
                <span class="gap-label label-${gap.answer}">${gap.answer}</span>
              </div>
              <div class="gap-text"><strong>Brecha Hallada:</strong> ${gap.gapText}</div>
              <div class="gap-rec"><strong>Acción Recomendada:</strong> ${gap.recText}</div>
            </div>
          `).join('')}
          
          <div class="footer">
            Cavaltec Ciberseguridad y TI - Diagnóstico y Consultoría de Privacidad y Protección de Datos Personales.
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  const handleRestart = () => {
    setAnswers({});
    onNavigate('questionnaire');
  };

  return (
    <div className="grey-dashboard-wrapper">
      
      {/* Top title */}
      <h1 className="db-main-title">DASHBOARD</h1>

      {/* Main grey panel card (matches user image wrapper) */}
      <div className="db-grey-panel">
        
        {/* Row 1, Card 1: Porcentajes */}
        <section className="db-white-card card-grid-radar">
          <h2 className="db-card-title-centered">Porcentajes</h2>
          <div className="db-radar-chart-wrap">
            <svg viewBox="0 0 180 180" className="db-radar-svg">
              {/* Concentric grid circles (Matches user sketch grid circles) */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale) => (
                <circle 
                  key={scale}
                  cx={cx}
                  cy={cy}
                  r={r * scale}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="0.8"
                />
              ))}

              {/* Axis grid lines */}
              <line x1={cx} y1={cy} x2={getX(angle1, 1)} y2={getY(angle1, 1)} stroke="#cbd5e1" strokeWidth="1" />
              <line x1={cx} y1={cy} x2={getX(angle2, 1)} y2={getY(angle2, 1)} stroke="#cbd5e1" strokeWidth="1" />
              <line x1={cx} y1={cy} x2={getX(angle3, 1)} y2={getY(angle3, 1)} stroke="#cbd5e1" strokeWidth="1" />

              {/* Active filled polygon */}
              <polygon 
                points={`${pX1},${pY1} ${pX2},${pY2} ${pX3},${pY3}`} 
                fill="rgba(59, 130, 246, 0.3)" 
                stroke="#2563eb" 
                strokeWidth="2" 
              />

              {/* Dot points */}
              <circle cx={pX1} cy={pY1} r="3.5" fill="#1d3557" />
              <circle cx={pX2} cy={pY2} r="3.5" fill="#457b9d" />
              <circle cx={pX3} cy={pY3} r="3.5" fill="#1d3557" />

              {/* Labels */}
              <text x={cx} y={getY(angle1, 1) - 5} textAnchor="middle" className="db-radar-lbl">Política de datos personales</text>
              <text x={getX(angle2, 1) + 4} y={getY(angle2, 1) + 6} textAnchor="start" className="db-radar-lbl">Privacidad desde el diseño</text>
              <text x={getX(angle3, 1) - 4} y={getY(angle3, 1) + 6} textAnchor="end" className="db-radar-lbl">Gobernanza</text>
            </svg>
          </div>
        </section>

        {/* Row 1, Card 2: Storage Capacity (Gauge Chart) */}
        <section className="db-white-card card-grid-gauge">
          <h2 className="db-card-title-centered">Storage Capacity</h2>
          <div className="db-gauge-chart-wrap">
            <svg viewBox="0 0 200 120" className="db-gauge-svg">
              {/* Background Arc */}
              <path 
                d="M 30,105 A 65,65 0 0,1 170,105" 
                fill="none" 
                stroke="#f1f5f9" 
                strokeWidth="18" 
                strokeLinecap="round" 
              />
              {/* Active Arc */}
              <path 
                d="M 30,105 A 65,65 0 0,1 170,105" 
                fill="none" 
                stroke="#2563eb" 
                strokeWidth="18" 
                strokeLinecap="round" 
                strokeDasharray="204" 
                strokeDashoffset={204 - (totalScore / 100) * 204} 
                className="db-gauge-fill-arc"
              />
              {/* Needle/pin */}
              <circle cx="100" cy="105" r="4.5" fill="#0f172a" />
              {/* Needle pointer */}
              {(() => {
                const angleRad = Math.PI - (totalScore / 100) * Math.PI;
                const nx = 100 + 55 * Math.cos(angleRad);
                const ny = 105 - 55 * Math.sin(angleRad);
                return <line x1="100" y1="105" x2={nx} y2={ny} stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />;
              })()}
            </svg>
            <div className="db-gauge-score-overlay">
              <span className="db-gauge-score-value">{totalScore}/100</span>
            </div>
            <div className="db-gauge-legends">
              <span className="db-leg-item"><span className="db-leg-color blue"></span> Used</span>
              <span className="db-leg-item"><span className="db-leg-color grey"></span> Available</span>
            </div>
          </div>
        </section>

        {/* Row 1, Card 3: Comparación con diagnósticos anteriores */}
        <section className="db-white-card card-grid-comparison">
          <h2 className="db-card-title-left">Comparación con diagnósticos anteriores</h2>
          <div className="db-comparison-body">
            <div className="db-comparison-values">
              <span className="db-comp-val-old">{prevScore}%</span>
              <span className="db-comp-val-sep">/</span>
              <span className="db-comp-val-new">{totalScore}%</span>
            </div>
            <div className={`db-comparison-difference ${improvementColorClass}`}>
              {sign}{improvement}%
            </div>
          </div>
        </section>

        {/* Row 2, Card 4: KPIs Container (Left) */}
        <div className="db-kpis-vertical-container">
          
          {/* Subcard 1: Estado de cumplimiento */}
          <div className="db-kpi-subcard">
            <div className="db-kpi-left">
              <span className="db-kpi-top-flow">Transfer flow</span>
              <span className="db-kpi-score-big">{totalScore}%</span>
              <span className="db-kpi-pill green">GOOD</span>
            </div>
            <div className="db-kpi-right">
              Estado de cumplimiento
            </div>
          </div>

          {/* Subcard 2: Brechas o qué mejorar */}
          <div className="db-kpi-subcard">
            <div className="db-kpi-left">
              <span className="db-kpi-top-flow">Request flow</span>
              <span className="db-kpi-score-big">{gapsPercent}%</span>
              <span className="db-kpi-pill orange">ATTENTION!</span>
            </div>
            <div className="db-kpi-right">
              Brechas o qué mejorar
            </div>
          </div>

        </div>

        {/* Row 2, Card 5: AI reports panel (Spans columns 2 and 3) */}
        <section className="db-white-card card-grid-ai-reports">
          <header className="db-ai-card-header">
            <h2 className="db-ai-title">AI reports</h2>
            <div className="db-ai-copy-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </div>
          </header>

          <div className="db-ai-actions-flex">
            
            {/* Recommendation Circle Button */}
            <button 
              type="button" 
              className="db-ai-circle-action" 
              onClick={() => setActiveModal('recomendaciones')}
            >
              <div className="db-circle-btn-wrap">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <span className="db-circle-lbl-text">Recomendaciones con IA</span>
            </button>

            {/* Custom Plan Circle Button */}
            <button 
              type="button" 
              className="db-ai-circle-action" 
              onClick={() => setActiveModal('plan')}
            >
              <div className="db-circle-btn-wrap">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="18" x2="20" y2="18"/>
                </svg>
              </div>
              <span className="db-circle-lbl-text">Plan de mejora Personalizado</span>
            </button>

            {/* Download Report Circle Button */}
            <button 
              type="button" 
              className="db-ai-circle-action" 
              onClick={handleDownloadPDF}
            >
              <div className="db-circle-btn-wrap">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <span className="db-circle-lbl-text">Descargar reportes</span>
            </button>

          </div>
        </section>

        {/* Row 3: Footer bar with Regresar button (inside the grey box) */}
        <footer className="db-footer-row">
          <button type="button" className="db-flat-back-btn" onClick={handleRestart}>
            Regresar
          </button>
        </footer>

      </div>

      {/* --- OVERLAY MODALS --- */}
      
      {/* Modal 1: Recomendaciones con IA */}
      {activeModal === 'recomendaciones' && (
        <div className="db-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="db-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="db-modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
            <div className="db-modal-header">
              <span className="db-modal-badge">IA ASSISTANT</span>
              <h2 className="db-modal-title">Recomendaciones con Inteligencia Artificial</h2>
              <p className="db-modal-sub">Brechas detectadas y acciones requeridas bajo la Ley 1581.</p>
            </div>
            
            <div className="db-modal-scroll-body">
              {gapsList.length === 0 ? (
                <div className="db-modal-empty">
                  <span>🎉</span>
                  <h4>¡Sin brechas abiertas!</h4>
                  <p>La organización se encuentra en cumplimiento óptimo.</p>
                </div>
              ) : (
                <div className="db-modal-list">
                  {gapsList.map((gap) => (
                    <div className={`db-modal-gap-card ${gap.answer === 'Parcial' ? 'parcial' : ''}`} key={gap.id}>
                      <div className="db-gap-header-row">
                        <span className="db-gap-cat-lbl">{gap.category.toUpperCase()} • PREGUNTA {gap.id}</span>
                        <span className={`db-priority-tag ${gap.priority.toLowerCase()}`}>
                          Prioridad {gap.priority}
                        </span>
                      </div>
                      <h4 className="db-gap-question">{gap.question}</h4>
                      <div className="db-gap-details-grid">
                        <div className="db-detail-block red">
                          <strong>Brecha:</strong>
                          <p>{gap.gapText}</p>
                        </div>
                        <div className="db-detail-block green">
                          <strong>Recomendación:</strong>
                          <p>{gap.recText}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Plan de mejora Personalizado */}
      {activeModal === 'plan' && (
        <div className="db-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="db-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="db-modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
            <div className="db-modal-header">
              <span className="db-modal-badge blue">ROUTEMAP</span>
              <h2 className="db-modal-title">Plan de Mejora Personalizado</h2>
              <p className="db-modal-sub">Tareas priorizadas recomendadas para mitigar riesgos organizacionales.</p>
            </div>
            
            <div className="db-modal-scroll-body">
              {gapsList.length === 0 ? (
                <div className="db-modal-empty">
                  <span>🛡️</span>
                  <h4>Cumplimiento Óptimo</h4>
                  <p>No se requieren planes de acción de mejora en este momento.</p>
                </div>
              ) : (
                <div className="db-plan-priority-fases">
                  
                  {/* Alta */}
                  {gapsList.some(g => g.priority === 'Alta') && (
                    <div className="db-fase-section">
                      <h3 className="db-fase-title alta">Fase 1: Tareas Críticas (Prioridad Alta)</h3>
                      <div className="db-fase-list">
                        {gapsList.filter(g => g.priority === 'Alta').map((gap, idx) => (
                          <div className="db-fase-card-step" key={gap.id}>
                            <div className="db-step-num">1.{idx + 1}</div>
                            <div className="db-step-info">
                              <h5>{gap.question}</h5>
                              <p><strong>Mitigación:</strong> {gap.recText}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Media */}
                  {gapsList.some(g => g.priority === 'Media') && (
                    <div className="db-fase-section">
                      <h3 className="db-fase-title media">Fase 2: Fortalecimiento (Prioridad Media)</h3>
                      <div className="db-fase-list">
                        {gapsList.filter(g => g.priority === 'Media').map((gap, idx) => (
                          <div className="db-fase-card-step" key={gap.id}>
                            <div className="db-step-num">2.{idx + 1}</div>
                            <div className="db-step-info">
                              <h5>{gap.question}</h5>
                              <p><strong>Mitigación:</strong> {gap.recText}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Baja */}
                  {gapsList.some(g => g.priority === 'Baja') && (
                    <div className="db-fase-section">
                      <h3 className="db-fase-title baja">Fase 3: Optimización (Prioridad Baja)</h3>
                      <div className="db-fase-list">
                        {gapsList.filter(g => g.priority === 'Baja').map((gap, idx) => (
                          <div className="db-fase-card-step" key={gap.id}>
                            <div className="db-step-num">3.{idx + 1}</div>
                            <div className="db-step-info">
                              <h5>{gap.question}</h5>
                              <p><strong>Mitigación:</strong> {gap.recText}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
