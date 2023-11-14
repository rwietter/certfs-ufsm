import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const isActive = (pathname: string, path: string): boolean => {
  return pathname === path;
};

const Menu: React.FC = (): JSX.Element => {
  const pathname = useRouter().pathname;

  return (
    <nav className="flex items-center justify-center w-full top-0 backdrop-blur-md border-b-2 border-stone-800">
      <div className="flex items-center justify-start w-full max-w-7xl pt-2 pb-4 px-6">
        <li
          className={`${
            isActive(pathname, "/")
              ? "bg-white"
              : "hover:bg-[#424345] text-white"
          } text-black list-none py-1 px-3 rounded-md transition-colors`}
        >
          <Link href="/">Cadastrar</Link>
        </li>
        <li
          className={`${
            isActive(pathname, "/consultar")
              ? "bg-white"
              : "hover:bg-[#424345] text-white"
          } text-black list-none py-1 px-3 rounded-md mx-3 transition-colors`}
        >
          <Link href="/consultar">Consultar</Link>
        </li>
        <li
          className={`${
            isActive(pathname, "/rastreabilidade")
              ? "bg-white"
              : "hover:bg-[#424345] text-white"
          } text-black list-none py-1 px-3 rounded-md transition-colors`}
        >
          <Link href="/rastreabilidade">Rastreabilidade</Link>
        </li>
      </div>
    </nav>
  );
};

export { Menu };
