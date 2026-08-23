// cyber-incidents-data.js
// This file stores all the structured data for the Cyber Incidents feature.

const cyberIncidentsData = {
    // 🔴 DEMO DATA for Live Threats Feed
    liveThreats: [
        {
            id: 'live-1',
            severity: 'CRITICAL',
            title: 'Ransomware Campaign Targeting Hospitals',
            date: 'Today',
            affectedSector: 'Healthcare',
            summary: 'A new ransomware strain is actively exploiting unpatched servers in multiple regional hospitals, encrypting patient records.',
            status: 'Active Investigation',
            source: 'Demo Data - Cyber Intelligence Center'
        },
        {
            id: 'live-2',
            severity: 'HIGH',
            title: 'Supply Chain Compromise in Software Update',
            date: 'Yesterday',
            affectedSector: 'Technology / Enterprise',
            summary: 'Malicious code was injected into a popular IT monitoring tool update, providing attackers with backdoor access to corporate networks.',
            status: 'Containment Phase',
            source: 'Demo Data - Security Advisory'
        },
        {
            id: 'live-3',
            severity: 'MEDIUM',
            title: 'Large-scale Credential Stuffing Attack',
            date: '2 Days Ago',
            affectedSector: 'Retail & E-commerce',
            summary: 'Automated bots are using leaked passwords from previous breaches to take over user accounts on major online retail platforms.',
            status: 'Monitoring',
            source: 'Demo Data - Threat Intel Feed'
        }
    ],

    // 📚 Historical Incident Archive
    archive: [
        {
            id: 'morris-worm',
            year: 1988,
            title: 'Morris Worm',
            type: 'Malware',
            severity: 'High'
        },
        {
            id: 'iloveyou',
            year: 2000,
            title: 'ILOVEYOU',
            type: 'Malware',
            severity: 'High'
        },
        {
            id: 'stuxnet',
            year: 2010,
            title: 'Stuxnet',
            type: 'Malware',
            severity: 'Critical'
        },
        {
            id: 'wannacry',
            year: 2017,
            title: 'WannaCry',
            type: 'Ransomware',
            severity: 'Critical'
        },
        {
            id: 'colonial-pipeline',
            year: 2021,
            title: 'Colonial Pipeline',
            type: 'Ransomware',
            severity: 'Critical'
        }
    ],

    // Detailed Incident Case Files
    incidents: {
        'wannacry': {
            id: 'wannacry',
            title: 'WannaCry',
            date: 'May 2017',
            type: 'Ransomware',
            scale: 'Global',
            status: 'Historical Incident',
            summary: 'WannaCry was a global ransomware attack that infected hundreds of thousands of computers across 150 countries. It encrypted files and demanded ransom payments in Bitcoin, significantly impacting organizations like the UK\'s National Health Service (NHS).',
            
            // Timeline of the incident
            timeline: [
                {
                    phase: 'DISCOVERY',
                    title: 'Vulnerability Leaked',
                    description: 'A powerful exploit called "EternalBlue" (which targeted a weakness in Windows file sharing) was leaked online.',
                    lesson: 'Secret vulnerabilities can cause global damage if they fall into the wrong hands.'
                },
                {
                    phase: 'INITIAL INCIDENT',
                    title: 'Outbreak Begins',
                    description: 'The WannaCry ransomware began spreading rapidly, using the EternalBlue exploit to jump from computer to computer without user interaction.',
                    lesson: 'Worms can spread exponentially if networks are not segmented.'
                },
                {
                    phase: 'RAPID SPREAD',
                    title: 'Global Infection',
                    description: 'Within hours, over 200,000 systems across 150 countries were infected. Hospitals, telecom companies, and logistics firms faced massive disruptions.',
                    lesson: 'Unpatched legacy systems are a massive liability in interconnected environments.'
                },
                {
                    phase: 'DETECTION',
                    title: 'The Kill Switch',
                    description: 'A security researcher analyzing the malware discovered it was trying to connect to an unregistered web domain. He registered the domain, which accidentally acted as a "kill switch," slowing down the spread.',
                    lesson: 'Analyzing malware behavior can sometimes reveal hardcoded weaknesses.'
                },
                {
                    phase: 'RESPONSE',
                    title: 'Emergency Patching',
                    description: 'Organizations scrambled to apply the Microsoft security patch (which had actually been available for months) to prevent further infections.',
                    lesson: 'Timely patch management is one of the most critical defensive strategies.'
                },
                {
                    phase: 'AFTERMATH',
                    title: 'Global Wake-up Call',
                    description: 'The attack caused billions of dollars in economic damage and highlighted the critical importance of updating software and maintaining backups.',
                    lesson: 'Cybersecurity is a fundamental requirement for operational resilience.'
                }
            ],

            // High-level Attack Anatomy
            attackStages: [
                {
                    stage: 'INITIAL ACCESS',
                    description: 'The attackers took advantage of vulnerable systems that had not received an important security update for Windows SMB (file sharing).'
                },
                {
                    stage: 'EXPLOITATION',
                    description: 'Using the "EternalBlue" exploit, the malware gained unauthorized access to the system without needing the user to click anything.'
                },
                {
                    stage: 'EXECUTION',
                    description: 'Once inside, the ransomware payload was executed, quietly preparing to lock the system.'
                },
                {
                    stage: 'PROPAGATION',
                    description: 'Unlike typical ransomware, WannaCry acted as a worm, scanning the network to find and infect other vulnerable machines automatically.'
                },
                {
                    stage: 'IMPACT',
                    description: 'The malware encrypted user files, rendering them inaccessible, and displayed a ransom note demanding Bitcoin payment for the decryption key.'
                }
            ],

            // Investigation Evidence Board
            evidence: {
                network: [
                    { title: 'Suspicious Port Traffic', description: 'Unusually high traffic on TCP Port 445 (SMB) scanning internal IP addresses.', lesson: 'Internal network monitoring is crucial for detecting lateral movement.' }
                ],
                system: [
                    { title: 'Missing Patch', description: 'System was missing the MS17-010 security update released by Microsoft months prior.', lesson: 'Vulnerability management must be prioritized and enforced.' }
                ],
                files: [
                    { title: 'Mass File Modification', description: 'Thousands of files rapidly renamed with the .WNCRY extension.', lesson: 'File integrity monitoring can detect ransomware behavior early.' }
                ],
                alerts: [
                    { title: 'DNS Request Anomaly', description: 'Repeated requests to a long, gibberish, unregistered domain name.', lesson: 'DNS logs often hold the key to uncovering malware command-and-control behavior.' }
                ]
            },

            // Impact statistics/qualitative info
            impact: {
                sectors: ['Healthcare (UK NHS)', 'Telecommunications (Telefónica)', 'Logistics (FedEx)', 'Manufacturing'],
                systemsAffected: 'Over 200,000 computers',
                countries: '150+',
                estimatedCost: '~$4 Billion (Estimated global economic impact)'
            },

            // Defender Mode Scenario
            defenderScenario: {
                context: 'Your network monitoring tools detect a sudden spike in traffic on Port 445 (SMB) originating from a single workstation in the HR department. Several users are simultaneously reporting that they cannot open their documents.',
                question: 'What should the security team do FIRST?',
                options: [
                    { text: 'Run an antivirus scan on the HR workstation.', correct: false, explanation: 'NEEDS IMPROVEMENT: Antivirus scans take time, and the infection is already spreading to other machines.' },
                    { text: 'Immediately disconnect the HR workstation from the network.', correct: true, explanation: 'CORRECT: The first step in incident response is CONTAINMENT. Isolating the infected machine prevents the malware from spreading laterally across the network.' },
                    { text: 'Pay the ransom immediately to get the files back.', correct: false, explanation: 'NEEDS IMPROVEMENT: Paying the ransom does not guarantee file recovery and encourages future attacks. Containment must happen first.' },
                    { text: 'Search the internet for a decryption tool.', correct: false, explanation: 'NEEDS IMPROVEMENT: While finding a decryptor might happen later in the recovery phase, the immediate priority is stopping the active spread.' }
                ]
            },

            // Step-by-step response
            defensiveResponse: [
                { step: 'DETECT', desc: 'Identify rapid file encryption and unusual SMB network scanning.' },
                { step: 'ISOLATE', desc: 'Disconnect infected machines from the network to stop the worm from spreading.' },
                { step: 'INVESTIGATE', desc: 'Determine the entry point and identify the specific malware strain (WannaCry).' },
                { step: 'CONTAIN', desc: 'Block the malicious domains and deploy the kill-switch domain locally if necessary.' },
                { step: 'RECOVER', desc: 'Restore systems from clean, offline backups. Do not pay the ransom.' },
                { step: 'PREVENT RECURRENCE', desc: 'Apply the MS17-010 patch across the entire organization and segment legacy systems.' }
            ],

            // Final lessons
            lessons: [
                { title: 'Keep systems updated', icon: '🔐', text: 'Patching is non-negotiable. The vulnerability exploited by WannaCry had a patch available months before the attack.' },
                { title: 'Maintain offline backups', icon: '💾', text: 'Regular backups stored offline ensure you can recover data without paying a ransom.' },
                { title: 'Network Segmentation', icon: '🚧', text: 'Flat networks allow worms to spread easily. Segmenting networks limits the blast radius of an infection.' },
                { title: 'Disable unnecessary services', icon: '🛑', text: 'If a service like old versions of SMB is not needed, disable it.' }
            ],

            // Mini-challenge Questions
            challengeQuestions: [
                {
                    question: 'Why did WannaCry spread so quickly across global networks?',
                    options: [
                        'It used a zero-day vulnerability that no one knew about.',
                        'It functioned as a worm, automatically exploiting a known vulnerability in unpatched systems.',
                        'Millions of users simultaneously clicked on a phishing email.'
                    ],
                    correctAnswer: 1,
                    explanation: 'WannaCry acted as a worm. Unlike traditional ransomware that relies on user interaction (like clicking a link), it actively scanned for and infected other vulnerable machines on the network automatically.'
                },
                {
                    question: 'What is the most effective defense against ransomware attacks like WannaCry?',
                    options: [
                        'Keeping systems patched and maintaining offline backups.',
                        'Hiring a negotiator to lower the ransom price.',
                        'Using a complex password for your email account.'
                    ],
                    correctAnswer: 0,
                    explanation: 'Applying security patches prevents the initial infection, and offline backups ensure you can recover your data without relying on the attackers.'
                },
                {
                    question: 'In the context of the WannaCry incident, what was the purpose of the "kill switch"?',
                    options: [
                        'It was a button on the server to shut down the network.',
                        'It was a registered web domain that the malware checked; if the domain was active, the malware stopped spreading.',
                        'It was an antivirus tool created by Microsoft.'
                    ],
                    correctAnswer: 1,
                    explanation: 'The malware authors hardcoded a domain name check. If the domain was unregistered, the malware would spread. A researcher registered the domain, which inadvertently activated the kill switch and halted the global spread.'
                }
            ]
        }
    }
};

// Export for usage if using modules, but since it's vanilla JS script tag, it will be globally available.
window.cyberIncidentsData = cyberIncidentsData;
