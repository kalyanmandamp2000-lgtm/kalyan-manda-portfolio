"use client";

type SectionBackgroundProps = {
  src: string;
};

export function SectionBackground({ src }: SectionBackgroundProps) {
  return (
    <div className="section-background" aria-hidden="true">
      <div
        className="section-background-image"
        style={{ backgroundImage: `url("${src}")` }}
      />
      <div className="section-background-shade" />
    </div>
  );
}