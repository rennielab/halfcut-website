import { defineType, defineField } from 'sanity';

export const fieldNote = defineType({
  name: 'fieldNote',
  title: 'Field Note',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 90 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Dispatch', value: 'dispatch' },
          { title: 'Interview', value: 'interview' },
          { title: 'Long-form', value: 'long-form' },
          { title: 'Ledger', value: 'ledger' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (used on card + OG description)',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', validation: (r) => r.required() }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }, { type: 'boardMember' }],
      validation: (r) => r.required(),
      description:
        'Must be a real person. Author or boardMember entries can be selected only after their portrait + bio + sign-off are on file.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      validation: (r) => r.required(),
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Pull quote', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', validation: (r) => r.required() },
            { name: 'caption', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'culturalReviewComplete',
      title: 'Cultural review complete (if Country / Elders are referenced)',
      type: 'boolean',
      initialValue: false,
      description:
        'For any post that names or quotes a Traditional Owner or references Country, Jabalbina must review before publish.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'cover', date: 'publishedAt' },
  },
  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
});
