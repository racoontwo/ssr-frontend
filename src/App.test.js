import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.js';
import ShowDocs from './components/ShowDocs';
// import ShowOne from './components/ShowOne';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Home page/i);
    expect(linkElement).toBeInTheDocument();
});



// describe('ShowDocs Component', () => {
//     const setPageMock = jest.fn();
//     const setSelectedItemMock = jest.fn();

//     beforeEach(() => {
//         jest.clearAllMocks();
//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () =>
//                     Promise.resolve({
//                         data: [
//                             { title: 'Document 1', id: 1 },
//                             { title: 'Document 2', id: 2 },
//                         ],
//                     }),
//             }),
//         );
//     });

//     afterEach(() => {
//         jest.restoreAllMocks();
//     });

//     test('calls changeParentState checks if riht item clicked', async () => {
//         render(<ShowDocs setPage={setPageMock} setSelectedItem={setSelectedItemMock} />);

//         const document1 = await screen.findByText('Document 1');
//         const document2 = await screen.findByText('Document 2');

//         fireEvent.click(document1);
//         fireEvent.click(document2);

//         expect(setSelectedItemMock).toHaveBeenCalledWith({
//             title: 'Document 1',
//             id: 1,
//         });
//         expect(setSelectedItemMock).toHaveBeenCalledWith({
//             title: 'Document 2',
//             id: 2,
//         });
//         expect(setPageMock).toHaveBeenCalledWith('showone');
//     });
// });

// global.fetch = jest.fn(() =>
//     Promise.resolve({
//         json: () => Promise.resolve({ message: 'Document updated successfully' }),
//     }),
// );

// describe('ShowOne Component', () => {
//     const mockItem = {
//         _id: '123',
//         title: 'TestDocument',
//         content: 'testcontent',
//     };

//     beforeEach(() => {
//         fetch.mockClear();
//     });

//     test('handles form input change', () => {
//         render(<ShowOne item={mockItem} />);

//         const titleInput = screen.getByLabelText(/Title:/i);
//         const contentInput = screen.getByLabelText(/Content:/i);

//         // Simulate typing into the form inputs
//         fireEvent.change(titleInput, {
//             target: { name: 'title', value: 'Updated Title' },
//         });
//         fireEvent.change(contentInput, {
//             target: { name: 'content', value: 'Updated Content' },
//         });

//         // Check if the inputs have the updated values
//         expect(titleInput.value).toBe('Updated Title');
//         expect(contentInput.value).toBe('Updated Content');
//     });

//     test('submits the form and calls the backend', async () => {
//         render(<ShowOne item={mockItem} />);

//         const titleInput = screen.getByLabelText(/Title:/i);
//         const contentInput = screen.getByLabelText(/Content:/i);
//         const submitButton = screen.getByRole('button', { name: /update/i });

//         // Simulate typing into the form inputs
//         fireEvent.change(titleInput, {
//             target: { name: 'title', value: 'Updated Title' },
//         });
//         fireEvent.change(contentInput, {
//             target: { name: 'content', value: 'Updated Content' },
//         });

//         // Simulate form submission
//         fireEvent.click(submitButton);

//         // Wait for the fetch call to be made
//         await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

//         // Check if fetch was called with the correct arguments
//         expect(fetch).toHaveBeenCalledWith('https://jsramverk-editor-olrs23-g3bthketdnh3bag4.northeurope-01.'
//                 +'azurewebsites.net/posts/update_docs', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 _id: '123',
//                 title: 'Updated Title',
//                 content: 'Updated Content',
//             }),
//         });
//     });
// });


// describe('ShowDocs Component', () => {
//     const setPageMock = jest.fn();
//     const setSelectedItemMock = jest.fn();

//     beforeEach(() => {
//         jest.clearAllMocks();
//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () =>
//                     Promise.resolve({
//                         data: [
//                             { title: 'Document 1', id: 1 },
//                             { title: 'Document 2', id: 2 },
//                         ],
//                     }),
//             }),
//         );
//     });

//     afterEach(() => {
//         jest.restoreAllMocks();
//     });

//     test('calls changeParentState checks if riht item clicked', async () => {
//         render(<ShowDocs setPage={setPageMock} setSelectedItem={setSelectedItemMock} />);

//         const document1 = await screen.findByText('Document 1');
//         const document2 = await screen.findByText('Document 2');

//         fireEvent.click(document1);
//         fireEvent.click(document2);

//         expect(setSelectedItemMock).toHaveBeenCalledWith({
//             title: 'Document 1',
//             id: 1,
//         });
//         expect(setSelectedItemMock).toHaveBeenCalledWith({
//             title: 'Document 2',
//             id: 2,
//         });
//         expect(setPageMock).toHaveBeenCalledWith('showone');
//     });
// });

// global.fetch = jest.fn(() =>
//     Promise.resolve({
//         json: () => Promise.resolve({ message: 'Document updated successfully' }),
//     }),
// );

// describe('ShowOne Component', () => {
//     const mockItem = {
//         _id: '123',
//         title: 'TestDocument',
//         content: 'testcontent',
//     };

//     beforeEach(() => {
//         fetch.mockClear();
//     });

//     test('handles form input change', () => {
//         render(<ShowOne item={mockItem} />);

//         const titleInput = screen.getByLabelText(/Title:/i);
//         const contentInput = screen.getByLabelText(/Content:/i);

//         // Simulate typing into the form inputs
//         fireEvent.change(titleInput, {
//             target: { name: 'title', value: 'Updated Title' },
//         });
//         fireEvent.change(contentInput, {
//             target: { name: 'content', value: 'Updated Content' },
//         });

//         // Check if the inputs have the updated values
//         expect(titleInput.value).toBe('Updated Title');
//         expect(contentInput.value).toBe('Updated Content');
//     });

//     test('submits the form and calls the backend', async () => {
//         render(<ShowOne item={mockItem} />);

//         const titleInput = screen.getByLabelText(/Title:/i);
//         const contentInput = screen.getByLabelText(/Content:/i);
//         const submitButton = screen.getByRole('button', { name: /update/i });

//         // Simulate typing into the form inputs
//         fireEvent.change(titleInput, {
//             target: { name: 'title', value: 'Updated Title' },
//         });
//         fireEvent.change(contentInput, {
//             target: { name: 'content', value: 'Updated Content' },
//         });

//         // Simulate form submission
//         fireEvent.click(submitButton);

//         // Wait for the fetch call to be made
//         await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

//         // Check if fetch was called with the correct arguments
//         expect(fetch).toHaveBeenCalledWith('https://jsramverk-editor-olrs23-g3bthketdnh3bag4.northeurope-01.'
//                 +'azurewebsites.net/posts/update_docs', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 _id: '123',
//                 title: 'Updated Title',
//                 content: 'Updated Content',
//             }),
//         });
//     });
// });
