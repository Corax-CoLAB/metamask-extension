import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithLocalization } from '../../../../../test/lib/render-helpers-navigate';
import TokenSearch from './token-search.component';

const mockTokenList = {
  '0x1': {
    data: {
      '0x123': {
        address: '0x123',
        symbol: 'TEST',
        name: 'Test Token',
      },
    },
  },
};

describe('TokenSearch', () => {
  const defaultProps = {
    onSearch: jest.fn(),
    error: null,
    tokenList: mockTokenList,
    searchClassName: 'test-class',
    networkFilter: { '0x1': 'Ethereum' },
    setSearchResults: jest.fn(),
    chainId: '0x1',
  };

  it('renders and searches correctly', async () => {
    const { getByPlaceholderText } = renderWithLocalization(
      <TokenSearch {...defaultProps} />,
    );

    // Using regex for flexibility with i18n
    const input = getByPlaceholderText(/search/iu);

    fireEvent.change(input, { target: { value: 'TEST' } });

    await waitFor(() => {
      expect(defaultProps.onSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          newSearchQuery: 'TEST',
          results: expect.arrayContaining([
            expect.objectContaining({ symbol: 'TEST' }),
          ]),
        }),
      );
    });
  });
});
