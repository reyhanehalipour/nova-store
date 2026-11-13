"use client";

import styled from "styled-components";
import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Product } from "@/types";
import { Button } from "@/shared/ui/Button";
import { formatPrice } from "@/utils/format";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/storage/cartStore";
import { useState } from "react";

const Card = styled.article`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  height: 100%;
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #fff;
  padding: 1rem;
`;

const Body = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Category = styled.span`
  font-size: 0.75rem;
  color: var(--color-accent);
  font-weight: 600;
  text-transform: uppercase;
`;

const TitleLink = styled(Link)`
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8em;
  &:hover { color: var(--color-accent); }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.25rem;
`;

const Price = styled.span`
  font-weight: 700;
  color: var(--color-text);
`;

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
`;

export function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const t = useTranslations("Product");
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Card>
      <ImageWrap>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </ImageWrap>
      <Body>
        <Category>{product.category}</Category>
        <TitleLink href={`/products/${product.id}`}>{product.title}</TitleLink>
        <Meta>
          <Price>{formatPrice(product.price, locale)}</Price>
          <Rating aria-label={`${t("rating")} ${product.rating.rate}`}>
            <Star size={14} fill="currentColor" color="#f59e0b" />
            {product.rating.rate.toFixed(1)}
          </Rating>
        </Meta>
        <Button type="button" onClick={onAdd} $full>
          {added ? t("added") : t("addToCart")}
        </Button>
      </Body>
    </Card>
  );
}