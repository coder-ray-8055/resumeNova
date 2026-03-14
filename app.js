// ===== ResumeNova App =====

// ── Helpers ──
function starsHTML(lvl, max = 5) {
    let s = '';
    for (let i = 0; i < max; i++) s += i < lvl ? '★' : '☆';
    return s;
}

function parseLangs(str) {
    if (!str.trim()) return [];
    return str.split(',').map(l => {
        const p = l.trim().split('-');
        return { name: p[0].trim(), level: parseInt(p[1]) || 3 };
    }).filter(l => l.name);
}

function getLangIcon(lang) {
    const l = lang.toLowerCase().trim();
    const flags = {
        'english': '🇬🇧', 'english (us)': '🇺🇸', 'spanish': '🇪🇸', 'french': '🇫🇷',
        'german': '🇩🇪', 'italian': '🇮🇹', 'portuguese': '🇵🇹', 'portuguese (br)': '🇧🇷',
        'russian': '🇷🇺', 'chinese': '🇨🇳', 'mandarin': '🇨🇳', 'japanese': '🇯🇵',
        'korean': '🇰🇷', 'arabic': '🇸🇦', 'hindi': '🇮🇳', 'turkish': '🇹🇷',
        'dutch': '🇳🇱', 'swedish': '🇸🇪', 'polish': '🇵🇱', 'indonesian': '🇮🇩',
        'vietnamese': '🇻🇳', 'thai': '🇹🇭', 'greek': '🇬🇷', 'hebrew': '🇮🇱',
        'romanian': '🇷🇴', 'bengali': '🇧🇩', 'urdu': '🇵🇰'
    };
    return flags[l] ? `<span style="margin-right:4px;">${flags[l]}</span>` : `<i class="fa-solid fa-language" style="margin-right:4px; opacity:0.7;"></i>`;
}

function getTechIcon(skill) {
    const n = skill.toLowerCase().replace(/[^a-z0-9+#]/g, '');
    const icons = {
        'html': 'fa-brands fa-html5', 'html5': 'fa-brands fa-html5',
        'css': 'fa-brands fa-css3-alt', 'css3': 'fa-brands fa-css3-alt',
        'javascript': 'fa-brands fa-js', 'js': 'fa-brands fa-js',
        'python': 'fa-brands fa-python', 'java': 'fa-brands fa-java',
        'php': 'fa-brands fa-php', 'ruby': 'fa-solid fa-gem',
        'cplusplus': 'fa-solid fa-c', 'c#': 'fa-solid fa-c', 'c': 'fa-solid fa-c',
        'go': 'fa-brands fa-golang', 'golang': 'fa-brands fa-golang',
        'swift': 'fa-brands fa-swift', 'rust': 'fa-brands fa-rust',
        'react': 'fa-brands fa-react', 'reactjs': 'fa-brands fa-react',
        'angular': 'fa-brands fa-angular', 'vue': 'fa-brands fa-vuejs', 'vuejs': 'fa-brands fa-vuejs',
        'node': 'fa-brands fa-node', 'nodejs': 'fa-brands fa-node-js',
        'git': 'fa-brands fa-git-alt', 'github': 'fa-brands fa-github',
        'docker': 'fa-brands fa-docker', 'aws': 'fa-brands fa-aws',
        'linux': 'fa-brands fa-linux', 'windows': 'fa-brands fa-windows',
        'android': 'fa-brands fa-android', 'apple': 'fa-brands fa-apple', 'ios': 'fa-brands fa-apple',
        'figma': 'fa-brands fa-figma', 'sql': 'fa-solid fa-database', 'mysql': 'fa-solid fa-database',
        'postgres': 'fa-solid fa-database', 'mongodb': 'fa-solid fa-database',
        'wordpress': 'fa-brands fa-wordpress', 'laravel': 'fa-brands fa-laravel',
        'bootstrap': 'fa-brands fa-bootstrap', 'tailwind': 'fa-brands fa-css3',
        'sass': 'fa-brands fa-sass', 'less': 'fa-brands fa-less',
        'npm': 'fa-brands fa-npm', 'yarn': 'fa-brands fa-yarn'
    };
    return icons[n] ? `<i class="${icons[n]}" style="margin-right:4px;"></i>` : '';
}

// ── Collect form data ──
function collectData() {
    const v = id => document.getElementById(id).value;
    return {
        name: v('fullName') || 'Your Name',
        jobTitle: v('jobTitle') || 'Job Title',
        email: v('email'), phone: v('phone'), location: v('location'), age: v('age'),
        linkedin: '', github: '', socialMedia: '', // Deprecating fixed fields
        socialLinks: [...document.querySelectorAll('#socialEntries .dynamic-entry')].map(e => {
            const platform = e.querySelector('.social-platform').value;
            const username = e.querySelector('.social-username').value;
            if (!username) return null;

            let url = '';
            let icon = '';

            switch (platform) {
                case 'linkedin': url = `linkedin.com/in/${username}`; icon = 'fa-brands fa-linkedin'; break;
                case 'github': url = `github.com/${username}`; icon = 'fa-brands fa-github'; break;
                case 'twitter': url = `twitter.com/${username}`; icon = 'fa-brands fa-twitter'; break;
                case 'portfolio': url = username; icon = 'fa-solid fa-globe'; break;
                case 'behance': url = `behance.net/${username}`; icon = 'fa-brands fa-behance'; break;
                case 'dribbble': url = `dribbble.com/${username}`; icon = 'fa-brands fa-dribbble'; break;
                default: url = username; icon = 'fa-solid fa-link'; break;
            }
            return { platform, username, url, icon };
        }).filter(Boolean),
        summary: v('summary'),
        skills: v('skills').split(',').map(s => s.trim()).filter(s => s),
        languages: parseLangs(v('languages')),
        experience: [...document.querySelectorAll('#experienceEntries .dynamic-entry')].map(e => {
            const t = e.querySelector('.exp-title').value, c = e.querySelector('.exp-company').value;
            if (!t && !c) return null;
            return { title: t, company: c, location: e.querySelector('.exp-location').value, start: e.querySelector('.exp-start').value, end: e.querySelector('.exp-end').value, responsibilities: e.querySelector('.exp-responsibilities').value.split('\n').map(r => r.trim()).filter(r => r) };
        }).filter(Boolean),
        education: [...document.querySelectorAll('#educationEntries .dynamic-entry')].map(e => {
            const d = e.querySelector('.edu-degree').value, i = e.querySelector('.edu-institution').value;
            if (!d && !i) return null;
            return { degree: d, institution: i, location: e.querySelector('.edu-location').value, start: e.querySelector('.edu-start').value, end: e.querySelector('.edu-end').value };
        }).filter(Boolean),
        projects: [...document.querySelectorAll('#projectEntries .dynamic-entry')].map(e => {
            const n = e.querySelector('.proj-name').value;
            if (!n) return null;
            return { name: n, tech: e.querySelector('.proj-tech').value, link: e.querySelector('.proj-link').value, description: e.querySelector('.proj-desc').value };
        }).filter(Boolean),
        certifications: [...document.querySelectorAll('#certEntries .dynamic-entry')].map(e => {
            const n = e.querySelector('.cert-name').value;
            if (!n) return null;
            return { name: n, issuer: e.querySelector('.cert-issuer').value, year: e.querySelector('.cert-year').value };
        }).filter(Boolean)
    };
}

// ── Shared HTML Fragments ──
function infoSidebar(d, lblColor = '#5eead4') {
    let h = '';
    if (d.email) h += `<div class="t-ilbl">Email</div><div class="t-ival">${d.email}</div>`;
    if (d.phone) h += `<div class="t-ilbl">Phone</div><div class="t-ival">${d.phone}</div>`;
    if (d.location) h += `<div class="t-ilbl">Location</div><div class="t-ival">${d.location}</div>`;
    if (d.socialLinks && d.socialLinks.length) {
        h += d.socialLinks.map(s => `<div class="t-ilbl" style="text-transform:capitalize;"><i class="${s.icon}" style="margin-right:4px;"></i>${s.platform}</div><div class="t-ival">${s.url}</div>`).join('');
    }
    return h;
}

function skillsList(d) { return d.skills.map(s => `<div class="t-skill">${getTechIcon(s)}${s}</div>`).join(''); }

function langsList(d) {
    return d.languages.map(l => `<div class="t-langr"><span class="t-langn">${getLangIcon(l.name)}${l.name}</span><span class="t-langs">${starsHTML(l.level)}</span></div>`).join('');
}

function certsList(d) {
    return d.certifications.map(c => `<div class="t-cy">${c.year}</div><div class="t-cn">${c.name}</div><div class="t-ci">${c.issuer}</div>`).join('');
}

function expHTML(d) {
    return d.experience.map(e => `<div class="t-ei"><div class="t-ed">${e.start} - ${e.end}</div><div class="t-et">${e.title}</div><div class="t-ec">${e.company}${e.location ? ', ' + e.location : ''}</div>${e.responsibilities.map(r => `<div class="t-er">${r}</div>`).join('')}</div>`).join('');
}

function eduHTML(d) {
    return d.education.map(e => `<div class="t-edi"><div class="t-edd">${e.start} - ${e.end}</div><div class="t-edeg">${e.degree}</div><div class="t-edin">${e.institution}${e.location ? ', ' + e.location : ''}</div></div>`).join('');
}

function projHTML(d) {
    return d.projects.map(p => `<div class="t-pi"><div class="t-pn">${p.name}</div>${p.tech ? `<div class="t-pt">${p.tech}</div>` : ''}${p.description ? `<div class="t-pd">${p.description}</div>` : ''}</div>`).join('');
}

function contactRow(d) {
    let h = '';
    if (d.email) h += `<span><i class="fa-solid fa-envelope"></i>${d.email}</span>`;
    if (d.phone) h += `<span><i class="fa-solid fa-phone"></i>${d.phone}</span>`;
    if (d.location) h += `<span><i class="fa-solid fa-location-dot"></i>${d.location}</span>`;
    if (d.socialLinks && d.socialLinks.length) {
        h += d.socialLinks.map(s => `<span><i class="${s.icon}"></i> ${s.url}</span>`).join('');
    }
    return h;
}

function contactIcons(d) {
    let h = '';
    if (d.email) h += `<div><i class="fa-solid fa-envelope"></i>${d.email}</div>`;
    if (d.phone) h += `<div><i class="fa-solid fa-phone"></i>${d.phone}</div>`;
    if (d.location) h += `<div><i class="fa-solid fa-location-dot"></i>${d.location}</div>`;
    if (d.socialLinks && d.socialLinks.length) {
        h += d.socialLinks.map(s => `<div><i class="${s.icon}"></i> ${s.url}</div>`).join('');
    }
    return h;
}

function iconRows(d) {
    let h = '';
    if (d.email) h += `<div class="t-irow"><i class="fa-solid fa-envelope"></i><span>${d.email}</span></div>`;
    if (d.phone) h += `<div class="t-irow"><i class="fa-solid fa-phone"></i><span>${d.phone}</span></div>`;
    if (d.location) h += `<div class="t-irow"><i class="fa-solid fa-location-dot"></i><span>${d.location}</span></div>`;
    if (d.socialLinks && d.socialLinks.length) {
        h += d.socialLinks.map(s => `<div class="t-irow"><i class="${s.icon}"></i><span>${s.url}</span></div>`).join('');
    }
    return h;
}

function contactPlain(d) {
    let h = '';
    if (d.email) h += `<span>${d.email}</span>`;
    if (d.phone) h += `<span>${d.phone}</span>`;
    if (d.location) h += `<span>${d.location}</span>`;
    if (d.socialLinks && d.socialLinks.length) {
        h += d.socialLinks.map(s => `<span><i class="${s.icon}" style="margin-right:2px;"></i> ${s.url}</span>`).join('');
    }
    return h;
}

// ── 10 Template Renderers ──

// 1. Classic – teal sidebar
function tplClassic(d) {
    return `<div class="t-classic">
        <div class="t-side">
            <div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div>
            <div class="t-stitle">Personal Info</div>${infoSidebar(d)}
            ${d.skills.length ? `<div class="t-stitle">Skills</div>${skillsList(d)}` : ''}
            ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
            ${d.certifications.length ? `<div class="t-stitle">Certificates</div>${certsList(d)}` : ''}
        </div>
        <div class="t-main">
            ${d.summary ? `<div class="t-sum">${d.summary}</div>` : ''}
            ${d.experience.length ? `<div class="t-mtitle">Work History</div>${expHTML(d)}` : ''}
            ${d.education.length ? `<div class="t-mtitle">Education</div>${eduHTML(d)}` : ''}
            ${d.projects.length ? `<div class="t-mtitle">Projects</div>${projHTML(d)}` : ''}
        </div></div>`;
}

// 2. Modern – dark header
function tplModern(d) {
    return `<div class="t-modern">
        <div class="t-header"><div class="t-hl"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div></div><div class="t-hr">${contactIcons(d)}</div></div>
        <div class="t-body"><div class="t-bl">
            ${d.summary ? `<div class="t-stitle">Profile</div><div class="t-sum">${d.summary}</div>` : ''}
            ${d.experience.length ? `<div class="t-stitle">Experience</div>${expHTML(d)}` : ''}
            ${d.education.length ? `<div class="t-stitle">Education</div>${eduHTML(d)}` : ''}
            ${d.projects.length ? `<div class="t-stitle">Projects</div>${projHTML(d)}` : ''}
        </div><div class="t-br">
            ${d.skills.length ? `<div class="t-stitle">Skills</div><div>${d.skills.map(s => `<span class="t-sktag">${getTechIcon(s)}${s}</span>`).join('')}</div>` : ''}
            ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
            ${d.certifications.length ? `<div class="t-stitle">Certifications</div>${certsList(d)}` : ''}
        </div></div></div>`;
}

// 3. Minimal – centered header
function tplMinimal(d) {
    return `<div class="t-minimal">
        <div class="t-header"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div><div class="t-contacts">${contactRow(d)}</div></div>
        ${d.summary ? `<div class="t-stitle">Summary</div><div class="t-sum">${d.summary}</div>` : ''}
        ${d.experience.length ? `<div class="t-stitle">Experience</div>${d.experience.map(e => `<div class="t-ei"><div class="t-erow"><div class="t-et">${e.title}</div><div class="t-ed">${e.start} — ${e.end}</div></div><div class="t-ec">${e.company}${e.location ? ', ' + e.location : ''}</div>${e.responsibilities.map(r => `<div class="t-er">${r}</div>`).join('')}</div>`).join('')}` : ''}
        ${d.education.length ? `<div class="t-stitle">Education</div>${d.education.map(e => `<div class="t-edi"><div class="t-erow"><div class="t-edeg">${e.degree}</div><div class="t-edd">${e.start} — ${e.end}</div></div><div class="t-edin">${e.institution}${e.location ? ', ' + e.location : ''}</div></div>`).join('')}` : ''}
        ${d.projects.length ? `<div class="t-stitle">Projects</div>${projHTML(d)}` : ''}
        <div class="t-2col"><div>
            ${d.skills.length ? `<div class="t-stitle">Skills</div><div>${d.skills.map(s => `<span class="t-skpill">${getTechIcon(s)}${s}</span>`).join(' · ')}</div>` : ''}
            ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
        </div><div>
            ${d.certifications.length ? `<div class="t-stitle">Certifications</div>${certsList(d)}` : ''}
        </div></div></div>`;
}

// 4. Bold – dark sidebar + teal header
function tplBold(d) {
    return `<div class="t-bold">
        <div class="t-side"><div class="t-shead"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div></div>
        <div class="t-sbody"><div class="t-stitle">Contact</div>${iconRows(d)}
            ${d.skills.length ? `<div class="t-stitle">Skills</div>${d.skills.map((s, i) => `<div class="t-skbar-w"><div class="t-skbar-l">${getTechIcon(s)}${s}</div><div class="t-skbar"><div class="t-skbar-f" style="width:${Math.max(50, 100 - i * 8)}%"></div></div></div>`).join('')}` : ''}
            ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
            ${d.certifications.length ? `<div class="t-stitle">Certifications</div>${certsList(d)}` : ''}
        </div></div>
        <div class="t-main">
            ${d.summary ? `<div class="t-mtitle">About Me</div><div class="t-sum">${d.summary}</div>` : ''}
            ${d.experience.length ? `<div class="t-mtitle">Work Experience</div>${expHTML(d)}` : ''}
            ${d.education.length ? `<div class="t-mtitle">Education</div>${eduHTML(d)}` : ''}
            ${d.projects.length ? `<div class="t-mtitle">Projects</div>${projHTML(d)}` : ''}
        </div></div>`;
}

// 5. Elegant – navy sidebar, gold accents
function tplElegant(d) {
    return `<div class="t-elegant">
        <div class="t-side">
            <div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div>
            <div class="t-stitle">Personal Info</div>${infoSidebar(d)}
            ${d.skills.length ? `<div class="t-stitle">Skills</div>${skillsList(d)}` : ''}
            ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
            ${d.certifications.length ? `<div class="t-stitle">Certificates</div>${certsList(d)}` : ''}
        </div>
        <div class="t-main">
            ${d.summary ? `<div class="t-sum">${d.summary}</div>` : ''}
            ${d.experience.length ? `<div class="t-mtitle">Work History</div>${expHTML(d)}` : ''}
            ${d.education.length ? `<div class="t-mtitle">Education</div>${eduHTML(d)}` : ''}
            ${d.projects.length ? `<div class="t-mtitle">Projects</div>${projHTML(d)}` : ''}
        </div></div>`;
}

// 6. Creative – coral header
function tplCreative(d) {
    return `<div class="t-creative">
        <div class="t-header"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div><div class="t-contacts">${contactRow(d)}</div></div>
        <div class="t-body"><div class="t-bl">
            ${d.summary ? `<div class="t-stitle">Profile</div><div class="t-sum">${d.summary}</div>` : ''}
            ${d.experience.length ? `<div class="t-stitle">Experience</div>${expHTML(d)}` : ''}
            ${d.education.length ? `<div class="t-stitle">Education</div>${eduHTML(d)}` : ''}
            ${d.projects.length ? `<div class="t-stitle">Projects</div>${projHTML(d)}` : ''}
        </div><div class="t-br">
            ${d.skills.length ? `<div class="t-stitle">Skills</div><div>${d.skills.map(s => `<span class="t-sktag">${getTechIcon(s)}${s}</span>`).join('')}</div>` : ''}
            ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
            ${d.certifications.length ? `<div class="t-stitle">Certifications</div>${certsList(d)}` : ''}
        </div></div></div>`;
}

// 7. Professional – gray sidebar, blue accents
function tplProfessional(d) {
    return `<div class="t-professional">
        <div class="t-side">
            <div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div>
            <div class="t-stitle">Contact</div>${infoSidebar(d)}
            ${d.skills.length ? `<div class="t-stitle">Skills</div>${skillsList(d)}` : ''}
            ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
            ${d.certifications.length ? `<div class="t-stitle">Certificates</div>${certsList(d)}` : ''}
        </div>
        <div class="t-main">
            ${d.summary ? `<div class="t-sum">${d.summary}</div>` : ''}
            ${d.experience.length ? `<div class="t-mtitle">Experience</div>${expHTML(d)}` : ''}
            ${d.education.length ? `<div class="t-mtitle">Education</div>${eduHTML(d)}` : ''}
            ${d.projects.length ? `<div class="t-mtitle">Projects</div>${projHTML(d)}` : ''}
        </div></div>`;
}

// 8. Compact – single column
function tplCompact(d) {
    return `<div class="t-compact">
        <div class="t-header"><div class="t-hl"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div></div><div class="t-hr">${contactIcons(d)}</div></div>
        ${d.summary ? `<div class="t-stitle">Summary</div><div class="t-sum">${d.summary}</div>` : ''}
        ${d.experience.length ? `<div class="t-stitle">Experience</div>${d.experience.map(e => `<div class="t-ei"><div class="t-erow"><div class="t-et">${e.title} — ${e.company}</div><div class="t-ed">${e.start} - ${e.end}</div></div>${e.responsibilities.map(r => `<div class="t-er">${r}</div>`).join('')}</div>`).join('')}` : ''}
        ${d.education.length ? `<div class="t-stitle">Education</div>${d.education.map(e => `<div class="t-edi"><div class="t-erow"><div class="t-edeg">${e.degree}</div><div class="t-edd">${e.start} - ${e.end}</div></div><div class="t-edin">${e.institution}${e.location ? ', ' + e.location : ''}</div></div>`).join('')}` : ''}
        ${d.projects.length ? `<div class="t-stitle">Projects</div>${projHTML(d)}` : ''}
        ${d.skills.length ? `<div class="t-stitle">Skills</div><div class="t-skills-inline">${d.skills.map(s => `<span style="white-space:nowrap;">${getTechIcon(s)}${s}</span>`).join(' · ')}</div>` : ''}
        ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
        ${d.certifications.length ? `<div class="t-stitle">Certifications</div>${certsList(d)}` : ''}
    </div>`;
}

// 9. Tech – dark header, monospace accents
function tplTech(d) {
    return `<div class="t-tech">
        <div class="t-header"><div class="t-name">${d.name}</div><div class="t-jobt">// ${d.jobTitle}</div><div class="t-contacts">${contactPlain(d)}</div></div>
        <div class="t-body"><div class="t-bl">
            ${d.summary ? `<div class="t-stitle">/* Summary */</div><div class="t-sum">${d.summary}</div>` : ''}
            ${d.experience.length ? `<div class="t-stitle">/* Experience */</div>${expHTML(d)}` : ''}
            ${d.education.length ? `<div class="t-stitle">/* Education */</div>${eduHTML(d)}` : ''}
            ${d.projects.length ? `<div class="t-stitle">/* Projects */</div>${projHTML(d)}` : ''}
        </div><div class="t-br">
            ${d.skills.length ? `<div class="t-stitle">/* Skills */</div><div>${d.skills.map(s => `<span class="t-sktag">${getTechIcon(s)}${s}</span>`).join('')}</div>` : ''}
            ${d.languages.length ? `<div class="t-stitle">/* Languages */</div>${langsList(d)}` : ''}
            ${d.certifications.length ? `<div class="t-stitle">/* Certs */</div>${certsList(d)}` : ''}
        </div></div></div>`;
}

// 10. Executive – charcoal sidebar, burgundy accents
function tplExecutive(d) {
    return `<div class="t-executive">
        <div class="t-side">
            <div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div>
            <div class="t-stitle">Contact</div>${infoSidebar(d)}
            ${d.skills.length ? `<div class="t-stitle">Skills</div>${skillsList(d)}` : ''}
            ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
            ${d.certifications.length ? `<div class="t-stitle">Certificates</div>${certsList(d)}` : ''}
        </div>
        <div class="t-main">
            ${d.summary ? `<div class="t-sum">${d.summary}</div>` : ''}
            ${d.experience.length ? `<div class="t-mtitle">Career History</div>${expHTML(d)}` : ''}
            ${d.education.length ? `<div class="t-mtitle">Education</div>${eduHTML(d)}` : ''}
            ${d.projects.length ? `<div class="t-mtitle">Projects</div>${projHTML(d)}` : ''}
        </div></div>`;
}

// 11. Neon – dark mode, cyber pink/cyan
function tplNeon(d) {
    return `<div class="t-neon">
        <div class="t-header"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div><div class="t-contacts">${contactRow(d)}</div></div>
        <div class="t-2col">
            <div>
                ${d.summary ? `<div class="t-stitle">Profile</div><div class="t-sum">${d.summary}</div>` : ''}
                ${d.experience.length ? `<div class="t-stitle">Experience</div>${expHTML(d)}` : ''}
                ${d.education.length ? `<div class="t-stitle">Education</div>${eduHTML(d)}` : ''}
                ${d.projects.length ? `<div class="t-stitle">Projects</div>${projHTML(d)}` : ''}
            </div>
            <div>
                ${d.skills.length ? `<div class="t-stitle">Skills</div><div>${d.skills.map(s => `<span class="t-skpill">${getTechIcon(s)}${s}</span>`).join('')}</div>` : ''}
                ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
                ${d.certifications.length ? `<div class="t-stitle">Certifications</div>${certsList(d)}` : ''}
            </div>
        </div>
    </div>`;
}

// 12. Retro – 90s/Synthwave vibe
function tplRetro(d) {
    return `<div class="t-retro">
        <div class="t-header"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div><div class="t-contacts">${contactPlain(d)}</div></div>
        <div class="t-2col">
            <div>
                ${d.summary ? `<div class="t-stitle">Summary</div><div class="t-sum">${d.summary}</div>` : ''}
                ${d.experience.length ? `<div class="t-stitle">Experience</div>${expHTML(d)}` : ''}
                ${d.education.length ? `<div class="t-stitle">Education</div>${eduHTML(d)}` : ''}
                ${d.projects.length ? `<div class="t-stitle">Projects</div>${projHTML(d)}` : ''}
            </div>
            <div>
                ${d.skills.length ? `<div class="t-stitle">Skills</div><div>${d.skills.map(s => `<span class="t-skpill">${getTechIcon(s)}${s}</span>`).join('')}</div>` : ''}
                ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
                ${d.certifications.length ? `<div class="t-stitle">Certs</div>${certsList(d)}` : ''}
            </div>
        </div>
    </div>`;
}

// 13. Abstract – asymmetrical, shapes
function tplAbstract(d) {
    return `<div class="t-abstract">
        <div class="t-header"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div><div class="t-contacts">${contactRow(d)}</div></div>
        <div class="t-body">
            <div class="t-bl">
                ${d.summary ? `<div class="t-stitle">About</div><div class="t-sum">${d.summary}</div>` : ''}
                ${d.experience.length ? `<div class="t-stitle">Experience</div>${expHTML(d)}` : ''}
                ${d.education.length ? `<div class="t-stitle">Education</div>${eduHTML(d)}` : ''}
                ${d.projects.length ? `<div class="t-stitle">Projects</div>${projHTML(d)}` : ''}
            </div>
            <div class="t-br">
                ${d.skills.length ? `<div class="t-stitle">Skills</div><div>${d.skills.map(s => `<span class="t-sktag">${getTechIcon(s)}${s}</span>`).join('')}</div>` : ''}
                ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
                ${d.certifications.length ? `<div class="t-stitle">Certifications</div>${certsList(d)}` : ''}
            </div>
        </div>
    </div>`;
}

// 14. Cyberpunk – high contrast yellow/black
function tplCyberpunk(d) {
    return `<div class="t-cyberpunk">
        <div class="t-header"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div><div class="t-contacts">${contactRow(d)}</div></div>
        <div class="t-2col">
            <div>
                ${d.summary ? `<div class="t-stitle">Log Data</div><div class="t-sum">${d.summary}</div>` : ''}
                ${d.experience.length ? `<div class="t-stitle">Exp Record</div>${expHTML(d)}` : ''}
                ${d.education.length ? `<div class="t-stitle">Edu Record</div>${eduHTML(d)}` : ''}
                ${d.projects.length ? `<div class="t-stitle">Dir Projects</div>${projHTML(d)}` : ''}
            </div>
            <div>
                ${d.skills.length ? `<div class="t-stitle">Core Skills</div><div>${d.skills.map(s => `<span class="t-skpill">${getTechIcon(s)}${s}</span>`).join('')}</div>` : ''}
                ${d.languages.length ? `<div class="t-stitle">Lang Modules</div>${langsList(d)}` : ''}
                ${d.certifications.length ? `<div class="t-stitle">Certs</div>${certsList(d)}` : ''}
            </div>
        </div>
    </div>`;
}

// 15. Pop Art – comic book style
function tplPopArt(d) {
    return `<div class="t-popart">
        <div class="t-content-wrapper">
            <div class="t-header"><div class="t-name">${d.name}</div><div class="t-jobt">${d.jobTitle}</div><div class="t-contacts">${contactRow(d)}</div></div>
            <div class="t-2col">
                <div>
                    ${d.summary ? `<div class="t-stitle">Who Am I?</div><div class="t-sum">${d.summary}</div>` : ''}
                    ${d.experience.length ? `<div class="t-stitle">Experience</div>${expHTML(d)}` : ''}
                    ${d.education.length ? `<div class="t-stitle">Education</div>${eduHTML(d)}` : ''}
                    ${d.projects.length ? `<div class="t-stitle">Projects</div>${projHTML(d)}` : ''}
                </div>
                <div>
                    ${d.skills.length ? `<div class="t-stitle">Skills</div><div>${d.skills.map(s => `<span class="t-skpill">${getTechIcon(s)}${s}</span>`).join('')}</div>` : ''}
                    ${d.languages.length ? `<div class="t-stitle">Languages</div>${langsList(d)}` : ''}
                    ${d.certifications.length ? `<div class="t-stitle">Certs</div>${certsList(d)}` : ''}
                </div>
            </div>
        </div>
    </div>`;
}

// ── Template Registry ──
const TEMPLATES = [
    { id: 'classic', name: 'Classic', badge: 'Popular', render: tplClassic },
    { id: 'modern', name: 'Modern', badge: 'New', render: tplModern },
    { id: 'minimal', name: 'Minimal', badge: 'Clean', render: tplMinimal },
    { id: 'bold', name: 'Bold', badge: 'Pro', render: tplBold },
    { id: 'elegant', name: 'Elegant', badge: 'Premium', render: tplElegant },
    { id: 'creative', name: 'Creative', badge: 'Vibrant', render: tplCreative },
    { id: 'professional', name: 'Professional', badge: 'Corporate', render: tplProfessional },
    { id: 'compact', name: 'Compact', badge: 'Dense', render: tplCompact },
    { id: 'tech', name: 'Tech', badge: 'Developer', render: tplTech },
    { id: 'executive', name: 'Executive', badge: 'Luxury', render: tplExecutive },
    { id: 'neon', name: 'Neon', badge: 'Cyber', render: tplNeon },
    { id: 'retro', name: 'Retro', badge: '80s', render: tplRetro },
    { id: 'abstract', name: 'Abstract', badge: 'Art', render: tplAbstract },
    { id: 'cyberpunk', name: 'Cyberpunk', badge: 'Glitch', render: tplCyberpunk },
    { id: 'popart', name: 'Pop Art', badge: 'Comic', render: tplPopArt }
];

let currentTplIndex = 0;

// ── Preview Update ──
function updatePreview() {
    const d = collectData();
    const tpl = TEMPLATES[currentTplIndex];
    const canvas = document.getElementById('previewCanvas');
    canvas.innerHTML = `<div class="template-content">${tpl.render(d)}</div>`;
    document.getElementById('tplCurrentName').textContent = tpl.name;
    updateDropdownActive();
}

function updateDropdownActive() {
    document.querySelectorAll('.tpl-dropdown-item').forEach((item, i) => {
        item.classList.toggle('active', i === currentTplIndex);
    });
}

function switchTemplate(index) {
    currentTplIndex = index;
    updatePreview();
    closeDropdown();
}

function prevTemplate() {
    currentTplIndex = (currentTplIndex - 1 + TEMPLATES.length) % TEMPLATES.length;
    updatePreview();
}

function nextTemplate() {
    currentTplIndex = (currentTplIndex + 1) % TEMPLATES.length;
    updatePreview();
}

// ── Dropdown ──
function toggleDropdown() {
    document.getElementById('tplDropdown').classList.toggle('open');
}

function closeDropdown() {
    document.getElementById('tplDropdown').classList.remove('open');
}

function buildDropdown() {
    const dd = document.getElementById('tplDropdown');
    dd.innerHTML = TEMPLATES.map((t, i) =>
        `<div class="tpl-dropdown-item${i === currentTplIndex ? ' active' : ''}" onclick="switchTemplate(${i})">
            <span>${t.name}</span><span class="tpl-badge">${t.badge}</span>
        </div>`
    ).join('');
}

async function downloadPDF() {
    const btn = document.getElementById('btnDownload');
    btn.classList.add('downloading');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

    const d = collectData();
    const tpl = TEMPLATES[currentTplIndex];

    // ── 1. Nuke all visual properties on CSS-scoping wrappers ──
    const resetCSS =
        'margin:0!important;padding:0!important;border:none!important;' +
        'box-shadow:none!important;transform:none!important;border-radius:0!important;' +
        'overflow:visible!important;background:transparent!important;' +
        'display:block!important;width:794px!important;height:auto!important;' +
        'position:static!important;max-width:none!important;';

    // ── 2. Create isolated container at viewport origin ──
    const wrap = document.createElement('div');
    wrap.style.cssText =
        'position:fixed;left:0;top:0;width:794px;z-index:-1;' +
        'margin:0;padding:0;border:none;background:transparent;overflow:visible;';

    wrap.innerHTML =
        `<div class="preview-canvas" style="${resetCSS}">` +
        `<div class="template-content" style="${resetCSS}">` +
        tpl.render(d) +
        `</div></div>`;

    document.body.appendChild(wrap);

    // ── 3. Lock the actual template element ──
    const tplEl = wrap.querySelector('.template-content').firstElementChild;
    tplEl.style.cssText +=
        ';width:794px!important;margin:0!important;min-height:1120px!important;' +
        'box-sizing:border-box!important;overflow:hidden!important;';

    // ── 4. Wait for fonts + paint ──
    await document.fonts.ready;
    await new Promise(r => setTimeout(r, 700));

    const W = 794;
    const H = tplEl.offsetHeight;

    try {
        // ── 5. Capture with html2canvas ──
        const canvas = await html2canvas(tplEl, {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            width: W,
            height: H,
            windowWidth: W,
            scrollX: 0,
            scrollY: 0
        });

        // ── 6. Build PDF with jsPDF — page = exact content size ──
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdfW = 210;
        const pdfH = pdfW * (canvas.height / canvas.width);

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [pdfW, pdfH],
            compress: true
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
        pdf.save(`${d.name.replace(/\s+/g, '_')}_resume_${tpl.id}.pdf`);

    } catch (err) {
        console.error('PDF generation failed:', err);
        alert('PDF generation failed. Please try again.');
    }

    // ── 7. Cleanup ──
    document.body.removeChild(wrap);
    btn.innerHTML = '<i class="fa-solid fa-download"></i>';
    btn.classList.remove('downloading');
}

// ── Fullscreen Toggle ──
function toggleFullScreen() {
    const previewEl = document.querySelector('.Preview');
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (previewEl.requestFullscreen) {
            previewEl.requestFullscreen();
        } else if (previewEl.webkitRequestFullscreen) { /* Safari */
            previewEl.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        }
    }
}

function handleFullscreenChange() {
    const icon = document.querySelector('#btnFullScreen i');
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        icon.classList.remove('fa-expand');
        icon.classList.add('fa-compress');
    } else {
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

// ── Dynamic Entry Management ──
function attachInputListeners(container) {
    container.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('input', updatePreview);
        el.addEventListener('change', updatePreview);
    });
}

function removeEntry(btn) {
    btn.closest('.dynamic-entry').remove();
    updatePreview();
}

function addEntry(containerId, html) {
    const container = document.getElementById(containerId);
    const entry = document.createElement('div');
    entry.className = 'dynamic-entry';
    entry.innerHTML = html;
    container.appendChild(entry);
    attachInputListeners(entry);
}

function addExperience() {
    addEntry('experienceEntries', `
        <div class="form-grid">
            <div class="input-group"><label>Job Title</label><input type="text" class="exp-title" placeholder="e.g. Sales Manager"></div>
            <div class="input-group"><label>Company</label><input type="text" class="exp-company" placeholder="e.g. Retail Solutions"></div>
            <div class="input-group"><label>Location</label><input type="text" class="exp-location" placeholder="e.g. Los Angeles, CA"></div>
            <div class="input-group"><label>Start Date</label><input type="text" class="exp-start" placeholder="e.g. 2019-08"></div>
            <div class="input-group"><label>End Date</label><input type="text" class="exp-end" placeholder="e.g. 2024-06"></div>
        </div>
        <div class="input-group full-width"><label>Responsibilities (one per line)</label><textarea class="exp-responsibilities" rows="3" placeholder="Managed daily operations..."></textarea></div>
        <button class="btn-remove" onclick="removeEntry(this)"><i class="fa-solid fa-trash"></i> Remove</button>
    `);
}

function addSocialLink() {
    addEntry('socialEntries', `
        <div class="form-grid">
            <div class="input-group">
                <label>Platform</label>
                <select class="social-platform">
                    <option value="linkedin">LinkedIn</option>
                    <option value="github">GitHub</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="behance">Behance</option>
                    <option value="dribbble">Dribbble</option>
                    <option value="other">Other / Custom</option>
                </select>
            </div>
            <div class="input-group">
                <label>Username (or full link)</label>
                <input type="text" class="social-username" placeholder="e.g. johndoe">
            </div>
        </div>
        <button class="btn-remove" onclick="removeEntry(this)"><i class="fa-solid fa-trash"></i> Remove</button>
    `);
}

function addEducation() {
    addEntry('educationEntries', `
        <div class="form-grid">
            <div class="input-group"><label>Degree</label><input type="text" class="edu-degree" placeholder="e.g. Bachelor of Science"></div>
            <div class="input-group"><label>Institution</label><input type="text" class="edu-institution" placeholder="e.g. University of California"></div>
            <div class="input-group"><label>Location</label><input type="text" class="edu-location" placeholder="e.g. Los Angeles, CA"></div>
            <div class="input-group"><label>Start Year</label><input type="text" class="edu-start" placeholder="e.g. 2013"></div>
            <div class="input-group"><label>End Year</label><input type="text" class="edu-end" placeholder="e.g. 2017"></div>
        </div>
        <button class="btn-remove" onclick="removeEntry(this)"><i class="fa-solid fa-trash"></i> Remove</button>
    `);
}

function addProject() {
    addEntry('projectEntries', `
        <div class="form-grid">
            <div class="input-group"><label>Project Name</label><input type="text" class="proj-name" placeholder="e.g. Inventory System"></div>
            <div class="input-group"><label>Tech Stack</label><input type="text" class="proj-tech" placeholder="e.g. React, Node.js"></div>
            <div class="input-group"><label>Link</label><input type="url" class="proj-link" placeholder="e.g. github.com/project"></div>
        </div>
        <div class="input-group full-width"><label>Description</label><textarea class="proj-desc" rows="2" placeholder="Built a full-stack..."></textarea></div>
        <button class="btn-remove" onclick="removeEntry(this)"><i class="fa-solid fa-trash"></i> Remove</button>
    `);
}

function addCertification() {
    addEntry('certEntries', `
        <div class="form-grid">
            <div class="input-group"><label>Certification Name</label><input type="text" class="cert-name" placeholder="e.g. Certified Sales Manager"></div>
            <div class="input-group"><label>Issuer</label><input type="text" class="cert-issuer" placeholder="e.g. Sales Management Association"></div>
            <div class="input-group"><label>Year</label><input type="text" class="cert-year" placeholder="e.g. 2019"></div>
        </div>
        <button class="btn-remove" onclick="removeEntry(this)"><i class="fa-solid fa-trash"></i> Remove</button>
    `);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    // Build the template dropdown
    buildDropdown();

    // Attach listeners to all form fields
    attachInputListeners(document.querySelector('.buildForm'));

    // Initial preview render
    updatePreview();

    // Template navigation buttons
    document.getElementById('btnPrevTpl').addEventListener('click', prevTemplate);
    document.getElementById('btnNextTpl').addEventListener('click', nextTemplate);
    document.getElementById('tplSelectorBtn').addEventListener('click', toggleDropdown);
    document.getElementById('btnFullScreen').addEventListener('click', toggleFullScreen);
    document.getElementById('btnDownload').addEventListener('click', downloadPDF);

    // Close dropdown on outside click
    document.addEventListener('click', e => {
        if (!e.target.closest('.tpl-selector')) closeDropdown();
    });

    // Navbar shadow
    window.addEventListener('scroll', () => {
        document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 80);
    });
});
