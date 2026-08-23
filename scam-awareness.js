// CYBER: THE LAST CLICK - Game Logic

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the game page
    if (!document.getElementById('device-content')) return;

    // --- GAME STATE ---
    let gameState = {
        currentCaseIndex: 0,
        xp: 0,
        evidenceFoundInCurrentCase: [],
        decisionMade: false
    };

    // --- CASE DATA ---
    const cases = [
        {
            id: 'CASE_01',
            title: 'THE LOCKED ACCOUNT',
            description: 'Investigate the message above. Click on any suspicious elements to collect evidence.',
            requiredEvidenceCount: 4,
            phoneUI: `
                <div class="phone-ui dark-mode">
                    <div class="phone-header">Messages</div>
                    <div class="phone-body">
                        <div style="text-align: center; margin-bottom: 10px; font-size: 0.8rem; color: #888;">Today 10:42 AM</div>
                        <div class="message-bubble">
                            <strong>From: <span class="clickable-evidence" data-evidence="sender">Alert-Notice-8821</span></strong>
                            <br><br>
                            Dear Customer, your National Bank account has been <span class="clickable-evidence" data-evidence="urgency">temporarily locked due to unusual activity.</span>
                            <br><br>
                            To restore access and prevent permanent closure, you must verify your identity <span class="clickable-evidence" data-evidence="pressure">IMMEDIATELY.</span>
                            <br><br>
                            Please visit: <br>
                            <a href="#" class="clickable-evidence" data-evidence="link" style="color: #3b82f6;">http://nationalbank-secure-update-login.com/auth</a>
                            <br><br>
                            Do not share your OTP with anyone.
                        </div>
                    </div>
                </div>
            `,
            evidenceList: {
                'sender': {
                    title: 'Suspicious Sender',
                    desc: 'Real banks use official shortcodes or verified names, not random strings like "Alert-Notice-8821".',
                    xp: 20
                },
                'urgency': {
                    title: 'Fake Account Warning',
                    desc: 'Claiming an account is locked is a common tactic to cause panic.',
                    xp: 20
                },
                'pressure': {
                    title: 'Urgency & Pressure',
                    desc: 'Demanding immediate action forces victims to act without thinking critically.',
                    xp: 20
                },
                'link': {
                    title: 'Fake Domain Link',
                    desc: 'The link is long and uses a fake domain instead of the official bank website.',
                    xp: 20
                }
            },
            decision: {
                question: 'You have collected enough evidence. What is your decision?',
                options: [
                    {
                        text: 'Click the link to secure the account immediately.',
                        isCorrect: false,
                        consequence: 'You clicked the malicious link. It took you to a fake login page designed to steal your banking credentials.',
                        lessonTitle: 'NEVER CLICK SUSPICIOUS LINKS',
                        lessonText: 'If you are worried about your account, open your browser and manually type your bank\'s official website address. Never trust links in unexpected messages.',
                        xpChange: -20
                    },
                    {
                        text: 'Reply to the sender to ask for more details.',
                        isCorrect: false,
                        consequence: 'You replied to the scammer. This confirms to them that your number is active, and they may target you with more scams.',
                        lessonTitle: 'DO NOT ENGAGE',
                        lessonText: 'Replying to scam messages only validates your contact information. It is best to ignore and block the sender.',
                        xpChange: -10
                    },
                    {
                        text: 'Block the number and contact the bank via their official phone number.',
                        isCorrect: true,
                        consequence: 'Excellent work! You avoided the trap, secured your device by blocking the sender, and verified the situation through official channels.',
                        lessonTitle: 'VERIFY INDEPENDENTLY',
                        lessonText: 'Scammers create fake urgency. Always pause and verify the claim by contacting the organization directly using a trusted, official phone number or website.',
                        xpChange: 50
                    }
                ]
            }
        }
        // Future cases will be added here
    ];

    // --- DOM ELEMENTS ---
    const ui = {
        caseTitle: document.getElementById('case-title'),
        statCase: document.getElementById('stat-case'),
        statEvidence: document.getElementById('stat-evidence'),
        statXp: document.getElementById('stat-xp'),
        deviceContent: document.getElementById('device-content'),
        storyInstructions: document.getElementById('story-instructions'),
        evidenceBoard: document.getElementById('evidence-board'),
        btnDecide: document.getElementById('btn-decide'),
        evidenceEmptyState: document.getElementById('evidence-empty-state'),
        
        // Modals
        decisionModal: document.getElementById('decision-modal'),
        decisionQuestion: document.getElementById('decision-question'),
        decisionOptions: document.getElementById('decision-options'),
        
        resultModal: document.getElementById('result-modal'),
        resultHeader: document.getElementById('result-header'),
        resultTitle: document.getElementById('result-title'),
        resultConsequence: document.getElementById('result-consequence'),
        lessonIcon: document.getElementById('lesson-icon'),
        lessonTitle: document.getElementById('lesson-title'),
        resultLesson: document.getElementById('result-lesson'),
        xpRewardDisplay: document.getElementById('xp-reward-display'),
        btnNextCase: document.getElementById('btn-next-case'),
        btnRetryCase: document.getElementById('btn-retry-case')
    };

    // --- INITIALIZATION ---
    function initGame() {
        loadCase(0);
        
        // Event Listeners for UI
        ui.btnDecide.addEventListener('click', showDecisionModal);
        ui.btnNextCase.addEventListener('click', loadNextCase);
        ui.btnRetryCase.addEventListener('click', retryDecision);
    }

    // --- CORE LOGIC ---
    function loadCase(index) {
        // Hide Modals
        ui.decisionModal.classList.add('hidden');
        ui.resultModal.classList.add('hidden');

        if (index >= cases.length) {
            // Game Over / All cases completed (placeholder)
            ui.deviceContent.innerHTML = '<div style="text-align:center; padding: 2rem;"><h2>ALL CURRENT CASES CLOSED</h2><p>More cases coming soon.</p></div>';
            return;
        }

        const currentCase = cases[index];
        gameState.currentCaseIndex = index;
        gameState.evidenceFoundInCurrentCase = [];
        gameState.decisionMade = false;

        // Update Header Stats
        ui.caseTitle.textContent = currentCase.title;
        ui.statCase.textContent = `0${index + 1} / 05`;
        updateEvidenceCounter();
        ui.statXp.textContent = gameState.xp;

        // Load Phone UI
        // Simulate decryption delay
        ui.deviceContent.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Decrypting communication...</p>
            </div>
        `;
        ui.storyInstructions.innerHTML = `<p>${currentCase.description}</p>`;

        setTimeout(() => {
            ui.deviceContent.innerHTML = currentCase.phoneUI;
            attachEvidenceListeners();
        }, 800);

        // Reset Evidence Board
        ui.evidenceBoard.innerHTML = '';
        ui.evidenceBoard.appendChild(ui.evidenceEmptyState);
        ui.evidenceEmptyState.style.display = 'block';
        ui.btnDecide.classList.add('hidden');
    }

    function attachEvidenceListeners() {
        const evidenceElements = document.querySelectorAll('.clickable-evidence');
        evidenceElements.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                if (gameState.decisionMade) return;
                
                const evidenceId = el.getAttribute('data-evidence');
                if (!gameState.evidenceFoundInCurrentCase.includes(evidenceId)) {
                    // Mark as found
                    el.classList.add('found');
                    gameState.evidenceFoundInCurrentCase.push(evidenceId);
                    
                    const currentCase = cases[gameState.currentCaseIndex];
                    const evidenceData = currentCase.evidenceList[evidenceId];
                    
                    // Add XP
                    addXP(evidenceData.xp);
                    
                    // Add to board
                    addEvidenceToBoard(evidenceData);
                    updateEvidenceCounter();
                    
                    // Check if enough evidence to decide
                    if (gameState.evidenceFoundInCurrentCase.length >= currentCase.requiredEvidenceCount) {
                        ui.btnDecide.classList.remove('hidden');
                        ui.storyInstructions.innerHTML = '<p style="color: var(--cyber-success)">Sufficient evidence collected. Review the board and MAKE DECISION.</p>';
                    }
                }
            });
        });
    }

    function addEvidenceToBoard(evidenceData) {
        if (ui.evidenceEmptyState.style.display !== 'none') {
            ui.evidenceEmptyState.style.display = 'none';
        }

        const el = document.createElement('div');
        el.className = 'evidence-item';
        el.innerHTML = `
            <div class="evidence-header">
                <span class="evidence-title">${evidenceData.title}</span>
                <span class="evidence-xp">+${evidenceData.xp} XP</span>
            </div>
            <div class="evidence-desc">${evidenceData.desc}</div>
        `;
        ui.evidenceBoard.appendChild(el);
        
        // Scroll to bottom
        ui.evidenceBoard.scrollTop = ui.evidenceBoard.scrollHeight;
    }

    function updateEvidenceCounter() {
        const currentCase = cases[gameState.currentCaseIndex];
        const found = gameState.evidenceFoundInCurrentCase.length;
        const total = currentCase.requiredEvidenceCount;
        ui.statEvidence.textContent = `${found} / ${total}`;
    }

    function addXP(amount) {
        gameState.xp += amount;
        if (gameState.xp < 0) gameState.xp = 0;
        
        // Animate XP counter
        ui.statXp.style.transform = 'scale(1.2)';
        ui.statXp.style.color = '#fff';
        setTimeout(() => {
            ui.statXp.textContent = gameState.xp;
            ui.statXp.style.transform = 'scale(1)';
            ui.statXp.style.color = '';
        }, 150);
    }

    function showDecisionModal() {
        const currentCase = cases[gameState.currentCaseIndex];
        ui.decisionQuestion.textContent = currentCase.decision.question;
        
        ui.decisionOptions.innerHTML = '';
        currentCase.decision.options.forEach((opt, index) => {
            const btn = document.createElement('div');
            btn.className = 'decision-option';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => handleDecision(index));
            ui.decisionOptions.appendChild(btn);
        });

        ui.decisionModal.classList.remove('hidden');
    }

    function handleDecision(optionIndex) {
        gameState.decisionMade = true;
        ui.decisionModal.classList.add('hidden');
        
        const currentCase = cases[gameState.currentCaseIndex];
        const selectedOption = currentCase.decision.options[optionIndex];
        
        // Update Result Modal
        ui.resultConsequence.textContent = selectedOption.consequence;
        ui.lessonTitle.textContent = selectedOption.lessonTitle;
        ui.resultLesson.textContent = selectedOption.lessonText;
        
        addXP(selectedOption.xpChange);
        
        if (selectedOption.xpChange > 0) {
            ui.xpRewardDisplay.textContent = `+${selectedOption.xpChange} XP`;
            ui.xpRewardDisplay.className = 'xp-reward';
        } else {
            ui.xpRewardDisplay.textContent = `${selectedOption.xpChange} XP`;
            ui.xpRewardDisplay.className = 'xp-reward xp-penalty';
        }

        if (selectedOption.isCorrect) {
            ui.resultHeader.style.background = 'rgba(16, 185, 129, 0.2)';
            ui.resultTitle.textContent = 'CASE SOLVED';
            ui.resultTitle.style.color = 'var(--cyber-success)';
            ui.lessonIcon.textContent = '🛡️';
            ui.lessonIcon.parentElement.style.color = 'var(--cyber-success)';
            ui.lessonIcon.parentElement.parentElement.style.borderLeftColor = 'var(--cyber-success)';
            
            ui.btnNextCase.classList.remove('hidden');
            ui.btnRetryCase.classList.add('hidden');
        } else {
            ui.resultHeader.style.background = 'rgba(239, 68, 68, 0.2)';
            ui.resultTitle.textContent = 'INVESTIGATION FAILED';
            ui.resultTitle.style.color = 'var(--cyber-danger)';
            ui.lessonIcon.textContent = '🚩';
            ui.lessonIcon.parentElement.style.color = 'var(--cyber-warning)';
            ui.lessonIcon.parentElement.parentElement.style.borderLeftColor = 'var(--cyber-warning)';
            
            ui.btnNextCase.classList.add('hidden');
            ui.btnRetryCase.classList.remove('hidden');
        }

        ui.resultModal.classList.remove('hidden');
    }

    function retryDecision() {
        gameState.decisionMade = false;
        ui.resultModal.classList.add('hidden');
        showDecisionModal();
    }

    function loadNextCase() {
        const nextIndex = gameState.currentCaseIndex + 1;
        loadCase(nextIndex);
    }

    // Start game
    initGame();
});
