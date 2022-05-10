import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { Login } from "./../page/login";

type AuthContextProps = {
  children: ReactNode;
};

export type AuthTokenPayload = {
  type: string;
  iat: number;
  exp: number;
  uuid: string;
  nivel: string;
  nome: string;
  foto: string;
};

type AlertaErroUsuario = {
  _username: string|null;
  _password: string|null;
}

export type AuthContextType = {
  token: string | null;
  refreshToken: string | null;
  tokenValido: boolean;
  refreshTokenValido: boolean;
  logado: AuthTokenPayload | null;
  alertaError: string | null| AlertaErroUsuario;
  jaLogou: boolean;
  logar: (usuario: string, senha: string) => boolean;
  logout: () => boolean;
  isValidToken: (token: string | null) => boolean;
  isValidRefreshToken: (token: string | null) => boolean;
  limparMensagemErro: () => void
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const KeyTokenLocalStorage = "_token";
  const KeyRefreshTokenLocalStorage = "_refresh";
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [logado, setLogado] = useState<AuthTokenPayload>(null!);
  const [alertaError, setAlertaError] = useState(null);
  const [jaLogou, setJaLogou] = useState(false);
  const [tokenValido, setTokenValido] = useState<boolean>(false);
  const [refreshTokenValido, setRefreshTokenValido] = useState<boolean>(false);

  useEffect(() => {
    const storageToken: string | null = localStorage.getItem(KeyTokenLocalStorage);
    const storageRefreshoken: string | null = localStorage.getItem(KeyRefreshTokenLocalStorage);

    if (token != storageToken) {
      if (isValidToken(storageToken)) {
        setToken(storageToken);
      }
    }
    if (refreshToken != storageRefreshoken) {
      if (isValidRefreshToken(storageRefreshoken)) {
        setRefreshToken(storageRefreshoken);
      }
    }
  }, [tokenValido, refreshTokenValido]);

  const logar = (usuario: string, senha: string): boolean => {
    axios
      .post("http://site.cms.it/auth/login", {
        _username: usuario,
        _password: senha,
      })
      .then((res) => {
        setToken(res.data.token);
        setRefreshToken(res.data.refresh);
        setTokenValido(true);
        setRefreshTokenValido(true);
        decodeToken(res.data.token);
      })
      .catch((err) => {
        // console.log(err);
        setAlertaError(err.response.data.error.description)
      });
    // console.log('usuário:'+usuario,'senha:'+senha);
    return true;
  };

  const limparMensagemErro = ()=>{
    setAlertaError(null);
  }
  const logout = (): boolean => {
    setToken(null);
    setRefreshToken(null);
    setTokenValido(false);
    setRefreshTokenValido(false);
    setLogado(null!);
    return false;
  };

  const decodeToken = (token: string) => {
    axios
      .post(
        "http://site.cms.it/auth/decode",
        {},
        {
          headers: {
            "X-Token": token,
          },
        }
      )
      .then((res) => {
        setLogado(res.data.decode);
      })
      .catch((err) => {
        console.warn(err.response.data.error.description);
      });
  };

  const isValidToken = (token: string | null): boolean => {
    let isValid = false;
    if (!token) {
      return false;
    }
    axios
      .post(
        "http://site.cms.it/auth/validar",
        {},
        {
          headers: {
            "X-Token": token,
          },
        }
      )
      .then((res) => {
        isValid = res.data.token;
      })
      .catch((err) => {
        isValid = false;
      });
    return isValid;
  };

  const isValidRefreshToken = (token: string | null): boolean => {
    if (!token) {
      return false;
    }
    axios
      .post(
        "http://site.cms.it/auth/validar",
        {},
        {
          headers: {
            "X-Token-Refresh": token,
          },
        }
      )
      .then((res) => {
        return res.data.token;
      })
      .catch((err) => {
        return false;
      });
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        logado,
        alertaError,
        jaLogou,
        refreshToken,
        tokenValido,
        refreshTokenValido,
        logar,
        logout,
        isValidToken,
        isValidRefreshToken,
        limparMensagemErro
      }}
    >
      {!tokenValido && <Login />}
      {tokenValido && children}
    </AuthContext.Provider>
  );
};
