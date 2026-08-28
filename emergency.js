/* 
    emergency.js
    Logic for the "I THINK I'VE BEEN SCAMMED" emergency feature
*/

document.addEventListener('DOMContentLoaded', () => {
    const entryBtn = document.getElementById('emergency-entry-btn');
    const modal = document.getElementById('emergency-modal');
    const closeBtn = document.getElementById('em-close-btn');
    const backBtn = document.getElementById('em-back-1');
    const doneBtn = document.getElementById('em-done-btn');
    
    const step1 = document.getElementById('em-step-1');
    const step2 = document.getElementById('em-step-2');
    const step3 = document.getElementById('em-step-3');
    const scenarioCards = document.querySelectorAll('.em-card');
    
    // Step 2 Dynamic Elements
    const visualScene = document.getElementById('em-visual-scene');
    const actionsList = document.getElementById('em-actions-list');
    const actSubtitle = document.getElementById('em-act-subtitle');
    const warningSection = document.querySelector('.em-warning-card');
    const proofSection = document.getElementById('em-proof-section');

    const scenarioData = {
        'money': {
            visual: `
                <div class="em-scene-box">
                    <span style="font-size:1.5rem">📱</span><br>
                    <strong>₹1,500</strong><br>
                    <small>Payment Sent</small>
                </div>
                <div class="em-scene-warning">⚠️ Suspicious</div>
            `,
            actions: [
                { icon: '🏦', title: 'CONTACT YOUR BANK / PAYMENT PROVIDER', desc: 'Use the official app, website or phone number.' },
                { icon: '🔐', title: 'SECURE YOUR ACCOUNT', desc: 'Change your password if you suspect account access.' },
                { icon: '📸', title: 'KEEP THE PROOF', desc: 'Save screenshots and transaction details.' }
            ]
        },
        'link': {
            visual: `
                <div class="em-scene-box">Message</div>
                <div class="em-scene-arrow">&darr;</div>
                <div class="em-scene-box">Suspicious Link</div>
                <div class="em-scene-warning">⚠️ Warning</div>
            `,
            actions: [
                { icon: '❌', title: 'CLOSE THE PAGE', desc: "Don't enter more information." },
                { icon: '🔑', title: 'CHANGE YOUR PASSWORD', desc: 'Do this if you entered your password.' },
                { icon: '🔐', title: 'TURN ON 2FA', desc: 'Add another layer of protection.' }
            ]
        },
        'password': {
            visual: `
                <div class="em-scene-box">Password / OTP field</div>
                <div class="em-scene-arrow">&darr;</div>
                <div class="em-scene-warning">⚠️ Information exposed</div>
            `,
            actions: [
                { icon: '🔑', title: 'CHANGE YOUR PASSWORD', desc: 'Never share OTPs, PINs or passwords with anyone.' },
                { icon: '🚪', title: 'SIGN OUT OTHER DEVICES', desc: '' },
                { icon: '🔐', title: 'TURN ON 2FA', desc: '' }
            ]
        },
        'app': {
            visual: `
                <div class="em-scene-box">Phone</div>
                <div class="em-scene-arrow">&darr;</div>
                <div class="em-scene-box">Unknown App</div>
                <div class="em-scene-warning">⚠️ Warning</div>
            `,
            actions: [
                { icon: '📵', title: 'STOP USING THE SUSPICIOUS APP', desc: '' },
                { icon: '🗑️', title: 'REMOVE IT IF SAFE TO DO SO', desc: '' },
                { icon: '🔐', title: 'SECURE IMPORTANT ACCOUNTS', desc: '' }
            ]
        },
        'account': {
            visual: `
                <div class="em-scene-box">Account</div>
                <div class="em-scene-arrow">&darr;</div>
                <div class="em-scene-box">Unknown Login</div>
                <div class="em-scene-warning">⚠️ Warning</div>
            `,
            actions: [
                { icon: '🔐', title: 'CHANGE YOUR PASSWORD', desc: '' },
                { icon: '🚪', title: 'SIGN OUT OTHER DEVICES', desc: '' },
                { icon: '🛡️', title: 'TURN ON 2FA', desc: 'Check recent account activity.' }
            ]
        },
        'notsure': {
            visual: `
                <div class="em-scene-box" style="font-size:2rem;">🤷</div>
                <div class="em-scene-warning">Uncertain</div>
            `,
            actions: [
                { icon: '🛑', title: "Don't send money", desc: '' },
                { icon: '🛑', title: "Don't share OTP/passwords", desc: '' },
                { icon: '🛑', title: "Don't click more links", desc: '' }
            ],
            customSubtitle: "⚠️ PLAY IT SAFE",
            customText: "Check your account activity and contact the relevant official service if something looks wrong.",
            btnText: "I UNDERSTAND &rarr;"
        }
    };

    // Open Modal
    entryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        showStep(1);
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        setTimeout(() => showStep(1), 300); // reset after fade out
    });

    // Back Button (Step 2 -> Step 1)
    backBtn.addEventListener('click', () => {
        showStep(1);
    });

    // Done Button (Step 2 -> Step 3)
    doneBtn.addEventListener('click', () => {
        showStep(3);
    });

    // Handle Scenario Selection
    scenarioCards.forEach(card => {
        card.addEventListener('click', () => {
            const scenario = card.getAttribute('data-scenario');
            populateStep2(scenario);
            showStep(2);
        });
    });

    function showStep(stepNumber) {
        step1.classList.remove('active');
        step1.classList.add('hidden');
        step2.classList.remove('active');
        step2.classList.add('hidden');
        step3.classList.remove('active');
        step3.classList.add('hidden');

        if (stepNumber === 1) {
            step1.classList.remove('hidden');
            step1.classList.add('active');
        } else if (stepNumber === 2) {
            step2.classList.remove('hidden');
            step2.classList.add('active');
            // scroll to top of modal
            modal.scrollTop = 0;
        } else if (stepNumber === 3) {
            step3.classList.remove('hidden');
            step3.classList.add('active');
            modal.scrollTop = 0;
        }
    }

    function populateStep2(scenarioKey) {
        const data = scenarioData[scenarioKey];
        if (!data) return;

        // Visual
        visualScene.innerHTML = data.visual;

        // Actions
        actionsList.innerHTML = '';
        data.actions.forEach(act => {
            const actHTML = `
                <div class="em-action-item">
                    <div class="em-action-icon">${act.icon}</div>
                    <div class="em-action-content">
                        <h4>${act.title}</h4>
                        ${act.desc ? '<p>' + act.desc + '</p>' : ''}
                    </div>
                </div>
            `;
            actionsList.innerHTML += actHTML;
        });

        // Special case for 'notsure'
        if (scenarioKey === 'notsure') {
            actSubtitle.innerHTML = `<strong style="color:var(--text-primary);">${data.customSubtitle}</strong>`;
            warningSection.style.display = 'none';
            proofSection.style.display = 'none';
            doneBtn.innerHTML = data.btnText;
            
            // Add custom text below actions
            actionsList.innerHTML += `<p style="text-align:center; margin-top:1rem; color:var(--text-secondary);">${data.customText}</p>`;
        } else {
            actSubtitle.textContent = 'You may need to act quickly.';
            warningSection.style.display = 'block';
            proofSection.style.display = 'block';
            doneBtn.innerHTML = "✓ I'VE DONE THIS";
        }
    }
});
