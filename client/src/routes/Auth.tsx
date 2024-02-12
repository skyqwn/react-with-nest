import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";

interface ILoginForm {
  email: string;
  nickname: string;
  password: string;
  verifyPassword: string;
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      verifyPassword: "",
    },
  });

  const onValid: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    console.log(errors);
  };
  return (
    <div className="mt-20 mx-auto max-w-md space-y-5 flex flex-col">
      <Input
        name="email"
        type="email"
        control={control}
        errors={errors}
        label="이메일"
        rules={{
          required: "이메일을 입력해주세요",
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }}
      />

      <Input
        name="nickname"
        type="text"
        control={control}
        errors={errors}
        label="닉네임"
        required
      />
      <Input
        name="password"
        type="password"
        control={control}
        errors={errors}
        label="비밀번호"
        required
      />
      {!isLogin && (
        <Input
          name="verifyPassword"
          type="password"
          control={control}
          errors={errors}
          label="비밀번호확인"
          required
        />
      )}

      <button onClick={handleSubmit(onValid)}>
        {isLogin ? "로그인" : "회원가입"}
      </button>
      <button
        onClick={() => {
          setIsLogin((prev) => !prev);
        }}
      >
        {!isLogin
          ? "아이디가 있으신가요? 로그인 하러 가기"
          : "아이디가 없으신가요? 회원가입 하러 가기  "}
      </button>
    </div>
  );
};

export default Auth;
