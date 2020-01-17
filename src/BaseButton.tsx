// @pragma export
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import createStyles, { PropsFromStyles } from './createStyles';

const useStyles = createStyles(({ css, theme, color }) => ({
  root: css`
    ${theme.fonts.button}
    color: ${color.onSurface};
    padding: ${theme.space(0.75)} ${theme.space(1)};
    appearance: none;
    outline: none;
    border: none;
    min-width: ${theme.block(1)};
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  `,
  small: css`
    padding: ${theme.space(0.5)} ${theme.space(0.75)};
  `,
  large: css`
    padding: ${theme.space(1)} ${theme.space(1.25)};
    min-width: ${theme.block(1.5)};
  `,
}));

type ButtonProps = JSX.IntrinsicElements['button'];

interface Props extends PropsFromStyles<typeof useStyles>, ButtonProps {
  size?: 'small' | 'standard' | 'large';
}

const Button = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => {
  const { Root, styles, size, ...restOfProps } = useStyles(props, 'button');
  return (
    <Root
      className={classNames({
        [styles.small]: size === 'small',
        [styles.large]: size === 'large',
      })}
      ref={ref}
      {...restOfProps}
    />
  );
});

export default Button;
