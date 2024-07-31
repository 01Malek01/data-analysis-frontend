import { Auth0Provider, AppState } from "@auth0/auth0-react";
import React from "react";

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0RedirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
const auth0Audience = import.meta.env.VITE_AUTH0_AUDIENCE;
function Auth0Wrapper({ children }: { children: React.ReactNode }) {

  const onRedirectCallback = (appState?: AppState) => {
    window.location.href = appState?.returnTo || "/auth-callback";
  };
  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: auth0RedirectUri,
        audience: auth0Audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0Wrapper;
