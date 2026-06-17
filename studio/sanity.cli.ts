import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.SANITY_DATASET || 'production';

export default defineCliConfig({
  api: { projectId, dataset },
  /**
   * Studio is deployed to sanity.studio. After `sanity deploy`, the editor lives at
   * https://halfcut.sanity.studio (HalfCut team can pick a different studio hostname).
   */
  studioHost: 'halfcut',
  autoUpdates: true,
});
