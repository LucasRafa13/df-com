import { useRouter } from "next/router";
import { useEffect } from "react";
import "./cover.modules.css";

export default function Cover() {
  const router = useRouter();

  const exit = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    router.push("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/login");
    }
  }, []);

  return (
    <div className=" cover">
      <div>
        <h1>Bem vindo, você está logado</h1>
        <p className="text-2xl">
          Você está logado no sistema, para sair clique no botão abaixo
        </p>
        <button onClick={exit}>Sair</button>
      </div>
    </div>
  );
}
