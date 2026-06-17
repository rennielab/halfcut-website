import { defineType, defineField } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  description:
    'A real person credited on a Field Note. Cannot be created from a name alone — a portrait and a one-line bio are required so we never attribute writing to an unverified identity.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / how to introduce them',
      type: 'string',
      description: 'e.g. "Co-founder, HalfCut", "Eastern Kuku Yalanji Elder", "Senior Ranger, Jabalbina"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait (real photo, supplied by author)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', validation: (r) => r.required() }],
    }),
    defineField({
      name: 'bio',
      title: 'One-line bio',
      type: 'text',
      rows: 2,
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: 'signedRelease',
      title: 'Author has signed publishing release',
      type: 'boolean',
      initialValue: false,
      description:
        'Required for First Nations contributors. Set true only after a signed release is on file.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'portrait', released: 'signedRelease' },
    prepare({ title, subtitle, media, released }) {
      return { title, subtitle: `${subtitle}${released ? '' : ' · NO RELEASE ON FILE'}`, media };
    },
  },
});
