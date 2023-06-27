"use client";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignIn() {
  // const providers = await getProviders();

  // console.log(providers);

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  useEffect(() => {
    async function getProv() {
      const resProviders = await getProviders();
      console.log(resProviders);

      setProviders(resProviders);
    }
    getProv();
  }, []);

  return (
    <div className="flex justify-center items-center mt-20 max-w-4xl m-auto">
      <div className="hidden md:flex justify-end w-1/2 pr-10">
        <img
          src="https://macmagazine.com.br/wp-content/uploads/2023/02/08-blue.png"
          alt="twitter image inside a phone"
          className="hidden md:inline-flex object-cover md:w-96 md:h-60"
        />
      </div>

      <div className="flex flex-col items-center w-1/2 md:w-1/2 justify-start md:pl-10 ">
        {providers &&
          Object.values(providers).map((provider, i) => (
            <div key={i} className="flex flex-col justify-center md:justify-start w-full items-center">
              <img
                width="350px"
                src="https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/paginas-classificacao-indicativa/twitter.png"
                alt="twitter"
              />
              <p className="text-sm  italic ">
                This fake app was created by Willian
              </p>
              <button
                className="bg-red-400 cursor-pointer px-3 py-4 text-white font-bold rounded-lg mt-16 hover:bg-red-500"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
