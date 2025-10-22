"use client";

import { Suspense } from "react";
import Fab from "@/components/@shared/Fab";
import Loading from "@/components/@shared/Loading";

const ArticlePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className='primary-content'>
        <Fab href='/article/create' label='Create Article' />
      </div>
    </Suspense>
  );
};

export default ArticlePage;
