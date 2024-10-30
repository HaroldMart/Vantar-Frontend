'use client'

import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

type AuthTokens = {
    token: string;
    refresh_token: string;
};

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

const AuthContext = createContext<{
    login: (authTokens: AuthTokens) => void;
    logout: () => void;
    isLoggedIn: boolean;
    authTokens: AuthTokens | null;
}>({
    login: () => { },
    logout: () => { },
    isLoggedIn: false,
    authTokens: null,
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const authTokensInLocalStorage = typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_TOKENS_KEY)
        : null;
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(
        authTokensInLocalStorage ? JSON.parse(authTokensInLocalStorage) : null
    );

    const login = useCallback((authTokens: AuthTokens) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(authTokens));
        }
        setAuthTokens(authTokens);
    }, []);

    const logout = useCallback(() => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem(AUTH_TOKENS_KEY);
        }
        setAuthTokens(null);
    }, []);

    const value = useMemo(
        () => ({
            login,
            logout,
            authTokens,
            isLoggedIn: authTokens !== null,
        }),
        [authTokens, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
    return useContext(AuthContext);
}