// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { OrderDetailsProvider } from '../components/contexts/OrderDetails'

const renderWithContext = (ui: ReactElement, options?: RenderOptions) => {
	return render(ui, { wrapper: OrderDetailsProvider, ...options })
}

// re-export everything
// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react'

// override render method
export { renderWithContext as render }
