import { ENSFetcher, ENS_METADATA_END_POINT } from "../components/apis/ens";
import {
  NFTSCANFetcher,
  NFTSCAN_BASE_API_ENDPOINT,
  NFTSCAN_POLYGON_BASE_API
} from "../components/apis/nftscan";
import { POAPFetcher, POAP_END_POINT } from "../components/apis/poap";
import client from "./apollo";
import { GET_PROFILE_LENS } from "./lens";
import { GET_PROFILES_DOMAIN, GET_PROFILES_QUERY } from "./queries";
import { PlatformType } from "./type";
import { isDomainSearch } from "./utils";

export const identityProvider = async (platform: string, name: string) => {
  const lensSearchParams = {
    query: GET_PROFILE_LENS,
    variables: {
      handle: name,
    },
    context: {
      uri: process.env.NEXT_PUBLIC_LENS_GRAPHQL_SERVER,
    },
  };
  const domainSearchParams = {
    query: isDomainSearch(platform) ? GET_PROFILES_DOMAIN : GET_PROFILES_QUERY,
    variables: {
      platform: platform,
      identity: name,
    },
  };

  const res = await client.query(
    platform === PlatformType.lens
      ? (lensSearchParams as any)
      : domainSearchParams
  );
  return res.data;
};

export const poapsProvider = async (address: string) => {
  const res = await POAPFetcher(`${POAP_END_POINT}${address}`);
  return res;
};

export const nftCollectionProvider = async (
  address: string,
  network: string = "ENS"
) => {
  try {
    const baseURL =
      network === PlatformType.lens
        ? NFTSCAN_POLYGON_BASE_API
        : NFTSCAN_BASE_API_ENDPOINT;
    const res = await NFTSCANFetcher(
      baseURL + `account/own/all/${address}?erc_type=erc721`
    );
    return res ? res.data : [];
  } catch (e) {
    return [];
  }
};

export const profileProvider = async (name: string) => {
  try {
    const res = await ENSFetcher(ENS_METADATA_END_POINT + `/${name}/meta`);
    console.log(res,'response')
    return res;
  } catch (e) {
    console.error(e);
    return {};
  }
};