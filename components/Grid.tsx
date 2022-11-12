import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import gridStyles from "../styles/Grid.module.css";

interface gridProps {
    height?: string;
    width?: string;
    children?: any;
}

const Grid = (props: gridProps) => {
    return (
        <Container
            fluid
            style={{
                height: `${props.height}`,
                width: `${props.width}`,
            }}
            className={gridStyles.componentContainer}
        >
            <Row xs={1} md={2} lg={3}>
                {props.children}
            </Row>
        </Container>
    );
};

export default Grid;
