interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface BaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends BaseWithDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackround extends BaseWithDescription {
  backroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends BaseWithDescription {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartSpecial;
