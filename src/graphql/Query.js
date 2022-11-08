import {gql} from '@apollo/client'

export const FILTER_MARKERS = gql`
  query filterMarkersByValue(
    $bedroom: Int,
    $bathdroom: Int,
    $title: String,
    $businessTypesId: [Int],
   $priceRange:  [Int]) 
  {
    filterMarkers(
    bedroom: $bedroom,
    bathdroom: $bathdroom,
    title: $title,
    businessTypesId: $businessTypesId,
    priceRange:$priceRange)
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

// export const FILTER_MARKERS = gql`
//   query filterMarkersByValue(
//     $bedroom: Int,
//     $bathdroom: Int,
//     $title: String,
//     $business_types_id: [Int],
//    $priceRange:  [Int]) 
//   {
//     filterMarkers(
//    bedroom: $bedroom,
//     bathdroom: $bathdroom,
//     title: $title,
//     business_types_id: $business_types_id,
//     priceRange:$priceRange)
//     {
//       id
//       user_id 
//       {
//         id
//         name
//       }
//       title
//       description
//      bedroom
//       bathdroom
//       price
//       lat
//       business_types_id 
//       {
//         id
//         name
//       }
//       long
//       status
//       owner_id 
//       {
//         id
//         name
//       }
//     }
//   }
// `

export const GET_MARKER = gql`
query markerById($id: ID!) 
{
  marker(id: $id)
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
    images{
      id
      src_img
    }
  }
}
`



export const GET_USERS= gql`
query 
{
  users
  {
    id
    name
    rol   
    email
    img_user 
  }
}
`


export const CHANGE_ROL = gql`
  query changeRolMutation($id:ID!,$rol:String!) {
   changeRol(
        id:$id,
        rol:$rol, 
     )  
  }
`;
