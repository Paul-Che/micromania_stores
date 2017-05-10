import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Gmaps, Marker } from 'react-gmaps';
import { CSVLink } from 'react-csv';
import { Stores } from '../../imports/collections/stores';

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = { csvData: [] };
  }

  render() {
    console.log(this.state);
    const coords = {
      lat: 51.5258541,
      lng: -0.08040660000006028
    };

    return (
      <div className="wrapper">

        <Gmaps
          width={'600px'}
          height={'500px'}
          lat={coords.lat}
          lng={coords.lng}
          zoom={3}
          params={{ v: '3.exp' }}
          loadingMessage={'Be happy'}
        >
          {this.props.stores.map(store =>
              <Marker
                key={store._id}
                lat={store.address.geo.lat}
                lng={store.address.geo.lng}
                onClick={() => this.setState({ csvData: this.state.csvData.concat(
                  [{ name: store.name,
                     latitude: store.address.geo.lat,
                     longitude: store.address.geo.lng }]
                   ) }
                 )}
              />
            )
          }
        </Gmaps>

        <CSVLink
          data={this.state.csvData}
          separator={';'}
          className="btn btn-default"
        >
          Download selected stores as CSV
        </CSVLink>

      </div>
    );
  }
}

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('stores');

  // return an object. Whatever we return will be sent to StoreList
  // as props
  return { stores: Stores.find({}).fetch() };
}, SimpleMap);
