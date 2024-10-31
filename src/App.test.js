import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.js';
import ShowDocs from './components/ShowDocs';
import '@testing-library/jest-dom';

test('Find correct text on home page', () => {
    render(<App />);
    const linkElement = screen.getByText(/Home page/i);
    expect(linkElement).toBeInTheDocument();
});

global.fetch = jest.fn();

describe('ShowDocs Component', () => {
    const mockSetPage = jest.fn();
    const mockSetSelectedItem = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('display a list of documents on succeeded fetch', async () => {
        const mockData = {
            data: {
                documents: [
                    { _id: '1', title: 'Test document 1', content: 'Content 1' },
                    { _id: '2', title: 'Test document 2', content: 'Content 2' },
                ],
            },
        };
    
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });
    
        render(<ShowDocs setPage={mockSetPage} setSelectedItem={mockSetSelectedItem} />);
    
        await waitFor(() => screen.getByText(/Sparade dokument/i));
        
        expect(screen.getByText('Test document 1')).toBeInTheDocument();
        expect(screen.getByText('Test document 2')).toBeInTheDocument();
    });

    test('display an error message on failed fetch', async () => {
        fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
        
        render(<ShowDocs setPage={mockSetPage} setSelectedItem={mockSetSelectedItem} />);
        
        await waitFor(() => screen.getByText(/Error: Failed to fetch/i));
        expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
    });
});
