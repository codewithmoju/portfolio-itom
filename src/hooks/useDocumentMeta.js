import { useEffect, useRef } from 'react';
import { useScene } from '../context/SceneContext';

/**
 * useDocumentMeta — Dynamic Meta Tags & Virtual Routing (History API)
 * 
 * Updates the browser URL, page title, and meta description
 * whenever the user enters/exits a 3D room. Also handles the
 * browser back/forward buttons for seamless navigation.
 */

// Public site origin used for canonical/OG URLs
const SITE_ORIGIN = 'https://codewithmoju.netlify.app';

const ROOM_META = {
    null: {
        path: '/',
        title: 'Muhammad Moaiz — Full-Stack Mobile Developer',
        description: 'Interactive 3D portfolio of Muhammad Moaiz (codewithmoju) — Full-Stack Mobile Developer working with React Native, Next.js and Three.js. Explore mobile apps & SaaS products in a hand-drawn gallery.',
    },
    about: {
        path: '/about',
        title: 'About Me — Muhammad Moaiz',
        description: 'Get to know Muhammad Moaiz — Full-Stack Mobile Developer, Co-Founder of NAMS Studio, and BSSE student at Minhaj University Lahore. My story, journey, and skills.',
    },
    gallery: {
        path: '/gallery',
        title: 'Gallery & Projects — Muhammad Moaiz',
        description: 'Browse the interactive 3D gallery of projects by Muhammad Moaiz — private SaaS products, React Native mobile apps, and premium web storefronts, each shown as a hand-drawn card.',
    },
    studio: {
        path: '/studio',
        title: 'The Studio — Muhammad Moaiz',
        description: 'Explore the content studio of Muhammad Moaiz — notes on building private SaaS, React Native development, and co-founding a digital agency, displayed on floating monitors in 3D.',
    },
    contact: {
        path: '/contact',
        title: 'Contact — Muhammad Moaiz',
        description: 'Get in touch with Muhammad Moaiz — Full-Stack Mobile Developer based in Lahore, Pakistan. Find social links and contact information in this interactive 3D contact room.',
    },
};

// Map URL paths back to room IDs for deep linking
const PATH_TO_ROOM = {
    '/': null,
    '/about': 'about',
    '/gallery': 'gallery',
    '/studio': 'studio',
    '/contact': 'contact',
};

/**
 * Returns the room ID that the initial URL points to (for deep linking).
 * Call this once at app startup to determine if we need to auto-teleport.
 */
export function getInitialRoomFromUrl() {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    return PATH_TO_ROOM[path] !== undefined ? PATH_TO_ROOM[path] : null;
}

export function useDocumentMeta() {
    const { currentRoom, teleportTo, hasEntered } = useScene();
    const isHandlingPopState = useRef(false);
    const lastPushedRoom = useRef(undefined); // Track what we last pushed to avoid duplicates

    // Update document meta and URL when room changes
    useEffect(() => {
        const roomKey = currentRoom === null ? 'null' : currentRoom;
        const meta = ROOM_META[roomKey] || ROOM_META['null'];

        // Update the page title
        document.title = meta.title;

        // Update meta description
        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) {
            descTag.setAttribute('content', meta.description);
        }

        // Update OG meta tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', meta.title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', meta.description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', `${SITE_ORIGIN}${meta.path}`);

        // Update canonical link to ensure virtual routes are correctly indexable as separate pages
        const canonicalTag = document.querySelector('link[rel="canonical"]');
        if (canonicalTag) {
            canonicalTag.setAttribute('href', `${SITE_ORIGIN}${meta.path}`);
        }

        // Push to browser history (only if not handling a popstate event and room actually changed)
        if (!isHandlingPopState.current && lastPushedRoom.current !== currentRoom) {
            // Use replaceState for the very first load, pushState for subsequent navigations
            if (lastPushedRoom.current === undefined) {
                window.history.replaceState({ room: currentRoom }, '', meta.path);
            } else {
                window.history.pushState({ room: currentRoom }, '', meta.path);
            }
            lastPushedRoom.current = currentRoom;
        }

        isHandlingPopState.current = false;
    }, [currentRoom]);

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event) => {
            isHandlingPopState.current = true;
            const targetRoom = event.state?.room ?? null;
            lastPushedRoom.current = targetRoom;

            if (targetRoom === null) {
                // Going back to corridor — we don't teleport, just need to trigger exit
                // The SceneContext requestExit will handle the animation
                // For now, we update meta immediately
                const meta = ROOM_META['null'];
                document.title = meta.title;
            } else if (hasEntered) {
                // Teleport to the target room
                teleportTo(targetRoom);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [teleportTo, hasEntered]);
}
