import {
  SiYoutube,
  SiTwitch,
  SiThreads,
  SiPinterest,
  SiGoogle,
  SiTiktok,
  SiInstagram,
  SiLinkedin,
  SiFacebook,
  SiX,
  SiReddit,
  SiKick,
  SiSnapchat,
  SiBluesky,
  SiAmazon,
  SiLinktree,
} from "react-icons/si";
import { MdPerson } from "react-icons/md";

const defaultIconMap = {
  tiktok: SiTiktok,
  "tiktok-shop": SiTiktok,
  instagram: SiInstagram,
  youtube: SiYoutube,
  linkedin: SiLinkedin,
  facebook: SiFacebook,
  facebookAdLibrary: SiFacebook,
  googleAdLibrary: SiGoogle,
  linkedinAdLibrary: SiLinkedin,
  twitter: SiX,
  reddit: SiReddit,
  threads: SiThreads,
  bluesky: SiBluesky,
  pinterest: SiPinterest,
  google: SiGoogle,
  twitch: SiTwitch,
  kick: SiKick,
  snapchat: SiSnapchat,
  linktree: SiLinktree,
  "amazon-shop": SiAmazon,
  "age-and-gender": MdPerson,
};

/**
 * @param {Array} apis - the raw apis array
 * @param {Object} [customIcons] - project-specific icons (e.g. TruthSocialIcon, KomiIcon)
 */
export function withIcons(apis, customIcons = {}) {
  const iconMap = { ...defaultIconMap, ...customIcons };
  return apis.map((api) => ({ ...api, icon: iconMap[api.id] ?? null }));
}
