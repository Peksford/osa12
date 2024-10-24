import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

describe('Todo Test', () => {
  test('testing single todo', async () => {
    const todo = {
      text: 'testing jest',
      done: false,
    };

    const mockHandlerDelete = jest.fn();
    const mockHandlerComplete = jest.fn();

    render(
      <Todo
        todo={todo}
        deleteTodo={mockHandlerDelete}
        completeTodo={mockHandlerComplete}
      />
    );
    // screen.debug();
    const element = screen.getByText('testing jest');
    screen.debug(element);
    expect(element).toHaveTextContent('testing jest');

    const user = userEvent.setup();
    const deleteButton = screen.getByText('Delete');
    await user.click(deleteButton);
    expect(mockHandlerDelete.mock.calls).toHaveLength(1);

    const completeButton = screen.getByText('Set as done');
    await user.click(completeButton);
    expect(mockHandlerComplete.mock.calls).toHaveLength(1);
  });
});
