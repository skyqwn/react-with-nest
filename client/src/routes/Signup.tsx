import { useMutation } from "@apollo/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Input } from "../components/Input";
import FormError from "../components/FormError";

import { emailPattern } from "../libs/util";
import { graphql } from "../__generated__";
import { CreateAccountMutation } from "../__generated__/graphql";
import Button from "../components/Button";
import Title from "../components/Title";

const CREATE_ACCOUNT_MUTATION = graphql(`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`);

const Signup = () => {
  const navigate = useNavigate();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      toast.success("회원가입 성공");
      navigate("/");
    }
    if (error) {
      toast.error("회원가입실패");
    }
  };
  const [
    createAccountMutation,
    { data: CreateAccountMutationResult, loading },
  ] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      verifyPassword: "",
    },
  });

  const onValid: SubmitHandler<FieldValues> = (data) => {
    const { email, password, nickname, verifyPassword } = data;
    createAccountMutation({
      variables: {
        createAccountInput: {
          email,
          nickname,
          password,
          verifyPassword,
        },
      },
    });
  };

  return (
    <div>
      <Title content="Signup" />
      <div className="mt-20 mx-auto max-w-md space-y-5 flex flex-col">
        <Input
          name="email"
          type="email"
          control={control}
          label="이메일"
          rules={{
            required: "이메일을 입력해주세요",
            pattern: emailPattern,
          }}
        />

        <Input
          name="nickname"
          type="text"
          control={control}
          label="닉네임"
          rules={{ required: "닉네임을 입력해주세요" }}
        />
        <Input
          name="password"
          type="password"
          control={control}
          label="비밀번호"
          rules={{ required: "비밀번호를 입력해주세요" }}
        />
        <Input
          name="verifyPassword"
          type="password"
          control={control}
          label="비밀번호확인"
          rules={{ required: "비밀번호를 입력해주세요" }}
        />

        <Link to={"/login"}>아이디가 있으신가요? 로그인 하러 가기</Link>
        <Button
          onAction={handleSubmit(onValid)}
          canClick={isValid}
          loading={loading}
          actionText="회원가입"
        />
        {CreateAccountMutationResult?.createAccount.error && (
          <FormError
            errorMessage={CreateAccountMutationResult.createAccount.error}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;
