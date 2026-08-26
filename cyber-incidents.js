// cyber-incidents.js
// Handles UI logic for the Cyber Incidents feature

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initApp();
});

function initApp() {
    // If the global data object exists
    if (window.cyberIncidentsData) {
        renderLiveThreats();
        renderArchiveList();
    } else {
        console.error('Cyber Incidents Data not loaded!');
    }

    // Set up search filter listeners for the archive
    const searchInput = document.getElementById('archive-search');
    const typeFilter = document.getElementById('archive-type-filter');

    if (searchInput) {
        searchInput.addEventListener('input', filterArchive);
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', filterArchive);
    }
}

/**
 * Handles navigation between different "screens" in the single-page app layout
 * @param {string} targetScreenId - The ID of the screen section to show
 */
function navigateTo(targetScreenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active-screen');
        screen.classList.add('hidden-screen');
    });

    // Show the target screen
    const targetScreen = document.getElementById(targetScreenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden-screen');
        targetScreen.classList.add('active-screen');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Manage Global Navigation active states and Case Nav visibility
    const caseNav = document.getElementById('case-nav');
    const allNavBtns = document.querySelectorAll('.nav-btn');
    
    allNavBtns.forEach(btn => btn.classList.remove('active'));
    
    // Highlight the active menu item based on screen
    const activeBtn = document.querySelector(`.nav-btn[onclick="navigateTo('${targetScreenId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Screens that don't belong to a specific case
    const globalScreens = ['screen-landing', 'screen-live-threats', 'screen-archive'];
    
    if (globalScreens.includes(targetScreenId)) {
        caseNav.classList.add('hidden');
    } else {
        caseNav.classList.remove('hidden');
    }
}

/**
 * Renders the Live Threats demo data into the DOM
 */
function renderLiveThreats() {
    const feedContainer = document.getElementById('live-threats-feed');
    if (!feedContainer) return;

    feedContainer.innerHTML = '';
    const threats = window.cyberIncidentsData.liveThreats;

    threats.forEach(threat => {
        const severityClass = threat.severity.toLowerCase();
        
        const card = document.createElement('div');
        card.className = 'threat-card';
        card.innerHTML = `
            <div class="threat-card-header">
                <span class="severity-badge ${severityClass}">${threat.severity}</span>
                <span class="threat-date">${threat.date}</span>
            </div>
            <h3>${threat.title}</h3>
            <div class="threat-sector">Sector: ${threat.affectedSector}</div>
            <div class="threat-summary">${threat.summary}</div>
            <div class="threat-footer">
                <span class="threat-status">Status: ${threat.status}</span>
                <button class="btn-investigate" onclick="alert('Investigation mode for live threats coming soon!')">INVESTIGATE</button>
            </div>
        `;
        feedContainer.appendChild(card);
    });
}

/**
 * Renders the Historical Archive list into the DOM
 */
function renderArchiveList(filterText = '', filterType = 'all') {
    const archiveContainer = document.getElementById('archive-list');
    if (!archiveContainer) return;

    archiveContainer.innerHTML = '';
    const archiveData = window.cyberIncidentsData.archive;

    const sortedArchive = [...archiveData].sort((a, b) => b.year - a.year);

    let hasResults = false;
    
    // Switch container to use grid layout similar to threats-grid
    archiveContainer.className = 'threats-grid';
    archiveContainer.style.marginTop = '2rem';

    sortedArchive.forEach(incident => {
        const matchesText = filterText === '' || 
                            incident.title.toLowerCase().includes(filterText.toLowerCase());
        const matchesType = filterType === 'all' || 
                            incident.type === filterType;

        if (matchesText && matchesType) {
            hasResults = true;
            const card = document.createElement('div');
            card.className = 'threat-card';
            
            const hasDetails = window.cyberIncidentsData.incidents[incident.id] ? true : false;
            let summaryText = 'Incident details are not available.';
            if (hasDetails) {
                summaryText = window.cyberIncidentsData.incidents[incident.id].summary;
            }
            
            card.innerHTML = `
                <div class="threat-card-header">
                    <span class="severity-badge ${incident.severity.toLowerCase()}">${incident.type}</span>
                    <span class="threat-date">${incident.year}</span>
                </div>
                <h3>${incident.title}</h3>
                <div class="threat-summary" style="flex-grow: 1; margin-top: 1rem;">${summaryText}</div>
                <div class="threat-footer" style="margin-top: 1.5rem; justify-content: center;">
                    <button class="btn-investigate" style="width: 100%;">EXPLORE INCIDENT →</button>
                </div>
            `;

            if (hasDetails) {
                card.onclick = () => loadIncidentFile(incident.id);
            } else {
                card.style.opacity = '0.6';
                card.title = 'Detailed case file not available for this demo';
                const btn = card.querySelector('button');
                if (btn) btn.disabled = true;
            }

            archiveContainer.appendChild(card);
        }
    });

    if (!hasResults) {
        archiveContainer.innerHTML = '<p style="color: var(--cyber-muted); padding: 1rem;">No incidents found matching those criteria.</p>';
    }
}

/**
 * Filters the archive list based on search input and type select
 */
function filterArchive() {
    const searchInput = document.getElementById('archive-search');
    const typeFilter = document.getElementById('archive-type-filter');
    
    const searchText = searchInput ? searchInput.value : '';
    const typeValue = typeFilter ? typeFilter.value : 'all';
    
    renderArchiveList(searchText, typeValue);
}

// --- PHASE 2 LOGIC ---

let currentIncidentId = null;

/**
 * Loads the details for a specific incident and shows the Case File screen
 * @param {string} incidentId - The ID of the incident to load
 */
function loadIncidentFile(incidentId) {
    const incident = window.cyberIncidentsData.incidents[incidentId];
    if (!incident) return;

    currentIncidentId = incidentId;

    // Populate Case File screen
    document.getElementById('case-title').textContent = incident.title.toUpperCase();
    document.getElementById('case-date').textContent = incident.date;
    document.getElementById('case-type').textContent = incident.type;
    document.getElementById('case-scale').textContent = incident.scale;
    document.getElementById('case-status').textContent = incident.status;
    document.getElementById('case-summary-text').textContent = incident.summary;

    // Pre-render all subsequent screens for this incident
    renderTimeline(incidentId);
    renderAttackAnatomy(incidentId);
    renderInvestigation(incidentId);
    renderImpact(incidentId);
    renderDefenderMode(incidentId);
    renderResponse(incidentId);
    renderLessons(incidentId);

    navigateTo('screen-incident-file');
}

/**
 * Triggered from the Case File screen to enter the Timeline investigation
 */
function startInvestigation() {
    if (!currentIncidentId) return;
    renderTimeline(currentIncidentId);
    navigateTo('screen-timeline');
}

/**
 * Renders the interactive timeline for the selected incident
 * @param {string} incidentId - The ID of the incident
 */
function renderTimeline(incidentId) {
    const incident = window.cyberIncidentsData.incidents[incidentId];
    if (!incident || !incident.timeline) return;

    const stepsContainer = document.getElementById('incident-timeline-steps');
    stepsContainer.innerHTML = '';

    incident.timeline.forEach((event, index) => {
        const btn = document.createElement('button');
        btn.className = 'timeline-step-btn';
        if (index === 0) btn.classList.add('active'); // Select first by default
        
        btn.textContent = event.phase;
        btn.onclick = () => selectTimelineEvent(index, btn);
        
        stepsContainer.appendChild(btn);
    });

    // Auto-select the first event to populate the detail panel
    selectTimelineEvent(0, stepsContainer.firstChild);
}

/**
 * Displays the details for a clicked timeline event
 * @param {number} index - The index of the timeline event
 * @param {HTMLElement} btnElement - The button element that was clicked
 */
function selectTimelineEvent(index, btnElement) {
    // Update active state on buttons
    document.querySelectorAll('.timeline-step-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (btnElement) {
        btnElement.classList.add('active');
    }

    const incident = window.cyberIncidentsData.incidents[currentIncidentId];
    const event = incident.timeline[index];
    const detailPanel = document.getElementById('timeline-detail-panel');

    detailPanel.innerHTML = `
        <div class="timeline-detail-content">
            <div class="classification" style="margin-bottom: 0.5rem; display: inline-block;">${event.phase}</div>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="lesson-box">
                <h4>SECURITY LESSON</h4>
                <p>${event.lesson}</p>
            </div>
        </div>
    `;
}

// Ensure navigateTo and Phase 2 functions are available globally for inline onclick handlers
window.navigateTo = navigateTo;
window.startInvestigation = startInvestigation;
window.selectInvestigationCategory = selectInvestigationCategory;

// --- PHASE 3 LOGIC ---

function renderAttackAnatomy(incidentId) {
    const incident = window.cyberIncidentsData.incidents[incidentId];
    if (!incident || !incident.attackStages) return;

    const chainContainer = document.getElementById('anatomy-chain');
    chainContainer.innerHTML = '';

    incident.attackStages.forEach(stage => {
        const card = document.createElement('div');
        card.className = 'anatomy-card';
        
        card.innerHTML = `
            <div class="anatomy-stage">${stage.stage}</div>
            <div class="anatomy-desc">${stage.description}</div>
        `;
        
        card.onclick = () => {
            card.classList.toggle('expanded');
        };
        
        chainContainer.appendChild(card);
    });
}

function renderInvestigation(incidentId) {
    const incident = window.cyberIncidentsData.incidents[incidentId];
    if (!incident || !incident.evidence) return;
    
    // Select first category by default
    selectInvestigationCategory('network');
}

function selectInvestigationCategory(category) {
    // Update active state on buttons
    document.querySelectorAll('.inv-category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category)) {
            btn.classList.add('active');
        }
    });

    const incident = window.cyberIncidentsData.incidents[currentIncidentId];
    if (!incident || !incident.evidence) return;

    const evidenceList = incident.evidence[category] || [];
    const board = document.getElementById('evidence-board');
    board.innerHTML = '';

    if (evidenceList.length === 0) {
        board.innerHTML = '<h3 class="detail-placeholder">No evidence found in this category.</h3>';
        return;
    }

    evidenceList.forEach(item => {
        const card = document.createElement('div');
        card.className = 'evidence-card';
        if (category === 'alerts') {
            card.classList.add('pulse-alert');
        }
        card.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <div class="evidence-lesson"><strong>LESSON:</strong> ${item.lesson}</div>
        `;
        board.appendChild(card);
    });
}

// --- PHASE 4 LOGIC ---

function renderImpact(incidentId) {
    const incident = window.cyberIncidentsData.incidents[incidentId];
    if (!incident || !incident.impact) return;

    const grid = document.getElementById('impact-grid');
    grid.innerHTML = '';

    const impactData = incident.impact;
    
    // Sectors
    if (impactData.sectors) {
        grid.innerHTML += `
            <div class="impact-card">
                <div class="impact-icon">🏢</div>
                <div class="impact-value">${impactData.sectors.length}</div>
                <div class="impact-label">Sectors Affected</div>
                <div style="color: var(--cyber-muted); font-size: 0.8rem; margin-top: 1rem;">${impactData.sectors.join(', ')}</div>
            </div>
        `;
    }
    
    // Systems
    if (impactData.systemsAffected) {
        grid.innerHTML += `
            <div class="impact-card">
                <div class="impact-icon">💻</div>
                <div class="impact-value" style="font-size: 1.5rem;">${impactData.systemsAffected}</div>
                <div class="impact-label">Systems Compromised</div>
            </div>
        `;
    }
    
    // Countries
    if (impactData.countries) {
        grid.innerHTML += `
            <div class="impact-card">
                <div class="impact-icon">🌍</div>
                <div class="impact-value">${impactData.countries}</div>
                <div class="impact-label">Countries Affected</div>
            </div>
        `;
    }
    
    // Cost
    if (impactData.estimatedCost) {
        grid.innerHTML += `
            <div class="impact-card">
                <div class="impact-icon">💸</div>
                <div class="impact-value" style="font-size: 1.5rem;">${impactData.estimatedCost}</div>
                <div class="impact-label">Estimated Damages</div>
            </div>
        `;
    }
}

function renderDefenderMode(incidentId) {
    const incident = window.cyberIncidentsData.incidents[incidentId];
    if (!incident || !incident.defenderScenario) return;

    const scenario = incident.defenderScenario;
    document.getElementById('scenario-context').textContent = scenario.context;
    document.getElementById('scenario-question').textContent = scenario.question;
    
    const optionsContainer = document.getElementById('scenario-options');
    optionsContainer.innerHTML = '';
    
    // Hide feedback initially
    const feedback = document.getElementById('scenario-feedback');
    feedback.classList.add('hidden-screen');
    feedback.className = 'scenario-feedback hidden-screen';

    scenario.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'scenario-option-btn';
        btn.textContent = opt.text;
        btn.onclick = () => submitDefenderAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function submitDefenderAnswer(index, btnElement) {
    const incident = window.cyberIncidentsData.incidents[currentIncidentId];
    const scenario = incident.defenderScenario;
    const selectedOption = scenario.options[index];
    
    // Disable all buttons
    document.querySelectorAll('.scenario-option-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Show feedback
    const feedback = document.getElementById('scenario-feedback');
    const title = document.getElementById('feedback-title');
    const desc = document.getElementById('feedback-desc');
    
    feedback.classList.remove('hidden-screen');
    desc.textContent = selectedOption.explanation;
    
    if (selectedOption.correct) {
        btnElement.classList.add('selected-correct');
        feedback.classList.add('correct');
        title.textContent = 'CORRECT';
        defenderScore = 100;
    } else {
        btnElement.classList.add('selected-wrong');
        feedback.classList.add('wrong');
        title.textContent = 'NEEDS IMPROVEMENT';
        defenderScore = 0;
    }
}

function renderResponse(incidentId) {
    const incident = window.cyberIncidentsData.incidents[incidentId];
    if (!incident || !incident.defensiveResponse) return;

    const timelineContainer = document.getElementById('response-timeline');
    timelineContainer.innerHTML = '';

    incident.defensiveResponse.forEach(step => {
        const item = document.createElement('div');
        item.className = 'response-step';
        item.innerHTML = `
            <div class="response-step-title">${step.step}</div>
            <div class="response-step-desc">${step.desc}</div>
        `;
        timelineContainer.appendChild(item);
    });
}

// --- PHASE 5 LOGIC ---

let currentQuestionIndex = 0;
let quizScore = 0;
let defenderScore = 0;

function renderLessons(incidentId) {
    const incident = window.cyberIncidentsData.incidents[incidentId];
    if (!incident || !incident.lessons) return;

    const grid = document.getElementById('lessons-grid');
    grid.innerHTML = '';

    incident.lessons.forEach(lesson => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.innerHTML = `
            <div class="lesson-icon">${lesson.icon}</div>
            <h3>${lesson.title}</h3>
            <p>${lesson.text}</p>
        `;
        grid.appendChild(card);
    });
    
    // Reset quiz state
    currentQuestionIndex = 0;
    quizScore = 0;
    renderChallengeQuestion();
}

function renderChallengeQuestion() {
    const incident = window.cyberIncidentsData.incidents[currentIncidentId];
    if (!incident || !incident.challengeQuestions) return;
    
    const questions = incident.challengeQuestions;
    
    if (currentQuestionIndex >= questions.length) {
        renderFinalScore();
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById('challenge-question-text').textContent = `Q${currentQuestionIndex + 1}: ${q.question}`;
    
    const optionsContainer = document.getElementById('challenge-options');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'scenario-option-btn';
        btn.textContent = optText;
        btn.onclick = () => submitChallengeAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
    
    // Update progress
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.getElementById('challenge-progress').style.width = `${progress}%`;
    
    // Hide feedback
    document.getElementById('challenge-feedback').classList.add('hidden-screen');
}

function submitChallengeAnswer(selectedIndex, btnElement) {
    const incident = window.cyberIncidentsData.incidents[currentIncidentId];
    const q = incident.challengeQuestions[currentQuestionIndex];
    
    // Disable buttons
    document.querySelectorAll('#challenge-options .scenario-option-btn').forEach(btn => btn.disabled = true);
    
    const feedback = document.getElementById('challenge-feedback');
    const title = document.getElementById('ch-feedback-title');
    const desc = document.getElementById('ch-feedback-desc');
    
    feedback.classList.remove('hidden-screen');
    feedback.className = 'challenge-feedback';
    desc.textContent = q.explanation;
    
    if (selectedIndex === q.correctAnswer) {
        btnElement.classList.add('selected-correct');
        feedback.classList.add('correct');
        title.textContent = 'CORRECT';
        quizScore++;
    } else {
        btnElement.classList.add('selected-wrong');
        feedback.classList.add('wrong');
        title.textContent = 'INCORRECT';
        // Highlight correct answer
        document.querySelectorAll('#challenge-options .scenario-option-btn')[q.correctAnswer].classList.add('selected-correct');
    }
    
    const nextBtn = document.getElementById('next-question-btn');
    if (currentQuestionIndex === incident.challengeQuestions.length - 1) {
        nextBtn.textContent = 'VIEW FINAL SCORE →';
    } else {
        nextBtn.textContent = 'NEXT QUESTION →';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    renderChallengeQuestion();
}

function renderFinalScore() {
    const incident = window.cyberIncidentsData.incidents[currentIncidentId];
    const totalQ = incident.challengeQuestions.length;
    const quizPercentage = Math.round((quizScore / totalQ) * 100);
    
    document.getElementById('final-defender-score').textContent = `${defenderScore}%`;
    document.getElementById('final-quiz-score').textContent = `${quizScore} / ${totalQ} (${quizPercentage}%)`;
    
    const msg = document.getElementById('score-personalized-message');
    if (quizPercentage === 100 && defenderScore === 100) {
        msg.textContent = 'Outstanding work. You correctly identified the threat, executed perfect containment, and mastered the post-incident analysis.';
    } else if (quizPercentage >= 60) {
        msg.textContent = 'Good job. You successfully navigated the incident, but there is still room for improvement in some areas of investigation.';
    } else {
        msg.textContent = 'Review the incident archive again. Identifying threats quickly and correctly is crucial for an incident responder.';
    }
    
    // 100% progress for the progress bar visually before switching screens
    document.getElementById('challenge-progress').style.width = '100%';
    
    // Short delay before showing score
    setTimeout(() => {
        navigateTo('screen-score');
    }, 500);
}

// Attach globally
window.nextQuestion = nextQuestion;
