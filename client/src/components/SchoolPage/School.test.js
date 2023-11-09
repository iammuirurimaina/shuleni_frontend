import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom'; // Adjust the import path based on your project structure
import Schools from '../Schools';

describe('Schools Component', () => {
  it('renders the component', () => {
    render(
      <MemoryRouter initialEntries={['/schools']}>
        <Route path="/schools">
          <Schools />
        </Route>
      </MemoryRouter>
    );
    expect(screen.getByText('Schools')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    render(
      <MemoryRouter initialEntries={['/schools']}>
        <Route path="/schools">
          <Schools />
        </Route>
      </MemoryRouter>
    );

    await act(async () => {
      userEvent.type(screen.getByPlaceholderText('Search...'), 'Example School');
    });

    expect(screen.getByText('No records found.')).toBeInTheDocument();
  });

  it('handles print functionality', async () => {
    const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});
    
    render(
      <MemoryRouter initialEntries={['/schools']}>
        <Route path="/schools">
          <Schools />
        </Route>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Print'));
    });

    expect(printSpy).toHaveBeenCalledTimes(1);
    printSpy.mockRestore();
  });

});
