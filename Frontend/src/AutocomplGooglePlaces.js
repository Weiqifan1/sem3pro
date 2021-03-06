import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import CheckboxForFoodTypes from './CheckboxForFoodTypes';

const baseURL = 'https://benedikteeva.dk/jwtBackend%2D1.0%2DSNAPSHOT/';
const latlngURL = 'api/googleplaces/latlgt/';


export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '', location: '', restaurants: [], restaurantTable: '', prediction: '',
    };
  }


  handleChange = (address) => {
    this.setState({ address });
    console.log(this.state.address);
  }


  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => (this.setState({ location: latLng })))
      .catch(error => console.error('Error', error));
  }

  onSubmit = async (evt) => {
    evt.preventDefault();

    fetch(`${baseURL + latlngURL + this.state.location.lat},${this.state.location.lng}`)

      .then((results) => {
        if (!results.ok) {
          throw Error(results.statusText);
        }

        return results.json();
      })
      .then( (data) => {
       
        const restaurantArray = data.results.map(restaurant =>


          (

            <div>

              <table className="table">
                <thead />
                <tbody>
                  <tr key={restaurant.id}>
                    <td><img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyDNGntL1NjT4xTfiMxnq2Blu6M5yjfPmMM`} height="75" alt="noimage" /></td> */}
                    <td><p>{restaurant.name}</p>{restaurant.formatted_address}</td>
                    <td>Rating: {restaurant.rating}</td>
                    <td />

                  </tr>

                </tbody>
              </table>
            </div>
          ),
        );

        this.setState({ restaurantTable: restaurantArray });
      });
  }
  handleChange = (address) => {
    this.setState({ address });
    console.log(this.state.address);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} >
          <PlacesAutocomplete
            value={this.state.address}
            value2={this.state.type}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <CheckboxForFoodTypes id="3" />
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}
          </PlacesAutocomplete>
          <button id="8">search</button>
        </form>
        {this.state.restaurantTable}
      </div>

    );
  }
}
