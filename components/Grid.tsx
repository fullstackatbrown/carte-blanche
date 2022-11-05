import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import gridStyles from "../styles/Grid.module.css";

interface gridProps {
    data: Array<string>;
    height?: string;
    width?: string;
}

const Grid = (props: gridProps) => {
    return (
        <div
            style={{
                height: `${props.height}`,
                width: `${props.width}`,
            }}
            className={gridStyles.componentContainer}
        >
            <Container fluid>
                <Row xs={1} md={2} lg={4}>
                    {props.data.map((url: string, index: number) => (
                        <Col
                            style={{
                                outline: "3px solid gray",
                                borderRadius: "30px",
                                padding: "5px",
                            }}
                            align="center"
                        >
                            <img
                                src={url}
                                key={index}
                                className={gridStyles.cellImage}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Grid;
