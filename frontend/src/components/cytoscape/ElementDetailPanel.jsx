/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ElementDetailPanel = ({ element, onClose }) => {
  if (!element) return null;

  const isEdge = !!element.source;
  const { properties } = element;

  const renderPropertyValue = (value) => {
    if (value === null || value === undefined) {
      return <span className="element-panel-null">null</span>;
    }
    if (typeof value === 'object') {
      return (
        <pre className="element-panel-json">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }
    if (typeof value === 'boolean') {
      return <span className="element-panel-boolean">{value.toString()}</span>;
    }
    if (typeof value === 'number') {
      return <span className="element-panel-number">{value}</span>;
    }
    return <span className="element-panel-string">{value}</span>;
  };

  return (
    <div className="element-detail-panel">
      <div className="element-panel-header">
        <div className="element-panel-title">
          <Badge
            pill={!isEdge}
            style={{
              backgroundColor: element.backgroundColor,
              color: element.fontColor,
            }}
          >
            {element.label}
          </Badge>
          <span className="element-panel-type">
            {isEdge ? 'Edge' : 'Node'}
          </span>
        </div>
        <button
          type="button"
          className="element-panel-close"
          onClick={onClose}
          aria-label="Close panel"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="element-panel-content">
        <div className="element-panel-section">
          <div className="element-panel-section-title">Identity</div>
          <div className="element-panel-property">
            <span className="element-panel-key">id</span>
            <span className="element-panel-value element-panel-number">{element.id}</span>
          </div>
          <div className="element-panel-property">
            <span className="element-panel-key">label</span>
            <span className="element-panel-value element-panel-string">{element.label}</span>
          </div>
          {isEdge && (
            <>
              <div className="element-panel-property">
                <span className="element-panel-key">source</span>
                <span className="element-panel-value element-panel-number">{element.source}</span>
              </div>
              <div className="element-panel-property">
                <span className="element-panel-key">target</span>
                <span className="element-panel-value element-panel-number">{element.target}</span>
              </div>
            </>
          )}
        </div>

        {properties && Object.keys(properties).length > 0 && (
          <div className="element-panel-section">
            <div className="element-panel-section-title">Properties</div>
            {Object.entries(properties).map(([key, value]) => (
              <div key={key} className="element-panel-property">
                <span className="element-panel-key">{key}</span>
                <div className="element-panel-value">
                  {renderPropertyValue(value)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="element-panel-section">
          <div className="element-panel-section-title">Raw JSON</div>
          <pre className="element-panel-raw-json">
            {JSON.stringify(element, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

ElementDetailPanel.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // eslint-disable-next-line react/forbid-prop-types
    properties: PropTypes.objectOf(PropTypes.any),
  }),
  onClose: PropTypes.func.isRequired,
};

ElementDetailPanel.defaultProps = {
  element: null,
};

export default ElementDetailPanel;
