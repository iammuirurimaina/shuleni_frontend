import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom'; // Adjust the import path based on your project structure
import Users from '../Users';

describe('Users Component', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Facilitator',
      school: 'Example School',
      phone: '1234567890',
      email: 'john@example.com',
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'Student',
      school: 'Another School',
      phone: '9876543210',
      email: 'jane@example.com',
    },
  ];

  it('renders the component', () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('displays users data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockUsers),
    });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await act(async () => {
      // Wait for the data fetching to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Facilitator')).toBeInTheDocument();
    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('Example School')).toBeInTheDocument();
    expect(screen.getByText('Another School')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('9876543210')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it('filters users based on search term', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockUsers),
    });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await act(async () => {
      // Wait for the data fetching to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Type 'John' in the search input
    userEvent.type(screen.getByPlaceholderText('Search...'), 'John');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();

    // Clear the search input
    userEvent.clear(screen.getByPlaceholderText('Search...'));

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

});
