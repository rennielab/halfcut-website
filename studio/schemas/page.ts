import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  description: 'Editorial pages: About, Take Action, Membership, Donate, Contact.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL path)',
      type: 'slug',
      options: { source: 'title', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(180),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Hero eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroLede',
      title: 'Hero lede',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', validation: (r) => r.required() }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', validation: (r) => r.required() }],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout',
          fields: [
            { name: 'kind', type: 'string', options: { list: ['note', 'warning', 'cta'] } },
            { name: 'heading', type: 'string' },
            { name: 'body', type: 'text', rows: 3 },
            { name: 'ctaLabel', type: 'string' },
            { name: 'ctaHref', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Custom social share image (optional)',
      type: 'image',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', media: 'heroImage' },
  },
});
