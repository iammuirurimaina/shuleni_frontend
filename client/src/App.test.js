import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  it('renders the App component', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('navigates to Schools page', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    userEvent.click(screen.getByText('Schools'));
    expect(screen.getByText('Schools')).toBeInTheDocument();
  });

  it('navigates to Add School page', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    userEvent.click(screen.getByText('Add School'));
    expect(screen.getByText('Add School')).toBeInTheDocument();
  });

  it('navigates to Edit School page', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    userEvent.click(screen.getByText('Edit Schools'));
    expect(screen.getByText('Edit School')).toBeInTheDocument();
  });

  it('navigates to Users page', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    userEvent.click(screen.getByText('Users'));
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('navigates to Add Users page', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    userEvent.click(screen.getByText('Add Users'));
    expect(screen.getByText('Add Users')).toBeInTheDocument();
  });

  it('navigates to Edit Users page', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    userEvent.click(screen.getByText('Edit Users'));
    expect(screen.getByText('Edit Users')).toBeInTheDocument();
  });

});
