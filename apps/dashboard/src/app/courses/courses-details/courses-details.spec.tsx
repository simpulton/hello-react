import { render } from '@testing-library/react';

import CoursesDetails from './courses-details';

describe('CoursesDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoursesDetails />);
    expect(baseElement).toBeTruthy();
  });
});
