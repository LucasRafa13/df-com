import { Button } from "@/component/atom/button";
import { Input } from "@/component/atom/input";
import { Card } from "@/component/organism/card";
import { Section } from "@/component/organism/section";
import api from "@/service/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function register(name: string, email: string, password: string) {
    try {
      const response = await api.post("/users", { name, email, password });

      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <Section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <Card>
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Registre-se </h2>
                <p className="text-white-50 mb-5">
                  Por favor, informe seus dados de cadastro.
                </p>

                <Input
                  type="text"
                  id="typeName"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  id="typeEmail"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  id="typePassword"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={handleSubmit}>registre-se</Button>
              </div>

              <div>
                <p className="mb-0">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-white-50 fw-bold">
                    Login
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
