import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      initialValue: 'HalfCut',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (used in OG meta + footer)',
      type: 'string',
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: 'hero',
      title: 'Homepage hero',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title (use \\n for line breaks)', type: 'string', validation: (r) => r.required() },
        { name: 'lede', title: 'Lede paragraph', type: 'text', rows: 3, validation: (r) => r.required() },
        { name: 'image', title: 'Hero image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() },
        { name: 'imageAlt', title: 'Alt text', type: 'string', validation: (r) => r.required() },
        { name: 'imageCredit', title: 'Photographer credit', type: 'string' },
      ],
    }),
    defineField({
      name: 'acknowledgmentOfCountry',
      title: 'Acknowledgment of Country',
      type: 'text',
      rows: 5,
      validation: (r) => r.required().min(80),
      description:
        'MUST be co-signed by Jabalbina before publishing. Used on every page footer.',
    }),
    defineField({
      name: 'abn',
      title: 'ABN',
      type: 'string',
      initialValue: '24 642 788 814',
      validation: (r) => r.required().regex(/^\d{2} \d{3} \d{3} \d{3}$/, { name: 'ABN format' }),
    }),
    defineField({
      name: 'acncRegisteredSince',
      title: 'ACNC registered since',
      type: 'date',
      description: 'Must match the ACNC public register.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default social share image (1200×630)',
      type: 'image',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: 'siteName', subtitle: 'tagline' } },
});
