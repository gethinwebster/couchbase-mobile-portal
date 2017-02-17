import React, { Component, StyleSheet } from 'react';
import config from './output.js';
import MapObject from './MapObject';
import TableView from './TableView';

export default class ConfigLoader extends Component {
  constructor() {
    super();
  this.state = {
      keys: [],
      props: {},
      selected: 'json-view'
    };
  }
  componentWillMount() {
    const props = config.properties;
    console.log(props);
    this.setState({keys: Object.keys(props), props: props});
    this.mapPropsToComponents(props);
  }
  onClick(key) {
    this.setState({selected: key});
  }
  mapPropsToJSON(props, initial) {
    Object.keys(props).map((key, index) => {
      const type = props[key].type;
      switch (type) {
        case 'string':
          initial[key] = "string"
          break;
        case 'object':
          initial[key] = this.mapPropsToJSON(props[key].properties, {});
          break;
        default:
          break;
      }
    });
    return initial;
  }
  mapPropsToComponents(props) {
    return Object.keys(props).map((key, index) => {
      const type = props[key].type;
      switch(type) {
        case 'object':
          return (
            <li style={styles.listItem} key={key}>
              <MapObject mykey={key} type={type} description={props[key].description}>
                {this.mapPropsToComponents(props[key].properties)}
              </MapObject>
            </li>
          );
        default:
          return (
            <li style={styles.listItem} key={key}>
              <strong>{key}</strong>
              ({props[key].type}): <span style={styles.description}>{props[key].description}</span>
            </li>
          );
      }
    })
  }
  showJSONView() {
    this.setState({selected: 'json-view'});
  }
  showTableView() {
    this.setState({selected: 'table-view'});
  }
  isActive(element) {
    return element === this.state.selected ? 'show' : 'hide';
  }
  render() {
    const items = this.mapPropsToComponents(this.state.props);
    return (
      <div style={styles.App}>
        <h2>Explorer</h2>
        <div className={this.isActive('json-view')}>
          {'{'}<ul style={styles.list}>
            {items}
            </ul>{'}'}
        </div>
        <h2>JSON View</h2>
        <pre>
          <code>
            <pre>
              {JSON.stringify(this.mapPropsToJSON(this.state.props, {}), null, 2)}
            </pre>
          </code>
        </pre>
        <h2>Table View</h2>
        <div>
          <h3>Server Configuration</h3>
          <TableView config={this.state.props} />
          <h3>Database Configuration</h3>
          <TableView config={this.state.props.databases.properties.foo_db.properties} />
          <h3>CORS Configuration</h3>
          <TableView config={this.state.props.CORS.properties} />
          <h3>Cache Configuration</h3>
          <TableView config={this.state.props.databases.properties.foo_db.properties.cache.properties} />
          <h3>User Configuration</h3>
          <TableView config={this.state.props.databases.properties.foo_db.properties.users.properties.foo_user.properties} />
        </div>
      </div>
    );
  }
}

const styles = {
  App: {
  },
  links: {
    float: 'right'
  },
  listItem: {
    listStyle: 'none',
  },
  description: {
    fontSize: '15px'
  },
  container: {
    padding: '10px'
  },
  ulMargin: {
    marginLeft: '40px !important'
  },
  body: {
    lineHeight: '1.3em'
  }
};
