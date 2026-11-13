"use client";

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 1.5rem;
  }
`;

export const Section = styled.section`
  padding: 2.5rem 0;

  @media (min-width: 768px) {
    padding: 3.5rem 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 1.25rem;
  color: var(--color-text);

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;