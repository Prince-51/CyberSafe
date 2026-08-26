document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('cybersafe-intro');
    if (!intro) return;

    const skipBtn = document.getElementById('intro-skip-btn');
    const introKey = 'cybersafe-cinematic-intro-seen';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use sessionStorage so the intro only plays once per visit (doesn't repeat when using the back button)
    if (sessionStorage.getItem(introKey)) {
        intro.style.display = 'none';
        return;
    }

    const finishIntro = () => {
        if (!intro.classList.contains('hidden')) {
            intro.classList.add('hidden');
            sessionStorage.setItem(introKey, 'true');
            setTimeout(() => {
                intro.style.display = 'none';
            }, 800);
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
            if (s) s.classList.remove('active');
        });
    };

    if (prefersReducedMotion) {
        // Simplified sequence for reduced motion
        setTimeout(() => { hideAll(); if(scenes[1]) scenes[1].classList.add('active'); }, 0);
        setTimeout(() => { hideAll(); if(scenes.activate) scenes.activate.classList.add('active', 'animate'); }, 1500);
        setTimeout(() => { hideAll(); if(scenes.reveal) scenes.reveal.classList.add('active'); }, 3000);
        setTimeout(finishIntro, 4500);
    } else {
        // Full Cinematic Story Sequence (17 seconds)
        // 0-5s: Opening atmosphere, First person, Scam message arrives
        setTimeout(() => { hideAll(); if(scenes[1]) scenes[1].classList.add('active'); }, 0);

        // 5-8s: Second person + Suspicious link
        setTimeout(() => { 
            hideAll(); 
            if(scenes[2]) {
                scenes[2].classList.add('active'); 
                setTimeout(() => {
                    const warning = scenes[2].querySelector('.warning-box');
                    if (warning) warning.style.opacity = '1';
                }, 1000); // warning appears after 1 second
            }
        }, 5000);

        // 8-10.5s: Third person + Fake login situation
        setTimeout(() => { 
            hideAll(); 
            if(scenes[3]) {
                scenes[3].classList.add('active');
                setTimeout(() => {
                    const warning = scenes[3].querySelector('.warning-box');
                    const caption = scenes[3].querySelector('.scene-caption');
                    if (warning) warning.style.opacity = '1';
                    if (caption) caption.style.opacity = '1';
                }, 1000);
            }
        }, 8000);

        // 10.5-11.5s: Everything freezes (Suspense / danger)
        setTimeout(() => {
            if(scenes[3]) scenes[3].classList.add('freeze');
        }, 10500);

        // 11.5-13s: CYBERSAFE ACTIVATES (Shield forms)
        setTimeout(() => {
            hideAll();
            if(scenes.activate) scenes.activate.classList.add('active', 'animate');
        }, 11500);

        // 13-14s: Protection pulse
        setTimeout(() => {
            if(wave) wave.classList.add('fire');
            const threat = scenes.activate.querySelector('.threat');
            if (threat) threat.style.display = 'none';
        }, 13000);

        // 14-15.5s: CYBERSAFE REVEAL
        setTimeout(() => {
            hideAll();
            if(scenes.reveal) scenes.reveal.classList.add('active');
        }, 14000);

        // 15.5-17s: Smooth transition to homepage
        setTimeout(finishIntro, 15500);
    }

    // Replay logic setup (already placed in footer by index.html)
    const replayBtn = document.getElementById('replay-intro-btn');
    if (replayBtn) {
        replayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem(introKey);
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
});
