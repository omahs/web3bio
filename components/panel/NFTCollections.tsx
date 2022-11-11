import { memo, useEffect, useState } from "react";
import useSWR from "swr";
import { NFTSCANFetcher, NFTSCAN_BASE_API_ENDPOINT } from "../apis/nftscan";
import { CollectionSwitcher } from "./CollectionSwitcher";
import { resolveIPFS_URL } from "../../utils/ipfs";
import { Loading } from "../shared/Loading";
import { Empty } from "../shared/Empty";
import { Error } from "../shared/Error";
import { NFTAssetPlayer } from "../shared/NFTAssetPlayer";

function useCollections(address: string) {
  const { data, error } = useSWR<any>(
    NFTSCAN_BASE_API_ENDPOINT + `account/own/all/${address}?erc_type=erc721`,
    NFTSCANFetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

const RenderNFTCollections = (props) => {
  const { onShowDetail, identity } = props;
  const [collections, setCollections] = useState([]);
  const [anchorName, setAnchorName] = useState("");
  const { data, isLoading, isError } = useCollections(identity.identity);
  const [activeCollection, setActiveCollection] = useState(null);

  useEffect(() => {
    if (data && data.data) {
      setCollections(
        data.data.map((x) => ({
          key: x.contract_address,
          name: x.contract_name,
          url: x.logo_url,
        }))
      );
      if (anchorName) {
        const anchorElement = document.getElementById(anchorName);
        if (anchorElement) {
          anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
        }
      }
    }
  }, [data, anchorName]);
  if (isLoading) return <Loading />;
  if (isError) return <Error text={isError} />;
  if (!data || !data.data) return <Empty />;
  return (
    <div className="nft-collection-container">
      {collections && collections.length && (
        <div style={{ marginLeft: 30 }}>
          <CollectionSwitcher
            collections={collections}
            currentSelect={activeCollection ?? collections[0]}
            onSelect={(v) => {
              setActiveCollection(v);
              setAnchorName(v.key);
            }}
          />
        </div>
      )}

      <div className="nft-collection-list">
        {data.data.map((x, idx) => {
          console.log(x, "collection");
          return (
            <div className="collection-item" key={idx} id={x.contract_address}>
              <div className="nft-collection-title-box">
                <NFTAssetPlayer
                  type={"image/png"}
                  className="collection-logo"
                  src={x.logo_url}
                />
                <div className="nft-collection-title"> {x.contract_name}</div>
              </div>
              <div className="nft-item-coantiner">
                {x.assets.map((y, ydx) => {
                  const mediaURL =
                    y.content_type === "video/mp4"
                      ? resolveIPFS_URL(y.content_uri ?? y.image_uri)
                      : resolveIPFS_URL(y.image_uri ?? y.content_uri);
                  return (
                    <div
                      key={ydx}
                      className="detail-item"
                      onClick={() =>
                        onShowDetail({
                          collection: {
                            url: x.logo_url,
                            name: x.contract_name,
                          },
                          asset: y,
                          mediaURL: mediaURL,
                        })
                      }
                    >
                      <NFTAssetPlayer
                        className={"img-container"}
                        type={y.content_type ?? "image/png"}
                        src={mediaURL}
                      />
                      <div className="collection-name">{x.contract_name}</div>
                      <div className="nft-name">{y.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const NFTCollections = memo(RenderNFTCollections);
