import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/shared/ui/LayoutPrimitives";
import { Button } from "@/shared/ui/Button";

export default function NotFoundPage() {
  const t = useTranslations("Common");
  return (
    <Section>
      <Container>
        <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{t("notFoundTitle")}</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>{t("notFoundDescription")}</p>
          <Link href="/">
            <Button as="span">{t("backHome")}</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}