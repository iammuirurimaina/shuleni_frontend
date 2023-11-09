import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  it('renders the LoginForm component', () => {
    render(<LoginForm />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<MemoryRouter><LoginForm /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'Student' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeDefined();
    });
  });

  it('shows error message for invalid login', async () => {
    render(<MemoryRouter><LoginForm /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email, password, or role')).toBeInTheDocument();
    });
  });

});
