import { defineType, defineField } from 'sanity';

export const impactMetric = defineType({
  name: 'impactMetric',
  title: 'Impact Metric',
  type: 'document',
  description:
    'A measurable number HalfCut publishes. Every metric MUST have a source URL — claims without sources cannot ship.',
  fields: [
    defineField({
      name: 'key',
      title: 'Internal key (slug, used by templates)',
      type: 'slug',
      options: { source: 'label' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g. "1,200" or "265,100". Do not include the unit here.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'e.g. "ha", "trees planted", "rangers", "%"',
    }),
    defineField({
      name: 'note',
      title: 'Note (one short sentence)',
      type: 'string',
    }),
    defineField({
      name: 'source',
      title: 'Source organisation',
      type: 'string',
      description: 'Who published this number. e.g. "Jabalbina annual report 2025", "ACNC AIS 2024"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to the public document. Required — claims without public sources cannot ship.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'asOf',
      title: 'As of (date number was last verified)',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'orderRank',
      title: 'Display order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value', unit: 'unit', source: 'source' },
    prepare({ title, subtitle, unit, source }) {
      return { title, subtitle: `${subtitle}${unit ? ' ' + unit : ''} · ${source}` };
    },
  },
  orderings: [
    { title: 'Display order', name: 'orderRank', by: [{ field: 'orderRank', direction: 'asc' }] },
  ],
});
