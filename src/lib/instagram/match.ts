import type { Campaign } from "./campaigns";

/** Minúsculas y sin tildes, pa ke «CHÁNDAL» y «chandal» sean lo mismo. */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function matchesKeyword(
  text: string,
  keyword: string,
  mode: Campaign["match"] = "word",
): boolean {
  const haystack = normalize(text);
  const needle = normalize(keyword).trim();
  if (!needle) return false;
  if (mode === "contains") return haystack.includes(needle);
  // Palabra suelta: ni letra ni número pegado a los lados (vale con emojis y signos).
  return new RegExp(
    `(?<![\\p{L}\\p{N}])${escapeRegExp(needle)}(?![\\p{L}\\p{N}])`,
    "u",
  ).test(haystack);
}

export type TriggerSource =
  | { kind: "comment"; mediaId: string }
  | { kind: "dm" };

/** Primera campaña activa que encaja con el texto y el origen; si no, `undefined`. */
export function findCampaign(
  campaigns: Campaign[],
  text: string,
  source: TriggerSource,
): Campaign | undefined {
  return campaigns.find((campaign) => {
    if (campaign.active === false) return false;
    const triggers = { comments: true, dms: false, ...campaign.triggers };
    if (source.kind === "comment") {
      if (!triggers.comments) return false;
      if (campaign.mediaIds?.length && !campaign.mediaIds.includes(source.mediaId)) {
        return false;
      }
    } else if (!triggers.dms) {
      return false;
    }
    return campaign.keywords.some((k) => matchesKeyword(text, k, campaign.match));
  });
}
