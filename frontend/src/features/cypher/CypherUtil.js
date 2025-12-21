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

// Color palette with better contrast and visual harmony
// Using Tailwind-inspired colors for a contemporary look
export const nodeLabelColors = [
  // Indigo - Primary
  {
    color: '#6366F1', borderColor: '#4F46E5', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 0,
  },
  // Emerald - Success/Growth
  {
    color: '#10B981', borderColor: '#059669', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 1,
  },
  // Amber - Warning/Attention
  {
    color: '#F59E0B', borderColor: '#D97706', fontColor: '#1F2937', nodeLabels: new Set([]), index: 2,
  },
  // Rose - Important/Alert
  {
    color: '#F43F5E', borderColor: '#E11D48', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 3,
  },
  // Cyan - Information
  {
    color: '#06B6D4', borderColor: '#0891B2', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 4,
  },
  // Violet - Creative
  {
    color: '#8B5CF6', borderColor: '#7C3AED', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 5,
  },
  // Orange - Energy
  {
    color: '#F97316', borderColor: '#EA580C', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 6,
  },
  // Teal - Balance
  {
    color: '#14B8A6', borderColor: '#0D9488', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 7,
  },
  // Pink - Soft highlight
  {
    color: '#EC4899', borderColor: '#DB2777', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 8,
  },
  // Sky - Calm
  {
    color: '#0EA5E9', borderColor: '#0284C7', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 9,
  },
  // Lime - Fresh
  {
    color: '#84CC16', borderColor: '#65A30D', fontColor: '#1F2937', nodeLabels: new Set([]), index: 10,
  },
  // Slate - Neutral
  {
    color: '#64748B', borderColor: '#475569', fontColor: '#FFFFFF', nodeLabels: new Set([]), index: 11,
  },
];

// Edge colors - slightly muted versions for better visual hierarchy
export const edgeLabelColors = [
  // Slate - Default neutral
  {
    color: '#64748B', borderColor: '#475569', fontColor: '#1F2937', edgeLabels: new Set([]), index: 0,
  },
  // Indigo
  {
    color: '#818CF8', borderColor: '#6366F1', fontColor: '#1F2937', edgeLabels: new Set([]), index: 1,
  },
  // Emerald
  {
    color: '#34D399', borderColor: '#10B981', fontColor: '#1F2937', edgeLabels: new Set([]), index: 2,
  },
  // Amber
  {
    color: '#FBBF24', borderColor: '#F59E0B', fontColor: '#1F2937', edgeLabels: new Set([]), index: 3,
  },
  // Rose
  {
    color: '#FB7185', borderColor: '#F43F5E', fontColor: '#1F2937', edgeLabels: new Set([]), index: 4,
  },
  // Cyan
  {
    color: '#22D3EE', borderColor: '#06B6D4', fontColor: '#1F2937', edgeLabels: new Set([]), index: 5,
  },
  // Violet
  {
    color: '#A78BFA', borderColor: '#8B5CF6', fontColor: '#1F2937', edgeLabels: new Set([]), index: 6,
  },
  // Orange
  {
    color: '#FB923C', borderColor: '#F97316', fontColor: '#1F2937', edgeLabels: new Set([]), index: 7,
  },
  // Teal
  {
    color: '#2DD4BF', borderColor: '#14B8A6', fontColor: '#1F2937', edgeLabels: new Set([]), index: 8,
  },
  // Pink
  {
    color: '#F472B6', borderColor: '#EC4899', fontColor: '#1F2937', edgeLabels: new Set([]), index: 9,
  },
  // Sky
  {
    color: '#38BDF8', borderColor: '#0EA5E9', fontColor: '#1F2937', edgeLabels: new Set([]), index: 10,
  },
  // Lime
  {
    color: '#A3E635', borderColor: '#84CC16', fontColor: '#1F2937', edgeLabels: new Set([]), index: 11,
  },
];

export const nodeLabelSizes = [
  { size: 25, labels: new Set([]), index: 0 },
  { size: 50, labels: new Set([]), index: 0 },
  { size: 75, labels: new Set([]), index: 0 },
  { size: 100, labels: new Set([]), index: 0 },
  { size: 125, labels: new Set([]), index: 0 },
];

export const edgeLabelSizes = [
  { size: 1, labels: new Set([]), index: 0 },
  { size: 6, labels: new Set([]), index: 0 },
  { size: 11, labels: new Set([]), index: 0 },
  { size: 16, labels: new Set([]), index: 0 },
  { size: 21, labels: new Set([]), index: 0 },
];

export const nodeLabelCaptions = {};
export const edgeLabelCaptions = {};

const getCaption = (valType, val) => {
  if (valType === 'node' && Object.prototype.hasOwnProperty.call(nodeLabelCaptions, val.label)) {
    return nodeLabelCaptions[val.label];
  }
  if (valType === 'edge' && Object.prototype.hasOwnProperty.call(edgeLabelCaptions, val.label)) {
    return edgeLabelCaptions[val.label];
  }

  let caption = valType === 'node' ? 'gid' : 'label';
  const { properties } = val;
  if (properties !== undefined) {
    if (Object.prototype.hasOwnProperty.call(properties, 'name')) {
      caption = 'name';
    } else if (Object.prototype.hasOwnProperty.call(properties, 'id')) {
      caption = 'id';
    }
  }

  return caption;
};

const getNodeColor = (labelName) => {
  let selectedColor = {};
  nodeLabelColors.forEach((labelColor) => {
    if (labelColor.nodeLabels.has(labelName)) {
      selectedColor = {
        color: labelColor.color,
        borderColor: labelColor.borderColor,
        fontColor: labelColor.fontColor,
      };
    }
  });

  if (Object.keys(selectedColor).length === 0) {
    const randomIndex = Math.floor(Math.random() * (nodeLabelColors.length));
    nodeLabelColors[randomIndex].nodeLabels.add(labelName);
    selectedColor = {
      color: nodeLabelColors[randomIndex].color,
      borderColor: nodeLabelColors[randomIndex].borderColor,
      fontColor: nodeLabelColors[randomIndex].fontColor,
    };
  }
  return selectedColor;
};

const getEdgeColor = (labelName) => {
  let selectedColor = {};
  edgeLabelColors.forEach((labelColor) => {
    if (labelColor.edgeLabels.has(labelName)) {
      selectedColor = {
        color: labelColor.color,
        borderColor: labelColor.borderColor,
        fontColor: labelColor.fontColor,
      };
    }
  });

  if (Object.keys(selectedColor).length === 0) {
    const randomIndex = Math.floor(Math.random() * (edgeLabelColors.length));
    edgeLabelColors[randomIndex].edgeLabels.add(labelName);
    selectedColor = {
      color: edgeLabelColors[randomIndex].color,
      borderColor: edgeLabelColors[randomIndex].borderColor,
      fontColor: edgeLabelColors[randomIndex].fontColor,
    };
  }
  return selectedColor;
};
const getNodeSize = (labelName) => {
  let selectedSize = 0;

  const nSize = nodeLabelSizes.find((labelSize) => labelSize.labels.has(labelName));

  if (nSize) {
    selectedSize = nSize.size;
  } else {
    nodeLabelSizes[2].labels.add(labelName);
    selectedSize = nodeLabelSizes[2].size;
  }

  return selectedSize;
};

const getEdgeSize = (labelName) => {
  let selectedSize = 0;

  const eSize = edgeLabelSizes.find((labelSize) => labelSize.labels.has(labelName));

  if (eSize) {
    selectedSize = eSize.size;
  } else {
    edgeLabelSizes[0].labels.add(labelName);
    selectedSize = edgeLabelSizes[0].size;
  }

  return selectedSize;
};

const sortByKey = (data) => {
  const sorted = {};
  if (data === undefined) {
    return sorted;
  }
  Object.keys(data).sort().forEach((key) => {
    sorted[key] = data[key];
  });
  return sorted;
};

export const updateLabelColor = (labelType, labelName, newLabelColor) => {
  if (labelType === 'node') {
    nodeLabelColors.forEach((labelColor) => {
      if (labelColor.nodeLabels.has(labelName)) {
        labelColor.nodeLabels.delete(labelName);
      }

      if (labelColor.color === newLabelColor.color) {
        labelColor.nodeLabels.add(labelName);
      }
    });
  } else {
    edgeLabelColors.forEach((labelColor) => {
      if (labelColor.edgeLabels.has(labelName)) {
        labelColor.edgeLabels.delete(labelName);
      }

      if (labelColor.color === newLabelColor.color) {
        labelColor.edgeLabels.add(labelName);
      }
    });
  }
};

export const updateNodeLabelSize = (labelName, newLabelSize) => {
  nodeLabelSizes.forEach((labelSize) => {
    if (labelSize.labels.has(labelName)) {
      labelSize.labels.delete(labelName);
    }

    if (labelSize.size === newLabelSize) {
      labelSize.labels.add(labelName);
    }
  });
};

export const updateEdgeLabelSize = (labelName, newLabelSize) => {
  edgeLabelSizes.forEach((labelSize) => {
    if (labelSize.labels.has(labelName)) {
      labelSize.labels.delete(labelName);
    }

    if (labelSize.size === newLabelSize) {
      labelSize.labels.add(labelName);
    }
  });
};

export const updateLabelCaption = (labelType, labelName, newLabelCaption) => {
  if (labelType === 'node') {
    nodeLabelCaptions[labelName] = newLabelCaption;
  } else {
    edgeLabelCaptions[labelName] = newLabelCaption;
  }
};

export const generateCytoscapeElement = (data, maxDataOfGraph, isNew) => {
  const nodes = [];
  const edges = [];
  const nodeLegend = {};
  const edgeLegend = {};

  function generateElements(alias, val) {
    const labelName = val.label.trim();
    let source = val.start;
    let target = val.end;

    if (!source) {
      source = val.start_id;
    }

    if (!target) {
      target = val.end_id;
    }

    if (source && target) {
      if (!Object.prototype.hasOwnProperty.call(edgeLegend, labelName)) {
        edgeLegend[labelName] = {
          size: getEdgeSize(labelName),
          caption: getCaption('edge', val),
          ...getEdgeColor(labelName),
        };
      }
      if (!Object.prototype.hasOwnProperty.call(edgeLabelCaptions, labelName)) {
        edgeLabelCaptions[labelName] = 'label';

        // if has property named [ name ], than set [ name ]
        if (Object.prototype.hasOwnProperty.call(val.properties, 'name')) {
          nodeLabelCaptions[labelName] = 'name';
        }
      }

      if (!Object.prototype.hasOwnProperty.call(val.properties, edgeLegend.caption)) {
        edgeLegend[labelName].caption = getCaption('edge', val);
      }
      edges.push(
        {
          group: 'edges',
          data: {
            id: val.id,
            source,
            target,
            label: val.label,
            backgroundColor: edgeLegend[labelName].color,
            borderColor: edgeLegend[labelName].borderColor,
            fontColor: edgeLegend[labelName].fontColor,
            size: edgeLegend[labelName].size,
            properties: val.properties,
            caption: edgeLegend[labelName].caption,
          },
          alias,
          classes: isNew ? 'new node' : 'edge',
        },
      );
      console.log(JSON.stringify(labelName), edgeLegend[labelName], edges);
    } else {
      if (!Object.prototype.hasOwnProperty.call(nodeLegend, labelName)) {
        nodeLegend[labelName] = {
          size: getNodeSize(labelName),
          caption: getCaption('node', val),
          ...getNodeColor(labelName),
        };
      }
      if (!Object.prototype.hasOwnProperty.call(nodeLabelCaptions, labelName)) {
        nodeLabelCaptions[labelName] = 'gid';

        // if has property named [ name ], than set [ name ]
        if (Object.prototype.hasOwnProperty.call(val.properties, 'name')) {
          nodeLabelCaptions[labelName] = 'name';
        }
      }

      if (!Object.prototype.hasOwnProperty.call(val.properties, nodeLegend.caption)) {
        nodeLegend[labelName].caption = getCaption('node', val);
      }
      nodes.push(
        {
          group: 'nodes',
          data: {
            id: val.id,
            label: val.label,
            backgroundColor: nodeLegend[labelName].color,
            borderColor: nodeLegend[labelName].borderColor,
            fontColor: nodeLegend[labelName].fontColor,
            size: nodeLegend[labelName].size,
            properties: val.properties,
            caption: nodeLegend[labelName].caption,
          },
          alias,
          classes: isNew ? 'new node' : 'node',
        },
      );
    }
  }
  if (data) {
    data.forEach((row, index) => {
      if (index >= maxDataOfGraph && maxDataOfGraph !== 0) {
        return;
      }
      Object.entries(row).forEach((rowEntry) => {
        const [alias, val] = rowEntry;
        if (Array.isArray(val)) {
          // val이 Path인 경우 ex) MATCH P = (V)-[R]->(V2) RETURN P;
          Object.entries(val).forEach((valueEntry) => {
            const [pathAlias, pathVal] = valueEntry;
            generateElements(pathAlias, pathVal);
          });
        } else if (val) {
          generateElements(alias, val);
        }
      });
    });
  }
  console.log('edge sizes', edgeLabelSizes);
  return {
    legend: {
      nodeLegend: sortByKey(nodeLegend),
      edgeLegend: sortByKey(edgeLegend),
    },
    elements: {
      nodes,
      edges,
    },
  };
};

const generateMetadataElements = (nodeLegend, edgeLegend, nodes, edges, val) => {
  const labelName = val.la_name;
  if (val.la_start && val.la_end) {
    edges.push(
      {
        group: 'edges',
        data: {
          id: val.la_oid,
          source: val.la_start,
          target: val.la_end,
          label: val.la_name,
          backgroundColor: edgeLegend[labelName].color,
          borderColor: edgeLegend[labelName].borderColor,
          fontColor: edgeLegend[labelName].fontColor,
          size: edgeLegend[labelName].size,
          properties: { count: val.la_count, id: val.la_oid, name: val.la_name },
          caption: edgeLegend[labelName].caption,
        },
        classes: 'edge',
      },
    );
  } else {
    nodes.push(
      {
        group: 'nodes',
        data: {
          id: val.la_oid,
          label: val.la_name,
          backgroundColor: nodeLegend[labelName].color,
          borderColor: nodeLegend[labelName].borderColor,
          fontColor: nodeLegend[labelName].fontColor,
          size: nodeLegend[labelName].size,
          properties: { count: val.la_count, id: val.la_oid, name: val.la_name },
          caption: nodeLegend[labelName].caption,
        },
        classes: 'node',
      },
    );
  }
};

export const generateCytoscapeMetadataElement = (data) => {
  const nodes = [];
  const edges = [];
  const nodeLegend = {};
  const edgeLegend = {};

  if (data) {
    data.forEach((val) => {
      if (!Object.prototype.hasOwnProperty.call(val, 'la_count')) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(val, 'la_count') && val.la_count <= 0) {
        return;
      }

      const labelName = val.la_name;
      if (val.la_start && val.la_end) {
        if (!Object.prototype.hasOwnProperty.call(edgeLegend, labelName)) {
          edgeLegend[labelName] = {
            size: 15,
            caption: 'name',
            ...getEdgeColor(labelName),
          };
        }
      } else if (!Object.prototype.hasOwnProperty.call(nodeLegend, labelName)) {
        nodeLegend[labelName] = {
          size: 70,
          caption: 'name',
          ...getNodeColor(labelName),
        };
      }
      generateMetadataElements(nodeLegend, edgeLegend, nodes, edges, val);
    });
  }

  return {
    legend: {
      nodeLegend: sortByKey(nodeLegend),
      edgeLegend: sortByKey(edgeLegend),
    },
    elements: { nodes, edges },
  };
};
