import React from 'react';
import { Tooltip, Button} from '@material-ui/core';
import { fade} from '@material-ui/core/styles/colorManipulator';

interface ActionButtonProps {
  tooltip: React.ReactElement | string | number;
  ariaLabel: string;
  icon: JSX.Element;
  disabled?: boolean;
  innerRef?: React.RefObject<HTMLButtonElement>;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  tooltip,
  icon,
  onClick,
  ariaLabel,
  disabled,
  innerRef,
  children,
}) => {
  const showTooltip = !!tooltip;
  return (
    <Tooltip
      placement="bottom"
      disableHoverListener={!showTooltip}
      disableFocusListener={!showTooltip}
      disableTouchListener={!showTooltip}
      title={tooltip}
    >
      <span>
        <Button
          onClick={onClick}
          disabled={!!disabled}
          aria-label={ariaLabel}
          tabIndex={-1}
          innerRef={innerRef}
          style={{ position: 'relative', color: disabled ? fade('rgba( 255, 255, 255, 1)', 0.6) : 'white' }}
        >
          {icon}
          {children !== undefined ? <>&nbsp;{children}</> : null}
        </Button>
      </span>
    </Tooltip>
  );
};

export default ActionButton;
