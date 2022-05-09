import { Button, TextField, Alert } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "./../context";

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const _AuthContext = useContext(AuthContext);

  const handleUsuarioInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsuario(e.target.value);
  };

  const handleSenhaInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    _AuthContext.logar(usuario, senha);
  };

  const removerAlerta = () => {
    console.log("remover");
    _AuthContext.limparMensagemErro();
  };

  return (
    <>
      <h2>Login</h2>
      <hr />
      <MensagemAlertaComponente></MensagemAlertaComponente>
      <br />
      <form onSubmit={handleLogin}>
        <div>
          <TextField id="outlined-basic" label="Usuário" variant="outlined" value={usuario} onChange={handleUsuarioInput} />
        </div>
        <div>
          <TextField id="outlined-basic" label="Senha" type={"password"} variant="outlined" value={senha} onChange={handleSenhaInput} />
        </div>
        <Button variant="text" type={"submit"}>
          Enviar
        </Button>
      </form>
    </>
  );
};

const MensagemAlertaComponente = () => {
  const _AuthContext = useContext(AuthContext);
  let mesagemErro: string | null | object = _AuthContext.alertaError;
  let mensagemFinal = "";
  if (mesagemErro != null) {
    if (typeof mesagemErro == "object") {
      mensagemFinal = JSON.stringify(mesagemErro);
    }else{
      mensagemFinal = mesagemErro;
    }
  }

  return (
    <>
      {mensagemFinal && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => _AuthContext.limparMensagemErro()}>
              X
            </Button>
          }
        >
          {mensagemFinal}
        </Alert>
      )}
    </>
  );
};
