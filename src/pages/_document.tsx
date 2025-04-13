import { Html, Head, Main, NextScript, DocumentContext, DocumentProps } from "next/document";
import Document from 'next/document';//additional imports: default: Document, non-default: DocumentContext, DocumentProps
import {
  DocumentHeadTags,
  documentGetInitialProps,
  DocumentHeadTagsProps,
} from '@mui/material-nextjs/v15-pagesRouter';//DocumentHeadTagsProps, required as static type, not given in official docs of MUI

//props for my document function: static types not given in official MUI docs 
export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en" {...props}>
      <Head />
      <DocumentHeadTags {...props} />{/*Document Head Tags*/}
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
//function to get initial props, ctx static types are not given in the official document of MUI
Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
