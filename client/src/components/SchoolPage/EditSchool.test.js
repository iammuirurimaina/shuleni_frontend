import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom'; // Adjust the import path based on your project structure
import EditSchools from '../EditSchools';

describe('EditSchools Component', () => {
  it('renders the component', () => {
    render(
      <MemoryRouter initialEntries={['/schools/1']}>
        <Route path="/schools/:id">
          <EditSchools />
        </Route>
      </MemoryRouter>
    );
    expect(screen.getByText('Edit School')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    render(
      <MemoryRouter initialEntries={['/schools/1']}>
        <Route path="/schools/:id">
          <EditSchools />
        </Route>
      </MemoryRouter>
    );

    await act(async () => {
      // Fill out the form
      userEvent.type(screen.getByPlaceholderText('School Name'), 'Updated School');
      userEvent.type(screen.getByPlaceholderText('Location'), 'Updated Location');
      userEvent.type(screen.getByPlaceholderText('Poster'), 'Updated Poster');

      // Submit the form
      fireEvent.click(screen.getByText('Update'));
    });

    expect(await screen.findByText('School data updated successfully!')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

});
