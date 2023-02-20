/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { renderInTestApp } from '@backstage/test-utils';
import React from 'react';
import { Item, SelectComponent } from './Select';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('Select', () => {
  const testLabel = 'Date Select';
  const testItems: Item[] = [
    { label: 'Last month', value: 'lastMonth' },
    { label: 'All', value: 'all' },
  ];

  const user = userEvent.setup();

  it('should render', async () => {
    await renderInTestApp(
      <SelectComponent
        value="lastMonth"
        items={testItems}
        label={testLabel}
        onChange={() => undefined}
      />,
    );
    expect(screen.getAllByText(testLabel)).toHaveLength(2);
  });

  describe("when the user hasn't clicked on it", () => {
    it('should only render the current select item', async () => {
      await renderInTestApp(
        <SelectComponent
          value="lastMonth"
          items={testItems}
          label={testLabel}
          onChange={() => undefined}
        />,
      );
      expect(screen.getByText(testItems[0].label)).toBeInTheDocument();
      expect(screen.queryByText(testItems[1].label)).toBeNull();
    });
  });

  describe('when the user clicked on it', () => {
    it('should render all the items', async () => {
      await renderInTestApp(
        <SelectComponent
          value="lastMonth"
          items={testItems}
          label={testLabel}
          onChange={() => undefined}
        />,
      );
      await user.tab();
      await user.keyboard('{enter}');

      expect(screen.getAllByText(testItems[0].label)).toHaveLength(2);
      expect(screen.getByText(testItems[1].label)).toBeInTheDocument();
    });
  });
});
