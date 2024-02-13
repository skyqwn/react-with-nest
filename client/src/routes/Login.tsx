import { useMutation } from "@apollo/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import FormError from "../components/FormError";

import { emailPattern } from "../libs/util";
import { graphql } from "../__generated__";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/graphql";
import Button from "../components/Button";
import { isLoggedInVar } from "../apollo";
import Title from "../components/Title";

const LOGIN_MUTATION = graphql(`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`);

const Login = () => {
  const navigate = useNavigate();
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
      isLoggedInVar(true);
      toast.success("로그인성공");
      navigate("/");
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
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
    const { email, password } = data;
    loginMutation({
      variables: {
        loginInput: {
          email,
          password,
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
          name="password"
          type="password"
          control={control}
          label="비밀번호"
          rules={{ required: "비밀번호를 입력해주세요" }}
        />

        <Link to={"/signup"}>아이디가 없으신가요? 회원가입 하러 가기</Link>
        <Button
          onAction={handleSubmit(onValid)}
          canClick={isValid}
          loading={loading}
          actionText="로그인"
        />
        {loginMutationResult?.login.error && (
          <FormError errorMessage={loginMutationResult.login.error} />
        )}
      </div>
    </div>
  );
};

export default Login;
