type SocialPlatform = {
  key: string;
  color?: string;
  icon?: string;
  label: string;
  urlPrefix?: string;
  ensText?: string[];
  dotbitText?: string[];
};

export enum PlatformType {
  ens = "ENS",
  dotbit = "dotbit",
  lens = "lens",
  ethereum = "ethereum",
  twitter = "twitter",
  nextid = "nextid",
  keybase = "keybase",
  reddit = "reddit",
  github = "github",
  unstoppableDomains = "unstoppabledomains",
  farcaster = "farcaster",
  space_id = "space_id",
  telegram = "telegram",
  instagram = "instagram",
  rss3 = "rss3",
  cyberconnect = "cyberconnect",
  opensea = "opensea",
  sybil = "sybil",
  discord = "discord",
  url = "url",
  website = "website",
  linkedin = "linkedin",
  dns = "dns",
  lenster = "lenster",
  facebook = "facebook",
  weibo = "weibo",
  youtube = "youtube",
  tiktok = "tiktok",
  bilibili = "bilibili",
  medium = "medium",
  mirror = "mirror",
  jike = "jike",
  dribbble = "dribbble",
  nostr = "nostr",
  poap = "poap",
  knn3 = "knn3",
  ethLeaderboard = "ethLeaderboard",
  the_graph = "the_graph",
  rpc_server = "rpc_server",
  twitter_hexagon = "twitter_hexagon",
  uniswap = "uniswap",
}

export const platfomData: { [key in PlatformType]: SocialPlatform } = {
  [PlatformType.twitter]: {
    key: PlatformType.twitter,
    color: "#4A99E9",
    icon: "icons/icon-twitter.svg",
    label: "Twitter",
    urlPrefix: "https://twitter.com/",
    ensText: ["com.twitter", "vnd.twitter"],
    dotbitText: ["profile.twitter"],
  },
  [PlatformType.ens]: {
    key: PlatformType.ens,
    color: "#5298FF",
    // TODO: add ens search icon here
    icon: "icons/icon-ethereum.svg",
    label: "ENS",
    urlPrefix: "https://app.ens.domains/search/",
    ensText: [],
  },
  [PlatformType.ethereum]: {
    key: PlatformType.ethereum,
    color: "#3c3c3d",
    icon: "icons/icon-ethereum.svg",
    label: "Ethereum",
    urlPrefix: "https://etherscan.io/address/",
    ensText: [],
  },
  [PlatformType.farcaster]: {
    key: PlatformType.farcaster,
    color: "#8a63d2",
    icon: "icons/icon-farcaster.svg",
    label: "Farcaster",
    urlPrefix: "https://warpcast.com/",
    ensText: [],
  },
  [PlatformType.github]: {
    key: PlatformType.github,
    color: "#000000",
    icon: "icons/icon-github.svg",
    label: "GitHub",
    urlPrefix: "https://github.com/",
    ensText: ["com.github", "vnd.github"],
    dotbitText: ["profile.github"],
  },
  [PlatformType.keybase]: {
    key: PlatformType.keybase,
    color: "#4162E2",
    icon: "icons/icon-keybase.svg",
    label: "Keybase",
    urlPrefix: "https://keybase.io/",
    ensText: ["io.keybase"],
  },
  [PlatformType.lens]: {
    key: PlatformType.lens,
    color: "#BDFC5A",
    icon: "icons/icon-lens.svg",
    label: "Lens",
    urlPrefix: "https://www.lensfrens.xyz/",
    ensText: [],
  },
  [PlatformType.nextid]: {
    key: PlatformType.nextid,
    color: "#121212",
    icon: "icons/icon-nextid.svg",
    label: "Next.ID",
    urlPrefix: "https://web3.bio",
    ensText: [],
    dotbitText: ["profile.nextid"],
  },
  [PlatformType.reddit]: {
    key: PlatformType.reddit,
    color: "#ff4500",
    icon: "icons/icon-reddit.svg",
    label: "Reddit",
    urlPrefix: "https://www.reddit.com/user/",
    ensText: ["com.reddit"],
    dotbitText: ["profile.reddit"],
  },
  [PlatformType.space_id]: {
    key: PlatformType.space_id,
    color: "#71EBAA",
    icon: "icons/icon-spaceid.svg",
    label: "SPACE ID",
    urlPrefix: "https://space.id/search?query=",
    ensText: [],
  },
  [PlatformType.unstoppableDomains]: {
    key: PlatformType.unstoppableDomains,
    color: "#2E65F5",
    icon: "icons/icon-unstoppabledomains.svg",
    label: "Unstoppable Domains",
    ensText: [],
    urlPrefix: "https://unstoppabledomains.com/search?searchTerm=",
  },
  [PlatformType.telegram]: {
    key: PlatformType.telegram,
    color: "#0088cc",
    icon: "icons/icon-telegram.svg",
    label: "Telegram",
    ensText: ["org.telegram", "vnd.telegram", "VND.TELEGRAM"],
    dotbitText: ["profile.telegram"],
    urlPrefix: "https://t.me/",
  },
  [PlatformType.instagram]: {
    key: PlatformType.instagram,
    color: "#EA3377",
    icon: "icons/icon-instagram.svg",
    label: "Instagram",
    ensText: ["com.instagram"],
    dotbitText: ["profile.instagram"],
    urlPrefix: "https://www.instagram.com/",
  },
  [PlatformType.weibo]: {
    key: PlatformType.instagram,
    icon: "",
    label: "Weibo",
    dotbitText: ["profile.weibo"],
    urlPrefix: "https://m.weibo.cn/",
  },
  [PlatformType.dotbit]: {
    key: PlatformType.dotbit,
    color: "#0e7dff",
    icon: "icons/icon-dotbit.svg",
    label: ".bit",
    urlPrefix: "https://data.did.id/",
  },
  [PlatformType.rss3]: {
    key: PlatformType.rss3,
    color: "#3070F6",
    label: "RSS3",
    ensText: [],
    urlPrefix: "https://rss3.io/",
  },
  [PlatformType.cyberconnect]: {
    key: PlatformType.cyberconnect,
    color: "#000000",
    icon: "icons/icon-cyberconnect.svg",
    label: "CyberConnect",
    ensText: [],
  },
  [PlatformType.opensea]: {
    key: PlatformType.opensea,
    color: "#407FDB",
    icon: "icons/social-opensea.svg",
    label: "OpenSea",
    ensText: [],
    urlPrefix: "https://opensea.io/",
  },
  [PlatformType.sybil]: {
    key: PlatformType.sybil,
    color: "#4125E1",
    icon: "icons/icon-sybil.svg",
    label: "Sybil",
    ensText: [],
    urlPrefix: "https://sybil.org/",
  },
  [PlatformType.discord]: {
    key: PlatformType.discord,
    color: "#5865f2",
    icon: "icons/icon-discord.svg",
    label: "Discord",
    ensText: ["com.discord"],
    dotbitText: ["profile.discord"],
  },
  [PlatformType.url]: {
    key: PlatformType.url,
    icon: "icons/icon-web.svg",
    color: "#121212",
    label: "Website",
    ensText: [],
  },
  [PlatformType.website]: {
    key: PlatformType.website,
    icon: "icons/icon-web.svg",
    color: "#121212",
    label: "Website",
    ensText: ["url"],
    dotbitText: ["profile.website"],
  },
  [PlatformType.linkedin]: {
    key: PlatformType.linkedin,
    color: "#195DB4",
    label: "LinkedIn",
    icon: "icons/icon-linkedin.svg",
    ensText: ["com.linkedin"],
    urlPrefix: "https://www.linkedin.com/in/",
    dotbitText: ["profile.linkedin"],
  },
  [PlatformType.dns]: {
    key: PlatformType.dns,
    icon: "icons/icon-web.svg",
    label: "DNS",
  },
  [PlatformType.lenster]: {
    key: PlatformType.lenster,
    icon: "icons/icon-lenster.svg",
    color: "#845EEE",
    label: "Lenster",
    urlPrefix: "https://lenster.xyz/u/",
  },
  [PlatformType.facebook]: {
    key: PlatformType.facebook,
    icon: "icons/social-facebook.svg",
    label: "Facebook",
    urlPrefix: "https://www.facebook.com/",
    dotbitText: ["profile.facebook"],
  },
  [PlatformType.youtube]: {
    key: PlatformType.youtube,
    icon: "",
    label: "Youtube",
    urlPrefix: "https://www.youtube.com/",
    dotbitText: ["profile.youtube"],
  },
  [PlatformType.tiktok]: {
    key: PlatformType.tiktok,
    icon: "",
    label: "TikTok",
    urlPrefix: "https://www.tiktok.com/",
    dotbitText: ["profile.tiktok"],
  },
  [PlatformType.bilibili]: {
    key: PlatformType.bilibili,
    icon: "",
    label: "Bilibili",
    urlPrefix: "https://www.bilibili.com/",
    dotbitText: ["profile.bilibili"],
  },
  [PlatformType.medium]: {
    key: PlatformType.medium,
    icon: "icons/social-medium.svg",
    label: "Medium",
    urlPrefix: "https://medium.com/",
    dotbitText: ["profile.medium"],
  },
  [PlatformType.mirror]: {
    key: PlatformType.mirror,
    icon: "",
    label: "Mirror",
    urlPrefix: "https://mirror.xyz/",
    dotbitText: ["profile.mirror"],
  },
  [PlatformType.jike]: {
    key: PlatformType.jike,
    icon: "",
    label: "Jike",
    urlPrefix: "https://web.okjike.com/",
    dotbitText: ["profile.jike"],
  },
  [PlatformType.dribbble]: {
    key: PlatformType.dribbble,
    icon: "",
    label: "Dribbble",
    urlPrefix: "https://dribbble.com/search/",
    dotbitText: ["profile.dribbble"],
  },
  [PlatformType.nostr]: {
    key: PlatformType.nostr,
    icon: "",
    label: "Nostr",
    urlPrefix: "https://app.coracle.social/",
    dotbitText: ["profile.nostr"],
  },
  [PlatformType.poap]: {
    key: PlatformType.poap,
    icon: "icons/icon-poap.svg",
    color: "#463E68",
    label: "POAP",
    urlPrefix: "https://app.poap.xyz/scan/",
  },
  [PlatformType.knn3]: {
    key: PlatformType.knn3,
    icon: "",
    color: "",
    label: "KNN3",
    urlPrefix: "https://www.knn3.xyz/",
  },
  [PlatformType.ethLeaderboard]: {
    key: PlatformType.ethLeaderboard,
    icon: "",
    color: "",
    label: ".eth LeaderBoard",
    urlPrefix: "https://ethleaderboard.xyz/",
  },

  [PlatformType.the_graph]: {
    key: PlatformType.the_graph,
    icon: "",
    color: "",
    label: "The Graph",
    urlPrefix: "https://thegraph.com/",
  },
  [PlatformType.rpc_server]: {
    key: PlatformType.rpc_server,
    icon: "",
    color: "",
    label: "RPC Server",
    urlPrefix: "",
  },
  [PlatformType.twitter_hexagon]: {
    key: PlatformType.twitter_hexagon,
    icon: "",
    color: "",
    label: "Twitter Hexagon",
    urlPrefix: "https://twitter.com/",
  },
  [PlatformType.uniswap]: {
    key: PlatformType.uniswap,
    icon: "",
    color: "",
    label: "Uniswap",
    urlPrefix: "https://uniswap.org/",
  },
};

export const SocialPlatformMapping = (platform: PlatformType) => {
  return (
    platfomData[platform] ?? {
      key: platform,
      color: "",
      icon: "",
      label: platform,
      ensText: [],
    }
  );
};

const resolveSocialMediaLink = (name: string, type: PlatformType) => {
  if (!Object.keys(PlatformType).includes(type))
    return `https://web3.bio/?s=${name}`;
  switch (type) {
    case PlatformType.url:
      return `${name}`;
    case PlatformType.website:
      return `https://${name}`;
    default:
      return SocialPlatformMapping(type).urlPrefix
        ? SocialPlatformMapping(type).urlPrefix + name
        : "";
  }
};

export const getSocialMediaLink = (url: string, type: PlatformType) => {
  let resolvedURL = "";
  if (!url) return null;
  if (url.startsWith("https")) {
    resolvedURL = url;
  } else {
    resolvedURL = resolveSocialMediaLink(url, type);
  }

  return resolvedURL;
};
