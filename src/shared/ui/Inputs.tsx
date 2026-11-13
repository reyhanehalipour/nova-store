"use client";

import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  min-height: 2.75rem;

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  min-height: 2.75rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 0.35rem;
`;