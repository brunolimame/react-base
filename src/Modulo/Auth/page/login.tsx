import { Button, TextField } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import {AuthContext} from './../context';

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

  const handleLogin = (e:any)=>{
    e.preventDefault();
    _AuthContext.logar(usuario,senha)
  }


  return (
    <>
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleLogin}>
      <p>
        <TextField id="outlined-basic" label="Usuário" variant="outlined" value={usuario} onChange={handleUsuarioInput} />
      </p>
      <p>
        <TextField id="outlined-basic" label="Senha" type={"password"} variant="outlined" value={senha} onChange={handleSenhaInput} />
      </p>
        <Button variant="text" type={'submit'} >Enviar</Button>
      </form>
    </>
  );
};
