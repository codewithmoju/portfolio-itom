import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// NOTE: Set to the placeholder sentinel on purpose. portfolio-itom now ships with
// Muhammad Moaiz's verified data hardcoded in the local content files, so the remote
// CMS must stay disabled — otherwise it would override the local data. Replacing this
// value with a real Sanity project ID re-enables the CMS layer.
// The sentinel must stay lowercase-alphanumeric: @sanity/client validates the
// projectId charset when the client is created.
export const SANITY_PROJECT_ID_PLACEHOLDER = 'placeholder';

export const sanityClient = createClient({
    projectId: SANITY_PROJECT_ID_PLACEHOLDER,
    dataset: 'production',
    useCdn: true, // `false` dla środowiska dev, `true` dla produkcji żeby było szybciej
    apiVersion: '2024-03-01', // aktualna data API
});

const builder = createImageUrlBuilder(sanityClient);

// Funkcja pomocnicza do generowania adresów URL obrazków z Sanity
export const urlFor = (source) => builder.image(source);

// Funkcja pomocnicza do zamiany domeny Sanity na proxy w Cloudflare
export const getProxyUrl = (imageBuilder) => {
    if (!imageBuilder) return null;
    const url = imageBuilder.url();
    if (url && typeof window !== 'undefined') {
        return url.replace('https://cdn.sanity.io', '/sanity-cdn');
    }
    return url;
};
