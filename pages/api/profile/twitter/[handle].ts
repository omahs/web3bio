import type { NextApiRequest, NextApiResponse } from "next";
import _ from "underscore";
import { SocialPlatformMapping } from "../../../../utils/platform";
import {
  firstParam,
  getSocialMediaLink,
  resolveHandle,
} from "../../../../utils/utils";
import { HandleResponseData } from "../ens/types";

const originBase =
  "https://mr8asf7i4h.execute-api.us-east-1.amazonaws.com/prod/";

const FetchFromOrigin = async (value: string) => {
  if (!value) return;
  const res = await fetch(
    originBase + `twitter-identity?screenName=${value}`
  ).then((res) => res.json());
  return res;
};

const transformImageURLSize = (url: string, size: string = "400x400") => {
  if (!url) return null;
  return url.replaceAll("_normal.", `_${size}.`);
};
const resolveTwitterHandle = async (
  handle: string,
  res: NextApiResponse<HandleResponseData>
) => {
  try {
    const response = await FetchFromOrigin(handle);
    const urlHandle = resolveHandle(
      response.entities.url
        ? response.entities.url.urls[0].expanded_url
        : response.url || null
    );
    const resolvedHandle = resolveHandle(handle);
    const LINKRES = {
      [SocialPlatformMapping.twitter.key]: {
        link: "https://twitter.com/" + resolvedHandle,
        handle: resolvedHandle,
      },
    };
    if (urlHandle) {
      LINKRES[SocialPlatformMapping.website.key] = {
        link: getSocialMediaLink(urlHandle, SocialPlatformMapping.website.key),
        handle: urlHandle,
      };
    }
    const resJSON = {
      owner: resolvedHandle,
      identity: resolvedHandle,
      displayName: response.name || resolvedHandle,
      avatar: transformImageURLSize(
        response.profile_image_url_https || response.profile_image_url || null,
        "400x400"
      ),
      email: null,
      description: response.description,
      location: response.location,
      header: response.profile_banner_url,
      notice: null,
      keywords: null,
      links: LINKRES,
      addresses: null,
    };
    res
      .status(200)
      .setHeader(
        "CDN-Cache-Control",
        `s-maxage=${60 * 60 * 24}, stale-while-revalidate`
      )
      .json(resJSON);
  } catch (e: any) {
    res.status(500).json({
      owner: handle,
      identity: handle,
      displayName: handle,
      avatar: null,
      email: null,
      description: null,
      location: null,
      header: null,
      notice: null,
      keywords: null,
      links: {
        twitter: {
          link: "https://twitter.com/" + handle,
          handle,
        },
      },
      addresses: null,
      error: e.message,
    });
  }
};
const resolve = (from: string, to: string) => {
  const resolvedUrl = new URL(to, new URL(from, "resolve://"));
  if (resolvedUrl.protocol === "resolve:") {
    const { pathname, search, hash } = resolvedUrl;
    return `${pathname}${search}${hash}`;
  }
  return resolvedUrl.toString();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqValue = firstParam(req.query.handle);
  if (!reqValue) {
    return res.redirect(307, resolve(req.url!, reqValue));
  }
  return resolveTwitterHandle(reqValue, res);
}