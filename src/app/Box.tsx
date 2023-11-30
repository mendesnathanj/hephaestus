import styled from 'styled-components';
import { forwardRef } from 'react';

const StyledBox = styled.div<{ $componentStyles?: string; $templateStyles?: string; }>`
  ${props => props.$templateStyles}
  ${props => props.$componentStyles}
`;

interface BoxProps {
  children?: React.ReactNode;
  component?: keyof JSX.IntrinsicElements;
  componentStyles?: string;
  templateStyles?: string;
}

// export default function Box({ children, component = 'div', componentStyles = '', templateStyles = '' }: BoxProps) {
//   return (
//     <StyledBox as={component} $templateStyles={templateStyles} $componentStyles={componentStyles}>
//       {children}
//     </StyledBox>
//   );
// }

const Box = forwardRef(({
  children, component = 'div', componentStyles = '', templateStyles = '', ...rest
}, ref) => {
  return (
    <StyledBox ref={ref} as={component} $templateStyles={templateStyles} $componentStyles={componentStyles} {...rest}>
      {children}
    </StyledBox>
  )
});

export default Box;
