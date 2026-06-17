import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'placeholder';
const dataset = import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET || 'production';

export default defineConfig({
  name: 'halfcut',
  title: 'HalfCut Content Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('HalfCut')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')
              ),
            S.divider(),
            S.documentTypeListItem('page').title('Pages'),
            S.documentTypeListItem('campaign').title('Campaigns'),
            S.documentTypeListItem('fieldNote').title('Field Notes'),
            S.divider(),
            S.documentTypeListItem('boardMember').title('Board Members'),
            S.documentTypeListItem('partner').title('Partners'),
            S.documentTypeListItem('author').title('Authors'),
            S.documentTypeListItem('impactMetric').title('Impact Metrics'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
