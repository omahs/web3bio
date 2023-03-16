import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import { IdentityPanel, TabsMap } from "../components/panel/IdentityPanel";
import { LensProfilePanel } from "../components/panel/LensProfilePanel";
import { Empty } from "../components/shared/Empty";
import { Error } from "../components/shared/Error";
import { Loading } from "../components/shared/Loading";
import {
  identityProvider,
  nftCollectionProvider,
  profileProvider
} from "../utils/dataProvider";
import { GET_PROFILE_LENS } from "../utils/lens";
import {
  GET_PROFILES_DOMAIN,
  GET_PROFILES_QUERY,
  resolveIdentity
} from "../utils/queries";
import { DOMAINS_TABLE_NAME, supabase } from "../utils/supabase";
import { PlatformType } from "../utils/type";
import { handleSearchPlatform, isDomainSearch } from "../utils/utils";

const RenderDomainPanel = (props) => {
  const {
    domain,
    asComponent,
    onClose,
    overridePlatform,
    onTabChange,
    overridePanelTab,
    toNFT,
    identity,
    prefetchingPoaps,
    prefetchingNFTs,
    prefetchingProfile,
  } = props;
  const router = useRouter();
  const [panelTab, setPanelTab] = useState(overridePanelTab);
  const [platform, setPlatform] = useState(overridePlatform || "ENS");
  const [nftDialogOpen, setNftDialogOpen] = useState(false);
  const profileContainer = useRef(null);

  const { loading, error, data } = useQuery(
    platform === PlatformType.lens
      ? GET_PROFILE_LENS
      : isDomainSearch(platform)
      ? GET_PROFILES_DOMAIN
      : GET_PROFILES_QUERY,
    platform === PlatformType.lens
      ? {
          variables: {
            handle: domain ? domain[0] : router.query.domain[0],
          },
          context: {
            uri: process.env.NEXT_PUBLIC_LENS_GRAPHQL_SERVER,
          },
          skip: identity ? true : false,
        }
      : {
          variables: {
            platform: platform,
            identity: domain ? domain[0] : router.query.domain[0],
          },
          skip: identity ? true : false,
        }
  );

  const _identity = (() => {
    if (!identity && !data) return null;
    const source = identity || data;
    if (platform === PlatformType.lens) return source.profile;
    if (isDomainSearch(platform)) {
      if (source.domain) return source.domain.owner;
    }
    return source.identity;
  })();

  useEffect(() => {
    if (asComponent) {
      setPlatform(handleSearchPlatform(domain[0]));
    } else {
      if (!router.isReady) return;
      if (!router.query.domain) return;
      const _domain = router.query.domain ?? domain;
      setPlatform(handleSearchPlatform(_domain[0]));
    }

    const clickEvent = (e) => {
      const dialog = document.getElementById("nft-dialog");
      if (dialog && nftDialogOpen && !dialog.contains(e.target)) {
        if (dialog) setNftDialogOpen(false);
      } else {
        if (profileContainer && !profileContainer.current.contains(e.target)) {
          if (!asComponent) return;
          onClose();
        }
      }
    };
    window.document.addEventListener("mousedown", clickEvent);
    return () => window.document.removeEventListener("mousedown", clickEvent);
  }, [
    panelTab,
    domain,
    router,
    asComponent,
    router.query.domain,
    nftDialogOpen,
    onClose,
  ]);
  const setPanelTabFromURL = () => {
    if (!window) return;
    const url = window.location.href;
    const paramsArr = url.split("/");
    const paramsTab = paramsArr[paramsArr.length - 1];
    if (Object.keys(TabsMap).includes(paramsTab)) {
      setPanelTab(paramsTab);
    } else {
      setPanelTab(TabsMap.profile.key);
    }
  };
  useEffect(() => {
    if (asComponent) return;
    window.history.pushState(
      {},
      "",
      `/${
        _identity.platform === PlatformType.lens
          ? _identity.identity
          : _identity.displayName || _identity.identity
      }${panelTab === TabsMap.profile.key ? "" : `/${panelTab}`}`
    );
    window.addEventListener("popstate", setPanelTabFromURL, false);
    return () =>
      window.removeEventListener("popstate", setPanelTabFromURL, false);
  }, [panelTab, _identity]);

  const EmptyRender = () => {
    return (
      <div className="identity-panel">
        <div className="panel-container">
          <Empty />
        </div>
      </div>
    );
  };

  return asComponent ? (
    <div className="web3bio-mask-cover">
      <div ref={profileContainer} className="profile-main">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error text={error} />
        ) : !_identity ? (
          <EmptyRender />
        ) : platform === PlatformType.lens ? (
          <LensProfilePanel
            collections={prefetchingNFTs}
            poaps={prefetchingPoaps}
            onClose={onClose}
            asComponent
            profile={_identity}
            curTab={panelTab}
            onTabChange={onTabChange}
            onShowNFTDialog={() => setNftDialogOpen(true)}
            onCloseNFTDialog={() => setNftDialogOpen(false)}
          ></LensProfilePanel>
        ) : (
          <IdentityPanel
            profile={prefetchingProfile}
            collections={prefetchingNFTs}
            poaps={prefetchingPoaps}
            onShowNFTDialog={() => setNftDialogOpen(true)}
            onCloseNFTDialog={() => setNftDialogOpen(false)}
            nftDialogOpen={nftDialogOpen}
            toNFT={toNFT}
            asComponent
            onClose={onClose}
            curTab={panelTab}
            onTabChange={onTabChange}
            identity={_identity}
          />
        )}
      </div>
    </div>
  ) : (
    <div className="web3bio-container">
      <div className="web3bio-cover flare"></div>
      <div ref={profileContainer} className="profile-main">
        {!_identity ? (
          <EmptyRender />
        ) : platform === PlatformType.lens ? (
          <LensProfilePanel
            collections={prefetchingNFTs}
            poaps={prefetchingPoaps}
            onTabChange={(v) => {
              setPanelTab(v);
            }}
            profile={_identity}
            nftDialogOpen={nftDialogOpen}
            onShowNFTDialog={() => setNftDialogOpen(true)}
            onCloseNFTDialog={() => setNftDialogOpen(false)}
          ></LensProfilePanel>
        ) : (
          <IdentityPanel
            profile={prefetchingProfile}
            collections={prefetchingNFTs}
            poaps={prefetchingPoaps}
            curTab={panelTab}
            toNFT={() => {
              setPanelTab(TabsMap.nfts.key);
            }}
            onTabChange={(v) => {
              setPanelTab(v);
            }}
            nftDialogOpen={nftDialogOpen}
            onShowNFTDialog={() => setNftDialogOpen(true)}
            onCloseNFTDialog={() => setNftDialogOpen(false)}
            identity={_identity}
          />
        )}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const { data: prefetching_domains } = await supabase
    .from(DOMAINS_TABLE_NAME)
    .select("name");
  const paths = (prefetching_domains || []).map((domain) => {
    return {
      params: { domain: [domain.name] },
    };
  });
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { domain } = params;
  const platform = handleSearchPlatform(domain[0]) || "ENS";
  let identity = null;
  let prefetchingNFTs = null;
  let prefetchingProfile = null;

  identity = await identityProvider(platform, domain[0]);
  const _resolved = resolveIdentity(identity, platform);

  if (identity && _resolved && _resolved.identity) {
    prefetchingNFTs =
      (await nftCollectionProvider(_resolved.identity, platform)) || [];
    prefetchingProfile = await profileProvider(
      _resolved.displayName || _resolved.identity
    );
  }

  try {
    // check the domain whether has a record in supabase, or insert in it
    const { data: prefetching_domains } = await supabase
      .from(DOMAINS_TABLE_NAME)
      .select("name");
    if (
      !prefetching_domains.map((x) => x.name).includes(domain) &&
      isDomainSearch(domain)
    ) {
      const { error } = await supabase.from(DOMAINS_TABLE_NAME).insert([
        {
          id: prefetching_domains.length,
          name: domain,
          created_at: Date.now().toLocaleString(),
        },
      ]);

      if (error) {
        console.log("insert unknown identifier failed");
      } else {
        console.log(
          `insert unknown identifier: ${domain} success! see supabase for more information`
        );
      }
    }

    return {
      props: {
        identity,
        domain,
        prefetchingPoaps: [],
        prefetchingNFTs,
        prefetchingProfile,
        overridePanelTab: domain.length > 1 ? domain[1] : TabsMap.profile.key,
        revalidate: 600,
      },
    };
  } catch (e) {
    return {
      props: {
        identity,
        domain,
        overridePlatform: platform,
        overridePanelTab: domain.length > 1 ? domain[1] : TabsMap.profile.key,
      },
      notFound: true,
    };
  }
}

export default memo(RenderDomainPanel);
