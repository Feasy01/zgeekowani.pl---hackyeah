/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWallet = /* GraphQL */ `
  subscription OnCreateWallet($filter: ModelSubscriptionWalletFilterInput) {
    onCreateWallet(filter: $filter) {
      id
      name
      ratings {
        nextToken
        __typename
      }
      ratings_mean
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateWallet = /* GraphQL */ `
  subscription OnUpdateWallet($filter: ModelSubscriptionWalletFilterInput) {
    onUpdateWallet(filter: $filter) {
      id
      name
      ratings {
        nextToken
        __typename
      }
      ratings_mean
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteWallet = /* GraphQL */ `
  subscription OnDeleteWallet($filter: ModelSubscriptionWalletFilterInput) {
    onDeleteWallet(filter: $filter) {
      id
      name
      ratings {
        nextToken
        __typename
      }
      ratings_mean
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateRating = /* GraphQL */ `
  subscription OnCreateRating($filter: ModelSubscriptionRatingFilterInput) {
    onCreateRating(filter: $filter) {
      id
      walletId
      value
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateRating = /* GraphQL */ `
  subscription OnUpdateRating($filter: ModelSubscriptionRatingFilterInput) {
    onUpdateRating(filter: $filter) {
      id
      walletId
      value
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteRating = /* GraphQL */ `
  subscription OnDeleteRating($filter: ModelSubscriptionRatingFilterInput) {
    onDeleteRating(filter: $filter) {
      id
      walletId
      value
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
