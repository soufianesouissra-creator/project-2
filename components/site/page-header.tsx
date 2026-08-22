import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { Section } from "./section";

/** Page opening block: eyebrow, the page's display line, optional intro. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Section register="froid" className="pb-10 md:pb-14">
      <Container>
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h1 className="display-wide max-w-4xl text-balance text-64">{title}</h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-20 text-bitume/80">{intro}</p>
        )}
      </Container>
    </Section>
  );
}
