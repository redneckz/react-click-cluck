import * as React from 'react';
import { shallow } from 'enzyme';
import { clickCluck } from './click-cluck';

describe('clickCluck HOC', () => { // Integrational spec
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllTimers();
  });

  requirementsFactory();

  function requirementsFactory(eventCreator = event => event) {
    it('should prevent click events preceding dblclick event', () => {
      const Button = clickCluck()('button');
      const onClick = jest.fn();
      const onDoubleClick = jest.fn();
      const wrapper = shallow(
        <Button
          onClick={onClick}
          onDoubleClick={onDoubleClick}
        />,
      );

      const btn = wrapper.dive();
      btn.simulate('click', eventCreator({ detail: 1 })); // First in sequence
      jest.advanceTimersByTime(300); // Not enough time for standalone click
      btn.simulate('click', eventCreator({ detail: 2 })); // Second in sequence
      btn.simulate('doubleClick'); // Finally double click

      jest.runAllTimers();
      expect(onClick).not.toBeCalled();
      expect(onDoubleClick).toBeCalledTimes(1);
    });

    it('should delegate the only click event to target', () => {
      const Button = clickCluck()('button');
      const onClick = jest.fn();
      const wrapper = shallow(
        <Button onClick={onClick} />,
      );

      const btn = wrapper.dive();
      const event = eventCreator({ detail: 1 }); // Event mock
      btn.simulate('click', event);

      jest.runAllTimers();
      expect(onClick).toBeCalledWith(event);
    });

    it('should delegate the only dblclick event to target', () => {
      const Button = clickCluck()('button');
      const onDoubleClick = jest.fn();
      const wrapper = shallow(
        <Button onDoubleClick={onDoubleClick} />,
      );

      const btn = wrapper.dive();
      const event = eventCreator({}); // Event mock
      btn.simulate('doubleClick', event);

      expect(onDoubleClick).toBeCalledWith(event);
    });

    it('should postpone click event according to configured timeout (500ms by default)', () => {
      const Button = clickCluck(
        100, // 100ms
      )('button');
      const onClick = jest.fn();
      const wrapper = shallow(
        <Button onClick={onClick} />,
      );

      const btn = wrapper.dive();
      btn.simulate('click', eventCreator({ detail: 1 }));

      jest.advanceTimersByTime(99); // Not enough time for standalone click
      expect(onClick).not.toBeCalled();

      jest.advanceTimersByTime(1); // 99ms + 1ms
      expect(onClick).toBeCalledTimes(1);
    });
  }

  describe('for old browsers without MouseEvent.detail support', () => {
    requirementsFactory(({ detail, ...rest }) => rest);
  });
});
