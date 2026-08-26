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
        { id: 'wannacry', year: 2017, title: 'WannaCry', type: 'Ransomware', severity: 'Critical' },
        { id: 'colonial-pipeline', year: 2021, title: 'Colonial Pipeline Cyberattack', type: 'Ransomware', severity: 'Critical' },
        { id: 'solarwinds', year: 2020, title: 'SolarWinds Supply Chain Attack', type: 'Supply Chain Attack', severity: 'Critical' },
        { id: 'equifax', year: 2017, title: 'Equifax Data Breach', type: 'Data Breach', severity: 'High' },
        { id: 'notpetya', year: 2017, title: 'NotPetya Cyberattack', type: 'Destructive Malware', severity: 'Critical' }
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
            
            timeline: [
                { phase: 'DISCOVERY', title: 'Vulnerability Leaked', description: 'A powerful exploit called "EternalBlue" (which targeted a weakness in Windows file sharing) was leaked online.', lesson: 'Secret vulnerabilities can cause global damage if they fall into the wrong hands.' },
                { phase: 'INITIAL INCIDENT', title: 'Outbreak Begins', description: 'The WannaCry ransomware began spreading rapidly, using the EternalBlue exploit to jump from computer to computer without user interaction.', lesson: 'Worms can spread exponentially if networks are not segmented.' },
                { phase: 'RAPID SPREAD', title: 'Global Infection', description: 'Within hours, over 200,000 systems across 150 countries were infected. Hospitals, telecom companies, and logistics firms faced massive disruptions.', lesson: 'Unpatched legacy systems are a massive liability in interconnected environments.' },
                { phase: 'DETECTION', title: 'The Kill Switch', description: 'A security researcher analyzing the malware discovered it was trying to connect to an unregistered web domain. He registered the domain, which accidentally acted as a "kill switch," slowing down the spread.', lesson: 'Analyzing malware behavior can sometimes reveal hardcoded weaknesses.' },
                { phase: 'RESPONSE', title: 'Emergency Patching', description: 'Organizations scrambled to apply the Microsoft security patch (which had actually been available for months) to prevent further infections.', lesson: 'Timely patch management is one of the most critical defensive strategies.' },
                { phase: 'AFTERMATH', title: 'Global Wake-up Call', description: 'The attack caused billions of dollars in economic damage and highlighted the critical importance of updating software and maintaining backups.', lesson: 'Cybersecurity is a fundamental requirement for operational resilience.' }
            ],
            attackStages: [
                { stage: 'INITIAL ACCESS', description: 'The attackers took advantage of vulnerable systems that had not received an important security update for Windows SMB (file sharing).' },
                { stage: 'EXPLOITATION', description: 'Using the "EternalBlue" exploit, the malware gained unauthorized access to the system without needing the user to click anything.' },
                { stage: 'EXECUTION', description: 'Once inside, the ransomware payload was executed, quietly preparing to lock the system.' },
                { stage: 'PROPAGATION', description: 'Unlike typical ransomware, WannaCry acted as a worm, scanning the network to find and infect other vulnerable machines automatically.' },
                { stage: 'IMPACT', description: 'The malware encrypted user files, rendering them inaccessible, and displayed a ransom note demanding Bitcoin payment for the decryption key.' }
            ],
            evidence: {
                network: [ { title: 'Suspicious Port Traffic', description: 'Unusually high traffic on TCP Port 445 (SMB) scanning internal IP addresses.', lesson: 'Internal network monitoring is crucial for detecting lateral movement.' } ],
                system: [ { title: 'Missing Patch', description: 'System was missing the MS17-010 security update released by Microsoft months prior.', lesson: 'Vulnerability management must be prioritized and enforced.' } ],
                files: [ { title: 'Mass File Modification', description: 'Thousands of files rapidly renamed with the .WNCRY extension.', lesson: 'File integrity monitoring can detect ransomware behavior early.' } ],
                alerts: [ { title: 'DNS Request Anomaly', description: 'Repeated requests to a long, gibberish, unregistered domain name.', lesson: 'DNS logs often hold the key to uncovering malware command-and-control behavior.' } ]
            },
            impact: {
                sectors: ['Healthcare (UK NHS)', 'Telecommunications (Telefónica)', 'Logistics (FedEx)', 'Manufacturing'],
                systemsAffected: 'Over 200,000 computers',
                countries: '150+',
                estimatedCost: '~$4 Billion (Estimated global economic impact)'
            },
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
            defensiveResponse: [
                { step: 'DETECT', desc: 'Identify rapid file encryption and unusual SMB network scanning.' },
                { step: 'ISOLATE', desc: 'Disconnect infected machines from the network to stop the worm from spreading.' },
                { step: 'INVESTIGATE', desc: 'Determine the entry point and identify the specific malware strain (WannaCry).' },
                { step: 'CONTAIN', desc: 'Block the malicious domains and deploy the kill-switch domain locally if necessary.' },
                { step: 'RECOVER', desc: 'Restore systems from clean, offline backups. Do not pay the ransom.' },
                { step: 'PREVENT RECURRENCE', desc: 'Apply the MS17-010 patch across the entire organization and segment legacy systems.' }
            ],
            lessons: [
                { title: 'Keep systems updated', icon: '🔐', text: 'Patching is non-negotiable. The vulnerability exploited by WannaCry had a patch available months before the attack.' },
                { title: 'Maintain offline backups', icon: '💾', text: 'Regular backups stored offline ensure you can recover data without paying a ransom.' },
                { title: 'Network Segmentation', icon: '🚧', text: 'Flat networks allow worms to spread easily. Segmenting networks limits the blast radius of an infection.' },
                { title: 'Disable unnecessary services', icon: '🛑', text: 'If a service like old versions of SMB is not needed, disable it.' }
            ],
            challengeQuestions: [
                { question: 'Why did WannaCry spread so quickly across global networks?', options: ['It used a zero-day vulnerability that no one knew about.', 'It functioned as a worm, automatically exploiting a known vulnerability in unpatched systems.', 'Millions of users simultaneously clicked on a phishing email.'], correctAnswer: 1, explanation: 'WannaCry acted as a worm. Unlike traditional ransomware that relies on user interaction (like clicking a link), it actively scanned for and infected other vulnerable machines on the network automatically.' },
                { question: 'What is the most effective defense against ransomware attacks like WannaCry?', options: ['Keeping systems patched and maintaining offline backups.', 'Hiring a negotiator to lower the ransom price.', 'Using a complex password for your email account.'], correctAnswer: 0, explanation: 'Applying security patches prevents the initial infection, and offline backups ensure you can recover your data without relying on the attackers.' },
                { question: 'In the context of the WannaCry incident, what was the purpose of the "kill switch"?', options: ['It was a button on the server to shut down the network.', 'It was a registered web domain that the malware checked; if the domain was active, the malware stopped spreading.', 'It was an antivirus tool created by Microsoft.'], correctAnswer: 1, explanation: 'The malware authors hardcoded a domain name check. If the domain was unregistered, the malware would spread. A researcher registered the domain, which inadvertently activated the kill switch and halted the global spread.' }
            ]
        },
        'colonial-pipeline': {
            id: 'colonial-pipeline',
            title: 'Colonial Pipeline Cyberattack',
            date: 'May 2021',
            type: 'Ransomware',
            scale: 'National (USA)',
            status: 'Historical Incident',
            summary: 'A ransomware attack disrupted the operations of Colonial Pipeline, one of the major fuel pipeline operators in the United States. The incident caused widespread fuel supply concerns and showed how cyberattacks can affect critical infrastructure.',
            timeline: [
                { phase: 'INITIAL ACCESS', title: 'Compromised Password', description: 'Attackers gained entry using a compromised password for an old, inactive VPN account.', lesson: 'Inactive accounts must be disabled and MFA enforced on all remote access.' },
                { phase: 'LATERAL MOVEMENT', title: 'Network Exploration', description: 'The attackers navigated the IT network, exfiltrating 100GB of data before deploying ransomware.', lesson: 'Network monitoring is key to catching attackers before they encrypt data.' },
                { phase: 'IMPACT', title: 'System Encryption & Shutdown', description: 'Ransomware was deployed. The company preemptively shut down the operational technology (OT) pipeline to prevent further spread.', lesson: 'IT and OT networks should be strictly segmented.' }
            ],
            attackStages: [
                { stage: 'INITIAL ACCESS', description: 'Login via exposed legacy VPN without MFA.' },
                { stage: 'EXFILTRATION', description: 'Stolen data to be used for double extortion.' },
                { stage: 'EXECUTION', description: 'DarkSide ransomware payload deployed on the IT network.' }
            ],
            evidence: {
                network: [ { title: 'VPN Login Anomaly', description: 'Login from an unusual IP address using a legacy VPN profile.', lesson: 'Monitor VPN logs for suspicious geographic logins.' } ],
                system: [ { title: 'Inactive Account Usage', description: 'An account that had not been used in months suddenly logged in.', lesson: 'Regularly audit and prune inactive AD accounts.' } ],
                files: [ { title: 'Large Data Transfer', description: '100GB of data compressed and transferred to external cloud storage.', lesson: 'Set alerts for unusual outbound data transfers.' } ],
                alerts: [ { title: 'DarkSide Ransom Note', description: 'Ransom notes dropped on encrypted systems.', lesson: 'Immediate containment required upon ransomware detection.' } ]
            },
            impact: {
                sectors: ['Energy & Critical Infrastructure'],
                systemsAffected: 'Corporate IT Network',
                countries: 'United States',
                estimatedCost: '$4.4 Million Ransom (Partially recovered)'
            },
            defenderScenario: {
                context: 'You detect ransomware encrypting the corporate IT network. The IT network connects to the Operational Technology (OT) network which controls the physical pipeline.',
                question: 'What is the most critical immediate action?',
                options: [
                    { text: 'Pay the ransom quickly.', correct: false, explanation: 'Payment does not guarantee immediate restoration.' },
                    { text: 'Sever the connection between IT and OT networks.', correct: true, explanation: 'CORRECT: Prevent the ransomware from spreading to critical physical infrastructure.' },
                    { text: 'Reboot all computers.', correct: false, explanation: 'Rebooting may destroy volatile evidence.' }
                ]
            },
            defensiveResponse: [
                { step: 'ISOLATE', desc: 'Disconnected IT from OT to protect the pipeline.' },
                { step: 'INVESTIGATE', desc: 'Engaged incident response firm to find the root cause.' },
                { step: 'RECOVER', desc: 'Paid ransom (controversial) and slowly restored IT systems.' }
            ],
            lessons: [
                { title: 'Enforce MFA', icon: '🔑', text: 'Multi-factor authentication would have stopped this attack at the front door.' },
                { title: 'IT/OT Segmentation', icon: '🚧', text: 'Critical infrastructure needs strict separation from corporate networks.' }
            ],
            challengeQuestions: [
                { question: 'How did the attackers initially gain access?', options: ['Phishing email', 'Compromised VPN password without MFA', 'Zero-day exploit'], correctAnswer: 1, explanation: 'They used a leaked password for an inactive VPN account that lacked MFA.' },
                { question: 'Why did Colonial Pipeline shut down the physical pipeline?', options: ['The hackers encrypted the pipeline controls', 'Out of an abundance of caution to stop IT malware from reaching the OT network', 'To save electricity'], correctAnswer: 1, explanation: 'The malware was on the IT network, but they proactively shut down the pipeline to ensure it would not spread to physical operations.' }
            ]
        },
        'solarwinds': {
            id: 'solarwinds',
            title: 'SolarWinds Supply Chain Attack',
            date: 'December 2020',
            type: 'Supply Chain Attack',
            scale: 'Global',
            status: 'Historical Incident',
            summary: 'Attackers compromised software used by SolarWinds customers and used it as a pathway to access affected organizations. The incident demonstrated the risks of trusting software and third-party suppliers.',
            timeline: [
                { phase: 'INFILTRATION', title: 'SolarWinds Network Breached', description: 'Attackers gained access to SolarWinds internal systems.', lesson: 'Software vendors are prime targets.' },
                { phase: 'INJECTION', title: 'Malicious Code Inserted', description: 'Attackers inserted a backdoor into the Orion software update.', lesson: 'Code signing alone does not guarantee safety if the build environment is compromised.' },
                { phase: 'DISTRIBUTION', title: 'Updates Downloaded', description: 'Thousands of customers downloaded the compromised update.', lesson: 'Supply chain attacks scale massively.' },
                { phase: 'EXPLOITATION', title: 'Backdoor Activated', description: 'The malware connected to a C2 server, allowing attackers to steal data from high-value targets.', lesson: 'Monitor outbound traffic even from trusted applications.' }
            ],
            attackStages: [
                { stage: 'SUPPLY CHAIN COMPROMISE', description: 'Infiltrated the build process of SolarWinds Orion.' },
                { stage: 'DISTRIBUTION', description: 'Distributed via legitimate software updates.' },
                { stage: 'C2 COMMUNICATION', description: 'Established stealthy communication with attacker infrastructure.' }
            ],
            evidence: {
                network: [{ title: 'Anomalous C2 Traffic', description: 'Trusted software communicating with unknown external IPs.', lesson: 'Zero Trust principles must apply to vendor software.' }],
                system: [{ title: 'Modified DLLs', description: 'Legitimate DLLs contained hidden malicious code.', lesson: 'Integrity monitoring can sometimes spot anomalies in updates.' }],
                files: [{ title: 'Stolen Data', description: 'Exfiltration of emails and sensitive documents.', lesson: 'Data loss prevention tools are a key defensive layer.' }],
                alerts: [{ title: 'Golden SAML', description: 'Forged authentication tokens bypassing MFA.', lesson: 'Monitor identity providers for token anomalies.' }]
            },
            impact: {
                sectors: ['Government', 'Technology', 'Enterprise'],
                systemsAffected: '18,000+ organizations downloaded the update',
                countries: 'Global',
                estimatedCost: 'Billions in remediation costs'
            },
            defenderScenario: {
                context: 'A trusted monitoring tool (SolarWinds) is showing highly unusual outbound network traffic to an unknown external server.',
                question: 'What is the safest immediate response?',
                options: [
                    { text: 'Ignore it, it is a trusted application.', correct: false, explanation: 'Never blindly trust any application.' },
                    { text: 'Isolate the server running the monitoring tool.', correct: true, explanation: 'CORRECT: Treat anomalous behavior as a breach, isolate it, and investigate.' },
                    { text: 'Uninstall the software from all machines instantly.', correct: false, explanation: 'This could cause massive operational outages; isolate first.' }
                ]
            },
            defensiveResponse: [
                { step: 'DISCONNECT', desc: 'Organizations disconnected SolarWinds servers.' },
                { step: 'INVESTIGATE', desc: 'Hunted for secondary backdoors and compromised accounts.' },
                { step: 'REBUILD', desc: 'Rebuilt identity infrastructure from scratch.' }
            ],
            lessons: [
                { title: 'Zero Trust', icon: '🚫', text: 'Do not automatically trust software just because it comes from a vendor.' },
                { title: 'Supply Chain Risk', icon: '🔗', text: 'Your security is only as strong as your weakest vendor.' }
            ],
            challengeQuestions: [
                { question: 'How did the attackers compromise the victims?', options: ['Phishing emails', 'Malicious software updates from a trusted vendor', 'Brute force attacks'], correctAnswer: 1, explanation: 'They hijacked the vendor\'s software update mechanism.' },
                { question: 'What principle means not automatically trusting internal or vendor software?', options: ['Zero Trust', 'Least Privilege', 'Defense in Depth'], correctAnswer: 0, explanation: 'Zero Trust requires continuous verification of all entities.' }
            ]
        },
        'equifax': {
            id: 'equifax',
            title: 'Equifax Data Breach',
            date: 'September 2017',
            type: 'Data Breach',
            scale: '147 Million People',
            status: 'Historical Incident',
            summary: 'Attackers exploited a vulnerability in Equifax\'s systems and gained access to sensitive personal information. The incident highlighted the importance of vulnerability management, timely patching, and protecting personal data.',
            timeline: [
                { phase: 'VULNERABILITY', title: 'Apache Struts Flaw', description: 'A critical vulnerability in the Apache Struts web framework was announced, but Equifax failed to patch it.', lesson: 'Asset inventory and timely patching are critical.' },
                { phase: 'BREACH', title: 'Initial Access', description: 'Attackers exploited the unpatched flaw to access a consumer complaint web portal.', lesson: 'Public-facing web apps are high-risk targets.' },
                { phase: 'EXFILTRATION', title: 'Data Stolen', description: 'Over months, attackers stole SSNs, birth dates, and addresses of 147 million Americans.', lesson: 'Network segmentation and database encryption could have reduced the impact.' },
                { phase: 'DISCOVERY', title: 'Breach Detected', description: 'Equifax finally noticed the suspicious traffic and stopped the breach.', lesson: 'Delayed detection drastically increases breach size.' }
            ],
            attackStages: [
                { stage: 'EXPLOITATION', description: 'Exploited CVE-2017-5638 in Apache Struts.' },
                { stage: 'LATERAL MOVEMENT', description: 'Moved from the web server to backend databases.' },
                { stage: 'EXFILTRATION', description: 'Sent stolen data out of the network via encrypted tunnels.' }
            ],
            evidence: {
                network: [{ title: 'Unusual Outbound Traffic', description: 'Large amounts of data leaving the network.', lesson: 'Monitor for data exfiltration.' }],
                system: [{ title: 'Unpatched Server', description: 'A server running an outdated version of Apache Struts.', lesson: 'Automated vulnerability scanning is essential.' }],
                files: [{ title: 'Cleartext Credentials', description: 'Attackers found unencrypted passwords in files.', lesson: 'Never store credentials in cleartext.' }],
                alerts: [{ title: 'Expired SSL Cert', description: 'An expired network monitoring certificate blinded the security team.', lesson: 'Maintain security infrastructure health.' }]
            },
            impact: {
                sectors: ['Financial / Credit Reporting'],
                systemsAffected: 'Databases containing PII',
                countries: 'USA, UK, Canada',
                estimatedCost: '$1.4 Billion+ in settlements and upgrades'
            },
            defenderScenario: {
                context: 'A critical vulnerability is announced for a web framework your company uses. The patch is available.',
                question: 'What is the correct protocol?',
                options: [
                    { text: 'Wait until the next scheduled maintenance window next month.', correct: false, explanation: 'Critical public-facing vulnerabilities must be patched immediately.' },
                    { text: 'Identify all affected systems, test the patch, and deploy immediately.', correct: true, explanation: 'CORRECT: Rapid, structured patching is necessary to prevent exploitation.' },
                    { text: 'Shut down the web servers permanently.', correct: false, explanation: 'Unrealistic for a business.' }
                ]
            },
            defensiveResponse: [
                { step: 'PATCH', desc: 'The vulnerable systems were eventually patched or taken offline.' },
                { step: 'INVESTIGATE', desc: 'Forensics determined the scope of stolen data.' },
                { step: 'NOTIFY', desc: 'Public disclosure and credit monitoring offered to victims.' }
            ],
            lessons: [
                { title: 'Patch Management', icon: '🔧', text: 'Unpatched software is an open door for attackers.' },
                { title: 'Data Protection', icon: '🛡️', text: 'Sensitive data must be encrypted at rest and tightly controlled.' }
            ],
            challengeQuestions: [
                { question: 'Why was Equifax breached?', options: ['An employee clicked a phishing link', 'They failed to patch a known vulnerability in a web application', 'Physical servers were stolen'], correctAnswer: 1, explanation: 'They missed patching the Apache Struts vulnerability.' },
                { question: 'What prevented Equifax from detecting the breach earlier?', options: ['An expired SSL certificate on their monitoring tool', 'The attackers used invisible malware', 'They had no security team'], correctAnswer: 0, explanation: 'An expired certificate prevented their intrusion detection system from inspecting encrypted traffic.' }
            ]
        },
        'notpetya': {
            id: 'notpetya',
            title: 'NotPetya Cyberattack',
            date: 'June 2017',
            type: 'Destructive Malware',
            scale: 'Global',
            status: 'Historical Incident',
            summary: 'NotPetya spread rapidly across organizations and caused major operational and financial disruption. It demonstrated how malware can spread through connected networks and create large-scale damage.',
            timeline: [
                { phase: 'INFECTION', title: 'Tax Software Compromised', description: 'Attackers hijacked the update mechanism of a Ukrainian accounting software (M.E.Doc).', lesson: 'Regional software can be the entry point for global attacks.' },
                { phase: 'SPREAD', title: 'Lateral Movement', description: 'Used EternalBlue (like WannaCry) and stolen credentials to spread across corporate networks globally.', lesson: 'Flat networks allow rapid lateral movement.' },
                { phase: 'DESTRUCTION', title: 'MFT Encryption', description: 'Encrypted the Master File Table (MFT) of Windows machines, making them unbootable.', lesson: 'Destructive malware aims to destroy, not ransom.' },
                { phase: 'IMPACT', title: 'Global Disruption', description: 'Shipping companies, hospitals, and manufacturers ground to a halt.', lesson: 'Digital disruptions have massive real-world consequences.' }
            ],
            attackStages: [
                { stage: 'INITIAL ACCESS', description: 'Supply chain compromise via M.E.Doc software.' },
                { stage: 'PROPAGATION', description: 'Worm-like spread using EternalBlue and Mimikatz (credential theft).' },
                { stage: 'DESTRUCTION', description: 'Permanent encryption of the file system.' }
            ],
            evidence: {
                network: [{ title: 'SMB Traffic Spikes', description: 'Rapid scanning of internal networks.', lesson: 'Monitor internal traffic.' }],
                system: [{ title: 'Credential Dumping', description: 'Tools like Mimikatz pulling passwords from memory.', lesson: 'Protect privileged credentials.' }],
                files: [{ title: 'Overwritten MBR', description: 'The Master Boot Record was modified to prevent booting.', lesson: 'Endpoint protection should monitor MBR changes.' }],
                alerts: [{ title: 'Fake Ransom Note', description: 'Displayed a ransom note, but the email address was shut down, making recovery impossible.', lesson: 'Not all ransomware is meant to be decrypted.' }]
            },
            impact: {
                sectors: ['Logistics (Maersk)', 'Healthcare', 'Manufacturing', 'Finance'],
                systemsAffected: 'Hundreds of thousands of endpoints',
                countries: 'Global (Originated in Ukraine)',
                estimatedCost: '$10 Billion+ (Most expensive cyberattack in history)'
            },
            defenderScenario: {
                context: 'A worm is rapidly spreading through your corporate network, encrypting drives and stealing credentials to jump to new machines.',
                question: 'How do you stop the spread?',
                options: [
                    { text: 'Run antivirus on every machine.', correct: false, explanation: 'Too slow, the worm will outpace you.' },
                    { text: 'Sever network links between different global sites and isolate infected subnets.', correct: true, explanation: 'CORRECT: Break the network to break the worm\'s path.' },
                    { text: 'Change everyone\'s password.', correct: false, explanation: 'The malware already has admin rights and is spreading.' }
                ]
            },
            defensiveResponse: [
                { step: 'CONTAINMENT', desc: 'Global networks were physically and logically severed to stop the spread.' },
                { step: 'REBUILD', desc: 'Organizations had to completely reinstall thousands of servers and workstations.' },
                { step: 'RECOVERY', desc: 'Restored from offline backups (when available) or Active Directory domain controllers saved by chance.' }
            ],
            lessons: [
                { title: 'Destructive Intent', icon: '💣', text: 'Not all attacks want money; some want destruction.' },
                { title: 'Offline Backups', icon: '💾', text: 'If Active Directory is destroyed, offline backups are your only hope.' }
            ],
            challengeQuestions: [
                { question: 'What was the primary difference between NotPetya and traditional ransomware?', options: ['NotPetya asked for more money', 'NotPetya was fundamentally a destructive wiper, not designed for data recovery', 'NotPetya only infected mobile phones'], correctAnswer: 1, explanation: 'It masqueraded as ransomware but was actually a wiper designed to destroy data.' },
                { question: 'How did NotPetya initially enter corporate networks?', options: ['A compromised update for Ukrainian tax software', 'A phishing email sent to the CEO', 'A lost USB drive'], correctAnswer: 0, explanation: 'It started as a supply chain attack on the M.E.Doc software.' }
            ]
        }
    }
};

window.cyberIncidentsData = cyberIncidentsData;
