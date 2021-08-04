import { render } from '@testing-library/react';

import CoursesList from './courses-list';

describe('CoursesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoursesList />);
    expect(baseElement).toBeTruthy();
  });
});
