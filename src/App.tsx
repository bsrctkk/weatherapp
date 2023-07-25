import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Button, Card, Col, Form, Row } from "react-bootstrap";


interface WeatherData {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: string;
  };
  timezone: string;
}

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>({
    weather: [
      {
        main: "",
        description: "",
        icon: ""
      }
    ],
    main: {
      temp: ""
    },
    timezone: ""
  });

  const weatherImages: { [key: string]: string } = {
    Clear: "https://play-lh.googleusercontent.com/34vH94Vt3JFW_jsCMlBdNRdniMCcrMdwOygi-hfipjLzzGZMfApjeO8SaOdQ2mn5FVA", 
    Rain: "https://play-lh.googleusercontent.com/GFEErSs-Wk7cT_SSlGCxQySs3hmQrYPygoWOxXrUSE2JhE5jt8L44EW34LEH4SasbHQ",   
    
  };

  const searchWeather = async () => {
    if (location) {
      try {
        const API_KEY = "bad7b5b148e214c4d68cba1f9e0c9fe7";
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Hata oluştu!", error);
      }
    }
  };

  useEffect(() => {
    searchWeather();
  }, [location]);

  const getWeatherImage = () => {
    const condition = weatherData.weather[0].main;
    return weatherImages[condition] || ""; 
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col sm={4}>
            <Form className="d-flex">
              <Form.Control
                type="text"
                value={location}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button onClick={searchWeather}>Search</Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col sm={4}>
            <Card className="text-center">
              <Card.Header>{weatherData.weather[0].description}</Card.Header>
              <Card.Body>
                
                <Card.Text>
                  <img src={getWeatherImage()} alt={weatherData.weather[0].main} style={{ width: "200px" }} />
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">{weatherData.main.temp} °C</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
