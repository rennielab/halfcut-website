import { defineType, defineField } from 'sanity';

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organisation name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'url',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'logo',
      title: 'Logo (SVG preferred)',
      type: 'image',
      fields: [{ name: 'alt', type: 'string', title: 'Alt text', validation: (r) => r.required() }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Traditional Owner partner', value: 'traditional-owner' },
          { title: 'Conservation org', value: 'conservation' },
          { title: 'Corporate sponsor', value: 'corporate' },
          { title: 'Government / funder', value: 'funder' },
          { title: 'Community / supplier', value: 'community' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'since',
      title: 'Partner since (year)',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote from the partner',
      type: 'text',
      rows: 4,
      description:
        'Only fill in if the partner has explicitly provided this quote in writing. Empty if not.',
    }),
    defineField({
      name: 'quoteAttribution',
      title: 'Quote attribution (name + role)',
      type: 'string',
    }),
    defineField({
      name: 'verified',
      title: 'Verified partner — relationship confirmed in writing',
      type: 'boolean',
      initialValue: false,
      description:
        'Only verified=true partners render on the public site. Default off so unverified logos never accidentally ship.',
    }),
    defineField({
      name: 'orderRank',
      title: 'Display order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'logo', verified: 'verified' },
    prepare({ title, subtitle, media, verified }) {
      return {
        title: `${verified ? '' : '⚠ '} ${title}`,
        subtitle: `${subtitle}${verified ? '' : ' · UNVERIFIED'}`,
        media,
      };
    },
  },
  orderings: [
    { title: 'Display order', name: 'orderRank', by: [{ field: 'orderRank', direction: 'asc' }] },
  ],
});
