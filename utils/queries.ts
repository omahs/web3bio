import { gql } from "@apollo/client";

export const GET_PROFILES_ENS = gql`
  query ($ens: String) {
    nft(chain: "ethereum", category: "ENS", id: $ens) {
      owner {
        uuid
        platform
        identity
        displayName
        nft {
          uuid
          category
          chain
          id
        }
        neighbor(depth: 5) {
          sources
          identity {
            uuid
            platform
            identity
            displayName
            nft {
              uuid
              category
              chain
              id
            }
          }
        }
      }
    }
  }
`;

export const GET_PROFILES_QUERY = gql`
  query ($platform: String, $identity: String) {
    identity(platform: $platform, identity: $identity) {
      uuid
      platform
      identity
      displayName
      nft {
        uuid
        category
        chain
        id
      }
      neighbor(depth: 5) {
        sources
        identity {
          uuid
          platform
          identity
          displayName
          nft {
            uuid
            category
            chain
            id
          }
        }
      }
    }
  }
`;

export const GET_IDENTITY_GRAPH_DATA = gql`
  query findOneIdentity($platform: String, $identity: String) {
    identity(platform: $platform, identity: $identity) {
      status
      uuid
      displayName
      createdAt
      addedAt
      updatedAt
      neighborWithTraversal(depth: 3) {
        source
        from {
          uuid
          platform
          identity
          displayName
        }
        to {
          uuid
          platform
          identity
          displayName
        }
      }
    }
  }
`;

export const GET_IDENTITY_GRAPH_DATA_ENS = gql`
  query findOneNFTWithOwnerNeighbor($ens: String) {
    nft(chain: "ethereum", category: "ENS", id: $ens) {
      owner {
        platform
        identity
        nft {
          category
          chain
          id
        }
        neighborWithTraversal(depth: 3) {
          source
          from {
            platform
            identity
            uuid
          }
          to {
            platform
            identity
            uuid
          }
        }
      }
    }
  }
`;
