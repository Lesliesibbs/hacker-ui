import React, { forwardRef, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { transparentize } from 'polished';
import createDynamicColorPalette from './createDynamicColorPalette';
import FormControlContext from './FormControlContext';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';
import CheckIcon from './CheckIcon';

const useStyles = createStyles(({ css, color, theme, givenSurface }) => {
  const bland = createDynamicColorPalette(theme.colors.bland, givenSurface);
  const danger = createDynamicColorPalette(theme.colors.danger, givenSurface);

  const width = theme.space(2);
  const height = theme.space(2);

  const widthSmall = theme.space(1.5);
  const heightSmall = theme.space(1.5);

  const widthLarge = theme.space(2.5);
  const heightLarge = theme.space(2.5);

  return {
    root: css`
      position: relative;
      margin: ${theme.space(0.5)} 0;
    `,
    checkbox: css`
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid red;

      &:focus ~ .facade {
        border: 2px solid ${color.asBackground};
      }
      &:hover ~ .facade {
        border: 2px solid ${transparentize(0.3, color.asBackground)};
        background-color: ${transparentize(0.95, color.asBackground)};
      }
      &:active ~ .facade {
        background-color: ${transparentize(0.9, color.asBackground)};
      }

      &:disabled ~ .facade {
        cursor: not-allowed;
        border: 2px solid ${transparentize(0.7, bland.asBackground)};
        background-color: ${transparentize(0.9, bland.asBackground)};
      }

      &:checked ~ .facade .icon {
        opacity: 1;
      }
    `,
    checkboxStandard: css`
      width: ${width};
      height: ${height};
    `,
    checkboxSmall: css`
      width: ${widthSmall};
      height: ${heightSmall};
    `,
    checkboxLarge: css`
      width: ${widthLarge};
      height: ${heightLarge};
    `,
    focused: css`
      color: ${color.asBackground};
    `,
    hasError: css``,
    facade: css`
      width: ${width};
      height: ${height};
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
      background-color: white;
      transition: border ${theme.durations.standard}ms,
        background-color ${theme.durations.standard}ms;
      border: 2px solid ${bland.asBackground};
      background-color: ${givenSurface};
    `,
    facadeSmall: css`
      width: ${widthSmall};
      height: ${heightSmall};
    `,
    facadeStandard: css`
      width: ${width};
      height: ${height};
    `,
    facadeLarge: css`
      width: ${widthLarge};
      height: ${heightLarge};
    `,
    facadeFocused: css``,
    facadeError: css`
      background-color: ${givenSurface};
      border: 2px solid ${danger.onSurface};
    `,
    icon: css`
      width: 1rem;
      height: 1rem;
      fill: currentColor;
      opacity: 0;
      pointer-events: none;
    `,
  };
});

type InputProps = Omit<JSX.IntrinsicElements['input'], 'size'>;
interface Props extends PropsFromStyles<typeof useStyles>, InputProps {
  focused?: boolean;
  hasError?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  icon?: ReactComponent;
  size?: 'small' | 'standard' | 'large';
}

const Checkbox = forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    Root,
    styles,
    id: incomingId,
    focused: incomingFocused,
    hasError: incomingHasError,
    onFocus,
    onBlur,
    inputRef,
    icon: Icon = CheckIcon,
    size = 'standard',
    ...restOfProps
  } = useStyles(props, 'div');
  const formControlContext = useContext(FormControlContext);

  const id = incomingId ?? formControlContext?.id;
  const focused = incomingFocused ?? formControlContext?.focused ?? false;
  const hasError = incomingHasError ?? formControlContext?.hasError ?? false;

  useEffect(() => {
    console.log({ focused, hasError });
  }, [focused, hasError]);

  const handleFocus = (e: React.FocusEvent<any>) => {
    if (onFocus) {
      onFocus(e);
    }

    if (formControlContext) {
      formControlContext.setFocused(true);
    }
  };
  const handleBlur = (e: React.FocusEvent<any>) => {
    if (onBlur) {
      onBlur(e);
    }

    if (formControlContext) {
      formControlContext?.setFocused(false);
    }
  };

  return (
    <Root
      ref={ref}
      className={classNames({
        [styles.focused]: focused,
        [styles.hasError]: hasError,
      })}
    >
      <input
        type="checkbox"
        className={classNames(styles.checkbox, {
          [styles.checkboxSmall]: size === 'small',
          [styles.checkboxStandard]: size === 'standard',
          [styles.checkboxLarge]: size === 'large',
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id={id}
        {...restOfProps}
      />
      <div
        aria-hidden
        className={classNames('facade', styles.facade, {
          [styles.facadeFocused]: focused,
          [styles.facadeError]: hasError,
          [styles.facadeSmall]: size === 'small',
          [styles.facadeStandard]: size === 'standard',
          [styles.facadeLarge]: size === 'large',
        })}
      >
        <Icon className={classNames('icon', styles.icon)} />
      </div>
    </Root>
  );
});

export default Checkbox;
