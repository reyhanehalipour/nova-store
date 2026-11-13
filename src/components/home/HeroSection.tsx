"use client";

import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui/LayoutPrimitives";
import { Button } from "@/shared/ui/Button";

const Wrap = styled.section`
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
  color: var(--color-on-primary);
  padding: 3rem 0 3.5rem;
  @media (min-width: 768px) { padding: 4.5rem 0 5rem; }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  align-items: center;
  @media (min-width: 900px) {
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 0.5rem;
  color: #ffd7b0;
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: 2rem;
  line-height: 1.25;
  @media (min-width: 768px) { font-size: 3rem; }
`;

const Desc = styled.p`
  margin: 0 0 1.5rem;
  color: rgba(255,255,255,0.88);
  max-width: 42rem;
  font-size: 1.05rem;
`;

const Visual = styled.div`
  border-radius: var(--radius-lg);
  min-height: 220px;
  background:
    radial-gradient(circle at 30% 30%, rgba(255,122,26,0.45), transparent 45%),
    radial-gradient(circle at 70% 60%, rgba(255,255,255,0.18), transparent 40%),
    linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.9);
  @media (min-width: 768px) { min-height: 320px; font-size: 4rem; }
`;

export function HeroSection() {
  const t = useTranslations("Home");
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <Wrap>
      <Container>
        <Grid>
          <div>
            <Eyebrow>{t("heroEyebrow")}</Eyebrow>
            <Title>{t("heroTitle")}</Title>
            <Desc>{t("heroDescription")}</Desc>
            <Button type="button" onClick={scrollToProducts}>{t("heroCta")}</Button>
          </div>
          <Visual aria-hidden="true">NOVA</Visual>
        </Grid>
      </Container>
    </Wrap>
  );
}