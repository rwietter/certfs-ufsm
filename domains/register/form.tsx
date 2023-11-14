/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-misused-promises */

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Input } from "lib/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "lib/ui/form";
import { useToast } from "lib/ui/use-toast";
import { api } from "services/api";
import { DatePickerWithRange } from "lib/ui/rangepicker";

const formSchema = z.object({
  studentName: z.string().min(2, {
    message: "Nome deve ter no mínimo 2 caracteres",
  }),
  studentEmail: z.string().email({
    message: "Email inválido",
  }),
  studentMatricula: z.string().min(6, {
    message: "Matrícula deve ter no mínimo 6 caracteres",
  }),
  studentCourse: z.string().min(2, {
    message: "Curso deve ter no mínimo 2 caracteres",
  }),
  studentInstitution: z.string().min(2, {
    message: "Instituição deve ter no mínimo 2 caracteres",
  }),
  studentFormation: z.object({
    initialDate: z.date(),
    endDate: z.date(),
  }),
  studentCertification: z.string(),
});

const RegisterForm: React.FC = () => {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const { contract } = useContract(process.env.FANTON_SMART_CONTRACT_ADDRESS);
  const { mutateAsync, isLoading } = useContractWrite(
    contract,
    "issueCertificate"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      studentEmail: "",
      studentMatricula: "",
      studentCourse: "",
      studentInstitution: "",
      studentCertification: "",
      studentFormation: {
        initialDate: new Date(),
        endDate: new Date(),
      },
    },
  });

  const handleTransaction = async (data): Promise<void> => {
    const inputFile = fileRef.current

    if (!inputFile) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo",
      });
      return;
    }

    if (!inputFile.files) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo",
      });
      return;
    }

    const file = inputFile.files[0];

    const formData = new FormData();
    formData.append('file', file);

    const ipfsResponse = await api.post('/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    if(!ipfsResponse.data.IpfsHash) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer o upload do arquivo",
        duration: 3000,
      });
      return;
    }

    const payload = {
      name: data.studentName,
      institution: data.studentInstitution,
      course: data.studentCourse,
      email: data.studentEmail,
      matricula: data.studentMatricula,
      ipfsHash: ipfsResponse.data.IpfsHash,
      completionTime: `${date?.from?.toISOString()} - ${date?.to?.toISOString()}`
    }

    try {
      const { receipt } = await mutateAsync({
        args: [
          payload.name,
          payload.institution,
          payload.course,
          payload.email,
          payload.matricula,
          payload.ipfsHash,
          payload.completionTime,
        ],
      })

      toast({
        title: "Sucesso",
        description: "Certificado emitido com sucesso",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ops! Ocorreu um erro ao emitir o certificado",
        duration: 3000,
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    await handleTransaction(values);
  }

  return (
    <Form {...form}>
      <form
        className="mt-7 w-full max-w-5xl grid grid-cols-1 items-start gap-y-6 sm:grid-cols-2 sm:gap-x-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-white text-start mb-2 block">
                Nome Completo
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome do aluno" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentEmail"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-white text-start mb-2 block">
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="Email do aluno" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentCourse"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-white text-start mb-2 block">Curso</FormLabel>
              <FormControl>
                <Input placeholder="Curso do aluno" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentMatricula"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-white text-start mb-2 block">Matrícula</FormLabel>
              <FormControl>
                <Input placeholder="Matrícula do aluno" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentInstitution"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-white text-start mb-2 block">Instituição</FormLabel>
              <FormControl>
                <Input placeholder="Instituição de Ensino" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentCertification"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-white text-start mb-2 block">
                Certificado
              </FormLabel>
              <FormControl>
                <Input accept="application/pdf" type="file" {...field} ref={fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentFormation"
          render={() => (
            <FormItem className="space-y-0">
              <FormLabel className="text-white text-start mb-2 block">
                Tempo de Formação
              </FormLabel>
              <FormControl>
              <DatePickerWithRange className='w-full' date={date} setDate={setDate} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <p className="text-white">Carregando...</p>
        ) : (
          <TransactionButton
            form={form}
            handleTransaction={() => form.handleSubmit(onSubmit)}
          />
        )}
      </form>
    </Form>
  );
};

export default RegisterForm;

const TransactionButton = (props): JSX.Element => {
  const contractAddress = process.env.FANTON_SMART_CONTRACT_ADDRESS;
  return (
    <Web3Button
      action={props.handleTransaction}
      className="hover:bg-red-600 hover:text-black"
      connectWallet={{
        btnTitle: "Emitir Certificado",
      }}
      contractAddress={contractAddress as string}
      isDisabled={!props.form.formState.isValid}
      style={{
        backgroundColor: `${props.form.formState.isValid ? "#FFFFFF" : "#9CA3AF"
          }`,
        color: `${props.form.formState.isValid ? "#000000" : "#FFFFFF"}`,
        fontWeight: 600,
        marginTop: 24,
      }}
      type="submit"
    >
      Emitir Certificado
    </Web3Button>
  )
};