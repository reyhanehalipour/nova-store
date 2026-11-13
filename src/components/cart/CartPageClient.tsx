"use client";

import Image from "next/image";
import styled from "styled-components";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container, Section, SectionTitle } from "@/shared/ui/LayoutPrimitives";
import { Button, IconButton } from "@/shared/ui/Button";
import { useCartStore, selectSubtotal, selectTotalItems } from "@/storage/cartStore";
import { formatPrice } from "@/utils/format";
import { Link } from "@/i18n/navigation";

const Layout = styled.div`
  display: grid;
  gap: 1.5rem;
  @media (min-width: 900px) {
    grid-template-columns: 1.6fr 0.9fr;
    align-items: start;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Item = styled.article`
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  @media (min-width: 700px) {
    grid-template-columns: 120px 1fr auto;
    align-items: center;
  }
`;

const ImgWrap = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  background: #fff;
  border-radius: var(--radius-sm);
  overflow: hidden;
  @media (min-width: 700px) { width: 120px; height: 120px; }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Name = styled(Link)`
  font-weight: 600;
  color: var(--color-text);
  &:hover { color: var(--color-accent); }
`;

const Muted = styled.p`
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
  @media (min-width: 700px) { align-items: flex-end; }
`;

const QtyRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const Qty = styled.span`
  min-width: 2rem;
  text-align: center;
  font-weight: 600;
`;

const Summary = styled.aside`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  padding: 1.25rem;
  position: sticky;
  top: 5.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.75rem 0;
  color: var(--color-text);
`;

const EmptyBox = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
`;

export function CartPageClient({ locale }: { locale: string }) {
  const t = useTranslations("Cart");
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const increase = useCartStore((s) => s.increaseQuantity);
  const decrease = useCartStore((s) => s.decreaseQuantity);
  const clear = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);

  return (
    <Section>
      <Container>
        <SectionTitle>{t("title")}</SectionTitle>

        {items.length === 0 ? (
          <EmptyBox>
            <h2 style={{ marginTop: 0 }}>{t("emptyTitle")}</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>
              {t("emptyDescription")}
            </p>
            <Link href="/"><Button as="span">{t("continueShopping")}</Button></Link>
          </EmptyBox>
        ) : (
          <Layout>
            <div>
              <List>
                {items.map(({ product, quantity }) => (
                  <Item key={product.id}>
                    <ImgWrap>
                      <Image src={product.image} alt={product.title} fill sizes="120px" style={{ objectFit: "contain" }} />
                    </ImgWrap>
                    <Info>
                      <Name href={`/products/${product.id}`}>{product.title}</Name>
                      <Muted>{t("itemPrice")}: {formatPrice(product.price, locale)}</Muted>
                      <Muted>{t("rowTotal")}: {formatPrice(product.price * quantity, locale)}</Muted>
                    </Info>
                    <Controls>
                      <QtyRow aria-label={t("quantity")}>
                        <IconButton type="button" onClick={() => decrease(product.id)} aria-label={t("decrease")} disabled={quantity <= 1}>
                          <Minus size={16} />
                        </IconButton>
                        <Qty>{quantity}</Qty>
                        <IconButton type="button" onClick={() => increase(product.id)} aria-label={t("increase")}>
                          <Plus size={16} />
                        </IconButton>
                      </QtyRow>
                      <Button type="button" $variant="danger" $size="sm" onClick={() => removeItem(product.id)}>
                        <Trash2 size={16} /> {t("remove")}
                      </Button>
                    </Controls>
                  </Item>
                ))}
              </List>
              <div style={{ marginTop: "1rem" }}>
                <Button type="button" $variant="ghost" onClick={clear}>{t("clear")}</Button>
              </div>
            </div>

            <Summary>
              <h2 style={{ marginTop: 0, fontSize: "1.25rem" }}>{t("summaryTitle")}</h2>
              <Row><span>{t("totalItems")}</span><strong>{totalItems}</strong></Row>
              <Row><span>{t("subtotal")}</span><strong>{formatPrice(subtotal, locale)}</strong></Row>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>{t("checkoutNote")}</p>
              <Link href="/" style={{ display: "block" }}><Button as="span" $variant="secondary" $full>{t("continueShopping")}</Button></Link>
            </Summary>
          </Layout>
        )}
      </Container>
    </Section>
  );
}