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

class CypherService {
    constructor(graphRepository) {
        this._graphRepository = graphRepository;
    }

    async executeCypher(query) {
        if (!query) {
            throw new Error('Query not entered!');
        } else {
            try {
                // Get current graph name
                const graphName = this._graphRepository._graph;
                if (!graphName) {
                    throw new Error('No graph selected. Please select a graph first.');
                }

                // Parse RETURN clause to determine column count
                const returnMatch = query.match(/RETURN\s+(.+?)(?:\s+ORDER\s+|\s+LIMIT\s+|\s+SKIP\s+|$)/is);
                let columnDefs = 'result agtype';

                if (returnMatch) {
                    const returnClause = returnMatch[1].trim();
                    // Split by comma, but not commas inside parentheses, brackets, or braces
                    const columns = returnClause.split(/,(?![^(]*\))(?![^\[]*\])(?![^{]*\})/);
                    columnDefs = columns.map((col, idx) => {
                        const trimmed = col.trim();
                        // Check for explicit AS alias first
                        const explicitAlias = trimmed.match(/\s+AS\s+(\w+)\s*$/i);
                        if (explicitAlias) {
                            return `${explicitAlias[1]} agtype`;
                        }
                        // For simple variable (n, a, b, etc.)
                        if (/^\w+$/.test(trimmed)) {
                            return `${trimmed} agtype`;
                        }
                        // For property access (n.name, n.config.storage.type), use generic name
                        return `col${idx} agtype`;
                    }).join(', ');
                }

                // Wrap Cypher query in the AGE cypher() function
                const wrappedQuery = `SELECT * FROM cypher('${graphName}', $$ ${query} $$) AS (${columnDefs})`;

                console.log('Executing wrapped query:', wrappedQuery);

                let resultSet = await this._graphRepository.execute(wrappedQuery);
                return this.createResult(resultSet);
            } catch (err) {
                console.error('Query error:', err.message);
                throw err;
            }
        }
    }
    
    createResult(resultSet) {
        let result;

        let targetItem = resultSet;
        if (Array.isArray(resultSet)) {
            targetItem = resultSet.pop();
        }

        let cypherRow = targetItem.rows;
        result = {
            rows: cypherRow,
            columns: this._getColumns(targetItem),
            rowCount: this._getRowCount(targetItem),
            command: this._getCommand(targetItem),
        };
        return result;
    }

    _getColumns(resultSet) {
        return resultSet.fields.map((field) => field.name);
    }

    _getRowCount(resultSet) {
        return resultSet.rowCount;
    }

    _getCommand(resultSet) {
        return resultSet.command;
    }

    _convertRowToResult(resultSet) {
        return resultSet.rows.map((row) => {
            let convetedObject = {};
            for (let k in row) {
                if (row[k]) {
                    let typeName = row[k].constructor.name;
                    if (typeName === 'Path') {
                        convetedObject[k] = this.convertPath(row[k]);
                    } else if (typeName === 'Vertex') {
                        convetedObject[k] = this.convertVertex(row[k]);
                    } else if (typeName === 'Edge') {
                        convetedObject[k] = this.convertEdge(row[k]);
                    } else {
                        convetedObject[k] = row[k];
                    }
                } else {
                    convetedObject[k] = null;
                }
            }
            return convetedObject;
        });
    }

    convertPath({vertices, edges, start, end, len}) {
        let result = [];
        // vertex
        for (let idx in vertices) {
            result.push(this.convertVertex(vertices[idx]));
        }
        // edge
        for (let idx in edges) {
            result.push(this.convertEdge(edges[idx]));
        }

        return result;
    }

    convertEdge({label, id, start, end, props}) {
        return {
            label: label,
            id: `${id.oid}.${id.id}`,
            start: `${start.oid}.${start.id}`,
            end: `${end.oid}.${end.id}`,
            properties: props,
        };
    }

    convertVertex({label, id, props}) {
        return {
            label: label,
            id: `${id.oid}.${id.id}`,
            properties: props,
        };
    }
}

module.exports = CypherService;
