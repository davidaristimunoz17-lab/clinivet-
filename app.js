/**
 * CliniVet AI - Lógica Principal de la Aplicación Web
 * Interacción de Historia Clínica Compartida y Módulo de IA Ética
 * Compatible con carga directa por script (file://) y HTTP
 */

(function() {
  'use strict';

  // Obtener datos clínicos y éticos del namespace global
  const Data = window.CliniVetData || {};
  const PATIENT_DATA = Data.PATIENT_DATA || {};
  const PROCEDURES_DATA = Data.PROCEDURES_DATA || [];
  const AI_FAQ_SIMULATOR = Data.AI_FAQ_SIMULATOR || [];
  const ETHICAL_MANIFESTO = Data.ETHICAL_MANIFESTO || { principles: [] };
  const MANDATORY_AI_DISCLAIMER = Data.MANDATORY_AI_DISCLAIMER || "Recuerda 💡: La información proporcionada por esta IA tiene fines educativos y de apoyo. Ante cualquier duda o emergencia, busca siempre la supervisión de nuestro equipo veterinario.";

  // Estado de la Aplicación
  const state = {
    currentRole: 'tutor', // 'tutor' | 'vet'
    selectedProcedure: PROCEDURES_DATA[0] || null,
    activeModalTab: 'care' // 'care' | 'meds' | 'faq'
  };

  // Cache de Elementos DOM
  let DOM = {};

  function cacheDOMElements() {
    DOM = {
      modalBackdrop: document.getElementById('ai-modal-backdrop'),
      modalCloseBtn: document.getElementById('modal-close-btn'),
      modalProcTitle: document.getElementById('modal-procedure-title'),
      modalProcDate: document.getElementById('modal-procedure-date'),
      modalTabCare: document.getElementById('tab-btn-care'),
      modalTabMeds: document.getElementById('tab-btn-meds'),
      modalTabFaq: document.getElementById('tab-btn-faq'),
      modalTabContent: document.getElementById('modal-dynamic-content'),
      modalDisclaimer: document.getElementById('modal-disclaimer-text'),
      modalPrintBtn: document.getElementById('modal-print-btn'),
      proceduresTimeline: document.getElementById('procedures-timeline-list'),
      roleBtnTutor: document.getElementById('role-btn-tutor'),
      roleBtnVet: document.getElementById('role-btn-vet'),
      roleBadgeLabel: document.getElementById('current-role-badge')
    };
  }

  /**
   * Inicialización de la Aplicación
   */
  function initApp() {
    cacheDOMElements();
    renderPatientData();
    renderEthicsPillars();
    renderProceduresTimeline();
    setupEventListeners();
  }

  /**
   * Renderizado de la Ficha de Paciente (Max, 12 años, Chihuahua, Macho)
   */
  function renderPatientData() {
    const patient = PATIENT_DATA;
    if (!patient.name) return;

    const nameEl = document.getElementById('patient-name-display');
    const ageEl = document.getElementById('patient-age-display');
    const breedEl = document.getElementById('patient-breed-display');
    const sexEl = document.getElementById('patient-sex-display');
    const weightEl = document.getElementById('patient-weight-display');
    const chipEl = document.getElementById('patient-chip-display');
    const tutorEl = document.getElementById('patient-tutor-display');
    const vetEl = document.getElementById('patient-vet-display');

    if (nameEl) nameEl.textContent = patient.name;
    if (ageEl) ageEl.textContent = `${patient.age} (${patient.lifeStage})`;
    if (breedEl) breedEl.textContent = patient.breed;
    if (sexEl) sexEl.textContent = patient.sex;
    if (weightEl) weightEl.textContent = patient.weight;
    if (chipEl) chipEl.textContent = patient.microchip;
    if (tutorEl) tutorEl.textContent = patient.tutor.name;
    if (vetEl) vetEl.textContent = patient.assignedVet.name;
  }

  /**
   * Renderizado de los Pilares Éticos
   */
  function renderEthicsPillars() {
    const container = document.getElementById('ethics-pillars-container');
    if (!container || !ETHICAL_MANIFESTO.principles) return;

    container.innerHTML = ETHICAL_MANIFESTO.principles.map(p => `
      <article class="ethics-card">
        <div class="ethics-card-top">
          <span class="ethics-card-num">${p.number}</span>
          <span class="ethics-tag">${p.tag}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </article>
    `).join('');
  }

  /**
   * Renderizado de la Línea de Tiempo de Procedimientos
   */
  function renderProceduresTimeline() {
    if (!DOM.proceduresTimeline) return;

    DOM.proceduresTimeline.innerHTML = PROCEDURES_DATA.map((proc) => {
      const isEsterilizacion = proc.id === 'proc-esterilizacion';
      const isVacunacion = proc.id === 'proc-vacunacion';
      const isFeatured = isEsterilizacion || isVacunacion;

      return `
        <div class="procedure-card ${isFeatured ? 'featured' : ''}" data-id="${proc.id}">
          <div class="procedure-node">
            ${getProcedureIcon(proc.id)}
          </div>
          <div class="procedure-content-box" onclick="window.cliniVetApp.openProcedureModal('${proc.id}')">
            <div class="procedure-header-meta">
              <span class="procedure-date-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                ${proc.date}
              </span>
              <span class="procedure-status-badge ${proc.statusType}">
                ${proc.badgeLabel}
              </span>
            </div>

            <h4 class="procedure-title">${proc.title}</h4>
            <p class="procedure-desc">${proc.shortDescription}</p>

            ${state.currentRole === 'vet' ? `
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px; margin-bottom:14px; font-size:0.8125rem;">
                <strong style="color:#0369a1;">Nota Técnica Quirúrgica:</strong> ${proc.clinicalDetails['Técnica Quirúrgica'] || proc.clinicalDetails['Biológicos Administrados'] || 'Revisión clínica completa'}
              </div>
            ` : ''}

            <div class="procedure-action-row">
              <span class="procedure-doctor-sign">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Firma: ${proc.veterinarian}
              </span>

              <button class="btn-open-ai" onclick="event.stopPropagation(); window.cliniVetApp.openProcedureModal('${proc.id}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                </svg>
                ✨ Analizar con IA: Cuidados y Medicación
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Retorna un SVG clínico representativo según el procedimiento
   */
  function getProcedureIcon(procId) {
    switch (procId) {
      case 'proc-esterilizacion':
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="9" y1="15" x2="15" y2="15"></line>
          <line x1="12" y1="12" x2="12" y2="18"></line>
        </svg>`;
      case 'proc-vacunacion':
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m18 2 4 4"></path>
          <path d="m17 7 3-3"></path>
          <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"></path>
          <path d="m9 11 4 4"></path>
          <path d="m5 19-3 3"></path>
          <path d="m14 4 6 6"></path>
        </svg>`;
      case 'proc-profilaxis':
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>`;
      default:
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
          <circle cx="20" cy="10" r="2"></circle>
        </svg>`;
    }
  }

  /**
   * Abrir Modal de Procedimiento con IA y Aviso de Transparencia Obligatorio
   */
  function openProcedureModal(procedureId) {
    const procedure = PROCEDURES_DATA.find(p => p.id === procedureId);
    if (!procedure) return;

    state.selectedProcedure = procedure;
    state.activeModalTab = 'care';

    // Actualizar encabezados
    if (DOM.modalProcTitle) {
      DOM.modalProcTitle.textContent = procedure.title;
    }
    if (DOM.modalProcDate) {
      DOM.modalProcDate.textContent = `Fecha: ${procedure.date} | Paciente: Max (${PATIENT_DATA.weight || '3.2 kg'})`;
    }

    // Actualizar estado de las pestañas
    updateTabButtonsUI();

    // Renderizar contenido de la pestaña activa
    renderActiveModalTab();

    // Mostrar modal con animación
    DOM.modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cerrar Modal
   */
  function closeProcedureModal() {
    if (DOM.modalBackdrop) {
      DOM.modalBackdrop.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  /**
   * Actualizar estilo visual de las pestañas
   */
  function updateTabButtonsUI() {
    if (DOM.modalTabCare) DOM.modalTabCare.classList.toggle('active', state.activeModalTab === 'care');
    if (DOM.modalTabMeds) DOM.modalTabMeds.classList.toggle('active', state.activeModalTab === 'meds');
    if (DOM.modalTabFaq) DOM.modalTabFaq.classList.toggle('active', state.activeModalTab === 'faq');
  }

  /**
   * Cambiar de pestaña en el Modal
   */
  function switchModalTab(tabKey) {
    state.activeModalTab = tabKey;
    updateTabButtonsUI();
    renderActiveModalTab();
  }

  /**
   * Renderizar el contenido dinámico del Modal según la pestaña seleccionada
   */
  function renderActiveModalTab() {
    const proc = state.selectedProcedure;
    if (!proc) return;
    const analysis = proc.aiAnalysis;

    // REGLA ESTRICTA DE TRANSPARENCIA: Aviso Legal e Informativo inalterable
    let html = `
      <div class="mandatory-ai-disclaimer-box" role="alert" aria-live="polite">
        <div class="disclaimer-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div class="disclaimer-text">
          ${MANDATORY_AI_DISCLAIMER}
        </div>
      </div>
    `;

    if (state.activeModalTab === 'care') {
      html += `
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 1.25rem; margin-bottom: 1.75rem;">
          <h4 style="color:#0369a1; font-weight:700; margin-bottom: 6px; font-size:1rem; display:flex; align-items:center; gap:8px;">
            <span>🤖</span> Resumen de Procedimiento Asistido por IA
          </h4>
          <p style="font-size:0.925rem; color:#1e293b; line-height:1.6;">${analysis.summary}</p>
        </div>

        <h3 class="care-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-primary-600)">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Cuidados en Casa Paso a Paso (${analysis.careGuide.length} Puntos de Atención)
        </h3>

        <div class="care-steps-list">
          ${analysis.careGuide.map(item => `
            <div class="care-step-item">
              <div class="care-step-number">${item.step}</div>
              <div class="care-step-details">
                <h4>${item.title}</h4>
                <p>${item.detail}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <span style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:#64748b;">Próximo Hito Clínico de Max</span>
            <p style="font-weight:700; color:#0f172a; font-size:0.95rem;">${analysis.followUp.type}</p>
            <span style="font-size:0.8125rem; color:#0284c7;">Fecha programada: ${analysis.followUp.date} (${analysis.followUp.location})</span>
          </div>
          <button class="btn-secondary" onclick="alert('Recordatorio agregado a tu calendario para el control de Max el ${analysis.followUp.date}')">
            📅 Agendar Cita
          </button>
        </div>
      `;
    } else if (state.activeModalTab === 'meds') {
      html += `
        <div style="margin-bottom: 1.5rem;">
          <h3 class="care-section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-primary-600)">
              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              <path d="M7 12h10"></path>
              <path d="M12 7v10"></path>
            </svg>
            Medicamentos Enviados por ${proc.veterinarian}
          </h3>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1rem;">
            Dosis y posologías adaptadas al peso de Max (<strong>3.2 kg</strong>). Sigue siempre el horario indicado.
          </p>
        </div>

        <div class="medications-grid">
          ${analysis.medications.map(med => `
            <article class="medication-card ${med.pillColor}">
              <div class="medication-top-row">
                <div class="medication-name-box">
                  <h4>${med.name}</h4>
                  <span class="medication-type">${med.classification}</span>
                </div>
                <span class="ethics-tag" style="background:#e0f2fe; color:#0369a1; border-color:#bae6fd;">
                  Receta Médica Validada
                </span>
              </div>

              <div class="medication-specs-grid">
                <div class="med-spec-item">
                  <span class="med-spec-label">Dosis Exacta</span>
                  <span class="med-spec-value">${med.dose}</span>
                </div>
                <div class="med-spec-item">
                  <span class="med-spec-label">Frecuencia</span>
                  <span class="med-spec-value">${med.frequency}</span>
                </div>
                <div class="med-spec-item">
                  <span class="med-spec-label">Duración</span>
                  <span class="med-spec-value">${med.duration}</span>
                </div>
              </div>

              <div class="medication-instructions">
                <strong>Pauta de administración:</strong> ${med.instructions}
              </div>
            </article>
          `).join('')}
        </div>
      `;
    } else if (state.activeModalTab === 'faq') {
      const faqs = AI_FAQ_SIMULATOR.filter(f => f.procedureId === proc.id);
      const displayFaqs = faqs.length > 0 ? faqs : AI_FAQ_SIMULATOR;

      html += `
        <div style="margin-bottom: 1.5rem;">
          <h3 class="care-section-title">
            <span>💬</span> Preguntas Frecuentes Post-Procedimiento
          </h3>
          <p style="font-size:0.9rem; color:var(--text-muted);">
            Respuestas generadas por el modelo de IA asistencial y revisadas por el equipo clínico veterinario.
          </p>
        </div>

        <div class="ai-questions-list">
          ${displayFaqs.map((item, idx) => `
            <div class="ai-question-card">
              <div class="ai-question-header" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                <span>❓ ${item.question}</span>
                <span style="font-size:0.8rem; color:#64748b;">▼</span>
              </div>
              <div class="ai-question-body" style="display:block;">
                <p style="margin-bottom:10px;">${item.answer}</p>
                <div style="font-size:0.75rem; color:#64748b; background:#f8fafc; padding:6px 10px; border-radius:6px; border:1px solid #e2e8f0;">
                  🛡️ <em>Validado por el equipo clínico para el caso de Max.</em>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Simulador de Pregunta Interactiva -->
        <div style="margin-top:2rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:1.25rem;">
          <h4 style="font-size:0.95rem; font-weight:700; color:#166534; margin-bottom:0.5rem;">¿Tienes otra consulta sobre los cuidados de Max?</h4>
          <div style="display:flex; gap:8px;">
            <input type="text" id="interactive-user-question" placeholder="Ej: ¿Puedo cepillarle los dientes hoy?..." style="flex:1; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px; font-size:0.875rem;">
            <button class="btn-primary-action" style="background:#059669;" onclick="window.cliniVetApp.handleCustomAiQuestion()">
              Consultar IA
            </button>
          </div>
          <div id="custom-ai-answer-box" style="margin-top:10px; font-size:0.875rem; color:#14532d; display:none;"></div>
        </div>
      `;
    }

    DOM.modalTabContent.innerHTML = html;
  }

  /**
   * Simulador de consulta personalizada a la IA
   */
  function handleCustomAiQuestion() {
    const input = document.getElementById('interactive-user-question');
    const answerBox = document.getElementById('custom-ai-answer-box');
    if (!input || !answerBox) return;

    const query = input.value.trim().toLowerCase();
    if (!query) {
      alert('Por favor escribe tu pregunta sobre los cuidados de Max.');
      return;
    }

    answerBox.style.display = 'block';
    answerBox.innerHTML = `<em>Analizando consulta bajo protocolo ético con la historia clínica de Max...</em>`;

    setTimeout(() => {
      const emergencyKeywords = ['sangrado', 'sangra', 'desmayo', 'no respira', 'convulsion', 'morado', 'ahoga', 'grave'];
      const isEmergency = emergencyKeywords.some(k => query.includes(k));

      if (isEmergency) {
        answerBox.innerHTML = `
          <div style="background:#fef2f2; border:1px solid #fecaca; border-left:4px solid #dc2626; padding:12px; border-radius:8px; color:#991b1b;">
            <strong>🚨 ALERTA MÉDICA DE URGENCIA DETECTADA:</strong><br>
            Los síntomas descritos requieren valoración presencial urgente. No confíes únicamente en la IA. Comunícate de inmediato con urgencias veterinarias al <strong>+34 900 123 456</strong> o traslada a Max a la clínica más cercana.
          </div>
        `;
      } else {
        answerBox.innerHTML = `
          <div style="background:white; border:1px solid #bbf7d0; padding:12px; border-radius:8px;">
            <strong>Respuesta Asistida por IA:</strong> Para la consulta planteada sobre Max (Chihuahua de 12 años, 3.2 kg), mantén reposo tranquilo, evita cambios bruscos de temperatura o alimentación y vigila su respiración en reposo. Hemos anotado esta inquietud en su historial para revisión de la Dra. Sofía Valenzuela.<br><br>
            <div style="font-size:0.8rem; color:#0369a1; background:#f0f9ff; padding:6px 10px; border-radius:4px; margin-top:6px;">
              ${MANDATORY_AI_DISCLAIMER}
            </div>
          </div>
        `;
      }
      input.value = '';
    }, 500);
  }

  /**
   * Manejador de Cambio de Rol (Tutor vs Médico Veterinario)
   */
  function setRole(role) {
    state.currentRole = role;
    
    if (DOM.roleBtnTutor) DOM.roleBtnTutor.classList.toggle('active', role === 'tutor');
    if (DOM.roleBtnVet) DOM.roleBtnVet.classList.toggle('active', role === 'vet');
    
    if (DOM.roleBadgeLabel) {
      DOM.roleBadgeLabel.textContent = role === 'tutor' 
        ? 'Modo: Tutor (Lenguaje Claro y Cuidados)' 
        : 'Modo: Médico Veterinario (Parámetros Clínicos & Farmacología)';
    }

    renderProceduresTimeline();
  }

  /**
   * Escuchadores de Eventos
   */
  function setupEventListeners() {
    if (DOM.modalTabCare) DOM.modalTabCare.addEventListener('click', () => switchModalTab('care'));
    if (DOM.modalTabMeds) DOM.modalTabMeds.addEventListener('click', () => switchModalTab('meds'));
    if (DOM.modalTabFaq) DOM.modalTabFaq.addEventListener('click', () => switchModalTab('faq'));

    if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeProcedureModal);
    if (DOM.modalBackdrop) {
      DOM.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === DOM.modalBackdrop) closeProcedureModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.modalBackdrop && DOM.modalBackdrop.classList.contains('active')) {
        closeProcedureModal();
      }
    });

    if (DOM.modalPrintBtn) {
      DOM.modalPrintBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (DOM.roleBtnTutor) DOM.roleBtnTutor.addEventListener('click', () => setRole('tutor'));
    if (DOM.roleBtnVet) DOM.roleBtnVet.addEventListener('click', () => setRole('vet'));
  }

  // API pública en window para invocar desde HTML
  window.cliniVetApp = {
    openProcedureModal,
    closeProcedureModal,
    switchModalTab,
    handleCustomAiQuestion,
    setRole
  };

  // Inicializar al cargar el DOM o si ya está cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
