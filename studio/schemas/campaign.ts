import { defineType, defineField } from 'sanity';

export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Campaign title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'In development', value: 'in-development' },
          { title: 'Scoping', value: 'scoping' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag (small badge near hero)',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'One-line summary',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: 'hero',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text', validation: (r) => r.required() }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Key stats (4 max)',
      type: 'array',
      validation: (r) => r.max(4),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', validation: (r) => r.required() },
            { name: 'value', type: 'string', validation: (r) => r.required() },
            { name: 'note', type: 'string' },
            { name: 'source', type: 'string', description: 'Where this number comes from.' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
    defineField({
      name: 'issue',
      title: 'The issue',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'approach',
      title: 'Our approach',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'storyTitle',
      title: 'Long-form section title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Long-form body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', validation: (r) => r.required() }],
        },
      ],
    }),
    defineField({
      name: 'partnerOrg',
      title: 'Implementing partner',
      type: 'reference',
      to: [{ type: 'partner' }],
    }),
    defineField({
      name: 'orderRank',
      title: 'Display order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'hero' },
  },
  orderings: [
    { title: 'Display order', name: 'orderRank', by: [{ field: 'orderRank', direction: 'asc' }] },
  ],
});
