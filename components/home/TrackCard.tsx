import { Icon } from "@/components/icons/Sprite";
import Link from "next/link";

export interface TrackStep {
  title: string;
  minutes: number;
}

/**
 * Trilha de onboarding. `progress` e `resumeStep` já entram por prop: na v1 são
 * estáticos porque tracking de leitura está fora de escopo, mas quando existir
 * não é preciso refatorar o componente.
 */
export default function TrackCard({
  steps,
  progress = 25,
  resumeStep = 2,
}: {
  steps: TrackStep[];
  progress?: number;
  resumeStep?: number;
}) {
  const total = steps.reduce((s, e) => s + e.minutes, 0);

  return (
    <div className="trilha">
      <div className="trilha-top">
        <span className="kicker" style={{ margin: 0 }}>Trilha de onboarding</span>
        <span className="tag">{steps.length} etapas · {total} min</span>
      </div>
      <h2>Comece por aqui</h2>
      <p className="meta">Do zero ao primeiro processo seletivo publicado.</p>

      <ol className="steps">
        {steps.map((s, i) => (
          <li className="step" key={s.title}>
            <span className="num">{i + 1}</span>
            <span className="t">{s.title}</span>
            <span className="d">{s.minutes} min</span>
          </li>
        ))}
      </ol>

      <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da trilha">
        <i style={{ width: `${progress}%` }} />
      </div>

      <Link className="btn btn-ghost" href="/comece-aqui">
        Retomar na etapa {resumeStep}
        <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}
