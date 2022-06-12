import React, 
{ 
    createContext,
    useContext,
    useState,
    ReactNode, 
    useEffect
} from "react";

import * as AuthSession from 'expo-auth-session';

const { SCOPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;

import { api } from "../services/api";

import { strings } from '../global/strings/strings';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_USERS } from "../configs/database";

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
    signOut: () => Promise<void>;
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
                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                }

                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
                setUser(userData);
            }
        } catch {
            throw new Error(strings.authError);
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USERS);
    }

    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USERS);

        if (storage) {
            const loggedUser = JSON.parse(storage) as User;
            api.defaults.headers.authorization = `Bearer ${loggedUser.token}`;

            setUser(loggedUser);
        }
    }

    useEffect(() => {
        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            signOut,
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