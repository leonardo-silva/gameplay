import React, 
{ 
    createContext,
    useContext,
    useState,
    ReactNode 
} from "react";

import * as AuthSession from 'expo-auth-session';

const { SCOPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;

import { api } from "../services/api";

import { strings } from '../global/strings/strings';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    loading: boolean;
    signIn: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);
    // Just to test the user data (context) being passed 
    /*
    const [user, setUser] = useState<User>({
        id: '1',
        username: 'Leonardo',
        firstName: 'Leonardo',
        avatar: 'Leonardo',
        email: 'Leonardo',
        token: 'Leonardo'
    } as User);
    */

    async function signIn() {
        try {
            setLoading(true);

            //const authUrl = 'https://discord.com/api/oauth2/authorize?client_id=858841667041624069&redirect_uri=https%3A%2F%2Fauth.expo.io%2Fgameplay&response_type=code&scope=guilds%20connections%20email%20identify'
            // 'Crase' to embed formulas 
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
            //console.log(authUrl);
            
            const { type, params } = await AuthSession
                .startAsync({ authUrl }) as AuthorizationResponse;
            //const response = await AuthSession.startAsync({ authUrl });
            //console.log(response);

            if (type === "success" && !params.error) {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');
                //console.log(userInfo);

                const firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                // We set first name, token, and the rest (see type User) come from ...userInfo.data
                setUser({
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                });
            }
        } catch {
            throw new Error(strings.authError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn
          }}>
            { children }
        </AuthContext.Provider>      
    )
}

// This is a hook!
function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
}