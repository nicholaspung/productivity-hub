import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FilledButton } from './index';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import { ReactComponent as RefreshSVG } from '../../assets/icons/refresh.svg';

const HeaderTitleWithLoadingAndButton = ({
  onRefreshAction,
  loading,
  title,
  HeaderComponent,
}) => (
  <div>
    {onRefreshAction ? (
      <div className="h-0 text-right">
        <FilledButton action={onRefreshAction}>
          <RefreshSVG className="w-4 h-auto" />
        </FilledButton>
      </div>
    ) : null}
    {loading && <LoadingSVG className="w-6 h-auto animate-spin absolute" />}
    {title ? (
      <h1 className="text-2xl font-bold text-center">{title}</h1>
    ) : (
      <HeaderComponent />
    )}
  </div>
);

HeaderTitleWithLoadingAndButton.propTypes = {
  onRefreshAction: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string,
  HeaderComponent: PropTypes.element,
};

export default memo(HeaderTitleWithLoadingAndButton);
