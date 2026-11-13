"use client";

import Image from "next/image";
import styled from "styled-components";
import { Star } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Product } from "@/types";
import { Container, Section } from "@/shared/ui/LayoutPrimitives";
import { Button } from "@/shared/ui/Button";
import { formatPrice } from "@/utils/format";
import { useCartStore } from "@/storage/cartStore";
import { Link } from "@/i18n/navigation";

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1.1fr;
    align-items: start;
  }
`;

const ImgWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
`;

const Category = styled.p`
  margin: 0 0 0.5rem;
  color: var(--color-accent);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
`;

const Title = styled.h1`
  margin: 0 0 0.75rem;
  font-size: 1.75rem;
  line-height: 1.3;
  @media (min-width: 768px) { font-size: 2.2rem; }
`;

const Price = styled.p`
  margin: 0 0 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
`;

const Rating = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
`;

const Desc = styled.p`
  margin: 0 0 1.5rem;
  color: var(--color-text-muted);
  line-height: 1.8;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export function ProductDetailClient({ product, locale }: { product: Product; locale: string }) {
  const t = useTranslations("Product");
  const th = useTranslations("Header");
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Section>
      <Container>
        <Grid>
          <ImgWrap>
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </ImgWrap>
          <div>
            <Category>{product.category}</Category>
            <Title>{product.title}</Title>
            <Price>{formatPrice(product.price, locale)}</Price>
            <Rating aria-label={`${t("rating")} ${product.rating.rate}`}>
              <Star size={18} fill="currentColor" color="#f59e0b" />
              <span>{product.rating.rate.toFixed(1)}</span>
              <span>{t("ratingCount", { count: product.rating.count })}</span>
            </Rating>
            <Desc>{product.description}</Desc>
            <Actions>
              <Button type="button" onClick={onAdd}>
                {added ? t("added") : t("addToCart")}
              </Button>
              <Link href="/cart"><Button as="span" $variant="secondary">{th("cart")}</Button></Link>
              <Link href="/"><Button as="span" $variant="ghost">{th("home")}</Button></Link>
            </Actions>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}