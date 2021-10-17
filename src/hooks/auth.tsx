import React, 
{ 
    createContext,
    useContext,
    useState,
    ReactNode 
} from "react";

import * as AuthSession from 'expo-auth-session';

import {
    SCOPE,
    CLIENT_ID,
    CDN_IMAGE,
    REDIRECT_URI,
    RESPONSE_TYPE
} from '../configs';
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
    signIn: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
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
            
            //await AuthSession.startAsync({ authUrl });
            const response = await AuthSession.startAsync({ authUrl });
            console.log(response);

        } catch {
            throw new Error(strings.authError);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
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