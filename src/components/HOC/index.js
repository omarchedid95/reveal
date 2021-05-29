import { useTheme, useMediaQuery } from '@material-ui/core';
import { useAuth } from '../../auth/AuthProvider';
// Custom HOC that givess access to the media query hook through props
// TODO: known issue with initialization with media query. reproduce by removing any firestore init function then readding it
export const withMediaQuery = Component => props => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    return <Component isMobile={isMobile} {...props} />
}

// Custom HOC that givess access to auth state through props
export const withAuth = Component => props => {
    const auth = useAuth();
    return <Component auth={auth} {...props} />
}