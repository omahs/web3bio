import { gql } from '@apollo/client'

export const GET_PROFILES_ENS = gql`
  query($ens: String) {
    nft(chain: "ethereum", category: "ENS", id: $ens) {
      owner {
        uuid
        platform
        identity
        displayName
        nft {
          category
          chain
          id
          updatedAt
        }
        neighbor(depth: 3) {
          uuid
          platform
          identity
          displayName
        }
      }
    }
  }
`;

export const GET_PROFILES_ETH = gql`
  query($eth: String) {
    identity(platform: "ethereum", identity: $eth) {
      uuid
      platform
      identity
      displayName
      nft {
        uuid
        category
        chain
        id
        updatedAt
      }
      neighbor(depth: 3) {
        uuid
        platform
        identity
        displayName
      }
    }
  }
`;

export const GET_PROFILES_TWITTER = gql`
  query($twitter: String) {
    identity(platform: "twitter", identity: $twitter) {
      uuid
      platform
      identity
      displayName
      neighbor(depth: 2) {
        uuid
        platform
        identity
        displayName
        nft {
          uuid
          category
          chain
          id
          updatedAt
        }
      }
    }
  }
`;

export const GET_PROFILES_NEXT = gql`
  query($nextid: String) {
    identity(platform: "nextid", identity: $nextid) {
      uuid
      platform
      identity
      displayName
      neighbor(depth: 3) {
        uuid
        platform
        identity
        displayName
        nft {
          uuid
          category
          chain
          id
          updatedAt
        }
      }
    }
  }
`;