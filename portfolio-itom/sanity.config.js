import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'portfolio-itom',

  // Placeholder on purpose: this Studio must not point at another project's
  // dataset. Replace with your own Sanity projectId to re-enable the CMS.
  projectId: 'placeholder',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Global SEO & Info')
              .id('globalInfo')
              .child(
                S.document()
                  .schemaType('globalInfo')
                  .documentId('globalInfo')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['globalInfo'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
