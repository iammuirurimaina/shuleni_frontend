import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './SignupForm';

describe('SignupForm Component', () => {
  it('renders the SignupForm component', () => {
    render(<SignupForm />);
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<SignupForm />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'Student' } });
    fireEvent.change(screen.getByPlaceholderText('School'), { target: { value: 'Example School' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('Sign Up successful!')).toBeInTheDocument();
    });
  });

  it('shows error message for invalid email', async () => {
    render(<SignupForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalidemail' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('shows error message for password mismatch', async () => {
    render(<SignupForm />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat Password'), { target: { value: 'mismatch' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('Passwords must match')).toBeInTheDocument();
    });
  });

});
