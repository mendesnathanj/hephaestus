import Box from '@/app/Box';
import { Link } from 'react-router-dom';

function convertStylesToString(styles) {
  const result = [];

  for (const selector in styles) {
    if (styles.hasOwnProperty(selector)) {
      const value = styles[selector];

      if (typeof value === 'object') {
        // Handle nested styles (e.g., media queries)
        const nestedStyles = convertStylesToString(value);
        result.push(`${selector} { ${nestedStyles} }`);
      } else {
        result.push(`${selector}: ${value};`);
      }
    }
  }

  return result.join(' ');
}

const cssStyles = {
  color: 'red',
  'font-size': '16px',
  'background-color': 'yellow',
  '@media (min-width: 768px)': {
    color: 'blue',
    'font-size': '18px',
  },
  // Add more styles and media queries as needed
};

export default function Root() {
  return (
    <div>
      <Box templateStyles={convertStylesToString(cssStyles)}>Button</Box>
      <Link reloadDocument to="/path-two">Path Two</Link>
    </div>
  );
}
