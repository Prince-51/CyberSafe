function initCyberSafeIntro() {
    const intro = document.getElementById('cybersafe-intro');
    if (!intro) return;

    const skipBtn = document.getElementById('intro-skip-btn');
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Session & Visit Detection
    const sessionKey = 'cybersafe-session-active';
    const heartbeatKey = 'cybersafe-heartbeat';
    
    const now = Date.now();
    const lastHeartbeat = localStorage.getItem(heartbeatKey);
    // If heartbeat was within the last 2 seconds, assume another tab is open
    const isAnotherTabOpen = lastHeartbeat && (now - parseInt(lastHeartbeat)) < 2000;
    
    const hasSeenIntroInTab = sessionStorage.getItem(sessionKey) === 'true';
    let shouldSkipIntro = false;

    if (hasSeenIntroInTab) {
        // Case: Refresh or navigation within the same tab
        shouldSkipIntro = true;
    } else if (isAnotherTabOpen) {
        // Case: New tab opened while another tab is active
        shouldSkipIntro = true;
        sessionStorage.setItem(sessionKey, 'true');
    } else {
        // Case: Completely new visit
        sessionStorage.setItem(sessionKey, 'true');
    }

    // Maintain heartbeat
    localStorage.setItem(heartbeatKey, Date.now().toString());
    setInterval(() => {
        localStorage.setItem(heartbeatKey, Date.now().toString());
    }, 1000);

    if (shouldSkipIntro) {
        intro.style.display = 'none';
        return;
    }

    const finishIntro = () => {
        if (!intro.classList.contains('hidden')) {
            intro.classList.add('hidden');
            setTimeout(() => {
                intro.style.display = 'none';
            }, 700);
        }
    };

    if (skipBtn) {
        skipBtn.addEventListener('click', finishIntro);
    }

    const scenes = {
        1: document.getElementById('scene-1'),
        2: document.getElementById('scene-2'),
        3: document.getElementById('scene-3'),
        activate: document.getElementById('scene-activate'),
        together: document.getElementById('scene-together'),
        reveal: document.getElementById('scene-reveal')
    };

    const wave = document.querySelector('.protection-wave');

    const hideAll = () => {
        for (let key in scenes) {
            if (scenes.hasOwnProperty(key) && scenes[key]) {
                scenes[key].classList.remove('active', 'freeze');
            }
        }
    };

    if (prefersReducedMotion) {
        // Simplified sequence for reduced motion
        setTimeout(() => { hideAll(); if(scenes[1]) scenes[1].classList.add('active'); }, 0);
        setTimeout(() => { hideAll(); if(scenes.activate) scenes.activate.classList.add('active', 'animate'); }, 2000);
        setTimeout(() => { hideAll(); if(scenes.reveal) scenes.reveal.classList.add('active'); }, 4000);
        setTimeout(finishIntro, 6000);
    } else {
        // Paced Cinematic Story Sequence (9.5 seconds)
        // 0.0–2.0s Person + scam message
        setTimeout(() => { hideAll(); if(scenes[1]) scenes[1].classList.add('active'); }, 0);

        // 2.0–4.0s Second person + suspicious link
        setTimeout(() => { 
            hideAll(); 
            if(scenes[2]) {
                scenes[2].classList.add('active'); 
                setTimeout(() => {
                    const warning = scenes[2].querySelector('.warning-box');
                    if (warning) warning.style.opacity = '1';
                }, 800); // warning appears slightly later
            }
        }, 2000);

        // 4.0–6.0s Third person + fake login
        setTimeout(() => { 
            hideAll(); 
            if(scenes[3]) {
                scenes[3].classList.add('active');
                setTimeout(() => {
                    const warning = scenes[3].querySelector('.warning-box');
                    const caption = scenes[3].querySelector('.scene-caption');
                    if (warning) warning.style.opacity = '1';
                    if (caption) caption.style.opacity = '1';
                }, 800);
            }
        }, 4000);

        // 6.0–6.3s Danger freezes / suspense
        setTimeout(() => {
            if(scenes[3]) scenes[3].classList.add('freeze');
        }, 6000);

        // 6.3–7.2s CyberSafe shield activates
        setTimeout(() => {
            hideAll();
            if(scenes.activate) scenes.activate.classList.add('active', 'animate');
        }, 6300);

        // 7.2–7.8s Protection wave
        setTimeout(() => {
            if(wave) wave.classList.add('fire');
            const threat = scenes.activate.querySelector('.threat');
            if (threat) threat.style.display = 'none';
        }, 7200);

        // 7.8–8.8s CYBERSAFE logo reveal
        setTimeout(() => {
            hideAll(); // Hiding scene.activate here allows wave to complete perfectly
            if(scenes.reveal) scenes.reveal.classList.add('active');
        }, 7800);

        // 8.8–9.5s Homepage transition
        setTimeout(finishIntro, 8800);
    }

    // Replay logic setup (already placed in footer by index.html)
    const replayBtn = document.getElementById('replay-intro-btn');
    if (replayBtn) {
        replayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('cybersafe-session-active');
            localStorage.removeItem('cybersafe-heartbeat');
            location.reload();
        });
    }

    // Optional subtle interactivity: hover/tilt effect on scenes
    document.addEventListener('mousemove', (e) => {
        if (!intro.classList.contains('hidden')) {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            for (let key in scenes) {
                if (scenes.hasOwnProperty(key) && scenes[key] && scenes[key].classList.contains('active')) {
                    scenes[key].style.transform = `translate(${x}px, ${y}px)`;
                }
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCyberSafeIntro);
} else {
    initCyberSafeIntro();
}
