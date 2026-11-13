"use client";

import styled, { css } from "styled-components";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

export const Button = styled.button<{ $variant?: Variant; $size?: Size; $full?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.05s ease;
  width: ${({ $full }) => ($full ? "100%" : "auto")};
  padding: ${({ $size }) => ($size === "sm" ? "0.45rem 0.75rem" : "0.7rem 1rem")};
  font-size: ${({ $size }) => ($size === "sm" ? "0.875rem" : "0.95rem")};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  ${({ $variant = "primary" }) => {
    switch ($variant) {
      case "secondary":
        return css`
          background: var(--color-surface-alt);
          color: var(--color-text);
          border-color: var(--color-border);
          &:hover:not(:disabled) { background: var(--color-border); }
        `;
      case "ghost":
        return css`
          background: transparent;
          color: var(--color-text);
          border-color: var(--color-border);
          &:hover:not(:disabled) { background: var(--color-surface-alt); }
        `;
      case "danger":
        return css`
          background: transparent;
          color: var(--color-danger);
          border-color: var(--color-danger);
          &:hover:not(:disabled) { background: rgba(220, 38, 38, 0.08); }
        `;
      default:
        return css`
          background: var(--color-accent);
          color: #fff;
          &:hover:not(:disabled) { background: var(--color-accent-hover); }
        `;
    }
  }}
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: var(--color-surface-alt);
  }
`;