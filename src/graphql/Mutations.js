import { gql } from '@apollo/client'

export const AUTH_LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const AUTH_LOGIN_GOOGLE = gql`
mutation LoginGooglenMutation($name: String!, $email: String!, $img_user_email: String!) {
  loginGoogle(name: $name, email: $email, img_user_email: $img_user_email)
  }
`

export const AUTH_REGISTER = gql`
  mutation RegisterMutation($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name)
  }
`
export const DELETE_IMG = gql`
mutation DeleteImgMutation($id: ID!) {
  deleteImage(id: $id){
    id
  }
}
`




export const BUY_MARKER = gql`
  mutation BuyMakerMutation($id: ID!, $status: Boolean!, $owner_id: Int!) {
    buyMarker(id: $id, status: $status, owner_id: $owner_id) {
      id
      status
      owner_id {
        id
      }
    }
  }
`
/* */
export const CREATE_MARKER = gql`
  mutation CreateMakerMutation(
    $title: String!
    $description: String!
    $bedroom: Int!
    $bathdroom: Int!
    $price: Float!
    $lat: String!
    $business_types_id: Int!
    $long: String!
    $images: [Upload!]
  ) {
    createMarker(
      title: $title
      description: $description
     bedroom: $bedroom
      bathdroom: $bathdroom
      price:$price
      lat: $lat
      long: $long
      business_types_id: $business_types_id
      images: $images
    ) 
    {
      id
      user_id 
      {
        id
        name
      }
      title
      description
     bedroom
      bathdroom
      price
      lat
      business_types_id 
      {
        id
        name
      }
      long
      status
      owner_id 
      {
        id
        name
      }
    }
  }
`
/* 
export const CREATE_MARKER = gql`
  mutation CreateMakerMutation(
     $inputMarker: InputMarker
  ) {
    createMarker(
      input :$inputMarker
    ) 
    {
      id
      user_id 
      {
        id
        name
      }
      title
      description
     bedroom
      bathdroom
      price
      lat
      business_types_id 
      {
        id
        name
      }
      long
      status
      owner_id 
      {
        id
        name
      }
    }
  }
`
/* */

export const EDIT_MARKER = gql`
  mutation editMakerMutation(
      $id:Int!
      $title: String!
      $description: String!
      $bedroom: Int!
      $bathdroom: Int!
     $price: Float!
      $lat: String!
      $long: String!   
      $business_types_id: Int! 
    $images: [Upload!]
  ) {
    editMarker(
      id:$id
      title: $title
      description: $description
     bedroom: $bedroom
      bathdroom: $bathdroom
      price:$price
      lat: $lat
      long: $long
      business_types_id: $business_types_id  
      images: $images
    ) {
      id
    user_id 
    {
      id
      name
    }
    title
    description
   bedroom
    bathdroom
    price
    lat
    business_types_id 
    {
      id
      name
    }
    long
    status
    owner_id 
    {
      id
      name
    }
    images{
      id
      src_img
    }
    }
  }
`

export const EDIT_USER = gql`
  mutation editUserMutation(
    $id: Int!,
    $name: String!,
    $email: String!,
    $password: String,
    $img_user: [Upload!]
  ) {
    editUser(
      id: $id,
      name: $name,
      email: $email,
      password: $password,
      img_user: $img_user
    ) {
      id
      name
      email
      password
      img_user
    }
  }
`

