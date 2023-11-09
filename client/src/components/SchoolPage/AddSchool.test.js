import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom'; // Adjust the import path based on your project structure
import AddSchool from '../AddSchool';

describe('AddSchool Component', () => {
  it('renders the component', () => {
    render(
      <MemoryRouter>
        <AddSchool />
      </MemoryRouter>
    );
    expect(screen.getByText('Add School')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    render(
      <MemoryRouter>
        <AddSchool />
      </MemoryRouter>
    );

    await act(async () => {
      // Fill out the form
      userEvent.type(screen.getByPlaceholderText('School Name'), 'Sample School');
      userEvent.type(screen.getByPlaceholderText('Location'), 'Sample Location');
      userEvent.type(screen.getByPlaceholderText('Poster'), 'Sample Poster');

      // Submit the form
      fireEvent.click(screen.getByText('Add'));
    });

    expect(await screen.findByText('School Added successfully!')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it('displays error message if school already exists', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    render(
      <MemoryRouter>
        <AddSchool />
      </MemoryRouter>
    );

    await act(async () => {
      // Fill out the form
      userEvent.type(screen.getByPlaceholderText('School Name'), 'Existing School');
      userEvent.type(screen.getByPlaceholderText('Location'), 'Sample Location');
      userEvent.type(screen.getByPlaceholderText('Poster'), 'Sample Poster');

      // Submit the form
      fireEvent.click(screen.getByText('Add'));
    });

    expect(await screen.findByText('School with this name already exists.')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

});


