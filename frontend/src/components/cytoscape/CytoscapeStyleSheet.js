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

export const selectedLabel = {
  node: {},
  edge: {},
};

const getLabel = (ele, captionProp) => {
  if (captionProp === 'gid') {
    if (ele.isNode()) {
      selectedLabel.node[ele.data('label')] = 'gid';
    } else {
      selectedLabel.edge[ele.data('label')] = 'gid';
    }
    return `${ele.data('id')}`;
  } if (captionProp === 'label') {
    if (ele.isNode()) {
      selectedLabel.node[ele.data('label')] = 'label';
    } else {
      selectedLabel.edge[ele.data('label')] = 'label';
    }
    return `${ele.data('label')}`;
  }
  const props = ele.data('properties');
  if (props[captionProp] === undefined) {
    return '';
  }
  if (ele.isNode()) {
    selectedLabel.node[ele.data('label')] = captionProp;
  } else {
    selectedLabel.edge[ele.data('label')] = captionProp;
  }
  return props[captionProp];
};

export const stylesheet = [
  // ═══════════════════════════════════════════════════════════
  // NODE STYLES - Clean design with subtle depth
  // ═══════════════════════════════════════════════════════════
  {
    selector: 'node',
    style: {
      // Size
      width(ele) { return ele ? ele.data('size') : 55; },
      height(ele) { return ele ? ele.data('size') : 55; },

      // Shape & Colors
      shape: 'ellipse',
      'background-color': function (ele) { return ele ? ele.data('backgroundColor') : '#6366F1'; },
      'background-opacity': 1,

      // Border - subtle glow effect
      'border-width': '3px',
      'border-color': function (ele) { return ele ? ele.data('borderColor') : '#4F46E5'; },
      'border-opacity': 0.8,

      // Shadow for depth (using overlay)
      'overlay-padding': '6px',
      'overlay-opacity': 0,

      // Label styling
      label(ele) {
        const captionProp = ele.data('caption');
        return getLabel(ele, captionProp);
      },
      'text-valign': 'center',
      'text-halign': 'center',
      color(ele) { return ele ? ele.data('fontColor') : '#FFFFFF'; },
      'font-family': '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'font-size': '11px',
      'font-weight': '500',
      'text-wrap': 'ellipsis',
      'text-max-width': function (ele) { return ele ? ele.data('size') - 10 : 45; },
      'text-outline-width': '0px',
      'text-outline-color': 'transparent',

      // Transitions for smooth interactions
      'transition-property': 'border-width, border-color, overlay-opacity, background-opacity',
      'transition-duration': '0.15s',
      'transition-timing-function': 'ease-out',

      // Z-index for layering
      'z-index': 10,
    },
  },

  // Node hover state - subtle highlight
  {
    selector: 'node.highlight',
    style: {
      'border-width': '4px',
      'border-color': '#22D3EE',
      'border-opacity': 1,
      'overlay-opacity': 0.08,
      'overlay-color': '#22D3EE',
      'z-index': 20,
    },
  },

  // Node selected state - prominent highlight
  {
    selector: 'node:selected',
    style: {
      'border-width': '4px',
      'border-color': '#06B6D4',
      'border-opacity': 1,
      'overlay-opacity': 0.12,
      'overlay-color': '#06B6D4',
      'z-index': 30,
    },
  },

  // Locked/pinned node indicator
  {
    selector: 'node:locked',
    style: {
      'border-style': 'double',
      'border-width': '4px',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // EDGE STYLES - Elegant curves with clear directionality
  // ═══════════════════════════════════════════════════════════
  {
    selector: 'edge',
    style: {
      // Line styling
      width(ele) { return ele ? Math.max(ele.data('size'), 1.5) : 2; },
      'line-color': function (ele) { return ele ? ele.data('backgroundColor') : '#94A3B8'; },
      'line-opacity': 0.75,
      'line-cap': 'round',

      // Curve style - bezier for better aesthetics
      'curve-style': 'bezier',
      'control-point-step-size': 40,

      // Arrow styling
      'target-arrow-shape': 'triangle',
      'target-arrow-color': function (ele) { return ele ? ele.data('backgroundColor') : '#94A3B8'; },
      'arrow-scale': 1.2,

      // Label styling
      label(ele) {
        const captionProp = ele.data('caption');
        return getLabel(ele, captionProp);
      },
      'font-family': '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'font-size': '10px',
      'font-weight': '500',
      color(ele) { return ele ? ele.data('fontColor') : '#475569'; },
      'text-rotation': 'autorotate',
      'text-margin-y': -8,

      // Label background
      'text-background-color': '#FFFFFF',
      'text-background-opacity': 0.9,
      'text-background-padding': '4px',
      'text-background-shape': 'roundrectangle',

      // Border around label
      'text-border-width': 1,
      'text-border-color': '#E2E8F0',
      'text-border-opacity': 0.8,

      // Transitions
      'transition-property': 'line-color, target-arrow-color, width, line-opacity',
      'transition-duration': '0.15s',
      'transition-timing-function': 'ease-out',

      // Z-index
      'z-index': 1,
    },
  },

  // Edge hover state
  {
    selector: 'edge.highlight',
    style: {
      width(ele) { return ele ? Math.max(ele.data('size'), 1.5) + 1 : 3; },
      'line-color': '#22D3EE',
      'line-opacity': 1,
      'target-arrow-color': '#22D3EE',
      'z-index': 5,
    },
  },

  // Edge selected state
  {
    selector: 'edge:selected',
    style: {
      width(ele) { return ele ? Math.max(ele.data('size'), 1.5) + 1.5 : 3.5; },
      'line-color': '#06B6D4',
      'line-opacity': 1,
      'target-arrow-color': '#06B6D4',
      'z-index': 6,
    },
  },

  // ═══════════════════════════════════════════════════════════
  // SPECIAL STATES
  // ═══════════════════════════════════════════════════════════

  // New elements (just added) - subtle pulse effect via class
  {
    selector: '.new',
    style: {
      'overlay-opacity': 0.15,
      'overlay-color': '#10B981',
    },
  },

  // Filtered/dimmed elements
  {
    selector: '.g-filtered',
    style: {
      opacity: 1,
    },
  },

  // Faded elements (when filtering)
  {
    selector: '.faded',
    style: {
      opacity: 0.25,
    },
  },

  // Parent/compound nodes (if used)
  {
    selector: ':parent',
    style: {
      'background-opacity': 0.1,
      'border-width': '2px',
      'border-style': 'dashed',
      'text-valign': 'top',
      'text-halign': 'center',
      padding: '20px',
    },
  },
];
