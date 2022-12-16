import { Alert } from 'react-bootstrap'
import { AlertBannerProps } from './AlertBanner.interface'

function AlertBanner({ message, variant }: AlertBannerProps) {
	const alertMessage =
		message || 'An unexpected error occurred. Please try again later'
	const alertVariant = variant || 'danger'
	return (
		<Alert
			variant={alertVariant}
			style={{
				backgroundColor: 'red',
			}}>
			{alertMessage}
		</Alert>
	)
}

export default AlertBanner
