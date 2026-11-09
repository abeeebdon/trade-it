import DOMPurify from 'isomorphic-dompurify';

interface HtmlContentProps {
  html: string;
}

export function HtmlContent({ html }: HtmlContentProps) {
  const cleanHtml = DOMPurify.sanitize(html);

  return <p dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
