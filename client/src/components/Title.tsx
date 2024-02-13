import React from "react";
import { Helmet } from "react-helmet-async";

interface TitleType {
  content: string;
}

const Title = ({ content }: TitleType) => {
  return (
    <Helmet>
      <title>{content} | React-with-Nest</title>
    </Helmet>
  );
};

export default Title;
