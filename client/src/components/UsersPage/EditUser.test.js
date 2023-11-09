import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom'; // Adjust the import path based on your project structure
import EditUsers from '../EditUsers';

describe('EditUsers Component', () => {
  const mockUserData = {
    name: 'John Doe',
    phone: '1234567890',
    email: 'john@example.com',
    role: 'Facilitator',
    school: 'Example School',
  };

  it('renders the component', () => {
    render(
      <MemoryRouter initialEntries={['/users/edit/1']}>
        <Route path="/users/edit/:id">
          <EditUsers />
        </Route>
      </MemoryRouter>
    );
    expect(screen.getByText('Edit User')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockUserData),
    });

    render(
      <MemoryRouter initialEntries={['/users/edit/1']}>
        <Route path="/users/edit/:id">
          <EditUsers />
        </Route>
      </MemoryRouter>
    );

    await act(async () => {
      expect(screen.getByPlaceholderText('Name')).toHaveValue(mockUserData.name);
      expect(screen.getByPlaceholderText('Phone')).toHaveValue(mockUserData.phone);
      expect(screen.getByPlaceholderText('Email')).toHaveValue(mockUserData.email);
      expect(screen.getByLabelText('Role')).toHaveValue(mockUserData.role);
      expect(screen.getByPlaceholderText('School')).toHaveValue(mockUserData.school);

      fireEvent.click(screen.getByText('Update'));

      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('User data updated successfully!')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it('displays error message for failed form submission', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: 'Update failed!' }),
    });

    render(
      <MemoryRouter initialEntries={['/users/edit/1']}>
        <Route path="/users/edit/:id">
          <EditUsers />
        </Route>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Update'));

      // Wait for the form submission to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('An error occurred while updating the user.')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

});
