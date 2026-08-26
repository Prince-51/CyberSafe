function initCyberSafeIntro() {
    const intro = document.getElementById('cybersafe-intro');
    if (!intro) return;

    const skipBtn = document.getElementById('intro-skip-btn');
    // Renamed key to force the intro to show again for testing after the bug
    const introKey = 'cybersafe-cinematic-intro-v3';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use localStorage so the intro only plays once per visit
    if (localStorage.getItem(introKey)) {
        intro.style.display = 'none';
        return;
    }

    const finishIntro = () => {
        if (!intro.classList.contains('hidden')) {
            intro.classList.add('hidden');
            localStorage.setItem(introKey, 'true');
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
        Object.values(scenes).forEach(s => {
            if (s) s.classList.remove('active', 'freeze');
        });
    };

    if (prefersReducedMotion) {
        // Simplified sequence for reduced motion
        setTimeout(() => { hideAll(); if(scenes[1]) scenes[1].classList.add('active'); }, 0);
        setTimeout(() => { hideAll(); if(scenes.activate) scenes.activate.classList.add('active', 'animate'); }, 1000);
        setTimeout(() => { hideAll(); if(scenes.reveal) scenes.reveal.classList.add('active'); }, 2000);
        setTimeout(finishIntro, 3500);
    } else {
        // Fast Cinematic Story Sequence (6.5 seconds)
        // 0.0–1.0s Person + scam message
        setTimeout(() => { hideAll(); if(scenes[1]) scenes[1].classList.add('active'); }, 0);

        // 1.0–2.0s Second person + suspicious link
        setTimeout(() => { 
            hideAll(); 
            if(scenes[2]) {
                scenes[2].classList.add('active'); 
                setTimeout(() => {
                    const warning = scenes[2].querySelector('.warning-box');
                    if (warning) warning.style.opacity = '1';
                }, 400); // warning appears quickly
            }
        }, 1000);

        // 2.0–3.0s Third person + fake login
        setTimeout(() => { 
            hideAll(); 
            if(scenes[3]) {
                scenes[3].classList.add('active');
                setTimeout(() => {
                    const warning = scenes[3].querySelector('.warning-box');
                    const caption = scenes[3].querySelector('.scene-caption');
                    if (warning) warning.style.opacity = '1';
                    if (caption) caption.style.opacity = '1';
                }, 400);
            }
        }, 2000);

        // 3.0–3.3s Danger freezes / suspense
        setTimeout(() => {
            if(scenes[3]) scenes[3].classList.add('freeze');
        }, 3000);

        // 3.3–4.2s CyberSafe shield activates
        setTimeout(() => {
            hideAll();
            if(scenes.activate) scenes.activate.classList.add('active', 'animate');
        }, 3300);

        // 4.2–4.8s Protection wave
        setTimeout(() => {
            if(wave) wave.classList.add('fire');
            const threat = scenes.activate.querySelector('.threat');
            if (threat) threat.style.display = 'none';
        }, 4200);

        // 4.8–5.8s CYBERSAFE logo reveal
        setTimeout(() => {
            hideAll(); // Hiding scene.activate here at 4.8s allows the 0.6s wave to complete perfectly
            if(scenes.reveal) scenes.reveal.classList.add('active');
        }, 4800);

        // 5.8–6.5s Homepage transition
        setTimeout(finishIntro, 5800);
    }

    // Replay logic setup (already placed in footer by index.html)
    const replayBtn = document.getElementById('replay-intro-btn');
    if (replayBtn) {
        replayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem(introKey);
            location.reload();
        });
    }

    // Optional subtle interactivity: hover/tilt effect on scenes
    document.addEventListener('mousemove', (e) => {
        if (!intro.classList.contains('hidden')) {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            Object.values(scenes).forEach(s => {
                if (s && s.classList.contains('active')) {
                    s.style.transform = `translate(${x}px, ${y}px)`;
                }
            });
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCyberSafeIntro);
} else {
    initCyberSafeIntro();
}
