import { createClient } from '@sanity/client';

// NOTE: Sentinel value on purpose. This repository ships with local, hardcoded
// portfolio data (Muhammad Moaiz), so the build-time SEO plugin must not pull
// content from another project's Sanity dataset. Set a real projectId only if
// you intend to source SEO data from Sanity.
// Must stay lowercase-alphanumeric: @sanity/client validates the projectId
// charset when the client is created.
const SANITY_PROJECT_ID = 'placeholder';

const sanityClient = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-03-01',
});

const isSanityConfigured = SANITY_PROJECT_ID !== 'placeholder';

// ============================================
// LOCAL SEO DATA (Muhammad Moaiz)
// Used for JSON-LD + llms.txt when Sanity is not configured.
// Mirrors src/data in the Myportfolio repo and the in-app content.
// ============================================
const SITE = {
    origin: 'https://codewithmoju.netlify.app',
    personId: 'Muhammad Moaiz',
    alternateName: ['Moaiz', 'codewithmoju'],
    jobTitle: 'Full-Stack Mobile Developer',
    title: 'Muhammad Moaiz | Full-Stack Mobile Developer Portfolio',
    description: 'Interactive 3D developer portfolio by Muhammad Moaiz — Full-Stack Mobile Developer (React Native + Next.js) and Co-Founder of NAMS Studio. Explore mobile apps, SaaS products & AI tools in a hand-drawn gallery.',
    aboutMe: 'Muhammad Moaiz shipped his first freelance React Native app at 16 and has been building ever since. He co-founded NAMS Studio in Lahore, Pakistan, and studies Computer Software Engineering (BSSE) at Minhaj University Lahore. He is a product-minded developer focused on mobile apps, SaaS tools, AI products, and automation systems that solve real problems.',
    knowsAbout: ['React Native', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Firebase', 'Supabase', 'PostgreSQL', 'Fastify', 'REST APIs', 'Expo', 'Tailwind CSS', 'Redux'],
    sameAs: [
        'https://github.com/MuhammadMoaiz001',
        'https://twitter.com/M_Moaiz001',
        'https://www.linkedin.com/in/muhammadmoaiz',
        'https://codewithmoju.netlify.app/',
    ],
};

const LOCAL_PROJECTS = [
    { title: 'RouteRadiant', description: 'Private AI learning SaaS built around one clear mission: make structured, personalized education easier to access. Public-safe case study — learner value and outcome are shown, the internal system stays protected.', url: SITE.origin },
    { title: 'NAMS Flow', description: 'Private customer communication SaaS for organized multi-channel business workflows. The public story covers operator value and experience; integrations, billing and internal automation stay private.', url: SITE.origin },
    { title: 'Kippo', description: 'Private social media management SaaS for teams and agencies — content planning, scheduling, analytics and multi-account workflows in one calmer workspace.', url: SITE.origin },
    { title: 'StockSuite', description: 'Private retail POS SaaS for inventory, sales and store operations. Built for real retail counters where speed and clarity matter, with the internal system kept non-public.', url: SITE.origin },
    { title: 'NAMS Studio', description: 'Official NAMS Studio agency website — app development, web development, UI/UX and SEO services, presented with motion-driven brand storytelling and selected works.', url: 'https://www.namsstudio.com' },
    { title: 'BudgetO', description: 'Premium personal finance tracking app for expenses, income, categories, currencies and insights — a complete React Native fintech build with Firebase auth, storage and biometric quick login.', url: 'https://github.com/codewithmoju/Finance-tracking-app' },
    { title: 'SpotSpace', description: 'Full-stack parking reservation and facility management app. Drivers discover facilities and book spots; admins configure sections, spot types, availability and pricing.', url: 'https://github.com/codewithmoju/SpotSpace' },
    { title: 'SkyCast', description: 'Weather forecasting app with real-time conditions and forecast views across Android, iOS and web. A clean, focused cross-platform utility build on live API data.', url: 'https://github.com/codewithmoju/wheather-forcasting-app' },
    { title: 'NemoDelivers', description: 'Cross-platform food delivery experience — restaurant discovery, menu browsing, ordering and progress tracking, designed around speed, trust and clear decisions.', url: SITE.origin },
    { title: 'Velvox', description: 'Premium men\'s fashion storefront with editorial e-commerce UX — collection browsing, product detail clarity, size selection and a cart-to-checkout-ready flow.', url: SITE.origin },
    { title: 'PakFiler', description: 'Protected Pakistani filing SaaS with guided user workflows. The public version explains only the product category and user-facing value; source, stack and business logic remain private.', url: SITE.origin },
];

const LOCAL_EXPERIENCE = [
    { role: 'React Native Developer', company: 'IT Intelligentsia', period: 'Sep 2025 – Present', summary: 'Building and maintaining cross-platform mobile features in React Native & TypeScript for production apps.' },
    { role: 'Co-Founder & Full-Stack Developer', company: 'NAMS STUDIO', period: 'Apr 2023 – Present', summary: 'Co-founded a digital agency delivering web, mobile, SaaS and automation products including RouteRadiant, Kippo, StockSuite and NAMS Flow.' },
    { role: 'Software Engineer Intern', company: 'DevelopersHub Corporation', period: 'Nov 2024 – Jan 2025', summary: 'Shipped React Native UI components and small applications through PR review in a structured 3-month internship.' },
];

const LOCAL_EDUCATION = [
    { degree: 'BSSE, Computer Software Engineering', institution: 'Minhaj University Lahore', period: 'Oct 2024 – Oct 2028' },
    { degree: 'Intermediate, Computer Science', institution: 'Aims Group of Colleges', period: '2022 – 2024' },
    { degree: 'Matriculation', institution: 'Govt. School Shorkot Cantt', period: 'Completed' },
];

const LOCAL_NOTES = [
    { title: 'Building Private SaaS Without Oversharing the System', date: 'Jun 27, 2026', excerpt: 'How I present serious product work publicly while protecting architecture, business logic, integrations and client-sensitive workflows.' },
    { title: 'Why React Native is Still My Go-To for Mobile Apps', date: 'Jan 28, 2025', excerpt: 'After shipping mobile apps across finance, education, parking, delivery and utility categories, here is why React Native remains my default choice.' },
    { title: 'Co-Founding a Digital Agency at 18 — What Nobody Tells You', date: 'Nov 5, 2024', excerpt: 'The real lessons from building NAMS Studio: client management, scope creep, cash flow, and staying sane while shipping.' },
];

// Tech stack filename -> human-readable name mapping for JSON-LD
const TECH_STACK_NAMES = {
    'reactlogo.webp': 'React',
    'csslogo.webp': 'CSS',
    'jslogo.webp': 'JavaScript',
    'tailwindlogo.webp': 'Tailwind CSS',
    'firebaselogo.webp': 'Firebase',
};

/**
 * Helper to ensure dates are in ISO-8601 format with timezone for SEO.
 */
function formatIsoDate(dateString) {
    if (!dateString) return undefined;
    if (dateString.includes('T')) return dateString; // Already has time/timezone
    return `${dateString}T12:00:00Z`; // Default to noon UTC
}

/**
 * Build dynamic JSON-LD structured data from Sanity content.
 * This generates schema.org entities that AI search engines (Google AI Overviews,
 * Perplexity, Gemini) use to understand and cite content in their answers.
 */
function buildJsonLd(globalInfo, projects, studio, awards, faqList) {
    const graph = [];

    // --- 1. Person: Central node of the Knowledge Graph ---
    const person = {
        '@type': 'Person',
        '@id': 'https://codewithmoju.netlify.app/#person',
        name: SITE.personId,
        alternateName: SITE.alternateName,
        url: SITE.origin,
        jobTitle: SITE.jobTitle,
        description: globalInfo?.aboutMe || SITE.aboutMe,
        knowsAbout: SITE.knowsAbout,
        sameAs: [
            globalInfo?.linkedinUrl,
            globalInfo?.githubUrl,
            globalInfo?.instagramUrl,
            globalInfo?.xUrl,
            globalInfo?.tiktokUrl,
            globalInfo?.youtubeUrl
        ].filter(Boolean).length > 0
            ? [globalInfo?.linkedinUrl, globalInfo?.githubUrl, globalInfo?.instagramUrl, globalInfo?.xUrl, globalInfo?.tiktokUrl, globalInfo?.youtubeUrl].filter(Boolean)
            : SITE.sameAs
    };
    graph.push(person);

    // --- 2. WebSite ---
    const website = {
        '@type': 'WebSite',
        '@id': 'https://codewithmoju.netlify.app/#website',
        url: SITE.origin,
        name: globalInfo?.siteTitle || SITE.title,
        description: globalInfo?.siteDescription || SITE.description,
        publisher: { '@id': 'https://codewithmoju.netlify.app/#person' }
    };
    graph.push(website);

    // --- 3. ProfilePage ---
    const profilePage = {
        '@type': 'ProfilePage',
        '@id': 'https://codewithmoju.netlify.app/#profilepage',
        url: SITE.origin,
        mainEntity: { '@id': 'https://codewithmoju.netlify.app/#person' },
        about: { '@id': 'https://codewithmoju.netlify.app/#person' }
    };
    graph.push(profilePage);

    // --- 4. FAQPage (GEO & AI search engine optimizer) ---
    if (faqList && faqList.length > 0) {
        const faqPage = {
            '@type': 'FAQPage',
            '@id': 'https://codewithmoju.netlify.app/#faq',
            mainEntity: faqList.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer
                }
            }))
        };
        graph.push(faqPage);
    }

    // --- 5. ItemList: Portfolio Projects (Google rich results for lists) ---
    if (projects && projects.length > 0) {
        graph.push({
            '@type': 'ItemList',
            '@id': 'https://codewithmoju.netlify.app/#projectslist',
            name: `Portfolio Projects by ${SITE.personId}`,
            description: 'Selected mobile, SaaS and web products showcasing React Native, Next.js and full-stack product engineering.',
            numberOfItems: projects.length,
            itemListElement: projects.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                    '@type': 'CreativeWork',
                    name: p.seoTitle || p.title,
                    description: p.seoDescription || p.description || '',
                    url: p.url || undefined,
                    creator: { '@id': 'https://codewithmoju.netlify.app/#person' },
                    ...(p.techStack && p.techStack.length > 0 ? {
                        keywords: p.techStack.map(t => TECH_STACK_NAMES[t] || t).join(', ')
                    } : {}),
                }
            }))
        });

        // Individual CreativeWork entries for each project (richer detail)
        projects.forEach(p => {
            const projectSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            graph.push({
                '@type': 'CreativeWork',
                '@id': `https://codewithmoju.netlify.app/#project-${projectSlug}`,
                name: p.seoTitle || p.title,
                description: p.seoDescription || p.description || '',
                url: p.url || undefined,
                creator: { '@id': 'https://codewithmoju.netlify.app/#person' },
                ...(p.techStack && p.techStack.length > 0 ? {
                    keywords: p.techStack.map(t => TECH_STACK_NAMES[t] || t).join(', ')
                } : {}),
            });
        });
    }

    // --- 6. Studio Content (YouTube -> VideoObject, Blog -> Article, TikTok -> VideoObject) ---
    if (studio && studio.length > 0) {
        studio.forEach((s, idx) => {
            const studioSlug = `studio-item-${idx}`;
            if (s.platform === 'youtube') {
                let embedUrl = undefined;
                if (s.url) {
                    const ytMatch = s.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^"&?\/\s]{11})/);
                    if (ytMatch && ytMatch[1]) {
                        embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
                    }
                }

                graph.push({
                    '@type': 'VideoObject',
                    '@id': `https://codewithmoju.netlify.app/#${studioSlug}`,
                    name: s.seoTitle || s.title,
                    description: s.seoDescription || s.description || '',
                    url: s.url || undefined,
                    contentUrl: s.url || undefined,
                    ...(embedUrl ? { embedUrl } : {}),
                    thumbnailUrl: s.thumbnailUrl || 'https://codewithmoju.netlify.app/og-image.jpg',
                    ...(s.duration ? { duration: `PT${s.duration.replace(':', 'M')}S` } : {}),
                    ...(s.date ? { uploadDate: formatIsoDate(s.date) } : {}),
                    ...(s.views ? { interactionStatistic: { '@type': 'InteractionCounter', interactionType: 'https://schema.org/WatchAction', userInteractionCount: s.views } } : {}),
                    author: { '@id': 'https://codewithmoju.netlify.app/#person' },
                });
            } else if (s.platform === 'blog') {
                graph.push({
                    '@type': 'Article',
                    '@id': `https://codewithmoju.netlify.app/#${studioSlug}`,
                    headline: s.seoTitle || s.title,
                    description: s.seoDescription || s.description || '',
                    url: s.url || undefined,
                    image: s.thumbnailUrl || 'https://codewithmoju.netlify.app/og-image.jpg',
                    ...(s.date ? { datePublished: formatIsoDate(s.date) } : {}),
                    ...(s.readTime ? { timeRequired: `PT${s.readTime.replace(' min', '')}M` } : {}),
                    author: { '@id': 'https://codewithmoju.netlify.app/#person' },
                });
            } else if (s.platform === 'tiktok') {
                graph.push({
                    '@type': 'VideoObject',
                    '@id': `https://codewithmoju.netlify.app/#${studioSlug}`,
                    name: s.seoTitle || s.title,
                    description: s.seoDescription || s.description || '',
                    url: s.url || undefined,
                    contentUrl: s.url || undefined,
                    thumbnailUrl: s.thumbnailUrl || 'https://codewithmoju.netlify.app/og-image.jpg',
                    ...(s.date ? { uploadDate: formatIsoDate(s.date) } : {}),
                    ...(s.views ? { interactionStatistic: { '@type': 'InteractionCounter', interactionType: 'https://schema.org/WatchAction', userInteractionCount: s.views } } : {}),
                    ...(s.likes ? { aggregateRating: { '@type': 'AggregateRating', ratingCount: s.likes } } : {}),
                    author: { '@id': 'https://codewithmoju.netlify.app/#person' },
                });
            } else if (s.platform === 'instagram' || s.platform === 'x' || s.platform === 'linkedin') {
                graph.push({
                    '@type': 'SocialMediaPosting',
                    '@id': `https://codewithmoju.netlify.app/#${studioSlug}`,
                    headline: s.seoTitle || s.title,
                    description: s.seoDescription || s.description || '',
                    url: s.url || undefined,
                    image: s.thumbnailUrl || 'https://codewithmoju.netlify.app/og-image.jpg',
                    ...(s.date ? { datePublished: formatIsoDate(s.date) } : {}),
                    ...(s.likes ? { interactionStatistic: { '@type': 'InteractionCounter', interactionType: 'https://schema.org/LikeAction', userInteractionCount: s.likes } } : {}),
                    author: { '@id': 'https://codewithmoju.netlify.app/#person' },
                });
            } else if (s.platform === 'codrops') {
                graph.push({
                    '@type': 'Article',
                    '@id': `https://codewithmoju.netlify.app/#${studioSlug}`,
                    headline: s.seoTitle || s.title,
                    description: s.seoDescription || s.description || '',
                    url: s.url || undefined,
                    image: s.thumbnailUrl || 'https://codewithmoju.netlify.app/og-image.jpg',
                    ...(s.date ? { datePublished: formatIsoDate(s.date) } : {}),
                    author: { '@id': 'https://codewithmoju.netlify.app/#person' },
                });
            }
        });
    }

    // --- 7. Awards as schema.org Award/CreativeWork ---
    if (awards && awards.length > 0) {
        const categoryLabels = { sotd: 'Site of the Day', sotm: 'Site of the Month', other: 'Honorable Mention' };
        graph.push({
            '@type': 'ItemList',
            '@id': 'https://codewithmoju.netlify.app/#awardslist',
            name: `Career, education and product highlights of ${SITE.personId}`,
            numberOfItems: awards.length,
            itemListElement: awards.map((a, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                    '@type': 'CreativeWork',
                    name: `${categoryLabels[a.category] || a.category} — ${a.seoTitle || a.title}`,
                    ...(a.date ? { dateCreated: formatIsoDate(a.date) } : {}),
                    url: a.url || undefined,
                    description: a.seoDescription || undefined,
                    award: categoryLabels[a.category] || a.category,
                    creator: { '@id': 'https://codewithmoju.netlify.app/#person' },
                }
            }))
        });
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph
    };
}

// Helper to generate the llms.txt content in clean Markdown
function buildLlmsTxt(globalInfo, projects, studio, awards, faqList) {
    const siteTitle = globalInfo?.siteTitle || SITE.title;
    const siteDescription = globalInfo?.siteDescription || SITE.description;
    const aboutMe = globalInfo?.aboutMe || SITE.aboutMe;

    let content = `# ${siteTitle}\n`;
    content += `> ${siteDescription}\n\n`;

    content += `## Biography / About Me\n`;
    content += `${aboutMe}\n\n`;

    content += `## Core Technologies & Skills\n`;
    content += `- Frontend: HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Redux.\n`;
    content += `- Mobile: React Native, Expo, React Navigation, NativeWind.\n`;
    content += `- Backend & Database: Firebase, Supabase, PostgreSQL, Fastify, REST APIs, OpenAPI.\n`;
    content += `- Tools: Git, GitHub, Vercel, Netlify, EAS Build, Vitest, and AI-assisted development tools.\n\n`;

    content += `## Professional Experience\n`;
    LOCAL_EXPERIENCE.forEach(e => {
        content += `- **${e.role}** at ${e.company} (${e.period}): ${e.summary}\n`;
    });
    content += `\n`;

    content += `## Education\n`;
    LOCAL_EDUCATION.forEach(e => {
        content += `- **${e.degree}** — ${e.institution} (${e.period})\n`;
    });
    content += `\n`;

    if (projects && projects.length > 0) {
        content += `## Selected Portfolio Projects\n`;
        projects.forEach(p => {
            const tech = p.techStack ? ` (Tech: ${p.techStack.map(t => TECH_STACK_NAMES[t] || t).join(', ')})` : '';
            content += `- [${p.seoTitle || p.title}](${p.url || SITE.origin}): ${p.seoDescription || p.description || ''}${tech}\n`;
        });
        content += `\n`;
    } else {
        content += `## Selected Portfolio Projects\n`;
        LOCAL_PROJECTS.forEach(p => {
            content += `- [${p.title}](${p.url}): ${p.description}\n`;
        });
        content += `\n`;
    }

    if (studio && studio.length > 0) {
        content += `## Studio Content & Publications\n`;
        studio.forEach(s => {
            content += `- [${s.seoTitle || s.title} (${s.platform})](${s.url || SITE.origin}): ${s.seoDescription || s.description || ''}\n`;
        });
        content += `\n`;
    } else {
        content += `## Writing & Notes\n`;
        LOCAL_NOTES.forEach(n => {
            content += `- **${n.title}** (${n.date}): ${n.excerpt}\n`;
        });
        content += `\n`;
    }

    if (awards && awards.length > 0) {
        content += `## Design Awards & Achievements\n`;
        const categoryLabels = { sotd: 'Site of the Day', sotm: 'Site of the Month', other: 'Honorable Mention' };
        awards.forEach(a => {
            const category = categoryLabels[a.category] || a.category;
            content += `- **${category}** — [${a.seoTitle || a.title}](${a.url || SITE.origin}): Awarded on ${a.date || 'unknown'}. ${a.seoDescription || ''}\n`;
        });
        content += `\n`;
    }

    content += `## Contact\n`;
    content += `- Portfolio: ${SITE.origin}\n`;
    content += `- GitHub: https://github.com/MuhammadMoaiz001\n`;
    content += `- LinkedIn: https://www.linkedin.com/in/muhammadmoaiz\n`;
    content += `\n`;

    if (faqList && faqList.length > 0) {
        content += `## Frequently Asked Questions (FAQ)\n`;
        faqList.forEach(item => {
            content += `- **${item.question}**\n`;
            content += `  ${item.answer.replace(/\n/g, '\n  ')}\n`;
        });
    }

    return content;
}

export function generateSeoHtml() {
    let cachedLlmsContent = '';

    // Fetch SEO data from Sanity. When Sanity is not configured this resolves to
    // all-null so the plugin falls back to the local, hardcoded Moaiz data
    // instead of pulling content from another project's dataset.
    async function fetchSanityData() {
        if (!isSanityConfigured) {
            return { globalInfo: null, projects: null, studio: null, awards: null, faqList: null };
        }
        const [globalInfo, projects, studio, awards, faqList] = await Promise.all([
            sanityClient.fetch(`*[_id == "globalInfo"][0]`),
            sanityClient.fetch(`*[_type == "galleryProject"]`),
            sanityClient.fetch(`*[_type == "studioItem"] { ..., "thumbnailUrl": frontTexture.asset->url }`),
            sanityClient.fetch(`*[_type == "awardCertificate"]`),
            sanityClient.fetch(`*[_type == "faq"]`)
        ]);
        return { globalInfo, projects, studio, awards, faqList };
    }

    async function getLlmsContent() {
        if (!cachedLlmsContent) {
            try {
                const { globalInfo, projects, studio, awards, faqList } = await fetchSanityData();
                cachedLlmsContent = buildLlmsTxt(globalInfo, projects, studio, awards, faqList);
            } catch (e) {
                console.error('SEO Plugin Error: Failed to fetch Sanity data for llms.txt', e);
                cachedLlmsContent = buildLlmsTxt(null, null, null, null, null);
            }
        }
        return cachedLlmsContent;
    }

    return {
        name: 'sanity-seo-plugin',

        // Serve llms.txt in local development mode
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (req.url === '/llms.txt') {
                    const content = await getLlmsContent();
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end(content);
                } else {
                    next();
                }
            });
        },

        // This hook runs when Vite generates or serves index.html
        async transformIndexHtml(html) {
            try {
                const { globalInfo, projects, studio, awards, faqList } = await fetchSanityData();

                // When Sanity is not configured, index.html already contains the
                // real, hand-written SEO copy. Only inject structured data here so
                // we never replace that copy with generic fallbacks.
                if (!isSanityConfigured) {
                    cachedLlmsContent = buildLlmsTxt(null, null, null, null, null);
                    const localJsonLd = buildJsonLd(null, LOCAL_PROJECTS, null, null, null);
                    const localJsonLdScript = `\n  <!-- Dynamic Structured Data (JSON-LD) — generated from local data at build time -->\n  <script type="application/ld+json">\n${JSON.stringify(localJsonLd, null, 2)}\n  </script>\n`;
                    return html.replace('</head>', `${localJsonLdScript}</head>`);
                }

                // Fallback values if globalInfo is not yet created in Sanity
                const siteTitle = globalInfo?.siteTitle || SITE.title;
                const siteDescription = globalInfo?.siteDescription || SITE.description;
                const aboutMe = globalInfo?.aboutMe || SITE.aboutMe;

                // Cache llms.txt content for later bundle emission
                cachedLlmsContent = buildLlmsTxt(globalInfo, projects, studio, awards, faqList);

                // ====== PART 1: Build the semantic HTML string ======
                let seoHtml = `\n<div id="seo-content" class="sr-only-seo">\n`;
                
                seoHtml += `  <header>\n`;
                seoHtml += `    <h1>${siteTitle}</h1>\n`;
                seoHtml += `    <p>${siteDescription}</p>\n`;
                seoHtml += `  </header>\n`;

                seoHtml += `  <section id="about">\n`;
                seoHtml += `    <h2>About Me</h2>\n`;
                seoHtml += `    <p>${aboutMe}</p>\n`;
                if (globalInfo?.githubUrl) seoHtml += `    <a href="${globalInfo.githubUrl}">GitHub</a>\n`;
                if (globalInfo?.linkedinUrl) seoHtml += `    <a href="${globalInfo.linkedinUrl}">LinkedIn</a>\n`;
                seoHtml += `  </section>\n`;

                if (projects && projects.length > 0) {
                    seoHtml += `  <section id="projects">\n    <h2>Projects</h2>\n    <ul>\n`;
                    projects.forEach(p => {
                        seoHtml += `      <li>\n        <h3>${p.seoTitle || p.title}</h3>\n        <p>${p.seoDescription || p.description || ''}</p>\n        ${p.url ? `<a href="${p.url}">Visit ${p.seoTitle || p.title}</a>\n` : ''}      </li>\n`;
                    });
                    seoHtml += `    </ul>\n  </section>\n`;
                }

                if (studio && studio.length > 0) {
                    seoHtml += `  <section id="studio">\n    <h2>The Studio (Content)</h2>\n    <ul>\n`;
                    studio.forEach(s => {
                        seoHtml += `      <li>\n        <h3>${s.seoTitle || s.title} (${s.platform})</h3>\n        <p>${s.seoDescription || s.description || ''}</p>\n        ${s.url ? `<a href="${s.url}">View Content</a>\n` : ''}      </li>\n`;
                    });
                    seoHtml += `    </ul>\n  </section>\n`;
                }

                if (awards && awards.length > 0) {
                    seoHtml += `  <section id="awards">\n    <h2>Awards & Certificates</h2>\n    <ul>\n`;
                    awards.forEach(a => {
                        seoHtml += `      <li>\n        <h3>${a.seoTitle || a.title}</h3>\n        <p>${a.category} - ${a.date}</p>\n        <p>${a.seoDescription || ''}</p>\n        ${a.url ? `<a href="${a.url}">Link</a>\n` : ''}      </li>\n`;
                    });
                    seoHtml += `    </ul>\n  </section>\n`;
                }

                // FAQ Section (GEO/AI search optimizer fallback)
                if (faqList && faqList.length > 0) {
                    seoHtml += `  <section id="faq">\n`;
                    seoHtml += `    <h2>Frequently Asked Questions (FAQ)</h2>\n`;
                    faqList.forEach(item => {
                        seoHtml += `    <article>\n`;
                        seoHtml += `      <h3>${item.question}</h3>\n`;
                        seoHtml += `      <p>${item.answer}</p>\n`;
                        seoHtml += `    </article>\n`;
                    });
                    seoHtml += `  </section>\n`;
                }

                seoHtml += `</div>\n`;

                // ====== PART 2: Build dynamic JSON-LD ======
                const jsonLdSchemas = buildJsonLd(globalInfo, projects, studio, awards, faqList);
                const jsonLdScript = `\n  <!-- Dynamic Structured Data (JSON-LD) — generated from Sanity at build time -->\n  <script type="application/ld+json">\n${JSON.stringify(jsonLdSchemas, null, 2)}\n  </script>\n`;

                // ====== PART 3: Transform HTML ======
                // Update the <title> tag
                let transformedHtml = html.replace(
                    /<title>(.*?)<\/title>/,
                    `<title>${siteTitle}</title>`
                );
                
                // Add or replace meta description
                if (transformedHtml.includes('<meta name="description"')) {
                    transformedHtml = transformedHtml.replace(
                        /<meta name="description" content="(.*?)"\s*\/?>/,
                        `<meta name="description" content="${siteDescription}" />`
                    );
                } else {
                    transformedHtml = transformedHtml.replace(
                        '</head>',
                        `  <meta name="description" content="${siteDescription}" />\n</head>`
                    );
                }

                // Update Open Graph dynamic metadata
                transformedHtml = transformedHtml
                    .replace(
                        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
                        `<meta property="og:title" content="${siteTitle}" />`
                    )
                    .replace(
                        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
                        `<meta property="og:description" content="${siteDescription}" />`
                    );

                // Update Twitter card dynamic metadata
                transformedHtml = transformedHtml
                    .replace(
                        /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
                        `<meta name="twitter:title" content="${siteTitle}" />`
                    )
                    .replace(
                        /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
                        `<meta name="twitter:description" content="${siteDescription}" />`
                    );

                // Inject dynamic JSON-LD right before </head> (next to the existing static one)
                transformedHtml = transformedHtml.replace('</head>', `${jsonLdScript}</head>`);

                // Replace the static placeholder with the dynamic one to prevent duplicate #seo-content and double h1s
                if (transformedHtml.includes('id="seo-content"')) {
                    transformedHtml = transformedHtml.replace(
                        /<div id="seo-content" class="sr-only-seo">[\s\S]*?<\/div>/,
                        seoHtml
                    );
                } else {
                    // Fallback injection if the template doesn't contain the static block
                    transformedHtml = transformedHtml.replace('</body>', `${seoHtml}</body>`);
                }

                return transformedHtml;
            } catch (error) {
                console.error('SEO Plugin Error: Failed to fetch Sanity data', error);
                // Return original HTML on failure so we don't break the build
                return html;
            }
        },

        // Emit llms.txt to the build output directory
        async generateBundle() {
            const content = await getLlmsContent();
            this.emitFile({
                type: 'asset',
                fileName: 'llms.txt',
                source: content
            });
        }
    };
}
