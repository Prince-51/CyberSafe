// This JavaScript file handles the interactive parts of the CyberSafe website.

// We wait until the entire HTML document is fully loaded before running our code
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check localStorage for saved theme, default to 'dark'
    const savedTheme = localStorage.getItem('cybersafe-theme') || 'dark';
    
    // Apply the saved theme immediately
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if(themeToggleBtn) themeToggleBtn.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('cybersafe-theme', 'dark');
                themeToggleBtn.textContent = '☀️';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('cybersafe-theme', 'light');
                themeToggleBtn.textContent = '🌙';
            }
        });
    }

    // 1. Mobile Menu Toggle functionality
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        // When the hamburger button is clicked...
        menuBtn.addEventListener('click', () => {
            // ...toggle the 'active' class on the navigation links.
            // This will show/hide the menu on mobile devices based on our CSS.
            navLinks.classList.toggle('active');
        });
    }

    // 2. Smooth scrolling for navigation links
    // This makes the page smoothly scroll down when you click 'Tools' or 'Home'
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default instant jump behavior
            
            // If the user clicks a link on mobile, close the menu automatically
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            // Get the target section's ID (e.g., "#tools")
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Scroll to the target element smoothly
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. URL Safety Checker Logic
    const urlForm = document.getElementById('url-checker-form');
    const urlInput = document.getElementById('url-input');
    const resultContainer = document.getElementById('checker-result');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-description');
    const resultDetails = document.getElementById('result-details');

    if (urlForm) {
        urlForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rawUrl = urlInput.value.trim();
            if (!rawUrl) return;
            checkUrlSafety(rawUrl);
        });
    }

    function checkUrlSafety(inputUrl) {
        // Reset classes
        resultContainer.className = 'checker-result';
        resultDetails.innerHTML = '';
        
        let url;
        // 1. Valid URL Check
        try {
            // Add https:// if it's missing just for parsing, but note it might be insecure
            let urlToParse = inputUrl;
            if (!/^https?:\/\//i.test(urlToParse)) {
                urlToParse = 'http://' + urlToParse;
            }
            url = new URL(urlToParse);
        } catch (error) {
            showResult('invalid', 'Invalid URL', 'The entered text is not formatted as a valid web address.', ['Make sure it includes the domain name (like example.com).']);
            return;
        }

        const warnings = [];

        // 2. HTTPS Check
        if (url.protocol !== 'https:') {
            warnings.push('The website does not use a secure HTTPS connection. Information sent over this connection could be intercepted.');
        }

        // 3. IP Address Check
        const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if (ipPattern.test(url.hostname)) {
            warnings.push('The URL uses an IP address instead of a normal domain name. This is highly unusual for legitimate websites and often used in scams.');
        }

        // 4. Phishing Words Check
        const suspiciousWords = ['login', 'secure', 'account', 'update', 'bank', 'verify', 'free', 'auth', 'signin'];
        let foundWord = false;
        suspiciousWords.forEach(word => {
            if (url.hostname.toLowerCase().includes(word) || url.pathname.toLowerCase().includes(word)) {
                foundWord = true;
            }
        });
        if (foundWord) {
            warnings.push('The URL contains words commonly used in phishing attacks to trick you (like "login", "secure", "verify").');
        }

        // 5. Unusually long or complicated structure
        if (inputUrl.length > 100) {
            warnings.push('The URL is unusually long. Phishing links are often excessively long to hide the true destination.');
        }

        // 6. Excessive special characters
        const specialCharMatch = inputUrl.match(/[-@_]/g);
        if (specialCharMatch && specialCharMatch.length > 5) {
            warnings.push('The URL contains an unusual number of special characters (@, -, _).');
        }

        // Determine Final Result
        if (warnings.length > 0) {
            showResult('suspicious', 'Suspicious', 'Several warning signs were detected. We recommend extreme caution.', warnings);
        } else {
            showResult('safe', 'Safe-Looking', 'No obvious warning signs were detected by our basic checks. Remember, this does not guarantee the site is 100% safe.', []);
        }
    }

    function showResult(type, title, description, detailsArray) {
        resultContainer.classList.remove('hidden');
        resultTitle.textContent = title;
        resultDesc.textContent = description;
        
        if (type === 'safe') {
            resultContainer.classList.add('result-safe');
            resultIcon.textContent = '✅';
        } else if (type === 'suspicious') {
            resultContainer.classList.add('result-suspicious');
            resultIcon.textContent = '⚠️';
        } else if (type === 'invalid') {
            resultContainer.classList.add('result-invalid');
            resultIcon.textContent = '❌';
        }

        detailsArray.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            resultDetails.appendChild(li);
        });
    }

    // 4. Password Strength Checker Logic
    const pwdInput = document.getElementById('pwd-input');
    const pwdToggleBtn = document.getElementById('toggle-pwd-btn');
    const meterBar = document.getElementById('strength-meter-bar');
    const strengthText = document.getElementById('strength-text');
    const pwdAnalysis = document.getElementById('pwd-analysis');
    const pwdReasons = document.getElementById('pwd-reasons');
    const pwdSuggestion = document.getElementById('pwd-suggestion');
    const generatePwdBtn = document.getElementById('generate-pwd-btn');
    const clearPwdBtn = document.getElementById('clear-pwd-btn');
    const commonPwdWarning = document.getElementById('common-pwd-warning');
    const resistanceText = document.getElementById('resistance-text');
    const reqLength = document.getElementById('req-length');
    const reqLower = document.getElementById('req-lower');
    const reqUpper = document.getElementById('req-upper');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');

    if (pwdInput) {
        // Toggle Password Visibility
        if (pwdToggleBtn) {
            pwdToggleBtn.addEventListener('click', () => {
                const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
                pwdInput.setAttribute('type', type);
                pwdToggleBtn.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }

        // Generate Strong Password
        if (generatePwdBtn) {
            generatePwdBtn.addEventListener('click', () => {
                const newPwd = generateStrongPassword();
                pwdInput.value = newPwd;
                pwdInput.setAttribute('type', 'text');
                if (pwdToggleBtn) pwdToggleBtn.textContent = '🙈';
                analyzePassword(newPwd);
            });
        }

        // Clear Password
        if (clearPwdBtn) {
            clearPwdBtn.addEventListener('click', () => {
                pwdInput.value = '';
                pwdInput.setAttribute('type', 'password');
                if (pwdToggleBtn) pwdToggleBtn.textContent = '👁️';
                resetPwdChecker();
            });
        }

        // Check Password on Input
        pwdInput.addEventListener('input', () => {
            const pwd = pwdInput.value;
            if (!pwd) {
                resetPwdChecker();
                return;
            }
            analyzePassword(pwd);
        });
    }

    function generateStrongPassword() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        const array = new Uint32Array(12);
        window.crypto.getRandomValues(array);
        let password = "";
        for (let i = 0; i < array.length; i++) {
            password += chars[array[i] % chars.length];
        }
        // Ensure requirements
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
            return generateStrongPassword();
        }
        return password;
    }

    function resetPwdChecker() {
        meterBar.style.width = '0%';
        meterBar.className = 'strength-meter-bar';
        strengthText.textContent = 'None';
        strengthText.style.color = 'var(--text-primary)';
        if (resistanceText) {
            resistanceText.textContent = 'None';
            resistanceText.style.color = 'var(--text-primary)';
        }
        pwdAnalysis.classList.add('hidden');
        if (commonPwdWarning) commonPwdWarning.classList.add('hidden');
        
        if (reqLength) {
            const resetReq = (el) => {
                if(el) {
                    el.textContent = '❌ ' + el.textContent.substring(2);
                    el.style.color = 'var(--text-secondary)';
                }
            };
            resetReq(reqLength);
            resetReq(reqLower);
            resetReq(reqUpper);
            resetReq(reqNumber);
            resetReq(reqSpecial);
        }
    }

    function analyzePassword(pwd) {
        if (!pwd || pwd.length === 0) {
            resetPwdChecker();
            return;
        }

        let score = 0;
        const reasons = [];
        let suggestion = "Use a longer password or passphrase with a mixture of character types.";
        
        const length = pwd.length;
        if (length > 12) {
            reasons.push("Too long (maximum allowed is 12 characters).");
        } else if (length < 8) {
            reasons.push("Too short (aim for 8-12 characters).");
        } else {
            score += 1;
            if (length === 12) score += 2; // Bonus for hitting max length exactly
            else if (length >= 10) score += 1; 
        }

        const hasLower = /[a-z]/.test(pwd);
        const hasUpper = /[A-Z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);

        if (!hasLower && length > 0) reasons.push("No lowercase letter.");
        if (hasLower) score += 1;
        
        if (!hasUpper && length > 0) reasons.push("No uppercase letter.");
        if (hasUpper) score += 1;
        
        if (!hasNumber && length > 0) reasons.push("No number.");
        if (hasNumber) score += 1;
        
        if (!hasSpecial && length > 0) reasons.push("No special character.");
        if (hasSpecial) score += 1;

        // Update Checklist
        const updateReq = (el, isValid) => {
            if (!el) return;
            if (isValid) {
                el.textContent = '✓ ' + el.textContent.substring(2);
                el.style.color = 'var(--accent-green)';
            } else {
                el.textContent = '❌ ' + el.textContent.substring(2);
                el.style.color = 'var(--text-secondary)';
            }
        };
        
        updateReq(reqLength, length > 0 && length <= 12);
        updateReq(reqLower, hasLower);
        updateReq(reqUpper, hasUpper);
        updateReq(reqNumber, hasNumber);
        updateReq(reqSpecial, hasSpecial);

        // Penalties
        const hasRepeats = /(.)\1{2,}/.test(pwd);
        if (hasRepeats) {
            score -= 1;
            reasons.push("Contains obvious repeated characters.");
        }

        const hasSequence = /(123|234|345|456|567|678|789|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|qwe|wer|ert|asd|sdf|zxc)/i.test(pwd);
        if (hasSequence) {
            score -= 1;
            reasons.push("Contains a simple sequence pattern.");
        }

        const commonPasswords = ['123456', 'password', 'qwerty', '111111', 'password123', 'admin', 'welcome', 'hello'];
        const isCommon = pwd.length > 0 && commonPasswords.includes(pwd.toLowerCase());
        if (isCommon) {
            score -= 2;
            reasons.push("Contains a very common password pattern.");
            if (commonPwdWarning) commonPwdWarning.classList.remove('hidden');
        } else {
            if (commonPwdWarning) commonPwdWarning.classList.add('hidden');
        }

        if (score < 0) score = 0;

        let strength = "Weak";
        let meterWidth = "25%";
        let colorClass = "strength-weak";
        let textColor = "#ef4444";

        if (score <= 2) {
            strength = "Weak";
            meterWidth = "25%";
            colorClass = "strength-weak";
            textColor = "#ef4444";
            suggestion = "Your password is easy to guess. Add more length and different types of characters.";
        } else if (score <= 4) {
            strength = "Fair";
            meterWidth = "50%";
            colorClass = "strength-fair";
            textColor = "#f59e0b";
            suggestion = "A decent start, but consider making it longer or adding symbols to improve security.";
        } else if (score <= 6) {
            strength = "Good";
            meterWidth = "75%";
            colorClass = "strength-good";
            textColor = "#3b82f6";
            suggestion = "Good password. To make it even stronger, consider adding a few more characters.";
        } else {
            strength = "Strong";
            meterWidth = "100%";
            colorClass = "strength-strong";
            textColor = "#10b981";
            suggestion = "Excellent password! It appears strong and resistant to common guessing techniques.";
            if (reasons.length === 0) reasons.push("Looks great! No obvious weaknesses found.");
        }

        // Resistance Estimate
        let resistance = "Very Low";
        if (score <= 2) resistance = "Very Low";
        else if (score === 3) resistance = "Low";
        else if (score === 4) resistance = "Moderate";
        else if (score <= 6) resistance = "High";
        else resistance = "Very High";
        
        if (resistanceText) {
            resistanceText.textContent = resistance;
            if (resistance === "Very Low" || resistance === "Low") resistanceText.style.color = "#ef4444";
            else if (resistance === "Moderate") resistanceText.style.color = "#f59e0b";
            else resistanceText.style.color = "#10b981";
        }

        // Update UI
        meterBar.style.width = meterWidth;
        meterBar.className = 'strength-meter-bar ' + colorClass;
        strengthText.textContent = strength;
        strengthText.style.color = textColor;

        pwdReasons.innerHTML = '';
        reasons.forEach(r => {
            const li = document.createElement('li');
            li.textContent = r;
            pwdReasons.appendChild(li);
        });

        pwdSuggestion.textContent = suggestion;
        pwdAnalysis.classList.remove('hidden');
    }

    // 5. Phishing Awareness Quiz Logic
    const quizScenarioBox = document.getElementById('quiz-scenario-box');
    const quizProgress = document.getElementById('quiz-progress');
    const btnSafe = document.getElementById('btn-safe');
    const btnPhish = document.getElementById('btn-phish');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizResultTitle = document.getElementById('quiz-result-title');
    const quizResultDesc = document.getElementById('quiz-result-desc');
    const btnNextQuiz = document.getElementById('btn-next-quiz');
    const quizQuestionArea = document.getElementById('quiz-question-area');

    if (quizScenarioBox) {
        const scenarios = [
            {
                content: "From: secure-team@paypal-update-info.com<br>Subject: Action Required: Account Limited<br><br>Dear user, your account has been limited due to unusual login attempts. Please click the link below to verify your identity and restore full access immediately.<br><br>&gt; <a href='#' style='color: var(--accent-blue);'>http://verify-account-paypal-update.com/login</a>",
                isPhishing: true,
                explanation: "This is Phishing! Warning signs: The sender email uses a fake domain ('paypal-update-info.com'), the message creates urgency ('immediately'), and it directs you to a suspicious link."
            },
            {
                content: "From: tracking@fedex.com<br>Subject: Delivery Scheduled for Tomorrow<br><br>Hi John,<br>Your package (Tracking #123456789) is scheduled for delivery tomorrow between 9 AM and 1 PM. You can track your package on our official website.<br><br>&gt; <a href='#' style='color: var(--accent-blue);'>https://www.fedex.com/tracking</a>",
                isPhishing: false,
                explanation: "This looks Safe! The sender uses the official domain ('fedex.com'), there are no threats or urgent demands for payment, and the link points to the official HTTPS website."
            },
            {
                content: "SMS Message:<br><br>Netflix: Your payment method was declined. Update your billing information within 24 hours to avoid service interruption: <a href='#' style='color: var(--accent-blue);'>http://netflix-billing-update-now.net</a>",
                isPhishing: true,
                explanation: "This is Phishing! Warning signs: It threatens service interruption within 24 hours (Urgency/Threat) and includes a suspicious unofficial link ('netflix-billing-update-now.net')."
            }
        ];

        let currentScenario = 0;

        function loadScenario() {
            quizFeedback.classList.add('hidden');
            quizQuestionArea.classList.remove('hidden');
            quizProgress.textContent = `${currentScenario + 1}/${scenarios.length}`;
            quizScenarioBox.innerHTML = scenarios[currentScenario].content;
        }

        function handleAnswer(userSaidPhishing) {
            const scenario = scenarios[currentScenario];
            const isCorrect = userSaidPhishing === scenario.isPhishing;
            
            quizQuestionArea.classList.add('hidden');
            quizFeedback.classList.remove('hidden');
            
            if (isCorrect) {
                quizResultTitle.textContent = "✅ Correct!";
                quizResultTitle.style.color = "var(--accent-green)";
                quizFeedback.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                quizFeedback.style.borderLeft = "4px solid var(--accent-green)";
            } else {
                quizResultTitle.textContent = "❌ Incorrect!";
                quizResultTitle.style.color = "#ef4444";
                quizFeedback.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                quizFeedback.style.borderLeft = "4px solid #ef4444";
            }
            
            quizResultDesc.textContent = scenario.explanation;
            
            if (currentScenario === scenarios.length - 1) {
                btnNextQuiz.textContent = "Restart Quiz";
            } else {
                btnNextQuiz.textContent = "Next Scenario";
            }
        }

        btnSafe.addEventListener('click', () => handleAnswer(false));
        btnPhish.addEventListener('click', () => handleAnswer(true));

        btnNextQuiz.addEventListener('click', () => {
            currentScenario++;
            if (currentScenario >= scenarios.length) {
                currentScenario = 0;
            }
            loadScenario();
        });

        // Initialize first scenario
        loadScenario();
    }

    // Just a small log to know our script is working!
    console.log("🛡️ CyberSafe Website initialized successfully!");
});
