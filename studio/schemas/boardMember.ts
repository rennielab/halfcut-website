import { defineType, defineField } from 'sanity';

export const boardMember = defineType({
  name: 'boardMember',
  title: 'Board Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. Chair, Co-founder & CEO, Director & Treasurer. Verify against the ACNC responsible persons list.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'company',
      title: 'Day-job / company',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      description: 'Must be a real photograph supplied by the director. No stock images.',
      fields: [{ name: 'alt', type: 'string', title: 'Alt text', validation: (r) => r.required() }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'yearsOnBoard',
      title: 'Years on the board',
      type: 'string',
      description: 'e.g. "Since 2019" or "2021–"',
    }),
    defineField({
      name: 'whyJoined',
      title: 'Why I joined HalfCut (in their own words)',
      type: 'text',
      rows: 4,
      description:
        'Must be written or approved by the director themselves. Do not write on their behalf.',
      validation: (r) =>
        r.custom((v) => {
          if (!v || (typeof v === 'string' && v.trim().length === 0)) return true;
          if (typeof v === 'string' && v.trim().length < 60) return 'Too short to be a real quote.';
          return true;
        }),
    }),
    defineField({
      name: 'bio',
      title: 'Background bio',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', options: { list: ['LinkedIn', 'Twitter / X', 'Email', 'Website'] }, validation: (r) => r.required() },
            { name: 'url', type: 'url', validation: (r) => r.required() },
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),
    defineField({
      name: 'quoteApproved',
      title: 'Director has signed off on the quote and portrait',
      type: 'boolean',
      initialValue: false,
      description:
        'Must be true before this board member shows on the public site. Set manually by Ben after sign-off.',
    }),
    defineField({
      name: 'orderRank',
      title: 'Display order (lower = earlier)',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'portrait', approved: 'quoteApproved' },
    prepare({ title, subtitle, media, approved }) {
      return {
        title,
        subtitle: `${subtitle}${approved ? '' : ' · NOT APPROVED'}`,
        media,
      };
    },
  },
  orderings: [
    { title: 'Display order', name: 'orderRank', by: [{ field: 'orderRank', direction: 'asc' }] },
  ],
});
