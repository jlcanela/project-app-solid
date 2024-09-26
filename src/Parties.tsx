import {
    QueryClient,
    QueryClientProvider,
    createQuery,
  } from '@tanstack/solid-query'
import { graphql,/*  PartiesDocument, PartiesQuery */ } from './gql';

export const a = 1;

import { request } from 'graphql-request';
import { For, Index, Match, Suspense, Switch } from 'solid-js';
import graphQLConfig from './graphq-config'
import { PartiesQuery } from './gql/graphql';
const PartiesDocument = graphql(`query Parties {
    identity_parties {
      party_id
      name
    }
  }`);
console.log(PartiesDocument);
const fetchParties = async () => {
    const endpoint = 'http://localhost:8080/v1/graphql';
    return request<PartiesQuery>(endpoint, PartiesDocument, {}, graphQLConfig.requestHeaders);
  };

  const PartiesTable = () => {
  
    const query = createQuery(() => ({
        queryKey: ['parties'],
        queryFn: fetchParties,
      }))

    return (

      <table>
        <thead>
          <tr>
            <th>Party ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
            <Switch>
            <Match when={query.isLoading}>Loading ...</Match>
            <Match when={query.isError}>Error: {query?.error?.message}</Match>
            <Match when={query.isSuccess}>
                <For each={query?.data?.identity_parties}>
                 {(party) => (
                     <tr>
                    <td>{party.party_id}</td>
                    <td>{party.name}</td>
                </tr>
                )} 
                </For>
                </Match>
                </Switch>
        </tbody>
      </table>
    
    );
  };
  
export default PartiesTable;
  
