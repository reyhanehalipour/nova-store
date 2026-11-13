import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProductById } from "@/requests/products";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  try {
    const product = await getProductById(Number(id));
    return {
      title: product.title,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: t("title") };
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const productId = Number(id);
  if (!Number.isFinite(productId)) notFound();
  let product;
  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }
  return <ProductDetailClient product={product} locale={locale} />;
}