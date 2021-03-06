import * as React from 'react'
import { render } from 'react-testing-library'

import { Box } from './box'

it('should render a Box', () => {
  const { container } = render(<Box>Test</Box>)
  expect(container).toBeTruthy()
  const div: any = container.querySelector('div')
  expect(div.textContent).toBe('Test')
})
