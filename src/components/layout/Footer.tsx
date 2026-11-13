"use client";

import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/shared/ui/LayoutPrimitives";

const Wrap = styled.footer`
  margin-top: 3rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-primary);
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 2.5rem 0 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const Title = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: var(--color-on-primary);
`;

const Text = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.4rem;
`;

const ItemLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  &:hover { color: var(--color-accent); }
`;

const Bottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0 1.5rem;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export function Footer() {
  const t = useTranslations("Footer");
  const th = useTranslations("Header");
  const year = new Date().getFullYear();

  return (
    <Wrap>
      <Container>
        <Grid>
          <div>
            <Title>NOVA</Title>
            <Text>{t("brandDescription")}</Text>
          </div>
          <div>
            <Title>{t("navigation")}</Title>
            <List>
              <li><ItemLink href="/">{th("home")}</ItemLink></li>
              <li><ItemLink href="/#products">{th("products")}</ItemLink></li>
              <li><ItemLink href="/cart">{th("cart")}</ItemLink></li>
            </List>
          </div>
          <div>
            <Title>{t("information")}</Title>
            <List>
              <li><Text as="span">{t("about")}</Text></li>
              <li><Text as="span">{t("support")}</Text></li>
              <li><Text as="span">{t("shipping")}</Text></li>
              <li><Text as="span">{t("privacy")}</Text></li>
            </List>
          </div>
        </Grid>
        <Bottom>
          <span>{t("rights", { year })}</span>
          <span>{t("apiNote")}</span>
        </Bottom>
      </Container>
    </Wrap>
  );
}