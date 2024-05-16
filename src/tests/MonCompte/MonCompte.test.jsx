// src/tests/MonCompte/MonCompte.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MonCompte from '../../pages/MonCompte';

// Mocking TextEncoder
global.TextEncoder = require('util').TextEncoder;

// Mocking @react-pdf/renderer
jest.mock('@react-pdf/renderer', () => ({
  Page: ({ children }) => <div>{children}</div>,
  Text: ({ children }) => <p>{children}</p>,
  View: ({ children }) => <div>{children}</div>,
  Document: ({ children }) => <div>{children}</div>,
  StyleSheet: { create: jest.fn() },
  PDFDownloadLink: ({ children }) => <div>{children}</div>,
}));

test('renders user not found message', () => {
  render(<MonCompte />);

  // Vérifier si le message d'utilisateur non trouvé est présent
  const messageElement = screen.getByText('Utilisateur non trouvé');
  expect(messageElement).toBeInTheDocument();
});