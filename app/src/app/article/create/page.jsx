"use client";

import { useState } from "react";

import PrimaryContent from "@/components/@shared/PrimaryContent";
import Title from "@/components/@shared/Title";
import Block from "@/components/@shared/Block";
import Space from "@/components/@shared/Space";
import FormGroup from "@/components/@shared/FormGroup";
import Label from "@/components/@shared/Label";
import InputBox from "@/components/@shared/InputBox";
import InputArea from "@/components/@shared/InputArea";
import ButtonGroup from "@/components/@shared/ButtonGroup";
import ActionButton from "@/components/@shared/ActionButton";

const ArticleCreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Article Submitted:", { title, content });
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
  };

  return (
    <PrimaryContent>
      <Title>Create Article</Title>
      <Block>
        <FormGroup
          leftElement={<Label text='Title' />}
          rightElement={
            <InputBox
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter article title'
            />
          }
        />
      </Block>
      <Space />
      <Block>
        <FormGroup
          leftElement={<Label text='Content' />}
          rightElement={
            <InputArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='Enter article content'
            />
          }
        />
      </Block>
      <Space />
      <ButtonGroup>
        <ActionButton text='Submit' type='submit' onClick={handleSubmit} />
        <ActionButton text='Cancel' isCancel={true} onClick={handleCancel} />
      </ButtonGroup>
    </PrimaryContent>
  );
};

export default ArticleCreatePage;
