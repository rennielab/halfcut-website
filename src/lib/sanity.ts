import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-10-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getFieldNotes() {
  return sanityClient.fetch(
    `*[_type == "fieldNote" && defined(slug.current)] | order(publishedAt desc){
      _id, title, slug, excerpt, category, publishedAt, "cover": cover{asset, alt, hotspot, crop}, author->{name, role}
    }`
  );
}

export async function getFieldNoteBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "fieldNote" && slug.current == $slug][0]{
      ..., "cover": cover{asset, alt, hotspot, crop}, author->{name, role, bio}, body
    }`,
    { slug }
  );
}

export async function getCampaigns() {
  return sanityClient.fetch(
    `*[_type == "campaign"] | order(orderRank){
      _id, title, slug, status, tag, summary, "hero": hero{asset, alt, hotspot, crop}
    }`
  );
}

export async function getCampaignBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "campaign" && slug.current == $slug][0]{
      ..., "hero": hero{asset, alt, hotspot, crop}, stats[], gallery[]{asset, alt, hotspot, crop}
    }`,
    { slug }
  );
}

export async function getBoardMembers() {
  return sanityClient.fetch(
    `*[_type == "boardMember"] | order(orderRank){
      _id, name, role, company, slug, "portrait": portrait{asset, alt, hotspot, crop}, yearsOnBoard, whyJoined, bio, social
    }`
  );
}

export async function getPartners() {
  return sanityClient.fetch(
    `*[_type == "partner" && verified == true] | order(orderRank){
      _id, name, url, "logo": logo{asset, alt}, category, since
    }`
  );
}

export async function getImpactMetrics() {
  return sanityClient.fetch(
    `*[_type == "impactMetric"] | order(orderRank){
      _id, key, label, value, unit, note, source, sourceUrl, asOf
    }`
  );
}
