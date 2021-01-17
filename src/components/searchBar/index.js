import React from 'react';
import axios from 'axios';

import {
  Form,
  Button,
  Row,
} from 'react-bootstrap';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      inputValue: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { inputValue } = this.state;
    axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=${inputValue}&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type`)
      .then((res) => {
        const events = res.data.records.map(({ fields }) => ({
          title: fields.title,
          description: fields.lead_text,
          id: fields.id,
          category: fields.category,
          address: fields.address_name,
          city: fields.address_city,
          zipcode: fields.address_zipcode,
        }));
        this.setState({ events });
      });
  }

  render() {
    const { events } = this.state;
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Recherchez un évènement par Nom </Form.Label>
            <Form.Control type="text" placeholder="entrez un nom" onChange={(e) => this.setState({ events, inputValue: e.target.value })} />
          </Form.Group>
          <Button type="button" onClick={this.componentDidMount}>
            Submit
          </Button>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Recherchez un évènement par Date </Form.Label>
            <Form.Control type="text" placeholder="entrez une Date" />
          </Form.Group>
          <Button type="button" onClick={this.componentDidMount}>
            Submit
          </Button>
        </Form>
        <Row>
          {events.map((event) => (
            <div>
              <h1>{event.title}</h1>
              <p>{event.description}</p>
              <p>{event.category}</p>
            </div>
          ))}
        </Row>
      </div>
    );
  }
}

export default SearchBar;
