"use client";

import commonStyle from "@/styles/modules/common.module.scss";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

import { tokenStore } from "@/lib/token.store";

const ArticleCreatePage = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    const token = tokenStore.get();
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const response = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setSuccess("Article created successfully");
        setTimeout(() => {
          router.replace("/article");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError("Failed to create article: " + errorData.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred.");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
  };

  return (
    <PrimaryContent>
      <Title>Create Article</Title>
      {success && (
        <div className={commonStyle["success_message"]}>{success}</div>
      )}
      {error && <div className={commonStyle["error_message"]}>{error}</div>}
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
