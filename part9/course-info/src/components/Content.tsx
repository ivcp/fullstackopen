import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(part => {
        return (
          <div key={part.name}>
            <h4>
              {part.name} {part.exerciseCount}
            </h4>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};

export default Content;
