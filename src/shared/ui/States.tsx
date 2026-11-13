"use client";

import styled from "styled-components";
import { Button } from "./Button";

const Box = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text-muted);
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  color: var(--color-text);
  font-size: 1.125rem;
`;

export function LoadingState({ message }: { message: string }) {
  return (
    <Box role="status" aria-live="polite">
      <Title>{message}</Title>
    </Box>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <Box>{message}</Box>;
}

export function ErrorState({
  title,
  message,
  retryLabel,
  onRetry,
}: {
  title: string;
  message: string;
  retryLabel: string;
  onRetry: () => void;
}) {
  return (
    <Box role="alert">
      <Title>{title}</Title>
      <p style={{ margin: "0 0 1rem" }}>{message}</p>
      <Button onClick={onRetry} $variant="primary">
        {retryLabel}
      </Button>
    </Box>
  );
}