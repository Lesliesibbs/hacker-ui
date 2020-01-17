// @pragma export
import React, { forwardRef } from 'react';
import { transparentize } from 'polished';
import BaseButton from './BaseButton';
import { PropsOf } from './types';
import createStyles, { StyleProps } from './createStyles';

const useStyles = createStyles(({ css, theme, color }) => ({
  root: css`
    background-color: ${color.asBackground};
    color: ${color.bgContrast};
    border: 2px solid transparent;
    transition: background-color ${theme.durations.standard}ms,
      border ${theme.durations.standard}ms;

    &:focus {
      background-color: ${transparentize(0.18, color.asBackground)};
      border: 2px solid ${transparentize(0.7, '#fff')};
    }
    &:hover {
      background-color: ${transparentize(0.23, color.asBackground)};
    }
    &:active {
      background-color: ${transparentize(0.3, color.asBackground)};
      border: 2px solid ${transparentize(0.5, '#fff')};
    }
    &:disabled {
      background-color: ${transparentize(0.5, color.asBackground)};
      border: 2px solid transparent;
      color: ${transparentize(0.2, color.bgContrast)};
    }
  `,
}));

type BaseButtonProps = PropsOf<typeof BaseButton>;
interface Props extends StyleProps<typeof useStyles>, BaseButtonProps {}

const FilledButton = forwardRef(
  (props: Props, ref: React.Ref<HTMLButtonElement>) => {
    const { Root, styles, ...restOfProps } = useStyles(props, BaseButton);
    return <Root ref={ref as any} {...restOfProps} />;
  },
);

export default FilledButton;
