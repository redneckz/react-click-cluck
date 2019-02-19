import * as React from 'react';
import { ClickCluck } from '@redneckz/click-cluck';

export function clickCluck(timeout = 500) {
  return (DOMComponent) => {
    class ClickCluckedComponent extends React.Component {
      getClickHandlers() {
        const { onclick, ondblclick } = this;
        return {
          onClick: onclick,
          onDoubleClick: ondblclick,
        };
      }

      updateClickHandlers() {
        const { onClick, onDoubleClick } = this.props;
        if (!this.clickClucked) {
          this.clickClucked = ClickCluck(this, timeout);
        }
        this.clickClucked.onclick = onClick;
        this.clickClucked.ondblclick = onDoubleClick;
      }

      render() {
        const { forwardedRef, ...props } = this.props;
        this.updateClickHandlers();
        return (
          <DOMComponent
            ref={forwardedRef}
            {...props}
            {...this.getClickHandlers()}
          />
        );
      }
    }
    ClickCluckedComponent.displayName = `clickCluck(${
      DOMComponent.displayName || DOMComponent.name || DOMComponent
    })`;
    return React.forwardRef(
      (props, ref) => <ClickCluckedComponent {...props} forwardedRef={ref} />,
    );
  };
}
