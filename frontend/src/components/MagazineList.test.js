/* eslint-disable testing-library/prefer-find-by */
import { render, screen, waitFor } from '@testing-library/react';
import MagazineList from './MagazineList';
import axios from "axios";

jest.mock('axios');


test('fetches and displays magazines', async () => {
  const magazines = [{ name: 'Test Magazine', description: 'Test Description', price: 10 }];
  jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: magazines })),
    default: jest.fn(() => Promise.resolve({ data: {} })),
  }));
  axios.get.mockImplementation(() => Promise.resolve({ data: magazines }));
  // axios.get.mockResolvedValue({ data: magazines });

  render(<MagazineList />);

  const listItem = await waitFor(() => screen.getByText(/Test Magazine/i));

  expect(listItem).toBeInTheDocument();
});