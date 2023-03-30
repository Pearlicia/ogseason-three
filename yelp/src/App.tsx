import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {Amplify, API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useReducer } from 'react';
import { Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Nav  from './Components/Nav';

import awsConfig from './aws-exports';
import { createRestaurant, deleteRestaurant } from './graphql/mutations';
import { listRestaurants } from './graphql/queries';
import { onCreateRestaurant } from './graphql/subscriptions';

Amplify.configure(awsConfig)

type Restaurant = {
  id: string;
  name: string;
  description: string;
  city: string;
};

type AppState = {
  restaurants: Restaurant[];
  formData: Restaurant;
};

type Action =
  | {
      type: 'QUERY';
      payload: Restaurant[];
    }
  | {
      type: 'SUBSCRIPTION';
      payload: Restaurant;
    }
  | {
      type: 'SET_FORM_DATA';
      payload: { [field: string]: string };
    }
  | {
      type: 'DELETE';
      payload: string;

  };


type SubscriptionEvent<D extends { [key: string]: Restaurant }> = {
  value: {
    data: D;
  };
};

const initialState: AppState = {
  restaurants: [],
  formData: {
    id: '',
    name: '',
    city: '',
    description: '',
  },
};
const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, restaurants: action.payload };
    case 'SUBSCRIPTION':
      return { ...state, restaurants: [...state.restaurants, action.payload] };
    case 'SET_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'DELETE':
      const updatedRestaurants = state.restaurants.filter(
        (restaurant) => restaurant.id !== action.payload
      );
      return { ...state, restaurants: updatedRestaurants };
    default:
      return state;
  }
};


const App: React.FC = () => {

  const createNewRestaurant = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const { name, description, city } = state.formData;
    const restaurant = {
      name,
      description,
      city,
    };
    await API.graphql(
      graphqlOperation(createRestaurant, { input: restaurant }),
    );
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getRestaurantList();


    const subscription = API.graphql(graphqlOperation(onCreateRestaurant));

    if ('subscribe' in subscription) {
      subscription.subscribe({
        next: (
          eventData: SubscriptionEvent<{ onCreateRestaurant: Restaurant }>,
        ) => {
          const payload = eventData.value.data.onCreateRestaurant;
          dispatch({ type: 'SUBSCRIPTION', payload });
        },
      });

  } else {
    console.error('Invalid GraphQL result:');
  }

    // return () => subscription.unsubscribe();
  }, []);
 

  const getRestaurantList = async () => {
    const restaurants = await API.graphql(graphqlOperation(listRestaurants));
    if ('data' in restaurants) {
      dispatch({
        type: 'QUERY',
        payload: restaurants.data.listRestaurants.items,
      });
    } else {
      console.error('Invalid GraphQL result:', restaurants);
    }
  };


  const handleChange = (e: any) =>
    dispatch({
      type: 'SET_FORM_DATA',
      payload: { [e.target.name]: e.target.value },
    });


  const handleDelete = async (restaurantID: any) =>{
    await API.graphql({
      query: deleteRestaurant,
      variables: {
        input: {
          id: restaurantID
        }
      }
    })
    dispatch({ type: 'DELETE', payload: restaurantID});


  }

  return (
    <div className="App">
      <Nav />
      <Container>
        <Row className="mt-3">
          <Col md={4}>
            <Form>
              <Form.Group controlId="formDataName">
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group controlId="formDataDescription">
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="description"
                  placeholder="Description"
                />
              </Form.Group>
              <Form.Group controlId="formDataCity">
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="city"
                  placeholder="City"
                />
              </Form.Group>
              <Button onClick={createNewRestaurant} className="float-left">
                Add New Restaurant
              </Button>
            </Form>
          </Col>
        </Row>

        {state.restaurants.length ? (
          <Row className="my-3">
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {state.restaurants.map((restaurant, index) => (
                    <tr key={`restaurant-${index}`}>
                      <td>{index + 1}</td>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.description}</td>
                      <td>{restaurant.city}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDelete(restaurant.id)}>Delete</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
};

export default withAuthenticator(App);



