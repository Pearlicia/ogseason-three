/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
    $owner: String
  ) {
    onCreateRestaurant(filter: $filter, owner: $owner) {
      id
      name
      description
      city
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
    $owner: String
  ) {
    onUpdateRestaurant(filter: $filter, owner: $owner) {
      id
      name
      description
      city
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
    $owner: String
  ) {
    onDeleteRestaurant(filter: $filter, owner: $owner) {
      id
      name
      description
      city
      owner
      createdAt
      updatedAt
    }
  }
`;
