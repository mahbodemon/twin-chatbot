import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from '../components/Chat';
import { describe, it, expect, vi } from 'vitest';
import * as api from '../services/api';

describe('Chat', () => {
  it('renders chat component and sends a message', async () => {
    const sendMessageSpy = vi.spyOn(api, 'sendMessage').mockResolvedValue({ data: { reply: 'Hello there' } });

    render(<Chat />);
    
    const input = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Hi' } });
    fireEvent.click(sendButton);

    expect(await screen.findByText('Hi')).toBeInTheDocument();
    expect(sendMessageSpy).toHaveBeenCalled();
    expect(await screen.findByText('Hello there')).toBeInTheDocument();
  });
});
