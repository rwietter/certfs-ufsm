/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable turbo/no-undeclared-env-vars */
import React, { ChangeEvent, useState } from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { Label } from '@radix-ui/react-label';
import { format, parseISO } from 'date-fns';
import { Input } from 'lib/ui/input';
import { toast } from 'lib/ui/use-toast';
import { useDebouncedCallback } from 'use-debounce';

const Search: React.FC = () => {
  const [studentEmail, setStudentEmail] = useState<string>("");
  const contractAddress = process.env.FANTON_SMART_CONTRACT_ADDRESS;
  const { contract } = useContract(contractAddress); // carlosbertoleto@gmail.com
  const { data, isError, isLoading } = useContractRead(contract, "getCertificateByStudentEmail", [studentEmail]);

  const debounced = useDebouncedCallback(
    (value) => {
      setStudentEmail(value);
    },
    1000
  );

  if (isError) {
    toast({
      title: "Erro",
      description: "Não foi possível carregar os dados",
      duration: 3000,
    });
    return <span />;
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    debounced(e.target.value);
  }

  return (
    <section className="pt-8 max-w-7xl m-auto p-8">
      <form className="flex justify-center flex-col items-center max-w-lg m-auto">
        <Label className="text-white text-2xl">Consultar Certificado</Label>
        <Input className="my-2" onChange={handleSearch} placeholder="Digite o email do aluno" type="email" />
      </form>
      <section className="grid grid-cols-fill mt-8 gap-4">
        {data ? data.map((student) => {
          const [startDate, endDate] = student[7].split(" - ")
          const isoStartDate = format(parseISO(startDate), 'dd/MM/yyyy')
          const isoEndDate = format(parseISO(endDate), 'dd/MM/yyyy')

          return (
            <div className="text-white space-y-2 border-[#27272A] border-2 p-6 rounded-md w-full" key={startDate}>
              <p><strong>Nome</strong>: {student[1]}</p>
              <p><strong>Email</strong>: {student[2]}</p>
              <p><strong>Instituição</strong>: {student[3]}</p>
              <p><strong>Curso</strong>: {student[4]}</p>
              <p><strong>Matrícula</strong>: {student[5]}</p>
              <p><strong>Formação</strong>: {isoStartDate} - {isoEndDate}</p>
              <p>
                <a className='underline hover:text-violet-500' href={`https://ipfs.io/ipfs/${student[6]}`}>Visualizar certificado</a>
              </p>
            </div>
          )
        }) : <span />}
        {!isLoading && !data?.length ? (
          <section className='col-span-2'>
            <p className='text-white text-center'>Nenhum certificado encontrado para o email <strong>{studentEmail}</strong></p>
          </section>
        ) : <span />}
      </section>
      {isLoading ? <p className='text-white text-center'>loading...</p> : <span />}
    </section>
  )
}

export default Search;