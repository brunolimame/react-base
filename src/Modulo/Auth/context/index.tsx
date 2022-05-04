import { createContext, ReactNode, useState } from "react";

type AuthContextProps = {
  children: ReactNode;
};

export type AuthTokenPayload = {
  uuid: string;
  nivel: string;
  nome: string;
  foto: string;
};

export type AuthContextType = {
  token: string | null;
  refreshToken: string | null;
  usuario: AuthTokenPayload | null;
  tokenValido: boolean;
  refreshTokenValido: boolean;
  logar: (usuario: string, senha: string) => boolean;
  logout: () => boolean;
  isValidToken: () => boolean;
  isValidRefresh: () => boolean;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [tokenValido, setTokenValido] = useState(false);
  const [refreshTokenValido, setRefreshTokenValido] = useState(false);

  const logar = (usuario: string, senha: string): boolean => {
    console.log(usuario,senha);
    return true;
  };
  
  const logout = (): boolean => {
    return false;
  };
  
  const isValidToken = (): boolean => {
    return false;
  };
  
  const isValidRefresh = (): boolean => {
    return false;
  };


  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        refreshToken,
        tokenValido,
        refreshTokenValido,
        logar,
        logout,
        isValidToken,
        isValidRefresh
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
