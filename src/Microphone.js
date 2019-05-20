import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import "bootstrap/dist/css/bootstrap.min.css";
import nlp from "compromise";

import {
  faMicrophone,
  faMicrophoneSlash
} from "@fortawesome/free-solid-svg-icons";

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-IN";
library.add(faMicrophone);
var finalTranscripts = "",
  interimTranscripts = "";

class Microphone extends React.Component {
  constructor() {
    super();
    this.state = {
      listening: false
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }
  toggleListen() {
    this.setState(
      {
        listening: !this.state.listening
      },
      this.handleListen
    );
  }
  handleListen() {
    if (this.state.listening) {
      recognition.start();
      /*recognition.onend = () => {
        console.log("continue listening");
        recognition.start();
      };*/
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log("Stopped listening per click");
      };
    }
    recognition.onstart = () => {
      console.log("Listening!");
    };
    recognition.onresult = function(event) {
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscripts += transcript;
        } else {
          interimTranscripts += transcript;
        }
      }
      console.log(finalTranscripts);
      document.getElementById("fscript").innerHTML = finalTranscripts;
      let doc = nlp(finalTranscripts);
      let nouns = doc.nouns().out("text");
      let verbs = doc.verbs().out("text");
      let places = doc.places().out("text");
      document.getElementById("nouns").innerHTML = nouns + "<br>";
      document.getElementById("verbs").innerHTML = verbs + "<br>";
      document.getElementById("places").innerHTML = places + "<br>";
    };
  }
  render() {
    return (
      <Container>
        <Container id="1-container">
          <Col>
            <div style={{ height: 200 }} />
            <Button
              variant={this.state.listening ? "danger" : "primary"}
              style={{ borderRadius: 50 }}
              onClick={this.toggleListen}
            >
              <FontAwesomeIcon
                icon={this.state.listening ? faMicrophoneSlash : faMicrophone}
                size="2x"
              />
            </Button>
          </Col>
        </Container>
        <div style={{ height: 100, width: 500, textAlign: "center" }} />
        <Container style={{ textAlign: "center" }}>
          <Col>
            <br />
            <p id="fscript" style={{ color: "black" }} />
            <br />
          </Col>
          <Row>
            <Col md={4}>
              <h3>Nouns</h3>
              <p id="nouns" style={{ color: "red" }} />
              <br />
            </Col>
            <Col md={4}>
              <h3>Verbs</h3>
              <p id="verbs" style={{ color: "green" }} />
              <br />
            </Col>
            <Col md={4}>
              <h3>Places</h3>
              <p id="places" style={{ color: "blue" }} />
              <br />
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Microphone;
