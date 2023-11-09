import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom'; // Adjust the import path based on your project structure
import AddUsers from '../AddUsers';

describe('AddUsers Component', () => {
  it('renders the component', () => {
    render(<AddUsers />);
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: 'Sign Up successful!' }),
    });

    render(<AddUsers />);
    
    userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Phone'), '1234567890');
    userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    userEvent.type(screen.getByPlaceholderText('Repeat Password'), 'password123');
    userEvent.selectOptions(screen.getByLabelText('Role'), 'Facilitator');
    userEvent.type(screen.getByPlaceholderText('School'), 'Example School');

    fireEvent.click(screen.getByText('Add'));

    await act(async () => {
      expect(screen.getByText('Sign Up successful!')).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });

  it('displays error message for already registered user', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    render(<AddUsers />);
    
    userEvent.type(screen.getByPlaceholderText('Email'), 'user1@example.com');
    fireEvent.click(screen.getByText('Add'));

    await act(async () => {
      expect(screen.getByText('User already registered with this email.')).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });

  it('displays error message for failed form submission', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: 'Sign Up failed!' }),
    });

    render(<AddUsers />);
    
    userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    fireEvent.click(screen.getByText('Add'));

    await act(async () => {
      expect(screen.getByText('Sign Up failed!')).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });

});
