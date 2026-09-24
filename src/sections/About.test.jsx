import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import About from './About';
import { PROFILE } from '../data/portfolio';

describe('About', () => {
  it('keeps the phone number hidden until requested', () => {
    render(<About githubProfile={null} />);

    expect(screen.queryByText(PROFILE.phone)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show phone number' }));

    const phoneLink = screen.getByRole('link', { name: PROFILE.phone });
    expect(phoneLink).toHaveAttribute('href', `tel:${PROFILE.phone.replace(/[^\d+]/g, '')}`);
    expect(phoneLink).toHaveFocus();
  });

  it('links to LinkedIn from the hero and the contact card', () => {
    render(<About githubProfile={null} />);

    const links = screen.getAllByRole('link', { name: /linkedin/i });
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).toHaveAttribute('href', PROFILE.linkedin));
  });
});
