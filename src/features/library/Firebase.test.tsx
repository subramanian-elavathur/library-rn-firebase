import {render} from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import Library from '../login/Login';

it('renders correctly', () => {
  render(<Library />);
  //   expect(screen.getByText('Firebase')).toBeDefined();
  //   expect(screen.getByText('Firebase')).toHaveTextContent('Firebase');
});
