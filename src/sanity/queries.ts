import { defineQuery } from "next-sanity";

export const homePageQuery = defineQuery(`
{
  "hero": *[_type == "heroSettings"][0] {
    "title": title[$locale],
    "subtitle": subtitle[$locale],
    "imageUrl": backgroundImage.asset->url,
    "imageAlt": backgroundImage.alt,
    "lqip": backgroundImage.asset->metadata.lqip,
    "videoUrl": backgroundVideo.asset->url
  },

  "manifesto": *[_type == "manifestoSettings"][0] {
    "title": title[$locale],
    "description": description[$locale]
  },

  "projects": *[_type == "projectsSettings"][0] {
    "settings": {
      "title": title[$locale],
      "subtitle": subtitle[$locale]
    },
    "list": selectedProjects[] {
      "title": title[$locale],
      "category": category[$locale],
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "imageAlt": title[$locale]
    }
  },

  "profiles": {
    "settings": *[_type == "profileSettings"][0] {
      heading,
      name,
      bio,
      image,
      stats
    },
    "list": *[_type == "profile"] | order(_createdAt asc) {
      "name": name,
      "role": role[$locale],
      "bio": bio[$locale],
      "imageUrl": image.asset->url,
      "imageAlt": name
    }
  },

  "footer": *[_type == "footerSettings"][0] {
    email,
    phone,
    "location": location[$locale],
    "ctaText": ctaText[$locale],
    "startProject": buttonText[$locale],
    "socials": socials[] {
      label,
      url
    }
  }
}
`);
