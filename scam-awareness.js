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
        },
        {
            id: 'CASE_02',
            title: 'THE LUCRATIVE JOB OFFER',
            description: 'Investigate the message above. Click on any suspicious elements to collect evidence.',
            requiredEvidenceCount: 4,
            phoneUI: `
                <div class="phone-ui dark-mode">
                    <div class="phone-header">WhatsApp</div>
                    <div class="phone-body">
                        <div style="text-align: center; margin-bottom: 10px; font-size: 0.8rem; color: #888;">Today 2:15 PM</div>
                        <div class="message-bubble" style="background: var(--bg-card); color: var(--text-primary); border-radius: 8px; padding: 12px; border-left: 4px solid #25D366;">
                            <strong>From: <span class="clickable-evidence" data-evidence="c2_sender">+91 98765 43210</span></strong>
                            <br><br>
                            <span class="clickable-evidence" data-evidence="c2_offer">Congratulations! You have been selected for a Work From Home job.</span>
                            <br><br>
                            Earn <span class="clickable-evidence" data-evidence="c2_salary">₹3,000–₹5,000 per day</span>.
                            <br><br>
                            Pay <span class="clickable-evidence" data-evidence="c2_fee">₹499 registration fee</span> to activate your account.
                            <br><br>
                            Reply YES to start now!
                        </div>
                    </div>
                </div>
            `,
            evidenceList: {
                'c2_sender': {
                    title: 'Unknown Sender',
                    desc: 'Legitimate recruiters rarely offer jobs out of the blue via WhatsApp numbers.',
                    xp: 20
                },
                'c2_offer': {
                    title: 'Unexpected Job Offer',
                    desc: 'Being selected for a job you never applied for is a major red flag.',
                    xp: 20
                },
                'c2_salary': {
                    title: 'Unrealistic Salary',
                    desc: 'Promises of extremely high pay for simple work from home are typical scam bait.',
                    xp: 20
                },
                'c2_fee': {
                    title: 'Upfront Registration Fee',
                    desc: 'Real companies pay you. They never ask you to pay a security or registration fee to get a job.',
                    xp: 20
                }
            },
            decision: {
                question: 'You have collected enough evidence. What is your decision?',
                options: [
                    {
                        text: 'Pay the ₹499 fee. It is a small amount for a big salary.',
                        isCorrect: false,
                        consequence: 'You paid the fee. The scammer took the money and blocked your number. There was no job.',
                        lessonTitle: 'NEVER PAY FOR A JOB',
                        lessonText: 'If you have to pay money to start earning money, it is almost certainly a scam.',
                        xpChange: -20
                    },
                    {
                        text: 'Ask the sender to deduct the ₹499 from your first salary.',
                        isCorrect: false,
                        consequence: 'You engaged with the scammer. They might try to trick you into clicking a payment link anyway or sell your active number to other scammers.',
                        lessonTitle: 'DO NOT ENGAGE',
                        lessonText: 'Trying to outsmart scammers is risky. Just ignore and block them.',
                        xpChange: -10
                    },
                    {
                        text: 'Do not pay. Block the sender and verify the company independently.',
                        isCorrect: true,
                        consequence: 'Great job! You protected your money by recognizing the classic signs of an employment scam.',
                        lessonTitle: 'VERIFY INDEPENDENTLY',
                        lessonText: 'Always verify job offers by visiting the company\'s official website or contacting them through trusted channels.',
                        xpChange: 50
                    }
                ]
            }
        },
        {
            id: 'CASE_03',
            title: 'THE KYC DEADLINE',
            description: 'Investigate the SMS above. Click on any suspicious elements to collect evidence.',
            requiredEvidenceCount: 4,
            phoneUI: `
                <div class="phone-ui dark-mode">
                    <div class="phone-header">SMS Messages</div>
                    <div class="phone-body">
                        <div style="text-align: center; margin-bottom: 10px; font-size: 0.8rem; color: #888;">Today 9:30 AM</div>
                        <div class="message-bubble" style="background: rgba(255, 255, 255, 0.05);">
                            <strong>From: <span class="clickable-evidence" data-evidence="c3_sender">JM-BANKKYC</span></strong>
                            <br><br>
                            <span class="clickable-evidence" data-evidence="c3_urgent">URGENT! Your bank account will be blocked today.</span>
                            <br><br>
                            <span class="clickable-evidence" data-evidence="c3_info">Complete your KYC immediately</span> by clicking this link:
                            <br><br>
                            <a href="#" class="clickable-evidence" data-evidence="c3_link" style="color: #3b82f6;">http://kyc-update-bank-verification.net/login</a>
                        </div>
                    </div>
                </div>
            `,
            evidenceList: {
                'c3_sender': {
                    title: 'Suspicious Header',
                    desc: 'While it looks somewhat official, scammers can spoof SMS sender IDs.',
                    xp: 20
                },
                'c3_urgent': {
                    title: 'Urgent Threat',
                    desc: 'Threatening to block your account today creates panic, a classic scam tactic.',
                    xp: 20
                },
                'c3_info': {
                    title: 'KYC Request via SMS',
                    desc: 'Banks do not ask you to complete KYC by clicking random links in SMS messages.',
                    xp: 20
                },
                'c3_link': {
                    title: 'Unofficial Link',
                    desc: 'The link is long and does not match the official bank domain.',
                    xp: 20
                }
            },
            decision: {
                question: 'You have collected enough evidence. What is your decision?',
                options: [
                    {
                        text: 'Click the link and fill out the form quickly to save the account.',
                        isCorrect: false,
                        consequence: 'You clicked the malicious link. Scammers captured your banking credentials and OTP, draining your account.',
                        lessonTitle: 'NEVER CLICK SMS LINKS',
                        lessonText: 'Links in unexpected text messages are extremely dangerous. Always open the banking app directly.',
                        xpChange: -20
                    },
                    {
                        text: 'Call the number back to see if it is real.',
                        isCorrect: false,
                        consequence: 'You called a fake customer care number provided by scammers. They verbally tricked you into sharing your details.',
                        lessonTitle: 'USE OFFICIAL CHANNELS',
                        lessonText: 'Never call numbers provided in suspicious messages. Look up the official customer care number yourself.',
                        xpChange: -10
                    },
                    {
                        text: 'Ignore the link. Open the official banking app to check for alerts.',
                        isCorrect: true,
                        consequence: 'Perfect! You avoided panic and safely verified your account status using the official banking app.',
                        lessonTitle: 'MANUAL VERIFICATION',
                        lessonText: 'If you receive an urgent banking alert, log in manually through the official app or website. Do not rely on provided links.',
                        xpChange: 50
                    }
                ]
            }
        },
        {
            id: 'CASE_04',
            title: 'THE INCREDIBLE DEAL',
            description: 'Investigate the website ad above. Click on any suspicious elements to collect evidence.',
            requiredEvidenceCount: 4,
            phoneUI: `
                <div class="phone-ui dark-mode">
                    <div class="phone-header" style="font-family: monospace;">Browser</div>
                    <div class="phone-body" style="padding: 0; display: flex; flex-direction: column;">
                        <div style="background: var(--bg-secondary); padding: 8px; border-bottom: 1px solid var(--border); font-size: 0.85rem; color: #aaa;">
                            <span class="clickable-evidence" data-evidence="c4_website">🔒 https://amazing-discounts-shop-now.xyz</span>
                        </div>
                        <div style="padding: 15px; text-align: center;">
                            <h3 style="color: var(--danger); margin-bottom: 10px;">🔥 <span class="clickable-evidence" data-evidence="c4_pressure">TODAY ONLY! 90% OFF!</span> 🔥</h3>
                            <div style="width: 100px; height: 100px; background: #333; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">📱</div>
                            <h4>Premium Smartphone Pro</h4>
                            <p style="margin: 10px 0;"><span style="text-decoration: line-through; color: #888;">₹49,999</span> <span class="clickable-evidence" data-evidence="c4_price" style="color: var(--success); font-weight: bold; font-size: 1.2rem;">₹4,999</span></p>
                            <p class="clickable-evidence" data-evidence="c4_contact" style="font-size: 0.8rem; color: #888; margin-bottom: 15px;">No returns. Support email: none.</p>
                            <button style="background: var(--danger); color: white; border: none; padding: 10px 20px; border-radius: 5px; width: 100%; cursor: pointer;">Pay Now to Confirm</button>
                        </div>
                    </div>
                </div>
            `,
            evidenceList: {
                'c4_website': {
                    title: 'Unknown Website',
                    desc: 'The domain name is very strange and ends in .xyz, which is common for short-lived scam sites.',
                    xp: 20
                },
                'c4_pressure': {
                    title: 'High Pressure Sales',
                    desc: 'Creating an artificial rush ("TODAY ONLY") pushes you to buy before thinking.',
                    xp: 20
                },
                'c4_price': {
                    title: 'Unrealistically Low Price',
                    desc: 'A 90% discount on a premium smartphone is virtually impossible. If it is too good to be true, it probably is.',
                    xp: 20
                },
                'c4_contact': {
                    title: 'Missing Contact Info',
                    desc: 'Legitimate stores have clear return policies, physical addresses, and reliable customer support.',
                    xp: 20
                }
            },
            decision: {
                question: 'You have collected enough evidence. What is your decision?',
                options: [
                    {
                        text: 'Buy it immediately before the deal expires!',
                        isCorrect: false,
                        consequence: 'You paid the money, but the phone never arrived. The website disappeared the next day.',
                        lessonTitle: 'BEWARE TOO GOOD TO BE TRUE',
                        lessonText: 'Scammers use unbelievably low prices to trick bargain hunters. Always shop on trusted, well-known platforms.',
                        xpChange: -20
                    },
                    {
                        text: 'Add it to the cart, but use a credit card just in case.',
                        isCorrect: false,
                        consequence: 'While credit cards offer some protection, you still exposed your payment details to a fraudulent website.',
                        lessonTitle: 'AVOID SHADY SITES',
                        lessonText: 'Do not enter payment information on unknown, untrusted websites, regardless of the payment method.',
                        xpChange: -10
                    },
                    {
                        text: 'Leave the website. Research the seller and buy from trusted platforms.',
                        isCorrect: true,
                        consequence: 'Excellent observation! You avoided a fake shopping scam by recognizing the obvious red flags.',
                        lessonTitle: 'PREFER TRUSTED PLATFORMS',
                        lessonText: 'Always check reviews and stick to established e-commerce platforms, especially for expensive items.',
                        xpChange: 50
                    }
                ]
            }
        },
        {
            id: 'CASE_05',
            title: 'THE FRIEND IN NEED',
            description: 'Investigate the direct message above. Click on any suspicious elements to collect evidence.',
            requiredEvidenceCount: 4,
            phoneUI: `
                <div class="phone-ui dark-mode">
                    <div class="phone-header">Direct Message</div>
                    <div class="phone-body">
                        <div style="text-align: center; margin-bottom: 10px; font-size: 0.8rem; color: #888;">Rahul (Friend)</div>
                        <div class="message-bubble" style="background: var(--bg-card); color: var(--text-primary); border-radius: 8px; padding: 12px; margin-bottom: 10px;">
                            Hey, <span class="clickable-evidence" data-evidence="c5_emotion">I'm stuck in an emergency right now.</span>
                            <br><br>
                            <span class="clickable-evidence" data-evidence="c5_money">Please send me ₹2,000 urgently.</span> I'll return it tonight.
                        </div>
                        <div class="message-bubble" style="background: var(--bg-card); color: var(--text-primary); border-radius: 8px; padding: 12px;">
                            <span class="clickable-evidence" data-evidence="c5_verify">My normal UPI isn't working, use this new number.</span>
                            <br><br>
                            Also <span class="clickable-evidence" data-evidence="c5_otp">send me the OTP when you receive it</span> to confirm the transfer.
                        </div>
                    </div>
                </div>
            `,
            evidenceList: {
                'c5_emotion': {
                    title: 'Emotional Pressure',
                    desc: 'Scammers hijack accounts and claim emergencies to make you act quickly out of concern.',
                    xp: 20
                },
                'c5_money': {
                    title: 'Unexpected Money Request',
                    desc: 'Sudden requests for money via social media are often account takeover scams.',
                    xp: 20
                },
                'c5_verify': {
                    title: 'Identity Not Verified',
                    desc: 'They are asking you to send money to a new/unknown number, bypassing usual checks.',
                    xp: 20
                },
                'c5_otp': {
                    title: 'OTP Request',
                    desc: 'NEVER share an OTP. Scammers use this trick to log into YOUR accounts or authorize payments from YOUR bank.',
                    xp: 20
                }
            },
            decision: {
                question: 'You have collected enough evidence. What is your decision?',
                options: [
                    {
                        text: 'Send the money and the OTP. Rahul is a good friend.',
                        isCorrect: false,
                        consequence: 'Rahul\'s account was hacked! The scammer took your money, and by giving them the OTP, they gained access to your account too.',
                        lessonTitle: 'NEVER SHARE OTPS',
                        lessonText: 'Never share OTPs with anyone, even friends or family. They are the keys to your accounts.',
                        xpChange: -20
                    },
                    {
                        text: 'Send the money, but refuse to send the OTP.',
                        isCorrect: false,
                        consequence: 'You lost the money because you sent it to a scammer who had hacked your friend\'s account.',
                        lessonTitle: 'VERIFY IDENTITIES',
                        lessonText: 'Always verify the identity of someone asking for money online, even if it appears to be a friend.',
                        xpChange: -10
                    },
                    {
                        text: 'Call Rahul directly on his phone number to verify.',
                        isCorrect: true,
                        consequence: 'Smart move! You called Rahul and found out his account was hacked. You saved your money and alerted him!',
                        lessonTitle: 'CALL TO VERIFY',
                        lessonText: 'If a friend asks for money urgently via messages, call them on a known number to confirm it is really them.',
                        xpChange: 50
                    }
                ]
            }
        }
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
