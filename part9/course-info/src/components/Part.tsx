import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return <i>{part.description}</i>;
    case 'background':
      return (
        <>
          <i>{part.description}</i>
          <p>submit to {part.backroundMaterial}</p>
        </>
      );
    case 'group':
      return <p>project exercises {part.groupProjectCount}</p>;
    case 'special':
      return (
        <>
          <i>{part.description}</i>
          <p>
            required skills:{' '}
            {part.requirements.map((r, i) => (
              <span key={r}>
                {i === part.requirements.length - 1 ? r : `${r}, `}
              </span>
            ))}
          </p>
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
