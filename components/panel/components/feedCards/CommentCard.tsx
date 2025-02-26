import { memo } from "react";
import { formatText, isSameAddress } from "../../../../utils/utils";
import { Tag, Type } from "../../../apis/rss3/types";
import { NFTAssetPlayer } from "../../../shared/NFTAssetPlayer";

export function isCommentFeed(feed) {
  return feed.tag === Tag.Social && feed.type === Type.Comment;
}

const RenderCommentFeed = (props) => {
  const { feed, owner,name } = props;
  const action = feed.actions[0];
  const metadata = action.metadata;
  const user = owner;
  const commentTarget = metadata?.targetuseAddressLabel;

  const isOwner = isSameAddress(user, feed.owner);
  return (
    <div className="feed-item-box">
      <div className="feed-type-badge"></div>
      <div className="feed-item">
        <div className="feed-item-header">
          <div className="feed-type-intro">
            <div className="strong">
              {isOwner
                ? name || formatText(owner)
                : formatText(user ?? "")}
            </div>
            made a comment on
            <div className="strong">{action.platform || "unknown"}</div>
          </div>
        </div>
        <div>{metadata?.body}</div>

        {commentTarget && (
          <div className={"feed-item-main"}>
            <NFTAssetPlayer
              className="feed-nft-img"
              src={commentTarget.media[0].address}
            />
            <picture></picture>
            <div className="feed-nft-info">{commentTarget?.body}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CommentCard = memo(RenderCommentFeed);
