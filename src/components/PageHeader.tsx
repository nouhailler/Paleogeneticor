interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8 max-w-4xl">
      {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-ochre">{eyebrow}</p> : null}
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
      <p className="mt-3 text-base leading-7 text-ink/75 sm:text-lg">{description}</p>
    </header>
  );
}
