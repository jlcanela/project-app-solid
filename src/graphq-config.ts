const graphQLConfig = {
    url: import.meta.env.VITE_GRAPHQL_URL,
    requestHeaders: {
      'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET
    }
  };
  
  export default graphQLConfig;