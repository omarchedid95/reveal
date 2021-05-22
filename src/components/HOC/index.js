import { useTheme, useMediaQuery } from '@material-ui/core';
// Get access to media query hook throughHOC Hook
export const withMediaQuery = Component => props => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    return <Component isMobile={isMobile} {...props} />
}