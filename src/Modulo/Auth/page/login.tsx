import { Button, TextField, Alert, TextFieldProps, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps } from "@mui/material";
import { config } from "process";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "./../context";

export const Login = () => {
  const [globalErro, setGlobalErro] = useState<string|null>(null);
  const [usuario, setUsuario] = useState("");
  const [usuarioErro, setUsuarioErro] = useState<string|null>(null);
  const [senha, setSenha] = useState("");
  const [senhaErro, setSenhaErro] = useState<string|null>(null);

  const _AuthContext = useContext(AuthContext);

  const handleUsuarioInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsuario(e.target.value);
  };

  const handleSenhaInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    setUsuarioErro(null);
    setSenhaErro(null);
    _AuthContext.logar(usuario, senha);
  };

  useEffect(() => {
    let mensagemErro = _AuthContext.alertaError;
    if(mensagemErro!=null){
      if(typeof mensagemErro == "string"){
        setGlobalErro(mensagemErro);
      }
      if(typeof mensagemErro == "object"){
        setUsuarioErro(mensagemErro._username);
        setSenhaErro(mensagemErro._password);
      }
    }
  }, [_AuthContext])
  

  const removerAlertaGlobal = () => {
    setGlobalErro(null);
    _AuthContext.limparMensagemErro();
  };

  return (
    <>
      <h2>Login</h2>
      <hr />
      {globalErro && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() =>removerAlertaGlobal()}>
              X
            </Button>
          }
        >
          {globalErro}
        </Alert>
      )}
      <br />
      <form onSubmit={handleLogin}>
        <div>
          <TextField id="outlined-basic" error={usuarioErro!=null} helperText={usuarioErro} label="Usuário" variant="outlined" value={usuario} onChange={handleUsuarioInput} />
          <br />
          <br />
        </div>
        <div>
          <TextField id="outlined-basic" label="Senha" error={senhaErro!=null} helperText={senhaErro} type={"password"} variant="outlined" value={senha} onChange={handleSenhaInput} />
        </div>
        <br />
        <br />
        <Button variant="text" type={"submit"}>
          Enviar
        </Button>
      </form>
    </>
  );
};