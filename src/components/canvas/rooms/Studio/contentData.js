/**
 * Studio Content Data
 * 
 * This file contains all content items for the Studio monitor tower.
 * Each item will be displayed on a monitor in the tower.
 * 
 * Repurposed for Muhammad Moaiz: his writing (blog), his professional
 * experience (career) and his education history (education).
 * Platforms: 'blog', 'career', 'education'
 */

const PORTFOLIO_URL = 'https://muhammadmoaiz.netlify.app/';
const LINKEDIN_URL = 'https://www.linkedin.com/in/muhammadmoaiz';

export const PLATFORM_CONFIG = {
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Blog',
        shape: 'monitor', // Thin desktop monitor
    },
    career: {
        color: '#0A66C2',
        accentColor: '#004182',
        icon: '💼',
        label: 'Career',
        shape: 'tv', // Wide CRT style
    },
    education: {
        color: '#7C4DFF',
        accentColor: '#5E35B1',
        icon: '🎓',
        label: 'Education',
        shape: 'phone', // Vertical phone
    },
};

// Real content — writing, career milestones and education from Muhammad Moaiz's verified data
const RAW_CONTENT_DATA = [
    // ============ Blog / Writing ============
    {
        id: 'blog-001',
        platform: 'blog',
        title: 'Building Private SaaS Without Oversharing the System',
        description: 'How I present serious product work publicly while protecting architecture, business logic, integrations, and client-sensitive workflows.',
        frontTexture: '/textures/studio/monitorfront_postnafbdoublewinner.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_postnafbdoublewinner_painted.webp',
        thumbnail: null,
        url: PORTFOLIO_URL,
        date: 'Jun 27, 2026',
        readTime: '7 min read',
        tag: 'Product',
    },
    {
        id: 'blog-002',
        platform: 'blog',
        title: 'Why React Native is Still My Go-To for Mobile Apps',
        description: 'After shipping mobile apps across finance, education, parking, delivery, and utility categories, here is why React Native remains my default choice.',
        thumbnail: null,
        url: PORTFOLIO_URL,
        date: 'Jan 28, 2025',
        readTime: '6 min read',
        tag: 'Mobile',
    },
    {
        id: 'blog-003',
        platform: 'blog',
        title: 'Co-Founding a Digital Agency at 18 — What Nobody Tells You',
        description: 'The real lessons from building NAMS Studio: client management, scope creep, cash flow, and staying sane while shipping.',
        thumbnail: null,
        url: PORTFOLIO_URL,
        date: 'Nov 5, 2024',
        readTime: '7 min read',
        tag: 'Startup',
    },

    // ============ Career ============
    {
        id: 'career-001',
        platform: 'career',
        title: 'React Native Developer — IT Intelligentsia',
        description: 'Sep 2025 – Present · Lahore, Pakistan. Building and maintaining cross-platform mobile features in React Native & TypeScript for production apps, integrating REST APIs and third-party SDKs within a professional sprint-based team.',
        frontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego.webp',
        paintedFrontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp',
        thumbnail: null,
        url: LINKEDIN_URL,
        date: 'Sep 2025',
        location: 'Lahore, Pakistan',
    },
    {
        id: 'career-002',
        platform: 'career',
        title: 'Co-Founder & Full-Stack Developer — NAMS STUDIO',
        description: 'Apr 2023 – Present · Lahore, Pakistan. Co-founded a digital agency delivering web, mobile, SaaS and automation products, managing client relationships end-to-end from requirements and UI/UX through development and deployment.',
        thumbnail: null,
        url: 'https://www.namsstudio.com',
        date: 'Apr 2023',
        location: 'Lahore, Pakistan',
    },
    {
        id: 'career-003',
        platform: 'career',
        title: 'Software Engineer Intern — DevelopersHub Corporation',
        description: 'Nov 2024 – Jan 2025 · Islamabad, Pakistan. Completed a structured 3-month internship in mobile application development, shipping React Native UI components through PR approval and gaining hands-on Git and code-review experience.',
        thumbnail: null,
        url: LINKEDIN_URL,
        date: 'Nov 2024',
        location: 'Islamabad, Pakistan',
    },

    // ============ Education ============
    {
        id: 'edu-001',
        platform: 'education',
        title: "Bachelor's in Computer Software Engineering — Minhaj University Lahore",
        description: 'Oct 2024 – Oct 2028 · Ongoing. Senior President of the Seekers Tech & Computing Society.',
        frontTexture: '/textures/studio/phonefront_followmeontiktok.webp',
        paintedFrontTexture: '/textures/studio/phonefront_followmeontiktok_painted.webp',
        thumbnail: null,
        url: LINKEDIN_URL,
        date: 'Oct 2024',
        status: 'Ongoing',
    },
    {
        id: 'edu-002',
        platform: 'education',
        title: 'Intermediate in Computer Science — Aims Group of Colleges',
        description: '2022 – 2024 · Completed.',
        thumbnail: null,
        url: LINKEDIN_URL,
        date: '2022',
        status: 'Completed',
    },
    {
        id: 'edu-003',
        platform: 'education',
        title: 'Matriculation — Govt. School Shorkot Cantt',
        description: 'Completed.',
        thumbnail: null,
        url: LINKEDIN_URL,
        date: 'Completed',
        status: 'Completed',
    },
];

const careerTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego.webp'];
const careerPaintedTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp'];
const blogTextures = ['/textures/studio/monitorfront_postnafbdoublewinner.webp'];
const blogPaintedTextures = ['/textures/studio/monitorfront_postnafbdoublewinner_painted.webp'];
const eduTextures = ['/textures/studio/phonefront_followmeontiktok.webp'];
const eduPaintedTextures = ['/textures/studio/phonefront_followmeontiktok_painted.webp'];

let careerIdx = 0, blogIdx = 0, eduIdx = 0;
let careerPIdx = 0, blogPIdx = 0, eduPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            item.platform === 'career' ? careerTextures[careerIdx++ % careerTextures.length] :
                item.platform === 'blog' ? blogTextures[blogIdx++ % blogTextures.length] :
                    eduTextures[eduIdx++ % eduTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            item.platform === 'career' ? careerPaintedTextures[careerPIdx++ % careerPaintedTextures.length] :
                item.platform === 'blog' ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length] :
                    eduPaintedTextures[eduPIdx++ % eduPaintedTextures.length]
        )
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    const toTime = (value) => {
        const parsed = Date.parse(value);
        return Number.isNaN(parsed) ? -Infinity : parsed;
    };
    return [...CONTENT_DATA].sort((a, b) => toTime(b.date) - toTime(a.date))[0];
};
